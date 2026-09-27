import test from 'node:test';import assert from 'node:assert/strict';import {Game} from '../src/engine.js';import {clearSky} from '../src/ambient-art.js';
test('steep dunes allow a 75 percent ascent then slide facing downhill',()=>{
 for(const climb of [false,true]){const g=new Game(6);g.spawned=20;
 const u={id:0,x:412,y:335,state:'walk',dir:1,abilities:{climb}};g.units=[u];
 for(let n=0;n<200&&u.state!=='slide';n++)g.step();
 assert.equal(u.state,'slide');assert.ok(u.y>=185&&u.y<=190,`turn height ${u.y}`);assert.equal(u.dir,-1);assert.equal(g.soundEvents.filter(e=>e.type==='slide').length,1);
 for(let n=0;n<60&&u.state==='slide';n++){g.step();assert.equal(u.dir,-1);}
 assert.ok(u.x<411);assert.ok(u.y>325);assert.equal(u.state,'walk');
 }
});
test('birds are rejected below terrain, outside the sky and below entrances',()=>{
 const g=new Game(6);assert.equal(clearSky(g.level,700,25),true);assert.equal(clearSky(g.level,700,200),false);
 assert.equal(clearSky({...g.level,terrain:[[600,10,200,8,2]]},700,40),false);
 assert.equal(clearSky({...g.level,spawnX:700,spawnY:90},700,25),false);
});
