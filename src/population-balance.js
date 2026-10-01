// Smaller rescue parties keep the route planning and reduce repetitive waiting.
export const POPULATION_VERSION=1;
export function reducedPopulation(total){return Math.max(5,Math.ceil(total/2));}
export function rebalancePopulations(levels,times={}){
 for(const level of levels){
  const {total,target,targetTime}=level;level.populationOriginal={total,target,targetTime};
  level.total=reducedPopulation(total);
  const allowedLosses=total-target;
  level.target=level.total-(allowedLosses?Math.max(1,Math.round(allowedLosses*level.total/total)):0);
  for(const key of ['float','climb','swim'])if(level.stock[key]>=total)level.stock[key]=level.total;
  if(times[level.id]!==undefined)level.targetTime=times[level.id];
 }
}
export function migratePopulationProgress(progress={},levels){
 if(progress.populationVersion===POPULATION_VERSION)return progress;
 const best={...progress.best},perfect={...progress.perfect};
 for(const level of levels){
  const before=level.populationOriginal?.total;if(!before||before===level.total)continue;
  const saved=best[level.id];
  if(Number.isInteger(saved)&&saved>=0&&saved<=before)best[level.id]=Math.floor(saved*level.total/before);
  const record=perfect[level.id];
  if(record?.completed===true&&record.total===before&&record.saved===before&&record.lost===0)perfect[level.id]={...record,total:level.total,saved:level.total};
 }
 return {...progress,best,perfect,populationVersion:POPULATION_VERSION};
}
