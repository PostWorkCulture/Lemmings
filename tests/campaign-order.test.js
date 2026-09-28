import test from 'node:test';
import assert from 'node:assert/strict';
import {LEVELS,CAMPAIGN,CHAPTERS,nextLevelId} from '../src/levels.js';
import {isUnlocked,totalStars} from '../src/progress.js';
import {PlayerStore} from '../src/player-store.js';

test('50 unique saved identities form the requested five ten-level chapters',()=>{
 assert.equal(CAMPAIGN.length,50);assert.equal(new Set(CAMPAIGN.map(l=>l.id)).size,50);
 assert.deepEqual(CHAPTERS.map(c=>[c.theme,c.difficulty]),[['woodland','Easy'],['beach','Medium'],['alpine','Medium'],['candy','Hard'],['volcano','Extreme']]);
 for(const [i,l]of CAMPAIGN.entries()){assert.equal(l.campaignIndex,i);assert.equal(LEVELS[l.id],l);assert.equal(l.theme,CHAPTERS[Math.floor(i/10)].theme);assert.equal(nextLevelId(l.id),CAMPAIGN[i+1]?.id);}
});
test('chapter boundaries unlock the next two displayed maps, not the next save IDs',()=>{
 for(const boundary of [10,20,30,40]){const records=Object.fromEntries(CAMPAIGN.slice(0,boundary).map(l=>[l.id,{stars:3}]));
 assert.ok(isUnlocked(CAMPAIGN[boundary].id,records));assert.ok(isUnlocked(CAMPAIGN[boundary+1].id,records));assert.equal(isUnlocked(CAMPAIGN[boundary+2].id,records),false);
 }
 assert.equal(totalStars(Object.fromEntries(CAMPAIGN.map(l=>[l.id,{stars:3}]))),150);
});
test('completed maps remain replayable after moving to a later chapter',()=>{
 assert.ok(isUnlocked(15,{15:{stars:2}}));assert.equal(LEVELS[15].campaignIndex,40);
});
test('existing player saves retain exact level identity, stars, time and current map',()=>{
 const values=new Map([['lemmings-players-v1',JSON.stringify({active:'old',players:[{id:'old',name:'Existing player'}]})],['lemmings-player:old:lemmings-stars-v1',JSON.stringify({15:{stars:3,bestPerfectTicks:1234},40:{stars:2}})],['lemmings-player:old:lemmings-current-level','40']]);
 const storage={getItem:k=>values.get(k)??null,setItem:(k,v)=>values.set(k,v)};const store=new PlayerStore(storage);const save=store.snapshot();assert.equal(save.currentLevel,40);assert.deepEqual(save.stars[15],{stars:3,bestPerfectTicks:1234});assert.equal(save.stars[40].stars,2);assert.equal(LEVELS[40].campaignIndex,35);
});
