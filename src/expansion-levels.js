// Hand-authored journeys. Coordinates describe usable paths, not decorative platforms.
const B=(x,y,w,h,type=1)=>({type,points:[[x,y],[x+w,y],[x+w,y+h],[x,y+h]]});
export const EXPANSION_PLANS=[
 ['The Badger Burrow',760,[[100,850,220,[['bash',270,65],['trampoline',530,120]]],[850,160,560,[['bash',650,90],['build',410,60]]]],false,'Follow the roots across the broken ridge, then descend into the burrow and work back to the left.'],
 ['Acorn Staircase',980,[[110,350,800,[['bash',210,48]]],[350,670,560,[['build',470,60]]],[670,875,290,[['bash',760,50]]]],false,'Climb the three root terraces. Repair the middle crossing before bringing the crowd uphill.'],
 ['Heartwood Hollow',1000,[[100,880,260,[['bash',220,75],['platform',540,65]]],[880,180,540,[['bash',670,80],['platform',470,60]]],[180,850,830,[['bash',350,75],['build',630,60]]]],true,'Hollow out a route inside one giant trunk. The rescue poles turn the path through three chambers.'],
 ['The Root Cellar',810,[[105,410,250,[['bash',240,60]],'mine'],[480,865,390,[['build',570,65],['bash',740,50]]]],false,'Mine diagonally through the root shelf at the bend, land in the cellar, and bridge toward daylight.'],
 ['Moonlit Canopy',1080,[[890,620,900,[['platform',780,60]]],[620,160,650,[['bash',470,80],['build',290,60]]],[160,870,330,[['bash',330,60],['platform',610,65]]]],false,'Start on the right and climb across the canopy. Keep a bridge for the final broken branch.'],
 ['Sandstone Steps',900,[[110,350,750,[['bash',220,50]]],[350,670,510,[['platform',475,60]]],[670,875,270,[['bash',755,55]]]],false,'Work up the sandstone terraces. A safe route needs both a tunnel and a level crossing.'],
 ['The Buried Oasis',1050,[[110,865,250,[['platform',330,65],['bash',610,70]]],[865,170,550,[['bash',650,65],['build',410,60]]],[170,875,880,[['platform',350,65],['bash',610,70]]]],true,'Descend through the buried chambers. The final oasis lies beneath the whole dune.'],
 ['The Sandglass',820,[[875,570,210,[['bash',745,65]],'dig'],[570,130,350,[['platform',410,60],['bash',250,65]]],[130,865,650,[['build',370,60],['bash',650,80]]]],false,'Open the narrow neck of the sandglass, then cross the lower bowl from left to right.'],
 ['Wind-carved Gallery',960,[[105,875,250,[['bash',240,100],['build',520,60]]],[875,200,720,[['platform',670,65],['bash',430,90]]],[200,850,450,[['bash',370,70],['platform',610,60]]]],false,'Descend to the low gallery before climbing back into the sheltered middle ledge.'],
 ['The Last Sandbar',1110,[[120,360,930,[['platform',235,60]]],[360,880,690,[['bash',490,70],['build',710,65]]],[880,180,440,[['bash',670,65],['platform',430,65]]],[180,850,200,[['bash',350,80],['build',590,60]]]],false,'A long ascent over four sandbars. Prepare each crossing with a scout, then release the waiting group.'],
 ['Snowshoe Switchback',1050,[[100,880,850,[['bash',245,65],['build',560,65]]],[880,200,570,[['platform',685,65],['bash',440,75]]],[200,860,280,[['bash',370,80],['platform',630,60]]]],false,'Climb back and forth across the snowy ridges, keeping a level bridge for the highest crevasse.'],
 ['The Blue Ice Cathedral',1160,[[110,870,280,[['platform',330,65],['bash',590,90]]],[870,175,590,[['bash',660,70],['build',420,65]]],[175,850,940,[['bash',370,85],['platform',650,65]]]],true,'Find a winding route through the cathedral of ice. The broad snow walls are all excavatable.'],
 ['Cornice Country',850,[[870,570,230,[['bash',740,80]],'dig'],[570,140,370,[['platform',400,65]]],[140,850,680,[['bash',310,70],['build',550,65]]]],false,'Dig through the cornice before crossing the lower ridge. Use the rescue pole to avoid the long fall.'],
 ['The Hidden Summit',1200,[[115,370,1020,[['bash',245,60]]],[370,850,760,[['platform',520,60]]],[850,190,490,[['bash',675,80],['build',440,65]]],[190,860,210,[['platform',390,65],['bash',650,85]]]],false,'The summit is reached from below. Four terraces conceal the final approach above the entrance.'],
 ['Glacier Loop',1080,[[110,930,230,[['bash',260,70],['platform',550,65]]],[930,160,830,[['build',650,65],['bash',420,75]]],[160,875,520,[['bash',340,80],['platform',615,65]]]],false,'Travel down to the glacier floor and back up inside the loop. The exit is on the middle ridge.'],
 ['The Ribbon Rehearsal',850,[[110,870,240,[['ferry',300,150],['bash',580,70]]],[870,150,650,[['platform',660,65],['bash',420,70]]]],false,'Ride the moving ferry across the first break. Release the scout gate, then follow the pole to the backstage passage.'],
 ['Backstage Labyrinth',1140,[[100,870,250,[['bash',230,75],['platform',500,65]]],[870,180,550,[['build',680,65],['bash',430,80]]],[180,865,900,[['bash',350,80],['platform',620,65]]]],true,'Cut through three enormous stage blocks. The route folds beneath itself to the final curtain.'],
 ['The Trapdoor Trick',880,[[110,430,220,[['bash',260,65]],'dig'],[430,865,360,[['platform',580,60],['bash',750,45]]],[865,150,700,[['bash',650,85],['build',390,65]]]],false,'Dig your own trapdoor through the stage, then prepare both crossings before the audience follows.'],
 ['Up in the Rigging',1160,[[870,600,970,[['bash',750,55]]],[600,140,720,[['platform',430,65]]],[140,830,450,[['bash',315,80],['build',580,65]]],[830,160,200,[['bash',650,80],['platform',390,65]]]],false,'Climb through four tiers of rigging. Each landing sends the crowd in a different direction.'],
 ['Encore in Reverse',1100,[[875,155,230,[['bash',710,85],['platform',420,65]]],[155,850,870,[['build',350,65],['bash',650,80]]],[850,180,530,[['bash',650,80],['platform',410,65]]]],false,'Begin at the right and take the violet portal to the wings. Climb into the central stage for the encore.'],
 ['The Refresher Ravine',850,[[110,870,230,[['bash',245,60],['trampoline',520,120]]],[870,150,650,[['build',650,65],['bash',390,65]]]],false,'Bash through the chew and bounce across the ravine. Use the pole, then build over the gap in the violet rolls.'],
 ['Double Dip Depths',1100,[[100,875,250,[['platform',320,65],['bash',590,85]]],[875,180,550,[['bash',665,80],['build',425,65]]],[180,850,880,[['bash',350,80],['platform',610,65]]]],true,'Explore the chambers inside a single enormous Double Dip packet. Cut through the chews and bridge the missing pieces.'],
 ['Drumstick Downfall',840,[[870,550,220,[['bash',730,70]],'mine'],[480,140,360,[['platform',390,60]]],[140,865,660,[['bash',320,65],['build',580,65]]]],false,'Bash past the Drumstick, then mine diagonally through the tablet shelf. Follow the lower rolls to the exit.'],
 ['Love Hearts High Road',1150,[[110,370,960,[['bash',235,65]]],[370,860,700,[['build',510,65]]],[860,170,450,[['bash',665,75],['platform',430,65]]],[170,850,200,[['bash',340,75],['platform',600,65]]]],false,'Climb from the low chew to the topmost Love Hearts roll. Every bridge brings the crowd closer to the high road.'],
 ['The Pick n Mix Marathon',1180,[[880,160,230,[['bash',700,80],['platform',430,65]]],[160,850,950,[['build',350,65],['bash',620,80]]],[850,180,600,[['bash',650,90],['platform',410,65]]]],false,'Take the violet portal to the bottom of the sweet bag, then climb back to the middle shelf. Save tools for the return journey.']
];
export function expansionLevels(){return EXPANSION_PLANS.map(([name,height,legs,mass,hint],index)=>{
 const group=Math.floor(index/5),theme=['woodland','beach','alpine','circus','candy'][group],chapter=['Freaky Forest · Deep Woods','Dunes · Lost Sands','Mountain Rescue · High Country','What a Circus! · Encore','Pick ’n’ Mix · Sweet Expedition'][group];
 const terrain=[],shapes=[],landforms=[],corridors=[],objects=[],routes=[],stock={block:1},sweetPieces=[];
 if(mass)terrain.push([35,120,930,height-160,1]);
 const first=legs[0],dir=Math.sign(first[1]-first[0]),bottomEntry=first[2]>height*.75;
 for(let i=0;i<legs.length;i++){
  const [a,b,y,jobs,transfer]=legs[i],d=Math.sign(b-a),left=Math.min(a,b)-55,right=Math.max(a,b)+55,depth=mass?height-y-40:Math.min(['dig','mine'].includes(transfer)?80:([1,3,4,5,9,10,13,14,17,18].includes(index)?height-y-40:160+(i%2)*25),height-y-40);
  corridors.push(B(left+(group===2?24:0),y-85,right-left-(group===2?48:0),85,0));
  if(!mass)landforms.push({type:1,points:[[left,y],[right,y],[right,y+depth-24],[right-60,y+depth-5],[left+(right-left)*.58,y+depth],[left+70,y+depth-12],[left,y+depth-40]]});
  const cuts=jobs.filter(j=>j[0]!=='bash').map(([,x,w])=>d===1?[x,x+w]:[x-w,x]).sort((a,b)=>a[0]-b[0]);let fragment=left;for(const [start,end]of [...cuts,[right,right]]){if(start>fragment)sweetPieces.push({x:fragment,y,w:start-fragment,h:depth,kind:index===23&&i===legs.length-1?3:[0,2,3,4,9][(i+index)%5]});fragment=end;}
  if(i===0){terrain.push([a-d*48-(d===1?12:0),y-55,12,55,2]);if(mass)shapes.push(B(a-30,0,60,y,0));}
  for(const [authoredSkill,x,w]of jobs){
   const skill=(group===3&&i===0&&authoredSkill==='bash')?'climb':authoredSkill;
   if(!['ferry','trampoline'].includes(skill))stock[skill]=(stock[skill]||0)+1;
   if(skill==='climb'){const id='scout-gate-'+i;objects.push({type:'gate',id,x:d===1?x:x-w,y:y-60,w,h:60},{type:'switch',x:x+d*4,y:y-60,target:id});routes.push([x-d*22,y,skill,d]);}
   else if(skill==='bash'){const gx=d===1?x:x-w;shapes.push({type:1,points:[[gx,y],[gx,y-48],[gx+8,y-62],[gx+w*.55,y-68],[gx+w-7,y-60],[gx+w,y-44],[gx+w,y]]});sweetPieces.push({x:d===1?x:x-w,y:y-65,w,h:65,kind:1});routes.push([x-d*22,y,skill,d]);}
   else{shapes.push(B(d===1?x:x-w,y,w,Math.min(140,depth+4),0));if(skill==='trampoline')objects.push({type:'trampoline',x:d===1?x-12:x+2,y,w:10,dir:d});else if(skill==='ferry')objects.push({type:'lift',x:(d===1?x:x-w)-5,y,toX:(d===1?x+w:x)-5,toY:y,w:60,period:720});else routes.push([x-d*16,y,skill,d]);}
  }
  if(theme==='alpine'){for(let rx=left+20;rx<right-60;rx+=20){if([a,b].some(e=>Math.abs(e-(rx+20))<75)||jobs.some(([,x,w])=>rx+40>Math.min(x,x+d*w)-50&&rx<Math.max(x,x+d*w)+50))continue;shapes.push({type:1,contour:true,points:[...Array.from({length:21},(_,j)=>[rx+j*2,y-Math.round(Math.sin(j*Math.PI/20)**2*10)]),[rx+40,y+3],[rx,y+3]]});break;}}
  const next=legs[i+1];
  if(next){const target=next[2];
   if((index===19||index===24)&&i===0){objects.push({type:'portal',id:'route-in',target:'route-out',x:b,y,color:'#ba80e8'},{type:'portal',id:'route-out',arrivalOnly:true,x:next[0],y:target,dir:Math.sign(next[1]-next[0]),color:'#ba80e8'});}else if(transfer==='mine'){stock.mine=1;routes.push([b-d*60,y,'mine',d]);}else if(transfer==='dig'){
    shapes.push(B(b-14,y+48,28,target-y-48,0));stock.dig=(stock.dig||0)+1;routes.push([b,y,'dig',d]);
    // The lower landing catches the descent; mining through it is not required.
    terrain.push([b-25,target,50,8,2]);
   }else{
    const type=target<y?'ladder':'pole';objects.push({type,x:b,y,...(type==='ladder'?{top:target}:{bottom:target}),dir:Math.sign(next[1]-next[0])});
    shapes.push(B(b-8,Math.min(y,target)+1,16,Math.abs(target-y)-1,0));
   }
  }
 }
 if([7,18].includes(index)){delete stock.block;stock.attract=1;}
 if(group===4&&mass){sweetPieces.splice(0,sweetPieces.length,{x:35,y:120,w:930,h:height-160,kind:5});}
 // Mountain paths pass through substantial, peaked snow masses rather than thin shelves.
 if(group===2){
  const peaks=[.38,.62,.27,.55,.72];
  if(mass){terrain.splice(0,1);landforms.unshift({type:1,contour:true,points:[[35,220],[150,150],[290,45],[430,130],[570,65],[735,160],[850,105],[965,240],[965,height-40],[35,height-40]]});}
  else for(let n=0;n<landforms.length;n++){
   const shape=landforms[n],left=shape.points[0][0],right=shape.points[1][0],y=shape.points[0][1],w=right-left;
   const peak=peaks[(index-10+n)%peaks.length],rise=Math.min(260,y-45);
   shape.contour=true;
   shape.points=[[left,y],[left,y-rise*.55],[left+w*.12,y-rise*.65],[left+w*peak,y-rise],[left+w*Math.min(.9,peak+.18),y-rise*.52],[right,y-rise*.55],[right,y],...shape.points.slice(2)];
  }
  if([11,12,14].includes(index)){stock.float=20;}
 }
 const last=legs.at(-1),exitX=last[1]-(index===8?30:0),exitY=last[2];
 return {id:20+index,difficulty:group===3?'Extreme':group<2||group===4?'Medium':'Hard',name,world:chapter,chapter,theme,hazard:group===2?'snow':group===3?'toys':group===4?'void':'water',height,total:20,target:group===3?19:18,targetTime:[135,120,210,120,150,120,210,150,210,210,195,210,150,210,210,165,210,150,210,195,135,210,150,210,195][index],interval:120,spawnX:first[0],spawnY:first[2]-45,rocketY:bottomEntry?first[2]-100:90,dir,bottomEntry,exitX,exitY,terrain,shapes:[...landforms,...corridors,...shapes],objects,stock,hints:[hint+(stock.climb?' Send a climber over the closed gate to reach its release switch.':'')+(stock.attract?' Use the Attractor to hold the crowd; Walker stops the music.':'')],expansion:true,expansionRoutes:routes,quietScenery:true,sceneryShelves:group===4?[]:legs.map(([a,b,y])=>[Math.min(a,b)-55,y,Math.abs(a-b)+110,100,1]),oneWay:[],slipperySlopes:[],setPieces:[],...(group===4?{sweetPieces,sweetBase:mass?'#e6b852':'#c5aecf'}:{})};
 });}
