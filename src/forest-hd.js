// Freaky Forest high-definition terrain.
// The collision map stays a 1000-wide world grid. This module bakes it into a
// canvas at RENDER_SCALE× with photographic CC0 materials (ambientCG), normal-map
// lighting, bevelled silhouettes, a cast shadow and baked exit-torch light.
// Only regions whose terrain changed since the last bake are repainted.
import {WIDTH} from './engine.js';

export const RENDER_SCALE=2;
export const isForestHD=level=>!!level&&level.theme==='woodland'&&level.connectedStudy==null&&level.sweetReboot==null&&!level.embeddedDoors;
export const renderScaleFor=level=>isForestHD(level)?RENDER_SCALE:1;

const MAPS={earthC:'earth-color',earthN:'earth-normal',mossC:'moss-color',mossN:'moss-normal',stoneC:'stone-color',stoneN:'stone-normal'};
// World pixels covered by one repeat of each material.
const TILE={earth:200,moss:120,stone:140};
export const forestImages={};
if(typeof document!=='undefined'){
 await Promise.all(Object.entries(MAPS).map(async([key,file])=>{
  const image=new Image();image.src=new URL(`../assets/terrain/forest/${file}.jpg`,import.meta.url).href;
  try{await image.decode();forestImages[key]=image;}catch{ /* Missing maps fall back to flat palette colours. */ }
 }));
}

// Each map is resampled once per output scale so one texel lands on one output pixel.
const resampled=new Map();
function material(key,tile,scale){
 const id=key+scale;if(resampled.has(id))return resampled.get(id);
 const size=Math.round(tile*scale),image=forestImages[key];let data=null;
 if(image){const c=document.createElement('canvas');c.width=c.height=size;const x=c.getContext('2d');x.imageSmoothingQuality='high';x.drawImage(image,0,0,size,size);data=x.getImageData(0,0,size,size).data;}
 const result={size,data};resampled.set(id,result);return result;
}
const sample=(m,x,y,out)=>{
 if(!m.data){out[0]=out[1]=out[2]=.5;return out;}
 const s=m.size,u=((Math.floor(x)%s)+s)%s,v=((Math.floor(y)%s)+s)%s,o=(v*s+u)*4;
 out[0]=m.data[o]/255;out[1]=m.data[o+1]/255;out[2]=m.data[o+2]/255;return out;
};

// Smooth value noise in [0,1] for large-scale variation.
const lattice=(x,y)=>{let n=Math.imul(x+3,374761393)^Math.imul(y+11,668265263);n=Math.imul(n^(n>>>13),1274126177);return (n>>>0)/4294967296;};
function noise(x,y){const ix=Math.floor(x),iy=Math.floor(y);let fx=x-ix,fy=y-iy;fx=fx*fx*(3-2*fx);fy=fy*fy*(3-2*fy);
 const a=lattice(ix,iy),b=lattice(ix+1,iy),c=lattice(ix,iy+1),d=lattice(ix+1,iy+1);return (a+(b-a)*fx)*(1-fy)+(c+(d-c)*fx)*fy;}
const smooth=(a,b,x)=>{const t=Math.min(1,Math.max(0,(x-a)/(b-a)));return t*t*(3-2*t);};
// Grey rock luminance is mapped onto the forest's warm soil browns.
const RAMP=[[43,22,13],[104,58,30],[160,98,46],[214,160,104]];
function ramp(t,out){t=Math.min(.999,Math.max(0,t))*3;const i=t|0,f=t-i,a=RAMP[i],b=RAMP[i+1];for(let k=0;k<3;k++)out[k]=a[k]+(b[k]-a[k])*f;return out;}
const LIGHT=(()=>{const v=[-.5,-.75,.55],l=Math.hypot(...v);return v.map(n=>n/l);})();
// Shading only reads depth to 16 and bevel distance to 8, which keeps dig re-bakes small.
const DEPTH_CAP=16,EDGE_CAP=8;

