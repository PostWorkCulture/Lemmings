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
