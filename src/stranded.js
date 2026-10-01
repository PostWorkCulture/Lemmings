// Only close out a rescue when the remaining group has no demonstrable way home.
// Uncertain routes or useful tools keep the player in control.
export const STRANDED_DELAY = 180;
export const STRANDED_TURN = 30;
export const STRANDED_BURST = 55;
const IDLE = new Set(['walk','block','attract']);

function rescueToolAvailable(g,u,remaining) {
 for(const [skill,count] of Object.entries(g.stock)) {
  if(count<=0||['walk','run'].includes(skill)||g.canAssign(u,skill))continue;
  if(['block','attract','explode'].includes(skill)&&remaining===1)continue;
  if(skill==='swim'&&g.level.hazard!=='water')continue;
  if(skill==='bash') {
   let earth=false;
   for(let x=0;x<=44&&!earth;x+=2)for(let y=-22;y<0;y+=2)if([1,3].includes(g.at(u.x+u.dir*x,u.y+y))){earth=true;break;}
   if(!earth)continue;
  }
  return true;
 }
 return false;
}
function makeRoute(game,unit,dir) {
 const probe=Object.assign(Object.create(Object.getPrototypeOf(game)),game,{
  rescueProbe:true,result:null,units:[{...structuredClone(unit),state:'walk',dir,arrival:null,jobTick:0,steps:0}],
  effects:[],soundEvents:[],events:[],stock:{...game.stock},disabledObjects:new Set(game.disabledObjects),
  saved:0,lost:0,spawned:game.level.total,strandedCheck:null
 });
 // These probes never assign terrain-changing skills, so terrain can stay read-only.
 return {game:probe,seen:new Set(),steps:0};
}
function routeKey(g,u) {
 const n=v=>Math.round((v||0)*1e6);
 return [u.state,n(u.x),n(u.y),u.dir,n(u.vy),n(u.vx),n(u.fallStart),Math.max(0,(u.portalUntil||0)-g.tick),u.object?.type].join(':');
}
export function updateStranded(game) {
 if(game.rescueProbe||game.lastRescueTick===null||game.spawned<game.level.total||!game.units.length)return;
 if(!game.units.every(u=>IDLE.has(u.state)&&!u.arrival))return;
 // A timed mechanism or an unvisited switch can still change the route. Do not guess.
 if((game.level.objects||[]).some(o=>o.type==='lift'||(['crusher','laser'].includes(o.type)&&!game.disabledObjects.has(o.id))||
  (o.type==='switch'&&(o.targets||[o.target]).some(id=>!game.disabledObjects.has(id)))))return;
 const signature=[game.lastRescueTick,game.revision,game.events.length,JSON.stringify(game.stock),game.saved,game.lost,game.units.map(u=>u.id).join(','),[...game.disabledObjects].join(',')].join('|');
 if(game.strandedCheck?.signature!==signature) {
  game.strandedCheck={signature,status:'checking',routes:game.units.flatMap(u=>[makeRoute(game,u,u.releaseDir??u.dir),makeRoute(game,u,-(u.releaseDir??u.dir))])};
 }
 const check=game.strandedCheck;
 // Spread the look-ahead over frames; it must never stall interaction/rendering.
 for(let budget=0;budget<200&&check.status==='checking';budget++) {
  const route=check.routes[0];
  if(!route){check.status='stranded';break;}
  const probe=route.game,u=probe.units[0];
  if(probe.saved||u?.state==='exit'){check.status='possible';break;}
  if(!u){check.routes.shift();continue;}
  if(rescueToolAvailable(probe,u,game.units.length)){check.status='possible';break;}
  const key=routeKey(probe,u);
  if(route.seen.has(key)){check.routes.shift();continue;}
  if(++route.steps>12000){check.status='uncertain';break;}
  route.seen.add(key);probe.step();
 }
 if(check.status!=='checking')check.routes=[];
 if(check.status==='stranded'&&game.tick-game.lastRescueTick>=STRANDED_DELAY) {
  for(const u of game.units){u.state='stranded';u.strandedTick=game.tick;}
 }
}
export function stepStranded(game,u) {
 if(u.state!=='stranded')return false;
 const age=game.tick-u.strandedTick;
 if(age===STRANDED_TURN)game.effects.push({type:'burst',x:u.x,y:u.y-9,tick:game.tick});
 if(age>=STRANDED_TURN+STRANDED_BURST)game.remove(u,false,false);
 return true;
}
