import {reinforceCampaign} from './reinforce-campaign.mjs';
import {LEVELS as BASE} from '../src/levels-base-for-authoring.js';
import {DIFFICULT_LAYOUTS} from '../src/difficulty-layouts.js';
import {readFileSync,writeFileSync} from 'node:fs';
const old=JSON.parse(readFileSync(new URL('../tests/advanced-routes.json',import.meta.url)));
const routes=JSON.parse(readFileSync(new URL('../tests/difficulty-routes.json',import.meta.url)));
// Each finale has its own footprint, pacing and descent, rather than repeated full-width rooms.
const designs=[
 {id:15,name:'Under the Big Top',form:'circus-rings',rooms:[[330,960,145],[250,780,125],[100,800,145]],depth:450,notes:'A narrowing aerial ring leads to a wide final performance stage.'},
 {id:16,name:'Chimney Chase',form:'rooftop-towers',rooms:[[480,960,135],[420,880,155],[60,920,130]],depth:470,notes:'A cluster of narrow chimney towers opens onto a long final rooftop.'},
 {id:17,name:'The Championship Circuit',form:'stadium-bowl',rooms:[[120,960,145],[60,960,150],[240,930,145]],depth:475,notes:'Three broad stadium circuits combine springboards, low crossings, uphill building and tunnel preparation.'},
 {id:18,name:'Orbital Maintenance',form:'orbital-pods',rooms:[[480,960,125],[430,910,140],[350,910,125],[290,860,140]],depth:460,notes:'Four compact, offset service pods spiral down the station.'},
 {id:19,name:'Heart of Prism Falls',form:'crystal-cascade',rooms:[[150,980,135],[90,600,150],[40,610,145]],depth:445,notes:'A broad crystal basin narrows into a waterfall gorge and a secluded final grotto.'}
];
for(const design of designs){
 const l=structuredClone(BASE[design.id]),route=old[design.id].map(r=>[...r]),drop=l.exitX-35,top=l.exitY;
 for(const r of l.terrain)if(r[4]===1&&r[1]===top&&drop>=r[0]&&drop<r[0]+r[2])r[3]=36;
 l.shapes=l.shapes.filter(s=>!(Math.min(...s.points.map(p=>p[0]))<=drop&&Math.max(...s.points.map(p=>p[0]))>=drop));
 route.push([drop,top,'dig',1]);let y=Math.max(design.depth,top+125),dir=-1;
 if(y-top>150){l.terrain.push([drop-25,top+120,50,10,1]);l.objects.push({type:'pole',x:drop,y:top+120,bottom:y,dir:1});}
 l.setPieces=[];
 design.rooms.forEach(([left,right,descent],room)=>{
  const width=right-left,xx=d=>dir===1?left+d:right-d,bridge=room%2?'build':'platform',landing=y-(bridge==='build'?24:0);
  const barrier=Math.min(170,width*.28),wall=design.id===17?65:32+room*6,gap=Math.floor(width*.53),gapWidth=design.id===17?80:62+(room%2)*8;
  const near=[left,y,gap,26+room%2*8,1],far=[left+gap+gapWidth,landing,width-gap-gapWidth,28,1];
  const rects=[near,far,[left,y-55,12,75,2],[right-12,landing-55,12,75,2],[left+barrier,y-64,wall,64,1]];
  if(bridge==='platform')rects.push([left+gap-3,y-28,gapWidth+8,4,2]);
  if(dir===-1)for(const r of rects)r[0]=left+right-r[0]-r[2];
  l.terrain.push(...rects);
  l.objects.push({type:'rubble',x:dir===1?left+barrier:right-barrier-wall,y:y-64,w:wall,h:64});
  route.push([xx(barrier-9),y,'bash',dir],[xx(gap-16),y,bridge,dir]);
  // Irregular, theme-specific solid undersides change the map silhouette.
  for(const r of rects.slice(0,2)){
   const [x,yy,w,h]=r,pad=35;
   if(w>110){const bottom=yy+h,depth=design.id===16?62:design.id===19?50:design.id===18?10:28;
    l.shapes.push({type:1,points:design.id===16?[[x+pad,bottom-1],[x+w-pad,bottom-1],[x+w-pad,bottom+depth],[x+pad,bottom+depth]]:[[x+pad,bottom-1],[x+w-pad,bottom-1],[x+w*.65,bottom+depth],[x+w*.3,bottom+depth*.5]]});}
  }
  l.setPieces.push({form:design.form,left,right,y,landing,room});
  if(room===1){const target=`finale-${design.id}`;l.objects.push({type:'switch',x:xx(barrier+wall+12),y,target},{id:target,type:design.id===18?'laser':'crusher',x:dir===1?xx(gap-45):xx(gap-15),y:y-65,w:28,h:65,period:240,active:70});}
  if(room<design.rooms.length-1){const skill=room%2?'dig':'mine';route.push([xx(width-85),landing,skill,dir]);y=landing+descent;dir*=-1;}
  else {l.exitX=xx(width-65);l.exitY=landing;l.height=landing+125;}
 });
 l.name=design.name;l.layoutForm=design.form;l.target=20;l.difficulty='Extreme';l.stock={block:1};for(const r of route)l.stock[r[2]]=(l.stock[r[2]]||0)+1;
 l.hints=[design.notes,'Keep the crowd safe while a scout prepares tunnels and crossings. All twenty must reach the exit.', 'Use the levers to disable traps. Mine or dig into the next area; the narrow chambers do not share the same crossing positions.'];
 const index=DIFFICULT_LAYOUTS.findIndex(x=>x.id===l.id);DIFFICULT_LAYOUTS[index]=l;routes[l.id]=route;
}
reinforceCampaign(DIFFICULT_LAYOUTS,routes);
writeFileSync(new URL('../src/difficulty-layouts.js',import.meta.url),'// Authored multi-stage campaign layouts.\nexport const DIFFICULT_LAYOUTS='+JSON.stringify(DIFFICULT_LAYOUTS,null,2)+';\n');
writeFileSync(new URL('../tests/difficulty-routes.json',import.meta.url),JSON.stringify(routes,null,2));
