// Hand-drawn HD art for the three campaign worlds: entrance hatch, exit arch,
// props, backdrops and ambient fliers. Every piece keeps the footprint and
// gameplay cue of the classic art it replaces; only the materials change.
import {WIDTH} from './engine.js';
import {RENDER_SCALE,hdImages,isHD,hdWorld,lattice} from './hd-terrain.js';

const TAU=Math.PI*2;
const path=(c,points)=>{c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();};
function shade(hex,k){const n=parseInt(hex.slice(1),16),f=v=>Math.max(0,Math.min(255,Math.round(v*k)));return `rgb(${f(n>>16)},${f(n>>8&255)},${f(n&255)})`;}
const patternCache=new Map();
function pattern(c,map,scale){
 const key=map+scale;if(patternCache.has(key))return patternCache.get(key);
 const image=hdImages[`${map}-color`];if(!image)return null;
 const p=c.createPattern(image,'repeat');p.setTransform(new DOMMatrix().scale(scale));patternCache.set(key,p);return p;
}
function plank(c,x,y,w,h,base,seed){
 const g=c.createLinearGradient(x,y,x,y+h);g.addColorStop(0,shade(base,1.18));g.addColorStop(.5,base);g.addColorStop(1,shade(base,.68));
 c.fillStyle=g;c.fillRect(x,y,w,h);
 c.strokeStyle=shade(base,.55);c.lineWidth=.35;
 for(let i=0;i<3;i++){const yy=y+h*(.25+i*.25)+Math.sin(seed+i)*.4;c.beginPath();c.moveTo(x+.5,yy);c.bezierCurveTo(x+w*.3,yy+.5,x+w*.6,yy-.6,x+w-.5,yy+.2);c.stroke();}
}
// A lumpy coating on a top edge: moss, snow or ash.
function tuft(c,x,y,w,fill,highlight,height=2.2){
 c.fillStyle=fill;c.beginPath();c.moveTo(x,y+1.5);
 for(let i=0;i<=8;i++){const px=x+w*i/8;c.quadraticCurveTo(px-w/16,y-height-((i*7)%3)*.6,px,y-.2);}
 c.lineTo(x+w,y+1.5);c.closePath();c.fill();
 c.fillStyle=highlight;c.fillRect(x+1,y-height*.55,w-2,.6);
}
function drips(c,points,color='rgba(225,244,255,.9)'){c.fillStyle=color;for(const [x,y,l] of points){c.beginPath();c.moveTo(x-.8,y);c.lineTo(x+.8,y);c.lineTo(x,y+l);c.closePath();c.fill();}}

/* ---------- World looks ---------- */
const LOOK={
 woodland:{canopy:'#6b4527',body:'#8a3324',door:'#7a4a2a',strap:'#2a2522',rivet:'#b7a27a',
  coat:c=>[pattern(c,'moss002',.07)||'#6f9a3a','rgba(205,232,122,.35)'],arch:'rock064',archScale:.11,archTint:null,post:'#5e4434'},
 alpine:{canopy:'#5c4330',body:'#8a3324',door:'#74503a',strap:'#26262a',rivet:'#c9d3d8',
  coat:c=>[pattern(c,'snow010a',.09)||'#eef6fa','rgba(255,255,255,.9)'],arch:'rock058',archScale:.11,archTint:'rgba(70,150,210,.38)',post:'#5c4a3e'},
 volcano:{canopy:'#54402f',body:'#7a2c1e',door:'#5e4232',strap:'#1c1a1a',rivet:'#a08a6a',
  coat:c=>[pattern(c,'snow014',.09)||'#8d8780','rgba(200,190,180,.45)'],arch:'rock035',archScale:.11,archTint:null,post:'#3a2c26'}
};
const look=level=>LOOK[hdWorld(level)]||LOOK.woodland;

// Same footprint, doors and swing as the classic hatch: a red-painted body under
// a timber canopy, coated in the world's moss, snow or ash.
export function hdHatch(c,open,level){
 const L=look(level),w=hdWorld(level),[coat,coatLight]=L.coat(c);
 c.save();
 c.fillStyle='rgba(6,14,11,.35)';c.fillRect(-33,-37,68,14);
 plank(c,-31,-39,62,15,L.body,1);
 const inner=c.createLinearGradient(0,-36,0,-25);inner.addColorStop(0,'#0e1c2b');inner.addColorStop(1,'#25415a');
 c.fillStyle=inner;path(c,[[-26,-36],[26,-36],[23,-26],[-23,-26]]);c.fill();
 c.fillStyle='rgba(160,210,255,.18)';c.fillRect(-22,-35,44,1);
 c.fillStyle=L.strap;for(const x of [-30,28])c.fillRect(x,-39,2,15);
 c.fillStyle=L.rivet;for(const [x,y] of [[-29,-37],[29,-37],[-29,-27],[29,-27]]){c.beginPath();c.arc(x,y,.8,0,TAU);c.fill();}
 plank(c,-36,-46,73,8,L.canopy,3);
 c.fillStyle='rgba(0,0,0,.35)';c.fillRect(-36,-38.5,73,1);
 c.fillStyle=L.strap;c.fillRect(-35,-44,4,4);c.fillRect(32,-44,4,4);
 if(w==='volcano'){c.fillStyle='rgba(255,120,40,.55)';c.fillRect(-35,-38.6,71,.6);c.fillStyle='rgba(255,170,80,.35)';for(const x of [-20,4,24])c.fillRect(x,-44,3,.6);}
 // A dark keyline keeps the hatch readable against any backdrop.
 c.strokeStyle='rgba(12,8,6,.85)';c.lineWidth=.7;c.strokeRect(-36,-46,73,8);c.strokeRect(-31,-38.5,62,14.5);
 if(w==='alpine'){tuft(c,-37,-46,75,coat,coatLight,3.2);drips(c,[[-33,-38,3],[-24,-38,5],[-12,-38,2.5],[3,-38,4],[17,-38,6],[30,-38,3]]);}
 else if(w==='volcano'){tuft(c,-35,-46,30,coat,coatLight,1.4);tuft(c,4,-46,30,coat,coatLight,1.2);}
 else{tuft(c,-34,-46,22,coat,coatLight);tuft(c,-6,-46,14,coat,coatLight);tuft(c,16,-46,19,coat,coatLight);
  c.fillStyle='rgba(120,170,70,.8)';for(const [x,l] of [[-30,4],[-21,6],[22,5],[30,3]])c.fillRect(x,-45,.8,l);}
 // Hinged door panels: hanging when open, meeting beneath the canopy when shut.
 for(const side of [-1,1]){
  c.save();c.translate(side*28,-24);c.rotate(side*(1-open)*Math.PI/2);
  const dw=12,len=22+18*(1-open),x=side<0?-dw+3:-3;
  plank(c,x,0,dw,len,L.door,side);
  c.fillStyle=L.strap;c.fillRect(x,2,dw,1.4);c.fillRect(x,len-4,dw,1.4);
  c.fillStyle=L.rivet;c.beginPath();c.arc(x+(side<0?dw-2:2),2.7,.7,0,TAU);c.fill();
  c.restore();
 }
 c.restore();
}

