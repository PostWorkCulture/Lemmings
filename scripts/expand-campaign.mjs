import {LEVELS} from '../src/levels-base-for-authoring.js';
import {readFileSync,writeFileSync} from 'node:fs';
const old=JSON.parse(readFileSync(new URL('../tests/advanced-routes.json',import.meta.url))),layouts=[],routes={};
for(let id=5;id<20;id++){
 const l=structuredClone(LEVELS[id]);if(l.height>470)throw new Error('Campaign already expanded');
 const route=old[id].map(r=>[...r]),initialDir=l.exitX<300?-1:1,drop=l.exitX-initialDir*35,top=l.exitY;
 for(const r of l.terrain)if(r[4]===1&&r[1]===top&&drop>=r[0]&&drop<r[0]+r[2])r[3]=44;
 l.shapes=l.shapes.filter(s=>!(Math.min(...s.points.map(p=>p[0]))<=drop&&Math.max(...s.points.map(p=>p[0]))>=drop&&(Math.min(...s.points.map(p=>p[1]))>=top||(Math.min(...s.points.map(p=>p[1]))>=top-20&&Math.max(...s.points.map(p=>p[1]))<=top))));
 route.push([drop,top,'dig',initialDir]);
 const rooms=id<10?1:id<15?2:3;let rowY=Math.max(top+145,id>=15?450:id>=10?400:0,...l.terrain.map(r=>r[1]+r[3]+35),...l.shapes.map(s=>Math.max(...s.points.map(p=>p[1]))+20)),dir=-initialDir;
 if(rowY-top>150){l.terrain.push([drop-28,top+125,56,12,1]);l.objects.push({type:'pole',x:drop,y:top+125,bottom:rowY,dir:initialDir});}
 for(let room=0;room<rooms;room++){
  const bridge=room%2===1?'build':'platform',destinationY=rowY-(bridge==='build'?24:0),mirror=dir===-1;
  const xs=x=>mirror?1000-x:x;
  const wallWidth=38+((id+room)%3)*12,gapStart=390+((id+room*2)%3)*55,gapWidth=65+((id*2+room)%3)*5,gapEnd=gapStart+gapWidth,barrierX=185+((id+room)%4)*25;
  let rects=[[40,rowY,gapStart-40,50,1],[gapEnd,destinationY,960-gapEnd,50,1],[40,rowY-65,14,90,2],[948,destinationY-65,12,90,2],[barrierX,rowY-76,wallWidth,76,1]];
  // A steel lintel over horizontal crossings makes staircases the wrong tool here.
  if(bridge==='platform')rects.push([gapStart-3,rowY-28,gapWidth+9,4,2]);
  if(mirror)rects=rects.map(([x,y,w,h,t])=>[1000-x-w,y,w,h,t]);l.terrain.push(...rects);
  l.objects.push({type:'rubble',x:mirror?1000-barrierX-wallWidth:barrierX,y:rowY-76,w:wallWidth,h:76});
  route.push([xs(barrierX-9),rowY,'bash',dir],[xs(gapStart-16),rowY,bridge,dir]);
  if(id>=15&&room===1){const target=`lower-trap-${id}`;l.objects.push({type:'switch',x:xs(barrierX+wallWidth+12),y:rowY,target},{id:target,type:id===18?'laser':'crusher',x:mirror?1000-(gapStart-18):gapStart-48,y:rowY-70,w:30,h:70,period:220,active:80});}
  if(room<rooms-1){const descent=room%2===0?'mine':'dig';route.push([xs(800),destinationY,descent,dir]);rowY=destinationY+145;dir*=-1;}
  else {l.exitX=xs(900);l.exitY=destinationY;l.height=destinationY+135;}
 }
 const stock={block:id<10?2:1,build:0,dig:0};for(const r of route)stock[r[2]]=(stock[r[2]]||0)+1;l.stock=stock;l.target=id<10?18:id<15?19:20;
 l.difficulty=['Easy','Medium','Hard','Extreme'][Math.floor(id/5)];
 l.hints=[`The exit is below the surface. Plan the whole ${rooms+1}-stage route before releasing the crowd.`, 'Cracked barriers are soft rock: tunnel through them with a Basher. Blue-grey lintels and pillars are steel.', 'Use horizontal bridges under low lintels, stairs to raised landings, and controlled digging or mining to reach the next chamber. Hold the crowd until the route is ready.'];
 layouts.push(l);routes[id]=route;
}
writeFileSync(new URL('../src/difficulty-layouts.js',import.meta.url),'// Authored multi-stage campaign layouts.\nexport const DIFFICULT_LAYOUTS='+JSON.stringify(layouts,null,2)+';\n');
writeFileSync(new URL('../tests/difficulty-routes.json',import.meta.url),JSON.stringify(routes,null,2));

// Preserve the separately authored extreme finales when rebuilding the campaign.
await import('./author-extremes.mjs');
