import {Game} from '../src/engine.js';
export function solveSweet(id){const g=new Game(id),i=g.level.bonusSweet,jobs=[];let lastJob=-1000,held=false,released=false;
for(let tick=0;tick<60000&&!g.result;tick++){
 const u=g.units.find(u=>u.id===0),crowd=g.units.find(u=>u.id===2);
 if(!held&&crowd?.state==='walk'){g.assign(2,'attract');held=true;}
 if(!u&&!released&&g.saved){g.assign(2,'walk');released=true;}
 if(!u){g.step();continue;}
let job=null;
if(i===2&&u.state==='mine'&&u.x>350&&u.y<300){g.assign(0,'walk');job='dig';}
if(i===2&&u.state==='dig'&&u.y>382){g.assign(0,'walk');job='mine';}
if(i===2&&u.state==='mine'&&u.x>435){g.assign(0,'walk');job='bash';}
if(i===4&&u.state==='dig'&&u.y>440){g.assign(0,'walk');job='bash';}
if(u.state==='walk'&&tick-lastJob>12){
if(i===0){if(u.y<400&&u.dir===1){if(u.x>192&&u.x<360)job='bash';else if(u.x>385&&u.x<557)job='build';}if(u.y>500&&u.dir===-1&&u.x<620&&u.x>410)job='build';}
if(i===1){if(u.y>500&&u.dir===1&&u.x>325&&u.x<610)job='build';if(u.y<500&&u.dir===-1&&u.x<642&&u.x>340)job='platform';}
if(i===2){if(u.x>170&&u.x<200&&u.y<200)job='mine';else if(u.x>650&&u.x<850&&u.y>500)job='bash';}
if(i===3){if(u.dir===1&&(u.x>80&&u.x<800))job='build';}
if(i===4){if(u.dir===-1&&u.x<532&&u.y<200)job='dig';if(u.dir===1&&u.x>405&&u.x<595&&u.y>500)job='bash';if(u.dir===1&&u.x>595&&u.x<725&&u.y>500)job='build';}
}
if(job&&g.stock[job]>0){const r=g.assign(u.id,job);if(r.ok){jobs.push([job,Math.round(u.x),Math.round(u.y)]);lastJob=tick;}}g.step();}

return g;}
