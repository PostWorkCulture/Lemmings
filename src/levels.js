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
