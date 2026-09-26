import test from 'node:test';
import assert from 'node:assert/strict';
import {Game} from '../src/engine.js';
import {LEVELS} from '../src/levels.js';

test('all five mountain maps contain physical uneven snow terrain',()=>{
 for(const level of LEVELS.slice(10,15)){
  const g=new Game(level.id),ridges=level.shapes.filter(s=>s.contour);
  assert.ok(ridges.length>0);
  for(const ridge of ridges){
   const crest=ridge.points.reduce((a,b)=>b[1]<a[1]?b:a);
   assert.ok(g.at(crest[0],crest[1]+1),'crest is solid collision terrain');
  }
 }
});

test('a walker climbs a snowbank and returns safely to its original ledge',()=>{
 const g=new Game(10),u=g.spawn();g.spawned=g.level.total;
 Object.assign(u,{x:265,y:300,dir:1,state:'walk',arrival:null});
 let highest=u.y;
 for(let t=0;t<160&&u.x<354;t++){g.step();highest=Math.min(highest,u.y);}
 assert.ok(u.x>=354,'walker traverses the entire snowbank');
 assert.ok(highest<=286,'walker follows the visible elevated crest');
 assert.equal(u.y,300);assert.equal(g.lost,0);
});

test('soft snowbank crests can be excavated while original hard supports remain hard',()=>{
 const g=new Game(10);
 assert.equal(g.at(310,289),1);
 g.rect(306,282,10,18,0);
 assert.equal(g.at(310,289),0);
 const fossil=new Game(12);
 assert.equal(fossil.at(340,303),2);
 fossil.rect(335,290,12,35,0);
 assert.equal(fossil.at(340,303),2);
});
