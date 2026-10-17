// High-definition terrain for the three campaign worlds.
// The collision map stays a 1000-wide world grid. Each world's profile bakes it
// into a canvas at RENDER_SCALE× with photographic CC0 materials (ambientCG),
// gradient-mapped to the world palette, with normal-map lighting, bevelled
// silhouettes, a cast shadow and baked exit-torch light. Only regions whose
// terrain changed since the last bake are repainted.
import {WIDTH} from './engine.js';

export const RENDER_SCALE=2;
const WOOD=[[74,40,18],[138,86,40],[192,136,70],[232,186,112]];
export const PROFILES={
 woodland:{
  maps:['rock051','moss002','rock064'],
  earth:{map:'rock051',tile:200,ramp:[[43,22,13],[104,58,30],[160,98,46],[214,160,104]],lo:.18,span:.55,n:.85},
  cap:{map:'moss002',tile:120,tint:[268,268,268],min:4,vary:7,varyFrom:'texture',lip:[205,232,122],band:true,n:.6},
  hard:{map:'rock064',tile:140,tint:[211,225,239],n:1},
  planks:WOOD,shadow:[6,14,11],light:{amb:.35,dif:.85},fringe:'grass'
 },
 alpine:{
  maps:['rock058','snow010a','rock030'],
  earth:{map:'rock058',tile:200,ramp:[[40,90,130],[90,150,195],[160,210,235],[230,246,252]],lo:.18,span:.5,n:.7},
  cap:{map:'snow010a',tile:160,tint:[250,254,262],min:11,vary:7,varyFrom:'noise',lip:[255,255,255],band:true,n:.45,onHard:true},
  hard:{map:'rock030',tile:180,ramp:[[30,34,44],[62,68,82],[104,110,124]],lo:.15,span:.5,n:1},
  planks:WOOD,shadow:[8,16,26],light:{amb:.35,dif:.85},fringe:'icicles'
 },
 volcano:{
  maps:['rock035','lava004','snow014','rock030'],
  earth:{map:'rock035',tile:200,ramp:[[16,13,17],[38,32,38],[68,60,64],[106,96,96]],lo:.05,span:.35,n:.85},
  ember:{map:'lava004',tile:220,thr:.085,color:[255,110,40],amount:.9},
  cap:{map:'snow014',tile:160,tint:[150,145,140],min:2,vary:3,varyFrom:'noise',lip:[190,180,170],band:false,n:.3,onHard:true},
  hard:{map:'rock030',tile:180,ramp:[[44,46,52],[82,84,92],[126,128,134]],lo:.15,span:.5,n:1},
  planks:WOOD,shadow:[20,6,6],light:{amb:.3,dif:.85},fringe:null
 }
};
// Which HD world a level belongs to, whether or not its maps have loaded yet.
export const hdWorld=level=>!!level&&level.connectedStudy==null&&level.sweetReboot==null&&!level.embeddedDoors&&PROFILES[level.theme]?level.theme:null;

/* ---------- On-demand texture loading ---------- */
export const hdImages={};
const loading=new Map();
function loadMap(name){
 if(!loading.has(name))loading.set(name,(async()=>{
  for(const kind of ['color','normal']){
   if(name==='lava004'&&kind==='normal')continue;
   const image=new Image();image.src=new URL(`../assets/terrain/hd/${name}-${kind}.jpg`,import.meta.url).href;
   await image.decode();hdImages[`${name}-${kind}`]=image;
  }
 })());
 return loading.get(name);
}
const ready=new Set();
export const isHD=level=>{const w=hdWorld(level);return !!w&&ready.has(w);};
export const renderScaleFor=level=>isHD(level)?RENDER_SCALE:1;
// Resolves true once the level's world can be drawn in HD (false offline or outside a browser).
export function ensureHD(level){
 const w=hdWorld(level);if(!w||typeof document==='undefined')return Promise.resolve(false);
 if(ready.has(w))return Promise.resolve(true);
 return Promise.all(PROFILES[w].maps.map(loadMap)).then(()=>{ready.add(w);return true;},()=>false);
}
export const preloadHD=()=>Promise.all(Object.keys(PROFILES).map(theme=>ensureHD({theme})));
// The opening world is ready before the first frame.
if(typeof document!=='undefined')await ensureHD({theme:'woodland'});