export function exitTorches(level){return [[level.exitX-27,level.exitY-60],[level.exitX+28,level.exitY-60]];}

const states=new WeakMap();
function stateFor(game,canvas){
 const H=game.height,S=Math.max(1,Math.round(canvas.width/WIDTH));let s=states.get(canvas);
 if(!s||s.level!==game.level||s.H!==H||s.S!==S||s.terrainRef!==game.terrain){
  s={level:game.level,H,S,terrainRef:game.terrain,snap:null,occ:new Float32Array(WIDTH*H),edge:new Float32Array(WIDTH*H),gx:new Float32Array(WIDTH*H),gy:new Float32Array(WIDTH*H),depth:new Uint8Array(WIDTH*H),
   image:null,earthC:material('earthC',TILE.earth,S),earthN:material('earthN',TILE.earth,S),mossC:material('mossC',TILE.moss,S),mossN:material('mossN',TILE.moss,S),stoneC:material('stoneC',TILE.stone,S),stoneN:material('stoneN',TILE.stone,S)};
  states.set(canvas,s);
 }
 return s;
}

// Field data at world resolution: blurred occupancy (anti-aliased outline),
// distance to open air (bevel) and soil depth below the exposed surface (moss cap).
function computeField(s,t,x0,y0,x1,y1){
 const H=s.H,solid=(x,y)=>{x=x<0?0:x>=WIDTH?WIDTH-1:x;y=y<0?0:y>=H?H-1:y;return t[y*WIDTH+x]?1:0;};
 const w=[1,2,3,2,1];
 for(let y=y0;y<y1;y++)for(let x=x0;x<x1;x++){let sum=0;for(let j=-2;j<=2;j++)for(let i=-2;i<=2;i++)sum+=w[i+2]*w[j+2]*solid(x+i,y+j);s.occ[y*WIDTH+x]=sum/81;}
 const wx0=Math.max(0,x0-EDGE_CAP-1),wy0=Math.max(0,y0-EDGE_CAP-1),wx1=Math.min(WIDTH,x1+EDGE_CAP+1),wy1=Math.min(H,y1+EDGE_CAP+1),ww=wx1-wx0,wh=wy1-wy0,d=new Float32Array(ww*wh);
 for(let y=0;y<wh;y++)for(let x=0;x<ww;x++)d[y*ww+x]=t[(y+wy0)*WIDTH+x+wx0]?99:0;
 // Terrain continues past the frame, so the screen edge never gains a bevel.
 for(let y=0;y<wh;y++)for(let x=0;x<ww;x++){const i=y*ww+x;if(!d[i])continue;let v=d[i];
  if(x)v=Math.min(v,d[i-1]+1);if(y){v=Math.min(v,d[i-ww]+1);if(x)v=Math.min(v,d[i-ww-1]+1.41);if(x<ww-1)v=Math.min(v,d[i-ww+1]+1.41);}d[i]=v;}
 for(let y=wh-1;y>=0;y--)for(let x=ww-1;x>=0;x--){const i=y*ww+x;if(!d[i])continue;let v=d[i];
  if(x<ww-1)v=Math.min(v,d[i+1]+1);if(y<wh-1){v=Math.min(v,d[i+ww]+1);if(x<ww-1)v=Math.min(v,d[i+ww+1]+1.41);if(x)v=Math.min(v,d[i+ww-1]+1.41);}d[i]=v;}
 for(let y=y0;y<y1;y++)for(let x=x0;x<x1;x++)s.edge[y*WIDTH+x]=Math.min(EDGE_CAP,d[(y-wy0)*ww+x-wx0]);
 // Bevel direction: the gradient of distance-to-air.
 const ed=(x,y)=>s.edge[(y<0?0:y>=H?H-1:y)*WIDTH+(x<0?0:x>=WIDTH?WIDTH-1:x)];
 for(let y=y0;y<y1;y++)for(let x=x0;x<x1;x++){const i=y*WIDTH+x;s.gx[i]=(ed(x+1,y)-ed(x-1,y))/2;s.gy[i]=(ed(x,y+1)-ed(x,y-1))/2;}
 for(let x=x0;x<x1;x++){const ys=Math.max(0,y0-DEPTH_CAP-1);let v=ys===0?DEPTH_CAP:0;
  for(let y=ys;y<y1;y++){const i=y*WIDTH+x;v=t[i]?Math.min(v+1,DEPTH_CAP):0;if(y>=y0)s.depth[i]=v;}}
}

