import test from 'node:test';
import assert from 'node:assert/strict';
import {LEVELS,CAMPAIGN} from '../src/levels.js';
import {Game} from '../src/engine.js';
import {mergeProgress} from '../src/player-store.js';
import {isUnlocked} from '../src/progress.js';

test('25 new campaign maps preserve existing IDs and form five coherent chapters',()=>{
 assert.equal(LEVELS.length,50);
 assert.deepEqual(LEVELS.map(l=>l.id),Array.from({length:50},(_,i)=>i));
 const signatures=new Set();
 for(let i=20;i<45;i++){
  const l=LEVELS[i];assert.ok(l.expansion);assert.equal(l.total,20);assert.ok(l.target<=20);
  assert.ok(l.height>700);assert.ok(l.hints.length>0);
  signatures.add(JSON.stringify([l.terrain,l.shapes,l.objects]));
  const required=new Set(l.expansionRoutes.map(r=>r[2]));required.add(l.stock.attract?'attract':'block');
  assert.deepEqual(Object.keys(l.stock).sort(),[...required].sort(),'inventory must serve the tested route');
 }
 assert.equal(signatures.size,25);
 assert.ok(LEVELS.filter(l=>l.bottomEntry).length>=Math.ceil(LEVELS.length/4));
});
test('every new chapter has a majority-terrain map before any construction',()=>{
 for(let start=20;start<45;start+=5){let largest=0;
  for(let i=start;i<start+5;i++){const g=new Game(i);largest=Math.max(largest,g.terrain.reduce((n,t)=>n+(t>0),0)/g.terrain.length);}
  assert.ok(largest>.5,`chapter ${start/5+1}`);
 }
});
test('all new maps need intervention rather than rescuing themselves',()=>{
 for(let id=20;id<45;id++){const g=new Game(id);for(let t=0;t<18000&&!g.result;t++)g.step();assert.notEqual(g.result,'win',g.level.name);}
});
test('new-level stars and current level survive profile and cloud merges',()=>{
 const merged=mergeProgress({best:{0:20},stars:{0:{stars:3}}},{best:{44:20},perfect:{44:{completed:true,saved:20,total:20,lost:0}},stars:{44:{stars:3,bestPerfectTicks:7000}},currentLevel:44});
 assert.equal(merged.currentLevel,44);assert.equal(merged.stars[44].stars,3);assert.equal(merged.best[44],20);assert.equal(merged.best[0],20);
 const completed=Object.fromEntries(CAMPAIGN.slice(0,5).map(l=>[l.id,{stars:3}]));
 assert.equal(isUnlocked(20,completed),true);assert.equal(isUnlocked(21,completed),true);assert.equal(isUnlocked(22,completed),false);
});