function brazier(c,tx,i,tick,post){
 // An iron bracket ties each torch post into the arch flank.
 const side=Math.sign(tx);c.strokeStyle='#120c08';c.lineWidth=2.2;c.lineCap='round';c.beginPath();c.moveTo(tx,-33);c.lineTo(tx-side*5,-26);c.stroke();
 c.strokeStyle='#6e6862';c.lineWidth=1;c.beginPath();c.moveTo(tx,-33);c.lineTo(tx-side*5,-26);c.stroke();
 plank(c,tx-1.5,-52,3,22,post,i);c.fillStyle='#2a2522';c.fillRect(tx-2,-31.5,4,1.5);
 c.fillStyle='#2a2522';path(c,[[tx-4,-55],[tx+4,-55],[tx+3,-51],[tx-3,-51]]);c.fill();
 c.fillStyle='#8e877b';c.fillRect(tx-4,-55.5,8,.8);
 const f=Math.sin(tick*.31+i*2),h=8+f*1.6;
 const flame=c.createRadialGradient(tx,-56,0,tx,-58,h*.8);flame.addColorStop(0,'#fff6c8');flame.addColorStop(.35,'#ffc565');flame.addColorStop(.75,'#e0612f');flame.addColorStop(1,'rgba(200,60,30,0)');
 c.fillStyle=flame;c.beginPath();c.moveTo(tx-3.5,-55);c.quadraticCurveTo(tx-3.5+f*.6,-55-h*.6,tx+f*.8,-55-h);c.quadraticCurveTo(tx+3.5+f*.6,-55-h*.6,tx+3.5,-55);c.closePath();c.fill();
}
// The splayed arch, gold inlay, green portal and twin torches stay; the body is
// carved from the world's own stone: mossy rock, glacier ice or basalt.
export function hdExit(c,tick,level){
 const L=look(level),w=hdWorld(level),outer=[[-35,0],[-31,-10],[-15,-51],[-9,-57],[10,-57],[17,-51],[34,-7],[37,0]];
 const [coat,coatLight]=L.coat(c);
 c.save();
 c.fillStyle='rgba(6,14,11,.4)';path(c,outer.map(([x,y])=>[x+3,y+2]));c.fill();
 c.fillStyle=pattern(c,L.arch,L.archScale)||'#6d7568';path(c,outer);c.fill();
 if(L.archTint){c.fillStyle=L.archTint;path(c,outer);c.fill();}
 const light=c.createLinearGradient(-30,-57,30,0);light.addColorStop(0,'rgba(255,230,180,.25)');light.addColorStop(.5,'rgba(0,0,0,0)');light.addColorStop(1,'rgba(0,10,5,.45)');
 c.fillStyle=light;path(c,outer);c.fill();
 c.strokeStyle='rgba(10,20,14,.7)';c.lineWidth=.8;path(c,outer);c.stroke();
 if(w==='volcano'){c.strokeStyle='rgba(255,120,40,.85)';c.lineWidth=.6;for(const pts of [[[-28,-6],[-24,-14],[-26,-20]],[[22,-30],[26,-22],[24,-14]],[[-6,-55],[-2,-50],[3,-53]]]){c.beginPath();pts.forEach(([x,y],k)=>k?c.lineTo(x,y):c.moveTo(x,y));c.stroke();}}
 c.strokeStyle='#d7ac43';c.lineWidth=1.6;c.beginPath();c.moveTo(-25,-2);c.lineTo(-9,-46);c.lineTo(9,-46);c.lineTo(26,-2);c.stroke();
 c.strokeStyle='#f6dd85';c.lineWidth=.5;c.beginPath();c.moveTo(-24.4,-2.6);c.lineTo(-8.6,-45.4);c.lineTo(8.6,-45.4);c.stroke();
 for(let i=0;i<5;i++)for(const side of [-1,1]){c.fillStyle=i%2?'#f6dd85':'#b58232';c.beginPath();c.arc(side*(12+i*3.2),-40+i*8,.9,0,TAU);c.fill();}
 const portal=c.createLinearGradient(0,-39,0,0);portal.addColorStop(0,'#0f4a2a');portal.addColorStop(1,'#1d7a45');
 c.fillStyle=portal;path(c,[[-19,-2],[-4,-39],[6,-39],[20,-2]]);c.fill();
 c.fillStyle='#45c96d';path(c,[[-13,-4],[-2,-32],[4,-32],[14,-4]]);c.fill();
 c.fillStyle='rgba(225,255,215,.35)';path(c,[[-6,-6],[-1,-28],[2,-28],[6,-6]]);c.fill();
 plank(c,-22,-4,45,4,w==='volcano'?'#4a4442':'#8a8473',5);c.fillStyle=w==='volcano'?'#6e6662':'#b5ad94';c.fillRect(-16,-5,32,1);
 if(w==='alpine'){tuft(c,-13,-57,27,coat,coatLight,3);tuft(c,-34,-9,10,coat,coatLight,2.4);tuft(c,25,-8,11,coat,coatLight,2.4);
  drips(c,[[-9,-55,4],[-3,-55,6],[4,-55,3.5],[9,-55,5],[-31,-7,3],[33,-6,3.5]]);}
 else if(w==='volcano'){tuft(c,-11,-57,22,coat,coatLight,1.3);}
 else{tuft(c,-12,-57,24,coat,coatLight);tuft(c,-32,-9,9,coat,coatLight);tuft(c,26,-8,9,coat,coatLight);
  c.strokeStyle='#4f7d2e';c.lineWidth=.7;
  for(const [x,y,l] of [[-11,-55,11],[13,-50,8],[-27,-18,7]]){c.beginPath();c.moveTo(x,y);c.bezierCurveTo(x-2,y+l*.4,x+2,y+l*.7,x,y+l);c.stroke();
   c.fillStyle='#6e9e3c';for(let k=2;k<l;k+=3){c.beginPath();c.ellipse(x+(k%2?1.2:-1.2),y+k,1.1,.7,k,0,TAU);c.fill();}}}
 brazier(c,-27,0,tick,L.post);brazier(c,28,1,tick,L.post);
 c.restore();
}

