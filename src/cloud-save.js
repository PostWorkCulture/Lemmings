import {CLOUD_CONFIG} from './cloud-config.js';
export class CloudSave{
 constructor(store,onProgress,onStatus){this.store=store;this.onProgress=onProgress;this.onStatus=onStatus;this.client=null;this.pending=false;this.running=null;this.retry=null;store.onSave=()=>this.schedule();}
 get configured(){return Boolean(CLOUD_CONFIG.url&&CLOUD_CONFIG.publishableKey);}
 async init(){
  if(!this.configured){this.onStatus('Saved on this device. Cloud connection is not set up yet.');return;}
  try{
   const {createClient}=await import('./vendor/supabase.js');
   this.client=createClient(CLOUD_CONFIG.url,CLOUD_CONFIG.publishableKey,{auth:{detectSessionInUrl:false,storageKey:'lemmings-auth:'+this.store.activeId}});
   await this.sync();
  }catch{this.onStatus('Saved on this device. Cloud is unavailable; retry when online.');}
 }
 schedule(){clearTimeout(this.retry);this.retry=setTimeout(()=>this.sync(),1200);}
 async signIn(email,password){
  if(!this.client)throw Error('Cloud connection is not ready yet.');
  const {data,error}=await this.client.auth.signInWithPassword({email,password});if(error)throw error;
  try{this.store.link(data.user.id);}catch(e){await this.client.auth.signOut({scope:'local'});throw e;}
  await this.sync();
 }
 async signOut(){if(this.client){const {error}=await this.client.auth.signOut({scope:'local'});if(error)throw error;}this.onStatus('Signed out. Progress stays saved on this device.');}
 async sync(){
  if(!this.client)return;
  if(this.running){this.pending=true;return this.running;}
  this.running=this.performSync();
  try{await this.running;}finally{this.running=null;if(this.pending){this.pending=false;this.schedule();}}
 }
 async performSync(){
  try{
   const {data:{session},error}=await this.client.auth.getSession();if(error)throw error;
   if(!session||session.user.id!==this.store.player.cloudId){this.onStatus('Saved on this device. Sign in to sync this player.');return;}
   this.onStatus('Saving to cloud…');
   const incoming=this.store.snapshot();if(!Object.keys(incoming.stars).length&&incoming.currentLevel===0)delete incoming.currentLevel;
   const {data,error:saveError}=await this.client.rpc('sync_lemmings_progress',{incoming});if(saveError)throw saveError;
   const merged=this.store.merge(data);this.onProgress(merged);this.onStatus('Saved on this device and in the cloud.');
  }catch{this.onStatus('Saved on this device. Cloud save pending—check your connection and retry.');clearTimeout(this.retry);this.retry=setTimeout(()=>this.sync(),30000);}
 }
}