function bilinear(arr,H,x,y){
 x-=.5;y-=.5;const x0=Math.max(0,Math.min(WIDTH-1,Math.floor(x))),y0=Math.max(0,Math.min(H-1,Math.floor(y))),x1=Math.min(WIDTH-1,x0+1),y1=Math.min(H-1,y0+1);
 const fx=Math.min(1,Math.max(0,x-x0)),fy=Math.min(1,Math.max(0,y-y0));
 return (arr[y0*WIDTH+x0]*(1-fx)+arr[y0*WIDTH+x1]*fx)*(1-fy)+(arr[y1*WIDTH+x0]*(1-fx)+arr[y1*WIDTH+x1]*fx)*fy;
}

const C=[0,0,0],N=[0,0,0],G=[0,0,0];
function bake(s,game,x0,y0,x1,y1){
 const {S,H}=s,t=game.terrain,img=s.image.data,OW=WIDTH*S,torches=exitTorches(game.level),waterY=['water','lava'].includes(game.level.hazard)?game.hazardY:H+1;
 for(let oy=y0*S;oy<y1*S;oy++){
  const wy=(oy+.5)/S;
  for(let ox=x0*S;ox<x1*S;ox++){
   const wx=(ox+.5)/S,o=(oy*OW+ox)*4,cell=t[Math.min(H-1,wy|0)*WIDTH+Math.min(WIDTH-1,wx|0)];
   const occ=bilinear(s.occ,H,wx,wy),aa=.14/S+.01,al=wy>=waterY?0:smooth(.5-aa,.5+aa,occ);
   const shadow=wy>=waterY?0:.45*bilinear(s.occ,H,wx-4,wy-6)*(1-al);
   if(al<=0){img[o]=6;img[o+1]=14;img[o+2]=11;img[o+3]=Math.round(shadow*255);continue;}
   const wi=Math.min(H-1,wy|0)*WIDTH+Math.min(WIDTH-1,wx|0),depth=s.depth[wi],e=s.edge[wi],gx=s.gx[wi],gy=s.gy[wi],bevel=1-smooth(0,4.5,e);
   let strength;
   if(cell===2){sample(s.stoneC,ox,oy,C);C[0]*=211;C[1]*=225;C[2]*=239;sample(s.stoneN,ox,oy,N);strength=1;}
   else{
    // The moss cap's lower edge wanders with the moss texture itself.
    const cap=4+7*sample(s.mossC,ox*1.3,50*S,G)[1];
    if(depth<cap){sample(s.mossC,ox,oy,C);for(let k=0;k<3;k++)C[k]*=268;sample(s.mossN,ox,oy,N);strength=.6;
     if(depth<1.6){C[0]+=(205-C[0])*.55;C[1]+=(232-C[1])*.55;C[2]+=(122-C[2])*.55;}}
    else{
     // Two quarter-turned samples, blended by slow noise, hide the texture repeat.
     const w=smooth(.3,.7,noise(wx/150,wy/150)),bx=oy*.83+137*S,by=ox*.83+59*S;
     sample(s.earthC,ox,oy,G);let l=G[0]*.3+G[1]*.59+G[2]*.11;sample(s.earthC,bx,by,G);l+=(G[0]*.3+G[1]*.59+G[2]*.11-l)*w;
     ramp((l-.18)/.55+(noise(wx/60+9,wy/60+3)-.5)*.16,C);
     sample(s.earthN,ox,oy,N);const n0=N[0],n1=N[1];sample(s.earthN,bx,by,N);
     // Swapping the axes of the second sample swaps its normal's x and y.
     const r0=N[1],r1=N[0];N[0]=n0+(r0-n0)*w;N[1]=n1+(r1-n1)*w;
     strength=.85;
     if(depth<cap+4){const k=.55+.45*(depth-cap)/4;C[0]*=k;C[1]*=k;C[2]*=k;}}
   }
   let nx=(N[0]*2-1)*strength-gx*2.2*bevel,ny=-(N[1]*2-1)*strength-gy*2.2*bevel,nz=1;const nl=Math.sqrt(nx*nx+ny*ny+nz*nz);nx/=nl;ny/=nl;nz/=nl;
   const lit=(.35+.85*Math.max(0,nx*LIGHT[0]+ny*LIGHT[1]+nz*LIGHT[2]))*(.74+.26*(1-smooth(2,EDGE_CAP,e)));
   let warm=0;for(const [tx,ty] of torches){const dx=tx-wx,dy=ty-wy;if(dx>130||dx<-130||dy>130||dy<-130)continue;const d=Math.sqrt(dx*dx+dy*dy+1600);if(d<130)warm+=Math.max(0,(nx*dx+ny*dy+nz*40)/d)*(1-d/130)**2*1.3;}
   const r=C[0]*(lit+warm),g=C[1]*(lit+warm*.7),b=C[2]*(lit+warm*.4),A=al+shadow*(1-al);
   img[o]=r*al/A+6*(1-al/A);img[o+1]=g*al/A+14*(1-al/A);img[o+2]=b*al/A+11*(1-al/A);img[o+3]=Math.round(A*255);
  }
 }
}

