import {applyTerrainContours} from './terrain-contours.js';
import {applyPuzzleCampaign} from './puzzle-campaign.js';
import {LEVELS as BASE_LEVELS,THEMES} from './levels-base-for-authoring.js';
import {DIFFICULT_LAYOUTS} from './difficulty-layouts.js';
export {THEMES};
export const LEVELS=structuredClone(BASE_LEVELS);
for(const level of LEVELS){level.difficulty=['Easy','Medium','Hard','Extreme'][Math.floor(level.id/5)];level.height=470;}
for(const layout of DIFFICULT_LAYOUTS)Object.assign(LEVELS[layout.id],layout);

applyPuzzleCampaign(LEVELS);
for(const level of LEVELS)if(THEMES[level.theme].hazard==='snow')level.hazard='snow';

const targetTimes=[90,90,90,120,90,135,135,180,180,135,240,240,105,135,240,120,105,210,110,180];
for(const level of LEVELS)level.targetTime=targetTimes[level.id];

// Four coherent chapters. Keep the water-specialist puzzle in the beach chapter.
const coastalRescue=structuredClone(LEVELS[13]);
Object.assign(LEVELS[8],coastalRescue,{id:8,difficulty:'Medium',target:18,targetTime:135,solutionId:13});
Object.assign(LEVELS[13],structuredClone(DIFFICULT_LAYOUTS.find(l=>l.id===13)),{id:13,puzzleId:null,solutionId:null,oneWay:[],entrances:null,slipperySlopes:[],difficulty:'Hard',target:19,targetTime:240});
export const CHAPTERS=[
 {name:'Freaky Forest',theme:'woodland'},
 {name:"Dunes",theme:'beach'},
 {name:'Mountain Rescue',theme:'alpine'},
 {name:'What a Circus!',theme:'circus'}
];
const titles=['The Hollow Oak','Woodland Crossing','The Hidden Hollow','The Old Sawmill','Treetop Trail',
 'The Palm Grove Locksmith','The Shifting Dunes','Island Hopping','The Harbour Drawbridge','Clifftop Rescue',
 'The Snowbound Detour','The Frozen Pass','The Frozen Fossil','The Summit Expedition','The Crooked Ridge',
 'The Opening Act','Big-Top Rendezvous','The Championship Circuit','Three-Ring Rescue','Last Performer Home'];
for(const level of LEVELS){
 const chapter=CHAPTERS[Math.floor(level.id/5)];
 level.chapter=chapter.name;level.world=chapter.name;level.theme=chapter.theme;level.hazard=THEMES[chapter.theme].hazard;level.name=titles[level.id];
 level.setPieces=(level.setPieces||[]).map(p=>({...p,form:level.id>=15?'circus-rings':p.form}));
}


// Soft circus props are actual editable/climbable terrain.
LEVELS[15].terrain=LEVELS[15].terrain.filter(r=>!(r[0]===640&&r[1]===240));
LEVELS[15].shapes.push({type:1,points:Array.from({length:32},(_,i)=>[670+30*Math.cos(i*Math.PI/16),270+30*Math.sin(i*Math.PI/16)])});
LEVELS[15].circusProps=[{kind:'ball',x:640,y:240,w:60,h:60}];
LEVELS[16].circusProps=[{kind:'tent',x:250,y:360,w:60,h:90},{kind:'tent',x:740,y:160,w:24,h:60}];
LEVELS[18].circusProps=[{kind:'tent',x:700,y:280,w:26,h:60},{kind:'tent',x:250,y:440,w:26,h:60}];

LEVELS[16].shapes.push({type:1,points:[[250,360],[270,340],[290,340],[310,360]]});
LEVELS[16].circusProps[0]={kind:'tent',x:250,y:340,w:60,h:110};
LEVELS[16].objects.find(o=>o.type==='switch'&&o.target==='upper').y=340;

// Five bottom-entry expeditions: the original puzzle follows an ascent approach.
for(const id of [1,5,12,15,19]){
 const l=LEVELS[id],floor=l.height-40,top=l.spawnY+50;
 l.bottomEntry=true;l.rocketY=floor-50;l.spawnY=floor-24;l.ascent={floor,top};
 l.targetTime+=60;l.terrain.push([40,floor,260,12,2],[40,floor-45,12,45,2]);
 l.objects.push({type:'ladder',x:id===1?200:240,y:floor,top,dir:1,surfaceExit:true,requires:id===19?'ascent-winch':undefined});
 if(id===5){l.terrain.pop();l.terrain.pop();l.terrain.push([40,floor,100,12,2],[205,floor,95,12,2],[40,floor-45,12,45,2]);l.stock.platform++;}
 if(id===12){l.terrain.push([160,floor-42,26,42,1]);l.stock.bash++;}
 if(id===15){l.terrain.pop();l.terrain.pop();l.terrain.push([40,floor,100,12,2],[205,floor-32,95,12,2],[40,floor-45,12,45,2]);l.objects.at(-1).y=floor-32;l.stock.build++;}
 if(id===19){l.objects.push({type:'switch',x:130,y:floor-36,target:'ascent-winch'});l.stock.stack=1;l.stock.bash=1;}
 l.hints=['Start below the main route. Prepare the ascent and bring the whole group up to the higher exit.',...l.hints||[]];
}

// Preserve the sawmill's intended runner window after the longer arrival.
LEVELS[3].objects.find(o=>o.type==='crusher').phase=-Math.ceil((LEVELS[3].spawnY-90)/1.5);