/* ---------- Props: same footprints and gameplay cues, world materials ---------- */
function keyline(c,width,colors){
 c.save();c.lineJoin='round';c.lineCap='round';
 c.strokeStyle='#120c08';c.lineWidth=width+2.4;c.stroke();
 colors.forEach(([color,w])=>{c.strokeStyle=color;c.lineWidth=w;c.stroke();});c.restore();
}
function grad(c,x0,x1,a,b){const g=c.createLinearGradient(x0,0,x1,0);g.addColorStop(0,a);g.addColorStop(1,b);return g;}
const IRON=['#9a9590','#4a4644'];
// Returns true when the object was painted in its world's HD style.
export function hdObject(c,o,g,isDangerous,objectPosition){
 if(!isHD(g.level))return false;
 const w=hdWorld(g.level),iron=w==='volcano';
 if(o.type==='ladder'){
  const top=o.top??o.y,bottom=o.bottom??o.y,[a,b]=iron?IRON:['#c99a5c','#8b5a2e'];
  c.beginPath();for(let y=top;y<=bottom;y+=8){c.moveTo(o.x-5,y);c.lineTo(o.x+5,y);}
  keyline(c,2,[[grad(c,o.x-5,o.x+5,a,b),2]]);
  for(const x of [o.x-5,o.x+5]){c.beginPath();c.moveTo(x,top-6);c.lineTo(x,bottom);keyline(c,2.6,[[grad(c,x-1.5,x+1.5,iron?'#b5afa8':'#d9a463',iron?'#3a3634':'#7a4a24'),2.6],[iron?'rgba(255,150,80,.35)':'rgba(255,230,180,.35)',.6]]);}
  c.fillStyle=iron?'#2a2624':'#d8c697';for(let y=top;y<=bottom;y+=8)for(const x of [o.x-5,o.x+5])c.fillRect(x-1.4,y-.7,2.8,1.4);
  if(w==='alpine'){c.fillStyle='rgba(240,250,255,.85)';for(let y=top;y<=bottom;y+=16)c.fillRect(o.x-4,y-1.4,8,.9);}
  return true;
 }
 if(o.type==='pole'){
  const top=o.top??o.y,bottom=o.bottom??o.y,x=o.x-5;
  c.beginPath();c.moveTo(x,top-6);c.lineTo(x,bottom);
  keyline(c,2.6,[[grad(c,x-1.5,x+1.5,iron?'#c9c2b8':'#e3c9a0',iron?'#45403c':'#9a6a3a'),2.6],[iron?'rgba(255,160,90,.45)':'rgba(255,245,220,.55)',.7]]);
  if(w==='woodland'){c.strokeStyle='#4f7d2e';c.lineWidth=.8;c.beginPath();for(let i=0;i<=24;i++)c.lineTo(x+Math.sin(i*.7)*1.8,top-6+i);c.stroke();
   c.fillStyle='#6e9e3c';for(let i=2;i<24;i+=5){c.beginPath();c.ellipse(x+Math.sin(i*.7)*2.4,top-6+i,1.3,.8,i,0,TAU);c.fill();}}
  else if(w==='alpine'){c.fillStyle='rgba(240,250,255,.9)';c.beginPath();c.ellipse(x,top-6,2.6,1.4,0,0,TAU);c.fill();c.fillStyle='rgba(230,246,255,.6)';for(let y=top;y<bottom;y+=22)c.fillRect(x-1.6,y,3.2,1);}
  else{c.fillStyle='#2a2624';c.fillRect(x-2.2,top-7,4.4,2);}
  return true;
 }
 if(o.type==='trampoline'&&w==='woodland'){
  // A springy toadstool: the cap is the bounce surface, same width and height.
  const cx=o.x+o.w/2,top=o.y-6;
  c.fillStyle='#120c08';c.beginPath();c.ellipse(cx,o.y+1,o.w/2+1.5,7.5,0,Math.PI,0);c.lineTo(cx+o.w/2+1.5,o.y+3);c.lineTo(cx-o.w/2-1.5,o.y+3);c.fill();
  c.fillStyle=grad(c,cx-5,cx+5,'#f1e3c4','#bba27a');c.beginPath();c.moveTo(cx-4,o.y+2);c.quadraticCurveTo(cx-6,o.y+8,cx-7,o.y+11);c.lineTo(cx+7,o.y+11);c.quadraticCurveTo(cx+6,o.y+8,cx+4,o.y+2);c.fill();
  c.strokeStyle='#120c08';c.lineWidth=.8;c.stroke();
  c.fillStyle='#5d7f33';c.fillRect(cx-9,o.y+9.5,18,1.6);
  const cap=c.createRadialGradient(cx-o.w*.15,top,1,cx,o.y,o.w*.6);cap.addColorStop(0,'#ff8a5c');cap.addColorStop(.6,'#d23b2a');cap.addColorStop(1,'#7c1d18');
  c.fillStyle=cap;c.beginPath();c.ellipse(cx,o.y+1,o.w/2,7,0,Math.PI,0);c.lineTo(cx+o.w/2,o.y+2);c.lineTo(cx-o.w/2,o.y+2);c.fill();
  c.fillStyle='#e9d6b4';c.fillRect(cx-o.w/2+1,o.y+1,o.w-2,1.6);
  c.fillStyle='#fff3dc';for(let i=0;i<5;i++){const a=Math.PI*(1.15+i*.17);c.beginPath();c.ellipse(cx+Math.cos(a)*o.w*.33,o.y+1+Math.sin(a)*4.5,1.5,1,0,0,TAU);c.fill();}
  return true;
 }
 if(o.type==='trampoline'){
  // A forged springboard: iron plate on coil springs over a heavy base.
  c.fillStyle='#120c08';c.fillRect(o.x-1,o.y-5,o.w+2,6);c.fillRect(o.x-3,o.y+7,o.w+6,5);
  c.strokeStyle='#120c08';c.lineWidth=2.6;for(let x=o.x+3;x<o.x+o.w;x+=8){c.beginPath();c.moveTo(x,o.y);for(let k=1;k<=4;k++)c.lineTo(x+(k%2?3:0),o.y+k*2);c.stroke();}
  c.strokeStyle='#b8b0a6';c.lineWidth=1.2;for(let x=o.x+3;x<o.x+o.w;x+=8){c.beginPath();c.moveTo(x,o.y);for(let k=1;k<=4;k++)c.lineTo(x+(k%2?3:0),o.y+k*2);c.stroke();}
  const plate=c.createLinearGradient(0,o.y-4,0,o.y);plate.addColorStop(0,'#d0c6b8');plate.addColorStop(1,'#5a5450');c.fillStyle=plate;c.fillRect(o.x,o.y-4,o.w,4);
  c.fillStyle='rgba(255,140,60,.6)';c.fillRect(o.x,o.y-.6,o.w,.6);
  c.fillStyle=grad(c,o.x,o.x+o.w,'#5a5450','#2a2624');c.fillRect(o.x-2,o.y+8,o.w+4,3);
  return true;
 }
 if(o.type==='switch'){
  const flipped=g.disabledObjects.has(o.target),stone=pattern(c,w==='woodland'?'rock064':w==='alpine'?'rock030':'rock035',.09);
  c.fillStyle=stone||'#6d7568';c.beginPath();c.roundRect(o.x-7,o.y-8,14,8,[2,2,0,0]);c.fill();c.strokeStyle='#120c08';c.lineWidth=.9;c.stroke();
  c.fillStyle='rgba(255,230,180,.25)';c.fillRect(o.x-6,o.y-7.5,12,1);
  if(w==='alpine'){c.fillStyle='rgba(245,252,255,.9)';c.beginPath();c.ellipse(o.x,o.y-8,7,1.4,0,Math.PI,0);c.fill();}
  const tip=o.x+(flipped?6:-6);
  c.beginPath();c.moveTo(o.x,o.y-6);c.lineTo(tip,o.y-20);keyline(c,2.4,[[grad(c,o.x-6,o.x+6,iron?'#c9c2b8':'#e0b070',iron?'#4a4644':'#8b5a2e'),2.4]]);
  c.fillStyle=iron?'#c0392b':'#2a2522';c.beginPath();c.arc(tip,o.y-20,2.2,0,TAU);c.fill();c.fillStyle=iron?'#ff9d7a':'#b7a27a';c.beginPath();c.arc(tip-.6,o.y-20.6,.8,0,TAU);c.fill();
  return true;
 }
 if(o.type==='crusher'){
  const active=isDangerous(o,g.tick,g.disabledObjects),y=active?o.y+o.h-18:o.y,cx=o.x+o.w/2;
  c.strokeStyle='#120c08';c.lineWidth=4;c.beginPath();c.moveTo(cx,o.y);c.lineTo(cx,y);c.stroke();
  c.strokeStyle='#8d8a84';c.lineWidth=1.4;for(let yy=o.y;yy<y;yy+=4){c.beginPath();c.ellipse(cx,yy+2,1.4,2,0,0,TAU);c.stroke();}
  const head=c.createLinearGradient(0,y,0,y+12);
  if(iron){head.addColorStop(0,'#8a8480');head.addColorStop(.5,'#4a4644');head.addColorStop(1,'#242120');}
  else{head.addColorStop(0,'#b07a42');head.addColorStop(.5,'#7c4e28');head.addColorStop(1,'#4a2c15');}
  c.fillStyle=head;c.beginPath();c.roundRect(o.x,y,o.w,12,iron?1.5:3);c.fill();c.strokeStyle='#120c08';c.lineWidth=1;c.stroke();
  if(!iron){c.strokeStyle='rgba(40,22,10,.6)';c.lineWidth=.4;for(let k=0;k<3;k++){c.beginPath();c.moveTo(o.x+2,y+3+k*3);c.bezierCurveTo(o.x+o.w*.3,y+4+k*3,o.x+o.w*.7,y+2+k*3,o.x+o.w-2,y+3+k*3);c.stroke();}}
  else{c.fillStyle='#2a2624';for(let x=o.x+3;x<o.x+o.w-2;x+=6){c.beginPath();c.arc(x,y+3,.8,0,TAU);c.fill();}}
  for(const bx of [o.x+4,o.x+o.w-7]){c.fillStyle='#3a3633';c.fillRect(bx,y,3,12);c.fillStyle=active?'#f2b233':'#a58a4a';c.fillRect(bx,y+4,3,2);}
  c.fillStyle='#2a2522';c.fillRect(o.x+1,y+11,o.w-2,2);
  c.fillStyle=active?(iron?'#ffb36b':'#d9d4c8'):'#8d8a84';for(let x=o.x+2;x<o.x+o.w-3;x+=8){c.beginPath();c.moveTo(x,y+13);c.lineTo(x+4,y+13);c.lineTo(x+2,y+18);c.closePath();c.fill();c.strokeStyle='#120c08';c.lineWidth=.6;c.stroke();}
  return true;
 }
 if(o.type==='gate'){
  // A forged portcullis: bars and cross straps; open, only the head beam remains.
  const open=g.disabledObjects.has(o.id),h=open?6:o.h;
  c.fillStyle='#120c08';c.fillRect(o.x-1,o.y-1,o.w+2,h+2);
  if(!open){c.fillStyle='rgba(20,10,8,.55)';c.fillRect(o.x,o.y,o.w,h);
   for(let x=o.x+2;x<o.x+o.w-1;x+=Math.max(4,(o.w-4)/3)){c.fillStyle=grad(c,x-1.2,x+1.2,'#a8a29c','#3e3a38');c.fillRect(x-1.2,o.y,2.4,h);}
   for(let y=o.y+8;y<o.y+h-2;y+=12){c.fillStyle=grad(c,o.x,o.x+o.w,'#8a8480','#3e3a38');c.fillRect(o.x,y,o.w,2);}
   c.fillStyle='#d8d0c4';for(let x=o.x+2;x<o.x+o.w-1;x+=Math.max(4,(o.w-4)/3)){c.beginPath();c.moveTo(x-1.4,o.y+h);c.lineTo(x+1.4,o.y+h);c.lineTo(x,o.y+h+2.5);c.closePath();c.fill();}}
  const beam=c.createLinearGradient(0,o.y,0,o.y+6);beam.addColorStop(0,'#9a948e');beam.addColorStop(1,'#3a3634');c.fillStyle=beam;c.fillRect(o.x,o.y,o.w,6);
  c.fillStyle=open?'#7bea8a':'#ff7a4a';c.beginPath();c.arc(o.x+o.w/2,o.y+3,1.6,0,TAU);c.fill();
  c.fillStyle=open?'rgba(123,234,138,.35)':'rgba(255,122,74,.35)';c.beginPath();c.arc(o.x+o.w/2,o.y+3,3.6,0,TAU);c.fill();
  return true;
 }
 if(o.type==='lift'&&objectPosition){
  const p=objectPosition(o,g.tick);
  c.strokeStyle='rgba(200,190,180,.28)';c.setLineDash([3,4]);c.lineWidth=1;c.beginPath();for(const axle of [9,o.w-9]){c.moveTo(o.x+axle,o.y+12);c.lineTo(o.toX+axle,o.toY+12);}c.stroke();c.setLineDash([]);
  c.fillStyle='#120c08';c.fillRect(p.x-1,p.y-1,o.w+2,10);
  const deck=c.createLinearGradient(0,p.y,0,p.y+8);deck.addColorStop(0,'#a09890');deck.addColorStop(.3,'#5a5450');deck.addColorStop(1,'#2a2624');c.fillStyle=deck;c.fillRect(p.x,p.y,o.w,8);
  c.fillStyle='rgba(255,150,80,.55)';c.fillRect(p.x,p.y+7.4,o.w,.6);
  c.fillStyle='#2a2624';for(let x=p.x+3;x<p.x+o.w-2;x+=7){c.beginPath();c.arc(x,p.y+4,.8,0,TAU);c.fill();}
  for(const wheelX of [p.x+9,p.x+o.w-9]){c.fillStyle='#1c1a1a';c.beginPath();c.arc(wheelX,p.y+9,3,0,TAU);c.fill();c.strokeStyle='#a8a29c';c.lineWidth=1;c.stroke();}
  return true;
 }
 if(o.type==='portal'){
  // A basalt doorway; the coloured glow still pairs each portal with its twin.
  c.save();c.translate(o.x,o.y);
  c.fillStyle='#120c08';c.fillRect(-21,-49,42,49);
  c.fillStyle=pattern(c,'rock035',.09)||'#2a2426';c.fillRect(-20,-48,40,48);
  const glow=c.createRadialGradient(0,-23,2,0,-23,25);glow.addColorStop(0,'#fff2ff');glow.addColorStop(.35,o.color);glow.addColorStop(1,'#1a1414');c.fillStyle=glow;c.beginPath();c.roundRect(-14,-42,28,38,[12,12,0,0]);c.fill();
  c.strokeStyle=o.color;c.lineWidth=1.6;c.beginPath();c.roundRect(-15,-43,30,40,[13,13,0,0]);c.stroke();
  c.strokeStyle='#ffffff9a';c.lineWidth=1.2;for(let n=0;n<3;n++){c.beginPath();c.ellipse(0,-23,4+n*4,7+n*5,g.tick*.025+n,0,Math.PI*1.5);c.stroke();}
  c.fillStyle='#ffffff';c.font='bold 10px sans-serif';c.textAlign='center';c.fillText(o.label||'',0,-53);
  c.restore();return true;
 }
 if(o.type==='lavaPool'){
  // Clip to empty pixels: molten rock never paints over its basin or player-built steps.
  c.beginPath();
  for(let yy=o.y;yy<o.y+o.h;yy++){let start=null;for(let xx=o.x;xx<=o.x+o.w;xx++){const empty=xx<o.x+o.w&&!g.at(xx,yy);if(empty&&start===null)start=xx;if(!empty&&start!==null){c.rect(start,yy,xx-start,1);start=null;}}}
  c.clip();lavaFill(c,o.x,o.y,o.w,o.h,g.tick);
  c.strokeStyle='#ffdb73';c.lineWidth=1.4;c.beginPath();for(let xx=0;xx<=o.w;xx+=2){const yy=o.y+3+Math.sin(xx*.13+g.tick*.055)*1.5;xx?c.lineTo(o.x+xx,yy):c.moveTo(o.x+xx,yy);}c.stroke();
  return true;
 }
 if(o.type==='rubble'&&w==='volcano'){
  // Cracks glow on surviving rock so a bashed tunnel stays visibly open.
  c.strokeStyle='rgba(255,130,50,.85)';c.lineWidth=1;
  for(let y=o.y+6;y<o.y+o.h-5;y+=13)for(let x=o.x+5;x<o.x+o.w-4;x+=15){if(g.at(x,y)!==1||g.at(x+5,y+6)!==1)continue;c.beginPath();c.moveTo(x,y);c.lineTo(x+5,y+3);c.lineTo(x+2,y+7);c.stroke();}
  return true;
 }
 return false;
}

