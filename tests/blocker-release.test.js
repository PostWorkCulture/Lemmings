import test from 'node:test';
import assert from 'node:assert/strict';
import {Game} from '../src/engine.js';
test('Blocker toggles an existing blocker back to walking without spending stock',()=>{const g=new Game();const u=g.spawn();Object.assign(u,{x:250,y:220,state:'walk'});assert.ok(g.assign(u.id,'block').ok);const remaining=g.stock.block;assert.ok(g.assign(u.id,'block').ok);assert.equal(u.state,'walk');assert.equal(g.stock.block,remaining);assert.equal(g.events.at(-1).skill,'walk');});
test('the final blocker can be released with zero stock and finish the level',()=>{const g=new Game(4);g.spawned=20;g.saved=18;g.lost=1;g.stock.block=0;g.units=[{id:19,x:150,y:370,dir:-1,state:'block',jobTick:0,steps:0}];while(g.at(150,g.units[0].y-1))g.units[0].y--;g.step();assert.equal(g.result,null);assert.ok(g.assign(19,'block').ok);assert.equal(g.stock.block,0);for(let i=0;i<500&&!g.result;i++)g.step();assert.equal(g.result,'win');assert.equal(g.saved,19);assert.equal(g.lost,1);});
test('an exhausted Blocker tool cannot assign a new blocker',()=>{const g=new Game();const u=g.spawn();Object.assign(u,{x:250,y:220,state:'walk'});g.stock.block=0;assert.equal(g.assign(u.id,'block').ok,false);assert.equal(u.state,'walk');});

for(const dir of [-1,1])for(const skill of ['walk','block']){
 test(`released blocker follows redirected crowd ${dir} using ${skill}`,()=>{
  const g=new Game();g.spawned=20;
  const b={id:0,x:250,y:220,dir,state:'walk'},w={id:1,x:250-dir*10,y:220,dir,state:'walk'};
  g.units=[b,w];g.assign(0,'block');g.step();
  assert.equal(w.dir,-dir);g.stock.block=0;
  assert.ok(g.assign(0,skill).ok);assert.equal(b.dir,w.dir);
  const x=b.x;g.step();assert.equal(Math.sign(b.x-x),-dir);
 });
}
test('blocking again clears direction remembered from a previous job',()=>{
 const g=new Game();const b=g.spawn();Object.assign(b,{x:250,y:220,state:'walk',releaseDir:-1});
 g.assign(b.id,'block');g.assign(b.id,'walk');assert.equal(b.dir,1);
});