LEVELS[19].interval=360;LEVELS[19].targetTime+=60;

// Matching portal colours lead to distinct upper destinations in Three-Ring Rescue.
for(const [i,x] of [600,750].entries()){
 const objects=LEVELS[18].objects,ladder=objects.find(o=>o.type==='ladder'&&o.x===x),color=['#46c8fa','#dc77f5'][i],label=['A','B'][i];
 objects.splice(objects.indexOf(ladder),1,
  {type:'portal',id:'portal-in-'+i,x,y:ladder.y,target:'portal-out-'+i,color,label},
  {type:'portal',id:'portal-out-'+i,x,y:ladder.top,dir:1,arrivalOnly:true,color,label});
}

LEVELS[12].interval=360;LEVELS[12].targetTime+=60;



export function rocketHeight(level,entrance){return level.rocketY??(level.entrances&&entrance!==level.entrances[0]?Math.max(90,entrance.y-20):90);}

// Keep inventories relevant: neither swimming below Woodland Crossing nor climbing
// Treetop Trail's boundary trunks provides a route toward the rescue exit.
delete LEVELS[1].stock.swim;
delete LEVELS[4].stock.climb;

// Raised sand replaces the distant sea throughout the beach chapter.
for(const level of LEVELS.slice(5,10))level.backgroundStyle='inland-beach';

// Extend the water downward without moving the playable shoreline.
for(const level of LEVELS.slice(5,10)){level.waterDepth=72;level.height+=44;}

// Describe the final chapter and entrance arrangement, after all layout overrides.
const chapterHints={
 5:['Bridge the small starting gap to reach the ladder into the palm grove.','The raised switch opens the gate below. Stack a foothold, then build up to the switch.','Hold the crowd with an Attractor. Clear the scaffold, tunnel through the wall and prepare the final crossing before releasing them.'],
 6:['Walk over the small dune; the steep dune sends uphill walkers sliding back.','Build across the first gap, then bash through the foot of the steep dune.','Use a Platform for the second gap and bash through the sand wall. Release the waiting crowd once the route is ready.'],
 8:['Send one Swimmer across the harbour while an Attractor holds the crowd.','The lower switch opens the harbour gate; climb the ladder to reach the drawbridge lever.','Bash through the wall and build to the raised exit before releasing the crowd.'],
 9:['Give the scout your one Parachute before the cliff edge. Hold the crowd above.','The switch on the lower landing releases the rescue pole for everyone else.','Bash through the cliff wall and prepare the crossing, then release the waiting group.'],
 12:['Bash through the small wall at the bottom to reach the ascent ladder.','At the top, the thin fossil wall has two solutions: a Basher saves everyone; an Exploder costs one lemming.','Build across the ravine after opening the wall. The rescue target allows one loss.'],
 15:['Build up across the starting gap to reach the ladder onto the stage.','The springboard carries everyone; use a Jumper to reach the raised curtain switch.','Dig down from the switch balcony, bash through the ball and build to the exit. Release the Attractor when the route is ready.'],
 16:['Two entrances, two locked routes. Each group opens the other group’s curtain.','Send a Climber over the lower tent to its switch. Build across the upper gap to reach the other switch.','Turn the climber back and bash through the lower tent. Clear the upper tent and use a Platform across the final gap so both groups can reunite.'],
 18:['Three stages form a chain: each group opens the next group’s curtain.','Build across the upper gap. Bash through the tents on the middle and lower stages to reach their switches.','The lowest switch opens the exit curtain. Matching coloured portals carry the two lower groups to the upper stage.'],
 19:['Stack beneath the starting switch to unlock the ascent ladder, then bash away the stack for the crowd.','Hold the crowd above. Send a parachuting scout down through a dug shaft to open the exit curtain.','Repair the shaft with a Platform for the crowd. After they cross, turn the last performer towards the lower ladder to bring them home.']
};
for(const [id,hints] of Object.entries(chapterHints))LEVELS[id].hints=hints;
LEVELS[1].hints[0]='Walk to the ladder to reach the woodland crossings above.';
LEVELS[17].hints[0]='Three circus stages combine springboards, low crossings, uphill building and tunnel preparation.';
// These repeated scenic ring backdrops add no puzzle information or collision.
LEVELS[17].setPieces=[];

const expeditionOpeners={
 7:'Ride the moving island to the far shore, then lead the group down through two sheltered crossings.',
 10:'Cross the open snowfield, then prepare a zigzag descent through three sheltered ledges.',
 11:'Build up the three snowy steps, then use the pole to begin the descent towards the exit.',
 13:'Travel left across the high ledges first. The lower route winds back and forth towards the sheltered exit.',
 14:'Build left across the broken ridge. The pole leads down to a route of tunnels and crossings.',
 17:'Clear the two springboards, then prepare the three circus stages below. The lever stops the press.'
};
for(const [id,hint] of Object.entries(expeditionOpeners))LEVELS[id].hints[0]=hint;

// Remove isolated approach walls that repeat the later tunnelling lesson.
// Keep chamber barriers, steel seams, crossings and exit containment intact.
for(const [id,positions] of [[7,[[740,255]]],[10,[[230,245],[720,240]]],[17,[[820,255]]]]){
 LEVELS[id].terrain=LEVELS[id].terrain.filter(([x,y])=>!positions.some(([px,py])=>x===px&&y===py));
}

// Rolling snowbanks, sandy ridges and rounded stage terrain remain fully physical.
applyTerrainContours(LEVELS);
