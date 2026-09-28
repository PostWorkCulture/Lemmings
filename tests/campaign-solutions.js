import {solveConnected} from './connected-solution.js';
import {solveReboot} from './sweet-reboot-solution.js';
import {solveSweet} from './sweet-solutions.js';
import {solveExpansion} from './expansion-solutions.js';
import {solveMountain} from './mountain-solutions.js';

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { Game } from '../src/engine.js';
import { LEVELS } from '../src/levels.js';

import {solvePuzzle} from './puzzle-solutions.js';
const advanced=JSON.parse(readFileSync(new URL('./difficulty-routes.json',import.meta.url)));
const routes=[[[384,220,'build'],[550,220,'dig']],[[284,235,'build'],[589,235,'build']],[[280,140,'dig'],[540,250,'dig']],[[324,310,'build'],[505,280,'dig'],[684,390,'build']],[[636,160,'build'],[450,160,'dig'],[391,280,'build']]];
export function solveLevel(index){if(LEVELS[index].connectedStudy!==undefined)return solveConnected(index);if(LEVELS[index].sweetReboot!==undefined)return solveReboot(index);if(LEVELS[index].bonusSweet!==undefined)return solveSweet(index);if(LEVELS[index].expansion)return solveExpansion(index).g;if(LEVELS[index].mountainRoutes)return solveMountain(index);if(LEVELS[index].puzzleId)return solvePuzzle(index).g;const g=new Game(index);let job=0,held=false,released=false,lastAction=0;
 for(let t=0;t<60000&&!g.result;t++){
  const p=g.units.find(u=>u.id===0),b=g.units.find(u=>u.id===1),r=(routes[index]||advanced[index])[job];
  if(r&&p?.state==='walk'&&Math.abs(p.y-r[1])<2&&p.dir===(r[3]||g.level.dir)&&((r[3]||g.level.dir)===1?p.x>=r[0]:p.x<=r[0])){assert.ok(g.assign(0,r[2]).ok);job++;lastAction=g.tick;}
  if((job>0||index>=5)&&!held&&b?.state==='walk'){assert.ok(g.assign(1,'block').ok);held=true;}
  if(job===(routes[index]||advanced[index]).length&&!released&&g.tick-lastAction>250){assert.ok(g.assign(1,'walk').ok);released=true;}
  g.step();
 }
 return g;
}
