import {Game} from '../src/engine.js';
export function solveExpansion(id){const g=new Game(id);let stage=0,held=false,released=false,last=0;for(let t=0;t<50000&&!g.result;t++){
 const scout=g.units.find(u=>u.id===0),crowd=g.units.find(u=>u.id===1),r=g.level.expansionRoutes[stage];
 if(!held&&crowd?.state==='walk'){g.assign(1,g.stock.attract?'attract':'block');held=true;}
 if(r&&scout?.state==='walk'&&scout.dir===r[3]&&Math.abs(scout.y-r[1])<3&&(r[3]===1?scout.x>=r[0]:scout.x<=r[0])){const result=g.assign(0,r[2]);if(!result.ok)throw Error(result.message);stage++;last=t;}
 if(stage===g.level.expansionRoutes.length&&!released&&t-last>450){g.assign(1,'walk');released=true;}
 g.step();}
 return {g,stage};}
