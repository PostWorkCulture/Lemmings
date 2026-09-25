const TAU=Math.PI*2;
function oval(c,x,y,rx,ry,color){c.fillStyle=color;c.beginPath();c.ellipse(x,y,rx,ry,0,0,TAU);c.fill();}
function poly(c,points,color){c.fillStyle=color;c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.fill();}
function cloud(c,x,y,s){for(const [dx,dy,r]of [[-30,7,25],[0,-4,35],[35,8,26]])oval(c,x+dx*s,y+dy*s,r*s,r*.58*s,'#f8ffff');}
export function tent(c,x,ground,w,h){
 const shoulder=ground-h*.48,top=ground-h;
 c.fillStyle='#f7f0de';c.fillRect(x-w*.42,shoulder,w*.84,ground-shoulder);
 for(let i=0;i<9;i++)if(i%2===0)c.fillStyle='#e93445',c.fillRect(x-w*.42+i*w*.0933,shoulder,w*.0933,ground-shoulder);
 for(let i=0;i<12;i++){const a=x-w*.52+i*w/12,b=a+w/12;poly(c,[[x-15,top+15],[x+15,top+15],[b,shoulder],[a,shoulder]],i%2?'#fff5df':'#eb3342');}
 c.strokeStyle='#f7c844';c.lineWidth=4;c.beginPath();c.moveTo(x-w*.52,shoulder);c.quadraticCurveTo(x,shoulder+23,x+w*.48,shoulder);c.stroke();
 for(let i=0;i<10;i++){const px=x-w*.46+i*w*.1;c.strokeStyle='#fff5df';c.lineWidth=5;c.beginPath();c.arc(px,shoulder+1,w*.047,0,Math.PI);c.stroke();}
 c.fillStyle='#532246';c.beginPath();c.moveTo(x-w*.15,ground);c.lineTo(x-w*.1,shoulder+25);c.quadraticCurveTo(x,shoulder+4,x+w*.1,shoulder+25);c.lineTo(x+w*.15,ground);c.fill();
 poly(c,[[x-w*.15,ground],[x-w*.13,shoulder+14],[x-5,shoulder+14],[x-w*.06,ground-15]],'#d32442');
 poly(c,[[x+w*.15,ground],[x+w*.13,shoulder+14],[x+5,shoulder+14],[x+w*.06,ground-15]],'#fa4354');
 c.strokeStyle='#e8edf0';c.lineWidth=4;c.beginPath();c.moveTo(x,top+15);c.lineTo(x,top-27);c.stroke();oval(c,x,top-28,5,5,'#ffdb42');
 poly(c,[[x+3,top-24],[x+54,top-18],[x+46,top-1],[x+3,top-7]],'#ec2846');
}
export function parasol(c,x,y,r=28){
 c.strokeStyle='#e8d6a7';c.lineWidth=3;c.beginPath();c.moveTo(x,y);c.lineTo(x,y-r*1.5);c.stroke();
 for(let i=0;i<6;i++)poly(c,[[x,y-r*1.65],[x-r+i*r/3,y-r],[x-r+(i+1)*r/3,y-r]],i%2?'#fff0cd':'#f35c6b');
 oval(c,x,y+1,r*.65,3,'#ba8b4240');
}
export function iceCream(c,x,y,s=1){
 c.save();c.translate(x,y);c.scale(s,s);poly(c,[[-7,-17],[7,-17],[0,0]],'#dca353');
 c.strokeStyle='#a86f34';c.lineWidth=1;for(let i=0;i<3;i++){c.beginPath();c.moveTo(-5+i*2,-14+i*3);c.lineTo(4,-10+i*2);c.stroke();}
 oval(c,-3,-21,6,6,'#ff9ab9');oval(c,4,-21,6,6,'#fff1c0');oval(c,0,-27,6,6,'#88d9bc');c.restore();
}
export function chapterBackdrop(c,key,height,level=null){
 const sky=c.createLinearGradient(0,0,0,height);sky.addColorStop(0,key==='circus'?'#289cde':'#9bdde9');sky.addColorStop(1,key==='circus'?'#bceaf4':'#d4f0ef');c.fillStyle=sky;c.fillRect(0,0,1000,height);
 if(key!=='beach'){cloud(c,110,65,1.5);cloud(c,820,60,1.5);cloud(c,390,40,1);}
 if(key==='circus'){
  const ground=height-28;c.fillStyle='#b5aa8d';c.fillRect(0,ground-70,1000,100);
  const layer=document.createElement('canvas');layer.width=1000;layer.height=height;const tents=layer.getContext('2d');
  tent(tents,145,ground,300,Math.min(300,height-120));tent(tents,860,ground,310,Math.min(300,height-120));tent(tents,500,ground,480,Math.min(440,height-90));
  c.save();c.globalAlpha=.48;c.drawImage(layer,0,0);c.restore();
  poly(c,[[440,ground],[560,ground],[625,height],[375,height]],'#f2cc83');
 }else{
  if(level?.backgroundStyle==='inland-beach'){
   const beachTop=Math.max(180,height*.42);
   for(const [offset,color]of [[0,'#e8bb64'],[17,'#efca7b'],[46,'#f5d58e']]){
    c.fillStyle=color;c.beginPath();c.moveTo(0,height);for(let x=0;x<=1000;x+=8)c.lineTo(x,beachTop+offset+Math.sin(x*.007)*10);c.lineTo(1000,height);c.closePath();c.fill();
   }
   for(let i=0;i<35;i++)oval(c,i*149%1000,beachTop+66+i*37%Math.max(30,height-beachTop-85),2+i%3,1,'#cca35345');
   return;
  }
  const horizon=Math.max(180,height*.42),shore=height-135;c.fillStyle='#168fbe';c.fillRect(0,horizon,1000,height-horizon);
  for(let i=0;i<20;i++){c.strokeStyle=i%2?'#77d7e980':'#b0edf180';c.lineWidth=2;c.beginPath();const x=i*137%1000,y=horizon+14+i*19%Math.max(20,shore-horizon);c.moveTo(x,y);c.quadraticCurveTo(x+20,y+6,x+60,y);c.stroke();}
  for(const [offset,color]of [[-13,'#77d4df'],[-5,'#e4ffff'],[4,'#b3eaf0'],[15,'#f9be39'],[27,'#ffdc62']]){
   c.fillStyle=color;c.beginPath();c.moveTo(0,height);for(let x=0;x<=1000;x+=5)c.lineTo(x,shore+offset+Math.sin(x*.013)*13+Math.cos(x*.021)*6);c.lineTo(1000,height);c.closePath();c.fill();
  }
  for(let i=0;i<45;i++)oval(c,i*149%1000,shore+49+i*23%66,2+i%4,1.3,'#d6a64e70');
  parasol(c,125,shore+84,38);parasol(c,825,shore+91,42);parasol(c,940,shore+62,26);iceCream(c,225,shore+102,1.4);
 }
}
export function skyBalloon(c,x,y,t,i){
 const colors=['#ed3c76','#22bfc5','#a45ae6','#ffb42e'],color=colors[i%4];
 c.save();c.translate(x,y);c.rotate(Math.sin(t*.016+i)*.08);
 const gradient=c.createRadialGradient(-5,-7,1,0,0,16);gradient.addColorStop(0,'#fff3c8');gradient.addColorStop(.28,color);gradient.addColorStop(1,['#a71b59','#167eab','#6540aa','#e66b20'][i%4]);
 oval(c,0,0,13,17,gradient);c.strokeStyle='#fff3b990';c.lineWidth=2;c.beginPath();c.ellipse(0,0,7,17,0,0,TAU);c.stroke();
 oval(c,-5,-7,3,5,'#ffffffa0');poly(c,[[-3,17],[3,17],[0,21]],color);
 c.strokeStyle='#e5ead2';c.lineWidth=1;c.beginPath();c.moveTo(0,21);c.bezierCurveTo(-5,29,7,33,Math.sin(t*.025+i)*5,42);c.stroke();c.restore();
}
export function mountainWeather(c,t,height){
 // Riders follow the same distant mountain slopes as the background silhouettes.
 for(let i=0;i<3;i++){const p=((t*.0015+i*.33)%1),peak=125+i*330,top=80+((1+i*2)%3)*40,x=peak+p*180,y=top+p*(430-top);
  c.save();c.translate(x,y);c.rotate(Math.atan2(430-top,180));c.strokeStyle='#345c73';c.lineWidth=2.5;c.beginPath();c.moveTo(-7,5);c.quadraticCurveTo(0,8,8,5);c.stroke();c.strokeStyle=['#dc5378','#386fe2','#e59339'][i];c.lineWidth=4;c.beginPath();c.moveTo(0,2);c.lineTo(-2,-7);c.stroke();oval(c,-2,-11,3,3,'#e5eef0');c.restore();
  for(let j=0;j<3;j++)oval(c,x-7-j*3,y+3-j,1.3,1,'#e9faffaa');
 }
 for(let layer=0;layer<3;layer++)for(let i=0;i<45;i++){
  const x=(i*137+t*(.13+layer*.13)+Math.sin(t*.009+i)*9)%1020-10,y=(i*79+t*(.3+layer*.27))%(height+20)-10;
  c.globalAlpha=.32+layer*.22;oval(c,x,y,layer===2?2:1,layer===2?2.7:1.3,'#f3fcff');
 }c.globalAlpha=1;
}

export function toyGround(c,height){
 c.fillStyle='#b76870';c.fillRect(0,height-28,1000,28);
}

export function driftingClouds(c,tick){
 for(const [x,y,size,speed] of [[110,65,1.5,.09],[820,60,1.5,.065],[390,40,1,.075]]){
  const position=((x+tick*speed+110)%1220)-110;
  cloud(c,position,y,size);
 }
}
