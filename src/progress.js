import {LEVELS} from './levels.js';
export function starCount(record){return Number.isInteger(record?.stars)&&record.stars>=0&&record.stars<=3?record.stars:0;}
export function totalStars(records,before=LEVELS.length){return LEVELS.slice(0,before).reduce((n,l)=>n+starCount(records[l.id]),0);}
export function isUnlocked(index,records){
 if(!Number.isInteger(index)||index<0||index>=LEVELS.length)return false;
 if(index===0)return true;
 const completed=LEVELS.slice(0,index).filter(l=>starCount(records[l.id])>0);
 const frontier=completed.length?completed.at(-1).id:-1;
 return index<=frontier+2&&totalStars(records,index)>=index;
}
export function earnedStars(level,{completed,saved,lost,ticks}){
 if(!completed||!Number.isInteger(saved)||saved<level.target||saved>level.total)return 0;
 if(saved!==level.total||lost!==0)return 1;
 return Number.isFinite(ticks)&&ticks>=0&&ticks<level.targetTime*60?3:2;
}
export function isPerfect(index,records){const r=records[index];return !!LEVELS[index]&&(!LEVELS[index].puzzleId||r?.puzzleId===LEVELS[index].puzzleId)&&r?.completed===true&&r.saved===20&&r.total===20&&r.lost===0;}
export function migrateStars(best,perfect,records={}){
 const result={...records};
 for(const l of LEVELS){
  const legacy=Number(best[l.id])>=l.target?1:0;
  const stars=Math.max(starCount(result[l.id]),legacy,isPerfect(l.id,perfect)?2:0);
  if(stars)result[l.id]={...result[l.id],stars};
 }
 return result;
}
export function recordResult(level,previous,run){
 const stars=earnedStars(level,run),result={...previous,stars:Math.max(starCount(previous),stars)};
 if(stars>=2&&Number.isFinite(run.ticks)&&run.ticks>=0)result.bestPerfectTicks=Math.min(previous?.bestPerfectTicks??Infinity,run.ticks);
 return result;
}
export function unlockHint(index,records){
 const missing=Math.max(0,index-totalStars(records,index));
 return missing?`${missing} more star${missing===1?'':'s'} from earlier levels`:'Complete either of the two preceding levels';
}
