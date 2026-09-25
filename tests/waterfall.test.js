import test from 'node:test';
import assert from 'node:assert/strict';
import {LEVELS} from '../src/levels.js';
import {Game} from '../src/engine.js';
import {waterfallRoutes} from '../src/waterfall-art.js';
test('every authored waterfall lands in unobstructed level water',()=>{
 for(const level of LEVELS){const game=new Game(level.id);for(const fall of waterfallRoutes(level)){
  assert.equal(level.hazard,'water');assert.equal(fall.waterY,game.hazardY);assert.ok(fall.sourceY>0&&fall.sourceY<fall.waterY);
  for(let x=Math.floor(fall.x-fall.width*.7);x<=fall.x+fall.width*.7;x++)for(let y=fall.waterY-12;y<game.height;y++)assert.equal(game.at(x,y),0,`Level ${level.id+1}: receiving water must stay clear`);
 }}
});
test('waterfalls remain continuous to the bottom of taller maps',()=>{
 const source=LEVELS.find(l=>l.waterfallTheme==='waterfall'),level={...source,height:source.height+200};
 assert.equal(waterfallRoutes(level)[0].waterY,level.height-28);
 assert.equal(waterfallRoutes(level).length,1);
 assert.deepEqual(waterfallRoutes(LEVELS[0]),[]);
});
