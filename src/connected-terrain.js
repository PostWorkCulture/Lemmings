import {CONNECTED_MASKS} from './connected-masks.js';
import {CONNECTED_ROUTES,connectedPoint} from './connected-levels.js';
const masks=new Map(),sources=new Map(),profiles=new Map(),crossings=new Map();
export const initialConnectedMask=id=>masks.get(id),connectedSourceMask=id=>sources.get(id);
export function pathY(points,x){for(let j=1;j<points.length;j++){const a=points[j-1],b=points[j];if(x>=Math.min(a[0],b[0])&&x<=Math.max(a[0],b[0])&&a[0]!==b[0])return a[1]+(b[1]-a[1])*(x-a[0])/(b[0]-a[0]);}const ends=[points[0],points.at(-1)].sort((a,b)=>Math.abs(a[0]-x)-Math.abs(b[0]-x));return Math.abs(ends[0][0]-x)<100?ends[0][1]:null;}
const basePaths=l=>CONNECTED_ROUTES[l.connectedStudy].paths.map(p=>p.map(v=>connectedPoint(l,v)));
export const connectedPaths=l=>profiles.get(l.id)||basePaths(l);
function nearest(paths,x,y){return paths.reduce((best,p)=>{const py=pathY(p,x);return py!==null&&Math.abs(py-y)<(best?.d??Infinity)?{p,y:py,d:Math.abs(py-y)}:best;},null);}
export function connectedObstacle(l,kind,ob){const [x,y]=connectedPoint(l,ob),n=nearest(connectedPaths(l),x,y);return {x,y:Math.round(n?.y??y),path:n?.p};}
export function connectedCrossing(l,gap){const index=CONNECTED_ROUTES[l.connectedStudy].gaps.indexOf(gap),saved=crossings.get(l.id)?.[index];if(saved)return saved;const [x,y0]=connectedPoint(l,[gap[0],gap[2]]),right=connectedPoint(l,[gap[1],gap[2]])[0],n=nearest(basePaths(l),x,y0),dir=Math.sign(n.p.at(-1)[0]-n.p[0][0]),y=Math.round(pathY(n.p,dir>0?x:right)),rise=CONNECTED_ROUTES[l.connectedStudy].gapRise??(l.connectedStudy%3===0?12:0);return {x,right,y,dir,rise,leftY:y-(dir<0?rise:0),rightY:y-(dir>0?rise:0)};}
export function shapeConnected(g){const l=g.level;if(l.connectedStudy===undefined)return;if(masks.has(l.id)){g.terrain.set(masks.get(l.id));return;}
 const s=CONNECTED_ROUTES[l.connectedStudy],runs=CONNECTED_MASKS[l.connectedStudy];for(let i=0;i<runs.length;i+=3)g.rect(runs[i+1],runs[i]-(60-l.artOffset),runs[i+2],1,1);sources.set(l.id,g.terrain.slice());
 // Five terrain-dominant cutaways: extend the actual casing, planet, cheese,
 // climbing rock and fossil bed into excavatable bodies around their passages.
 const bodies={2:[[15,270],[35,40],[445,115],[470,380],[650,380],[920,280],[980,310],[980,580],[20,580]],18:[[75,285],[105,170],[220,65],[410,10],[640,25],[790,100],[880,220],[900,440],[800,560],[200,570],[95,465]],29:[[30,35],[350,80],[480,170],[625,180],[760,105],[970,90],[970,565],[30,565]],36:[[80,100],[240,20],[670,95],[900,230],[960,540],[40,540],[85,395]],42:[[35,300],[195,300],[300,335],[420,415],[560,425],[700,230],[850,160],[945,65],[985,585],[35,585]]};
 if(bodies[l.connectedStudy])g.polygon(bodies[l.connectedStudy].map(p=>connectedPoint(l,p)),1);

 const base=basePaths(l),fields=base.map(p=>{const lo=Math.max(22,Math.min(...p.map(v=>v[0]))-30),hi=Math.min(977,Math.max(...p.map(v=>v[0]))+30);return Array.from({length:hi-lo+1},(_,i)=>[lo+i,Math.round(pathY(p,lo+i))]);});
 const indexAt=(x,y)=>base.indexOf(nearest(base,x,y).p);
 const flatten=(x,y,half=20,ramp=35)=>{const f=fields[indexAt(x,y)];for(const v of f){const t=Math.max(0,Math.min(1,(Math.abs(v[0]-x)-half)/ramp));if(t<1)v[1]=Math.round(y+(v[1]-y)*t);}};
 for(const wall of s.walls){const [x,y]=connectedPoint(l,wall),floor=Math.round(nearest(base,x,y).y);flatten(x+9,floor,40,45);}
 for(const o of l.objects.filter(o=>o.type==='ladder')){flatten(o.x,o.y,20,40);flatten(o.x,o.top,25,40);}
 flatten(l.spawnX,l.spawnY,25,35);flatten(l.exitX,l.exitY,27,50);
 const qs=s.gaps.map(gap=>connectedCrossing(l,gap));crossings.set(l.id,qs);
 for(const q of qs){const f=fields[indexAt(q.x,q.y)],center=(q.x+q.right)/2,half=(q.right-q.x)/2+18;for(const v of f){const t=Math.max(0,Math.min(1,(Math.abs(v[0]-center)-half)/30)),across=Math.max(0,Math.min(1,(v[0]-q.x)/(q.right-q.x))),y=q.leftY+(q.rightY-q.leftY)*across;if(t<1)v[1]=Math.round(y+(v[1]-y)*t);}}
 // Finish profiles before rasterising: overlapping adjustments cannot leave hidden lips.
 profiles.set(l.id,fields.map((f,i)=>base[i][0][0]>base[i].at(-1)[0]?f.toReversed():f));
 for(const field of fields)for(const [x,y] of field){const head=qs.some(q=>x>q.x-50&&x<q.right+50&&Math.abs(y-q.y)<35)?70:35;g.rect(x,y-head,1,head,0);g.rect(x,y,1,14,1);}
 for(const o of l.objects.filter(o=>o.type==='ladder')){g.rect(o.x-5,o.top-27,10,o.y-o.top+27,0);g.rect(o.x-9,o.y,19,12,1);const end=o.x+o.dir*12;g.rect(end-8,o.top-27,17,27,0);g.rect(end-8,o.top,17,12,1);}
 for(const shaft of s.shafts){const [x,y0]=connectedPoint(l,shaft),y=Math.round(nearest(profiles.get(l.id),x,y0).y),bottom=connectedPoint(l,[shaft[0],shaft[2]])[1];g.rect(x-12,y+14,24,bottom-y-14,0);}
 for(const wall of s.walls){const {x,y}=connectedObstacle(l,'wall',wall);g.rect(x,y-37,18,51,1);}
 for(const q of qs)for(let x=q.x;x<=q.right;x++){const top=Math.min(q.leftY,q.rightY)-35,below=fields.map(f=>pathY(f,x)).filter(y=>y!==null&&y>q.y+25),bottom=Math.min(q.y+55,...below.map(y=>y-16));g.rect(x,top,1,bottom-top,0);}
 masks.set(l.id,g.terrain.slice());
}
