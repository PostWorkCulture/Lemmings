// Interactive maps use the same collision surface as the visible terrain.
export function adventureMaps(levels){
 const set=(id,terrain,objects,stock,route,hints)=>Object.assign(levels[id],{terrain,objects,stock,shapes:[],hints});
 // A ladder reaches the canopy; a bridge and a tunnel complete the route.
 set(5,[[40,330,250,95,1],[40,265,14,80,2],[230,230,250,40,1],[545,230,415,55,1],[730,170,28,60,1],[948,165,12,80,2]],
 [{type:'ladder',x:250,y:330,top:230,dir:1}],{block:2,build:2,dig:0,bash:2,climb:3,float:3},null,
 ['The ladder reaches the tree village.','Keep the crowd below while a scout prepares the crossing.','Build at the canopy edge, then bash through the trunk on the far side.']);
 Object.assign(levels[5],{spawnX:105,spawnY:280,dir:1,exitX:900,exitY:230});
 // An orbiting shuttle ferries the entire crowd; a basalt wall needs a tunnel.
 set(7,[[40,300,240,50,1],[40,235,14,80,2],[550,300,410,70,1],[740,255,30,45,1],[948,235,12,80,2]],
 [{id:'shuttle',type:'lift',x:275,y:300,toX:495,toY:300,w:60,period:720}],{block:2,build:1,dig:0,bash:1,float:4,run:2},null,
 ['The shuttle carries lemmings between the asteroids.','It pauses at each end. Prepare the far-side tunnel before releasing the crowd.','Bash the rock wall after landing. The shuttle route needs no bridge.']);
 Object.assign(levels[7],{spawnX:105,spawnY:250,dir:1,exitX:900,exitY:300,gravity:.12});
 set(9,[[40,140,390,35,1],[40,75,14,80,2],[320,280,290,50,1],[675,280,285,80,1],[820,230,26,50,1],[948,215,12,80,2]],
 [{type:'pole',x:405,y:140,bottom:280,dir:1}],{block:2,build:1,platform:1,dig:0,bash:1,float:4,turn:2},null,
 ['The pole makes the long drop safe.','A horizontal bridge uses fewer height changes on ice.','Slide down, platform across the gap, then bash through the ice boulder.']);
 Object.assign(levels[9],{spawnX:105,spawnY:90,dir:1,exitX:900,exitY:280});
 set(10,[[40,300,360,100,1],[40,235,14,80,2],[230,245,30,55,1],[465,300,495,110,1],[720,240,30,60,1],[948,235,12,80,2]],
 [],{block:2,build:1,dig:0,bash:2,platform:1,attract:2,turn:2},null,
 ['The gingerbread walls are soft enough to tunnel.','An attractor can gather the crowd while a scout works.','Bash both cookie walls and use a horizontal walkway over the syrup.']);
 Object.assign(levels[10],{spawnX:105,spawnY:250,dir:1,exitX:900,exitY:300});
 set(12,[[40,160,470,165,1],[40,95,14,80,2],[400,340,560,90,1],[948,275,12,80,2]],
 [],{block:2,build:0,dig:1,mine:2,float:3,explode:1},null,
 ['The fossil shelf is too high to walk off safely.','Mining makes a controlled diagonal descent through the rock.','Start mining before the shelf edge so the tunnel descends toward the lower floor.']);
 Object.assign(levels[12],{spawnX:105,spawnY:110,dir:1,exitX:900,exitY:340});
 set(15,[[40,300,260,55,1],[40,235,14,80,2],[390,300,210,50,1],[665,300,295,70,1],[948,235,12,80,2]],
 [{type:'trampoline',x:270,y:300,w:26,speed:2.4,vy:-5.4,dir:1}],{block:1,build:1,platform:1,dig:0,jump:4,attract:2},null,
 ['The trampoline throws the whole crowd over the first gap.','Prepare the second crossing before letting the crowd follow.','Bounce first, then bridge the gap from the middle island.']);
 Object.assign(levels[15],{spawnX:105,spawnY:250,dir:1,exitX:900,exitY:300});
 set(17,[[40,300,240,55,1],[40,235,14,80,2],[370,300,180,55,1],[640,300,320,80,1],[820,255,25,45,1],[948,235,12,80,2]],
 [{type:'trampoline',x:250,y:300,w:25,speed:2.4,vy:-5.4,dir:1},{type:'trampoline',x:520,y:300,w:25,speed:2.4,vy:-5.4,dir:1}],
 {block:1,build:0,dig:0,bash:1,jump:4,run:3,climb:2},null,
 ['Two springboards carry the team over the water.','The final hurdle needs a tunnel or a climb.','Let a scout bounce twice and bash the hurdle before the others arrive.']);
 Object.assign(levels[17],{spawnX:105,spawnY:250,dir:1,exitX:900,exitY:300});
 set(18,[[40,330,310,50,1],[40,265,14,80,2],[280,220,280,40,1],[625,220,335,55,1],[948,155,12,80,2]],
 [{type:'ladder',x:300,y:330,top:220,dir:1},{type:'switch',x:440,y:220,target:'beam'},{id:'beam',type:'laser',x:785,y:165,w:5,h:55,period:180,active:65}],
 {block:1,build:1,platform:1,dig:0,climb:3,float:3,turn:2},null,
 ['The maintenance ladder reaches the upper deck.','The lever shuts down the laser for everyone.','Walk over the lever before crossing the gap. Build or platform from the upper ledge.']);
 Object.assign(levels[18],{spawnX:105,spawnY:280,dir:1,exitX:900,exitY:220,gravity:.12});
 set(19,[[40,150,280,40,1],[40,85,14,80,2],[200,270,260,60,1],[550,270,180,45,1],[795,270,165,60,1],[865,225,24,45,1],[948,205,12,80,2]],
 [{type:'pole',x:290,y:150,bottom:270,dir:1},{type:'trampoline',x:430,y:270,w:25,speed:2.4,vy:-5.4,dir:1}],
 {block:1,build:1,platform:1,dig:0,bash:1,float:2,turn:2},null,
 ['Use the pole and springboard to travel beneath the falls.','Keep one scout ahead: the last island has a crystal barrier.','After the bounce, bridge the last gap and bash the crystal wall.']);
 Object.assign(levels[19],{spawnX:105,spawnY:100,dir:1,exitX:925,exitY:270});
 // Optional usable alternatives in the other worlds.
 levels[1].stock.platform=2;levels[1].stock.swim=3;
 levels[2].stock.float=4;levels[2].stock.mine=1;
 levels[3].objects=[{type:'switch',x:240,y:310,target:'press'},{id:'press',type:'crusher',x:270,y:235,w:25,h:75,period:240,active:60}];levels[3].stock.run=2;
 levels[4].stock.climb=2;levels[4].stock.float=3;
 levels[6].stock.mine=1;levels[6].stock.explode=1;
 levels[8].stock.platform=1;levels[8].stock.bash=1;
 levels[11].stock.stack=2;levels[11].stock.platform=3;
 levels[13].stock.platform=2;levels[13].stock.climb=3;
 levels[14].stock.jump=3;levels[14].stock.platform=3;
 levels[16].stock.float=3;levels[16].stock.mine=2;
 // Give the new terrain the same irregular, diggable rock undersides as the rest.
 for(const id of [5,7,9,10,12,15,17,18,19]){
  const l=levels[id];l.shapes=l.terrain.filter(r=>r[4]===1&&r[2]>100).map(([x,y,w,h],i)=>({type:1,points:[[x,y+h-1],[x+w,y+h-1],[x+w-12,y+h+12],[x+w*.63,y+h+22],[x+w*.3,y+h+13],[x+12,y+h+8]]}));
 }

 // Walkable dunes and gentle grassy ridges change the actual collision surface.
 for(const id of [1,4,14]){
  const l=levels[id];for(const [x,y,w,,type] of l.terrain){if(type!==1||w<150)continue;
   const height=id===1?13:id===14?18:8;
   l.shapes.push({type:1,points:[[x+40,y],[x+w*.4,y-height],[x+w*.62,y-height+3],[x+w-35,y],[x+40,y]]});
  }
 }

}
