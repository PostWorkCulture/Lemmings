import {writeFileSync} from 'node:fs';
import {solveLevel} from '../tests/campaign-solutions.js';
import {Game} from '../src/engine.js';
import {LEVELS} from '../src/levels.js';
const clearances=[];
for(const level of LEVELS)level.terrainRework=false;
for(const level of LEVELS){
 const solved=solveLevel(level.id),g=new Game(level.id),mask=new Uint8Array(250*Math.ceil(g.height/4));
 if(solved.saved!==level.total)throw Error(`Unsolved baseline ${level.id}`);
 function keep(x,y,rx,up,down){for(let yy=Math.max(0,Math.floor((y-up)/4));yy<Math.min(Math.ceil(g.height/4),Math.ceil((y+down)/4));yy++)mask.fill(1,yy*250+Math.max(0,Math.floor((x-rx)/4)),yy*250+Math.min(250,Math.ceil((x+rx)/4)));}
 const at=g.at.bind(g);g.at=(x,y)=>{const value=at(x,y);if(!value&&x>=0&&x<1000&&y>=0&&y<g.height)mask[Math.floor(y/4)*250+Math.floor(x/4)]=1;return value;};
 let cursor=0;
 while(g.tick<solved.tick&&!g.result){while(solved.events[cursor]?.tick===g.tick){const e=solved.events[cursor++],u=g.units.find(u=>u.id===e.id);keep(u.x,u.y,12,27,4);g.assign(e.id,e.skill);}if(g.tick%2===0)for(const u of g.units)if(!['saved','lost','exit'].includes(u.state))keep(u.x,u.y,10,26,2);g.step();}
 // Entrance, exit, and mechanisms need clear silhouettes and functional clearance.
 keep(level.exitX,level.exitY,52,80,15);
 for(const e of level.entrances||[{x:level.spawnX,y:level.spawnY}])keep(e.x,e.y,45,150,20);
 for(const o of level.objects||[]){if(o.type==='lavaPool'){keep(o.x+o.w/2,o.y,o.w/2+10,12,o.h+3);continue;}for(let y=Math.min(o.y,o.top??o.y,o.bottom??o.y,o.toY??o.y)-15;y<=Math.max(o.y,o.top??o.y,o.bottom??o.y,o.toY??o.y)+20;y+=20)keep(o.x+(o.w||0)/2,y,(o.w||0)/2+35,40,25);}
 const spans=[];for(let y=0;y<Math.ceil(g.height/4);y++){let start=-1;for(let x=0;x<=250;x++){const yes=x<250&&mask[y*250+x];if(yes&&start<0)start=x;if(!yes&&start>=0){spans.push(y,start,x);start=-1;}}}
 clearances[level.id]=spans;
 console.log(`${level.id+1} ${level.name}: ${spans.length/3} clearance spans`);
}
writeFileSync('src/terrain-clearances.js','// Authored route and machinery clearances, in four-pixel cells.\n// Generated from the pre-rework verified rescue routes; no runtime solution data.\nexport const TERRAIN_CLEARANCES='+JSON.stringify(clearances)+';\n');
