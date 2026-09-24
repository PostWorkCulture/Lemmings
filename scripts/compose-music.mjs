import {LEVELS} from '../src/levels.js';
// Five original DOS/FM-inspired arrangements; no audio sampled from the reference video.
import { writeFileSync } from 'node:fs';
export const SCORES=[
 {file:'mossy-hollows',title:'Little Green Parade',bpm:116,root:48,tone:'reed',progress:[0,3,4,0,5,3,4,0],phrases:[[0,2,4,4,5,4,2,1],[3,3,5,7,6,5,3,2],[4,6,8,7,6,4,2,1],[2,1,0,0,2,4,2,-1],[5,7,9,8,7,5,4,2],[3,5,7,5,6,5,3,1],[4,4,6,8,7,6,4,1],[2,4,2,1,0,0,0,-1]]},
 {file:'sunstone-ruins',title:'Sunstone Stroll',bpm:128,root:50,tone:'pluck',progress:[0,4,5,3,0,3,4,0],phrases:[[4,2,0,2,4,-1,7,6],[6,4,1,4,6,8,7,-1],[5,7,9,7,5,4,2,4],[3,5,6,5,3,-1,2,1],[0,4,7,4,2,4,0,2],[3,3,5,6,7,5,3,-1],[4,6,8,6,4,1,2,1],[0,2,4,2,0,0,-1,-1]]},
 {file:'crystal-caverns',title:'Crystal Carousel',bpm:102,root:45,tone:'bell',minor:true,progress:[0,5,3,4,0,3,5,4],phrases:[[0,4,7,7,6,4,2,4],[5,7,9,9,7,6,5,-1],[3,5,7,6,5,3,2,0],[4,6,8,8,6,4,1,-1],[7,6,4,2,0,2,4,7],[6,5,3,0,3,5,7,5],[5,7,9,8,7,5,6,7],[4,2,1,1,0,0,-1,-1]]},
 {file:'clockwork-works',title:'Brass and Buttons',bpm:132,root:43,tone:'brass',progress:[0,0,3,4,5,3,4,0],phrases:[[0,-1,4,7,4,2,0,2],[4,4,2,0,2,-1,4,7],[3,5,3,7,5,3,2,1],[4,-1,6,8,7,6,4,2],[5,7,5,9,7,5,4,2],[3,3,5,7,6,5,3,2],[4,6,8,6,4,2,1,2],[4,2,0,-1,0,0,-1,-1]]},
 {file:'frostbound-peaks',title:'Snowflake Skip',bpm:110,root:53,tone:'flute',progress:[0,3,0,4,5,3,4,0],phrases:[[7,4,2,0,2,4,5,4],[5,3,1,3,5,7,6,5],[4,2,0,2,4,-1,7,-1],[8,7,6,4,2,1,2,-1],[9,7,5,7,9,8,7,5],[7,5,3,5,6,5,3,1],[6,4,2,4,6,8,7,6],[4,2,1,2,0,0,0,-1]]}
];
for(let i=5;i<LEVELS.length;i++){
 const base=SCORES[i%5],variant=Math.floor(i/5),shift=(i*3)%8;
 SCORES.push({...base,file:`level-${i+1}`,title:LEVELS[i].name,bpm:104+i*2,root:base.root+variant-2,
 progress:base.progress.map((n,j)=>base.progress[(j+variant)%8]),
 phrases:base.phrases.map((_,bar)=>base.phrases[(bar+shift)%8].map((n,j)=>n<0?-1:((variant===2?9-n:n)+((j+bar)%3===0?variant:0))%10))});
}
const SR=22050,TAU=Math.PI*2;const report=[];
for(const score of SCORES){
 const beat=60/score.bpm,bars=32,duration=bars*4*beat,length=Math.round(duration*SR),left=new Float32Array(length),right=new Float32Array(length),scale=score.minor?[0,2,3,5,7,8,10]:[0,2,4,5,7,9,11];
 const degree=(d,oct=0)=>score.root+12*oct+12*Math.floor(d/7)+scale[((d%7)+7)%7];
 function note(time,midi,duration,gain,tone,pan=0){
  const f=440*2**((midi-69)/12),start=Math.round(time*SR),release=tone==='bell'?.26:.07,n=Math.ceil((duration+release)*SR);
  const l=Math.sqrt((1-pan)/2),r=Math.sqrt((1+pan)/2);
  for(let j=0;j<n;j++){
   const t=j/SR,phase=TAU*f*t,attack=Math.min(1,t/.008),env=attack*(t<duration?Math.exp(-t*(tone==='bell'?3:1.3)):Math.exp(-duration*1.3)*(1-(t-duration)/release));
   let v;
   if(tone==='bass')v=Math.sin(phase)+.2*Math.sin(2*phase);
   else if(tone==='bell')v=Math.sin(phase+2.1*Math.exp(-t*7)*Math.sin(phase*2.01))*.75;
   else if(tone==='pluck')v=Math.sin(phase+1.4*Math.exp(-t*9)*Math.sin(phase*2));
   else if(tone==='brass')v=Math.sin(phase+1.2*Math.exp(-t*3)*Math.sin(phase));
   else if(tone==='flute')v=.85*Math.sin(phase+.16*Math.sin(t*TAU*5))+.13*Math.sin(2*phase);
   else if(tone==='organ')v=.65*Math.sin(phase)+.24*Math.sin(3*phase)+.1*Math.sin(5*phase);
   else v=Math.sin(phase+.55*Math.sin(2*phase))*.8+.1*Math.sin(3*phase);
   const ix=(start+j)%length,value=v*env*gain;left[ix]+=value*l;right[ix]+=value*r;
  }
 }
 function drum(time,type,volume){const n=Math.floor(SR*.12),start=Math.round(time*SR);let seed=12983+start;
  for(let j=0;j<n;j++){const t=j/SR;seed=(Math.imul(seed,1664525)+1013904223)>>>0;const noise=seed/2147483648-1;
   const v=type==='kick'?Math.sin(TAU*(70*t+50*.018*(1-Math.exp(-t/.018))))*Math.exp(-t*36):noise*Math.exp(-t*(type==='hat'?95:35))*.4;
   const ix=(start+j)%length;left[ix]+=v*volume;right[ix]+=v*volume;
  }
 }
 for(let bar=0;bar<bars;bar++){
  const chord=score.progress[bar%8],time=bar*4*beat,phrase=[...score.phrases[bar%8]],section=Math.floor(bar/8);
  // A/B variations maintain a memorable melody over a complete 32-bar arrangement.
  if(section===1){phrase.splice(4,4,...score.phrases[(bar+4)%8].slice(4));}
  if(section===2&&bar%2===0)phrase.reverse();
  if(section===3&&bar%8===7)phrase.splice(4,4,2,1,0,0);
  for(let step=0;step<8;step++){
   const n=phrase[step];if(n<0)continue;let count=1;while(step+count<8&&phrase[step+count]===n)count++;
   note(time+step*beat/2,degree(n,2),beat/2*count*.84,.17,score.tone,-.13);step+=count-1;
  }
  for(let b=0;b<4;b++){
   note(time+b*beat,degree(chord+(b%2?4:0),0),beat*.67,.15,'bass',0);
   for(const d of [0,2,4])note(time+(b+.5)*beat,degree(chord+d,1),beat*.22,.035,'organ',.25);
   drum(time+b*beat,b%2?'snare':'kick',.055);
   drum(time+(b+.5)*beat,'hat',.027);
  }
  if(section!==0||bar>=4)for(let step=0;step<8;step++)note(time+step*beat/2,degree(chord+[0,2,4,2][step%4],2),beat*.18,.026,'bell',.55);
 }
 // Short stereo room echoes wrap around so the loop has no dead air.
 const delay=Math.round(.137*SR),delay2=Math.round(.229*SR);let peak=0,sum=0;
 const pcm=Buffer.alloc(length*4);
 for(let i=0;i<length;i++){
  const l=Math.tanh((left[i]+right[(i-delay+length)%length]*.16+left[(i-delay2+length)%length]*.09)*1.45)*.86;
  const r=Math.tanh((right[i]+left[(i-delay+length)%length]*.16+right[(i-delay2+length)%length]*.09)*1.45)*.86;
  peak=Math.max(peak,Math.abs(l),Math.abs(r));sum+=l*l+r*r;pcm.writeInt16LE(Math.round(l*32767),i*4);pcm.writeInt16LE(Math.round(r*32767),i*4+2);
 }
 // Very short wrap blend removes an artificial file-boundary click.
 const seam=64;for(let j=0;j<seam;j++)for(let ch=0;ch<2;ch++){const end=(length-1-j)*4+ch*2,begin=j*4+ch*2,fade=j/seam;pcm.writeInt16LE(Math.round(pcm.readInt16LE(end)*fade),end);pcm.writeInt16LE(Math.round(pcm.readInt16LE(begin)*fade),begin);}
 const header=Buffer.alloc(44);header.write('RIFF');header.writeUInt32LE(36+pcm.length,4);header.write('WAVEfmt ',8);header.writeUInt32LE(16,16);header.writeUInt16LE(1,20);header.writeUInt16LE(2,22);header.writeUInt32LE(SR,24);header.writeUInt32LE(SR*4,28);header.writeUInt16LE(4,32);header.writeUInt16LE(16,34);header.write('data',36);header.writeUInt32LE(pcm.length,40);
 writeFileSync(`assets/audio/${score.file}.wav`,Buffer.concat([header,pcm]));report.push({title:score.title,file:`assets/audio/${score.file}.wav`,seconds:+duration.toFixed(2),peak:+peak.toFixed(3),rms:+Math.sqrt(sum/(length*2)).toFixed(3)});
}
writeFileSync('assets/audio/manifest.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
