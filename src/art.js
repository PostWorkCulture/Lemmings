import {hazardMarkers} from './hazard-art.js';
import {worldBackground,worldScenery} from './landscape-art.js';
import { THEMES } from './levels.js';
import { WIDTH,HEIGHT } from './engine.js';
const palettes={1:['#624734','#6c5038','#73583d','#594330','#806243'],2:['#455c59','#4a625d','#526d64','#3d534f'],3:['#b48c56','#c59a61','#d3ac72']};
function hash(x,y){let a=Math.imul(x+773,y+179)^Math.imul(x,7919);return (a^a>>>11)>>>0;}
export function character(c,x,y,state='walk',dir=1,tick=0,scale=1) {
  c.save();c.translate(Math.round(x),Math.round(y));c.scale(dir*scale,scale);
  const phase=Math.floor(tick/7)%4,bob=state==='walk'&&phase%2?1:0;
  const r=(x,y,w,h,color)=>{c.fillStyle=color;c.fillRect(x,y-bob,w,h);};
  // A compact, hand-drawn sprite; every job shares the same body and palette.
  r(-5,-23,10,2,'#142628');r(-7,-21,14,8,'#142628');r(-6,-13,13,12,'#142628');
  r(-4,-20,10,9,'#f8d7ad');r(5,-17,4,4,'#f8d7ad');r(-3,-13,7,3,'#e8b88d');
  r(4,-20,2,3,'#26352c');r(0,-20,2,2,'#ffead0');
  r(-6,-24,9,3,'#7aca50');r(-8,-21,13,4,'#75c94c');r(-7,-18,5,5,'#56a842');r(-9,-17,3,3,'#59ad45');r(-4,-25,6,2,'#a4e671');r(-2,-23,7,2,'#8eda5b');r(-6,-20,3,2,'#a1e569');
  r(-5,-11,10,9,'#425dcc');r(-5,-11,3,7,'#6482e5');r(-4,-3,10,2,'#3348a8');
  if(state==='block'){
    r(-12,-11,8,3,'#f5f1d9');r(4,-11,9,3,'#f5f1d9');r(-14,-11,3,3,'#f8d7ad');r(12,-11,3,3,'#f8d7ad');
    r(-6,-1,5,2,'#f9dcba');r(3,-1,5,2,'#f9dcba');
  }else{
    const foot=state==='walk'?[-2,1,3,0][phase]:0;
    r(-5-foot,-2,5,3,'#f9dcba');r(2+foot,-2,5,3,'#f9dcba');
    if(state==='build'){
      r(2,-11,7,3,'#fbf1d5');r(7,-12,4,3,'#f7cca3');r(6,-15,10,3,'#bc9156');r(6,-16,10,1,'#ead3a0');
    }else if(state==='dig'){
      r(3,-12,5,4,'#f2edd9');r(7,-11,3,9,'#b79159');r(5,-3,7,3,'#b1c7c0');r(7,0,3,2,'#819e98');
    }else if(state==='fall'){
      r(-9,-15,4,5,'#f6edd5');r(5,-16,4,5,'#f6edd5');r(-9,-18,3,3,'#f9dcba');
    }else {r(1+(phase%2),-11,4,5,'#f4edd9');r(2+(phase%2),-7,4,3,'#f9d3ab');}
  }
  c.restore();
}
export function makeBackground(theme='forest',height=HEIGHT) {
  const world=worldBackground(theme,height);if(world)return world;
  if(theme!=='forest')return themedBackground(theme);
  const canvas=document.createElement('canvas');canvas.width=WIDTH;canvas.height=HEIGHT;
  const c=canvas.getContext('2d');
  const g=c.createLinearGradient(0,0,0,HEIGHT);g.addColorStop(0,'#142e30');g.addColorStop(.65,'#2e4740');g.addColorStop(1,'#172c2b');c.fillStyle=g;c.fillRect(0,0,WIDTH,HEIGHT);
  c.fillStyle='#b5c98c';c.globalAlpha=.17;c.beginPath();c.arc(600,76,36,0,Math.PI*2);c.fill();c.globalAlpha=1;
  for(let layer=0;layer<3;layer++) {
    for(let i=0;i<12;i++){
      const x=(i*107+layer*43)%1050-25,w=17+hash(i,layer)%32;
      c.fillStyle=['#274443','#233e3a','#1c3630'][layer];
      c.beginPath();c.moveTo(x-12,400);c.lineTo(x+3,180);c.lineTo(x-2,-20);c.lineTo(x+w,-20);c.lineTo(x+w-6,200);c.lineTo(x+w+22,400);c.fill();
      c.strokeStyle=c.fillStyle;c.lineWidth=8+layer*3;c.beginPath();c.moveTo(x+13,155);c.lineTo(x-34,106);c.lineTo(x-55,65);c.moveTo(x+20,95);c.lineTo(x+72,40);c.stroke();
      c.fillStyle=['#29483e','#264234','#203a2d'][layer];
      for(let j=0;j<7;j++){let yy=hash(i+j,layer)%70-35;c.fillRect(x-50+j*19,yy,45,38);c.fillRect(x-45+j*19,yy+30,29,12);}
    }
  }
  // Faint shafts of light remain behind the playable silhouettes.
  c.fillStyle='#c2d29a06';c.beginPath();c.moveTo(580,0);c.lineTo(650,0);c.lineTo(390,420);c.lineTo(250,420);c.fill();
  for(let i=0;i<50;i++){const x=hash(i,33)%1000,y=300+hash(i,41)%140;c.fillStyle=i%2?'#254034':'#1d362e';c.fillRect(x,y,30,6);c.fillRect(x+8,y-8,10,8);}
  return canvas;
}
export function renderTerrain(game,canvas) {
  if(canvas.height!==game.height)canvas.height=game.height;
  const terrainAt=(x,y)=>x<0||x>=WIDTH||y<0||y>=game.height?0:game.terrain[Math.floor(y)*WIDTH+Math.floor(x)];
  const c=canvas.getContext('2d');c.clearRect(0,0,WIDTH,game.height);
  const theme=THEMES[game.level.theme];const colors={1:theme.earth,2:theme.stone,3:palettes[3]};
  const pixels=c.createImageData(WIDTH,game.height),cache={};
  for(let y=0;y<game.height;y++)for(let x=0;x<WIDTH;x++){
    const type=game.terrain[y*WIDTH+x];if(!type)continue;
    const h=hash(Math.floor(x/4),Math.floor(y/4));
    let color=colors[type][h%5===0?h%colors[type].length:1];
    if(type===1){
      if(!terrainAt(x,y-1)||!terrainAt(x,y-2))color=theme.grass[0];
      else if(!terrainAt(x,y-5))color=theme.grass[1];
      else if(!terrainAt(x,y-9))color=theme.grass[2];
      else if(h%19===0)color=theme.earth[4];
      else if(y%19===0&&h%3===0)color=theme.earth[3];
      const material=game.level.theme;
      if(terrainAt(x,y-10)){
       if(['egypt','marble','castle','night'].includes(material)&&(y%16<1||(x+(Math.floor(y/16)%2)*14)%29<1))color=theme.earth[3];
       if(['station','factory'].includes(material)&&(x%40===0||y%22===0))color=theme.earth[3];
       if(material==='candy'&&h%13===0)color=['#e0b0bd','#b8cbb2','#dec592'][h%3];
       if(['woodland','treehouse'].includes(material)&&((x+Math.floor(Math.sin(y*.09)*4))%27<2))color=theme.earth[3];
       if(material==='volcano'&&(x+Math.floor(y/5))%47===0)color='#bb684d';
       if(material==='polar'&&(x+Math.floor(y*.5))%40<2)color='#a7d4dc';
      }

    }else if(type===2){if(y%17<2|| (x+(Math.floor(y/17)%2)*12)%25<2)color=theme.stone[3];else if(y%17===3)color=theme.stone[2];}
    else if(type===3)color=y%2?'#a57a45':'#dbb67a';
    if(!cache[color])cache[color]=[parseInt(color.slice(1,3),16),parseInt(color.slice(3,5),16),parseInt(color.slice(5,7),16)];
    const rgb=cache[color],i=(y*WIDTH+x)*4;pixels.data[i]=rgb[0];pixels.data[i+1]=rgb[1];pixels.data[i+2]=rgb[2];pixels.data[i+3]=255;
  }
  c.putImageData(pixels,0,0);
  // Grass follows the editable surface, including the rim of dug tunnels.
  for(let x=46;x<960;x+=7)for(const y of [...new Set(game.level.terrain.filter(r=>r[4]===1).map(r=>r[1]))])if(terrainAt(x,y)===1&&!terrainAt(x,y-1)){
    const h=hash(x,y)%5;c.fillStyle=theme.grass[1];c.fillRect(x,y-3-h,2,3+h);c.fillStyle=theme.grass[0];c.fillRect(x+2,y-2,2,2);
  }
}
function mushroom(c,x,y,s=1){c.fillStyle='#dcc5a1';c.fillRect(x,y-6*s,3*s,6*s);c.fillStyle='#ac6952';c.fillRect(x-4*s,y-9*s,11*s,4*s);c.fillRect(x-2*s,y-11*s,7*s,2*s);c.fillStyle='#e4c49a';c.fillRect(x-1*s,y-9*s,2*s,s);}
export function hatchOpening(tick,spawned,total,lastSpawnTick){
  if(!spawned)return 0;
  const smooth=t=>{t=Math.max(0,Math.min(1,t));return t*t*(3-2*t);};
  const opening=smooth(tick/18);
  // Let the final creature clear the doors before swinging them shut.
  return spawned<total?opening:opening*(1-smooth((tick-lastSpawnTick-24)/24));
}
export function magicalEntrance(c,tick,level,spawned=0,lastSpawnTick=null){
  const open=hatchOpening(tick,spawned,level.total,lastSpawnTick);
  c.save();c.translate(level.spawnX,level.spawnY);
  c.lineJoin='round';c.lineCap='round';c.lineWidth=1.5;c.strokeStyle='#34243d';
  const shape=(draw,color)=>{c.beginPath();draw();c.closePath();c.fillStyle=color;c.fill();c.stroke();};
  // Red swept fins and white hull echo the supplied rocket reference.
  for(const side of [-1,1]){
    c.save();c.scale(side,1);
    shape(()=>{c.moveTo(16,-40);c.bezierCurveTo(36,-42,38,-23,28,-10);c.bezierCurveTo(23,-5,30,-25,16,-24);},'#a85960');
    c.fillStyle='#743f50';c.beginPath();c.moveTo(19,-36);c.quadraticCurveTo(32,-30,27,-12);c.quadraticCurveTo(27,-24,17,-24);c.fill();c.restore();
  }
  shape(()=>{c.moveTo(0,-87);c.bezierCurveTo(-26,-64,-31,-40,-18,-25);c.quadraticCurveTo(-16,-22,0,-23);c.quadraticCurveTo(16,-22,18,-25);c.bezierCurveTo(31,-40,26,-64,0,-87);},'#bcbdb0');
  c.fillStyle='#898897';c.beginPath();c.moveTo(-13,-65);c.bezierCurveTo(-24,-43,-17,-28,-4,-24);c.lineTo(-17,-25);c.bezierCurveTo(-27,-42,-23,-55,-19,-65);c.fill();
  shape(()=>{c.moveTo(0,-87);c.quadraticCurveTo(-13,-75,-20,-63);c.quadraticCurveTo(0,-69,20,-63);c.quadraticCurveTo(13,-77,0,-87);},'#ae5960');
  c.strokeStyle='#ce9390';c.lineWidth=2;c.beginPath();c.moveTo(1,-83);c.quadraticCurveTo(12,-73,17,-65);c.stroke();c.strokeStyle='#34243d';c.lineWidth=1.5;
  // Blue-rimmed porthole with diagonal glass reflections.
  c.fillStyle='#416c84';c.beginPath();c.arc(0,-49,12,0,Math.PI*2);c.fill();c.stroke();
  c.fillStyle='#86a6b5';c.beginPath();c.arc(0,-49,8.4,0,Math.PI*2);c.fill();c.stroke();
  c.save();c.beginPath();c.arc(0,-49,7.5,0,Math.PI*2);c.clip();c.strokeStyle='#bdc9c8';c.lineWidth=3;c.beginPath();c.moveTo(-10,-46);c.lineTo(7,-59);c.moveTo(-5,-39);c.lineTo(12,-52);c.stroke();c.restore();
  // The dark underside is a real opening; twin leaves swing down to release the crew.
  c.fillStyle='#162239';c.fillRect(-14,-24,28,4);
  for(const side of [-1,1]){
    const hinge=side*15,angle=open*Math.PI*.47,tip=hinge-side*15*Math.cos(angle),drop=15*Math.sin(angle);
    shape(()=>{c.moveTo(hinge,-23);c.lineTo(tip,-23+drop);c.lineTo(tip,-20+drop);c.lineTo(hinge,-20);},'#4c778b');
    c.fillStyle='#a1b8b8';c.fillRect(hinge-1.5,-24,3,3);
  }
  c.restore();
}
export function scenery(c,tick,level,spawned=0,lastSpawnTick=null,sceneryTick=tick) {
  worldScenery(c,sceneryTick,level);
  if(level.entrances){for(const [i,e] of level.entrances.entries()){const n=level.entrances.length,count=Math.max(0,Math.ceil((spawned-i)/n));magicalEntrance(c,tick,{...level,spawnX:e.x,spawnY:e.y,total:Math.ceil((level.total-i)/n)},count,count?((count-1)*n+i)*level.interval:null);}}else magicalEntrance(c,tick,level,spawned,lastSpawnTick);
  // Golden splayed arch and twin torches from the supplied classic exit reference.
  exitArch(c,level.exitX,level.exitY,tick);
  if(level.theme==='forest'){
    for(const [x,y,w,,type] of level.terrain)if(type===1&&w>100){mushroom(c,x+32,y,.75);if(w>250)mushroom(c,x+w-75,y,.65);}
    for(const x of [15,32,972,990]){c.strokeStyle='#132e27';c.lineWidth=3;c.beginPath();c.moveTo(x,470);c.lineTo(x-9,415);c.stroke();for(let i=0;i<5;i++){c.fillStyle='#173a2c';c.fillRect(x-20+i,420+i*8,20,4);c.fillRect(x-5,422+i*8,15,4);}}
  }

}

