import test from 'node:test';
import assert from 'node:assert/strict';
import {Game} from '../src/engine.js';
import {LEVELS} from '../src/levels.js';
import {objectInteraction} from '../src/objects.js';
import {solvePuzzle} from './puzzle-solutions.js';

test('ten bespoke puzzles have distinct inventories and puzzle identities',()=>{
 const maps=LEVELS.filter(l=>l.puzzleId);
 assert.equal(maps.length,10);assert.equal(new Set(maps.map(l=>l.puzzleId)).size,10);
 assert.equal(new Set(maps.map(l=>JSON.stringify(l.stock))).size,10);
});
test('switches change actual gate and bridge collision, and restart restores both',()=>{
 for(const [id,type]of [[5,'gate'],[13,'bridge']]){
  const g=new Game(id),o=g.level.objects.find(o=>o.type===type),s=g.level.objects.find(s=>s.target===o.id);
  const initial=type==='gate'?2:0;assert.equal(g.at(o.x+2,o.y+2),initial);
  objectInteraction(g,{state:'walk',x:s.x,y:s.y});assert.equal(g.at(o.x+2,o.y+2),2-initial);
  g.reset(id);assert.equal(g.at(o.x+2,o.y+2),initial);
 }
});
test('rescue pole stays locked until the lower switch is reached',()=>{
 const g=new Game(9),pole=g.level.objects.find(o=>o.type==='pole'),u={state:'walk',x:pole.x,y:pole.y};
 objectInteraction(g,u);assert.equal(u.state,'walk');
 const s=g.level.objects.find(o=>o.type==='switch');objectInteraction(g,{state:'walk',x:s.x,y:s.y});
 objectInteraction(g,u);assert.equal(u.state,'pole');
});
test('multiple entrances distribute exactly twenty lemmings in a repeatable sequence',()=>{
 for(const id of [16,18]){const g=new Game(id);for(let n=0;n<20;n++){const e=g.level.entrances[n%g.level.entrances.length],u=g.spawn();assert.equal(u.x,e.x);assert.equal(u.y,e.y);assert.equal(u.dir,e.dir);}}
});
test('one-way masonry resists excavation from the wrong side',()=>{
 for(const dir of [-1,1]){const g=new Game(6);g.level={...g.level,slipperySlopes:[],oneWay:[{x:360,y:220,w:80,h:120,dir:-1}]};g.terrain.fill(0);g.rect(40,340,920,24,2);g.rect(360,220,80,120,1);g.stock.bash=1;g.spawned=20;
  const u={id:0,x:dir===1?351:449,y:340,state:'walk',dir,vy:0,jobTick:0};g.units=[u];g.assign(0,'bash');
  for(let n=0;n<300;n++)g.step();
  assert.equal(g.at(400,325),dir===1?1:0);
 }
});
for(const [id,skill]of [[5,'stack'],[6,'bash'],[9,'float'],[13,'swim'],[15,'jump'],[16,'climb'],[18,'bash'],[19,'platform']]){
 test(`Level ${id+1} specialist obstacle cannot be solved by omitting ${skill}`,()=>{
  const {g}=solvePuzzle(id,'perfect',skill);assert.notEqual(g.result,'win');
 });
}
