// Shared caution colours for lethal objects; no exclamation symbol.
export function cautionStripes(c,x,y,w,h){
 c.save();c.beginPath();c.rect(x,y,w,h);c.clip();
 c.fillStyle='#f4df00';c.fillRect(x,y,w,h);c.fillStyle='#161911';
 for(let d=-h;d<w+h;d+=12){c.beginPath();c.moveTo(x+d,y);c.lineTo(x+d+6,y);c.lineTo(x+d+6-h,y+h);c.lineTo(x+d-h,y+h);c.closePath();c.fill();}
 c.restore();c.save();c.strokeStyle='#161911';c.lineWidth=1.5;c.strokeRect(x,y,w,h);c.restore();
}
export function hazardMarkers(c,y){
 c.save();c.fillStyle='#f4df00';c.strokeStyle='#161911';c.lineWidth=2.5;c.lineJoin='round';
 for(let x=35;x<1000;x+=155){c.beginPath();c.moveTo(x,y-8);c.lineTo(x+9,y+7);c.lineTo(x-9,y+7);c.closePath();c.fill();c.stroke();}
 c.restore();
}
