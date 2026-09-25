import {chapterBackdrop,parasol,iceCream} from './chapter-art.js';
import {WORLDS} from './worlds.js';
const TAU=Math.PI*2;
function poly(c,p,color){c.fillStyle=color;c.beginPath();p.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.fill();}
function ellipse(c,x,y,rx,ry,color){c.fillStyle=color;c.beginPath();c.ellipse(x,y,rx,ry,0,0,TAU);c.fill();}
function tree(c,x,y,size=1,palm=false){c.save();c.translate(x,y);c.scale(size,size);c.strokeStyle=palm?'#846b48':'#4c5140';c.lineWidth=8;c.beginPath();c.moveTo(0,0);c.quadraticCurveTo(-8,-35,2,-70);c.stroke();if(palm){for(let i=0;i<7;i++){const a=i*.6-3.4;poly(c,[[2,-70],[Math.cos(a)*45,-70+Math.sin(a)*25],[Math.cos(a)*40,-63+Math.sin(a)*17]],i%2?'#58b93f':'#247c39');}}else{ellipse(c,0,-74,28,22,'#16783a');ellipse(c,-19,-65,19,16,'#2e9e3e');ellipse(c,20,-69,22,18,'#65bf42');}c.restore();}
function pine(c,x,y,s=1,color='#268548'){c.fillStyle='#565447';c.fillRect(x-3*s,y-20*s,6*s,20*s);for(let i=0;i<3;i++)poly(c,[[x,y-(80-i*18)*s],[x-(22+i*6)*s,y-(30-i*14)*s],[x+(22+i*6)*s,y-(30-i*14)*s]],color);}
function pyramid(c,x,y,w,h){poly(c,[[x-w/2,y],[x,y-h],[x+w/2,y]],'#b3966a');poly(c,[[x,y-h],[x+w/2,y],[x+12,y]],'#897457');}
function tower(c,x,y,h,color){c.fillStyle=color;c.fillRect(x-22,y-h,44,h);for(let i=0;i<4;i++)c.fillRect(x-25+i*14,y-h-8,10,12);c.fillStyle='#333c50';for(let yy=y-h+25;yy<y;yy+=35)c.fillRect(x-4,yy,8,17);}
function crystal(c,x,y,h,color){poly(c,[[x-13,y],[x-17,y-h*.7],[x,y-h],[x+16,y-h*.7],[x+12,y]],color);poly(c,[[x,y-h],[x+16,y-h*.7],[x+12,y],[x,y]],'#d2e8ee44');}
export function worldBackground(key,height=470){
 const w=WORLDS.find(w=>w.key===key);if(!w)return null;
 const canvas=document.createElement('canvas');canvas.width=1000;canvas.height=height;const c=canvas.getContext('2d');
 if(['circus','beach'].includes(key)){chapterBackdrop(c,key,height);return canvas;}
 const g=c.createLinearGradient(0,0,0,470);g.addColorStop(0,w.sky[0]);g.addColorStop(1,w.sky[1]);c.fillStyle=g;c.fillRect(0,0,1000,470);
 const hills=(color,offset=0)=>{c.fillStyle=color;c.beginPath();c.moveTo(0,470);for(let x=0;x<=1000;x+=10)c.lineTo(x,290+offset+Math.sin(x*.01)*30+Math.cos(x*.019)*20);c.lineTo(1000,470);c.fill();};
 const stars=()=>{for(let i=0;i<100;i++){c.fillStyle=i%3?'#d3e4e880':'#eff6ef';c.fillRect((i*173)%1000,(i*67)%380,1+i%2,1);}};
 if(['space','station'].includes(key)){
  stars();ellipse(c,720,140,100,100,'#73769a');ellipse(c,694,119,19,10,'#555c83');ellipse(c,758,165,25,17,'#8589aa');c.strokeStyle='#aab6c970';c.lineWidth=12;c.beginPath();c.ellipse(720,140,145,22,-.3,0,TAU);c.stroke();
  for(let i=0;i<10;i++)poly(c,[[i*130-40,340],[i*130,320-i%3*35],[i*130+48,344],[i*130+27,376]],'#474868');
  if(key==='station'){c.strokeStyle='#6d839755';c.lineWidth=8;for(let x=0;x<1000;x+=160){c.strokeRect(x,30,120,370);c.beginPath();c.moveTo(x,30);c.lineTo(x+120,400);c.stroke();}ellipse(c,720,140,20,60,'#b5d6d130');}
 }else if(key==='beach'){
  ellipse(c,790,80,33,33,'#f4dfac');c.fillStyle='#598e9f';c.fillRect(0,210,1000,260);for(let i=0;i<14;i++){c.fillStyle='#bed6c02b';c.fillRect(i*87%1000,220+i*11,120,2);}hills('#b6a477',110);for(const x of [30,780,960])tree(c,x,405,1.7,true);pyramid(c,640,401,95,38);
 }else if(['egypt','marble'].includes(key)){
  ellipse(c,780,83,35,35,'#e5c89670');hills('#88775f',20);
  if(key==='egypt'){/* Pyramids are placed on the final sand surface below. */}
  else {for(let x=90;x<1000;x+=155){c.fillStyle='#a997ae55';c.fillRect(x,110,24,260);c.fillRect(x-9,105,42,12);c.fillRect(x-8,362,40,10);c.fillStyle='#e0cddd22';c.fillRect(x+6,123,3,230);}c.fillStyle='#d3bfc733';c.fillRect(65,85,850,18);}
 }else if(['volcano','factory'].includes(key)){
  hills('#363140',20);if(key==='volcano'){poly(c,[[160,400],[440,105],[515,105],[830,400]],'#423945');poly(c,[[442,108],[469,128],[485,104],[503,110],[483,172],[495,225],[455,275],[468,190]],'#cb714d');for(let i=0;i<8;i++)ellipse(c,470+i*12,80-i*10,30+i*4,15,'#70636b44');}
  else {for(let i=0;i<7;i++){c.fillStyle='#37414b';c.fillRect(i*154,210,110,220);c.fillRect(i*154+30,60+i%3*30,20,170);c.fillStyle='#bf8c5f44';for(let j=0;j<4;j++)c.fillRect(i*154+15+j*24,255,10,50);}for(let x=90;x<1000;x+=200){c.strokeStyle='#98a39b33';c.lineWidth=12;c.beginPath();c.arc(x,170,58,0,TAU);c.stroke();}}
 }else if(['alpine','polar','highland'].includes(key)){
  ellipse(c,140,74,28,28,key==='polar'?'#ddf4da99':'#fff1cb66');for(let i=0;i<8;i++){const x=i*165-40,top=80+(i%3)*40;poly(c,[[x-145,430],[x,top],[x+180,430]],i%2?'#6a8d98':'#567781');poly(c,[[x-38,top+78],[x,top],[x+41,top+76],[x+12,top+59],[x-5,top+80]],key==='highland'?'#a5b69b':'#d4e3df');}
  if(key==='highland'){hills('#70866a',70);hills('#566f59',110);}if(key==='polar'){for(let i=0;i<4;i++){c.strokeStyle=['#94e7ce20','#a8baf222'][i%2];c.lineWidth=20;c.beginPath();c.moveTo(0,35+i*14);c.bezierCurveTo(350,150,600,-30,1000,90+i*9);c.stroke();}}
 }else if(key==='candy'){
  for(let i=0;i<8;i++){const x=i*155;ellipse(c,x,335,130,130+i%3*30,i%2?'#b78ea5':'#8a7ba0');ellipse(c,x,240-i%3*20,80,24,'#dfbdd04d');}
  for(let i=0;i<9;i++){c.fillStyle='#b9bcc299';c.fillRect(i*123,190+i%2*20,5,250);ellipse(c,i*123+2,185+i%2*20,34,34,i%2?'#a5c5b075':'#ebbdc475');}
 }else if(['castle','night'].includes(key)){
  if(key==='night'){stars();ellipse(c,810,80,38,38,'#dbd6b1');ellipse(c,824,71,33,33,w.sky[0]);}
  for(let i=0;i<12;i++){const x=i*95,h=90+(i*47)%130;if(key==='castle')tower(c,x,410,h,'#596170');else{c.fillStyle='#303a53';c.fillRect(x,410-h,75,h);poly(c,[[x-5,410-h],[x+37,380-h],[x+80,410-h]],'#3f4862');for(let k=0;k<6;k++){c.fillStyle='#e3c48a44';c.fillRect(x+12+k%3*19,425-h+Math.floor(k/3)*30,8,13);}}}
 }else if(['circus','sports'].includes(key)){
  if(key==='circus'){for(let i=0;i<4;i++){const x=120+i*260;poly(c,[[x-130,360],[x,130+i%2*40],[x+130,360]],'#97687b');poly(c,[[x-80,360],[x,130+i%2*40],[x+25,360]],'#c4a685');c.fillStyle='#8b5972';c.fillRect(x-120,360,240,60);}c.strokeStyle='#bfb09f66';c.beginPath();c.moveTo(0,55);c.quadraticCurveTo(500,200,1000,55);c.stroke();for(let i=0;i<20;i++)poly(c,[[i*55,55+Math.sin(i/19*Math.PI)*72],[i*55+20,59+Math.sin(i/19*Math.PI)*72],[i*55+10,79+Math.sin(i/19*Math.PI)*72]],i%2?'#bc8a84':'#c4b77f');}
  else {hills('#74916c',80);for(let y=290;y<400;y+=12){c.fillStyle=y%24?'#607d7988':'#b5bb9b66';c.fillRect(0,y,1000,6);}for(const x of [60,940]){c.fillStyle='#8d9e9c';c.fillRect(x,95,5,250);c.fillRect(x-20,90,45,12);}c.fillStyle='#537565';c.fillRect(0,400,1000,70);}
 }else{
  hills('#45615c',45);for(let i=0;i<13;i++){const x=i*89,y=410+(i%3)*12;
   if(['waterfall','prehistoric','enchanted'].includes(key)){poly(c,[[x-30,0],[x+26,0],[x+6,75+i%3*45]],'#20303d');if(key==='prehistoric')pine(c,x,y,1.8,'#258341');else crystal(c,x,y,60+i%3*28,key==='enchanted'?'#798d9a55':'#547a8155');}
   else {tree(c,x,y,2.1);if(key==='treehouse'&&i%3===0){c.fillStyle='#ae966270';c.fillRect(x-25,y-160,50,35);poly(c,[[x-35,y-160],[x,y-188],[x+35,y-160]],'#596b48');}}
  }
 }
 if(key==='enchanted'){c.save();c.globalAlpha=.3;for(const [i,color] of ['#d996a9','#dec386','#b6d097','#8bcacb','#aca2d1'].entries()){c.strokeStyle=color;c.lineWidth=6;c.beginPath();c.arc(550,360,220-i*7,Math.PI,Math.PI*2);c.stroke();}c.restore();}
 // Keep backgrounds behind the much sharper playable silhouettes.
 c.fillStyle='#13233512';c.fillRect(0,0,1000,470);
 if(height>470){
  const fade=c.createLinearGradient(0,390,0,450);fade.addColorStop(0,w.sky[1]+'00');fade.addColorStop(1,w.sky[1]);c.fillStyle=fade;c.fillRect(0,390,1000,60);
  const depth=c.createLinearGradient(0,450,0,height);depth.addColorStop(0,w.sky[1]);depth.addColorStop(1,w.sky[0]);c.fillStyle=depth;c.fillRect(0,450,1000,height-450);
  for(let y=480;y<height;y+=150)for(let i=0;i<8;i++){
   const x=i*145+(y%47);c.globalAlpha=.22;
   if(['space','station','night'].includes(key)){c.fillStyle='#9cadcf';c.fillRect(x,y,2,2);c.fillRect(x+46,y+52,1,1);if(key==='station'){c.strokeStyle='#8a9eb0';c.strokeRect(x-30,y-50,80,125);}}
   else if(['candy','circus'].includes(key)){ellipse(c,x,y+80,70,75,i%2?w.earth[1]:w.grass[1]);}
   else if(['woodland','treehouse','highland'].includes(key)){c.globalAlpha=.65;tree(c,x,y+130,1.6);}
   else if(['egypt','marble','castle'].includes(key)){tower(c,x,y+130,110,w.earth[1]);}
   else if(['alpine','polar'].includes(key)){poly(c,[[x-60,y+130],[x,y-20],[x+75,y+130]],'#557785');poly(c,[[x-17,y+20],[x,y-20],[x+20,y+20],[x+4,y+12]],'#d4e3df');}
   else {poly(c,[[x-60,y+130],[x,y-20],[x+75,y+130]],w.earth[2]);crystal(c,x+20,y+80,45,w.grass[1]);}
   c.globalAlpha=1;
  }
 }
 if(key==='egypt'){const ground=height-28;pyramid(c,245,ground,660,330);pyramid(c,600,ground,460,230);pyramid(c,850,ground,580,300);}
 return canvas;
}
export function scenerySupported(level,x,y,terrainAt=null){
 const solid=terrainAt||((px,py)=>{
  if(level.terrain.some(([tx,ty,w,h])=>px>=tx&&px<tx+w&&py>=ty&&py<ty+h))return true;
  return (level.shapes||[]).some(({points})=>{let inside=false;for(let i=0,j=points.length-1;i<points.length;j=i++){const [ax,ay]=points[i],[bx,by]=points[j];if((ay>py)!==(by>py)&&px<(bx-ax)*(py-ay)/(by-ay)+ax)inside=!inside;}return inside;});
 });
 return !!solid(x,y)&&![1,12,24,40].some(d=>solid(x,y-d));
}
export function worldScenery(c,tick,level,terrainAt=null){
 const key=level.theme;
 // Ancient trunks replace the forest's masonry. Branches and foliage are decorative;
 // the dark bark below follows the exact solid collision silhouette.
 if(key==='woodland')for(const [x,y,w,h,type] of level.terrain){
  if(type!==2||h<w||y>(level.height||470)-30)continue;
  const mid=x+w/2;c.save();c.strokeStyle='#20382a';c.lineWidth=Math.max(3,w*.2);c.lineCap='round';
  for(const side of [-1,1]){c.beginPath();c.moveTo(mid,y+Math.min(h*.35,25));c.lineTo(mid+side*(w*.65+7),y-7);c.lineTo(mid+side*(w*.7+9),y-20);c.stroke();}
  ellipse(c,mid,y-15,w*.9+10,17,'#163d26');ellipse(c,mid-w*.5-5,y-7,w*.6+8,12,'#205331');ellipse(c,mid+w*.55+4,y-11,w*.55+7,13,'#286039');
  c.restore();
 }
 // Local details anchored to solid starting shelves, never floating scenery.
 for(const [i,[x,y,w,h,type]] of level.terrain.entries()){
  if((type!==1&&!(key==='beach'&&type===2&&h<65))||w<100||y>(level.height||560)-30)continue;const px=x+Math.min(w*.22,60);if(!scenerySupported(level,px,y,terrainAt))continue;c.save();c.globalAlpha=.85;
  if(['woodland','treehouse','highland'].includes(key)){c.save();c.translate(px,y);c.rotate(Math.sin(tick*.025+i)*.055);tree(c,0,0,key==='treehouse'?.8:.65);c.restore();}
  if(key==='beach'){if(scenerySupported(level,x+w*.68,y,terrainAt))parasol(c,x+w*.68,y,22);if(scenerySupported(level,x+w*.85,y,terrainAt))iceCream(c,x+w*.85,y,.75);c.save();c.translate(px,y);c.rotate(Math.sin(tick*.024+i)*.07);tree(c,0,0,.7,true);c.restore();c.fillStyle='#c89777';c.fillRect(x+w-45,y-10,13,10);c.strokeStyle='#d5c596';c.strokeRect(x+w-43,y-15,9,6);}
  if(['alpine','polar'].includes(key)){c.save();c.translate(px,y);c.rotate(Math.sin(tick*.02+i)*.04);pine(c,0,0,.65,'#24884b');c.restore();}
  if(key==='candy'){c.fillStyle='#d5c7b4';c.fillRect(px-2,y-42,4,42);ellipse(c,px,y-44,16,16,i%2?'#e2a6ba':'#b9d1b6');c.strokeStyle='#f5d6de';c.lineWidth=2;c.beginPath();c.arc(px,y-44,9,0,TAU*1.4);c.stroke();}
  if(['space','station','enchanted','waterfall'].includes(key))crystal(c,px,y,24+i%3*10,key==='station'?'#79acb1':'#9daacb');
  if(key==='egypt'){c.fillStyle='#bda170';c.fillRect(px-9,y-45,18,45);c.fillStyle='#dbc28f';c.fillRect(px-13,y-47,26,6);for(let j=0;j<4;j++){c.fillStyle='#7b715951';c.fillRect(px-4,y-38+j*8,8,3);}}
  if(key==='marble'){c.fillStyle='#c1a6b7';c.fillRect(px-6,y-45,12,45);c.fillRect(px-11,y-47,22,5);c.fillStyle='#ead4d3';c.fillRect(px-3,y-41,2,38);}
  if(key==='castle'){c.fillStyle='#90938e';c.fillRect(px-13,y-19,26,19);for(let j=0;j<3;j++)c.fillRect(px-13+j*10,y-26,6,8);}
  if(key==='prehistoric'){c.strokeStyle='#c6baa0';c.lineWidth=4;c.beginPath();c.moveTo(px-18,y-3);c.quadraticCurveTo(px,y-34,px+18,y-3);c.stroke();for(let j=-12;j<=12;j+=8){c.beginPath();c.moveTo(px+j,y-3);c.lineTo(px+j,y-15+Math.abs(j)*.5);c.stroke();}}
  if(key==='night'){c.fillStyle='#859193';c.fillRect(px,y-48,3,48);ellipse(c,px+2,y-48,6,8,'#ead49a');ellipse(c,px+2,y-48,16,19,'#f0d18c13');}
  if(key==='sports'){c.fillStyle='#c8c9b4';c.fillRect(px,y-25,3,25);poly(c,[[px+3,y-25],[px+18,y-20],[px+3,y-15]],'#cb947b');}
  if(key==='circus'){c.fillStyle='#ed2548';c.fillRect(px-13,y-15,26,15);for(let j=0;j<3;j++)poly(c,[[px-12+j*9,y-14],[px-8+j*9,y-2],[px-4+j*9,y-14]],'#ffd747');ellipse(c,px,y-15,14,4,'#ffd747');ellipse(c,px,y-16,11,2,'#f74461');}
  if(['volcano','factory'].includes(key)){c.fillStyle='#57606a';c.fillRect(px-8,y-25,16,25);c.fillStyle='#b88c60';c.fillRect(px-10,y-28,20,5);}
  c.restore();
 }
 if(['polar','alpine'].includes(key)){for(let i=0;i<35;i++){c.fillStyle='#e4f1ee70';c.fillRect((i*97+tick*.15)%1000,(i*53+tick*.3)%440,2,2);}}
}