const hash=(x,y)=>{let n=Math.imul(x+101,374761393)^Math.imul(y+7,668265263);n=Math.imul(n^(n>>>13),1274126177);return (n>>>0)/4294967296;};
// Fine grass blades fringe exposed soil. They are paint only; collision is unchanged.
function grass(c,s,game,x0,y0,x1,y1){
 const t=game.terrain,{S,H}=s,waterY=['water','lava'].includes(game.level.hazard)?game.hazardY:H+1;
 c.save();c.beginPath();c.rect(x0*S,y0*S,(x1-x0)*S,(y1-y0)*S);c.clip();
 for(let x=x0;x<x1;x++)for(let y=Math.max(1,y0);y<Math.min(H,y1+8,waterY);y++){
  const i=y*WIDTH+x;if(t[i]!==1||t[i-WIDTH])continue;
  // Only substantial, upward-facing ground grows a fringe.
  if(y+5>=H||t[i+5*WIDTH]!==1||(x>2&&!t[i-2])||(x<WIDTH-3&&!t[i+2]))continue;
  for(let k=0;k<S;k++){const r=hash(x*S+k,y),h=1.2+r*3.6,lean=(hash(y,x*S+k)-.5)*1.4;
   c.fillStyle=r>.66?'#c9e27a':r>.33?'#8fb04a':'#5d7f33';
   c.beginPath();c.moveTo(x*S+k,y*S+1);c.lineTo(x*S+k+1,y*S+1);c.lineTo((x+lean)*S+k+.5,(y-h)*S);c.closePath();c.fill();}
 }
 c.restore();
}

