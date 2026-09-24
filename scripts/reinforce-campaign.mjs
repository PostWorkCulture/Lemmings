// Protect route decisions without changing the underlying skill rules.
export function reinforceCampaign(layouts,routes){
 for(const l of layouts){
  const route=routes[l.id],floors=l.terrain.filter(r=>r[4]===1&&r[2]>=100);
  // Thin visible steel strata stop arbitrary vertical skips. Authored dig shafts
  // and diagonal mining corridors remain soft and are wide enough for the tool.
  for(const [x,y,w,h] of floors){
   for(const depth of [...new Set([Math.min(12,h-5),h-4])]){
    const yy=y+depth,open=[];
    for(const [rx,ry,skill,dir] of route)if(['dig','mine'].includes(skill)&&Math.abs(ry-y)<3&&rx>=x-15&&rx<=x+w+15){if(skill==='mine'){const a=rx+dir*(depth-4)*1.5,b=rx+dir*(depth+24)*1.5;open.push([Math.min(a,b)-17,Math.max(a,b)+17]);}else open.push([rx-21,rx+21]);}
    let start=x;for(const [a,b]of open.sort((a,b)=>a[0]-b[0])){if(a>start)l.terrain.push([start,yy,Math.min(a,x+w)-start,3,2]);start=Math.max(start,b);}if(start<x+w)l.terrain.push([start,yy,x+w-start,3,2]);
   }
  }
  // Every final exit is a side-entry chamber, with a roof and sealed far wall.
  // Falling or digging from above cannot bypass its bridge and tunnel approach.
  const dir=route.at(-1)[3],floor=floors.find(r=>Math.abs(r[1]-l.exitY)<2&&l.exitX>=r[0]&&l.exitX<r[0]+r[2]);
  if(!floor)throw Error(`Missing exit floor ${l.id}`);
  const [x,y,w]=floor,wallX=dir===1?x+w-12:x;
  l.terrain.push([x,y-48,w,6,2],[wallX,y-48,12,76,2]);
  l.exitChamber={x,y,w,dir};
  // The final soft barrier sits inside the steel roof, so it cannot be walked over.
  const bx=dir===1?x+48:x+w-74;
  l.terrain.push([bx,y-42,26,42,1]);l.objects.push({type:'rubble',x:bx,y:y-42,w:26,h:42});
  route.push([dir===1?bx-9:bx+35,y,'bash',dir]);
  if(l.id>=15){
   // A far-side wall in each earlier finale chamber requires preparing the landing,
   // not simply bridging once and releasing the entire crowd.
   for(const [i,r] of [...route].entries()){
    if(!['build','platform'].includes(r[2])||i===route.length-2)continue;
    const [rx,ry,skill,d]=r,targetY=ry-(skill==='build'?24:0);
    const candidates=floors.filter(f=>Math.abs(f[1]-targetY)<2&&(d===1?f[0]>rx&&f[0]<rx+130:f[0]+f[2]<rx&&f[0]+f[2]>rx-130));
    const f=candidates[0];if(!f||f[2]<140)continue;
    const bx=d===1?f[0]+49:f[0]+f[2]-75;
    if(l.objects.some(o=>o.type==='rubble'&&Math.abs(o.x-bx)<50&&Math.abs(o.y-(targetY-42))<20))continue;
    l.terrain.push([bx,targetY-42,26,42,1]);l.objects.push({type:'rubble',x:bx,y:targetY-42,w:26,h:42});
    const at=route.indexOf(r);route.splice(at+1,0,[d===1?bx-9:bx+35,targetY,'bash',d]);
   }
   if(l.id===17){for(const bx of [170,430]){l.terrain.push([bx,246,24,54,1]);l.objects.push({type:'rubble',x:bx,y:246,w:24,h:54});}route.unshift([161,300,'bash',1],[421,300,'bash',1]);}
  }
  l.stock={block:l.id<10?2:1};for(const r of route)l.stock[r[2]]=(l.stock[r[2]]||0)+1;
  l.challenge={jobCount:route.length,toolCount:new Set(route.map(r=>r[2])).size};
  l.hints.push('Steel seams stop shortcut shafts. Follow the soft mining channels, and approach the roofed exit from the side.');
 }
}
