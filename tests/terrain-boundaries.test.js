import test from 'node:test';
import assert from 'node:assert/strict';
import {extendOriginalBoundaries} from '../src/terrain-boundaries.js';
import {Game} from '../src/engine.js';
import {CAMPAIGN} from '../src/levels.js';
import {sculptOriginalTerrain} from '../src/original-terrain.js';
import {polishOriginalSilhouette} from '../src/first30-polish.js';
import {TERRAIN_CLEARANCES} from '../src/terrain-clearances.js';

function fixture(rects){
 const g={height:100,hazardY:90,terrain:new Uint8Array(100000),level:{id:999,theme:'woodland',terrain:rects,shapes:[]}};
 for(const [x,y,w,h,type=1]of rects)for(let yy=y;yy<y+h;yy++)g.terrain.fill(type,yy*1000+x,yy*1000+x+w);
 return g;
}
test('outer landforms continue to both edges with their real soft and hard materials',()=>{
 const g=fixture([[40,20,920,15,1],[40,60,920,10,2]]),before=g.terrain.slice();extendOriginalBoundaries(g);
 for(const [y,type]of [[25,1],[65,2]])for(let x=0;x<1000;x++)assert.equal(g.terrain[y*1000+x],type);
 for(let x=0;x<1000;x++)assert.equal(g.terrain[45*1000+x],0,'the passage between shelves stays open');
 for(let i=0;i<before.length;i++)if(before[i])assert.equal(g.terrain[i],before[i]);
 assert.ok(g.terrain.slice(90000).every(t=>!t),'no terrain covers the hazard');
});
test('free-standing interior islands and archived illustrated terrain are never stretched',()=>{
 const g=fixture([[200,20,600,15,1]]),before=g.terrain.slice();extendOriginalBoundaries(g);assert.deepEqual(g.terrain,before);
 const illustrated=fixture([[40,20,920,15,1]]),initial=illustrated.terrain.slice();illustrated.level.connectedStudy=0;extendOriginalBoundaries(illustrated);assert.deepEqual(illustrated.terrain,initial);
});
test('different outer shelf margins all reach the same edge without sealing their vertical separation',()=>{
 const g=fixture([[45,20,880,15,1],[95,60,810,15,1]]);extendOriginalBoundaries(g);
 for(const y of [25,65]){assert.equal(g.terrain[y*1000],1);assert.equal(g.terrain[y*1000+999],1);}
 assert.equal(g.terrain[45*1000],0);assert.equal(g.terrain[45*1000+999],0);
});
test('all 30 final masks extend their outer landforms without changing central puzzles or route clearances',()=>{
 for(const level of CAMPAIGN){
  const g=new Game(level.id);sculptOriginalTerrain(g);polishOriginalSilhouette(g);
  const before=g.terrain.slice(),keep=new Uint8Array(250*Math.ceil(g.height/4)),spans=TERRAIN_CLEARANCES[level.id]||[];
  for(let n=0;n<spans.length;n+=3)keep.fill(1,spans[n]*250+spans[n+1],spans[n]*250+spans[n+2]);
  extendOriginalBoundaries(g);let changes=0,edge=0;
  for(let y=0;y<g.height;y++){
   edge+=Boolean(g.terrain[y*1000])+Boolean(g.terrain[y*1000+999]);
   for(let x=0;x<1000;x++){
    const p=y*1000+x;if(before[p]===g.terrain[p])continue;changes++;
    assert.equal(before[p],0,level.name+' preserves every original solid pixel');
    assert.ok(x<136||x>863,level.name+' central puzzle');
    assert.ok(y<g.hazardY,level.name+' hazard line');
    assert.equal(keep[Math.floor(y/4)*250+Math.floor(x/4)],0,level.name+' route clearance');
   }
  }
  assert.ok(changes>0,level.name+' closes its old margin');assert.ok(edge>0,level.name+' reaches the frame');
  const once=g.terrain.slice();extendOriginalBoundaries(g);assert.deepEqual(g.terrain,once,level.name+' stable repeated finish');
 }
});
