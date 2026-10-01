import test from 'node:test';
import assert from 'node:assert/strict';
import {exposedSoilDepth,BURIED_DEPTH,cornerCoverage} from '../src/terrain-finish.js';

test('terrain continuing off the top never acquires a false grass or snow cap',()=>{
 const t=new Uint8Array(24*50).fill(1),d=exposedSoilDepth(t,24,50);
 assert.ok(d.every(v=>v===BURIED_DEPTH));
});
test('surface coatings do not restart at buried hard-material joins',()=>{
 const t=new Uint8Array(8*40);t.fill(2,8*5,8*15);t.fill(1,8*15);
 const d=exposedSoilDepth(t,8,40);assert.ok(d.slice(8*15).every(v=>v===BURIED_DEPTH));
});
test('excavation reveals a fresh surface with the correct depth',()=>{
 const t=new Uint8Array(8*60).fill(1);t.fill(0,8*20,8*30);
 const d=exposedSoilDepth(t,8,60);assert.equal(d[8*29],0);assert.equal(d[8*30],1);assert.equal(d[8*40],11);
});
test('corner smoothing preserves straight ledges, built steps, and the collision mask',()=>{
 const t=new Uint8Array(7*7);for(let y=2;y<6;y++)for(let x=2;x<6;x++)t[y*7+x]=1;
 const original=t.slice();assert.equal(cornerCoverage(t,7,7,3,2),255);assert.equal(cornerCoverage(t,7,7,2,2),192);
 assert.deepEqual(t,original);t[2*7+2]=3;assert.equal(cornerCoverage(t,7,7,2,2),255);
});
test('canvas boundaries are not treated as exposed corners and never wrap between rows',()=>{
 const t=new Uint8Array(5*5).fill(1);assert.equal(cornerCoverage(t,5,5,0,0),255);
 t[4]=0;assert.equal(cornerCoverage(t,5,5,0,1),255);
});
