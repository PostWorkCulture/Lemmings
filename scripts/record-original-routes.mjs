import {writeFileSync} from 'node:fs';
import {solveLevel} from '../tests/campaign-solutions.js';
import {LEVELS} from '../src/levels.js';
const routes=[];for(const level of LEVELS){const g=solveLevel(level.id);if(g.saved!==level.total||g.lost)throw new Error('Rescue failed: '+level.name);routes[level.id]={ticks:g.tick,saved:g.saved,events:g.events};}
writeFileSync('src/original-rescue-routes.json',JSON.stringify(routes));
console.log('Recorded fifty complete rescue demonstrations.');
