import {LEVELS} from './levels.js';
import {migrateStars,isPerfect} from './progress.js';
export const SAVE_KEYS=['lemmings-best','lemmings-perfect-v2','lemmings-stars-v1','lemmings-current-level'];
const REGISTRY='lemmings-players-v1';
const object=v=>v&&typeof v==='object'&&!Array.isArray(v)?v:{};
export function mergeProgress(a={},b={}){
 const result={best:{},perfect:{},stars:{},currentLevel:0};
 for(const source of [a,b]){
  for(let i=0;i<LEVELS.length;i++){
   const saved=object(source.best)[i];if(Number.isInteger(saved)&&saved>=0&&saved<=LEVELS[i].total)result.best[i]=Math.max(result.best[i]||0,saved);
   const perfect=object(source.perfect)[i];if(isPerfect(i,{[i]:perfect}))result.perfect[i]={...perfect};
   const r=object(source.stars)[i];if(Number.isInteger(r?.stars)&&r.stars>=1&&r.stars<=3){const previous=result.stars[i]||{};result.stars[i]={stars:Math.max(previous.stars||0,r.stars)};const times=[previous.bestPerfectTicks,r.bestPerfectTicks].filter(t=>Number.isInteger(t)&&t>=0&&t<100000000);if(times.length)result.stars[i].bestPerfectTicks=Math.min(...times);}
  }
  if(Number.isInteger(source.currentLevel)&&source.currentLevel>=0&&source.currentLevel<LEVELS.length)result.currentLevel=source.currentLevel;
 }
 result.stars=migrateStars(result.best,result.perfect,result.stars);return result;
}
export class PlayerStore{
 constructor(storage,id=()=>crypto.randomUUID()){
  this.storage=storage;this.id=id;this.onSave=()=>{};
  let registry;try{registry=JSON.parse(storage.getItem(REGISTRY));}catch{}
  if(!Array.isArray(registry?.players)||!registry.players.length){
   const player={id:id(),name:'Player 1'};registry={active:player.id,players:[player]};
   // Copy the original save, retaining its untouched backup in the old keys.
   for(const key of SAVE_KEYS){const value=storage.getItem(key);if(value!==null)storage.setItem(this.key(player.id,key),value);}
   storage.setItem(REGISTRY,JSON.stringify(registry));
  }
  this.registry=registry;this.activeId=registry.players.some(p=>p.id===registry.active)?registry.active:registry.players[0].id;
 }
 key(id,key){return `lemmings-player:${id}:${key}`;}
 get player(){return this.registry.players.find(p=>p.id===this.activeId);}
 getItem(key){return this.storage.getItem(this.key(this.activeId,key));}
 setItem(key,value){this.storage.setItem(this.key(this.activeId,key),value);this.onSave();}
 saveRegistry(){this.storage.setItem(REGISTRY,JSON.stringify(this.registry));}
 add(name){name=name.trim().slice(0,24);if(!name)throw Error('Enter a player name.');const p={id:this.id(),name};this.registry.players.push(p);this.saveRegistry();return p;}
 select(id){if(!this.registry.players.some(p=>p.id===id))throw Error('Player not found.');this.registry.active=id;this.saveRegistry();}
 link(userId){if(this.player.cloudId&&this.player.cloudId!==userId)throw Error('This player is linked to a different account. Select or create another player.');if(this.registry.players.some(p=>p.id!==this.activeId&&p.cloudId===userId))throw Error('This account is already linked to another player on this device.');this.player.cloudId=userId;this.saveRegistry();}
 snapshot(){const read=key=>{try{return JSON.parse(this.getItem(key));}catch{return null;}};return mergeProgress({}, {best:read(SAVE_KEYS[0]),perfect:read(SAVE_KEYS[1]),stars:read(SAVE_KEYS[2]),currentLevel:read(SAVE_KEYS[3])});}
 merge(remote){const local=this.snapshot(),merged=mergeProgress(remote,local);if(!Object.keys(local.stars).length&&local.currentLevel===0&&Number.isInteger(remote?.currentLevel))merged.currentLevel=remote.currentLevel;for(const [i,field] of ['best','perfect','stars','currentLevel'].entries())this.storage.setItem(this.key(this.activeId,SAVE_KEYS[i]),JSON.stringify(merged[field]));return merged;}
}
