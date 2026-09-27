import {candyNecklace,BRIDGE_BEADS,necklaceShapes} from './candy-beads.js';
import {LEVELS} from './levels.js';
const SWEETS=[
 {kind:'refresher',x:35,y:330,w:270,h:65,points:[[35,350],[42,346],[39,338],[57,342],[69,332],[270,330],[284,341],[300,336],[298,348],[305,354],[301,363],[305,378],[287,375],[271,393],[70,395],[56,381],[36,385],[40,372],[35,365]]},
 {kind:'chew',x:166,y:223,w:65,h:107,points:[[166,230],[173,224],[218,225],[227,230],[231,241],[228,316],[223,325],[212,334],[166,334]]},
 {kind:'violets',x:405,y:330,w:235,h:65,points:[[405,351],[412,340],[427,334],[607,330],[625,337],[637,347],[640,363],[635,381],[620,391],[432,395],[414,387],[405,375]]},
 {kind:'hearts',x:737,y:287,w:220,h:67,points:[[737,306],[744,302],[740,291],[759,296],[773,288],[920,287],[935,296],[951,291],[949,303],[957,310],[953,322],[957,340],[938,336],[923,351],[773,354],[757,343],[738,348],[742,332],[737,324]]}
];
export function sweetsLevel(necklace=false){return {...LEVELS[0],id:20,name:'The Pick ’n’ Mix Crossing',world:'Sweet Shop · Concept',theme:'candy',height:540,hazard:'void',total:20,target:18,interval:100,spawnX:82,spawnY:326,dir:1,exitX:906,exitY:288,entrances:null,bottomEntry:false,objects:[],shapes:[...SWEETS.map(s=>({type:1,points:s.points})),...(necklace?necklaceShapes():[])],oneWay:[],slipperySlopes:[],stock:{bash:3,build:5,climb:2,block:2},terrain:[],hints:['The giant Drumstick blocks the first wrapper. Bash through its soft centre.','Build over the gaps between the sweet rolls.','The Love Hearts roll is higher: start the last staircase early.']};}
function outline(c,points){c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();}
function oval(c,x,y,rx,ry,fill){c.fillStyle=fill;c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);c.fill();}
function gradient(c,y,h,colors){const g=c.createLinearGradient(0,y,0,y+h);colors.forEach(([at,color])=>g.addColorStop(at,color));return g;}
export function fitSweetText(c,label,size,maxWidth,maxHeight,outlineWidth=2){
 let fitted=Math.min(size,maxHeight*.8);c.font=`900 ${fitted}px Arial`;
 while(fitted>5&&c.measureText(label).width+outlineWidth*2>maxWidth){fitted-=.25;c.font=`900 ${fitted}px Arial`;}
 return fitted;
}
function text(c,label,x,y,size,fill,edge='#462f5c',width=2){c.save();const safe={Refreshers:[198,34],'PARMA VIOLETS':[170,27],'LOVE HEARTS':[139,28]}[label]||[180,32];fitSweetText(c,label,size,...safe,width);c.translate(x,y);c.scale(.5,.5);c.textAlign='center';c.textBaseline='middle';c.lineJoin='round';c.strokeStyle=edge;c.lineWidth=width;c.strokeText(label,0,0);c.fillStyle=fill;c.fillText(label,0,0);c.restore();}
function crease(c,x,y,dx,dy,alpha=.28){c.strokeStyle=`rgba(255,255,255,${alpha})`;c.lineWidth=1;c.beginPath();c.moveTo(x,y);c.quadraticCurveTo(x+dx*.3,y+dy*.7,x+dx,y+dy);c.stroke();c.strokeStyle='#36254735';c.beginPath();c.moveTo(x+1,y+2);c.lineTo(x+dx+1,y+dy+2);c.stroke();}
function grain(c,s,light,dark,count=250){for(let i=0;i<count;i++){const x=s.x+((i*137.13)%s.w),y=s.y+((i*53.71)%s.h);c.fillStyle=i%3?light:dark;c.fillRect(x,y,i%4===0?1.4:.6,.6);}}
function heart(c,x,y,r,fill){c.fillStyle=fill;c.beginPath();c.moveTo(x,y+r*.8);c.bezierCurveTo(x-r*1.7,y-r*.2,x-r*.8,y-r*1.5,x,y-r*.65);c.bezierCurveTo(x+r*.8,y-r*1.5,x+r*1.7,y-r*.2,x,y+r*.8);c.fill();}
function foilEnds(c,s,left,right){for(const [x,dir] of [[s.x,1],[s.x+s.w,-1]]){const g=c.createLinearGradient(x,0,x+dir*28,0);g.addColorStop(0,left);g.addColorStop(.4,right);g.addColorStop(.7,left);g.addColorStop(1,right);c.fillStyle=g;c.fillRect(Math.min(x,x+dir*29),s.y,29,s.h);for(let i=0;i<7;i++)crease(c,x+dir*3,s.y+10+i*7,dir*25,(3-i)*5,.5);}}
export function candyArtwork(c,onlyKind=null,necklace=false){
 c.clearRect(0,0,1000,540);
 for(const s of SWEETS){if(onlyKind&&s.kind!==onlyKind)continue;c.save();outline(c,s.points);c.clip();
 if(s.kind==='refresher'){
  c.fillStyle=gradient(c,s.y,s.h,[[0,'#1079a3'],[.2,'#75d9ea'],[.4,'#16b7df'],[.67,'#0796c5'],[1,'#075477']]);c.fillRect(s.x,s.y,s.w,s.h);
  foilEnds(c,s,'#176d96','#7edff2');
  // The yellow paper flashes bend around the blue, slightly inflated wrapper.
  c.fillStyle='#f6d04e';c.beginPath();c.moveTo(64,336);c.quadraticCurveTo(165,325,278,336);c.lineTo(270,348);c.quadraticCurveTo(164,339,67,348);c.fill();
  c.fillStyle='#f1ca46';c.beginPath();c.moveTo(67,380);c.quadraticCurveTo(170,388,274,378);c.lineTo(266,390);c.quadraticCurveTo(169,397,72,390);c.fill();
  for(let i=0;i<35;i++)oval(c,70+(i*47)%205,349+(i*17)%30,.7,.7,'#d1faff65');
  c.save();c.translate(170,368);c.rotate(-.025);c.font='italic bold 12px Georgia';c.fillStyle='#fff6dc';c.textAlign='center';text(c,'Refreshers',0,-3,31,'#fff16e','#fff9dc',4);text(c,'Refreshers',0,-3,31,'#ffe44f','#23548e',1.5);c.restore();
  for(const x of [62,80,258,282]){crease(c,x,335,5,18);crease(c,x,390,-9,-12);}
  crease(c,85,337,145,-1,.35);grain(c,s,'#ffffff16','#11314b13',200);
 }else if(s.kind==='chew'){
  // No printed name: the unwrapped chew is recognisable from its milky/raspberry layers.
  c.fillStyle=gradient(c,s.y,s.h,[[0,'#fff0bd'],[.17,'#ffe8a9'],[.47,'#efd395'],[.51,'#efa5b0'],[.77,'#e78aa2'],[1,'#b85d7c']]);c.fillRect(s.x,s.y,s.w,s.h);
  c.fillStyle='#fff0bb';c.beginPath();c.moveTo(166,263);c.bezierCurveTo(185,267,203,277,231,268);c.lineTo(231,278);c.bezierCurveTo(200,286,182,272,166,276);c.fill();
  c.fillStyle='#fff7d14d';c.beginPath();c.moveTo(175,232);c.quadraticCurveTo(169,274,177,316);c.lineTo(183,322);c.quadraticCurveTo(177,276,184,230);c.fill();
  c.fillStyle='#85405932';c.beginPath();c.moveTo(222,232);c.quadraticCurveTo(231,278,220,322);c.lineTo(214,327);c.quadraticCurveTo(221,275,218,232);c.fill();
  for(let i=0;i<15;i++)crease(c,180+(i*17)%40,239+(i*19)%75,4+(i%4),2,.18);
  grain(c,s,'#fff5dc44','#914c6025',400);oval(c,195,233,17,3,'#fff6d349');
 }else if(s.kind==='violets'){
  c.fillStyle=gradient(c,s.y,s.h,[[0,'#755495'],[.18,'#ded0ef'],[.4,'#b19bd1'],[.7,'#9677b7'],[1,'#533768']]);c.fillRect(s.x,s.y,s.w,s.h);
  foilEnds(c,s,'#402d81','#9f85d3');
  // The tablet cylinder shows through translucent lilac cellophane.
  for(let x=430;x<625;x+=14){c.strokeStyle='#63458155';c.lineWidth=1.4;c.beginPath();c.ellipse(x,363,6,29,0,-Math.PI/2,Math.PI/2);c.stroke();c.strokeStyle='#f3e4ff55';c.beginPath();c.ellipse(x-1,362,6,27,0,-Math.PI/2,Math.PI/2);c.stroke();}
  oval(c,419,364,13,28,'#8d6bab');oval(c,416,360,11,25,'#c6b1dc');oval(c,414,358,8,21,'#bda1d6');
  for(let i=0;i<5;i++){const a=i*Math.PI*2/5;oval(c,414+Math.cos(a)*4,359+Math.sin(a)*10,2.8,6,'#a58ac3');}oval(c,414,359,2,4,'#d8c7e8');
  c.fillStyle='#d5bfe79c';c.fillRect(434,347,184,28);text(c,'PARMA VIOLETS',525,361,21,'#6b285f','#fff0f4',3);
  crease(c,434,338,176,-3,.7);crease(c,438,386,170,-2,.35);for(let i=0;i<7;i++)crease(c,630,342+i*7,-12,4-i,.45);grain(c,s,'#fff7ff25','#46224a18');
 }else{
  c.fillStyle=gradient(c,s.y,s.h,[[0,'#baa6a2'],[.17,'#fff9e8'],[.4,'#f9ecda'],[.7,'#e9d2c4'],[1,'#aa859b']]);c.fillRect(s.x,s.y,s.w,s.h);
  foilEnds(c,s,'#cdbed3','#fff9ed');
  for(let x=778;x<920;x+=18){c.strokeStyle='#a682912a';c.lineWidth=1;c.beginPath();c.ellipse(x,320,6,31,0,-Math.PI/2,Math.PI/2);c.stroke();}
  c.save();c.translate(846,322);c.rotate(-.025);text(c,'LOVE HEARTS',0,0,22,'#e04462','#fffaf1',4);text(c,'LOVE HEARTS',0,0,22,'#dc4160','#8b486e',.8);c.restore();
  heart(c,784,309,7,'#d889a0');heart(c,911,334,6,'#cc7598');
  crease(c,778,296,139,-3,.8);crease(c,780,344,140,-2,.4);grain(c,s,'#ffffff35','#ab86921a',220);
 }
 c.restore();c.save();outline(c,s.points);c.strokeStyle='#160f223d';c.lineWidth=1.5;c.stroke();c.restore();
 }
 if(necklace)candyNecklace(c,BRIDGE_BEADS,12);
}
export function candyTerrain(game,canvas,art){
 const c=canvas.getContext('2d'),mask=document.createElement('canvas');mask.width=1000;mask.height=game.height;const m=mask.getContext('2d'),pixels=m.createImageData(1000,game.height);
 for(let i=0;i<game.terrain.length;i++)if(game.terrain[i])pixels.data[i*4+3]=255;m.putImageData(pixels,0,0);
 c.clearRect(0,0,1000,game.height);c.drawImage(art,0,0);c.globalCompositeOperation='destination-in';c.drawImage(mask,0,0);c.globalCompositeOperation='source-over';
 c.fillStyle='#efd25b';for(let y=0;y<game.height;y++)for(let x=0;x<1000;x++)if(game.terrain[y*1000+x]===3)c.fillRect(x,y,1,1);
}
