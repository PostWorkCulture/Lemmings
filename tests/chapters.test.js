import test from 'node:test';import assert from 'node:assert/strict';import {LEVELS,CHAPTERS,CAMPAIGN} from '../src/levels.js';
test('each named chapter has ten matching landscapes and hazards',()=>{
 assert.deepEqual(CHAPTERS.map(c=>c.name),['Freaky Forest',"Dunes",'Mountain Rescue','Sweet Worlds','Lava Land']);
 for(const [i,c]of CHAPTERS.entries()){const maps=CAMPAIGN.slice(i*10,i*10+10);assert.equal(maps.length,10);assert.ok(maps.every(l=>l.theme===c.theme&&l.chapter===c.name));assert.ok(maps.every(l=>l.hazard===(c.theme==='alpine'?'snow':c.theme==='volcano'?'lava':c.theme==='candy'?'void':'water')));}
});
test('the swimming puzzle belongs to the beach, while mountain levels have snow',()=>{
 assert.equal(LEVELS.find(l=>l.puzzleId==='water-specialist').theme,'beach');
 assert.ok(LEVELS.slice(10,15).every(l=>!l.stock.swim));
});
