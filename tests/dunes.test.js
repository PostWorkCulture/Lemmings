import test from 'node:test';import assert from 'node:assert/strict';import {Game} from '../src/engine.js';import {clearSky} from '../src/ambient-art.js';
test('a steep dune sends walkers and climbers sliding back down',()=>{
 for(const climb of [false,true]){const g=new Game(6);g.spawned=20;
 const u={id:0,x:448,y:295,state:'walk',dir:1,abilities:{climb}};g.units=[u];g.step();assert.equal(u.state,'slide');
 for(let n=0;n<15;n++)g.step();assert.ok(u.x<431);assert.ok(u.y>325);assert.equal(u.dir,-1);
 }
});
test('birds are rejected below terrain, outside the sky and below entrances',()=>{
 const g=new Game(6);assert.equal(clearSky(g.level,700,25),true);assert.equal(clearSky(g.level,700,200),false);
 assert.equal(clearSky({...g.level,terrain:[[600,10,200,8,2]]},700,40),false);
 assert.equal(clearSky({...g.level,spawnX:700,spawnY:90},700,25),false);
});
