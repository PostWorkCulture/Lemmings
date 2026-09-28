import {drawSweetKind} from './sweet-range.js';

// The authored silhouette remains authoritative; these materials never change collision.
export const SWEET_CROPS={0:[32,58,296,80],1:[139,30,82,140],2:[32,54,296,88],3:[32,51,296,95],4:[25,62,310,78],5:[89,25,182,168],6:[105,24,150,149],7:[117,18,126,171],9:[61,55,238,91],10:[95,31,171,135],12:[117,18,126,172],13:[117,18,126,172],14:[117,18,126,172],15:[20,45,320,100],16:[18,37,325,121],17:[24,35,306,140]};
let atlas=null;
if(typeof document!=='undefined'){
 const image=new Image();image.src=new URL('../assets/terrain/sweet-materials.png',import.meta.url).href;
 try{await image.decode();atlas=image;}catch{/* The original painted sweets remain available offline. */}
}
const TAU=Math.PI*2;
const canvas=(w,h)=>{const c=document.createElement('canvas');c.width=Math.ceil(w);c.height=Math.ceil(h);return c;};
function texture(c,n,x,y,w,h,alpha=1){if(!atlas)return;c.save();c.globalAlpha=alpha;const s=atlas.width/3;c.drawImage(atlas,(n%3)*s+2,Math.floor(n/3)*s+2,s-4,s-4,x,y,w,h);c.restore();}
function ellipse(c,x,y,rx,ry,fill){c.fillStyle=fill;c.beginPath();c.ellipse(x,y,rx,ry,0,0,TAU);c.fill();}
function tubeLight(c,w,h){const g=c.createLinearGradient(0,0,0,h);g.addColorStop(0,'#28142c65');g.addColorStop(.12,'#fff5dc36');g.addColorStop(.27,'#fff5ea16');g.addColorStop(.53,'#ffffff00');g.addColorStop(.84,'#29133224');g.addColorStop(1,'#1d102877');c.fillStyle=g;c.fillRect(0,0,w,h);}
function title(c,text,x,y,maxWidth,size,color='#fff2dc',edge='#302943',italic=false){
 c.save();c.font=`${italic?'italic ':''}900 ${size}px ${italic?'Georgia':'Arial'}`;
 while(c.measureText(text).width>maxWidth&&size>5){size-=.5;c.font=`${italic?'italic ':''}900 ${size}px ${italic?'Georgia':'Arial'}`;}
 c.textAlign='center';c.textBaseline='middle';c.lineJoin='round';c.strokeStyle=edge;c.lineWidth=Math.max(1.4,size*.11);c.strokeText(text,x,y);c.fillStyle=color;c.fillText(text,x,y);c.restore();
}
function wrapper(c,kind,w,h){
 const tile={0:0,1:1,2:2,3:3,4:4,5:5,6:5,9:6,10:7}[kind]??8;
 texture(c,tile,0,0,w,h);tubeLight(c,w,h);
 if(kind===1||kind===10)return;
 // Tightly pleated seams and tucked corners make a wrapper read at game scale.
 const ends=(kind===5||kind===6)?Math.min(15,h*.035):Math.min(w*.115,35);
 if(kind===5||kind===6){
  for(const y of [h*.025,h*.91]){c.fillStyle='#48162430';c.fillRect(0,y,w,h*.042);for(let x=6;x<w;x+=6){c.fillStyle='#fff3b443';c.fillRect(x,y,1,h*.035);}}
  c.strokeStyle='#fff3c359';c.lineWidth=2;c.beginPath();c.moveTo(w*.5,h*.09);c.lineTo(w*.5,h*.87);c.stroke();
 }else{
  for(const [x,dir]of [[ends,1],[w-ends,-1]]){
   const g=c.createLinearGradient(x-dir*ends,0,x+dir*ends*.3,0);g.addColorStop(0,'#271b453c');g.addColorStop(.6,'#ffffff46');g.addColorStop(1,'#1d113640');c.fillStyle=g;c.fillRect(Math.min(x-dir*ends,x),0,ends,h);
   for(let i=0;i<9;i++){c.strokeStyle=i%2?'#fff4df65':'#28173650';c.lineWidth=1.2;c.beginPath();c.moveTo(x,h*(.33+i*.042));c.quadraticCurveTo(x-dir*ends*.4,h*(.13+i*.085),x-dir*ends,h*(.02+i*.12));c.stroke();}
  }
 }
 if(w<95||h<48)return;
 const size=Math.min(29,w*.105,h*.15),cx=w*.5,cy=h*.48;
 // Unstretched type is drawn after fitting the material to its terrain piece.
 if(kind===0)title(c,'Refreshers',cx,cy,w*.62,size,'#fff2a2','#145b88',true);
 if(kind===2)title(c,'PARMA VIOLETS',cx,cy,w*.65,size*.7,'#733363','#fff1ed');
 if(kind===3){title(c,'LOVE',cx,cy-size*.33,w*.57,size*.76,'#bb3458','#fff6e9');title(c,'HEARTS',cx,cy+size*.54,w*.57,size*.76,'#bb3458','#fff6e9');}
 if(kind===4){c.save();c.translate(cx,cy);c.fillStyle='#e6b32c';c.beginPath();for(let i=0;i<24;i++){const a=i*TAU/24,r=i%2?.62:1;const x=Math.cos(a)*Math.min(w*.32,105)*r,y=Math.sin(a)*Math.min(h*.32,42)*r;i?c.lineTo(x,y):c.moveTo(x,y);}c.closePath();c.fill();title(c,'WHAM',0,0,w*.5,size,'#db365d','#ffefb8',true);c.restore();}
 if(kind===5){title(c,'Double Dip',cx,cy,w*.7,size,'#fff180','#611c49',true);title(c,'ORANGE + CHERRY',cx,cy+size*.95,w*.6,size*.3,'#fff7e0','#7f3545');}
 if(kind===9)title(c,'Fruit Salad',cx,cy,w*.62,size*.9,'#fff7bd','#8d3056',true);
}
function lolly(c,kind){
 // Preserve the original head and stick dimensions, with a shaped swirl and sugar finish.
 const colors=({7:['#f1dc9d','#e582a5'],12:['#f4ca42','#e13e65'],13:['#36b9df','#e756aa'],14:['#83ce47','#ef963d']})[kind];
 c.save();c.beginPath();c.arc(180,79,60,0,TAU);c.clip();c.fillStyle=colors[0];c.fillRect(118,17,124,126);
 for(let j=0;j<5;j++){
  const a=j*TAU/5;c.fillStyle=colors[1];c.beginPath();c.moveTo(180,79);
  for(let i=0;i<=80;i++){const r=i*.8,theta=a+i/80*2.15;c.lineTo(180+Math.cos(theta)*r,79+Math.sin(theta)*r);}
  for(let i=80;i>=0;i--){const r=i*.8,theta=a+i/80*2.15+.47;c.lineTo(180+Math.cos(theta)*r,79+Math.sin(theta)*r);}c.closePath();c.fill();
 }
 c.save();c.globalCompositeOperation='soft-light';texture(c,8,117,18,126,126,.36);c.restore();
 const light=c.createRadialGradient(160,52,3,180,82,66);light.addColorStop(0,'#fffce853');light.addColorStop(.55,'#fff4d900');light.addColorStop(.82,'#44224416');light.addColorStop(1,'#43223a88');c.fillStyle=light;c.fillRect(116,17,129,129);
 c.strokeStyle='#fff4db8c';c.lineWidth=1.5;c.beginPath();c.arc(179,78,56,3.35,5.65);c.stroke();
 c.strokeStyle='#fff4db40';c.lineWidth=4;c.beginPath();c.arc(177,75,49,3.6,4.55);c.stroke();c.restore();
 const stick=c.createLinearGradient(176,0,184,0);stick.addColorStop(0,'#ae927d');stick.addColorStop(.3,'#fff5da');stick.addColorStop(.68,'#ead9bc');stick.addColorStop(1,'#99826b');c.fillStyle=stick;c.fillRect(176,141,8,48);
}
function sugarBead(c,x,y,r,color){
 c.save();c.translate(x,y);const g=c.createRadialGradient(-r*.3,-r*.35,1,0,0,r*1.15);g.addColorStop(0,'#fff7d6');g.addColorStop(.18,color);g.addColorStop(.65,color);g.addColorStop(1,'#75566c');
 ellipse(c,0,2,r,r*.78,g);c.save();c.beginPath();c.ellipse(0,0,r,r*.72,0,0,TAU);c.clip();c.globalCompositeOperation='soft-light';texture(c,8,-r,-r,r*2,r*2,.6);c.restore();
 ellipse(c,0,-1,r*.25,r*.19,'#715664');ellipse(c,-.5,0,r*.16,r*.105,'#332840');c.strokeStyle='#f9e8c780';c.lineWidth=1;c.beginPath();c.ellipse(-1,-2,r*.84,r*.59,0,3.3,5.5);c.stroke();c.restore();
}
function beads(c,kind){
 const colors=['#efce61','#dc82b0','#69bbd2','#9bc790','#e6a07b'];
 let points=kind===17?Array.from({length:24},(_,i)=>[35+i*12,143-i*3]):kind===15?Array.from({length:10},(_,i)=>[40+i*31,90+Math.sin(i/9*Math.PI)*22]):[[35,101],[62,103],[89,105],[268,105],[295,103],[322,101]];
 for(let i=0;i<points.length;i++)sugarBead(c,...points[i],kind===17?18:16,colors[i%5]);
 if(kind===16){c.save();c.beginPath();c.roundRect(106,47,144,99,23);c.clip();c.fillStyle='#e398ba';c.fillRect(106,47,144,99);c.globalCompositeOperation='soft-light';texture(c,8,106,47,144,99,.6);c.globalCompositeOperation='source-over';const g=c.createLinearGradient(0,47,0,146);g.addColorStop(0,'#fff3d95c');g.addColorStop(.5,'#fff3d900');g.addColorStop(1,'#78456370');c.fillStyle=g;c.fillRect(106,47,144,99);c.restore();
  c.strokeStyle='#9d5c83';c.lineWidth=2;c.beginPath();c.arc(178,94,29,0,TAU);c.stroke();c.strokeStyle='#f7cddd';c.beginPath();c.arc(178,92,29,0,TAU);c.stroke();for(let i=0;i<12;i++){const a=i*TAU/12;c.fillStyle='#a3638b';c.beginPath();c.arc(178+Math.sin(a)*23,94-Math.cos(a)*23,1,0,TAU);c.fill();}c.strokeStyle='#a5688b';c.lineWidth=2.5;c.beginPath();c.moveTo(178,76);c.lineTo(178,94);c.lineTo(193,102);c.stroke();
 }
}
export function paintPolishedSweet(c,p,silhouette=true){
 const {kind,x,y,w,h}=p,r=SWEET_CROPS[kind];if(!r)return;
 const old=canvas(360,200),oc=old.getContext('2d');drawSweetKind(oc,kind,false);
 const piece=canvas(w,h),pc=piece.getContext('2d');
 if(!atlas){pc.drawImage(old,...r,0,0,w,h);c.drawImage(piece,x,y);return;}
 if([7,12,13,14,15,16,17].includes(kind)){
  if([7,12,13,14].includes(kind))lolly(oc,kind);else beads(oc,kind);
  pc.drawImage(old,...r,0,0,w,h);
 }else{
  wrapper(pc,kind,w,h);
  if(silhouette){const mask=canvas(w,h);mask.getContext('2d').drawImage(old,...r,0,0,w,h);pc.globalCompositeOperation='destination-in';pc.drawImage(mask,0,0);pc.globalCompositeOperation='source-over';}
 }
 c.drawImage(piece,x,y);
}