export function exitArch(c,x,y,tick=0,scale=1) {
  c.save();c.translate(x,y);c.scale(scale,scale);
  const poly=(points,color)=>{c.fillStyle=color;c.beginPath();points.forEach(([px,py],i)=>i?c.lineTo(px,py):c.moveTo(px,py));c.closePath();c.fill();};
  poly([[-35,0],[-31,-10],[-15,-51],[-9,-57],[10,-57],[17,-51],[34,-7],[37,0]],'#775328');
  poly([[-33,-2],[-14,-51],[-8,-55],[9,-55],[15,-49],[33,-2],[20,-2],[6,-39],[-4,-39],[-19,-2]],'#d7ac43');
  poly([[-29,-3],[-12,-49],[-6,-52],[8,-52],[13,-47],[28,-3],[22,-3],[8,-43],[-5,-43],[-22,-3]],'#f0d16d');
  poly([[-19,-2],[-4,-39],[6,-39],[20,-2]],'#152639');
  poly([[-13,-4],[-2,-32],[4,-32],[14,-4]],'#263857');
  c.fillStyle='#ad7b35';c.fillRect(-21,-4,43,4);c.fillStyle='#eed180';c.fillRect(-16,-7,32,3);c.fillStyle='#aab9bc';c.fillRect(-10,-10,21,3);
  for(let side of [-1,1])for(let i=0;i<6;i++){
    c.fillStyle=i%2?'#fff09c':'#b58232';c.fillRect(side*(13+i*3)-2,-47+i*7,5,2);
    c.fillStyle='#b78d36';c.fillRect(side*(17+i*2)-1,-44+i*7,2,3);
  }
  c.fillStyle='#f8e992';c.fillRect(-8,-54,15,2);c.fillStyle='#ac7c31';c.fillRect(-5,-49,3,4);c.fillRect(3,-49,3,4);
  for(const tx of [-26,26]){
    c.fillStyle='#5e4434';c.fillRect(tx-1,-51,3,18);c.fillStyle='#b1a68a';c.fillRect(tx-3,-53,7,3);
    const flicker=Math.floor(tick/9)%3;c.fillStyle='#d65d31';c.fillRect(tx-2,-61-flicker,5,8+flicker);c.fillStyle='#ffc565';c.fillRect(tx-1,-60,3,6);c.fillStyle='#fff1b0';c.fillRect(tx,-57,2,4);
  }
  c.restore();
}
let iconPortrait;
export async function loadIconArt() {
  const picture=new Image();
  picture.src=new URL('../assets/lemming-reference.jpg',import.meta.url).href;
  await picture.decode();iconPortrait=picture;
}
export function skillIcon(c,w,h,pose='walk') {
  c.clearRect(0,0,w,h);c.save();c.scale(w/58,h/44);
  c.imageSmoothingEnabled=true;c.imageSmoothingQuality='high';
  const ellipse=(x,y,rx,ry,color)=>{c.fillStyle=color;c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);c.fill();};
  const poly=(p,color)=>{c.fillStyle=color;c.beginPath();p.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.fill();};
  const wool=c.createLinearGradient(17,30,42,44);wool.addColorStop(0,'#343796');wool.addColorStop(.5,'#383dad');wool.addColorStop(1,'#202271');
  poly([[13,44],[16,34],[25,31],[35,31],[43,35],[47,44]],wool);
  // Render the supplied character itself, preserving the original facial proportions.
  // The silhouette excludes the title and neighboring characters in the reference.
  if(iconPortrait){
    c.save();c.translate(8.2,-22.7);c.scale(.153,.153);c.translate(-150,0);
    const mask=new Path2D('M 208 165 C 215 159 220 157 225 155 C 241 154 254 161 268 164 C 283 153 299 156 313 154 C 325 151 337 155 346 163 C 361 173 363 192 374 211 C 377 227 390 237 400 244 L 391 255 L 395 278 L 381 272 C 390 290 391 308 399 325 L 382 322 L 381 345 L 363 333 C 360 360 349 377 334 388 C 317 402 272 399 250 390 C 231 380 222 367 216 351 L 202 363 L 203 341 L 185 349 L 186 321 L 171 328 L 177 300 L 164 308 L 174 274 L 159 282 L 175 248 L 162 250 C 185 228 193 211 196 194 C 199 179 202 171 208 165 Z');
    c.clip(mask);c.drawImage(iconPortrait,0,0);c.restore();
  }
  if(pose==='block'){
    poly([[17,35],[7,32],[5,36],[17,41]],'#343995');poly([[41,35],[51,32],[54,36],[41,41]],'#343995');
    poly([[7,32],[10,33],[8,38],[5,37]],'#ddd9db');poly([[49,33],[52,32],[54,37],[51,38]],'#ddd9db');
    ellipse(4,31,3.7,5,'#efbc96');ellipse(54,31,3.7,5,'#efbc96');
  }else if(pose==='build'){
    c.fillStyle='#89613e';c.fillRect(34,36,23,8);c.fillStyle='#c4a06b';c.fillRect(34,35,23,4);c.fillStyle='#ddbf87';c.fillRect(37,30,18,5);c.fillStyle='#9b7044';c.fillRect(46,35,1,4);ellipse(35,40,4,3,'#efbc96');
  }else if(pose==='dig'){
    c.save();c.translate(46,32);c.rotate(.25);c.fillStyle='#996d42';c.fillRect(-1,-12,3,21);c.fillStyle='#bf955f';c.fillRect(-3,-13,7,3);poly([[-5,5],[6,5],[5,12],[1,15],[-4,12]],'#9faaa7');c.fillStyle='#d1d4c7';c.fillRect(-3,6,3,6);c.restore();ellipse(44,34,4,3,'#efbc96');
  }else{
    poly([[17,35],[10,31],[7,34],[15,41]],'#343995');poly([[10,31],[12,33],[9,36],[7,34]],'#ddd9db');ellipse(8,29,3.6,4,'#efbc96');
  }
  if(!['walk','block','build','dig'].includes(pose)){
    c.strokeStyle='#d9d9bb';c.lineWidth=2;c.fillStyle='#bc9b69';
    if(['bash','mine'].includes(pose)){c.beginPath();c.moveTo(39,42);c.lineTo(52,24);c.stroke();c.strokeStyle='#acbfc8';c.lineWidth=4;c.beginPath();c.moveTo(43,23);c.lineTo(57,29);c.stroke();}
    else if(pose==='float'){c.fillStyle='#c599a9';c.beginPath();c.arc(45,25,11,Math.PI,0);c.fill();c.beginPath();c.moveTo(34,25);c.lineTo(45,41);c.lineTo(56,25);c.stroke();}
    else if(pose==='climb'){c.strokeRect(42,23,11,20);for(let y=26;y<42;y+=5){c.beginPath();c.moveTo(42,y);c.lineTo(53,y);c.stroke();}}
    else if(['platform','stack'].includes(pose)){for(let i=0;i<3;i++)c.fillRect(pose==='stack'?43:34+i*7,40-(pose==='stack'?i*5:0),12,4);}
    else if(pose==='swim'){c.strokeStyle='#88cfdf';for(let y=29;y<44;y+=5){c.beginPath();c.moveTo(36,y);c.quadraticCurveTo(45,y-5,56,y);c.stroke();}}
    else if(pose==='attract'){c.beginPath();c.ellipse(45,35,6,8,.5,0,Math.PI*2);c.fill();c.beginPath();c.moveTo(46,32);c.lineTo(54,22);c.stroke();}
    else if(pose==='explode'){c.fillStyle='#617481';c.beginPath();c.arc(47,35,8,0,Math.PI*2);c.fill();c.strokeStyle='#e5ae7d';c.beginPath();c.moveTo(47,28);c.lineTo(51,23);c.stroke();}
    else {c.strokeStyle='#dfc897';c.beginPath();c.moveTo(37,39);c.lineTo(51,pose==='jump'?25:39);c.lineTo(47,pose==='jump'?25:34);c.moveTo(51,pose==='jump'?25:39);c.lineTo(54,pose==='jump'?31:34);c.stroke();}
  }
  c.restore();
}
export function uiIcon(c,w,h,type) {
  c.clearRect(0,0,w,h);
  if(type==='home'){exitArch(c,w/2,h-2*w/38,0,.52*w/38);return;}
  const portraitHeight=w*44/58;c.save();c.translate(0,(h-portraitHeight)/2);skillIcon(c,w,portraitHeight,'walk');c.restore();
}

