import test from 'node:test';
import assert from 'node:assert/strict';
import {Game,EXIT_FRAMES} from '../src/engine.js';
import {STRANDED_DELAY,STRANDED_TURN,STRANDED_BURST} from '../src/stranded.js';
function scene({trapped=true,state='walk',stock={},count=1}={}){
 const g=new Game();g.level={...g.level,total:count+2,target:2,exitX:850,exitY:300,objects:[],slipperySlopes:[],oneWay:[],hazard:'void'};
 g.terrain.fill(0);g.rect(20,300,960,20,2);
 if(trapped){g.rect(100,200,20,100,2);g.rect(400,200,20,100,2);}
 g.stock=stock;g.spawned=g.level.total;g.saved=1;
 g.units=Array.from({length:count},(_,id)=>({id,x:220+id*30,y:300,dir:1,state,vy:0,jobTick:0,steps:0}));
 g.remove({id:99,x:850,y:300,state:'exit'},true);return g;
}
const advance=(g,n)=>{for(let i=0;i<n;i++)g.step();};
test('stranded survivors turn after three seconds then burst once before results',()=>{
 const g=scene({state:'block',count:2}),terrain=g.terrain.slice();
 advance(g,STRANDED_DELAY-1);assert.ok(g.units.every(u=>u.state==='block'));assert.equal(g.result,null);
 g.step();assert.ok(g.units.every(u=>u.state==='stranded'));assert.equal(g.assign(0,'walk').ok,false);
 advance(g,STRANDED_TURN-1);assert.equal(g.effects.length,0);
 g.step();assert.equal(g.effects.filter(e=>e.type==='burst').length,2);assert.equal(g.lost,0);assert.equal(g.result,null);
 advance(g,STRANDED_BURST);assert.equal(g.lost,2);assert.equal(g.saved,2);assert.equal(g.result,'win');assert.equal(g.units.length,0);
 assert.deepEqual(g.terrain,terrain);assert.equal(g.effects.filter(e=>e.type==='splat').length,0);g.step();assert.equal(g.lost,2);
});
test('walking loops are detected without waiting forever',()=>{
 const g=scene();advance(g,STRANDED_DELAY);assert.equal(g.units[0].state,'stranded');
});
test('slow walkers and releasable blockers with a safe route are never auto-killed',()=>{
 for(const state of ['walk','block','attract']){const g=scene({trapped:false,state});advance(g,STRANDED_DELAY+STRANDED_TURN+STRANDED_BURST);assert.equal(g.lost,0);assert.equal(g.result,null);assert.notEqual(g.units[0].state,'stranded');if(state!=='walk')assert.equal(g.assign(0,'walk').ok,true);advance(g,1400);assert.equal(g.saved,g.level.total);assert.equal(g.lost,0);}
});
test('available rescue tools leave an apparently trapped group under player control',()=>{
 for(const skill of ['build','platform','stack','jump','climb']){const g=scene({stock:{[skill]:1}});advance(g,STRANDED_DELAY+150);assert.equal(g.lost,0);assert.notEqual(g.units[0].state,'stranded',skill);}
});
test('soft ground and spare diggers can still provide a way out',()=>{
 const g=scene({stock:{dig:1}});g.terrain.fill(0);g.rect(20,300,960,20,1);g.rect(100,200,20,100,2);g.rect(400,200,20,100,2);advance(g,400);assert.notEqual(g.units[0].state,'stranded');
});
test('a reverse route, portal or unvisited switch is still a rescue opportunity',()=>{
 const reverse=scene({trapped:false,state:'block'});reverse.units[0].dir=-1;reverse.units[0].releaseDir=-1;advance(reverse,400);assert.equal(reverse.lost,0);assert.equal(reverse.units[0].state,'block');
 const portal=scene();portal.level.objects=[{type:'portal',id:'a',x:300,y:300,target:'b'},{type:'portal',id:'b',x:820,y:300,arrivalOnly:true}];advance(portal,400);assert.equal(portal.saved,portal.level.total);assert.equal(portal.lost,0);
 const switchGame=scene();switchGame.level.objects=[{type:'switch',x:900,y:300,target:'gate'}];advance(switchGame,400);assert.notEqual(switchGame.units[0].state,'stranded');
});
test('moving machinery is treated as an uncertain future route',()=>{
 const g=scene();g.level.objects=[{type:'lift',x:500,y:300,toX:700,toY:100,w:40}];advance(g,400);assert.notEqual(g.units[0].state,'stranded');
});
test('wait for all spawns, active jobs and exit animations before closing the rescue',()=>{
 const pending=scene();pending.spawned=0;pending.level.interval=10000;pending.tick=1;advance(pending,400);assert.notEqual(pending.units[0].state,'stranded');
 const job=scene();job.units[0].state='build';advance(job,100);assert.equal(job.strandedCheck,null);
 const entering=scene();entering.units.push({id:20,x:850,y:300,dir:1,state:'exit',exitTick:0,exitStartX:850});entering.level.total++;entering.spawned++;
 advance(entering,EXIT_FRAMES);assert.equal(entering.lastRescueTick,EXIT_FRAMES);advance(entering,STRANDED_DELAY-1);assert.notEqual(entering.units[0].state,'stranded');entering.step();assert.equal(entering.units[0].state,'stranded');
});
test('no rescue means no auto-ending, and restart clears the ending state',()=>{
 const g=scene();g.lastRescueTick=null;advance(g,500);assert.notEqual(g.units[0].state,'stranded');g.lastRescueTick=g.tick;advance(g,STRANDED_DELAY);assert.equal(g.units[0].state,'stranded');g.reset();assert.equal(g.lastRescueTick,null);assert.equal(g.strandedCheck,null);assert.equal(g.effects.length,0);
});
test('player intervention invalidates a pending proof without changing live terrain in probes',()=>{
 const g=scene({stock:{bash:1}}),terrain=g.terrain.slice();advance(g,100);assert.equal(g.assign(0,'block').ok,false);g.stock.build=1;assert.equal(g.assign(0,'build').ok,true);advance(g,100);assert.notEqual(g.units[0].state,'stranded');assert.equal(g.lost,0);assert.ok(g.terrain.some((v,i)=>v!==terrain[i]));
});

test('turners and another lemming with a blocker can still reroute a rescue',()=>{
 for(const [skill,count]of [['turn',1],['block',2],['attract',2]]){const g=scene({stock:{[skill]:1},count});advance(g,400);assert.ok(g.units.every(u=>u.state!=='stranded'));assert.equal(g.lost,0);}
});
