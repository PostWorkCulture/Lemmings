import test from 'node:test';
import assert from 'node:assert/strict';
import {ImpactAudio} from '../src/impact-effects.js';
import {CloudSave} from '../src/cloud-save.js';
import {PlayerStore} from '../src/player-store.js';
const makeStore=()=>{const data=new Map();return new PlayerStore({getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,v)},()=> 'player');};
test('sliding, splashing and deaths each dispatch the right sound once',()=>{const audio=new ImpactAudio(),calls=[];audio.splat=()=>calls.push('splat');audio.swoosh=(_,type)=>calls.push(type);const events=[{type:'slide'},{type:'splash'},{type:'splat'}];audio.consume(events,.5,false);audio.consume(events,.5,false);assert.deepEqual(calls,['slide','splash','splat']);audio.consume([{type:'splat'}],.5,true);assert.equal(calls.length,3);});
test('cloud only syncs the account linked to the active profile',async()=>{const store=makeStore();store.link('one');let requests=0;const save=new CloudSave(store,()=>{},()=>{});save.client={auth:{getSession:async()=>({data:{session:{user:{id:'two'}}}})},rpc:async()=>{requests++;}};await save.sync();assert.equal(requests,0);});
test('cloud response merges new local results written while request was pending',async()=>{const store=makeStore();store.link('one');let release;const pending=new Promise(resolve=>release=resolve);const save=new CloudSave(store,()=>{},()=>{});save.client={auth:{getSession:async()=>({data:{session:{user:{id:'one'}}}})},rpc:async()=>{await pending;return {data:{campaignVersion:2,stars:{0:{stars:1}}}};}};const request=save.sync();store.storage.setItem(store.key(store.activeId,'lemmings-stars-v1'),'{"0":{"stars":3}}');release();await request;assert.equal(store.snapshot().stars[0].stars,3);});