export function paintForestTerrain(game,canvas){
 const s=stateFor(game,canvas),{S,H}=s,t=game.terrain,c=canvas.getContext('2d');
 if(canvas.height!==H*S)canvas.height=H*S;
 if(!s.image)s.image=c.createImageData(WIDTH*S,H*S);
 const rects=[];
 if(!s.snap){s.snap=t.slice();computeField(s,t,0,0,WIDTH,H);rects.push([0,0,WIDTH,H]);}
 else{
  // Changed 32 px tiles are re-baked with enough margin for blur, bevel, depth and shadow.
  const T=16,cols=Math.ceil(WIDTH/T),dirty=new Set();
  for(let i=0;i<t.length;i++)if(t[i]!==s.snap[i]){dirty.add(Math.floor(i/WIDTH/T)*cols+Math.floor(i%WIDTH/T));s.snap[i]=t[i];}
  if(!dirty.size)return;
  // Affected output: blur ±2, bevel ±8, moss depth 16 below, shadow +4/+6.
  for(const tile of dirty){const tx=tile%cols*T,ty=Math.floor(tile/cols)*T;
   const b=[Math.max(0,tx-11),Math.max(0,ty-11),Math.min(WIDTH,tx+T+15),Math.min(H,ty+T+DEPTH_CAP+9)];
   rects.push(b);}
  // Overlapping tile rectangles merge so shared margins are only baked once.
  for(let merged=true;merged;){merged=false;
   for(let i=0;i<rects.length&&!merged;i++)for(let j=i+1;j<rects.length;j++){const a=rects[i],b=rects[j];
    if(a[0]<=b[2]&&b[0]<=a[2]&&a[1]<=b[3]&&b[1]<=a[3]){rects[i]=[Math.min(a[0],b[0]),Math.min(a[1],b[1]),Math.max(a[2],b[2]),Math.max(a[3],b[3])];rects.splice(j,1);merged=true;break;}}}
  for(const b of rects)computeField(s,t,Math.max(0,b[0]-7),Math.max(0,b[1]-8),Math.min(WIDTH,b[2]+2),Math.min(H,b[3]+2));
 }
 for(const [x0,y0,x1,y1] of rects){bake(s,game,x0,y0,x1,y1);c.putImageData(s.image,0,0,x0*S,y0*S,(x1-x0)*S,(y1-y0)*S);grass(c,s,game,x0,y0,x1,y1);}
}

// Live, flickering light from the exit torches, drawn over the finished frame.
export function forestTorchGlow(c,level,tick){
 c.save();c.globalCompositeOperation='lighter';
 exitTorches(level).forEach(([x,y],i)=>{const f=.8+.2*Math.sin(tick*.21+i*2)*Math.sin(tick*.13+i);
  const g=c.createRadialGradient(x,y,2,x,y,120);g.addColorStop(0,`rgba(255,190,110,${.32*f})`);g.addColorStop(.35,`rgba(255,150,70,${.11*f})`);g.addColorStop(1,'rgba(255,140,60,0)');
  c.fillStyle=g;c.fillRect(x-120,y-120,240,240);});
 c.restore();
}

/* ---------- Entrance hatch and exit arch in the textured forest style ---------- */
let stonePattern=null,mossPattern=null;
function patterns(c){
 if(!stonePattern&&forestImages.stoneC){stonePattern=c.createPattern(forestImages.stoneC,'repeat');stonePattern.setTransform(new DOMMatrix().scale(.11));}
 if(!mossPattern&&forestImages.mossC){mossPattern=c.createPattern(forestImages.mossC,'repeat');mossPattern.setTransform(new DOMMatrix().scale(.07));}
}
const path=(c,points)=>{c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();};
function plank(c,x,y,w,h,base,seed){
 const g=c.createLinearGradient(x,y,x,y+h);g.addColorStop(0,shade(base,1.18));g.addColorStop(.5,base);g.addColorStop(1,shade(base,.68));
 c.fillStyle=g;c.fillRect(x,y,w,h);
 c.strokeStyle=shade(base,.55);c.lineWidth=.35;
 for(let i=0;i<3;i++){const yy=y+h*(.25+i*.25)+Math.sin(seed+i)*.4;c.beginPath();c.moveTo(x+.5,yy);c.bezierCurveTo(x+w*.3,yy+.5,x+w*.6,yy-.6,x+w-.5,yy+.2);c.stroke();}
}
function shade(hex,k){const n=parseInt(hex.slice(1),16),f=v=>Math.max(0,Math.min(255,Math.round(v*k)));return `rgb(${f(n>>16)},${f(n>>8&255)},${f(n&255)})`;}
function mossTuft(c,x,y,w){
 c.fillStyle=mossPattern||'#6f9a3a';c.beginPath();c.moveTo(x,y+1.5);
 for(let i=0;i<=8;i++){const px=x+w*i/8;c.quadraticCurveTo(px-w/16,y-2.2-((i*7)%3)*.6,px,y-.2);}
 c.lineTo(x+w,y+1.5);c.closePath();c.fill();
 c.fillStyle='rgba(205,232,122,.35)';c.fillRect(x+1,y-1.2,w-2,.6);
}

