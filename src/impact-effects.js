export function drawSplats(c,effects,tick){
 for(const e of effects){const age=tick-e.tick;if(age<0||age>150)continue;c.save();c.translate(e.x,e.y);c.globalAlpha=Math.min(1,(150-age)/45);
  // Small arcade-style splash and flattened green hair/blue tunic.
  c.fillStyle='#9e2536';c.beginPath();c.ellipse(0,-1,13,2.5,0,0,Math.PI*2);c.fill();
  if(age<45){c.fillStyle='#435bba';c.fillRect(-8,-3,14,3);c.fillStyle='#71c845';c.fillRect(-5,-5,10,2);c.fillStyle='#e5c3a1';c.fillRect(6,-3,5,2);}
  for(let i=0;i<12;i++){const side=i%2?1:-1,life=Math.min(age,28),vx=side*(.2+(i%6)*.12),vy=-.7-(i%4)*.22,x=vx*life,y=Math.min(-1,-3+vy*life+.048*life*life);c.fillStyle=i%3?'#b63643':'#dc5360';c.fillRect(Math.round(x),Math.round(y),i%3===0?3:2,2);}
  c.restore();
 }
}
export class ImpactAudio{
 constructor(){this.context=null;this.played=new WeakSet();this.lastSound=-Infinity;}
 unlock(){try{this.context??=new (window.AudioContext||window.webkitAudioContext)();if(this.context.state==='suspended')this.context.resume().catch(()=>{});}catch{}}
 consume(effects,volume,muted){for(const e of effects){if(this.played.has(e))continue;this.played.add(e);if(!muted&&volume>0)this.splat(volume);}}
 splat(volume){const c=this.context;if(!c||c.state!=='running'||c.currentTime-this.lastSound<.045)return;const now=c.currentTime;this.lastSound=now;
  const gain=c.createGain();gain.gain.setValueAtTime(Math.min(.32,volume*.45),now);gain.gain.exponentialRampToValueAtTime(.001,now+.2);gain.connect(c.destination);
  const noise=c.createBuffer(1,Math.ceil(c.sampleRate*.18),c.sampleRate),samples=noise.getChannelData(0);for(let i=0;i<samples.length;i++)samples[i]=(Math.random()*2-1)*(1-i/samples.length);
  const burst=c.createBufferSource();burst.buffer=noise;const filter=c.createBiquadFilter();filter.type='lowpass';filter.frequency.setValueAtTime(1400,now);filter.frequency.exponentialRampToValueAtTime(220,now+.17);burst.connect(filter);filter.connect(gain);burst.start(now);burst.stop(now+.18);
  const thud=c.createOscillator();thud.type='sine';thud.frequency.setValueAtTime(145,now);thud.frequency.exponentialRampToValueAtTime(42,now+.13);thud.connect(gain);thud.start(now);thud.stop(now+.18);
  thud.onended=()=>{thud.disconnect();burst.disconnect();filter.disconnect();gain.disconnect();};
 }
}

// Water deaths remain in the simulation until the sinking sequence finishes.
export function drawDrowning(c,u,tick,character,height){
 const age=tick-u.drownStart,surface=u.y-3,p=Math.min(1,age/180),bite=112;
 c.save();c.beginPath();c.rect(0,surface-26,1000,height-surface+26);c.clip();
 // Entry splash, followed by expanding surface ripples.
 c.strokeStyle='#cceff5';c.lineWidth=1.5;
 if(age<65){for(let i=0;i<9;i++){const t=Math.min(age,35),vx=(i-4)*.19,vy=-1.4-(i%3)*.25;
  const x=u.x+vx*t,y=surface+vy*t+.06*t*t;
  if(y<surface+3){c.fillStyle='#d9f7ff';c.fillRect(x,y,2,3);}
 }}
 for(let i=0;i<3;i++){const phase=(age+i*18)%64;c.globalAlpha=(1-phase/64)*.7;c.beginPath();c.ellipse(u.x,surface+3,5+phase*.38,2+phase*.035,0,0,Math.PI*2);c.stroke();}
 if(!u.shark||age<bite){
  c.globalAlpha=Math.max(0,1-p*.95);
  character(c,u.x+Math.sin(age*.1)*2,surface+4+p*25,'fall',u.dir,tick,.7);
 }
 c.globalAlpha=1;
 if(u.shark&&age>20){
  const dir=u.x>500?-1:1,approach=Math.min(1,(age-20)/(bite-20));
  const x=u.x-dir*22-dir*(1-approach)*145+(age>bite?dir*(age-bite)*1.7:0),y=surface+14;
  c.save();c.translate(x,y);c.scale(dir,1);
  c.fillStyle='#7fa6bc';c.strokeStyle='#344f60';c.lineWidth=1.5;
  const poly=points=>{c.beginPath();points.forEach(([px,py],i)=>i?c.lineTo(px,py):c.moveTo(px,py));c.closePath();c.fill();c.stroke();};
  poly([[-19,-1],[-35,-12],[-30,0],[-35,10],[-18,4]]);
  poly([[-7,-6],[-16,-20],[9,-9]]);
  c.beginPath();c.ellipse(0,0,27,10,0,0,Math.PI*2);c.fill();c.stroke();
  c.fillStyle='#d5edf5';c.beginPath();c.ellipse(5,4,20,5,0,0,Math.PI);c.fill();
  c.fillStyle='#172c36';c.beginPath();c.arc(15,-4,2,0,Math.PI*2);c.fill();
  c.fillStyle='#fff';c.fillRect(15,-5,1,1);
  c.fillStyle='#213342';poly([[15,3],[27,1],[23,7],[16,7]]);
  c.fillStyle='#fff';for(let i=0;i<3;i++){c.beginPath();c.moveTo(16+i*3,3);c.lineTo(19+i*3,3);c.lineTo(17+i*3,6);c.fill();}
  c.restore();
  if(age>=bite&&age<bite+28){c.globalAlpha=1-(age-bite)/28;c.fillStyle='#b63643';for(let i=0;i<8;i++)c.fillRect(u.x+Math.sin(i*2.3)*(age-bite)*.6,surface+8+Math.cos(i)*4,2,2);}
 }
 c.restore();
}
