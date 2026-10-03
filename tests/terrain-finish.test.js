import test from 'node:test';
import assert from 'node:assert/strict';
import {exposedSoilDepth,BURIED_DEPTH,cornerCoverage,soilEdgeDistance,soilCoatingCoverage} from '../src/terrain-finish.js';

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


test('terrain bevels follow diagonal cuts without Manhattan-shaped stair bands',()=>{
 const w=17,h=17,t=new Uint8Array(w*h).fill(1);t[8*w+8]=0;const original=t.slice(),d=soilEdgeDistance(t,w,h);
 assert.equal(d[8*w+9],3,'one horizontal pixel');
 assert.equal(d[9*w+9],4,'one diagonal pixel is not two square steps');
 assert.equal(d[10*w+10],8,'diagonal bevel expands smoothly');
 assert.equal(d[8*w+11],9,'flat ledges retain the original pixel distance');
 assert.deepEqual(t,original,'render measurements never alter the physical terrain');
});

test('diagonal bevels remain symmetric at excavation corners and do not leak over row edges',()=>{
 const w=19,h=19,t=new Uint8Array(w*h).fill(1);t[9*w+9]=0;const d=soilEdgeDistance(t,w,h);
 for(let dy=0;dy<=8;dy++)for(let dx=0;dx<=8;dx++){
  const value=d[(9+dy)*w+9+dx];
  assert.equal(value,d[(9-dy)*w+9-dx]);
  assert.equal(value,d[(9+dx)*w+9+dy]);
 }
 const edge=new Uint8Array(8*12).fill(1);edge[7]=0;
 assert.equal(soilEdgeDistance(edge,8,12)[8],22,'end of one row is not next to the start of another');
 assert.ok(soilEdgeDistance(new Uint8Array(8*12).fill(1),8,12).every(v=>v===120),'no fake bevel at the screen frame');
});


test('snow and moss cover substantial footing but not thin detached slivers',()=>{
 const w=32,h=50,t=new Uint8Array(w*h);
 for(let y=5;y<25;y++)t.fill(1,y*w+3,y*w+29);
 for(let y=35;y<38;y++)t.fill(1,y*w+3,y*w+29);
 const original=t.slice(),coverage=soilCoatingCoverage(t,w,h);
 assert.equal(coverage[5*w+16],255,'broad walkable top retains its coating');
 assert.equal(coverage[18*w+16],255,'coating eligibility follows the same surface down');
 assert.equal(coverage[35*w+16],0,'three-pixel remnant keeps material colour');
 assert.deepEqual(t,original,'the foothold remains physically unchanged');
});

test('coatings taper at steep edges, retain snowy peaks, and continue to the frame',()=>{
 const w=41,h=45,t=new Uint8Array(w*h);
 for(let y=3;y<h;y++)for(let x=0;x<w;x++)if(Math.abs(x-20)<=y-3)t[y*w+x]=1;
 const coverage=soilCoatingCoverage(t,w,h);
 assert.equal(coverage[3*w+20],255,'pointed mountain crest keeps snow');
 const shelf=new Uint8Array(w*h);for(let y=5;y<h;y++)shelf.fill(1,y*w+12,(y+1)*w);
 const sc=soilCoatingCoverage(shelf,w,h);
 assert.ok(sc[5*w+12]<sc[5*w+15],'a steep cliff rim tapers into its material');
 assert.equal(sc[5*w+w-1],255,'an offscreen continuation has no artificial coating seam');
});
