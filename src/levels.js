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
 {name:"Life's a Beach",theme:'beach'},
 {name:'Mountain Rescue',theme:'alpine'},
 {name:'What a Circus!',theme:'circus'}
];
const titles=['The Hollow Oak','Woodland Crossing','Behind the Waterfall','The Old Sawmill','Treetop Trail',
 'The Palm Grove Locksmith','The Shifting Dunes','Island Hopping','The Harbour Drawbridge','Clifftop Rescue',
 'The Snowbound Detour','The Frozen Pass','The Frozen Fossil','The Summit Expedition','The Crooked Ridge',
 'The Opening Act','Big-Top Rendezvous','The Championship Circuit','Three-Ring Rescue','Last Performer Home'];
for(const level of LEVELS){
 const chapter=CHAPTERS[Math.floor(level.id/5)];
 level.chapter=chapter.name;level.world=chapter.name;level.theme=chapter.theme;level.hazard=THEMES[chapter.theme].hazard;level.name=titles[level.id];
 level.setPieces=(level.setPieces||[]).map(p=>({...p,form:level.id>=15?'circus-rings':p.form}));
}
LEVELS[2].waterfallTheme='waterfall';

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
