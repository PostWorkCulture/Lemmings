import test from 'node:test';
import assert from 'node:assert/strict';
import {Game} from '../src/engine.js';
import {CAMPAIGN,rocketHeight} from '../src/levels.js';
import {forestTreePlacements,forestTreePlacementClear,forestTreeBounds} from '../src/forest-tree-data.js';
const hit=(a,b)=>a.left<b.right&&a.right>b.left&&a.top<b.bottom&&a.bottom>b.top;
test('forest trees have complete footing and clear canopies in every authored position',()=>{
 for(const l of CAMPAIGN){
  const g=new Game(l.id);
  for(const s of forestTreePlacements(l)){
   assert.ok(forestTreePlacementClear(s,(x,y)=>g.at(x,y)),l.name+' '+JSON.stringify(s));
   assert.equal(forestTreePlacementClear(s,()=>0),false,'removed footing removes the tree');
  }
 }
});
test('forest foliage preserves doors, apparatus, and space between crowns',()=>{
 for(const l of CAMPAIGN){
  const trees=forestTreePlacements(l);
  const doors=[{x:l.exitX,y:l.exitY,h:65},...(l.entrances||[{x:l.spawnX,y:l.spawnY}]).map(e=>({x:e.x,y:rocketHeight(l,e),h:60}))];
  for(const [i,s]of trees.entries()){
   const box=forestTreeBounds(s);
   for(const d of doors)assert.equal(hit(box,{left:d.x-48,right:d.x+48,top:d.y-d.h,bottom:d.y+20}),false,l.name+' door');
   for(const o of l.objects||[])assert.equal(hit(box,{left:o.x-25,right:o.x+(o.w||0)+25,top:Math.min(o.y,o.top??o.y,o.toY??o.y)-30,bottom:Math.max(o.y+(o.h||0),o.bottom??o.y,o.toY??o.y)+25}),false,l.name+' '+o.type);
   for(const other of trees.slice(i+1))assert.equal(hit(box,forestTreeBounds(other)),false,l.name+' overlapping trees');
  }
 }
});
test('trees remain sparse and confined to forest soil while the sawmill stays clear',()=>{
 for(const l of CAMPAIGN)assert.ok(forestTreePlacements(l).length<=4);
 for(const l of CAMPAIGN.filter(l=>l.theme!=='woodland'))assert.deepEqual(forestTreePlacements(l),[]);
 assert.deepEqual(forestTreePlacements(CAMPAIGN.find(l=>l.id===3)),[]);
 assert.equal(CAMPAIGN.filter(l=>forestTreePlacements(l).length>0).length,9);
});
