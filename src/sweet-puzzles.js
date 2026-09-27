import {drawSweetKind} from './sweet-range.js';
import {sweetsLevel} from './sweets-concept.js';
// Each piece uses its painted alpha as its collision outline, including the folds and rounded ends.
const crops={0:[32,58,296,80],1:[139,30,82,140],2:[32,54,296,88],3:[32,51,296,95],4:[25,62,310,78],5:[89,25,182,168],6:[105,24,150,149],7:[117,18,126,171],8:[77,49,206,104],9:[61,55,238,91],10:[95,31,171,135],12:[117,18,126,172],13:[117,18,126,172],14:[117,18,126,172],15:[20,45,320,100],16:[18,37,325,121],17:[24,35,306,140]};
export const SWEET_PUZZLES=[
 {name:'The Drumstick Detour',idea:'Bash through the giant Drumstick gate, cross the tablet plateau, then descend the pole and bring everyone back across the lower sweet valley.',height:850,stock:{bash:3,build:7,platform:3,block:3},start:85,end:95,endFrom:550,pole:900,pieces:[[0,25,205,440,225],[1,215,82,155,160],[2,540,205,430,220],[9,540,585,430,210],[3,25,595,435,180]]},
 {name:'Watch Your Step',idea:'Start on a giant Fruit Salad, cross the lower sherbet valley, then climb to the candy watch. Repair its strap and finish on the Wham summit.',height:850,stock:{build:7,platform:3,bash:2,block:3},start:85,startFrom:500,end:95,ladder:710,pieces:[[4,25,185,345,205],[16,440,125,530,335],[9,25,595,415,190],[5,525,545,445,260]]},
 {name:'Sherbet Underground',idea:'The enormous Double Dip packet is the mountain itself. Mine a diagonal route through its layers, emerge onto the violet shelf and tunnel through the Drumstick plug.',height:850,stock:{mine:5,bash:4,build:5,dig:2,block:3},start:160,end:905,pieces:[[5,25,115,550,735],[2,480,560,490,260],[1,680,425,165,195]]},
 {name:'Lollipop Lookout',idea:'Follow the candy necklace up from the low chew. Bridge onto two huge lolly crowns, then cross to the high Love Hearts plateau. Save bridges for the final gap.',height:850,stock:{build:11,platform:3,block:3},start:80,end:907,pieces:[[0,25,605,330,195],[17,245,460,310,180],[12,490,450,285,390],[14,700,400,240,328],[3,730,420,250,170]]},
 {name:'The Custard Switchback',idea:'Walk left across a giant Wham ridge. Dig into its thick chew support, stop the dig and bash out sideways. Open the rescue chute in the custard basin so the crowd can descend safely, then bridge the final valley.',height:850,stock:{dig:3,bash:5,build:7,platform:2,block:3},start:884,end:905,dir:-1,endFrom:500,pieces:[[4,410,125,560,185],[1,430,270,190,305],[10,215,525,415,225],[1,205,435,100,280],[9,690,620,280,180]]}
];
export function prepareSweetPuzzle(index,art){
 const p=SWEET_PUZZLES[index],c=art.getContext('2d');art.width=1000;art.height=p.height;
 const tile=document.createElement('canvas');tile.width=360;tile.height=200;const t=tile.getContext('2d');
 for(const [kind,x,y,w,h] of p.pieces){drawSweetKind(t,kind);c.drawImage(tile,...crops[kind],x,y,w,h);}
 let data=c.getImageData(0,0,1000,p.height).data;
 const surface=(x,from=0)=>{for(let y=from;y<p.height-28;y++)if(data[(y*1000+x)*4+3]>110)return y;return null;};
 // Reserve the whole 74px arch plus a margin, on a gently sloping part of its destination sweet.
 const originalY=surface(p.end,p.endFrom||0);let landing=null;
 for(let distance=0;distance<=220&&!landing;distance++)for(const x of [p.end-distance,p.end+distance]){
  if(x<44||x>956)continue;const ys=Array.from({length:85},(_,j)=>surface(x+j-42,p.endFrom||0));
  if(ys.some(y=>y===null)||Math.max(...ys)-Math.min(...ys)>24||Math.abs(ys[42]-originalY)>24)continue;
  landing={x,y:Math.max(...ys),ys};break;
 }
 if(!landing)throw new Error('No fully supported exit landing: '+p.name);
 // Level the small lip using the sweet's own colour, and include it in the collision mask.
 for(let j=0;j<85;j++){const x=landing.x+j-42,y=landing.ys[j],k=((y+6)*1000+x)*4;c.fillStyle=`rgb(${data[k]},${data[k+1]},${data[k+2]})`;c.clearRect(x,y,1,landing.y-y);c.fillRect(x,landing.y,1,7);}
 data=c.getImageData(0,0,1000,p.height).data;const terrain=[];
 for(let y=0;y<p.height;y++){let start=-1;for(let x=0;x<=1000;x++){const solid=x<1000&&data[(y*1000+x)*4+3]>110;if(solid&&start<0)start=x;if(!solid&&start>=0){terrain.push([start,y,x-start,1,1]);start=-1;}}}
 const objects=[];if(p.pole){const y=surface(p.pole),bottom=surface(p.pole,550);objects.push({type:'pole',x:p.pole,y,bottom,dir:-1,surfaceExit:true});}if(p.ladder){objects.push({type:'ladder',x:p.ladder,y:surface(p.ladder,500),top:surface(p.ladder),dir:-1,surfaceExit:true});}
 if(index===4){objects.push({type:'switch',x:410,y:surface(410,500),target:'custard-chute'},{type:'pole',x:544,y:surface(544),bottom:443,dir:-1,requires:'custard-chute'});}
 return {...sweetsLevel(),height:p.height,objects,id:20+index,name:p.name,difficulty:'Medium',chapter:'Pick ’n’ Mix',world:'Pick ’n’ Mix',terrain,shapes:[],stock:p.stock,spawnX:p.start,spawnY:surface(p.start,p.startFrom||0)-4,exitX:landing.x,exitY:landing.y,dir:p.dir||1,targetTime:360+index*45,hints:[p.idea]};
}










