import test from 'node:test';import assert from 'node:assert/strict';import {Game} from '../src/engine.js';
function scene(wall=140,type=1){const g=new Game();g.level={...g.level,objects:[]};g.terrain.fill(0);g.rect(30,300,600,20,2);if(wall)g.rect(wall,260,30,40,type);g.spawned=20;g.stock.bash=2;const u={id:0,x:100,y:300,state:'walk',dir:1};g.units=[u];return {g,u};}
test('early Basher approaches and cuts a wall forty pixels ahead using one skill',()=>{
 const {g,u}=scene();g.assign(0,'bash');for(let n=0;n<240;n++)g.step();assert.equal(g.at(150,290),0);assert.equal(g.stock.bash,1);assert.ok(u.x>170);
});
test('Basher approach expires in open air and still respects steel and cliffs',()=>{
 const empty=scene(null);empty.g.assign(0,'bash');for(let n=0;n<104;n++)empty.g.step();assert.equal(empty.u.state,'walk');
 const steel=scene(140,2);steel.g.assign(0,'bash');for(let n=0;n<200;n++)steel.g.step();assert.equal(steel.g.at(150,290),2);
 const edge=scene(null);edge.g.terrain.fill(0);edge.g.rect(30,300,85,20,2);edge.g.assign(0,'bash');for(let n=0;n<48;n++)edge.g.step();assert.equal(edge.u.state,'fall');
});
test('a completed tunnel stops bashing rather than approaching another distant wall',()=>{
 const {g,u}=scene(108);g.assign(0,'bash');for(let n=0;n<100;n++)g.step();assert.equal(u.bashStarted,true);assert.equal(u.state,'walk');
});
