import {CONNECTED_WORLDS} from './connected-world-plans.js';
import {CONNECTED_ROUTES} from './connected-level-data.js';
export {CONNECTED_ROUTES};
export const CONNECTED_CHAPTERS=CONNECTED_WORLDS.map((w,i)=>({name:w.name,theme:['station','space','candy','sports','prehistoric'][i],difficulty:['Hard','Hard','Medium','Hard','Extreme'][i]}));
export const connectedPoint=(l,[x,y])=>[Math.round(20+x*.96),Math.round((l.artOffset??60)+y*l.artHeight/600)];
export function connectedLevels(){return CONNECTED_ROUTES.map((s,i)=>{const world=CONNECTED_WORLDS[Math.floor(i/10)],plan=world.levels[i%10],chapter=CONNECTED_CHAPTERS[Math.floor(i/10)],artHeight=Math.round(s.source[3]*960/s.source[2]);
 const dominant=[2,18,29,36,42].includes(i);
 const l={id:60+i,artOffset:dominant?20:60,...chapter,name:plan.name,chapter:chapter.name,world:chapter.name,connectedStudy:i,artHeight,height:dominant?artHeight+48:Math.max(470,artHeight+108),embeddedDoors:true,quietScenery:true,terrainRework:false,hazard:'void',terrain:[],shapes:[],objects:[],oneWay:[],setPieces:[],sceneryShelves:[],puzzleId:'connected-'+i};
 const start=s.paths[0],end=s.paths.at(-1);[l.spawnX,l.spawnY]=connectedPoint(l,start[0]);[l.exitX,l.exitY]=connectedPoint(l,end.at(-1));l.dir=Math.sign(start[1][0]-start[0][0]);l.rocketY=l.spawnY;l.bottomEntry=l.spawnY>l.exitY+100&&l.spawnY>l.height*.75&&s.ladders.length>0;
 l.total=[10,15,12,10,5,15,10,12,10,20][i%10];l.target=l.total-Math.floor(l.total/10);l.interval=185;l.targetTime=240;
 l.stock={attract:1,bash:s.walls.length+1,platform:s.gaps.length+1,build:s.gaps.length+1};if(s.shafts.length){l.stock.dig=s.shafts.length;if(s.shafts.some(a=>(a[2]-a[1])*artHeight/600>120))l.stock.float=l.total;}
 l.objects=s.ladders.map(([x,y,top,dir])=>({type:'ladder',x:connectedPoint(l,[x,y])[0],y:connectedPoint(l,[x,y])[1],top:connectedPoint(l,[x,top])[1],dir}));
 for(const shaft of s.shafts){const [x,y]=connectedPoint(l,[shaft[0],shaft[2]]),next=s.paths.reduce((best,p)=>{const distance=Math.min(...p.map(v=>Math.hypot(v[0]-shaft[0],v[1]-shaft[2])));return distance<best.d?{p,d:distance}:best;},{d:Infinity}).p;l.objects.push({type:'turnSign',x,y,dir:Math.sign(next.at(-1)[0]-next[0][0])});}
 l.targetTime=s.targetTime??240;if(s.stock)l.stock={...s.stock};
 l.hints=[plan.terrain,'Hold the crowd with an Attractor while a scout opens the solid obstructions and repairs the broken crossings.'+(s.shafts.length?' Dig through the shelf to reach the next passage.'+(l.stock.float?' Use parachutes for the long descent.':''):''),(s.ladders.length?'The pale ladders connect different heights. ':'')+'Release the Attractor when the route to the green exit is ready.'];return l;
 });}
