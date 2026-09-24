import {createHash} from 'node:crypto';
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { Game } from '../src/engine.js';
import { LEVELS } from '../src/levels.js';
import { TRACKS } from '../src/music.js';
const advanced=JSON.parse(readFileSync(new URL('./difficulty-routes.json',import.meta.url)));
const routes=[[[384,220,'build'],[550,220,'dig']],[[284,235,'build'],[589,235,'build']],[[280,140,'dig'],[540,250,'dig']],[[324,310,'build'],[505,280,'dig'],[684,390,'build']],[[636,160,'build'],[450,160,'dig'],[391,280,'build']]];
export function solveLevel(index){const g=new Game(index);let job=0,held=false,released=false,lastAction=0;
 for(let t=0;t<60000&&!g.result;t++){
  const p=g.units.find(u=>u.id===0),b=g.units.find(u=>u.id===1),r=(routes[index]||advanced[index])[job];
  if(r&&p?.state==='walk'&&Math.abs(p.y-r[1])<2&&p.dir===(r[3]||g.level.dir)&&((r[3]||g.level.dir)===1?p.x>=r[0]:p.x<=r[0])){assert.ok(g.assign(0,r[2]).ok);job++;lastAction=g.tick;}
  if((job>0||index>=5)&&!held&&b?.state==='walk'){assert.ok(g.assign(1,'block').ok);held=true;}
  if(job===(routes[index]||advanced[index]).length&&!released&&g.tick-lastAction>250){assert.ok(g.assign(1,'walk').ok);released=true;}
  g.step();
 }
 return g;
}
for(const level of LEVELS){
 test(`Level ${level.id+1}: ${level.name} has a 20/20 solution within its skill budget`,()=>{const g=solveLevel(level.id);assert.equal(g.result,'win');assert.equal(g.saved,level.total);assert.equal(g.lost,0);assert.ok(Object.values(g.stock).every(n=>n>=0));});
 test(`Level ${level.id+1}: recorded solution replays exactly`,()=>{const solved=solveLevel(level.id),g=new Game(level.id);while(g.tick<solved.tick){for(const e of solved.events.filter(e=>e.tick===g.tick))assert.ok(g.assign(e.id,e.skill).ok);g.step();}assert.equal(g.result,'win');assert.equal(g.saved,solved.saved);assert.deepEqual(g.terrain,solved.terrain);});
}
test('switching levels resets terrain, stock, direction and rescue target',()=>{const g=solveLevel(0);for(let i=1;i<5;i++){g.reset(i);assert.equal(g.level.target,18);assert.equal(g.tick,0);assert.equal(g.saved,0);assert.deepEqual(g.stock,LEVELS[i].stock);assert.deepEqual(g.terrain,new Game(i).terrain);g.step();assert.equal(g.units[0].dir,LEVELS[i].dir);}});
test('skills unavailable on a map cannot be spent',()=>{const g=new Game(2);while(!g.units.some(u=>u.state==='walk'))g.step();assert.equal(g.assign(0,'build').ok,false);assert.equal(g.stock.build,0);});
test('all twenty distinct soundtrack files contain audible, unclipped stereo PCM',()=>{const hashes=new Set();for(const [file]of new Map(TRACKS)){const b=readFileSync(new URL(`../assets/audio/${file}.wav`,import.meta.url));assert.equal(b.toString('ascii',0,4),'RIFF');assert.equal(b.readUInt16LE(22),2);assert.equal(b.readUInt32LE(24),22050);assert.ok(b.length>22050*4*45);let peak=0,energy=0;for(let i=44;i<b.length;i+=2){const v=b.readInt16LE(i)/32768;peak=Math.max(peak,Math.abs(v));energy+=v*v;}assert.ok(peak>.1&&peak<.98);assert.ok(Math.sqrt(energy/((b.length-44)/2))>.03);hashes.add(createHash('sha256').update(b).digest('hex'));}assert.equal(hashes.size,20);});
