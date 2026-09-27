const box=(x,y,w,h,type=1)=>({type,points:[[x,y],[x+w,y],[x+w,y+h],[x,y+h]]});
const ridge=(x,y,w,rise)=>({type:1,contour:true,points:[...Array.from({length:w/2+1},(_,i)=>[x+i*2,y-Math.round(Math.sin(Math.PI*i*2/w)**2*rise)]),[x+w,y+4],[x,y+4]]});
export function mountainAdventures(levels){
 function set(id,name,height,spawn,exit,terrain,shapes,objects,stock,routes,hints){Object.assign(levels[id],{name,height,spawnX:spawn[0],spawnY:spawn[1]-50,dir:spawn[2]||1,exitX:exit[0],exitY:exit[1],terrain,shapes,objects,stock,hints,mountainRoutes:routes,puzzleId:null,solutionId:null,entrances:null,ascent:null,exitChamber:null,oneWay:[],slipperySlopes:[],setPieces:[],bottomEntry:spawn[1]>height*.65,rocketY:spawn[1]>height*.65?spawn[1]-100:90,targetTime:420,interval:130});}
 set(10,'The Split Glacier',1000,[105,300],[100,700],[[40,300,360,650,1],[465,300,495,650,1],[40,700,920,250,1],[40,240,12,60,2],[948,640,12,60,2]],
 [box(40,610,850,90,0),box(883,300,35,400,0),box(180,230,50,70),box(600,620,50,80),ridge(270,300,80,15),ridge(710,300,120,20)],
 [{type:'pole',x:880,y:300,bottom:700,dir:-1}],{bash:2,platform:1,block:1},[[160,300,'bash',1],[384,300,'platform',1],[672,700,'bash',-1]],['Open the snow gate and cross the split glacier.','The far-side rescue pole leads into the cavern under the ice. Tunnel left to the sheltered exit.']);
 set(11,'Stairway to the Summit',1120,[105,920],[880,420],[[40,920,320,160,1],[400,670,290,410,1],[730,420,230,660,1],[310,670,55,35,1],[640,420,60,35,1],[40,860,12,60,2],[948,360,12,60,2]],
 [box(550,600,50,70),ridge(430,670,90,16),ridge(760,420,70,12)],
 [{type:'ladder',x:320,y:920,top:670,dir:1},{type:'ladder',x:650,y:670,top:420,dir:1}],{platform:2,bash:1,block:1},[[347,670,'platform',1],[530,670,'bash',1],[682,420,'platform',1]],['Start at the mountain foot and work upward through two broken ledges.','The ladders provide height; prepare the crossings and clear the snow plug before releasing the group.']);
 // The fossil puzzle becomes a single enormous natural ice bridge over its starting cavern.
 const fossil=levels[12];fossil.name='The Frozen Arch';fossil.terrain.push([40,344,560,126,1],[670,344,290,208,1]);fossil.shapes.push({type:1,contour:true,points:[[40,320],[40,130],[95,95],[145,160],[185,185],[225,320]]});
 set(13,'Across the Avalanche Bowl',1100,[105,200],[885,200],[[40,200,260,850,1],[700,200,260,850,1],[40,850,920,200,1],[40,140,12,60,2],[948,140,12,60,2]],
 [box(268,200,34,650,0),box(40,760,740,90,0),box(400,850,70,200,0),box(170,130,40,70),box(590,775,50,75),ridge(720,200,80,15)],
 [{type:'pole',x:265,y:200,bottom:850,dir:1},{type:'ladder',x:780,y:850,top:200,dir:1}],{bash:2,platform:1,block:1},[[148,200,'bash',1],[384,850,'platform',1],[568,850,'bash',1]],['Descend one cliff into the sheltered bowl, then cross its broken floor.','Open the frozen passage and climb the opposite face to the summit exit.']);
 set(14,'Inside the Iceberg',1160,[105,340],[875,940],[[40,130,920,980,1]],
 [box(70,255,815,85,0),box(835,340,50,350,0),box(200,600,685,90,0),box(200,690,50,250,0),box(200,850,735,90,0),box(480,340,65,140,0),box(505,940,70,170,0),box(600,600,42,90),ridge(290,340,100,18),ridge(650,940,120,20)],
 [{type:'pole',x:832,y:340,bottom:690,dir:-1},{type:'pole',x:253,y:690,bottom:940,dir:1}],{platform:2,bash:1,block:1},[[464,340,'platform',1],[666,690,'bash',-1],[489,940,'platform',1]],['Travel inside a single great iceberg. The route turns down, left, and down again.','Bridge the fissures, clear the middle ice wall, and use the rescue poles to reach the bottom chamber.']);
}
