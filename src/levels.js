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

// Give the complete exit arch a supported landing, including its outer feet.
// Narrow rescue ledges need a little extra ground rather than an overhanging door.
for(const id of [16]){
 const l=LEVELS[id],ledge=l.terrain.find(r=>r[1]===l.exitY&&r[0]>850&&r[2]<100);
 if(ledge){const right=ledge[0]+ledge[2];ledge[0]=870;ledge[2]=right-870;}
 l.exitX=908;
}
LEVELS[15].exitX=908;
LEVELS[18].exitX=906;
LEVELS[19].exitX=909;
for(const [id,x,y,depth] of [[1,905,227,9],[4,94,364,7]]){
 const l=LEVELS[id];l.exitX=x;l.exitY=y;l.terrain.push([x-38,y,77,depth,1]);
}

// Widen the harbour landing away from the approach so its existing bridge remains valid.
{const l=LEVELS[8],ledge=l.terrain.find(r=>r[0]===910&&r[1]===268),back=l.terrain.find(r=>r[0]===948&&r[1]===208);ledge[2]=75;back[0]=986;l.exitX=947;}
import {mountainAdventures} from './mountain-adventures.js';
mountainAdventures(LEVELS);
// Terrain-dominated signature maps: preserve working routes while giving them a substantial landform.
LEVELS[0].shapes.push({type:1,points:[[40,0],[960,0],[960,110],[850,92],[640,75],[390,126],[160,108],[160,0]]});
LEVELS[0].terrain.push([40,294,360,148,1]);
LEVELS[6].terrain.push([40,365,920,211,1]);
LEVELS[6].shapes.push({type:1,points:[[180,0],[960,0],[960,190],[840,172],[710,192],[600,162],[480,178],[320,160],[180,182]]});
LEVELS[19].terrain.push([40,188,290,180,1],[400,188,560,180,1],[360,428,540,164,1]);

import {expansionLevels} from './expansion-levels.js';
LEVELS.push(...expansionLevels());
import {sweetCampaignLevels} from './sweet-campaign-data.js';
LEVELS.push(...structuredClone(sweetCampaignLevels));
// IDs are permanent save keys. Campaign order is independent of those IDs.
CHAPTERS.splice(0,CHAPTERS.length,
 {name:'Freaky Forest',theme:'woodland',difficulty:'Easy'},
 {name:'Dunes',theme:'beach',difficulty:'Medium'},
 {name:'Mountain Rescue',theme:'alpine',difficulty:'Medium'},
 {name:'Pick ’n’ Mix',theme:'candy',difficulty:'Hard'},
 {name:'Lava Land',theme:'volcano',difficulty:'Extreme'});
const groups=[[0,1,2,3,4,20,21,22,23,24],[5,6,7,8,9,25,26,27,28,29],[10,11,12,13,14,30,31,32,33,34],[45,46,47,48,49,40,41,42,43,44],[15,16,17,18,19,35,36,37,38,39]];
export const CAMPAIGN=groups.flat().map(id=>LEVELS[id]);
CAMPAIGN.forEach((level,index)=>{const c=CHAPTERS[Math.floor(index/10)];level.campaignIndex=index;level.chapter=c.name;level.world=c.name;level.difficulty=c.difficulty;});
export const nextLevelId=id=>{const index=CAMPAIGN.findIndex(level=>level.id===id);return index<0?undefined:CAMPAIGN[index+1]?.id;};

// Preserve map identities and routes while replacing the final chapter's material and hazard.
const lavaNames=['Into the Caldera','Basalt Rendezvous','The Magma Circuit','Three Crater Crossing','Last Lemming from the Furnace','The Cinder Crossing','Obsidian Labyrinth','The Ashfall Chute','Up the Chimney','Escape from Emberjaw'];
CAMPAIGN.slice(40).forEach((level,i)=>{
 level.theme='volcano';level.hazard='lava';level.name=lavaNames[i];level.circusProps=[];level.setPieces=[];level.sceneryShelves=[];
 level.hints=level.hints.map(h=>h.replaceAll('circus stages','volcanic terraces').replaceAll('circus','volcanic').replaceAll('rings','craters').replaceAll('performer','lemming').replaceAll('backstage passage','lower cavern').replaceAll('stage blocks','basalt blocks').replaceAll('stages','terraces').replaceAll('stage','ledge').replaceAll('curtain','gate').replaceAll('audience','crowd').replaceAll('rigging','rock faces').replaceAll('wings','outer cavern').replaceAll('encore','final ascent'));
});

// Recessed lava basins replace selected crevasses, below the intended bridge route.
for(const [id,x,y,w] of [[35,300,260,150],[36,500,270,65],[37,580,380,60],[38,365,740,65]]){
 const l=LEVELS[id],h=48;
 l.shapes.push({type:2,points:[[x-5,y+h],[x+w+5,y+h],[x+w+5,y+120],[x-5,y+120]]});
 l.shapes.push({type:2,points:[[x-5,y-8],[x,y-8],[x,y+h],[x-5,y+h]]});
 l.shapes.push({type:2,points:[[x+w,y-8],[x+w+5,y-8],[x+w+5,y+h],[x+w,y+h]]});
 l.objects.push({type:'lavaPool',x,y,w,h});
 l.hints.push('The recessed lava is lethal. Prepare the crossing before releasing the crowd.');
}

// Pick 'n' Mix is temporarily withdrawn. Save keys and source maps remain intact.
export const RETIRED_LEVEL_IDS=Object.freeze(CAMPAIGN.filter(l=>l.theme==='candy').map(l=>l.id));
CAMPAIGN.splice(0,CAMPAIGN.length,...CAMPAIGN.filter(l=>!RETIRED_LEVEL_IDS.includes(l.id)));
CHAPTERS.splice(0,CHAPTERS.length,...CHAPTERS.filter(c=>c.theme!=='candy'));
CAMPAIGN.forEach((level,index)=>{level.campaignIndex=index;});
export const isCampaignLevel=id=>Number.isInteger(id)&&CAMPAIGN.some(level=>level.id===id);

// Fresh sweet puzzles use new save identities; the withdrawn prototypes stay archived.
import {sweetRebootLevels} from './sweet-reboot-levels.js';
const freshSweets=sweetRebootLevels();
LEVELS.push(...freshSweets);
CAMPAIGN.splice(30,0,...freshSweets);
CHAPTERS.splice(3,0,{name:'Sweet Worlds',theme:'candy',difficulty:'Hard'});
CAMPAIGN.forEach((l,index)=>{l.campaignIndex=index;});
