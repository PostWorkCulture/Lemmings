import {Game} from '../src/engine.js';
export function solvePuzzle(id,variant='perfect',omit=null){
 const g=new Game(id),done=new Set();if(omit)g.stock[omit]=0;
 const act=(key,uid,skill,condition)=>{if(done.has(key))return;const u=g.units.find(u=>u.id===uid);if(u&&condition(u,g)&&!g.canAssign(u,skill)){g.assign(uid,skill);done.add(key);}};
 const at=(key,uid,skill,x,y,dir=1)=>act(key,uid,skill,u=>u.state==='walk'&&u.dir===dir&&Math.abs(u.y-y)<2&&(dir===1?u.x>=x:u.x<=x));
 for(let t=0;t<50000&&!g.result;t++){
  if(id===5){at('hold',1,'attract',105,300);at('stack',0,'stack',260,300);at('build',0,'build',260,264);at('bash',0,'bash',690,300);at('bridge',0,'platform',764,300);if(done.has('bridge')&&g.tick>4500)act('release',1,'walk',()=>true);if(done.has('release'))at('unstack',1,'bash',244,300);}
  if(id===6){at('hold',1,'attract',105,340);at('build',0,'build',284,340);act('dune',0,'bash',u=>u.state==='walk'&&u.dir===1&&u.x>=432);at('bridge',0,'platform',684,340);at('tomb',0,'bash',811,340);if(done.has('tomb')&&g.tick>5000)act('release',1,'walk',()=>true);}
  if(id===15){at('hold',1,'attract',105,300);at('jump',0,'jump',460,300);at('drop',0,'dig',575,260);at('bash',0,'bash',631,300);at('bridge',0,'build',774,300);if(done.has('bridge')&&g.tick>4500)act('release',1,'walk',()=>true);}
  if(id===16){at('bridge',0,'build',334,220);at('chimney',0,'bash',731,220);at('roofs',0,'platform',804,220);at('climb',1,'climb',150,450);at('back',1,'turn',340,450);at('tunnel',1,'bash',315,450,-1);if(done.has('tunnel'))at('home',1,'turn',220,450,-1);}

  if(id===3){at('run',0,'run',150,300);at('hold',1,'attract',105,300);at('bridge',0,'platform',524,300);if(g.disabledObjects.has('press')&&g.tick>4500)act('release',1,'walk',()=>true);}
  if(id===9){at('float',0,'float',150,140);at('hold',1,'attract',105,140);at('bash',0,'bash',511,380);at('bridge',0,'platform',604,380);if(done.has('bridge')&&g.tick>4500)act('release',1,'walk',()=>true);}
  if(id===12){if(variant==='demolition'){at('blast',0,'explode',444,320);at('bridge',1,'build',584,320);}else{at('bash',0,'bash',441,320);at('bridge',0,'build',584,320);}}
  if(id===13){at('swim',0,'swim',150,300);at('hold',1,'attract',105,300);at('bash',0,'bash',751,300);at('bridge',0,'build',820,300);if(done.has('bridge')&&g.tick>5000)act('release',1,'walk',()=>true);}
  if(id===18){at('bridge',0,'build',324,190);at('bash2',1,'bash',732,340,-1);at('bash3',2,'bash',241,500);}
  if(id===19){at('hold',1,'attract',105,160);at('bridge',0,'build',314,160);at('float',0,'float',430,160);at('shaft',0,'dig',470,160);at('wait',0,'block',600,400);if(done.has('wait')&&g.tick>4500)act('release',1,'walk',()=>true);if(done.has('release'))at('repair',1,'platform',448,160);if(g.saved===19){act('last',0,'walk',()=>true);at('return',0,'turn',600,400);}}
  g.step();
 }
 return {g,done:[...done]};
}