// Slowly churning molten rock: the Lava004 map scrolled under a heat gradient.
function lavaFill(c,x,y,w,h,tick){
 const heat=c.createLinearGradient(0,y,0,y+h);heat.addColorStop(0,'#ffb447');heat.addColorStop(.18,'#e85b20');heat.addColorStop(1,'#8d241d');
 c.fillStyle=heat;c.fillRect(x,y,w,h);
 const p=pattern(c,'lava004',.16);
 if(p){c.save();c.globalCompositeOperation='overlay';c.globalAlpha=.85;c.translate((tick*.08)%164,(tick*.03)%164);c.fillStyle=p;c.fillRect(x-164,y-164,w+328,h+328);c.restore();}
}
// The lava sea gains the same churning texture beneath its existing seams.
export function hdLavaSea(c,level,tick,height){
 if(!isHD(level)||level.hazard!=='lava')return;
 const surface=height-28;
 c.save();c.beginPath();c.rect(0,surface+3,WIDTH,height-surface);c.clip();
 const p=pattern(c,'lava004',.16);
 if(p){c.globalCompositeOperation='overlay';c.globalAlpha=.8;c.translate((tick*.06)%164,0);c.fillStyle=p;c.fillRect(-164,surface,WIDTH+328,40);}
 c.restore();
}

