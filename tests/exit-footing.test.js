import test from 'node:test';
import assert from 'node:assert/strict';
import {LEVELS} from '../src/levels.js';
import {Game} from '../src/engine.js';
test('every campaign exit supports both outer feet across its entire base',()=>{
 for(let i=0;i<LEVELS.length;i++){
  const g=new Game(i),l=g.level;
  for(let x=l.exitX-(l.embeddedDoors?24:35);x<=l.exitX+(l.embeddedDoors?24:37);x++)assert.ok(g.at(x,l.exitY),`${l.name}: exit overhang at ${x}`);
 }
});
