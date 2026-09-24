import {LEVELS as BASE_LEVELS,THEMES} from './levels-base-for-authoring.js';
import {DIFFICULT_LAYOUTS} from './difficulty-layouts.js';
export {THEMES};
export const LEVELS=structuredClone(BASE_LEVELS);
for(const level of LEVELS){level.difficulty=['Easy','Medium','Hard','Extreme'][Math.floor(level.id/5)];level.height=470;}
for(const layout of DIFFICULT_LAYOUTS)Object.assign(LEVELS[layout.id],layout);