/* ---------- Materials ---------- */
const resampled=new Map();
// Each map is resampled once per output scale so one texel lands on one output pixel.
function material(name,tile,scale){
 const id=name+tile+'@'+scale;if(resampled.has(id))return resampled.get(id);
 const size=Math.round(tile*scale),image=hdImages[name];let data=null;
 if(image){const c=document.createElement('canvas');c.width=c.height=size;const x=c.getContext('2d');x.imageSmoothingQuality='high';x.drawImage(image,0,0,size,size);data=x.getImageData(0,0,size,size).data;}
 const result={size,data};resampled.set(id,result);return result;
}
const sample=(m,x,y,out)=>{
 if(!m||!m.data){out[0]=out[1]=out[2]=.5;return out;}
 const s=m.size,u=((Math.floor(x)%s)+s)%s,v=((Math.floor(y)%s)+s)%s,o=(v*s+u)*4;
 out[0]=m.data[o]/255;out[1]=m.data[o+1]/255;out[2]=m.data[o+2]/255;return out;
};
export const lattice=(x,y)=>{let n=Math.imul(x+3,374761393)^Math.imul(y+11,668265263);n=Math.imul(n^(n>>>13),1274126177);return (n>>>0)/4294967296;};
export function noise(x,y){const ix=Math.floor(x),iy=Math.floor(y);let fx=x-ix,fy=y-iy;fx=fx*fx*(3-2*fx);fy=fy*fy*(3-2*fy);
 const a=lattice(ix,iy),b=lattice(ix+1,iy),c=lattice(ix,iy+1),d=lattice(ix+1,iy+1);return (a+(b-a)*fx)*(1-fy)+(c+(d-c)*fx)*fy;}
const smooth=(a,b,x)=>{const t=Math.min(1,Math.max(0,(x-a)/(b-a)));return t*t*(3-2*t);};
function ramp(stops,t,out){t=Math.min(.999,Math.max(0,t))*(stops.length-1);const i=t|0,f=t-i,a=stops[i],b=stops[i+1];for(let k=0;k<3;k++)out[k]=a[k]+(b[k]-a[k])*f;return out;}
const lum=G=>G[0]*.3+G[1]*.59+G[2]*.11;
const LIGHT=(()=>{const v=[-.5,-.75,.55],l=Math.hypot(...v);return v.map(n=>n/l);})();
// Shading reads depth to 24 (deep snow) and bevel distance to 8, which keeps dig re-bakes small.
const DEPTH_CAP=24,EDGE_CAP=8;

export function exitTorches(level){return [[level.exitX-27,level.exitY-60],[level.exitX+28,level.exitY-60]];}
const cutLine=game=>['water','lava'].includes(game.level.hazard)?game.hazardY:game.height+1;

const states=new WeakMap();
function stateFor(game,canvas){
 const H=game.height,S=Math.max(1,Math.round(canvas.width/WIDTH)),P=PROFILES[hdWorld(game.level)];let s=states.get(canvas);
 if(!s||s.level!==game.level||s.H!==H||s.S!==S||s.terrainRef!==game.terrain){
  const m=(part,kind)=>P[part]&&material(`${P[part].map}-${kind}`,P[part].tile,S);
  s={level:game.level,P,H,S,terrainRef:game.terrain,snap:null,image:null,
   occ:new Float32Array(WIDTH*H),edge:new Float32Array(WIDTH*H),gx:new Float32Array(WIDTH*H),gy:new Float32Array(WIDTH*H),depth:new Uint8Array(WIDTH*H),
   earthC:m('earth','color'),earthN:m('earth','normal'),capC:m('cap','color'),capN:m('cap','normal'),hardC:m('hard','color'),hardN:m('hard','normal'),emberC:m('ember','color')};
  states.set(canvas,s);
 }
 return s;
}

