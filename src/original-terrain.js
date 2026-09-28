import {TERRAIN_CLEARANCES} from './terrain-clearances.js';

// Each journey gets its own material composition. These are solid landforms, not scenery.
const descriptions={
 woodland:[['Hollow oak','A great hollow trunk, mossy roots and a sheltered passage beneath the crown.'],['Fallen boughs','Three broken timber spans rise from thick roots; repair the gaps between them.'],['Burrow descent','Broad root shelves wrap around the descent into a quiet woodland hollow.'],['Sawmill heartwood','Cut timber, exposed growth rings and a root cellar frame the working press.'],['Canopy return','A high branch leads left, curling down into the tree’s root system.'],['Badger tunnels','A sweeping root bridge shelters the lower burrow and the return journey.'],['Acorn terraces','Three substantial root buttresses form a staircase through the tree.'],['Inside the trunk','One enormous heartwood mass encloses three connected chambers.'],['Root cellar','A deep root shelf gives the miner a real body of timber to cut through.'],['Moonlit crown','Thick climbing boughs join a low entrance to the upper canopy.']],
 beach:[['Dune gateway','Sunlit sandstone shoulders surround the scout’s gate and its sand-filled approach.'],['Wind-carved dune','A broad dune curls around its hollow, with sun-worn strata beneath the ridges.'],['Tidal sandstone','Carved sandstone islands make the moving crossing part of a sheltered inlet.'],['Sandstone harbour','A weathered sandy headland cradles the drawbridge and rescue landing.'],['Coastal headland','Layered cliffs fold around an exposed high-level route.'],['Sandstone steps','Rounded sandstone buttresses support an ascent through three dune terraces.'],['Buried oasis','A single great dune encloses three passages beneath its sandy shell.'],['Sandglass hollow','A tapering neck links the upper dune to a wide lower basin.'],['Wind gallery','A carved sandstone loop takes the route down and back up inside the headland.'],['Last sandbar','Four long dune shoulders build a connected journey from shore to summit.']],
 alpine:[['Split glacier','Two immense snow-capped glacier walls enclose the sheltered lower cavern.'],['Summit stair','Three pointed snowy buttresses form a climb from the mountain foot.'],['Frozen arch','A natural ice arch holds the upper route above its broad cavern.'],['Avalanche bowl','Two opposing snowy cliffs surround one deep, sheltered bowl.'],['Iceberg interior','A single mountain of blue ice contains a winding three-storey passage.'],['Snowshoe switchback','Snow-capped spurs carry the winding ascent through a continuous rock mass.'],['Ice cathedral','Pointed peaks and translucent ice faces surround the cathedral’s three chambers.'],['Snow cornice','A projecting snow shelf folds into a sheltered ridge below.'],['Hidden summit','Four snow-capped mountain shoulders conceal the highest landing.'],['Glacier loop','A crevassed blue glacier carries the route down and back through its heart.']],
 candy:[['Giant chew crossing','Oversized rounded chews and lolly sticks form the route itself.'],['Tablet ravine','Chalky tablets, rolled wrappers and fizzy sweets create a substantial crossing.'],['Sherbet chambers','A giant packet becomes an excavatable adventure through its centre.'],['Lolly heights','Bold round lollies and substantial sweet rolls provide the climbing route.'],['Pick-and-mix journey','A small collection of giant recognisable sweets forms one connected expedition.'],['Refresher ravine','The chew and violet rolls shelter the bounce and lower crossing.'],['Double Dip depths','Explore the chambers inside one enormous orange-and-cherry packet.'],['Drumstick descent','Mine into the chew and follow the rounded tablet shelf below.'],['Love Hearts ascent','Broad sweet rolls form a climb from the lowest chew to the highest landing.'],['Sweet-bag loop','A winding route through oversized chews, rolls and a portal-linked lower chamber.']],
 volcano:[['Broken caldera','Fractured obsidian cliffs contain the descent above a glowing lava floor.'],['Basalt rendezvous','Two dark volcanic shoulders fold into the sheltered meeting chamber.'],['Magma circuit','A chain of basalt shelves curls around the machinery and lower crossing.'],['Three craters','Three solid volcanic chambers connect through gates and paired portals.'],['Furnace heart','A vast fractured basalt body wraps around the ascent and the final escape.'],['Cinder crossing','A ferry traverses a recessed lava basin carved into the basalt.'],['Obsidian labyrinth','Three connected chambers cut through one huge volcanic mass.'],['Ashfall chute','Dig through the basalt neck into the lower volcanic gallery.'],['Chimney climb','Four fractured rock spurs take the route upward through a giant chimney.'],['Emberjaw loop','A basalt loop encloses the portal descent and the climb back to the middle chamber.']]
};
export function terrainIdentity(level){if(level.sweetReboot!==undefined||level.connectedStudy!==undefined)return {name:level.name,description:level.hints[0],variant:level.sweetReboot??level.connectedStudy};const i=level.campaignIndex%10;const [name,description]=descriptions[level.theme]?.[i]||['Landscape',''];return {name,description,variant:i};}
const cache=new Map();
// Called once per level revision, before anyone spawns. All painting uses this exact mask.
export function sculptOriginalTerrain(game){
 if(game.level.connectedStudy!==undefined)return;
 const l=game.level;if(l.terrainRework===false||l.id>=50||!descriptions[l.theme])return;
 const cached=cache.get(l);if(cached){game.terrain.set(cached);return;}
 const source=game.terrain.slice(),w=1000,h=game.height,identity=terrainIdentity(l),variant=identity.variant;
 if(l.theme==='candy'){cache.set(l,source);return;}
 const keep=new Uint8Array(250*Math.ceil(h/4));const spans=TERRAIN_CLEARANCES[l.id]||[];
 for(let n=0;n<spans.length;n+=3)keep.fill(1,spans[n]*250+spans[n+1],spans[n]*250+spans[n+2]);
 const protect=(x,y,width,height)=>{for(let yy=Math.max(0,Math.floor(y/4));yy<Math.min(Math.ceil(h/4),Math.ceil((y+height)/4));yy++)keep.fill(1,yy*250+Math.max(0,Math.floor(x/4)),yy*250+Math.min(250,Math.ceil((x+width)/4)));};
 for(const slope of l.slipperySlopes||[])protect(slope.x-20,slope.y-20,slope.w+40,slope.h+40);
 // Authored mountain crests and climb/slide profiles are gameplay geometry.
 for(const shape of l.shapes||[])if(shape.contour)for(let j=0;j<shape.points.length;j++){
  const a=shape.points[j],b=shape.points[(j+1)%shape.points.length],steps=Math.ceil(Math.hypot(b[0]-a[0],b[1]-a[1])/4);
  for(let k=0;k<=steps;k++){const t=steps?k/steps:0;protect(a[0]+(b[0]-a[0])*t-5,a[1]+(b[1]-a[1])*t-5,11,11);}
 }
 const safe=(x,y)=>!keep[Math.floor(y/4)*250+Math.floor(x/4)];
 const ground=game.hazardY-3;
 // Organic edges remove the ruler-straight undersides without touching working ledges.
 // Steel and the full exit footprint retain their original support.
 for(let x=41;x<960;x++){
  let start=-1;
  for(let y=0;y<=ground;y++){
   const solid=source[y*w+x]===1;
   if(solid&&start<0)start=y;
   if(!solid&&start>=0){const depth=y-start;
    if(depth>32){const notch=Math.round(5+5*Math.sin(x*.023+variant)+4*Math.sin(x*.061+variant*.8));
     for(let yy=Math.max(start+20,y-notch);yy<y;yy++)if(safe(x,yy))game.terrain[yy*w+x]=0;
    }start=-1;
   }
  }
 }
 // Choose substantial existing shelves as the roots of each new landform.
 const shelves=[];
 for(let y=70;y<ground-50;y++){let left=-1;for(let x=40;x<=960;x++){
  const edge=x<960&&source[y*w+x]>0&&!source[(y-1)*w+x];
  if(edge&&left<0)left=x;
  if(!edge&&left>=0){if(x-left>115)shelves.push({x:left,y,w:x-left});left=-1;}
 }}
 shelves.sort((a,b)=>b.w-a.w);
 const chosen=[];for(const s of shelves){if(chosen.some(o=>Math.abs(o.y-s.y)<65&&Math.abs(o.x-s.x)<120))continue;chosen.push(s);if(chosen.length>=3)break;}
 for(const [j,s]of chosen.entries()){
  const rootX=s.x+s.w*(.24+((variant+j*2)%5)*.12),rootW=Math.min(s.w*.58,125+(variant%3)*22),depth=Math.min(ground-s.y,150+(variant%4)*35);
  for(let y=s.y+8;y<Math.min(ground,s.y+depth);y++){
   const t=(y-s.y)/depth;
   // Timber tapers into a spreading root; sandstone forms an eroded arch foot;
   // glaciers and basalt break into asymmetric, broad buttresses.
   let half=rootW*(l.theme==='woodland'?(.62-.26*Math.sin(t*Math.PI)+.4*t*t):l.theme==='beach'?(.76-.42*Math.sin(t*Math.PI)+.48*t):(.8-.28*t+.18*Math.sin(t*5+j)));
   const mid=rootX+Math.sin(t*2.8+j+variant)*22;
   for(let x=Math.max(40,Math.floor(mid-half));x<Math.min(960,mid+half);x++)if(!source[y*w+x]&&safe(x,y))game.terrain[y*w+x]=1;
  }
 }
 // A few oversized connected forms establish the silhouette of each adventure.
 // The coordinates describe distinct, deliberately sparse compositions rather than tiled props.
 const roots=[
  [[80,.88,160,.7,95,.32,230,.15,66],[850,.94,735,.8,800,.62,650,.55,48]],
  [[120,.92,290,.83,215,.49,295,.38,65],[865,.94,720,.77,775,.5,660,.3,58]],
  [[810,.95,760,.6,415,.67,150,.26,60]],
  [[70,.95,185,.68,90,.51,270,.31,61],[890,.93,670,.85,760,.63,610,.43,57]],
  [[130,.93,250,.79,150,.56,330,.36,54],[880,.79,745,.69,850,.28,620,.14,62]],
  [[210,.88,440,.8,345,.38,155,.21,68],[865,.92,720,.7,870,.56,700,.39,54]],
  [[160,.94,85,.78,340,.62,400,.44,68],[830,.91,710,.65,805,.38,670,.23,60]],
  [[95,.9,240,.69,100,.35,255,.17,65],[875,.9,710,.63,880,.29,725,.13,75]],
  [[170,.9,260,.73,95,.48,300,.3,75],[850,.94,695,.83,755,.57,650,.39,51]],
  [[860,.93,730,.72,855,.48,700,.22,68],[170,.86,300,.69,145,.47,340,.25,54]]
 ];
 const stamp=(x,y,rx,ry)=>{for(let yy=Math.max(35,Math.floor(y-ry));yy<Math.min(ground,y+ry);yy++){
  const half=rx*Math.sqrt(Math.max(0,1-((yy-y)/ry)**2));
  for(let xx=Math.max(40,Math.floor(x-half));xx<Math.min(960,x+half);xx++)if(!source[yy*w+xx]&&safe(xx,yy))game.terrain[yy*w+xx]=1;
 }};
 if(l.theme==='woodland'||l.theme==='beach')for(const [j,r]of roots[variant].entries()){
  const [ax,ay,bx,by,cx,cy,dx,dy,radius]=r;
  for(let k=0;k<=48;k++){const t=k/48,z=1-t,px=z*z*z*ax+3*z*z*t*bx+3*z*t*t*cx+t*t*t*dx,py=(z*z*z*ay+3*z*z*t*by+3*z*t*t*cy+t*t*t*dy)*h;
   const size=radius*(1-.38*t)*(l.theme==='beach'?1.36:1);stamp(px,py,size,size*(l.theme==='beach'?.8:1));
  }
 }
 if(l.theme==='alpine'||l.theme==='volcano')for(const [j,s]of chosen.entries()){
  const peakX=s.x+s.w*(.32+((variant+j)%3)*.17),rise=Math.min(s.y-45,110+((variant+j)%4)*40),half=Math.min(s.w*.47,175);
  for(let y=Math.max(40,s.y-rise);y<s.y;y++){
   const t=(y-(s.y-rise))/rise,span=half*t;
   for(let x=Math.max(40,Math.floor(peakX-span));x<Math.min(960,peakX+span);x++)if(!source[y*w+x]&&safe(x,y))game.terrain[y*w+x]=1;
  }
 }
 // Remove detached specks after the protected route corridors have cut the new forms.
 // A new piece must join original solid ground; it cannot be floating decoration.
 const seen=new Uint8Array(source.length),queue=new Int32Array(source.length),regions=new Uint16Array(source.length);let region=0;
 for(let i=0;i<source.length;i++)if(source[i]&&!regions[i]){let head=0,tail=1;queue[0]=i;regions[i]=++region;while(head<tail){const p=queue[head++],x=p%w;for(const n of [p-w,p+w,...(x>0?[p-1]:[]),...(x<w-1?[p+1]:[])])if(n>=0&&n<source.length&&source[n]&&!regions[n]){regions[n]=region;queue[tail++]=n;}}}

 for(let i=0;i<source.length;i++)if(game.terrain[i]===1&&!source[i]&&!seen[i]){
  let head=0,tail=1,grounded=false,minX=w,maxX=0,minY=h,maxY=0,joinY=h;const joins=new Set();queue[0]=i;seen[i]=1;
  while(head<tail){const p=queue[head++],x=p%w;const py=Math.floor(p/w);minX=Math.min(minX,x);maxX=Math.max(maxX,x);minY=Math.min(minY,py);maxY=Math.max(maxY,py);if(py>=ground-2)grounded=true;for(const n of [p-w,p+w,...(x>0?[p-1]:[]),...(x<w-1?[p+1]:[])])if(n>=0&&n<source.length&&game.terrain[n]){if(source[n]){joins.add(regions[n]);joinY=Math.min(joinY,Math.floor(n/w));}else if(!seen[n]){seen[n]=1;queue[tail++]=n;}}}
  const buttress=joins.size>0&&maxY-minY>80&&maxY-joinY>70&&maxX-minX>60;
  if((joins.size<2&&!grounded&&!buttress)||tail<90)for(let n=0;n<tail;n++)game.terrain[queue[n]]=0;
 }
 // Round the outside corners of the actual terrain. Clearance
 // masks protect working feet, excavation envelopes and equipment, not just art.
 const snapshot=game.terrain.slice(),left=new Uint16Array(snapshot.length),right=new Uint16Array(snapshot.length),up=new Uint16Array(snapshot.length),down=new Uint16Array(snapshot.length),radius=25;
 for(let y=0;y<h;y++)for(let x=0;x<w;x++){const i=y*w+x,solid=!!snapshot[i];left[i]=x&&!!snapshot[i-1]===solid?Math.min(radius,left[i-1]+1):1;up[i]=y&&!!snapshot[i-w]===solid?Math.min(radius,up[i-w]+1):1;}
 for(let y=h-1;y>=0;y--)for(let x=w-1;x>=0;x--){const i=y*w+x,solid=!!snapshot[i];right[i]=x<w-1&&!!snapshot[i+1]===solid?Math.min(radius,right[i+1]+1):1;down[i]=y<h-1&&!!snapshot[i+w]===solid?Math.min(radius,down[i+w]+1):1;}
 for(let y=40;y<ground;y++)for(let x=41;x<959;x++){const i=y*w+x;if(snapshot[i]!==1||!safe(x,y))continue;
  for(const [dx,dy,sx,sy]of [[left[i],up[i],-1,-1],[right[i],up[i],1,-1],[left[i],down[i],-1,1],[right[i],down[i],1,1]]){
   if(dx>=radius||dy>=radius||(radius-dx)**2+(radius-dy)**2<=radius**2)continue;
   const a=snapshot[i+sx*dx],b=snapshot[i+sy*dy*w];if(a===0&&b===0){game.terrain[i]=0;break;}
  }
 }
 cache.set(l,game.terrain.slice());
}
