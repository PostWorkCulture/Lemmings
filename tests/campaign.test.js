import {solveLevel} from './campaign-solutions.js';

import {createHash} from 'node:crypto';
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { Game } from '../src/engine.js';
import { LEVELS } from '../src/levels.js';
import { TRACKS } from '../src/music.js';
import {solvePuzzle} from './puzzle-solutions.js';
for(const level of LEVELS){
 test(`Level ${level.id+1}: ${level.name} has a complete rescue solution within its skill budget`,()=>{const g=solveLevel(level.id);assert.equal(g.result,'win');assert.equal(g.saved,level.total);assert.ok(g.tick<level.targetTime*60,'perfect route must beat the third-star target');assert.equal(g.lost,0);assert.ok(Object.values(g.stock).every(n=>n>=0));});
 test(`Level ${level.id+1}: recorded solution replays exactly`,()=>{const solved=solveLevel(level.id),g=new Game(level.id);while(g.tick<solved.tick&&!g.result){for(const e of solved.events.filter(e=>e.tick===g.tick))assert.ok(g.assign(e.id,e.skill).ok);g.step();}assert.equal(g.result,'win');assert.equal(g.saved,solved.saved);assert.deepEqual(g.terrain,solved.terrain);});
}
test('switching levels resets terrain, stock, direction and rescue target',()=>{const g=solveLevel(0);for(let i=1;i<5;i++){g.reset(i);assert.equal(g.level.target,9);assert.equal(g.tick,0);assert.equal(g.saved,0);assert.deepEqual(g.stock,LEVELS[i].stock);assert.deepEqual(g.terrain,new Game(i).terrain);g.step();assert.equal(g.units[0].dir,LEVELS[i].dir);}});
test('skills unavailable on a map cannot be spent',()=>{const g=new Game(2);while(!g.units.some(u=>u.state==='walk'))g.step();assert.equal(g.assign(0,'build').ok,false);assert.equal(g.stock.build,0);});
test('all campaign soundtrack files contain audible, unclipped stereo PCM',()=>{const hashes=new Set();for(const [file]of new Map(TRACKS)){const b=readFileSync(new URL(`../assets/audio/${file}.wav`,import.meta.url));assert.equal(b.toString('ascii',0,4),'RIFF');assert.equal(b.readUInt16LE(22),2);assert.equal(b.readUInt32LE(24),22050);assert.ok(b.length>22050*4*45);let peak=0,energy=0;for(let i=44;i<b.length;i+=2){const v=b.readInt16LE(i)/32768;peak=Math.max(peak,Math.abs(v));energy+=v*v;}assert.ok(peak>.1&&peak<.98);assert.ok(Math.sqrt(energy/((b.length-44)/2))>.03);hashes.add(createHash('sha256').update(b).digest('hex'));}assert.equal(hashes.size,LEVELS.length);});

test('winning campaign routes use every available command, including the optional demolition route',()=>{
 const used=new Set();for(const level of LEVELS)for(const event of solveLevel(level.id).events)used.add(event.skill);
 const alternative=solvePuzzle(12,'demolition').g;assert.equal(alternative.result,'win');assert.equal(alternative.saved,alternative.level.total-1);assert.equal(alternative.lost,1);
 for(const event of alternative.events)used.add(event.skill);
 const offered=new Set(['walk',...LEVELS.flatMap(l=>Object.entries(l.stock).filter(([,n])=>n>0).map(([key])=>key))]);assert.deepEqual([...used].sort(),[...offered].sort());
 const retiredWater=solvePuzzle(8).g;assert.equal(retiredWater.saved,retiredWater.level.total);assert.ok(retiredWater.events.some(e=>e.skill==='swim'));
});
