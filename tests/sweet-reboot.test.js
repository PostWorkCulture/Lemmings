import test from 'node:test';import assert from 'node:assert/strict';
import {sweetObstacle,pathY} from '../src/sweet-reboot-terrain.js';
import {Game} from '../src/engine.js';import {CAMPAIGN,LEVELS} from '../src/levels.js';import {solveReboot} from './sweet-reboot-solution.js';import {earnedStars,isUnlocked} from '../src/progress.js';import {sweetPoint,SWEET_STUDIES} from '../src/sweet-reboot-levels.js';
for(let id=50;id<60;id++){
 test(`${LEVELS[id].name}: complete rescue, replay, useful skills and three-star target`,()=>{
  const solved=solveReboot(id);assert.equal(solved.saved,solved.level.total);assert.equal(solved.lost,0);assert.equal(solved.result,'win');assert.equal(earnedStars(solved.level,{completed:true,saved:solved.saved,lost:0,ticks:solved.tick}),3);
  for(const skill of Object.keys(solved.level.stock))assert.ok(solved.events.some(e=>e.skill===skill),'unused tool '+skill);
  const replay=new Game(id);let cursor=0;while(!replay.result&&replay.tick<=solved.tick){while(solved.events[cursor]?.tick===replay.tick){const e=solved.events[cursor++];assert.ok(replay.assign(e.id,e.skill).ok);}replay.step();}assert.equal(replay.saved,replay.level.total);assert.deepEqual(replay.terrain,solved.terrain);
 });
 test(`${LEVELS[id].name}: meaningful obstacles and prototype doorway alignment`,()=>{const g=new Game(id),s=SWEET_STUDIES[id-50];for(const gap of s.gaps){const o=sweetObstacle(g.level,'gap',[gap[0],gap[2]]),x=Math.round((o.x+sweetPoint([gap[1],gap[2]])[0])/2),y=Math.round(pathY(o.path,x));assert.equal(g.at(x,y),0,'broken crossing must remain open');}
 assert.deepEqual([g.level.spawnX,g.level.spawnY],sweetPoint(s.entry));assert.deepEqual([g.level.exitX,g.level.exitY],sweetPoint(s.exit));const start=g.terrain.slice();for(let t=0;t<10000&&!g.result;t++)g.step();assert.ok(g.saved<g.level.target,'level must require player input');assert.deepEqual(g.terrain,start);});
}
test('new sweet saves do not inherit stars from the withdrawn sweets',()=>{const old=Object.fromEntries(Array.from({length:10},(_,i)=>[40+i,{stars:3}]));assert.ok(CAMPAIGN.every(l=>l.sweetReboot===undefined));assert.equal(isUnlocked(50,old),false);});
