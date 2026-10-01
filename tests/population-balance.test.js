import test from 'node:test';import assert from 'node:assert/strict';
import {CAMPAIGN,LEVELS} from '../src/levels.js';
import {POPULATION_VERSION,reducedPopulation,migratePopulationProgress} from '../src/population-balance.js';
import {PlayerStore,SAVE_KEYS} from '../src/player-store.js';
import {isUnlocked} from '../src/progress.js';
const memory=()=>{const map=new Map();return {getItem:k=>map.get(k)??null,setItem:(k,v)=>map.set(k,v)};};
test('every active level has a smaller but viable rescue party and proportional target',()=>{
 assert.deepEqual([5,10,12,15,20].map(reducedPopulation),[5,5,6,8,10]);
 for(const l of CAMPAIGN){assert.equal(l.total,reducedPopulation(l.populationOriginal.total));assert.ok(l.target>0&&l.target<=l.total);assert.ok(l.total>=5&&l.total<=10);if(l.populationOriginal.total>l.populationOriginal.target)assert.ok(l.target<l.total,'retain a recoverable loss');}
 assert.equal(CAMPAIGN.reduce((n,l)=>n+l.total,0),737);assert.equal(CAMPAIGN.reduce((n,l)=>n+l.populationOriginal.total,0),1430);
});
test('whole-party parachutes track the smaller population; specialist budgets stay useful',()=>{
 for(const id of [7,25,31,32,34,52,57,92])assert.equal(LEVELS[id].stock.float,LEVELS[id].total);
 assert.equal(LEVELS[19].stock.float,1);assert.equal(LEVELS[0].stock.build,4);
});
test('population migration scales historical counts once and preserves stars, times and unlocked maps',()=>{
 const old={best:{0:20,1:18,5:14},perfect:{0:{completed:true,saved:20,total:20,lost:0}},stars:{0:{stars:3,bestPerfectTicks:4200},1:{stars:1},5:{stars:2}},currentLevel:5};
 const next=migratePopulationProgress(old,LEVELS);assert.deepEqual(next.best,{0:10,1:9,5:7});assert.equal(next.perfect[0].saved,10);assert.deepEqual(next.stars,old.stars);assert.equal(next.currentLevel,5);assert.ok(isUnlocked(5,next.stars));assert.equal(next.populationVersion,POPULATION_VERSION);assert.deepEqual(migratePopulationProgress(next,LEVELS),next);assert.equal(old.best[0],20);
});
test('all existing local players migrate independently without resetting their progress',()=>{
 const s=memory();s.setItem('lemmings-players-v1',JSON.stringify({active:'a',players:[{id:'a',name:'Alice'},{id:'b',name:'Bob'}]}));
 for(const [id,count]of [['a',20],['b',18]]){s.setItem(`lemmings-player:v2:${id}:${SAVE_KEYS[0]}`,JSON.stringify({0:count}));s.setItem(`lemmings-player:v2:${id}:${SAVE_KEYS[2]}`,JSON.stringify({0:{stars:id==='a'?3:1}}));}
 let store=new PlayerStore(s);assert.equal(store.snapshot().best[0],10);assert.equal(store.snapshot().stars[0].stars,3);store.select('b');store=new PlayerStore(s);assert.equal(store.snapshot().best[0],9);assert.equal(store.snapshot().stars[0].stars,1);store=new PlayerStore(s);assert.equal(store.snapshot().best[0],9);
});
test('old and new cloud snapshots merge without repeatedly halving scores',()=>{
 const store=new PlayerStore(memory(),()=> 'a');store.merge({campaignVersion:2,best:{0:20},stars:{0:{stars:3}}});assert.equal(store.snapshot().best[0],10);
 const snapshot=store.snapshot();store.merge(snapshot);store.merge(snapshot);assert.equal(store.snapshot().best[0],10);assert.equal(store.snapshot().stars[0].stars,3);
});
