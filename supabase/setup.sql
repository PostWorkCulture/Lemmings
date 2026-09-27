-- Run once in the Supabase SQL editor. Each signed-in account owns one save.
create table if not exists public.lemmings_saves (
 user_id uuid primary key references auth.users(id) on delete cascade,
 progress jsonb not null default '{}'::jsonb,
 updated_at timestamptz not null default now(),
 constraint save_size check (octet_length(progress::text)<65536)
);
alter table public.lemmings_saves enable row level security;
revoke all on public.lemmings_saves from anon;
grant select,insert,update on public.lemmings_saves to authenticated;
create policy "Read own save" on public.lemmings_saves for select to authenticated using ((select auth.uid())=user_id);
create policy "Create own save" on public.lemmings_saves for insert to authenticated with check ((select auth.uid())=user_id);
create policy "Update own save" on public.lemmings_saves for update to authenticated using ((select auth.uid())=user_id) with check ((select auth.uid())=user_id);

create or replace function public.sync_lemmings_progress(incoming jsonb)
returns jsonb language plpgsql security invoker set search_path = '' as $$
declare
 old_save jsonb; result jsonb := '{"best":{},"perfect":{},"stars":{},"currentLevel":0}';
 n integer; k text; source jsonb; value jsonb; stars integer; saved integer; ticks bigint; old_ticks bigint;
begin
 if auth.uid() is null then raise exception 'Sign in required'; end if;
 if jsonb_typeof(incoming)<>'object' or octet_length(incoming::text)>65536 then raise exception 'Invalid save'; end if;
 insert into public.lemmings_saves(user_id) values(auth.uid()) on conflict do nothing;
 select progress into old_save from public.lemmings_saves where user_id=auth.uid() for update;
 -- Merge within the row lock: simultaneous devices cannot discard better results.
 foreach source in array array[old_save,incoming] loop
  for n in 0..44 loop
   k:=n::text;
   value:=source #> array['best',k];
   if value::text ~ '^[0-9]{1,2}$' then
    saved:=(value::text)::integer;
    if saved<=20 then result:=jsonb_set(result,array['best',k],to_jsonb(greatest(coalesce((result #>> array['best',k])::integer,0),saved))); end if;
   end if;
   value:=source #> array['stars',k];
   if (value->>'stars') ~ '^[1-3]$' then
    stars:=greatest(coalesce((result #>> array['stars',k,'stars'])::integer,0),(value->>'stars')::integer);
    old_ticks:=(result #>> array['stars',k,'bestPerfectTicks'])::bigint;
    result:=jsonb_set(result,array['stars',k],jsonb_build_object('stars',stars));
    ticks:=null;
    if (value->>'bestPerfectTicks') ~ '^[0-9]{1,8}$' then ticks:=(value->>'bestPerfectTicks')::bigint; end if;
    ticks:=least(old_ticks,ticks);
    if ticks is not null then result:=jsonb_set(result,array['stars',k,'bestPerfectTicks'],to_jsonb(ticks)); end if;
   end if;
   value:=source #> array['perfect',k];
   if value->>'completed'='true' and value->>'saved'='20' and value->>'total'='20' and value->>'lost'='0' then
    result:=jsonb_set(result,array['perfect',k],jsonb_build_object('completed',true,'saved',20,'total',20,'lost',0,'puzzleId',left(value->>'puzzleId',200)));
   end if;
  end loop;
  if (source->>'currentLevel') ~ '^[0-9]{1,2}$' and (source->>'currentLevel')::integer<45 then result:=jsonb_set(result,'{currentLevel}',source->'currentLevel'); end if;
 end loop;
 update public.lemmings_saves set progress=result,updated_at=now() where user_id=auth.uid();
 return result;
end;
$$;
revoke execute on function public.sync_lemmings_progress(jsonb) from public,anon;
grant execute on function public.sync_lemmings_progress(jsonb) to authenticated;