/* ---------- Backdrops: quiet 2× scenes behind the playable silhouettes ---------- */
const rnd=(i,k)=>lattice(i*7+k,k*13+3);
export function hdBackdrop(level,height,scale=RENDER_SCALE){
 const canvas=document.createElement('canvas');canvas.width=WIDTH*scale;canvas.height=height*scale;const c=canvas.getContext('2d');c.scale(scale,scale);
 const w=hdWorld(level);
 if(w==='alpine')alpineBackdrop(c,height);else if(w==='volcano')volcanoBackdrop(c,height);else forestBackdrop(c,height);
 return canvas;
}
function forestBackdrop(c,height){
 const sky=c.createLinearGradient(0,0,0,height);sky.addColorStop(0,'#081513');sky.addColorStop(.55,'#0c1c18');sky.addColorStop(1,'#10221c');c.fillStyle=sky;c.fillRect(0,0,WIDTH,height);
 const moon=c.createRadialGradient(640,70,4,640,70,260);moon.addColorStop(0,'rgba(200,220,170,.13)');moon.addColorStop(.25,'rgba(170,200,150,.045)');moon.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=moon;c.fillRect(0,0,WIDTH,height);
 [['#0d1f1a',.55,26,9],['#0b1b17',.75,18,13],['#091714',1,14,17]].forEach(([color,alpha,count,width],layer)=>{
  c.globalAlpha=alpha;c.fillStyle=color;
  for(let i=0;i<count;i++){
   const x=(i+rnd(i,layer)*.8)*(WIDTH+120)/count-60,w=width*(.6+rnd(i,layer+5)*.8),lean=(rnd(i,layer+9)-.5)*14;
   c.beginPath();c.moveTo(x-w*.6,height+2);c.bezierCurveTo(x-w*.4,height*.6,x+lean-w*.35,height*.3,x+lean-w*.3,-2);c.lineTo(x+lean+w*.3,-2);c.bezierCurveTo(x+lean+w*.35,height*.3,x+w*.4,height*.6,x+w*.6,height+2);c.fill();
   for(let b=0;b<2;b++){const by=height*(.15+rnd(i,layer+b*3)*.5),dir=b?1:-1;c.beginPath();c.moveTo(x+lean*.5,by);c.quadraticCurveTo(x+dir*w*1.6,by-w*.8,x+dir*w*(2.6+rnd(i,b)*1.5),by-w*1.8);c.lineWidth=w*.22;c.strokeStyle=color;c.stroke();}
  }
 });
 c.globalAlpha=1;
 for(let k=0;k<4;k++){const y=height*(.35+k*.18),m=c.createLinearGradient(0,y-30,0,y+30);m.addColorStop(0,'rgba(120,160,130,0)');m.addColorStop(.5,'rgba(120,160,130,.022)');m.addColorStop(1,'rgba(120,160,130,0)');c.fillStyle=m;c.fillRect(0,y-30,WIDTH,60);}
 c.fillStyle='rgba(194,210,154,.025)';c.beginPath();c.moveTo(600,0);c.lineTo(680,0);c.lineTo(420,height);c.lineTo(270,height);c.fill();
}
function ridge(c,height,base,amp,seed,color,snow){
 const pts=[];for(let x=-40;x<=WIDTH+40;x+=10){const n=Math.sin(x*.0055+seed)*.5+Math.sin(x*.013+seed*2.3)*.28+Math.sin(x*.031+seed*.7)*.1+(lattice(Math.round(x/40),seed)-.5)*.08;pts.push([x,base-amp*(.5+n)]);}
 const outline=()=>{c.beginPath();c.moveTo(-40,height+2);pts.forEach(([x,y])=>c.lineTo(x,y));c.lineTo(WIDTH+40,height+2);c.closePath();};
 c.fillStyle=color;outline();c.fill();
 if(snow){
  // A soft snowline: the upper slopes whiten and fade down the ridge.
  const top=Math.min(...pts.map(p=>p[1])),line=c.createLinearGradient(0,top,0,top+amp*.55);line.addColorStop(0,snow);line.addColorStop(1,'rgba(0,0,0,0)');
  c.save();outline();c.clip();c.fillStyle=line;c.fillRect(0,top-2,WIDTH,amp*.6);c.restore();
 }
}
function alpineBackdrop(c,height){
 const sky=c.createLinearGradient(0,0,0,height);sky.addColorStop(0,'#0d1a2a');sky.addColorStop(.6,'#16283a');sky.addColorStop(1,'#22374a');c.fillStyle=sky;c.fillRect(0,0,WIDTH,height);
 c.fillStyle='rgba(230,240,255,.55)';for(let i=0;i<90;i++){const x=rnd(i,1)*WIDTH,y=rnd(i,2)*height*.45,r=.35+rnd(i,3)*.6;c.globalAlpha=.3+rnd(i,4)*.5;c.beginPath();c.arc(x,y,r,0,TAU);c.fill();}
 c.globalAlpha=1;
 const aurora=c.createLinearGradient(0,40,0,170);aurora.addColorStop(0,'rgba(120,230,190,0)');aurora.addColorStop(.5,'rgba(120,230,190,.05)');aurora.addColorStop(1,'rgba(120,230,190,0)');
 c.fillStyle=aurora;c.beginPath();c.moveTo(0,120);c.bezierCurveTo(250,40,500,170,1000,70);c.lineTo(1000,150);c.bezierCurveTo(600,230,300,110,0,190);c.closePath();c.fill();
 ridge(c,height,height*.42,height*.22,1.3,'#1a2c3e','rgba(190,215,235,.16)');
 ridge(c,height,height*.58,height*.2,4.1,'#172839','rgba(200,225,240,.11)');
 ridge(c,height,height*.78,height*.18,7.7,'#16273a',null);
 for(let k=0;k<3;k++){const y=height*(.5+k*.16),m=c.createLinearGradient(0,y-28,0,y+28);m.addColorStop(0,'rgba(170,200,225,0)');m.addColorStop(.5,'rgba(170,200,225,.05)');m.addColorStop(1,'rgba(170,200,225,0)');c.fillStyle=m;c.fillRect(0,y-28,WIDTH,56);}
}
function volcanoBackdrop(c,height){
 const sky=c.createLinearGradient(0,0,0,height);sky.addColorStop(0,'#150709');sky.addColorStop(.55,'#230b10');sky.addColorStop(1,'#3e1216');c.fillStyle=sky;c.fillRect(0,0,WIDTH,height);
 const cone=(cx,base,wid,top,color,glow)=>{c.fillStyle=color;c.beginPath();c.moveTo(cx-wid,base);c.quadraticCurveTo(cx-wid*.35,top+(base-top)*.25,cx-wid*.12,top);c.lineTo(cx+wid*.12,top);c.quadraticCurveTo(cx+wid*.35,top+(base-top)*.25,cx+wid,base);c.closePath();c.fill();
  if(glow){const g=c.createRadialGradient(cx,top,2,cx,top,wid*.38);g.addColorStop(0,'rgba(255,120,50,.24)');g.addColorStop(1,'rgba(255,80,30,0)');c.fillStyle=g;c.fillRect(cx-wid*.4,top-wid*.4,wid*.8,wid*.8);
   // Two faint lava runs wander down the flank and fade out.
   for(const [dx,len,side] of [[-6,.5,-1],[5,.32,1]]){const y1=top+(base-top)*len,fade=c.createLinearGradient(0,top,0,y1);fade.addColorStop(0,'rgba(255,150,70,.45)');fade.addColorStop(1,'rgba(255,90,40,0)');
    c.strokeStyle=fade;c.lineWidth=2.2;c.lineCap='round';c.beginPath();c.moveTo(cx+dx*.4,top+2);c.bezierCurveTo(cx+dx+side*8,top+(y1-top)*.3,cx+dx-side*6,top+(y1-top)*.65,cx+dx+side*(10+wid*.06),y1);c.stroke();}}};
 cone(250,height+2,330,height*.36,'#30121a',true);cone(780,height+2,300,height*.46,'#2c1118',true);
 // Soft ash plumes rise and drift from both craters.
 for(const [cx,top] of [[250,height*.36],[780,height*.46]])for(let i=0;i<9;i++){
  const k=i/8,x=cx+k*k*120+Math.sin(i*1.7)*10,y=top-12-k*Math.min(top-20,260),r=18+k*58,g=c.createRadialGradient(x,y,0,x,y,r);
  g.addColorStop(0,`rgba(70,52,56,${.16*(1-k*.6)})`);g.addColorStop(1,'rgba(70,52,56,0)');c.fillStyle=g;c.fillRect(x-r,y-r,r*2,r*2);}
 ridge(c,height,height*.82,height*.12,2.2,'#26101a',null);
 const glow=c.createLinearGradient(0,height*.7,0,height);glow.addColorStop(0,'rgba(255,90,30,0)');glow.addColorStop(1,'rgba(255,90,30,.16)');c.fillStyle=glow;c.fillRect(0,height*.7,WIDTH,height*.3);
}

