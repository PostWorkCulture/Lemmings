export function objectPosition(o,tick){
 if(o.type!=='lift')return {x:o.x,y:o.y};
 const period=o.period||480,half=period/2,t=((tick+(o.phase||0))%period),leg=t<half?t:t-half,travel=Math.max(0,Math.min(1,(leg-70)/(half-140))),p=t<half?travel:1-travel;
 return {x:o.x+(o.toX-o.x)*p,y:o.y+(o.toY-o.y)*p};
}
export function isDangerous(o,tick,disabled){return !disabled?.has(o.id)&&['crusher','laser'].includes(o.type)&&(tick+(o.phase||0))%(o.period||240)<(o.active||60);}
export function updateObjects(g){
 for(const u of g.units)u.riding=false;
 for(const o of g.level.objects||[])if(o.type==='lift'){
  const before=objectPosition(o,g.tick),after=objectPosition(o,g.tick+1);
  for(const u of g.units)if(!g.terrain[Math.floor(u.y)*1000+Math.floor(u.x)]&&!['fall','jump','exit','ladder','pole','climb'].includes(u.state)&&u.x>=before.x-1&&u.x<=before.x+o.w+1&&Math.abs(u.y-before.y)<2){u.x=after.x+Math.max(2,Math.min(o.w-2,u.x-before.x));u.y+=after.y-before.y;u.riding=Math.abs(after.x-before.x)+Math.abs(after.y-before.y)>.001||(u.dir===1?after.x<o.toX-.1:after.x>o.x+.1);}
 }
}
export function objectInteraction(g,u){
 for(const o of g.level.objects||[]){
  if(o.requires&&!g.disabledObjects.has(o.requires))continue;
  if(isDangerous(o,g.tick,g.disabledObjects)&&u.x>=o.x&&u.x<=o.x+o.w&&u.y>o.y&&u.y-22<o.y+o.h){g.remove(u);return true;}
  if(u.state!=='walk')continue;
  if(o.type==='ladder'&&Math.abs(u.x-o.x)<3&&Math.abs(u.y-o.y)<4){u.state='ladder';u.object=o;u.x=o.x;return true;}
  if(o.type==='pole'&&Math.abs(u.x-o.x)<3&&Math.abs(u.y-o.y)<4){u.state='pole';u.object=o;u.x=o.x;return true;}
  if(o.type==='trampoline'&&u.x>=o.x&&u.x<=o.x+o.w&&Math.abs(u.y-o.y)<4){u.state='jump';u.vy=o.vy||-5.4;u.vx=(o.speed||2.4)*(o.dir||u.dir);u.dir=Math.sign(u.vx);u.fallStart=u.y;u.safeJump=true;return true;}
  if(o.type==='switch'&&Math.abs(u.x-o.x)<4&&Math.abs(u.y-o.y)<4){for(const target of o.targets||[o.target])g.disabledObjects.add(target);}
 }
 return false;
}
