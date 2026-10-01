import test from 'node:test';import assert from 'node:assert/strict';import {LEVELS,CHAPTERS,CAMPAIGN} from '../src/levels.js';
test('each named chapter has ten matching landscapes and hazards',()=>{
 assert.deepEqual(CHAPTERS.map(c=>c.name),['Freaky Forest','Creature Comfort','Mountain Rescue','Sweet Worlds','Lava Land','Neon Nights','Cosmic Chaos','Food Fight','Stadium Scramble','Dino Disaster']);
 for(const [i,c]of CHAPTERS.entries()){const maps=CAMPAIGN.slice(i*10,i*10+10);assert.equal(maps.length,10);assert.ok(maps.every(l=>l.theme===c.theme&&l.chapter===c.name));assert.ok(maps.every(l=>l.hazard===(i>=5||c.theme==='creature'?'void':c.theme==='alpine'?'snow':c.theme==='volcano'?'lava':c.theme==='candy'?'void':'water')));}
});
test('Creature Comfort replaces Dunes while mountain levels retain snow',()=>{
 assert.ok(CAMPAIGN.slice(10,20).every(l=>l.creature!==undefined));assert.ok(!CAMPAIGN.some(l=>l.theme==='beach'));
 assert.ok(LEVELS.slice(10,15).every(l=>!l.stock.swim));
});
