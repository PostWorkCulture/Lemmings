import {illustratedBackdrop,readableTerrain,paintFreshCuts} from './terrain-readability.js';
const sheets=['01-honeycomb-ribbonfall.png','02-wafer-gummy.png','03-meringue-liquorice.png','04-bonbon-peppermint.png','05-macaron-cathedral.png'];
import {initialSweetMask,sweetSourceMask,sweetObstacle,pathY} from './sweet-reboot-terrain.js';
import {SWEET_STUDIES,sweetPoint} from './sweet-reboot-levels.js';
const artwork=[],requested=new Set();const paints=new Map();
function loadArtwork(i){if(typeof document==='undefined'||requested.has(i))return;requested.add(i);const im=new Image();im.src=new URL('../concepts/sweet-reboot/'+sheets[i],import.meta.url).href;im.decode().then(()=>{artwork[i]=im;paints.clear();window.dispatchEvent(new CustomEvent('sweet-art-ready',{detail:{sheet:i}}));}).catch(()=>console.warn('Sweet artwork unavailable: '+sheets[i]));}
const palettes=[['#cf882e','#f7d383'],['#ce8648','#ffe2a0'],['#ac672e','#f4d080'],['#199c9f','#9dede0'],['#d8b893','#fff5da'],['#b96478','#f6c2bc'],['#673b2c','#d39765'],['#cc4662','#fff2d5'],['#bf8b50','#f4d69c'],['#d4b18a','#fff0cb']];
function texture(level){let tex=paints.get(level.id);if(tex)return tex;const s=SWEET_STUDIES[level.sweetReboot];loadArtwork(s.sheet);const canvas=document.createElement('canvas');canvas.width=1000;canvas.height=level.height;const c=canvas.getContext('2d');if(artwork[s.sheet])c.drawImage(artwork[s.sheet],0,s.crop[0],1536,s.crop[1],20,45,960,s.crop[1]*.85);tex=c.getImageData(0,0,1000,level.height);paints.set(level.id,tex);return tex;}
export function paintRebootTerrain(c,g){const source=sweetSourceMask(g.level.id),tex=texture(g.level),im=c.createImageData(1000,g.height),d=im.data,pair=palettes[g.level.sweetReboot];const rgb=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)),base=rgb(pair[0]),light=rgb(pair[1]);
 for(let i=0;i<g.terrain.length;i++){const kind=g.terrain[i];if(!kind)continue;const p=i*4,x=i%1000,y=Math.floor(i/1000);let col;
  if(kind===3)col=y%2?[196,154,41]:[239,210,91];
  else{col=[tex.data[p],tex.data[p+1],tex.data[p+2]];if(tex.data[p+3]<80||(!source?.[i]&&Math.max(...col)<44)){const grain=((Math.sin(x*12.9898+y*78.233)*43758.5453)%1)*.07;const n=Math.sin(x*.17+y*.23)*.035+Math.sin(y*.15)*.035+grain;col=base.map(v=>v*(1+n));if(g.level.sweetReboot>=8){const seam=y%6===0,crumb=Math.sin(x*3.7+y*8.9)>.93;col=col.map((v,k)=>seam?v*.77:crumb?v*.68:v*.86+light[k]*.14);}}}
  d[p]=col[0];d[p+1]=col[1];d[p+2]=col[2];d[p+3]=255;
 }const study=SWEET_STUDIES[g.level.sweetReboot],walls=study.walls.map(w=>sweetObstacle(g.level,'wall',w)),shafts=(study.shafts||[]).map(v=>sweetObstacle(g.level,'shaft',v));
 readableTerrain(im,g,walls,base,light,shafts);paintFreshCuts(im,g,initialSweetMask(g.level.id),walls,base,light);c.putImageData(im,0,0);
}
export function sweetDoors(c,tick,l,spawned,lastSpawnTick){const s=SWEET_STUDIES[l.sweetReboot],im=artwork[s.sheet];if(!im)return;
 for(const [kind,point] of [['entry',s.entry],['exit',s.exit]]){const [x,y]=sweetPoint(point);c.save();const w=kind==='entry'?76:78,h=70;c.beginPath();c.roundRect(x-w*.625/2,y-h*.85,w*.625,h*.85,[w*.625/2,w*.625/2,0,0]);c.clip();c.drawImage(im,point[0]-w/2,s.crop[0]+point[1]-h,w,h,x-w*.625/2,y-h*.85,w*.625,h*.85);
  if(kind==='entry'){
   const opening=Math.min(1,tick/20),closed=spawned>=l.total?Math.min(1,(tick-lastSpawnTick-20)/25):0;
   c.globalAlpha=Math.max(0,.7*(1-opening+closed));c.fillStyle='#714422';c.beginPath();c.roundRect(x-7,y-25,14,25,[8,8,0,0]);c.fill();
  }c.restore();
 }
}

export function sweetBackdrop(l){
 const breaks=SWEET_STUDIES[l.sweetReboot].gaps.map(gap=>{const q=sweetObstacle(l,'gap',[gap[0],gap[2]]),right=sweetPoint([gap[1],gap[2]])[0];return {x:q.x,right,leftY:pathY(q.path,q.x)??q.y,rightY:pathY(q.path,right)??q.y};});
 return illustratedBackdrop(texture(l),l.height,[16,16,25],breaks);
}
