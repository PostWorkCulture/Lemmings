import {LEVELS} from './levels.js';
const THEME_TRACKS=[
 ['mossy-hollows','Little Green Parade'],['sunstone-ruins','Sunstone Stroll'],['crystal-caverns','Crystal Carousel'],['clockwork-works','Brass and Buttons'],['frostbound-peaks','Snowflake Skip']
];
export const TRACKS=LEVELS.map(l=>l.id<5?THEME_TRACKS[l.id]:[`level-${l.id+1}`,l.name]);
export class Soundtrack {
 constructor(element){this.audio=element;this.level=-1;this.wanted=false;this.volume=.55;this.muted=false;
  try{const saved=JSON.parse(localStorage.getItem('lemmings-audio')||'null');if(saved){this.volume=Math.max(0,Math.min(1,Number(saved.volume)||0));this.muted=!!saved.muted;}}catch{}
  element.loop=true;element.preload='auto';this.apply();
 }
 setLevel(index){if(index===this.level){this.audio.currentTime=0;return;}this.audio.pause();this.wanted=false;this.level=index;this.audio.src=new URL(`../assets/audio/${TRACKS[index][0]}.wav`,import.meta.url).href;this.audio.load();}
 apply(){this.audio.volume=this.volume;this.audio.muted=this.muted;try{localStorage.setItem('lemmings-audio',JSON.stringify({volume:this.volume,muted:this.muted}));}catch{}}
 play(){this.wanted=true;if(this.muted)return;const p=this.audio.play();if(p)p.then(()=>{if(!this.wanted)this.audio.pause();}).catch(()=>{this.audio.dispatchEvent(new CustomEvent('musicblocked'));});}
 pause(){this.wanted=false;this.audio.pause();}
 toggle(){this.muted=!this.muted;this.apply();if(this.muted)this.audio.pause();else if(this.wanted)this.play();}
 setVolume(value){this.volume=Math.max(0,Math.min(1,value));this.apply();}
}