function themedBackground(theme){
  const canvas=document.createElement('canvas');canvas.width=WIDTH;canvas.height=HEIGHT;const c=canvas.getContext('2d'),p=THEMES[theme];
  const gradient=c.createLinearGradient(0,0,0,HEIGHT);gradient.addColorStop(0,p.sky[0]);gradient.addColorStop(1,p.sky[1]);c.fillStyle=gradient;c.fillRect(0,0,WIDTH,HEIGHT);
  const poly=(points,color)=>{c.fillStyle=color;c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.fill();};
  if(theme==='ruins'){
    c.fillStyle='#d7b37635';c.beginPath();c.arc(790,95,40,0,Math.PI*2);c.fill();
    for(let i=0;i<4;i++)poly([[i*320-90,380],[i*320+110,120+i%2*45],[i*320+330,380]],'#5d454244');
    for(const x of [78,244,751,920]){c.fillStyle='#372f334d';c.fillRect(x,120,30,275);c.fillRect(x-7,110,44,12);c.fillRect(x-5,385,40,10);c.fillStyle='#be986315';c.fillRect(x+5,133,5,245);}
    for(let i=0;i<45;i++){c.fillStyle='#bd95582b';c.fillRect(hash(i,55)%1000,355+hash(i,56)%105,30+hash(i,9)%40,3);}
  }else if(theme==='crystal'){
    for(let i=0;i<17;i++){const x=i*67,y=50+hash(i,33)%150;poly([[x-25,0],[x+20,0],[x+5,y]],'#131d36');}
    for(let i=0;i<15;i++){const x=hash(i,11)%1000,y=330+hash(i,17)%110,h=45+hash(i,9)%85;poly([[x-18,y],[x-12,y-h],[x+3,y-h-18],[x+18,y-h+3],[x+23,y]],'#50629b40');poly([[x+3,y-h-18],[x+3,y],[x+23,y],[x+18,y-h+3]],'#7e91b126');}
    for(let i=0;i<40;i++){c.fillStyle='#c4ddff48';c.fillRect(hash(i,77)%1000,hash(i,15)%400,1,2);}
  }else if(theme==='clockwork'){
    for(const [x,y,r] of [[180,135,85],[355,160,54],[805,125,75],[880,350,110]]){
      c.save();c.translate(x,y);c.fillStyle='#18262b66';for(let i=0;i<14;i++){c.save();c.rotate(i*Math.PI/7);c.fillRect(r-8,-9,24,18);c.restore();}c.beginPath();c.arc(0,0,r,0,Math.PI*2);c.fill();c.strokeStyle='#b5986026';c.lineWidth=6;c.beginPath();c.arc(0,0,r*.65,0,Math.PI*2);c.stroke();for(let i=0;i<6;i++){c.save();c.rotate(i*Math.PI/3);c.fillStyle='#63706840';c.fillRect(0,-4,r*.6,8);c.restore();}c.restore();
    }
    for(const x of [67,293,715,926]){c.fillStyle='#18272d66';c.fillRect(x,0,8,470);for(let y=30;y<470;y+=55){c.fillStyle='#8a8a6633';c.fillRect(x-3,y,14,4);}}
  }else{
    c.fillStyle='#e3f1ed40';c.beginPath();c.arc(155,85,29,0,Math.PI*2);c.fill();
    for(let i=0;i<7;i++){const x=i*175-60,top=95+(i%3)*40;poly([[x-130,430],[x,top],[x+170,430]],i%2?'#637f8d':'#435f73');poly([[x-38,top+86],[x,top],[x+44,top+86],[x+15,top+67],[x-6,top+88],[x-20,top+61]],'#b4d0d366');}
    for(let i=0;i<85;i++){c.fillStyle='#dbe9ee65';c.fillRect(hash(i,15)%1000,hash(i,39)%470,1+i%2,1+i%2);}
  }
  return canvas;
}

