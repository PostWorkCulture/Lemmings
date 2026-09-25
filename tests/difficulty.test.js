import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';import {Game} from '../src/engine.js';import {LEVELS} from '../src/levels.js';
const routes=JSON.parse(readFileSync(new URL('./difficulty-routes.json',import.meta.url)));
test('four clearly labelled difficulty bands contain five maps each',()=>{for(const [i,tier]of ['Easy','Medium','Hard','Extreme'].entries())assert.equal(LEVELS.filter(l=>l.difficulty===tier).length,5);assert.ok(LEVELS.slice(0,5).every(l=>l.height===470));});
test('remaining expedition maps require combinations of skills and extend below the viewport',()=>{for(const l of LEVELS.slice(5).filter(l=>!l.puzzleId)){const used=new Set(routes[l.id].map(r=>r[2]));assert.ok(used.size>=5);assert.ok(used.has('bash'));assert.ok(l.height>470);assert.ok(l.exitY>470||l.id<10);assert.ok(l.objects.some(o=>o.type==='rubble'));}});
test('tall world collision and hazard boundaries use the full map height',()=>{const g=new Game(14);assert.equal(g.terrain.length,1000*g.height);assert.equal(g.hazardY,g.height-28);g.rect(10,500,20,8,1);assert.equal(g.at(15,503),1);assert.equal(g.at(15,g.height),0);g.spawned=20;g.units=[{id:0,x:15,y:g.hazardY+1,state:'fall',dir:1,vy:1,fallStart:500}];g.step();for(let n=0;n<180;n++)g.step();assert.equal(g.lost,1);g.reset(0);assert.equal(g.height,470);assert.equal(g.terrain.length,470000);});
test('a lemming landing directly on a blocker cannot slip past',()=>{const g=new Game();g.spawned=20;const b={id:0,x:200,y:220,dir:1,state:'block'},w={id:1,x:200,y:220,dir:1,state:'walk'};g.units=[b,w];g.step();assert.equal(w.dir,-1);assert.ok(w.x<b.x);g.step();assert.equal(w.dir,-1);});

test('expedition difficulty rises through five core tools and longer action sequences',()=>{
 for(const l of LEVELS.slice(5).filter(l=>!l.puzzleId)){const r=routes[l.id],used=new Set(r.map(a=>a[2]));for(const skill of ['build','platform','bash','mine','dig'])assert.ok(used.has(skill),`${l.id+1} needs a ${skill} route`);assert.ok(r.length>=(l.id<10?8:l.id<15?11:14));assert.equal(l.stock.block,l.id<10?2:1);}
});
test('expedition roofed exits cannot be reached by dropping or digging in from above',()=>{
 for(const level of LEVELS.slice(5).filter(l=>!l.puzzleId))for(const dir of [-1,1])for(const offset of [-35,0,35]){
  const g=new Game(level.id),roof=level.exitY-48;assert.equal(g.at(level.exitX,roof),2);
  const u=g.spawn();g.spawned=level.total;Object.assign(u,{x:level.exitX+offset,y:roof-35,fallStart:roof-35,dir,state:'fall'});g.stock.dig=50;
  for(let t=0;t<1800&&g.units.length;t++){const p=g.units[0];if(p.state==='walk')g.assign(p.id,'dig');g.step();}
  assert.equal(g.saved,0,`Level ${level.id+1}: vertical shortcut entered the exit`);
 }
});
