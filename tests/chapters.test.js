import test from 'node:test';import assert from 'node:assert/strict';import {LEVELS,CHAPTERS} from '../src/levels.js';
test('each named chapter has five matching landscapes and hazards',()=>{
 assert.deepEqual(CHAPTERS.map(c=>c.name),['Freaky Forest',"Life's a Beach",'Mountain Rescue','What a Circus!']);
 for(const [i,c]of CHAPTERS.entries()){const maps=LEVELS.slice(i*5,i*5+5);assert.equal(maps.length,5);assert.ok(maps.every(l=>l.theme===c.theme&&l.chapter===c.name));assert.ok(maps.every(l=>l.hazard===(i===2?'snow':i===3?'toys':'water')));}
});
test('the swimming puzzle belongs to the beach, while mountain levels have snow',()=>{
 assert.equal(LEVELS.find(l=>l.puzzleId==='water-specialist').theme,'beach');
 assert.ok(LEVELS.slice(10,15).every(l=>!l.stock.swim));
});