// Same footprint, doors and swing as the classic hatch, built from mossy oak
// with a faded red-painted body so the original read is kept.
export function forestHatch(c,open){
 patterns(c);
 c.save();
 c.fillStyle='rgba(6,14,11,.35)';c.fillRect(-33,-37,68,14);
 // Painted body with a dark interior window.
 plank(c,-31,-39,62,15,'#8a3324',1);
 const inner=c.createLinearGradient(0,-36,0,-25);inner.addColorStop(0,'#0e1c2b');inner.addColorStop(1,'#25415a');
 c.fillStyle=inner;path(c,[[-26,-36],[26,-36],[23,-26],[-23,-26]]);c.fill();
 c.fillStyle='rgba(160,210,255,.18)';c.fillRect(-22,-35,44,1);
 // Iron straps and rivets.
 c.fillStyle='#2a2522';for(const x of [-30,28])c.fillRect(x,-39,2,15);
 c.fillStyle='#b7a27a';for(const [x,y] of [[-29,-37],[29,-37],[-29,-27],[29,-27]]){c.beginPath();c.arc(x,y,.8,0,Math.PI*2);c.fill();}
 // Oak canopy beam with moss along the top.
 plank(c,-36,-46,73,8,'#6b4527',3);
 c.fillStyle='#3a2416';c.fillRect(-36,-38.5,73,1);
 c.fillStyle='#2a2522';c.fillRect(-35,-44,4,4);c.fillRect(32,-44,4,4);
 // A dark keyline keeps the hatch readable against night foliage.
 c.strokeStyle='rgba(12,8,6,.85)';c.lineWidth=.7;c.strokeRect(-36,-46,73,8);c.strokeRect(-31,-38.5,62,14.5);
 mossTuft(c,-34,-46,22);mossTuft(c,-6,-46,14);mossTuft(c,16,-46,19);
 c.fillStyle='rgba(120,170,70,.8)';for(const [x,l] of [[-30,4],[-21,6],[22,5],[30,3]]){c.fillRect(x,-45,.8,l);}
 // Hinged door panels: hanging when open, meeting beneath the canopy when shut.
 for(const side of [-1,1]){
  c.save();c.translate(side*28,-24);c.rotate(side*(1-open)*Math.PI/2);
  const w=12,len=22+18*(1-open),x=side<0?-w+3:-3;
  plank(c,x,0,w,len,'#7a4a2a',side);
  c.fillStyle='#2a2522';c.fillRect(x,2,w,1.4);c.fillRect(x,len-4,w,1.4);
  c.fillStyle='#b7a27a';c.beginPath();c.arc(x+(side<0?w-2:2),2.7,.7,0,Math.PI*2);c.fill();
  c.restore();
 }
 c.restore();
}

