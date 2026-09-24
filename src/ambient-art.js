// Ambient world life is drawn behind the playable terrain and never changes collision.
const TAU = Math.PI * 2;
const wrap = (n, span) => ((n % span) + span) % span;
function oval(c,x,y,rx,ry,color) { c.fillStyle=color;c.beginPath();c.ellipse(x,y,rx,ry,0,0,TAU);c.fill(); }
function shape(c,points,color) { c.fillStyle=color;c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.fill(); }
function bird(c,x,y,t,white=false) {
 c.save();c.translate(x,y);c.strokeStyle=white?'#eef1d9':'#b1cdb0';c.lineWidth=2.4;c.lineCap='round';
 const flap=Math.sin(t)*8;c.beginPath();c.moveTo(-14,-flap);c.quadraticCurveTo(-7,-5,0,2);c.quadraticCurveTo(7,-5,14,-flap);c.stroke();oval(c,0,2,3,2,c.strokeStyle);c.restore();
}
function rotor(c,x,y,angle,r,color,vanes=false) {
 c.save();c.translate(x,y);c.rotate(angle);
 for(let i=0;i<4;i++){c.rotate(Math.PI/2);c.fillStyle=color;c.fillRect(0,-2,r,4);if(vanes){c.fillRect(r*.36,-9,r*.62,8);c.strokeStyle='#eee2b875';c.lineWidth=1;for(let j=0;j<4;j++){c.beginPath();c.moveTo(r*.4+j*r*.14,-9);c.lineTo(r*.4+j*r*.14,-1);c.stroke();}}}
 oval(c,0,0,5,5,'#e1cb94');c.restore();
}
function windmill(c,x,y,t) {
 shape(c,[[x-18,y+83],[x-12,y],[x+12,y],[x+24,y+83]],'#b6a181');shape(c,[[x-20,y+4],[x,y-18],[x+20,y+4]],'#6a6269');c.fillStyle='#435353';c.fillRect(x-4,y+45,9,17);rotor(c,x,y+13,t*.012,42,'#d3c6a2',true);
}
function gear(c,x,y,r,t) {
 c.save();c.translate(x,y);c.rotate(t);c.strokeStyle='#a9936b';c.lineWidth=8;c.beginPath();c.arc(0,0,r*.75,0,TAU);c.stroke();for(let i=0;i<12;i++){c.rotate(TAU/12);c.fillStyle='#aa9777';c.fillRect(r*.64,-4,r*.35,8);}rotor(c,0,0,0,r*.64,'#968976');c.restore();
}
function dolphin(c,x,surface,t) {
 const phase=wrap(t,430)/430;if(phase>.74)return;
 const p=phase/.74, y=surface-8-Math.sin(p*Math.PI)*58;
 c.save();c.translate(x+p*130,y);c.rotate((p-.5)*1.6);
 oval(c,0,0,20,7,'#82b2c0');oval(c,5,2,13,4,'#c6dce0');shape(c,[[12,-2],[29,1],[15,4]],'#82b2c0');shape(c,[[-5,-4],[-11,-16],[3,-5]],'#82b2c0');shape(c,[[-18,0],[-31,-9],[-27,0],[-32,6]],'#82b2c0');oval(c,14,-2,1.4,1.4,'#223e50');c.restore();
 if(p<.14||p>.86){c.strokeStyle='#ddf5ef';c.lineWidth=2;for(let i=0;i<4;i++){c.beginPath();c.moveTo(x+p*130+(i-2)*6,surface+3);c.lineTo(x+p*130+(i-2)*10,surface-10-i%2*5);c.stroke();}}
}
function rock(c,x,y,r,t,snow=false) {
 c.save();c.translate(x,y);c.rotate(t);if(snow){oval(c,0,0,r,r,'#d1e6e9');oval(c,-r*.25,-r*.3,r*.6,r*.5,'#f3f8ee');oval(c,r*.35,r*.25,r*.2,r*.16,'#9bbeca');c.restore();return;}shape(c,[[-r,-r*.35],[-r*.45,-r],[r*.6,-r*.85],[r,r*.2],[r*.35,r],[-r*.8,r*.65]],snow?'#c8e1e5':'#897b77');shape(c,[[-r*.45,-r],[r*.6,-r*.85],[r*.15,0],[-r*.8,r*.25]],snow?'#f1f7ed':'#b49b88');c.strokeStyle=snow?'#8cafbf':'#5e575e';c.lineWidth=1.5;c.beginPath();c.moveTo(-r*.4,0);c.lineTo(r*.3,r*.4);c.stroke();c.restore();
}
function butterfly(c,x,y,t,color) {const flap=3+Math.abs(Math.sin(t))*5;oval(c,x-flap*.65,y,flap,6,color);oval(c,x+flap*.65,y,flap,6,color);oval(c,x,y,1.4,5,'#455653');}
export function ambientWorld(c,tick,level) {
 const key=level.theme, height=level.height||470, t=tick;
 c.save();c.globalAlpha=.8;
 // A complete skyline scene remains visible at every depth of taller maps.
 for(let row=0;row<height-70;row+=330){
  const seed=row*.13;
  if(['woodland','beach','waterfall','alpine','treehouse','highland','castle','sports','marble'].includes(key)){
   for(let i=0;i<3;i++){const x=wrap(t*(.62+i*.07)+i*335+seed,1120)-60;bird(c,x,row+53+i*21+Math.sin(t*.018+i)*7,t*.13+i,key==='beach'||key==='alpine');}
  }
  if(['woodland','treehouse','highland'].includes(key)) {
   for(let i=0;i<7;i++){const x=wrap(120+i*153+t*.42,1080)-40,y=row+80+wrap(i*27+t*.2,200);c.save();c.translate(x,y);c.rotate(t*.035+i);oval(c,0,0,5,2,'#c2b86c');c.restore();}
   butterfly(c,330+Math.sin(t*.018)*55,row+145+Math.cos(t*.026)*20,t*.2,'#d9bc82');
  }
  if(['highland','woodland'].includes(key)){const shelves=level.terrain.filter(r=>r[4]===1&&r[2]>160&&r[1]>row+140&&r[1]<row+330);const shelf=shelves.find(r=>r[0]<785&&r[0]+r[2]>785)||shelves[0];if(shelf){const x=Math.min(shelf[0]+shelf[2]-45,Math.max(shelf[0]+45,785));windmill(c,x,shelf[1]-83,t+seed);}}
  if(key==='beach') {
   // Dolphins leap out of the distant ocean; the foreground water remains dangerous.
   dolphin(c,120,row+246,t+90);dolphin(c,690,row+269,t+260);
   c.strokeStyle='#d0e9e480';c.lineWidth=2;for(let i=0;i<5;i++){c.beginPath();c.ellipse(wrap(i*221+t*.32,1100)-50,row+247+i*12,35,3,0,0,Math.PI);c.stroke();}
  }
  if(key==='factory') {gear(c,220,row+130,38,t*.019);gear(c,283,row+147,25,-t*.029);gear(c,770,row+99,46,-t*.013);for(let i=0;i<6;i++){const p=wrap(t*.4+i*22,150);oval(c,500+Math.sin(p*.025)*18,row+190-p,9+p*.1,7+p*.07,'#aab7ae25');}}
  if(['volcano','prehistoric'].includes(key)) {
   // Distant debris falls behind every playable shelf: scenery, not a new trap.
   for(let i=0;i<4;i++){const p=wrap(t*(.7+i*.12)+i*91,335);rock(c,110+i*238+Math.sin(p*.02)*12,row-30+p,8+i%2*4,t*.035+i);}
   if(key==='volcano')for(let i=0;i<13;i++){const p=wrap(t*.65+i*33,270);oval(c,70+i*77+Math.sin(p*.04)*12,row+300-p,2,3,'#eeb879');}
  }
  if(['polar','alpine'].includes(key)) {
   // Snowballs roll along a distant ridge, always behind the active terrain.
   const ridge=row+174;c.strokeStyle='#afcbd270';c.lineWidth=6;c.beginPath();c.moveTo(0,ridge);c.lineTo(1000,ridge+62);c.stroke();
   for(let i=0;i<3;i++){const x=wrap(t*.9+i*370,1100)-50;rock(c,x,ridge+x*.062-11,10+i*2,t*.06+i,true);}
   for(let i=0;i<24;i++){const x=wrap(i*97+t*.25+Math.sin(t*.015+i)*9,1000),y=row+wrap(i*53+t*.55,330);oval(c,x,y,1.7,1.7,'#e4f1ee');}
  }
  if(key==='egypt') {
   for(let i=0;i<3;i++){const x=wrap(t*.38+i*340,1100)-50;bird(c,x,row+65+i*22,t*.045+i,false);}
   for(let i=0;i<12;i++){c.fillStyle='#ebc98870';c.fillRect(wrap(i*87+t*1.5,1000),row+150+i*8+Math.sin(t*.018+i)*5,16,1);}
  }
  if(['space','station'].includes(key)) {
   for(let i=0;i<4;i++){const x=wrap(i*289+t*(i%2?.15:-.2),1120)-60;rock(c,x,row+70+i*48+Math.sin(t*.009+i)*17,12+i*3,t*.006+i);}
   const x=wrap(t*.7+450,1200)-100,y=row+104+Math.sin(t*.014)*18;c.save();c.translate(x,y);c.rotate(Math.sin(t*.008)*.25);c.fillStyle='#9dadc4';c.fillRect(-8,-7,16,14);c.fillStyle='#668db6';c.fillRect(-43,-12,29,24);c.fillRect(14,-12,29,24);c.strokeStyle='#d2dfda';c.lineWidth=2;c.beginPath();c.moveTo(-8,0);c.lineTo(-14,0);c.moveTo(8,0);c.lineTo(14,0);c.stroke();rotor(c,0,0,t*.015,11,'#cedbc9');c.restore();
  }
  if(key==='candy') {for(let i=0;i<3;i++){const x=170+i*330,y=row+120+i%2*35;c.fillStyle='#dacbbb';c.fillRect(x-3,y,6,90);oval(c,x,y,26,26,'#e4c4c4');rotor(c,x,y,t*.025*(i%2?-1:1),23,i%2?'#a5c7b9':'#c885a6',true);}}
  if(key==='marble') {for(let i=0;i<3;i++){const x=180+i*310,y=row+178;c.strokeStyle='#bcdde5';c.lineWidth=2;for(let j=0;j<5;j++){const p=wrap(t*.025+j*.6,3)/3;c.beginPath();c.arc(x+(j-2)*p*15,y-Math.sin(p*Math.PI)*43,2,0,TAU);c.stroke();}oval(c,x,y+3,33,5,'#a6c1c380');}}
  if(key==='castle') {for(let i=0;i<3;i++){const x=190+i*305,y=row+85;c.fillStyle='#abb6b6';c.fillRect(x,y,3,85);const wave=Math.sin(t*.07+i)*9;shape(c,[[x+3,y],[x+44,y+wave],[x+35,y+16+wave],[x+3,y+20]],'#b27f88');}}
  if(key==='circus') {const x=745,y=row+156;c.strokeStyle='#bc9f98';c.lineWidth=3;shape(c,[[x-32,y+85],[x,y],[x+32,y+85]],'#807083');c.beginPath();c.arc(x,y,64,0,TAU);c.stroke();for(let i=0;i<8;i++){const a=t*.01+i*TAU/8,px=x+Math.cos(a)*64,py=y+Math.sin(a)*64;c.beginPath();c.moveTo(x,y);c.lineTo(px,py);c.stroke();c.fillStyle=i%2?'#ddba91':'#b398bd';c.fillRect(px-7,py,14,10);}for(let i=0;i<3;i++){const bx=130+i*90+Math.sin(t*.015+i)*20,by=row+80+Math.sin(t*.021+i)*12;c.strokeStyle='#c3b6b4';c.beginPath();c.moveTo(bx,by);c.lineTo(bx+6,by+45);c.stroke();oval(c,bx,by,13,17,i%2?'#b5c397':'#d69ea4');}}
  if(key==='night') {for(let i=0;i<5;i++){const x=wrap(t*.8+i*229,1120)-60;bird(c,x,row+80+i%3*35+Math.sin(t*.033+i)*16,t*.2+i); }c.strokeStyle='#ead8a170';c.lineWidth=2;c.beginPath();const p=wrap(t,550);if(p<90){c.moveTo(500+p*3,row+25+p*.6);c.lineTo(540+p*3,row+33+p*.6);}c.stroke();}
  if(key==='sports') {for(let i=0;i<3;i++){const x=180+i*320,y=row+126;rotor(c,x,y,t*.045,23,['#e7c48a','#b1c7ae','#c29bbc'][i],true);c.fillStyle='#9cae9d';c.fillRect(x-2,y+6,4,55);}const x=wrap(t*.9,1100)-50,y=row+245-Math.abs(Math.sin(t*.035))*52;oval(c,x,y,11,11,'#dec8a0');c.save();c.translate(x,y);c.rotate(t*.07);c.fillStyle='#716c67';c.fillRect(-4,-4,8,8);c.restore();}
  if(['enchanted','waterfall'].includes(key)) {for(let i=0;i<6;i++){const x=160+i*145+Math.sin(t*.016+i)*36,y=row+85+i%3*40+Math.cos(t*.022+i)*16;butterfly(c,x,y,t*.16+i,i%2?'#b1d7d9':'#c4acd6');}if(key==='enchanted'){for(let i=0;i<5;i++){const x=wrap(90+i*206+t*.2,1000),y=row+240-wrap(t*.18+i*37,200);oval(c,x,y,4,4,'#d9e1ab70');}}}
 }
 c.restore();
}
// Large silhouettes give the five finales recognisable architecture at every depth.
export function finaleLandmarks(c,t,level) {
 c.save();c.globalAlpha=.48;
 for(const p of level.setPieces||[]){
  const {left,right,y,room,form}=p,mid=(left+right)/2,w=right-left;
  if(form==='circus-rings'){
   const peak=y-102;c.strokeStyle='#d4ba9b';c.lineWidth=2;
   for(let i=0;i<8;i++)shape(c,[[mid,peak],[left+w*i/8,y+16],[left+w*(i+1)/8,y+16]],i%2?'#b37e9c':'#d5bfa2');
   for(const x of [left+12,right-12]){c.beginPath();c.moveTo(mid,peak);c.lineTo(x,y+68);c.stroke();}
   c.strokeStyle='#e9cdab';c.lineWidth=3;c.beginPath();c.ellipse(mid,y+48,w*.48,24,0,0,TAU);c.stroke();
   const swing=Math.sin(t*.022+room)*.25;c.save();c.translate(mid,peak+4);c.rotate(swing);c.beginPath();c.moveTo(-18,0);c.lineTo(-18,65);c.lineTo(18,65);c.lineTo(18,0);c.stroke();c.restore();
  }
  if(form==='rooftop-towers'){
   for(let i=0;i<3;i++){const x=left+i*w/3+14,bw=w/3-26;c.fillStyle=i%2?'#283046':'#333c51';c.fillRect(x,y+20,bw,115);shape(c,[[x-5,y+20],[x+bw*.5,y-7],[x+bw+5,y+20]],'#536073');for(let k=0;k<9;k++){c.fillStyle=(k+room)%3?'#dcc08d':'#667387';c.fillRect(x+10+(k%3)*(bw-24)/3,y+42+Math.floor(k/3)*25,7,11);}}
   c.strokeStyle='#9fa8ad';c.lineWidth=1;c.beginPath();c.moveTo(left,y-35);c.quadraticCurveTo(mid,y+6,right,y-35);c.stroke();
  }
  if(form==='stadium-bowl'){
   c.strokeStyle='#d2d5b1';c.lineWidth=3;for(let i=0;i<4;i++){c.beginPath();c.ellipse(mid,y+56,w*.52+i*9,44+i*10,0,0,TAU);c.stroke();}
   for(let i=0;i<32;i++){const x=left+i*w/32;c.fillStyle=['#bca181','#92b5a0','#b499ac'][i%3];c.fillRect(x,y+90+(i%2)*7,5,6);}
   for(const x of [left+30,right-30]){c.fillStyle='#b9c8c3';c.fillRect(x,y-91,4,82);c.fillRect(x-16,y-94,36,9);}
  }
  if(form==='orbital-pods'){
   c.strokeStyle='#97bbc5';c.lineWidth=4;c.strokeRect(left-15,y-82,w+30,145);c.strokeStyle='#668095';c.lineWidth=1;for(let i=0;i<3;i++)c.strokeRect(left-23-i*6,y-89-i*6,w+46+i*12,159+i*12);
   for(let i=0;i<6;i++)oval(c,left+28+i*(w-56)/5,y-69,3,3,Math.sin(t*.045+i)>.2?'#c7ddad':'#628a9b');
   if(room){c.setLineDash([5,7]);c.beginPath();c.moveTo(left+30,y-90);c.lineTo(right-40,y-130);c.stroke();c.setLineDash([]);}
  }
  if(form==='crystal-cascade'){
   for(let i=0;i<6;i++){const x=(i<3?left-12:right+12)+(i%3-1)*18,h=35+i%3*22;shape(c,[[x-12,y+45],[x-10,y+20-h],[x,y+5-h],[x+13,y+23-h],[x+10,y+50]],i%2?'#aa9bc5':'#75b7c0');}
   const fx=right+24,fh=Math.min(150,level.height-y-30);c.fillStyle='#96d5e15c';c.fillRect(fx,y-30,32,fh);c.fillStyle='#e0edf0';for(let i=0;i<7;i++)c.fillRect(fx+4+i%3*9,y-30+wrap(t*1.8+i*23,fh),2,15);
   c.strokeStyle='#c5b3cf';c.lineWidth=2;c.beginPath();c.arc(mid,y+40,w*.43,Math.PI,TAU);c.stroke();
  }
 }
 c.restore();
}
