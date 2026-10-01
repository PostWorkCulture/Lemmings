import {Game} from '../src/engine.js';
import {CONNECTED_ROUTES,connectedPoint} from '../src/connected-levels.js';
import {connectedObstacle,connectedCrossing,pathY} from '../src/connected-terrain.js';
export function solveConnected(id,{limit=30000,debug=false}={}){
 const g=new Game(id),s=CONNECTED_ROUTES[g.level.connectedStudy],used=new Set();let held=false,released=false,last=0;
 for(let t=0;t<limit&&!g.result;t++){
  const u=g.units.find(u=>u.id===0),holder=g.units.find(u=>u.id===1);
  if(g.stock.float||g.units.some(u=>u.abilities?.float))for(const unit of g.units)if(!unit.abilities?.float)g.assign(unit.id,'float');
  if(!held&&holder?.state==='walk'&&u&&Math.hypot(holder.x-u.x,holder.y-u.y)>77){if(g.assign(1,'attract').ok)held=true;}
  if(!u&&g.saved>0&&held&&!released){g.assign(1,'walk');released=true;}
  if(u&&['platform','build'].includes(u.state))for(const [i,gap] of s.gaps.entries())if(used.has('g'+i)){const far=connectedPoint(g.level,[u.dir>0?gap[1]:gap[0],gap[2]])[0];if((u.x-far)*u.dir>6&&(u.x-far)*u.dir<20&&g.at(u.x+u.dir*2,u.y+4))g.assign(0,'walk');}
  if(u?.state==='bash')for(const [i,wall]of s.walls.entries())if(used.has('w'+i)){const {x,y}=connectedObstacle(g.level,'wall',wall),distance=(u.x-(u.dir>0?x+18:x))*u.dir;if(distance>7&&distance<14&&Math.abs(u.y-y)<24)g.assign(0,'walk');}
  if(u?.state==='walk'){
   for(const [i,shaft] of (s.shafts||[]).entries()){const [x,y]=connectedPoint(g.level,shaft);if(!used.has('d'+i)&&Math.abs(u.x-x)<2&&Math.abs(u.y-y)<6){if(g.assign(0,'dig').ok)used.add('d'+i);}}
   for(const [i,wall] of s.walls.entries()){const {x,y}=connectedObstacle(g.level,'wall',wall),ahead=(x+(u.dir<0?18:0)-u.x)*u.dir;if(ahead>0&&ahead<9&&Math.abs(u.y-y)<22&&u.state==='walk'&&(!used.has('w'+i)||g.at(x+9,y-12))){if(g.assign(0,'bash').ok)used.add('w'+i);}}
   for(const [i,gap] of s.gaps.entries()){const {x,y,right,rise}=connectedCrossing(g.level,gap),ahead=((u.dir>0?x:right)-u.x)*u.dir;
    if(ahead>2&&ahead<11&&Math.abs(u.y-y)<20&&u.state==='walk'&&!used.has('g'+i)){const job=rise?'build':'platform';if(g.assign(0,job).ok)used.add('g'+i);}}
  }
  if(debug&&u&&t-last>400){console.log(t,Math.round(u.x),Math.round(u.y),u.dir,u.state);last=t;}
  const prev=u&&{dir:u.dir,state:u.state};g.step();if(debug&&u&&(u.dir!==prev.dir||u.state!==prev.state))console.log('change',g.tick,Math.round(u.x),Math.round(u.y),u.dir,u.state);
 }
 return g;
}
