import test from 'node:test';
import assert from 'node:assert/strict';
import {Game} from '../src/engine.js';
import {objectInteraction} from '../src/objects.js';
import {solveExpansion} from './expansion-solutions.js';
for(const id of [35,36,37,38]){
 test(`lava basin ${id}: fitted containment and solvable crossing`,()=>{
  const g=new Game(id),p=g.level.objects.find(o=>o.type==='lavaPool');
  for(let y=p.y;y<p.y+p.h;y++){
   assert.equal(g.at(p.x-1,y),2);assert.equal(g.at(p.x+p.w,y),2);
   for(let x=p.x;x<p.x+p.w;x++)assert.equal(g.at(x,y),0,'liquid must occupy empty basin space');
  }
  for(let x=p.x;x<p.x+p.w;x++)assert.equal(g.at(x,p.y+p.h),2);
  const {g:solved}=solveExpansion(id);assert.equal(solved.saved,solved.level.total);assert.equal(solved.lost,0);
 });
}
test('lava contact kills with the shared effect, while a bridge and nearby bank remain safe',()=>{
 const g=new Game(35),p=g.level.objects.find(o=>o.type==='lavaPool');
 const falling={id:100,x:p.x+20,y:p.y+2,state:'fall',abilities:{swim:true}};
 assert.equal(objectInteraction(g,falling),true);assert.equal(g.lost,1);assert.equal(g.effects.at(-1).type,'splat');
 const crossing={id:101,x:p.x+20,y:p.y-10,state:'walk'};
 assert.equal(objectInteraction(g,crossing),false);
 const bank={id:102,x:p.x-8,y:p.y+2,state:'walk'};assert.equal(objectInteraction(g,bank),false);
 g.rect(p.x,p.y+4,p.w,4,3);
 const built={id:103,x:p.x+20,y:p.y+8,state:'walk'};assert.equal(objectInteraction(g,built),false);
});
