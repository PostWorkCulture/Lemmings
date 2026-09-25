// Authored background waterways: each spring is attached to the upper cliff,
// and its uninterrupted fall terminates in the level's actual water surface.
const TAU=Math.PI*2;
const SOURCES={waterfall:[{x:449,width:46,sourceY:76}],enchanted:[{x:757,width:68,sourceY:93}]};
export function waterfallRoutes(level){return (SOURCES[level.waterfallTheme||level.theme]||[]).map(source=>({...source,waterY:(level.height||470)-28}));}
function polygon(c,points,color){c.fillStyle=color;c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.fill();}
function oval(c,x,y,rx,ry,color){c.fillStyle=color;c.beginPath();c.ellipse(x,y,rx,ry,0,0,TAU);c.fill();}
function curtain(c,x,top,bottom,w,t){
 const h=bottom-top;
 c.beginPath();for(let y=top;y<=bottom;y+=6){const p=(y-top)/h,edge=w*(.46+p*.12)+Math.sin(y*.12-t*.07)*1.3;(y===top?c.moveTo(x-edge,y):c.lineTo(x-edge,y));}c.lineTo(x+w*.62,bottom);for(let y=bottom;y>=top;y-=6){const p=(y-top)/h,edge=w*(.46+p*.12)+Math.sin(y*.15-t*.08+2)*1.5;c.lineTo(x+edge,y);}c.closePath();
 c.save();c.clip();
 const water=c.createLinearGradient(x-w*.65,0,x+w*.65,0);water.addColorStop(0,'#254f6599');water.addColorStop(.16,'#548da7df');water.addColorStop(.4,'#addde3e8');water.addColorStop(.56,'#d1ebe7eb');water.addColorStop(.78,'#78bbd0d9');water.addColorStop(1,'#2e687e90');c.fillStyle=water;c.fillRect(x-w,top,w*2,h+2);
 // Long overlapping ribbons accelerate down the face, rather than isolated dashes.
 for(let i=0;i<13;i++){
  const xx=x-w*.46+i*w*.077,phase=(t*(1.5+i%3*.35)+i*47)%(h+100);
  c.strokeStyle=i%3?'#effaf059':'#f3fff2a3';c.lineWidth=i%3?1:2.5;
  for(const offset of [-h-100,0]){const y=top+phase+offset;c.beginPath();c.moveTo(xx,y);c.bezierCurveTo(xx+Math.sin(t*.04+i)*2,y+22,xx-2,y+48,xx+Math.sin(i)*2,y+85);c.stroke();}
 }
 for(let y=top+14;y<bottom;y+=24){const wave=Math.sin(y*.035-t*.075);c.strokeStyle='#c9eeeb24';c.lineWidth=2;c.beginPath();c.moveTo(x-w*.4,y);c.quadraticCurveTo(x,y+wave*5,x+w*.43,y+2);c.stroke();}
 const depth=c.createLinearGradient(0,bottom-75,0,bottom);depth.addColorStop(0,'#e3f6eb00');depth.addColorStop(1,'#dbf4e6b0');c.fillStyle=depth;c.fillRect(x-w,bottom-75,w*2,75);c.restore();
}
export function drawWaterfalls(c,t,level){
 for(const {x,width:w,sourceY:top,waterY:bottom} of waterfallRoutes(level)){
  c.save();
  // A continuous cliff reaches the top of the world; the dark spring feeds a
  // visible horizontal headwater channel before spilling over a worn rock lip.
  polygon(c,[[x-162,0],[x+68,0],[x+76,top+15],[x+43,top+49],[x+w*.48,top+20],[x-w*.4,top+12],[x-72,top+29],[x-139,top+15]],'#344e5c');
  polygon(c,[[x-149,0],[x-112,top-25],[x-137,top+12],[x-161,top-10]],'#496871');
  polygon(c,[[x+33,0],[x+68,0],[x+76,top+15],[x+43,top+49],[x+47,top-16]],'#4b7078');
  c.strokeStyle='#91b1a02e';c.lineWidth=2;for(let i=0;i<4;i++){c.beginPath();c.moveTo(x-145+i*49,4);c.lineTo(x-124+i*48,top-30);c.stroke();}
  oval(c,x-88,top-15,31,23,'#203843');oval(c,x-88,top-7,29,10,'#183745');
  c.strokeStyle='#6babad';c.lineWidth=14;c.beginPath();c.moveTo(x-101,top-5);c.bezierCurveTo(x-68,top-1,x-43,top-10,x,top+2);c.stroke();
  c.strokeStyle='#cfebde';c.lineWidth=2;for(let i=0;i<5;i++){const p=(t*.7+i*23)%94;c.beginPath();c.moveTo(x-99+p,top-5+Math.sin(p*.05)*2);c.lineTo(x-91+p,top-4+Math.sin(p*.05)*2);c.stroke();}
  polygon(c,[[x-129,top-5],[x-116,top+12],[x-57,top+20],[x-27,top+11],[x-21,top+3],[x-72,top+8]],'#597c76');
  for(let i=0;i<9;i++){const bx=x-132+i*18,by=top+10+Math.sin(i*.7)*7;oval(c,bx,by,8,3,i%2?'#789878':'#516f65');}
  curtain(c,x,top,bottom,w,t);
  oval(c,x,top+2,w*.49,2,'#c8e9dd');
  for(let i=0;i<8;i++)oval(c,x-w*.44+i*w*.125,top+2+Math.sin(t*.09+i)*1.5,3,2,'#f1f8e5');
  // Impact mist, droplets and foam all sit on the real receiving waterline.
  for(let i=0;i<7;i++){
   const px=x+(i-3)*w*.17+Math.sin(t*.021+i)*3,py=bottom-5-Math.sin(t*.028+i)*3;
   oval(c,px,py,9+i%3*3,5+i%2*4,'#cdeee62a');
  }
  for(let i=0;i<18;i++){
   const p=((t*(.011+i%3*.001)+i*.19)%1),side=i%2?1:-1,dx=side*(w*.12+p*w*.57),dy=-Math.sin(p*Math.PI)*(12+i%4*4);
   oval(c,x+dx,bottom+dy,1+i%2*.4,1.8,'#e5f8e3b0');
  }
  oval(c,x,bottom+2,w*.66,5,'#b4dbd39c');
  for(let i=0;i<14;i++){const xx=x-w*.6+i*w*.091;oval(c,xx,bottom+1+Math.sin(t*.055+i)*2,3.5,1.8,'#edf6dfb0');}
  for(let i=0;i<3;i++){
   const p=(t*.009+i/3)%1;c.globalAlpha=(1-p)*.7;c.strokeStyle='#d5f2e4';c.lineWidth=1.2;c.beginPath();c.ellipse(x,bottom+5+p*13,w*(.42+p*.27),2+p*3,0,0,TAU);c.stroke();
  }
  c.restore();
 }
}