// The splayed arch, gold trim, green portal and twin torches stay; the body is
// now carved mossy stone lit by its own fire.
export function forestExit(c,tick){
 patterns(c);
 const outer=[[-35,0],[-31,-10],[-15,-51],[-9,-57],[10,-57],[17,-51],[34,-7],[37,0]];
 c.save();
 c.fillStyle='rgba(6,14,11,.4)';path(c,outer.map(([x,y])=>[x+3,y+2]));c.fill();
 c.fillStyle=stonePattern||'#6d7568';path(c,outer);c.fill();
 const light=c.createLinearGradient(-30,-57,30,0);light.addColorStop(0,'rgba(255,230,180,.25)');light.addColorStop(.5,'rgba(0,0,0,0)');light.addColorStop(1,'rgba(0,10,5,.45)');
 c.fillStyle=light;path(c,outer);c.fill();
 c.strokeStyle='rgba(10,20,14,.7)';c.lineWidth=.8;path(c,outer);c.stroke();
 // Gold inlay keeps the classic exit's colour signature.
 c.strokeStyle='#d7ac43';c.lineWidth=1.6;c.beginPath();c.moveTo(-25,-2);c.lineTo(-9,-46);c.lineTo(9,-46);c.lineTo(26,-2);c.stroke();
 c.strokeStyle='#f6dd85';c.lineWidth=.5;c.beginPath();c.moveTo(-24.4,-2.6);c.lineTo(-8.6,-45.4);c.lineTo(8.6,-45.4);c.stroke();
 for(let i=0;i<5;i++)for(const side of [-1,1]){c.fillStyle=i%2?'#f6dd85':'#b58232';c.beginPath();c.arc(side*(12+i*3.2),-40+i*8,.9,0,Math.PI*2);c.fill();}
 // Portal recess.
 const portal=c.createLinearGradient(0,-39,0,0);portal.addColorStop(0,'#0f4a2a');portal.addColorStop(1,'#1d7a45');
 c.fillStyle=portal;path(c,[[-19,-2],[-4,-39],[6,-39],[20,-2]]);c.fill();
 c.fillStyle='#45c96d';path(c,[[-13,-4],[-2,-32],[4,-32],[14,-4]]);c.fill();
 c.fillStyle='rgba(225,255,215,.35)';path(c,[[-6,-6],[-1,-28],[2,-28],[6,-6]]);c.fill();
 // Worn threshold stone.
 plank(c,-22,-4,45,4,'#8a8473',5);c.fillStyle='#b5ad94';c.fillRect(-16,-5,32,1);
 // Moss and ivy.
 mossTuft(c,-12,-57,24);mossTuft(c,-32,-9,9);mossTuft(c,26,-8,9);
 c.strokeStyle='#4f7d2e';c.lineWidth=.7;
 for(const [x,y,l] of [[-11,-55,11],[13,-50,8],[-27,-18,7]]){c.beginPath();c.moveTo(x,y);c.bezierCurveTo(x-2,y+l*.4,x+2,y+l*.7,x,y+l);c.stroke();
  c.fillStyle='#6e9e3c';for(let k=2;k<l;k+=3){c.beginPath();c.ellipse(x+(k%2?1.2:-1.2),y+k,1.1,.7,k,0,Math.PI*2);c.fill();}}
 // Iron braziers on oak posts, with layered flames.
 for(const [i,tx] of [[0,-27],[1,28]]){
  plank(c,tx-1.5,-52,3,22,'#5e4434',i);
  c.fillStyle='#2a2522';path(c,[[tx-4,-55],[tx+4,-55],[tx+3,-51],[tx-3,-51]]);c.fill();
  c.fillStyle='#8e877b';c.fillRect(tx-4,-55.5,8,.8);
  const f=Math.sin(tick*.31+i*2),h=8+f*1.6;
  const flame=c.createRadialGradient(tx,-56,0,tx,-58,h*.8);flame.addColorStop(0,'#fff6c8');flame.addColorStop(.35,'#ffc565');flame.addColorStop(.75,'#e0612f');flame.addColorStop(1,'rgba(200,60,30,0)');
  c.fillStyle=flame;c.beginPath();c.moveTo(tx-3.5,-55);c.quadraticCurveTo(tx-3.5+f*.6,-55-h*.6,tx+f*.8,-55-h);c.quadraticCurveTo(tx+3.5+f*.6,-55-h*.6,tx+3.5,-55);c.closePath();c.fill();
 }
 c.restore();
}
