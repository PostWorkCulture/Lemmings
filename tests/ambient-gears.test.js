import test from 'node:test';
import assert from 'node:assert/strict';
import {factoryGears} from '../src/ambient-art.js';
import {LEVELS} from '../src/levels.js';
test('factory cogs never intersect lava at any map depth',()=>{
 for(const level of LEVELS.filter(l=>l.theme==='factory'))
  for(let row=0;row<level.height-70;row+=330)
   for(const g of factoryGears(level,row))assert.ok(g.y+g.r+4<g.surface);
 assert.equal(factoryGears({height:470,hazard:'lava'},330).length,0);
});
test('only cogs touching water generate contact splashes',()=>{
 const level={height:470,hazard:'water'};
 assert.ok(factoryGears(level,0).every(g=>!g.inWater));
 const wet=factoryGears(level,330);assert.ok(wet.length>0);
 assert.ok(wet.every(g=>g.inWater&&g.y-g.r<g.surface&&g.y+g.r>=g.surface));
 assert.equal(factoryGears(level,660).length,0);
});
