import {paintFreshCuts} from '../src/terrain-readability.js';
import test from 'node:test';import assert from 'node:assert/strict';
import {Game} from '../src/engine.js';
import {CONNECTED_ROUTES} from '../src/connected-levels.js';
import {connectedObstacle} from '../src/connected-terrain.js';
import {SWEET_STUDIES} from '../src/sweet-reboot-levels.js';
import {sweetObstacle} from '../src/sweet-reboot-terrain.js';
for(const id of [5,6,25,50,53,60,70,80,90,100])test(`Level ${id}: bashing a breakable leaves clear air instead of a floating cap`,()=>{
 const g=new Game(id),sweet=g.level.sweetReboot!==undefined,s=sweet?SWEET_STUDIES[g.level.sweetReboot]:CONNECTED_ROUTES[g.level.connectedStudy],wall=(sweet?sweetObstacle:connectedObstacle)(g.level,'wall',s.walls[0]);
 const initial=g.terrain.slice();g.spawned=g.level.total;g.stock.bash=1;g.units=[{id:0,x:wall.x-8,y:wall.y,dir:1,state:'walk',vy:0,jobTick:0}];assert.equal(g.assign(0,'bash').ok,true);
 for(let i=0;i<150;i++)g.step();
 for(let y=wall.y-37;y<wall.y;y++)for(let x=wall.x;x<wall.x+18;x++)assert.equal(g.terrain[y*1000+x],0,`remaining fragment at ${x},${y}`);
 assert.ok(g.at(wall.x+9,wall.y),'walking surface stays in place');
 const image={data:new Uint8ClampedArray(g.terrain.length*4)};
 paintFreshCuts(image,g,initial,[wall],[150,90,45],[230,190,110]);
 for(let y=wall.y-23;y<wall.y;y++)for(let x=wall.x;x<wall.x+18;x++)assert.equal(image.data[(y*1000+x)*4+3],0,'cleared barrier reveals the artwork without a dark scar');
});

test('new excavation stays visible without painting over an existing passage or constructed step',()=>{
 const g=new Game(5),initial=g.terrain.slice(),wall=connectedObstacle(g.level,'wall',CONNECTED_ROUTES[g.level.connectedStudy].walls[0]);
 const x=wall.x+5,y=wall.y+5;assert.ok(g.at(x,y));g.rect(x,y,6,6,0);g.rect(x+2,y+2,1,1,3);
 const mask=g.terrain.slice(),image={data:new Uint8ClampedArray(mask.length*4)};
 paintFreshCuts(image,g,initial,[wall],[150,90,45],[230,190,110]);
 const at=(xx,yy)=>(yy*1000+xx)*4;
 assert.equal(image.data[at(x,y)+3],255,'actual new tunnel has a visible material recess');
 assert.ok(image.data[at(x,y)]>60,'the cut does not reveal a flat black hole');
 assert.equal(image.data[at(x+2,y+2)+3],0,'constructed terrain is not covered by a recess');
 assert.equal(image.data[at(wall.x-4,wall.y-10)+3],0,'original walking passage receives no overlay');
 assert.deepEqual(g.terrain,mask,'presentation never changes the playable boundary');
});