export function exitPortal(c,level,tick,active){
  if(!active)return;
  c.save();c.translate(level.exitX,level.exitY);
  c.beginPath();c.moveTo(-18,-3);c.lineTo(-4,-39);c.lineTo(6,-39);c.lineTo(19,-3);c.closePath();c.clip();
  const glow=c.createRadialGradient(1,-19,1,1,-19,25);glow.addColorStop(0,'#b9edff');glow.addColorStop(.18,'#8e88ff');glow.addColorStop(.5,'#5844b5');glow.addColorStop(1,'#142039');c.fillStyle=glow;c.fillRect(-20,-40,40,40);
  for(let arm=0;arm<3;arm++){
    c.beginPath();for(let i=0;i<34;i++){const a=i*.17+tick*.075+arm*Math.PI*2/3,r=1+i*.37,x=1+Math.cos(a)*r,y=-19+Math.sin(a)*r*.7;i?c.lineTo(x,y):c.moveTo(x,y);}c.strokeStyle=['#d2d3ff99','#75ddff88','#b8a0ff99'][arm];c.lineWidth=.75;c.stroke();
  }
  for(let i=0;i<6;i++){const a=tick*.045+i*2.4,r=8+i%3*3;c.fillStyle=i%2?'#f5f3ff':'#a6e5ff';c.fillRect(Math.round(1+Math.cos(a)*r),Math.round(-19+Math.sin(a)*r),1,1);}
  c.restore();
}
function lemmingBack(c,tick){
  const step=Math.floor(tick/6)%2;
  c.fillStyle='#223333';c.fillRect(-6,-24,12,24);
  c.fillStyle='#f5d4af';c.fillRect(-8,-17,2,5);c.fillRect(6,-17,2,5);
  c.fillStyle='#49a53c';c.fillRect(-7,-23,14,11);c.fillRect(-5,-25,10,3);
  c.fillStyle='#79d554';c.fillRect(-5,-24,4,9);c.fillRect(0,-24,4,11);c.fillStyle='#9ee972';c.fillRect(-4,-24,3,3);
  c.fillStyle='#3c55b5';c.fillRect(-5,-12,10,10);c.fillStyle='#5c76d6';c.fillRect(-3,-11,4,8);
  c.fillStyle='#f3ecd7';c.fillRect(-8,-10,3,6);c.fillRect(5,-10,3,6);
  c.fillStyle='#f5d4af';c.fillRect(-6,-2,4,2+step);c.fillRect(2,-2,4,3-step);
}
export function enteringLemming(c,u,level,tick){
  const t=u.exitTick;
  c.save();
  if(t<16){
    c.translate(u.x,u.y);c.scale(Math.max(.28,1-t/20),1);character(c,0,0,'walk',u.dir,tick);
  }else if(t<42){
    c.translate(u.x,u.y);c.scale(.82,1);lemmingBack(c,tick);
  }else{
    // Once through the threshold, the doorway clips the miniature orbit.
    c.beginPath();c.moveTo(level.exitX-18,level.exitY-3);c.lineTo(level.exitX-4,level.exitY-39);c.lineTo(level.exitX+6,level.exitY-39);c.lineTo(level.exitX+19,level.exitY-3);c.closePath();c.clip();
    const p=(t-42)/54,r=5*(1-p),angle=p*Math.PI*4,scale=Math.max(.04,.84*(1-p));
    c.translate(level.exitX+1+Math.cos(angle)*r,level.exitY-19+Math.sin(angle)*r*.65);c.rotate(angle);c.scale(scale,scale);c.globalAlpha=Math.min(1,(1-p)*3);c.translate(0,12);lemmingBack(c,tick);
  }
  c.restore();
}

