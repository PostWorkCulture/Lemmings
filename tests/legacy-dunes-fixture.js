import {Game} from '../src/engine.js';
import {LEVELS,LEGACY_DUNES} from '../src/levels.js';
// Retired Dunes layouts exercise switches, swimming and sliding in isolation.
export class LegacyDunesGame extends Game {reset(id=this.levelIndex??0){const current=LEVELS[id];try{if(LEGACY_DUNES[id])LEVELS[id]=LEGACY_DUNES[id];super.reset(id);}finally{LEVELS[id]=current;}}}
