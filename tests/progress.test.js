import test from 'node:test';
import assert from 'node:assert/strict';
import {Game} from '../src/engine.js';
import {isUnlocked,isPerfect} from '../src/progress.js';
test('levels unlock only after preceding targets are met',()=>{
 assert.equal(isUnlocked(0,{}),true);assert.equal(isUnlocked(1,{}),false);
 assert.equal(isUnlocked(1,{0:15}),false);assert.equal(isUnlocked(1,{0:16}),true);
 assert.equal(isUnlocked(2,{0:20,1:17}),false);assert.equal(isUnlocked(2,{0:16,1:18}),true);
 assert.equal(isUnlocked(4,{3:20}),false);assert.equal(isUnlocked(20,{0:20,1:20,2:20,3:20,4:20}),false);
});
test('gold stars require a completed 20/20 rescue with zero losses',()=>{
 const good={completed:true,saved:20,total:20,lost:0};
 assert.equal(isPerfect(0,{0:good}),true);
 for(const bad of [20,19,{}, {...good,saved:19},{...good,lost:1},{...good,completed:false},{...good,total:19}])assert.equal(isPerfect(0,{0:bad}),false);
 assert.equal(isPerfect(0,{}),false);assert.equal(isPerfect(99,{99:good}),false);
});
test('missing the target does not interrupt remaining lemmings',()=>{
 const g=new Game();g.spawned=20;g.lost=5;g.saved=14;g.units=[{id:19,x:890,y:366,dir:1,state:'walk'}];
 g.step();assert.equal(g.result,null);assert.equal(g.units[0].state,'exit');
 for(let i=0;i<96;i++)g.step();assert.equal(g.result,'lose');assert.equal(g.saved,15);assert.equal(g.lost,5);
});

test('redesigned puzzles require a fresh perfect rescue while earlier unlocks remain',()=>{
 const r={completed:true,saved:20,total:20,lost:0};assert.equal(isPerfect(5,{5:r}),false);
 assert.equal(isPerfect(5,{5:{...r,puzzleId:'stack-access'}}),true);
});
