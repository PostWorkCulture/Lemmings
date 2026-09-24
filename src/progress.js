import {LEVELS} from './levels.js';
export function isUnlocked(index,best){
  return Number.isInteger(index)&&index>=0&&index<LEVELS.length&&LEVELS.slice(0,index).every(l=>Number(best[l.id])>=l.target);
}
export function isPerfect(index,records){const r=records[index];return !!LEVELS[index]&&(!LEVELS[index].puzzleId||r?.puzzleId===LEVELS[index].puzzleId)&&r?.completed===true&&r.saved===20&&r.total===20&&r.lost===0;}