// All hazard motion uses simulation time, so pause and 2x stay consistent.
export function hazards(c,tick,theme,height=HEIGHT){
  const hazard=THEMES[theme].hazard;
  if(hazard==='void'){c.fillStyle='#0c1026';c.fillRect(0,height-28,WIDTH,28);for(let i=0;i<30;i++){c.fillStyle='#bfcaf166';c.fillRect((i*79+tick*.2)%WIDTH,height-25+i%20,1,1);}hazardMarkers(c,height-14);return;}
  const lava=hazard==='lava'||theme==='clockwork',surface=height-28;
  c.save();
  const fill=c.createLinearGradient(0,surface,0,height);
  fill.addColorStop(0,lava?'#ffb33e':hazard==='sand'?'#cdb482':hazard==='syrup'?'#b183a0':'#589ba9');
  fill.addColorStop(.22,lava?'#d94b20':THEMES[theme].water);
  fill.addColorStop(1,lava?'#681d20':hazard==='sand'?'#796144':hazard==='syrup'?'#50324b':'#142c43');
  c.fillStyle=fill;c.fillRect(0,surface,WIDTH,height-surface);
  // A rolling surface with bright foam or molten seams.
  for(let row=0;row<3;row++){
    c.beginPath();
    for(let x=0;x<=WIDTH;x+=3){const y=surface+2+row*8+Math.sin(x*.065-tick*.065+row*2)*1.5+Math.sin(x*.027+tick*.035)*.6;x?c.lineTo(x,y):c.moveTo(x,y);}
    c.strokeStyle=lava?['#ffe58c','#ff992c','#f67423'][row]:(hazard==='sand'?['#dfc696','#c4a879','#b79b6a']:hazard==='syrup'?['#dbadc8','#b886a2','#996487']:['#b1e4eb','#71b9cc99','#5493b099'])[row];c.lineWidth=row?1:2;c.stroke();
  }
  for(let i=0;i<32;i++){
    const phase=(tick+(hash(i,82)%150))%150/150,x=(i*37+tick*(lava?.1:.45))%(WIDTH+24)-12;
    if(lava){
      const r=Math.sin(phase*Math.PI)* (2+i%4),y=surface+18-phase*15;
      c.fillStyle='#a52f1c';c.strokeStyle='#ffca52';c.lineWidth=1.3;c.beginPath();c.ellipse(x,y,r,r*.65,0,0,Math.PI*2);c.fill();c.stroke();
      if(phase>.82){c.fillStyle='#ffe287';c.fillRect(x-2,surface-2-(phase-.82)*25,2,2);}
    }else{
      c.fillStyle='#b0e1ed99';c.fillRect(x,surface+5+i%3*7+Math.sin(tick*.08+i)*2,5+i%7,1);
      if(i%4===0){c.strokeStyle='#86cad780';c.beginPath();c.ellipse(x,surface+13-phase*10,2+phase*4,1.2,0,0,Math.PI*2);c.stroke();}
    }
  }
  hazardMarkers(c,height-14);
  c.restore();
}
