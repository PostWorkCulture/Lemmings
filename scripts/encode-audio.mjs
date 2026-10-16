// Encodes composed WAV masters to MP3 and records decoded peak/RMS in the manifest.
// Usage: node scripts/encode-audio.mjs [dir-with-wavs]  (defaults to assets/audio)
import {execFileSync} from 'node:child_process';
import {readdirSync,readFileSync,writeFileSync,unlinkSync,existsSync} from 'node:fs';
import {join,basename} from 'node:path';
const source=process.argv[2]||'assets/audio',out='assets/audio';
const manifestPath=join(out,'manifest.json'),manifest=existsSync(manifestPath)?JSON.parse(readFileSync(manifestPath)):[];
for(const wav of readdirSync(source).filter(f=>f.endsWith('.wav'))){
 const name=basename(wav,'.wav'),mp3=join(out,name+'.mp3');
 execFileSync('ffmpeg',['-y','-loglevel','error','-i',join(source,wav),'-codec:a','libmp3lame','-q:a','2','-ar','22050','-ac','2',mp3]);
 const pcm=execFileSync('ffmpeg',['-loglevel','error','-i',mp3,'-f','s16le','-ac','2','-ar','22050','-'],{maxBuffer:1<<28});
 let peak=0,sum=0;const n=pcm.length/2;for(let i=0;i<pcm.length;i+=2){const v=pcm.readInt16LE(i)/32768;peak=Math.max(peak,Math.abs(v));sum+=v*v;}
 const record=manifest.find(r=>r.file.replace(/\.(wav|mp3)$/,'')===`assets/audio/${name}`);
 const stats={file:`assets/audio/${name}.mp3`,seconds:+(n/2/22050).toFixed(2),peak:+peak.toFixed(3),rms:+Math.sqrt(sum/n).toFixed(3)};
 if(record)Object.assign(record,stats);else manifest.push({title:name,...stats});
 if(source===out)unlinkSync(join(source,wav));
 console.log(name,stats.seconds+'s',stats.peak,stats.rms);
}
writeFileSync(manifestPath,JSON.stringify(manifest,null,2)+'\n');
