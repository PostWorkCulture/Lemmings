import test from 'node:test';
import assert from 'node:assert/strict';
import {LEVELS,CAMPAIGN,CHAPTERS,nextLevelId,isCampaignLevel,ARCHIVED_LEVEL_IDS} from '../src/levels.js';
import {isUnlocked,totalStars} from '../src/progress.js';
import {PlayerStore,mergeProgress} from '../src/player-store.js';

test('thirty physical-terrain maps form three ten-level chapters with permanent save IDs',()=>{
 assert.equal(CAMPAIGN.length,30);assert.equal(new Set(CAMPAIGN.map(l=>l.id)).size,30);
 assert.deepEqual(CHAPTERS.map(c=>[c.theme,c.difficulty]),[['woodland','Easy'],['alpine','Medium'],['volcano','Extreme']]);
 assert.deepEqual(CAMPAIGN.map(l=>l.id),[0,1,2,3,4,20,21,22,23,24,10,11,12,13,14,30,31,32,33,34,15,16,17,18,19,35,36,37,38,39]);
 for(const [i,l]of CAMPAIGN.entries()){
  assert.equal(l.campaignIndex,i);assert.equal(LEVELS[l.id],l);assert.equal(l.theme,CHAPTERS[Math.floor(i/10)].theme);
  assert.equal(nextLevelId(l.id),CAMPAIGN[i+1]?.id);assert.equal(l.total,10);
  assert.equal(l.connectedStudy,undefined);assert.equal(l.sweetReboot,undefined);assert.ok(!l.embeddedDoors);
 }
});
test('exactly ten percent are vertical expeditions, one per chapter',()=>{
 const scrolling=CAMPAIGN.filter(l=>l.scrollMode==='vertical');assert.equal(scrolling.length,CAMPAIGN.length/10);
 assert.deepEqual(scrolling.map(l=>l.id),[24,33,38]);assert.equal(new Set(scrolling.map(l=>l.theme)).size,3);
 assert.ok(CAMPAIGN.every(l=>['none','vertical'].includes(l.scrollMode)));
});
test('chapter boundaries unlock the next two displayed maps, not the next save IDs',()=>{
 for(const boundary of [10,20]){const records=Object.fromEntries(CAMPAIGN.slice(0,boundary).map(l=>[l.id,{stars:3}]));
 assert.ok(isUnlocked(CAMPAIGN[boundary].id,records));assert.ok(isUnlocked(CAMPAIGN[boundary+1].id,records));assert.equal(isUnlocked(CAMPAIGN[boundary+2].id,records),false);}
 assert.equal(totalStars(Object.fromEntries(CAMPAIGN.map(l=>[l.id,{stars:3}]))),90);
 assert.equal(nextLevelId(24),10);assert.equal(nextLevelId(34),15);assert.equal(nextLevelId(39),undefined);
});
test('completed active maps remain replayable after moving to a later chapter',()=>{
 assert.ok(isUnlocked(15,{15:{stars:2}}));assert.equal(LEVELS[15].campaignIndex,20);
});
test('archived worlds cannot count stars, unlock or interrupt the active campaign',()=>{
 assert.equal(ARCHIVED_LEVEL_IDS.length,80);
 const records=Object.fromEntries(ARCHIVED_LEVEL_IDS.map(id=>[id,{stars:3}]));assert.equal(totalStars(records),0);
 for(const id of ARCHIVED_LEVEL_IDS){assert.equal(isCampaignLevel(id),false);assert.equal(isUnlocked(id,records),false);assert.equal(nextLevelId(id),undefined);}
 assert.equal(isUnlocked(10,records),false);assert.equal(isUnlocked(15,records),false);
});
test('archived current levels fall back safely without erasing player results',()=>{
 for(const id of [5,50,67,109]){
  const merged=mergeProgress({}, {currentLevel:id,stars:{[id]:{stars:3},15:{stars:2}}});
  assert.equal(merged.currentLevel,0);assert.equal(merged.stars[id].stars,3);assert.equal(merged.stars[15].stars,2);
 }
 const values=new Map();const storage={getItem:k=>values.get(k)??null,setItem:(k,v)=>values.set(k,v)};
 const store=new PlayerStore(storage,()=> 'existing');store.player.name='Existing player';store.setItem('lemmings-current-level','67');store.setItem('lemmings-stars-v1',JSON.stringify({67:{stars:3},15:{stars:2}}));
 assert.equal(store.snapshot().currentLevel,0);assert.equal(store.snapshot().stars[15].stars,2);assert.equal(store.player.name,'Existing player');
 const fresh=new PlayerStore({getItem:()=>null,setItem:()=>{}},()=> 'fresh');
 assert.equal(fresh.merge({campaignVersion:2,populationVersion:1,currentLevel:67,stars:{67:{stars:3}}}).currentLevel,0);
});
