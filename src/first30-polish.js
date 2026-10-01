import {TERRAIN_CLEARANCES} from './terrain-clearances.js';
const peaks={14:[[[45,140],[205,42],[345,140]],[[360,140],[565,25],[730,140]],[[720,140],[830,68],[958,140]]]};
export function polishOriginalSilhouette(g){
 const l=g.level;if(l.terrainRework===false||!['woodland','alpine'].includes(l.theme)||l.id>=50)return;
 const w=1000,h=g.height,keep=new Uint8Array(250*Math.ceil(h/4));
 const spans=TERRAIN_CLEARANCES[l.id]||[];for(let i=0;i<spans.length;i+=3)keep.fill(1,spans[i]*250+spans[i+1],spans[i]*250+spans[i+2]);
 const safe=(x,y)=>!keep[Math.floor(y/4)*250+Math.floor(x/4)];
 const before=g.terrain.slice();
 if(peaks[l.id]){
  for(const p of peaks[l.id])g.polygon(p,1);
  // Rescue routes, arrival envelopes, machinery and climbing profiles keep their clearance.
  for(let y=0;y<h;y++)for(let x=0;x<w;x++)if(!safe(x,y)||before[y*w+x]===2)g.terrain[y*w+x]=before[y*w+x];
 }
 // Substantial shelves keep their route surface. Only the non-working underside
 // receives a gently scalloped bark or broken glacier silhouette.
 const t=g.terrain.slice();
 for(let x=42;x<958;x++)for(let y=50;y<g.hazardY-8;y++)if(t[y*w+x]===1&&!t[(y+1)*w+x]){
  const depth=l.theme==='woodland'?Math.round(3+3*Math.sin(x*.031+l.id)+2*Math.sin(x*.09)):Math.round(3+3*Math.sin(x*.065+l.id));
  for(let k=0;k<depth;k++){const yy=y-k;if(safe(x,yy)&&t[yy*w+x]===1)g.terrain[yy*w+x]=0;}
 }
}
