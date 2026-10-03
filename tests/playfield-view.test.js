import test from 'node:test';
import assert from 'node:assert/strict';
import {CAMPAIGN} from '../src/levels.js';
import {syncPlayfieldScale,playfieldPoint,spriteHitDistance,withNaturalSprite} from '../src/playfield-view.js';

function fixture(width,height,worldHeight=1000){
 const canvas={width:1000,height:worldHeight,getBoundingClientRect:()=>({left:12,top:80,width,height})};
 let matrix=[1,0,0,1,0,0];const stack=[];
 const context={canvas,save(){stack.push([...matrix]);},restore(){matrix=stack.pop();},translate(x,y){matrix[4]+=matrix[0]*x;matrix[5]+=matrix[3]*y;},scale(x,y){matrix[0]*=x;matrix[3]*=y;},point(x,y){return {x:(matrix[0]*x+matrix[4])*width/1000,y:(matrix[3]*y+matrix[5])*height/worldHeight};}};
 return {canvas,context};
}
test('all thirty maps map visible coordinates back exactly at desktop, ultrawide and portrait sizes',()=>{
 for(const level of CAMPAIGN)for(const [width,height] of [[3440,1260],[2560,920],[1920,920],[1440,740],[390,674]]){
  const displayHeight=level.scrollMode==='vertical'?width/1000*level.height:height;
  const {canvas}=fixture(width,displayHeight,level.height);
  for(const [x,y]of [[0,0],[1000,level.height],[level.spawnX,level.spawnY],[level.exitX,level.exitY],[431.8,level.height*.61]]){
   const point=playfieldPoint(canvas,12+x*width/1000,80+y*displayHeight/level.height);
   assert.ok(Math.abs(point.x-x)<1e-8);assert.ok(Math.abs(point.y-y)<1e-8);
  }
 }
});
test('natural sprites remain square and anchored while wide terrain fills the screen',()=>{
 for(const [width,height]of [[2560,900],[390,670],[1000,1000]]){
  const {canvas,context}=fixture(width,height);syncPlayfieldScale(canvas);
  const before=context.point(650,720);
  withNaturalSprite(context,650,720,()=>{
   const anchor=context.point(650,720),right=context.point(660,720),above=context.point(650,710);
   assert.deepEqual(anchor,before);assert.ok(Math.abs((right.x-anchor.x)-(anchor.y-above.y))<1e-8);
  });
  assert.deepEqual(context.point(660,720),{x:660*width/1000,y:720*height/1000});
 }
});
test('nested exit and drowning character renders compensate once and always restore on failure',()=>{
 const {canvas,context}=fixture(2560,900);syncPlayfieldScale(canvas);
 withNaturalSprite(context,500,200,()=>{
  const first=context.point(510,200);
  withNaturalSprite(context,500,200,()=>assert.deepEqual(context.point(510,200),first));
 });
 assert.throws(()=>withNaturalSprite(context,500,200,()=>{throw Error('draw failed');}),/draw failed/);
 assert.deepEqual(context.point(510,200),{x:1305.6,y:180});
 withNaturalSprite(context,500,200,()=>assert.equal(Math.round(context.point(510,200).x),1289));
});
test('ordinary review and icon contexts remain unaffected',()=>{
 const {context}=fixture(200,94);const before=context.point(150,50);
 withNaturalSprite(context,100,40,()=>assert.deepEqual(context.point(150,50),before));
});

test('pointer selection follows the proportion-corrected sprite centre on wide and portrait displays',()=>{
 for(const [width,height]of [[2560,900],[390,670]]){
  const {canvas}=fixture(width,height),scale=syncPlayfieldScale(canvas),uniform=Math.min(scale.x,scale.y);
  const centre={x:500,y:700-12*uniform/scale.y};
  assert.ok(spriteHitDistance(canvas,centre,500,700)<1e-8);
  assert.ok(Math.abs(spriteHitDistance(canvas,{...centre,x:500+25*uniform/scale.x},500,700)-25)<1e-8);
 }
});

test('portrait width-fit maps keep pointer targeting exact after vertical centring',()=>{
 const width=390,availableHeight=670;
 for(const level of CAMPAIGN.filter(l=>l.scrollMode==='none')){
  const height=Math.min(availableHeight,width*level.height/1000),top=80+(availableHeight-height)/2;
  const {canvas}=fixture(width,height,level.height);canvas.getBoundingClientRect=()=>({left:0,top,width,height});
  const scale=syncPlayfieldScale(canvas);assert.ok(Math.abs(scale.x-scale.y)<1e-8);
  const centre=playfieldPoint(canvas,level.spawnX*scale.x,top+level.spawnY*scale.y-12*scale.x);
  assert.ok(spriteHitDistance(canvas,centre,level.spawnX,level.spawnY)<1e-8);
 }
});
