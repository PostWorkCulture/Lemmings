import {objectPosition,isDangerous} from './objects.js';
export function drawObjects(c,g){
 for(const o of g.level.objects||[]){const p=objectPosition(o,g.tick);c.save();
  if(o.type==='rubble'){
   // Cracks are drawn only on surviving rock so a bashed tunnel stays visibly open.
   c.strokeStyle='#e7b180';c.lineWidth=1.5;
   for(let y=o.y+6;y<o.y+o.h-5;y+=13)for(let x=o.x+5;x<o.x+o.w-4;x+=15){if(g.at(x,y)!==1||g.at(x+5,y+6)!==1)continue;c.beginPath();c.moveTo(x,y);c.lineTo(x+5,y+3);c.lineTo(x+2,y+7);c.stroke();}
  }else if(o.type==='ladder'||o.type==='pole'){
   const top=o.top??o.y,bottom=o.bottom??o.y;
   c.strokeStyle=o.type==='pole'?'#c9aa78':'#b89762';c.lineWidth=3;c.beginPath();c.moveTo(o.x-5,top-6);c.lineTo(o.x-5,bottom);if(o.type==='ladder'){c.moveTo(o.x+5,top-6);c.lineTo(o.x+5,bottom);}c.stroke();
   if(o.type==='rubble'){
   // Cracks are drawn only on surviving rock so a bashed tunnel stays visibly open.
   c.strokeStyle='#e7b180';c.lineWidth=1.5;
   for(let y=o.y+6;y<o.y+o.h-5;y+=13)for(let x=o.x+5;x<o.x+o.w-4;x+=15){if(g.at(x,y)!==1||g.at(x+5,y+6)!==1)continue;c.beginPath();c.moveTo(x,y);c.lineTo(x+5,y+3);c.lineTo(x+2,y+7);c.stroke();}
  }else if(o.type==='ladder'){c.lineWidth=2;for(let y=top;y<=bottom;y+=8){c.beginPath();c.moveTo(o.x-5,y);c.lineTo(o.x+5,y);c.stroke();}}
  }else if(o.type==='trampoline'){
   c.fillStyle='#ba8399';c.fillRect(o.x,o.y-4,o.w,4);c.strokeStyle='#b5c8c7';c.lineWidth=2;for(let x=o.x+3;x<o.x+o.w;x+=8){c.beginPath();c.moveTo(x,o.y);c.lineTo(x+3,o.y+4);c.lineTo(x,o.y+8);c.stroke();}c.fillStyle='#697c83';c.fillRect(o.x-2,o.y+8,o.w+4,3);
  }else if(o.type==='lift'){
   c.strokeStyle='#a8bbb348';c.setLineDash([3,4]);c.beginPath();c.moveTo(o.x+o.w/2,o.y);c.lineTo(o.toX+o.w/2,o.toY);c.stroke();c.setLineDash([]);c.fillStyle='#657f87';c.fillRect(p.x,p.y,o.w,8);c.fillStyle='#d2c387';c.fillRect(p.x,p.y,o.w,2);c.fillStyle='#364d5d';c.fillRect(p.x+8,p.y+8,o.w-16,5);
  }else if(o.type==='switch'){
   c.fillStyle='#636f71';c.fillRect(o.x-7,o.y-8,14,8);c.strokeStyle=g.disabledObjects.has(o.target)?'#a9d987':'#e5bb71';c.lineWidth=3;c.beginPath();c.moveTo(o.x,o.y-6);c.lineTo(o.x+(g.disabledObjects.has(o.target)?6:-6),o.y-20);c.stroke();
  }else if(o.type==='crusher'){
   const active=isDangerous(o,g.tick,g.disabledObjects);c.fillStyle='#596372';c.fillRect(o.x+o.w/2-3,o.y,6,o.h);c.fillStyle=active?'#bb866e':'#87979b';c.fillRect(o.x,active?o.y+o.h-18:o.y,o.w,18);c.fillStyle='#e2bf78';for(let x=o.x+2;x<o.x+o.w-3;x+=8)c.fillRect(x,(active?o.y+o.h-18:o.y)+12,4,6);
  }else if(o.type==='laser'){
   c.fillStyle='#7b8ca1';c.fillRect(o.x-5,o.y-5,10,8);c.fillRect(o.x-5,o.y+o.h,10,8);c.fillStyle=isDangerous(o,g.tick,g.disabledObjects)?'#ed858f':'#74a39b44';c.fillRect(o.x,o.y,Math.max(2,o.w),o.h);
  }
  c.restore();
 }
}
export function skillEquipment(c,u,tick){
 c.save();c.translate(u.x,u.y);const state=u.state;
 if(u.abilities?.float&&state==='fall'){
  c.strokeStyle='#d0d5c5';c.lineWidth=1;c.beginPath();c.moveTo(-15,-45);c.lineTo(-4,-12);c.moveTo(15,-45);c.lineTo(4,-12);c.stroke();c.fillStyle='#bd8f9c';c.beginPath();c.arc(0,-43,17,Math.PI,0);c.closePath();c.fill();c.strokeStyle='#e1c4be';c.beginPath();c.arc(0,-43,9,Math.PI,0);c.stroke();
 }
 if(['bash','mine'].includes(state)){c.rotate(Math.sin(tick*.15)*.4);c.strokeStyle='#c6ac75';c.lineWidth=2;c.beginPath();c.moveTo(0,-12);c.lineTo(u.dir*14,-22);c.stroke();c.strokeStyle='#b7c8c3';c.lineWidth=3;c.beginPath();c.moveTo(u.dir*8,-25);c.lineTo(u.dir*17,-19);c.stroke();}
 if(['platform','stack'].includes(state)){c.fillStyle='#cbb288';c.fillRect(u.dir*7-5,-16,10,4);}
 if(state==='attract'){c.fillStyle='#c6a163';c.beginPath();c.ellipse(6,-10,5,7,.5,0,Math.PI*2);c.fill();c.strokeStyle='#e0c896';c.beginPath();c.moveTo(7,-12);c.lineTo(14,-23);c.stroke();for(let i=0;i<3;i++){c.fillStyle='#cfdfbb';c.fillRect(12+i*8,-32-(tick/3+i*5)%16,3,3);}}
 if(state==='explode'){c.fillStyle='#e5a27d';c.font='bold 10px sans-serif';c.textAlign='center';c.fillText(Math.ceil((180-u.jobTick)/60),0,-30);}
 if(u.abilities?.climb){c.strokeStyle='#b7c89a';c.lineWidth=1;c.strokeRect(-6,-13,12,6);}
 if(state==='swim'){c.strokeStyle='#b3dce1';c.beginPath();c.ellipse(0,-2,13,3,0,0,Math.PI*2);c.stroke();}
 c.restore();
}
