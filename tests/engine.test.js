import test from 'node:test';
import assert from 'node:assert/strict';
import { Game, LEVEL } from '../src/engine.js';

function solve() {
  const g=new Game();let built=false,dug=false,held=false,released=false;
  for(let i=0;i<15000&&!g.result;i++) {
    const pioneer=g.units.find(u=>u.id===0),second=g.units.find(u=>u.id===1);
    if(!built&&pioneer?.state==='walk'&&pioneer.x>=384){assert.ok(g.assign(0,'build').ok);built=true;}
    if(built&&!held&&second?.state==='walk'){assert.ok(g.assign(1,'block').ok);held=true;}
    if(built&&!dug&&pioneer?.state==='walk'&&pioneer.x>=550){assert.ok(g.assign(0,'dig').ok);dug=true;}
    if(dug&&!released&&pioneer?.y>=366){assert.ok(g.assign(1,'walk').ok);released=true;}
    g.step();
  }
  return g;
}
test('the first level can rescue all 20 with one of each skill',()=>{
  const g=solve();assert.equal(g.result,'win');assert.equal(g.saved,20);assert.equal(g.lost,0);
  assert.deepEqual(g.stock,{block:2,build:3,dig:2});assert.equal(g.units.length,0);
});
test('a recorded solution replays deterministically',()=>{
  const original=solve(),g=new Game();
  while(g.tick<original.tick&&!g.result){for(const e of original.events.filter(e=>e.tick===g.tick))assert.ok(g.assign(e.id,e.skill).ok);g.step();}
  assert.equal(g.saved,original.saved);assert.equal(g.result,original.result);assert.deepEqual(g.terrain,original.terrain);
});
test('doing nothing loses the level rather than walking across the gap',()=>{
  const g=new Game();for(let i=0;i<10000&&!g.result;i++)g.step();
  assert.equal(g.result,'lose');assert.equal(g.lost,20);assert.equal(g.saved,0);
});
test('invalid assignments do not consume inventory',()=>{
  const g=new Game();g.step();const stock={...g.stock};assert.equal(g.assign(0,'build').ok,false);assert.equal(g.assign(999,'dig').ok,false);assert.deepEqual(g.stock,stock);
  while(g.units[0].state!=='walk')g.step();assert.ok(g.assign(0,'block').ok);assert.equal(g.assign(0,'build').ok,false);assert.equal(g.stock.block,2);
  assert.ok(g.assign(0,'walk').ok);assert.equal(g.stock.block,2);
});
test('hard stone is immutable and cannot be dug',()=>{
  const g=new Game();g.rect(40,145,16,75,0);assert.equal(g.at(45,160),2);
  const u=g.spawn();u.x=705;u.y=116;u.state='walk';assert.equal(g.assign(u.id,'dig').ok,false);assert.equal(g.stock.dig,3);
});
test('restart restores both terrain and counters',()=>{
  const g=solve();g.reset();const clean=new Game();assert.deepEqual(g.terrain,clean.terrain);assert.deepEqual(g.stock,clean.stock);assert.equal(g.tick,0);assert.equal(g.spawned,0);assert.equal(g.saved,0);assert.equal(g.lost,0);assert.equal(g.result,null);
});
test('blockers turn an approaching walker and Walker releases them',()=>{
  const g=new Game();const b=g.spawn(),w=g.spawn();Object.assign(b,{arrival:null,x:300,y:220,state:'walk'});Object.assign(w,{arrival:null,x:290,y:220,state:'walk'});
  assert.ok(g.assign(b.id,'block').ok);g.step();assert.equal(w.dir,-1);assert.equal(b.x,300);assert.ok(g.assign(b.id,'walk').ok);g.step();assert.ok(b.x<300);
});
test('a dangerous fall is fatal, a short fall is safe',()=>{
  for(const [startY,expected] of [[150,1],[280,0]]){const g=new Game();g.spawned=LEVEL.total;g.units=[{id:0,x:800,y:startY,fallStart:startY,state:'fall',vy:0,dir:1}];g.rect(790,220,20,130,0);for(let i=0;i<100&&g.units[0]?.state==='fall';i++)g.step();assert.equal(g.lost,expected);}
});
