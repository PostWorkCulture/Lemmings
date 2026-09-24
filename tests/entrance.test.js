import test from 'node:test';
import assert from 'node:assert/strict';
import {Game} from '../src/engine.js';
import {hatchOpening} from '../src/art.js';
test('entrance doors start closed and remain open throughout release',()=>{assert.equal(hatchOpening(0,0,20,null),0);assert.ok(hatchOpening(9,1,20,0)>0);assert.equal(hatchOpening(18,1,20,0),1);assert.equal(hatchOpening(2000,19,20,1980),1);});
test('doors close only after the last lemming clears them',()=>{assert.equal(hatchOpening(1024,20,20,1000),1);assert.ok(hatchOpening(1036,20,20,1000)<1);assert.ok(hatchOpening(1036,20,20,1000)>0);assert.equal(hatchOpening(1048,20,20,1000),0);});
test('spawn timing resets with a fresh level',()=>{const g=new Game();assert.equal(g.lastSpawnTick,null);g.step();assert.equal(g.lastSpawnTick,0);for(let i=0;i<110;i++)g.step();assert.equal(g.lastSpawnTick,110);g.reset();assert.equal(g.lastSpawnTick,null);});
