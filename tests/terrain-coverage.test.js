import test from 'node:test';
import assert from 'node:assert/strict';
import {Game} from '../src/engine.js';
import {CAMPAIGN,CHAPTERS} from '../src/levels.js';
test('each campaign chapter includes a majority-terrain adventure',()=>{
 for(const [i,chapter]of CHAPTERS.entries()){
  const coverage=CAMPAIGN.slice(i*10,i*10+10).map(l=>{const g=new Game(l.id);return g.terrain.reduce((n,t)=>n+(t>0),0)/g.terrain.length;});
  assert.ok(Math.max(...coverage)>.5,`${chapter.name} needs a majority-terrain adventure`);
 }
});
test('Lava Land replaces all ten circus maps with dangerous lava and no circus props',()=>{
 const maps=CAMPAIGN.slice(40);assert.equal(maps.length,10);
 for(const l of maps){assert.equal(l.theme,'volcano');assert.equal(l.hazard,'lava');assert.equal(l.chapter,'Lava Land');assert.equal(l.difficulty,'Extreme');assert.deepEqual(l.circusProps,[]);assert.deepEqual(l.setPieces,[]);assert.ok(!l.hints.some(h=>/circus|curtain|backstage|audience|encore/.test(h)));}
});
