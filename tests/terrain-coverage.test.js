import test from 'node:test';
import assert from 'node:assert/strict';
import {Game} from '../src/engine.js';

test('each campaign chapter includes a majority-terrain adventure',()=>{
  for(const id of [0,6,14,19]){
    const game=new Game(id);
    let solid=0;
    for(let y=0;y<game.height;y++)for(let x=0;x<1000;x++)if(game.at(x,y))solid++;
    assert.ok(solid/(1000*game.height)>.5,`${game.level.name} must contain more terrain than empty space`);
  }
});
