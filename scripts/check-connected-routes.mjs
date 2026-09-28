import {solveConnected} from '../tests/connected-solution.js';
import {writeFileSync,readFileSync} from 'node:fs';
const records=JSON.parse(readFileSync('src/original-rescue-routes.json'));const results=[];
const first=Number(process.argv[2]||60),last=Number(process.argv[3]||109);
for(let id=first;id<=last;id++){const g=solveConnected(id,{limit:18000,debug:process.argv.includes('--debug')});const result={id,name:g.level.name,saved:g.saved,total:g.level.total,lost:g.lost,tick:g.tick,result:g.result,events:g.events.length,skills:[...new Set(g.events.filter(e=>e.skill!=='walk').map(e=>e.skill))],units:g.units.slice(0,3).map(u=>[u.id,Math.round(u.x),Math.round(u.y),u.dir,u.state])};console.log(JSON.stringify(result));results.push(result);if(g.saved===g.level.total)records[id]={ticks:g.tick,events:g.events};}
writeFileSync('review-output/connected/results.json',JSON.stringify(results,null,2));writeFileSync('src/original-rescue-routes.json',JSON.stringify(records));
