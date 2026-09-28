import test from 'node:test';
import assert from 'node:assert/strict';
import {PlayerStore,mergeProgress} from '../src/player-store.js';
const memory=()=>{const m=new Map();return {getItem:k=>m.get(k)??null,setItem:(k,v)=>m.set(k,v)};};
test('legacy progress moves once into player one, new player starts empty',()=>{const s=memory();s.setItem('lemmings-best','{"0":20}');let id=0;const store=new PlayerStore(s,()=>String(++id));assert.equal(store.snapshot().best[0],20);const second=store.add('Player 2');store.select(second.id);const next=new PlayerStore(s);assert.deepEqual(next.snapshot().best,{});assert.equal(s.getItem('lemmings-best'),'{"0":20}');});
test('cloud merge retains best stars, rescues and fastest perfect time',()=>{const merged=mergeProgress({best:{0:20},stars:{0:{stars:3,bestPerfectTicks:100}}},{best:{0:17},stars:{0:{stars:1},1:{stars:2,bestPerfectTicks:200}}});assert.equal(merged.best[0],20);assert.equal(merged.stars[0].stars,3);assert.equal(merged.stars[0].bestPerfectTicks,100);assert.equal(merged.stars[1].stars,2);});
test('accounts cannot be rebound or shared by different local players',()=>{let id=0;const s=memory(),store=new PlayerStore(s,()=>String(++id));store.link('account-one');assert.throws(()=>store.link('account-two'));const p=store.add('Player 2');store.select(p.id);const other=new PlayerStore(s);assert.throws(()=>other.link('account-one'));});
test('malformed remote results are discarded',()=>{const p=mergeProgress({}, {best:{0:400},stars:{0:{stars:99}},currentLevel:999});assert.deepEqual(p.stars,{});assert.equal(p.currentLevel,0);});

test('perfect rescues and saved counts use each level total',async()=>{
 const {LEVELS}=await import('../src/levels.js');
 const level=LEVELS[0],old={total:level.total,target:level.target};
 try{for(const total of [5,10,35]){level.total=total;level.target=total;
 const merged=mergeProgress({}, {best:{0:total},perfect:{0:{completed:true,saved:total,total,lost:0}}});
 assert.equal(merged.best[0],total);assert.equal(merged.perfect[0].total,total);assert.equal(merged.stars[0].stars,2);
 }}finally{Object.assign(level,old);}
});
