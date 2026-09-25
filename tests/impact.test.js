import test from 'node:test';import assert from 'node:assert/strict';import {Game} from '../src/engine.js';
function land(startY,float=false){const g=new Game();g.spawned=20;g.units=[{id:0,x:800,y:startY,fallStart:startY,state:'fall',vy:0,dir:1,abilities:{float}}];g.rect(790,220,20,130,0);g.rect(790,350,20,10,1);for(let i=0;i<500&&g.units[0]?.state==='fall';i++)g.step();return g;}
test('fatal ground impact records one splat exactly on the landing floor',()=>{const g=land(150);assert.equal(g.lost,1);assert.equal(g.effects.length,1);assert.equal(g.effects[0].type,'splat');assert.equal(g.effects[0].y,350);g.step();assert.equal(g.effects.length,1);g.reset();assert.equal(g.effects.length,0);});
test('safe drops and parachute landings have no blood or impact event',()=>{for(const g of [land(280),land(150,true)]){assert.equal(g.lost,0);assert.equal(g.effects.length,0);}});

for(const hazard of ['water','lava','void','sand','syrup']){
 test(hazard+' death triggers the kill effect',()=>{
  const g=new Game();g.level={...g.level,hazard,objects:[]};g.spawned=20;
  g.units=[{id:0,x:500,y:g.hazardY+1,state:'fall',vy:0,dir:1,fallStart:g.hazardY}];g.step();if(hazard==='water')for(let n=0;n<180;n++)g.step();
  assert.equal(g.lost,1);assert.equal(g.effects.length,1);assert.equal(g.effects[0].type,'splat');
 });
}
for(const type of ['crusher','laser']){
 test(type+' death triggers exactly one kill effect',()=>{
  const g=new Game();g.level={...g.level,objects:[{type,id:'trap',x:90,y:180,w:30,h:50,period:240,active:60}]};g.spawned=20;
  const u={id:0,x:100,y:220,state:'walk',dir:1};g.units=[u];g.step();
  assert.equal(g.lost,1);assert.equal(g.effects.length,1);assert.equal(g.effects[0].x,100);
  g.remove(u);assert.equal(g.lost,1);assert.equal(g.effects.length,1);
 });
}
test('explosion and off-map deaths trigger visible kill effects',()=>{
 for(const explosion of [true,false]){
  const g=new Game();g.level={...g.level,objects:[]};g.spawned=20;
  g.units=[{id:0,x:explosion?100:3,y:220,state:explosion?'explode':'walk',jobTick:179,dir:1}];g.step();
  assert.equal(g.lost,1);assert.equal(g.effects.length,1);assert.ok(g.effects[0].x>=13);
 }
});
test('successful rescues never trigger the kill effect',()=>{
 const g=new Game(),u=g.spawn();g.remove(u,true);g.remove(u,true);
 assert.equal(g.saved,1);assert.equal(g.lost,0);assert.equal(g.effects.length,0);
});

test('drowning delays the loss and level result, and cannot receive skills',()=>{
 const g=new Game();g.spawned=20;g.saved=19;g.level={...g.level,hazard:'water',objects:[]};
 const u={id:0,x:500,y:g.hazardY+2,state:'fall',dir:1,vy:0};g.units=[u];g.step();
 assert.equal(u.state,'drown');assert.equal(u.shark,true);assert.equal(g.lost,0);assert.equal(g.result,null);
 assert.equal(g.assign(0,'float').ok,false);
 for(let i=0;i<179;i++)g.step();assert.equal(g.lost,0);
 g.step();assert.equal(g.lost,1);assert.equal(g.result,'win');
});
test('sharks appear for some water deaths and never target swimmers',()=>{
 for(const id of [1,3]){
  const g=new Game();g.spawned=20;g.level={...g.level,hazard:'water',objects:[]};
  const u={id,x:500,y:g.hazardY+2,state:'fall',dir:1,vy:0};g.units=[u];g.step();
  assert.equal(u.shark,id===3);
 }
 const g=new Game();g.spawned=20;g.level={...g.level,hazard:'water',objects:[]};g.terrain.fill(0);
 const u={id:0,x:500,y:g.hazardY+2,state:'fall',dir:1,vy:0,abilities:{swim:true}};g.units=[u];g.step();
 assert.equal(u.state,'swim');assert.equal(u.shark,undefined);assert.equal(g.lost,0);
});
