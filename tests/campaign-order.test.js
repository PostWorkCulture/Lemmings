import test from 'node:test';
import assert from 'node:assert/strict';
import {LEVELS,CAMPAIGN,CHAPTERS,nextLevelId,RETIRED_LEVEL_IDS} from '../src/levels.js';
import {isUnlocked,totalStars} from '../src/progress.js';
import {PlayerStore} from '../src/player-store.js';

test('100 active saved identities form ten ten-level chapters',()=>{
 assert.equal(CAMPAIGN.length,100);assert.equal(new Set(CAMPAIGN.map(l=>l.id)).size,100);
 assert.deepEqual(CHAPTERS.map(c=>[c.theme,c.difficulty]),[['woodland','Easy'],['creature','Medium'],['alpine','Medium'],['candy','Hard'],['volcano','Extreme'],['station','Hard'],['space','Hard'],['candy','Medium'],['sports','Hard'],['prehistoric','Extreme']]);
 for(const [i,l]of CAMPAIGN.entries()){assert.equal(l.campaignIndex,i);assert.equal(LEVELS[l.id],l);assert.equal(l.theme,CHAPTERS[Math.floor(i/10)].theme);assert.equal(nextLevelId(l.id),CAMPAIGN[i+1]?.id);}
});
test('chapter boundaries unlock the next two displayed maps, not the next save IDs',()=>{
 for(const boundary of [10,20,30,40,50,60,70,80,90]){const records=Object.fromEntries(CAMPAIGN.slice(0,boundary).map(l=>[l.id,{stars:3}]));
 assert.ok(isUnlocked(CAMPAIGN[boundary].id,records));assert.ok(isUnlocked(CAMPAIGN[boundary+1].id,records));assert.equal(isUnlocked(CAMPAIGN[boundary+2].id,records),false);
 }
 assert.equal(totalStars(Object.fromEntries(CAMPAIGN.map(l=>[l.id,{stars:3}]))),300);
});
test('completed maps remain replayable after moving to a later chapter',()=>{
 assert.ok(isUnlocked(15,{15:{stars:2}}));assert.equal(LEVELS[15].campaignIndex,40);
});
test('new game resets old results while preserving player identity',()=>{
 const values=new Map([['lemmings-players-v1',JSON.stringify({active:'old',players:[{id:'old',name:'Existing player'}]})],['lemmings-player:old:lemmings-stars-v1',JSON.stringify({15:{stars:3,bestPerfectTicks:1234},40:{stars:2}})],['lemmings-player:old:lemmings-current-level','40']]);
 const storage={getItem:k=>values.get(k)??null,setItem:(k,v)=>values.set(k,v)};const store=new PlayerStore(storage);const save=store.snapshot();assert.equal(save.currentLevel,0);assert.deepEqual(save.stars,{});assert.equal(store.player.name,'Existing player');assert.equal(LEVELS[40].campaignIndex,35);
});

test('withdrawn sweet maps cannot unlock or interrupt the active campaign',()=>{
 const retired=RETIRED_LEVEL_IDS.map(id=>LEVELS[id]);assert.equal(retired.length,10);
 const records=Object.fromEntries(retired.map(l=>[l.id,{stars:3}]));
 assert.equal(totalStars(records),0);
 for(const l of retired){assert.equal(isUnlocked(l.id,records),false);assert.equal(nextLevelId(l.id),undefined);}
 assert.equal(nextLevelId(34),50);assert.equal(nextLevelId(39),60);
 assert.equal(isUnlocked(15,records),false);
 const active=Object.fromEntries(CAMPAIGN.slice(0,40).map(l=>[l.id,{stars:3}]));
 assert.equal(isUnlocked(15,active),true);assert.equal(isUnlocked(16,active),true);
});