/* ---------- Ambient fliers and sparks ---------- */
export function hdBat(c,x,y,t){
 const flap=Math.sin(t*2.6),span=11,lift=flap*4.5;
 c.save();c.translate(x,y+Math.sin(t*.9)*3);c.fillStyle='#0b0f10';c.strokeStyle='rgba(150,170,150,.35)';c.lineWidth=.5;
 for(const s of [-1,1]){c.beginPath();c.moveTo(0,0);c.quadraticCurveTo(s*span*.4,-3-lift,s*span,-1-lift*1.2);
  c.lineTo(s*span*.8,1-lift*.6);c.quadraticCurveTo(s*span*.65,0,s*span*.55,2-lift*.4);c.quadraticCurveTo(s*span*.4,1,s*span*.3,3-lift*.2);c.quadraticCurveTo(s*span*.15,2,0,3);c.closePath();c.fill();c.stroke();}
 c.beginPath();c.ellipse(0,1.2,1.6,2.4,0,0,TAU);c.fill();
 c.beginPath();c.moveTo(-1.2,-.6);c.lineTo(-.8,-2.4);c.lineTo(-.2,-.8);c.moveTo(1.2,-.6);c.lineTo(.8,-2.4);c.lineTo(.2,-.8);c.fill();
 c.restore();
}
export function hdOwl(c,x,y,t){
 // Long glides with an occasional slow beat.
 const beat=Math.max(0,Math.sin(t*.55))**3,lift=Math.sin(t*1.7)*5*beat,span=17;
 c.save();c.translate(x,y);
 const wing=c.createLinearGradient(0,-6,0,6);wing.addColorStop(0,'#9a8668');wing.addColorStop(1,'#5b4a36');c.fillStyle=wing;
 for(const s of [-1,1]){c.beginPath();c.moveTo(s*2,-1);c.quadraticCurveTo(s*span*.5,-4-lift,s*span,-1-lift);c.quadraticCurveTo(s*span*.9,2-lift*.5,s*span*.75,2.5-lift*.3);
  for(let f=0;f<3;f++)c.lineTo(s*span*(.62-f*.12),3.4-lift*.2+(f%2?-.8:0));c.quadraticCurveTo(s*4,3,s*2,2);c.closePath();c.fill();}
 c.fillStyle='#7d6a50';c.beginPath();c.ellipse(0,1,3.4,4.2,0,0,TAU);c.fill();
 c.fillStyle='#d9c9a6';c.beginPath();c.ellipse(0,-1.6,2.7,2.3,0,0,TAU);c.fill();
 c.fillStyle='#f2c94c';for(const s of [-1,1]){c.beginPath();c.arc(s*1.1,-1.9,.7,0,TAU);c.fill();}
 c.fillStyle='#1a1410';for(const s of [-1,1]){c.beginPath();c.arc(s*1.1,-1.9,.3,0,TAU);c.fill();}
 c.restore();
}
// Alpine choughs: black mountain crows with yellow beaks and fingered wingtips.
export function hdChough(c,x,y,t){
 const flap=Math.sin(t*1.4),lift=flap*4,span=13;
 c.save();c.translate(x,y);c.fillStyle='#101318';c.strokeStyle='rgba(180,200,220,.35)';c.lineWidth=.5;
 for(const s of [-1,1]){c.beginPath();c.moveTo(s*1.5,-.5);c.quadraticCurveTo(s*span*.45,-3-lift,s*span,-1.5-lift);
  for(let f=0;f<4;f++)c.lineTo(s*span*(.94-f*.07),(f%2?.2:-.8)-lift*(.9-f*.1));c.quadraticCurveTo(s*span*.4,2.4-lift*.3,s*1.5,2);c.closePath();c.fill();c.stroke();}
 c.beginPath();c.ellipse(0,.6,2,2.8,0,0,TAU);c.fill();
 c.beginPath();c.moveTo(-1.2,3);c.lineTo(1.2,3);c.lineTo(0,6);c.closePath();c.fill();
 c.fillStyle='#f2c230';c.beginPath();c.moveTo(-.6,-2);c.lineTo(.6,-2);c.lineTo(0,-3.6);c.closePath();c.fill();
 c.restore();
}
// Rising embers over the lava sea.
export function hdEmbers(c,tick,height){
 c.save();c.globalCompositeOperation='lighter';
 for(let i=0;i<26;i++){const life=((tick*.6+i*47)%300)/300,x=(i*97+Math.sin(tick*.02+i)*14)%WIDTH,y=height-30-life*(height*.55),a=Math.sin(life*Math.PI)*(.4+.3*Math.sin(tick*.3+i));
  c.fillStyle=`rgba(255,${120+((i*31)%80)},50,${Math.max(0,a)})`;c.beginPath();c.arc(x,y,.7+(i%3)*.35,0,TAU);c.fill();}
 c.restore();
}
// A falling leaf: pointed blade with a midrib; `turn` (−1…1) foreshortens it as it flips.
export function hdLeaf(c,x,y,angle,turn,seed){
 const w=2.4*Math.max(.25,Math.abs(turn)),l=5.5,hue=['#c9b45c','#b98a3e','#a7b84e'][seed%3];
 c.save();c.translate(x,y);c.rotate(angle);
 c.fillStyle=hue;c.beginPath();c.moveTo(-l,0);c.quadraticCurveTo(0,-w*1.6,l,0);c.quadraticCurveTo(0,w*1.6,-l,0);c.fill();
 c.strokeStyle='rgba(60,40,15,.55)';c.lineWidth=.35;c.beginPath();c.moveTo(-l,0);c.lineTo(l+1.2,0);c.stroke();
 c.restore();
}
// A pale moth with patterned forewings, dusted hindwings and a soft glow.
export function hdMoth(c,x,y,t){
 const open=.35+Math.abs(Math.sin(t*1.6))*.65;
 c.save();c.translate(x,y);
 const halo=c.createRadialGradient(0,0,0,0,0,10);halo.addColorStop(0,'rgba(240,230,190,.12)');halo.addColorStop(1,'rgba(240,230,190,0)');c.fillStyle=halo;c.fillRect(-10,-10,20,20);
 for(const s of [-1,1]){
  c.save();c.scale(s*open,1);
  c.fillStyle='#e6d7ae';c.beginPath();c.moveTo(.6,-1);c.quadraticCurveTo(5,-6.5,8,-3.2);c.quadraticCurveTo(7,0,1,.6);c.closePath();c.fill();
  c.fillStyle='#cdb98a';c.beginPath();c.moveTo(.6,.4);c.quadraticCurveTo(5.5,1,5.4,4.2);c.quadraticCurveTo(2.5,4.6,.6,1.8);c.closePath();c.fill();
  c.fillStyle='rgba(120,96,60,.6)';c.beginPath();c.arc(4.6,-3,1,0,TAU);c.fill();
  c.restore();
 }
 c.fillStyle='#8a7550';c.beginPath();c.ellipse(0,0,.9,3,0,0,TAU);c.fill();
 c.strokeStyle='rgba(138,117,80,.8)';c.lineWidth=.3;c.beginPath();c.moveTo(-.3,-2.8);c.quadraticCurveTo(-1.5,-5,-2.6,-5.4);c.moveTo(.3,-2.8);c.quadraticCurveTo(1.5,-5,2.6,-5.4);c.stroke();
 c.restore();
}
// Powder texture and soft drifts over the mountain's snowfield floor.
export function hdSnowfield(c,level,height){
 if(!isHD(level)||level.hazard!=='snow')return;
 const surface=height-28,p=pattern(c,'snow010a',.12);
 c.save();c.beginPath();c.moveTo(0,height);for(let x=0;x<=WIDTH;x+=4)c.lineTo(x,surface+Math.sin(x*.023)*3+Math.cos(x*.051)*1.5);c.lineTo(WIDTH,height);c.closePath();c.clip();
 if(p){c.globalCompositeOperation='multiply';c.globalAlpha=.55;c.fillStyle=p;c.fillRect(0,surface-6,WIDTH,40);c.globalCompositeOperation='source-over';c.globalAlpha=1;}
 const shade=c.createLinearGradient(0,surface,0,height);shade.addColorStop(0,'rgba(255,255,255,.35)');shade.addColorStop(.25,'rgba(255,255,255,0)');shade.addColorStop(1,'rgba(60,100,140,.25)');c.fillStyle=shade;c.fillRect(0,surface-6,WIDTH,40);
 c.fillStyle='rgba(255,255,255,.85)';for(let i=0;i<70;i++){const x=(i*137)%WIDTH,y=surface+4+(i*29)%20;c.fillRect(x,y,.8,.8);}
 c.restore();
}