// Field data at world resolution: blurred occupancy (anti-aliased outline),
// distance to open air (bevel) and depth below the exposed surface (cap).
function computeField(s,t,x0,y0,x1,y1){
 const H=s.H,solid=(x,y)=>{x=x<0?0:x>=WIDTH?WIDTH-1:x;y=y<0?0:y>=H?H-1:y;return t[y*WIDTH+x]?1:0;};
 // A 3×3 tent anti-aliases the outline while keeping 1–2 px builder steps solid.
 for(let y=y0;y<y1;y++)for(let x=x0;x<x1;x++){let sum=0;for(let j=-1;j<=1;j++)for(let i=-1;i<=1;i++)sum+=(2-Math.abs(i))*(2-Math.abs(j))*solid(x+i,y+j);s.occ[y*WIDTH+x]=sum/16;}
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

const C=[0,0,0],N=[0,0,0],G=[0,0,0],K=[0,0,0];
function capColor(s,cp,ox,oy,depth){
 sample(s.capC,ox,oy,C);for(let k=0;k<3;k++)C[k]*=cp.tint[k];sample(s.capN,ox,oy,N);
 if(depth<1.6)for(let k=0;k<3;k++)C[k]+=(cp.lip[k]-C[k])*.55;
 return cp.n;
}
function bake(s,game,x0,y0,x1,y1){
 const {S,H,P}=s,t=game.terrain,img=s.image.data,OW=WIDTH*S,torches=exitTorches(game.level),cut=cutLine(game),sh=P.shadow,cp=P.cap,ep=P.earth,hp=P.hard,em=P.ember,lt=P.light;
 for(let oy=y0*S;oy<y1*S;oy++){
  const wy=(oy+.5)/S;
  for(let ox=x0*S;ox<x1*S;ox++){
   const wx=(ox+.5)/S,o=(oy*OW+ox)*4,wi=Math.min(H-1,wy|0)*WIDTH+Math.min(WIDTH-1,wx|0),cell=t[wi];
   const occ=bilinear(s.occ,H,wx,wy),aa=.12/S+.01,al=wy>=cut?0:smooth(.42-aa,.42+aa,occ);
   const shadow=wy>=cut?0:.45*bilinear(s.occ,H,wx-4,wy-6)*(1-al);
   if(al<=0){img[o]=sh[0];img[o+1]=sh[1];img[o+2]=sh[2];img[o+3]=Math.round(shadow*255);continue;}
   const depth=s.depth[wi],e=s.edge[wi],gx=s.gx[wi],gy=s.gy[wi],bevel=1-smooth(0,4.5,e);
   // The cap's lower edge wanders with its own texture or with slow noise.
   const cap=cp.min+cp.vary*(cp.varyFrom==='texture'?sample(s.capC,ox*1.3,50*S,G)[1]:noise(wx/18,7.3));
   let strength,glow=0;
   if(cell===2&&cp.onHard&&depth<cap*.6)strength=capColor(s,cp,ox,oy,depth);
   else if(cell===2){sample(s.hardC,ox,oy,G);if(hp.ramp)ramp(hp.ramp,(lum(G)-hp.lo)/hp.span,C);else for(let k=0;k<3;k++)C[k]=G[k]*hp.tint[k];sample(s.hardN,ox,oy,N);strength=hp.n;}
   else if(cell===3){
    // Builder steps are fresh planks: stretched grain, seams every brick length.
    sample(s.earthC,ox*.22,oy*2.6,G);ramp(P.planks,(lum(G)-.15)/.6,C);
    if(((wx%16)+16)%16<.6){C[0]*=.55;C[1]*=.55;C[2]*=.55;}
    N[0]=N[1]=.5;N[2]=1;strength=0;}
   else if(depth<cap)strength=capColor(s,cp,ox,oy,depth);
   else{
    // Two quarter-turned samples, blended by slow noise, hide the texture repeat.
    const w=smooth(.3,.7,noise(wx/150,wy/150)),bx=oy*.83+137*S,by=ox*.83+59*S;
    sample(s.earthC,ox,oy,G);let l=lum(G);sample(s.earthC,bx,by,G);l+=(lum(G)-l)*w;
    ramp(ep.ramp,(l-ep.lo)/ep.span+(noise(wx/60+9,wy/60+3)-.5)*.16,C);
    sample(s.earthN,ox,oy,N);const n0=N[0],n1=N[1];sample(s.earthN,bx,by,N);
    // Swapping the axes of the second sample swaps its normal's x and y.
    const r0=N[1],r1=N[0];N[0]=n0+(r0-n0)*w;N[1]=n1+(r1-n1)*w;
    strength=ep.n;
    if(cp.band&&depth<cap+4){const k=.55+.45*(depth-cap)/4;C[0]*=k;C[1]*=k;C[2]*=k;}
    // Ember veins glow in the darkest crevices of the rock; they are not lit.
    if(em){sample(s.emberC,ox,oy,K);glow=smooth(em.thr,em.thr-.08,l)*smooth(.35,.7,lum(K))*em.amount*(.75+.25*smooth(2,8,e));}
   }
   let nx=(N[0]*2-1)*strength-gx*2.2*bevel,ny=-(N[1]*2-1)*strength-gy*2.2*bevel,nz=1;const nl=Math.sqrt(nx*nx+ny*ny+nz*nz);nx/=nl;ny/=nl;nz/=nl;
   const lit=(lt.amb+lt.dif*Math.max(0,nx*LIGHT[0]+ny*LIGHT[1]+nz*LIGHT[2]))*(.74+.26*(1-smooth(2,EDGE_CAP,e)));
   let warm=0;for(const [tx,ty] of torches){const dx=tx-wx,dy=ty-wy;if(dx>130||dx<-130||dy>130||dy<-130)continue;const d=Math.sqrt(dx*dx+dy*dy+1600);if(d<130)warm+=Math.max(0,(nx*dx+ny*dy+nz*40)/d)*(1-d/130)**2*1.3;}
   let r=C[0]*(lit+warm),g=C[1]*(lit+warm*.7),b=C[2]*(lit+warm*.4);
   if(glow){r+=em.color[0]*glow;g+=em.color[1]*glow;b+=em.color[2]*glow;}
   const A=al+shadow*(1-al),k=al/A;
   img[o]=r*k+sh[0]*(1-k);img[o+1]=g*k+sh[1]*(1-k);img[o+2]=b*k+sh[2]*(1-k);img[o+3]=Math.round(A*255);
  }
 }
}

const hash=(x,y)=>{let n=Math.imul(x+101,374761393)^Math.imul(y+7,668265263);n=Math.imul(n^(n>>>13),1274126177);return (n>>>0)/4294967296;};
// Fine grass blades fringe exposed forest soil. Paint only; collision is unchanged.
function grass(c,s,game,x0,y0,x1,y1){
 const t=game.terrain,{S,H}=s,cut=cutLine(game);
 for(let x=x0;x<x1;x++)for(let y=Math.max(1,y0);y<Math.min(H,y1+8,cut);y++){
  const i=y*WIDTH+x;if(t[i]!==1||t[i-WIDTH])continue;
  // Only substantial, upward-facing ground grows a fringe.
  if(y+5>=H||t[i+5*WIDTH]!==1||(x>2&&!t[i-2])||(x<WIDTH-3&&!t[i+2]))continue;
  for(let k=0;k<S;k++){const r=hash(x*S+k,y),h=1.2+r*3.6,lean=(hash(y,x*S+k)-.5)*1.4;
   c.fillStyle=r>.66?'#c9e27a':r>.33?'#8fb04a':'#5d7f33';
   c.beginPath();c.moveTo(x*S+k,y*S+1);c.lineTo(x*S+k+1,y*S+1);c.lineTo((x+lean)*S+k+.5,(y-h)*S);c.closePath();c.fill();}
 }
}
// Icicles hang from substantial overhangs on the mountain. Paint only.
function icicles(c,s,game,x0,y0,x1,y1){
 const t=game.terrain,{S,H}=s,cut=cutLine(game);
 for(let x=x0;x<x1;x++)for(let y=Math.max(0,y0-12);y<Math.min(H-1,y1,cut);y++){
  const i=y*WIDTH+x;if(!t[i]||t[i+WIDTH])continue;
  if(y<4||!t[i-4*WIDTH]||(x>3&&!t[i-3])||(x<WIDTH-4&&!t[i+3]))continue;
  const r=hash(x,y*3);if(r>.16)continue;
  const len=2.5+hash(y,x)*7.5,w=.9+hash(x+3,y)*1.1,px=x*S+S/2,py=(y+1)*S;
  const g=c.createLinearGradient(0,py,0,py+len*S);g.addColorStop(0,'rgba(236,248,255,.95)');g.addColorStop(1,'rgba(150,205,235,.55)');
  c.fillStyle=g;c.beginPath();c.moveTo(px-w*S,py-.5);c.lineTo(px+w*S,py-.5);c.lineTo(px,py+len*S);c.closePath();c.fill();
  c.fillStyle='rgba(255,255,255,.8)';c.fillRect(px-w*S*.4,py,Math.max(1,S*.4),len*S*.5);
 }
}

export function paintHDTerrain(game,canvas){
 const s=stateFor(game,canvas),{S,H,P}=s,t=game.terrain,c=canvas.getContext('2d');
 if(canvas.height!==H*S)canvas.height=H*S;
 if(!s.image)s.image=c.createImageData(WIDTH*S,H*S);
 let rects=[];
 if(!s.snap){s.snap=t.slice();computeField(s,t,0,0,WIDTH,H);rects.push([0,0,WIDTH,H]);}
 else{
  const T=16,cols=Math.ceil(WIDTH/T),dirty=new Set();
  for(let i=0;i<t.length;i++)if(t[i]!==s.snap[i]){dirty.add(Math.floor(i/WIDTH/T)*cols+Math.floor(i%WIDTH/T));s.snap[i]=t[i];}
  if(!dirty.size)return;
  // Affected output: blur ±2, bevel ±8, cap depth below, shadow +4/+6.
  for(const tile of dirty){const tx=tile%cols*T,ty=Math.floor(tile/cols)*T;
   rects.push([Math.max(0,tx-11),Math.max(0,ty-11),Math.min(WIDTH,tx+T+15),Math.min(H,ty+T+DEPTH_CAP+9)]);}
  // Overlapping tile rectangles merge so shared margins are only baked once.
  for(let merged=true;merged;){merged=false;
   for(let i=0;i<rects.length&&!merged;i++)for(let j=i+1;j<rects.length;j++){const a=rects[i],b=rects[j];
    if(a[0]<=b[2]&&b[0]<=a[2]&&a[1]<=b[3]&&b[1]<=a[3]){rects[i]=[Math.min(a[0],b[0]),Math.min(a[1],b[1]),Math.max(a[2],b[2]),Math.max(a[3],b[3])];rects.splice(j,1);merged=true;break;}}}
  for(const b of rects)computeField(s,t,Math.max(0,b[0]-7),Math.max(0,b[1]-8),Math.min(WIDTH,b[2]+2),Math.min(H,b[3]+2));
 }
 for(const [x0,y0,x1,y1] of rects){
  bake(s,game,x0,y0,x1,y1);c.putImageData(s.image,0,0,x0*S,y0*S,(x1-x0)*S,(y1-y0)*S);
  if(P.fringe){c.save();c.beginPath();c.rect(x0*S,y0*S,(x1-x0)*S,(y1-y0)*S);c.clip();(P.fringe==='grass'?grass:icicles)(c,s,game,x0,y0,x1,y1);c.restore();}
 }
}

// Live, flickering light from the exit torches, drawn over the finished frame.
export function hdTorchGlow(c,level,tick){
 c.save();c.globalCompositeOperation='lighter';
 exitTorches(level).forEach(([x,y],i)=>{const f=.8+.2*Math.sin(tick*.21+i*2)*Math.sin(tick*.13+i);
  const g=c.createRadialGradient(x,y,2,x,y,120);g.addColorStop(0,`rgba(255,190,110,${.32*f})`);g.addColorStop(.35,`rgba(255,150,70,${.11*f})`);g.addColorStop(1,'rgba(255,140,60,0)');
  c.fillStyle=g;c.fillRect(x-120,y-120,240,240);});
 c.restore();
}
