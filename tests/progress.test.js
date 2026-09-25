import test from 'node:test';
import assert from 'node:assert/strict';
import {Game} from '../src/engine.js';
import {isUnlocked,isPerfect,earnedStars,migrateStars,recordResult} from '../src/progress.js';
test('stars open at most the next two levels and only earlier stars count',()=>{
 assert.equal(isUnlocked(0,{}),true);assert.equal(isUnlocked(1,{}),false);
 assert.equal(isUnlocked(1,{0:{stars:1}}),true);assert.equal(isUnlocked(2,{0:{stars:1}}),false);
 assert.equal(isUnlocked(2,{0:{stars:2}}),true);assert.equal(isUnlocked(3,{0:{stars:3}}),false);
 assert.equal(isUnlocked(3,{0:{stars:2},2:{stars:1}}),true);
 assert.equal(isUnlocked(1,{5:{stars:3}}),false);assert.equal(isUnlocked(20,{0:{stars:3}}),false);
});
test('three stars require completion, a perfect rescue and strictly under target time',()=>{
 const l={target:18,total:20,targetTime:100},run={completed:true,saved:20,lost:0,ticks:5999};
 assert.equal(earnedStars(l,run),3);assert.equal(earnedStars(l,{...run,ticks:6000}),2);
 assert.equal(earnedStars(l,{...run,ticks:undefined}),2);assert.equal(earnedStars(l,{...run,saved:19,lost:1}),1);
 assert.equal(earnedStars(l,{...run,completed:false}),0);assert.equal(earnedStars(l,{...run,saved:17}),0);
 assert.equal(recordResult(l,{stars:3},{...run,saved:18,lost:2}).stars,3);
});
test('old progress migrates without inventing a timed star',()=>{
 const records=migrateStars({0:20,1:18},{0:{completed:true,saved:20,total:20,lost:0}});
 assert.equal(records[0].stars,2);assert.equal(records[1].stars,1);assert.equal(isUnlocked(2,records),true);
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
