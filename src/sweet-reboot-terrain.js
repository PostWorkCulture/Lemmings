import {SWEET_MASKS} from './sweet-reboot-masks.js';
import {SWEET_STUDIES,sweetPoint} from './sweet-reboot-levels.js';
export function pathY(points,x){for(let j=1;j<points.length;j++){const a=points[j-1],b=points[j];if(x>=Math.min(a[0],b[0])&&x<=Math.max(a[0],b[0])&&a[0]!==b[0])return a[1]+(b[1]-a[1])*(x-a[0])/(b[0]-a[0]);}return null;}
export function sweetPaths(l){return SWEET_STUDIES[l.sweetReboot].paths.map(p=>p.map(sweetPoint));}
export function sweetObstacle(l,kind,ob){const paths=sweetPaths(l),[x,y]=sweetPoint(ob),p=paths.reduce((best,p)=>{const py=pathY(p,x);return py!==null&&Math.abs(py-y)<(best?.distance??Infinity)?{p,y:py,distance:Math.abs(py-y)}:best;},null);return {x,y:Math.round(p?.y??y),path:p?.p};}
const cache=new Map(),sourceMasks=new Map();
export const sweetSourceMask=id=>sourceMasks.get(id);
export const initialSweetMask=id=>cache.get(id);
export function shapeSweetReboot(g){
 if(g.level.sweetReboot===undefined)return;
 const l=g.level,cached=cache.get(l.id);if(cached){g.terrain.set(cached);return;}
 const s=SWEET_STUDIES[l.sweetReboot],runs=SWEET_MASKS[l.sweetReboot];
 for(let i=0;i<runs.length;i+=3)g.rect(runs[i+1],runs[i],runs[i+2],1,1);
 sourceMasks.set(l.id,g.terrain.slice());
 // Carve headroom along each deliberate journey, using the painting's material as its floor.
 for(const path of sweetPaths(l))for(let x=Math.min(...path.map(p=>p[0]));x<=Math.max(...path.map(p=>p[0]));x++){
  const y=Math.round(pathY(path,x));g.rect(x,y-34,1,34,0);g.rect(x,y,1,15,1);
 }
 const landing=(x,y,half=18,ramp=28)=>{const paths=sweetPaths(l);const p=paths.reduce((best,p)=>{const py=pathY(p,x);return py!==null&&Math.abs(py-y)<(best?.d??Infinity)?{p,d:Math.abs(py-y)}:best;},null)?.p;
  for(let xx=Math.max(22,x-half-ramp);xx<=Math.min(977,x+half+ramp);xx++){const old=Math.round(pathY(p||[[xx,y],[xx+1,y]],xx)??y),blend=Math.max(0,Math.min(1,(Math.abs(xx-x)-half)/ramp)),floor=Math.round(y+(old-y)*blend);g.rect(xx,Math.min(old,floor)-36,1,Math.abs(old-floor)+51,0);g.rect(xx,floor,1,15,1);}
 };
 // Room to step out of each vertical connector, with landings at both ends.
 for(const o of l.objects){landing(o.x,o.y,16,20);landing(o.x,o.top,26,20);g.rect(o.x-5,o.top-28,10,o.y-o.top+28,0);g.rect(o.x-8,o.y,17,12,1);const exit=o.x+o.dir*12;g.rect(exit-9,o.top-30,19,30,0);g.rect(exit-9,o.top,19,10,1);}
 for(const shaft of s.shafts||[]){const [x,y]=sweetPoint(shaft),bottom=sweetPoint([shaft[0],shaft[2]])[1];g.rect(x-12,y+15,24,bottom-y-15,0);}

  // Embedded prototype doors retain a complete, level foundation.
 for(const x of [l.spawnX,l.exitX]){const y=x===l.spawnX?l.spawnY:l.exitY;landing(x,y,x===l.spawnX?18:24,x===l.spawnX?20:18);}
 for(const wall of s.walls){const {x,y}=sweetObstacle(l,'wall',wall);landing(x+9,y,55,55);}
 for(const o of l.objects){landing(o.x,o.y,16,24);landing(o.x,o.top,26,24);g.rect(o.x-5,o.top-28,10,o.y-o.top+28,0);g.rect(o.x-8,o.y,17,12,1);}
 for(const wall of s.walls){const {x,y,path}=sweetObstacle(l,'wall',wall);for(let xx=x;xx<x+18;xx++){const floor=y;g.rect(xx,floor-37,1,52,1);}}
 for(const gap of s.gaps){const x=sweetPoint(gap)[0],right=sweetPoint([gap[1],gap[2]])[0],near=sweetObstacle(l,'gap',[gap[0],gap[2]]);for(let xx=x;xx<=right;xx++){const y=Math.round(pathY(near.path,xx)??near.y);g.rect(xx,y-34,1,105,0);}}
 g.rect(l.exitX-24,l.exitY,49,8,1);
 cache.set(l.id,g.terrain.slice());
}

