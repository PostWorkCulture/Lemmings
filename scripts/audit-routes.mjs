import {Game} from '../src/engine.js';
import {readFileSync} from 'node:fs';
const routes=JSON.parse(readFileSync(new URL('../tests/difficulty-routes.json',import.meta.url)));
for(const index of Array.from({length:15},(_,i)=>i+5)){
 const g=new Game(index);const remove=g.remove.bind(g);g.remove=(u,saved)=>{if(!saved)console.log("PIONEER LOST",index+1,g.tick,JSON.stringify(u));remove(u,saved);};let job=0,held=false,released=false,lastAction=0;
 for(let t=0;t<60000&&!g.result;t++){
 const p=g.units.find(u=>u.id===0),b=g.units.find(u=>u.id===1),r=routes[index][job];
 if(r&&p?.state==='walk'&&Math.abs(p.y-r[1])<2&&p.dir===r[3]&&(r[3]===1?p.x>=r[0]:p.x<=r[0])){g.assign(0,r[2]);job++;lastAction=g.tick;}
 if((job>0||index>=5)&&!held&&b?.state==='walk'){g.assign(1,'block');held=true;}
 if(job===routes[index].length&&!released&&g.tick-lastAction>250){g.assign(1,'walk');released=true;}
 g.step();
 }
 console.log(index+1,g.result,g.saved,g.lost,'jobs',job,'remaining',g.units.slice(0,2));
}