import {drawDrowning,drawSplats,ImpactAudio} from './impact-effects.js';
import {ambientWorld,finaleLandmarks} from './ambient-art.js';
import {SKILLS,SKILL_ORDER} from './skills.js';
import {drawObjects,skillEquipment} from './object-art.js';
import { isUnlocked,starCount,totalStars,earnedStars,migrateStars,recordResult,unlockHint } from './progress.js';
import { LEVELS,THEMES } from './levels.js';
import { Soundtrack,TRACKS } from './music.js';
import { Game,WIDTH,HEIGHT } from './engine.js';
import { character,makeBackground,renderTerrain,scenery,skillIcon,uiIcon,loadIconArt,exitPortal,enteringLemming,hazards } from './art.js';
const $=s=>document.querySelector(s),canvas=$('#game'),ctx=canvas.getContext('2d');
let best={};try{const stored=JSON.parse(localStorage.getItem('lemmings-best')||'{}');if(stored&&typeof stored==='object'&&!Array.isArray(stored))best=stored;}catch{}
let perfectRescues={};try{const records=JSON.parse(localStorage.getItem('lemmings-perfect-v2')||'{}');if(records&&typeof records==='object'&&!Array.isArray(records))perfectRescues=records;}catch{}
let starRecords={};try{const stored=JSON.parse(localStorage.getItem('lemmings-stars-v1')||'{}');if(stored&&typeof stored==='object'&&!Array.isArray(stored))starRecords=stored;}catch{}
starRecords=migrateStars(best,perfectRescues,starRecords);
const formatTime=seconds=>String(Math.floor(seconds/60)).padStart(2,'0')+':'+String(seconds%60).padStart(2,'0');
function starsMarkup(count){return [1,2,3].map(n=>`<span class="${n<=count?'earned':'unearned'}" aria-hidden="true">★</span>`).join('');}
let initialLevel=0;try{initialLevel=Number(localStorage.getItem('lemmings-current-level'))||0;}catch{}
if(!isUnlocked(initialLevel,starRecords))initialLevel=0;
const game=new Game(initialLevel),terrain=document.createElement('canvas');let background=makeBackground(game.level.theme,game.height,game.level);terrain.width=WIDTH;terrain.height=game.height;
const soundtrack=new Soundtrack($('#soundtrack'));const impactAudio=new ImpactAudio();
let pendingLevel=null;
let sceneryTick=0;
let selected='walk',started=false,paused=false,speed=1,last=0,accumulator=0,renderedRevision=-1,hover=null,pointer=null,toastTimer,hintIndex=0,dialogPause=false;
function message(text){$('#message').textContent=text;$('#message').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#message').classList.remove('visible'),5000);}
function select(skill){if(skill!=='walk'&&!(game.stock[skill]>0)&&!(['block','attract'].includes(skill)&&game.units.some(u=>u.state===skill)))return;selected=skill;document.querySelectorAll('.skill').forEach(b=>{const active=b.dataset.skill===skill;b.classList.toggle('selected',active);b.setAttribute('aria-pressed',String(active));});}
function start(){impactAudio.unlock();started=true;paused=false;soundtrack.play();$('#intro').classList.add('hidden');$('#result').classList.add('hidden');canvas.focus({preventScroll:true});if(game.level.bottomEntry)$('#viewport').scrollTop=$('#viewport').scrollHeight;sync();}
function reset(levelIndex=game.levelIndex){if(!isUnlocked(levelIndex,starRecords))return;clearTimeout(toastTimer);document.querySelector('#message').classList.remove('visible');soundtrack.pause();game.reset(levelIndex);background=makeBackground(game.level.theme,game.height,game.level);renderedRevision=-1;soundtrack.setLevel(levelIndex);updateLevelUI();started=false;paused=false;speed=1;hover=null;pointer=null;hintIndex=0;$('#hint-copy').textContent='Puzzle hints are optional.';$('#hint').textContent='Show a puzzle hint';accumulator=0;$('#result').classList.add('hidden');$('#intro').classList.remove('hidden');$('#speed').textContent='1\u00d7';$('#speed').setAttribute('aria-label','Speed: normal');$('#speed').classList.remove('active');select('walk');sync();}
function togglePause(){if(!started)return;paused=!paused;paused?soundtrack.pause():soundtrack.play();sync();}
function singleStep(){if(!started||game.result)return;paused=true;soundtrack.pause();game.step();if(game.result)result();sync();}
function toggleSpeed(){speed=speed===1?3:1;$('#speed').textContent=speed+'\u00d7';$('#speed').classList.toggle('active',speed===3);$('#speed').setAttribute('aria-label',speed===1?'Speed: normal':'Speed: 3 times normal');}
function sync(){
  $('#out').textContent=String(game.spawned).padStart(2,'0');$('#saved').textContent=String(game.saved).padStart(2,'0');$('#lost').textContent=String(game.lost).padStart(2,'0');
  const seconds=Math.floor(game.tick/60);$('#timer').textContent=String(Math.floor(seconds/60)).padStart(2,'0')+':'+String(seconds%60).padStart(2,'0');
  for(const key of SKILL_ORDER.filter(k=>k!=='walk'&&game.level.stock[k]>0)){$('#count-'+key).textContent=game.stock[key];const button=$(`[data-skill="${key}"]`);button.disabled=game.stock[key]<=0&&!(['block','attract'].includes(key)&&game.units.some(u=>u.state===key));button.hidden=game.level.stock[key]===0;}
  $('#status-label').textContent=game.result?(game.result==='win'?'LEVEL COMPLETE':'LEVEL ENDED'):!started?'READY':paused?'PAUSED':'PLAYING';
  $('#pause').textContent=paused?'\u25b6':'\u2161';$('#pause').setAttribute('aria-label',paused?'Resume':'Pause');$('#pause').classList.toggle('active',paused);
  $('#pause').disabled=!started;

}
function result(){
 const run={completed:game.result==='win',saved:game.saved,lost:game.lost,ticks:game.tick};
 const stars=earnedStars(game.level,run);
 if(stars){starRecords[game.levelIndex]=recordResult(game.level,starRecords[game.levelIndex],run);try{localStorage.setItem('lemmings-stars-v1',JSON.stringify(starRecords));}catch{}}
 $('#result-stars').innerHTML=starsMarkup(stars);$('#result-stars').setAttribute('aria-label',stars+' of 3 stars earned this run');
 $('#star-summary').textContent=stars===3?'Completed · Everyone saved · Under target time':stars===2?'Completed · Everyone saved. Beat '+formatTime(game.level.targetTime)+' for the third star.':stars===1?'Completed. Save everyone to earn a second star.':'Reach the rescue target to earn your first star.';

 const viewport=$('#viewport');$('#result').style.top=viewport.scrollTop+'px';$('#result').style.height=viewport.clientHeight+'px';$('#result').style.bottom='auto';viewport.style.overflowY='hidden';
  if(game.result==='win'&&game.saved===20&&game.level.total===20&&game.lost===0&&game.spawned===20&&game.units.length===0){perfectRescues[game.levelIndex]={completed:true,saved:20,total:20,lost:0,puzzleId:game.level.puzzleId};try{localStorage.setItem('lemmings-perfect-v2',JSON.stringify(perfectRescues));}catch{}}
  if(game.result==='win'){best[game.levelIndex]=Math.max(best[game.levelIndex]||0,game.saved);try{localStorage.setItem('lemmings-best',JSON.stringify(best));}catch{}}
  $('#next-level').classList.toggle('hidden',game.result!=='win'||game.levelIndex===LEVELS.length-1);
  $('#result').classList.remove('hidden');$('#result-eyebrow').textContent=game.result==='win'?`LEVEL ${String(game.levelIndex+1).padStart(2,'0')} COMPLETE`:'A LITTLE PRACTICE';
  $('#result-title').textContent=game.result==='win'?(game.saved===game.level.total?'Not one left behind.':'Home, sweet home.'):'Another little plan?';
  $('#result-copy').textContent=game.result==='win'?`${game.saved} of ${game.level.total} home safely. ${game.saved===game.level.total?'A perfect rescue!':'You did it. Can you bring everyone home next time?'}`:`${game.saved} rescued · ${game.lost} lost. Rescue target: ${game.level.target} of ${game.level.total}.`;
  sync();
}
function pick(x,y){return game.units.filter(u=>!['exit','drown'].includes(u.state)).map(u=>({u,d:Math.hypot(u.x-x,(u.y-12)-y)})).filter(o=>o.d<25).sort((a,b)=>Number(!!game.canAssign(a.u,selected))-Number(!!game.canAssign(b.u,selected))||Number(b.u.state===selected&&['block','attract'].includes(selected))-Number(a.u.state===selected&&['block','attract'].includes(selected))||a.d-b.d||a.u.id-b.u.id)[0]?.u||null;}
function position(e){const b=canvas.getBoundingClientRect();const scale=Math.min(b.width/WIDTH,b.height/canvas.height);return{x:(e.clientX-b.left-(b.width-WIDTH*scale)/2)/scale,y:(e.clientY-b.top-(b.height-canvas.height*scale)/2)/scale};}
canvas.addEventListener('pointermove',e=>{pointer=position(e);hover=pick(pointer.x,pointer.y);});canvas.addEventListener('pointerleave',()=>{pointer=null;hover=null;});
canvas.addEventListener('pointerdown',e=>{
  if(!started||game.result)return;const p=position(e),u=pick(p.x,p.y);if(!u)return;
  const r=game.assign(u.id,selected);if(!r.ok)message(r.message);else sync();
});
$('.skills').addEventListener('click',e=>{const b=e.target.closest('[data-skill]');if(b)select(b.dataset.skill);});
$('#start').addEventListener('click',start);$('#pause').addEventListener('click',togglePause);$('#speed').addEventListener('click',toggleSpeed);$('#replay').addEventListener('click',()=>{reset();start();});
function openDialog(id){dialogPause=paused;if(!game.result){paused=true;soundtrack.pause();}$(id).showModal();sync();}
$('#help').addEventListener('click',()=>openDialog('#help-dialog'));
$('#restart').addEventListener('click',()=>{if(!started){reset();return;}openDialog('#restart-dialog');});
document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>$('#'+b.dataset.close).close()));
document.querySelectorAll('dialog').forEach(d=>d.addEventListener('close',()=>{paused=dialogPause;if(started&&!paused)soundtrack.play();sync();}));
$('#confirm-restart').addEventListener('click',()=>{$('#restart-dialog').close();dialogPause=false;reset();start();});
$('#hint').addEventListener('click',()=>{const hints=game.level.hints;$('#hint-copy').textContent=hints[Math.min(hintIndex++,hints.length-1)];$('#hint').textContent=hintIndex>=hints.length?'Repeat final hint':'Next hint';});
$('#next-level').addEventListener('click',()=>{if(game.result==='win'&&isUnlocked(game.levelIndex+1,starRecords))reset(game.levelIndex+1);});
function updateMusicUI(){
 $('#music-toggle').textContent=soundtrack.muted?'Music off':'Music on';$('#music-toggle').setAttribute('aria-pressed',String(!soundtrack.muted));$('#volume').value=Math.round(soundtrack.volume*100);$('#track-name').textContent=TRACKS[game.levelIndex][1];
}
function renderSkills(){
 const tray=$('.skills'),help=$('#help-dialog ul');tray.replaceChildren();help.replaceChildren();
 for(const key of SKILL_ORDER){if(key!=='walk'&&!(game.level.stock[key]>0))continue;
  const b=document.createElement('button');b.className='skill'+(key===selected?' selected':'');b.dataset.skill=key;b.setAttribute('aria-pressed',String(key===selected));b.setAttribute('aria-label',SKILLS[key].name);
  const art=document.createElement('canvas');art.className='skill-picture';art.dataset.pose=key;art.width=116;art.height=88;art.setAttribute('aria-hidden','true');b.append(art);
  const label=document.createElement('span');label.textContent=SKILLS[key].name;const count=document.createElement('b');count.id='count-'+key;count.textContent=key==='walk'?'\u221e':game.stock[key];b.append(label,count);tray.append(b);skillIcon(art.getContext('2d'),116,88,key);
  const li=document.createElement('li'),strong=document.createElement('strong');strong.textContent=SKILLS[key].name+' - ';li.append(strong,document.createTextNode(SKILLS[key].help));help.append(li);
 }
}
function updateLevelUI(){
 canvas.height=game.height;terrain.height=game.height;$('#viewport').classList.toggle('tall-world',game.height>HEIGHT);$('#viewport').scrollTop=0;$('#viewport').style.overflowY='';$('#map-navigation').hidden=game.height<=HEIGHT;$('#map-depth').textContent='Depth 0%';
 $('#difficulty-label').textContent=game.level.difficulty;$('#difficulty-label').dataset.difficulty=game.level.difficulty.toLowerCase();
 renderSkills();const l=game.level;$('#time-target').textContent='3★ < '+formatTime(l.targetTime);document.title=`Lemmings · ${l.world}`;$('#world-label').textContent=`${l.world.toUpperCase()} · ${String(l.id+1).padStart(2,'0')}`;$('h1').textContent=l.name;$('#level-number').textContent=`${l.id+1} / ${LEVELS.length}`;$('#total-count').textContent='/'+l.total;$('#target-count').textContent='/'+l.target;$('#help-goal').textContent=`Save ${l.target} of ${l.total}. Watch out for long falls and hazards. There’s no time limit.`;canvas.setAttribute('aria-label',`${l.world}: ${l.name}`);$('#music-status').textContent='';updateMusicUI();
 document.querySelectorAll('[data-help-skill]').forEach(el=>{el.hidden=el.dataset.helpSkill!=='walk'&&!(l.stock[el.dataset.helpSkill]>0);});
 try{localStorage.setItem('lemmings-current-level',String(l.id));}catch{}
}
$('#music-toggle').addEventListener('click',()=>{soundtrack.toggle();if(started&&!paused&&!soundtrack.muted)soundtrack.play();updateMusicUI();});
$('#volume').addEventListener('input',e=>soundtrack.setVolume(Number(e.target.value)/100));
$('#soundtrack').addEventListener('error',()=>{$('#music-status').textContent='Music could not load.';});
$('#soundtrack').addEventListener('musicblocked',()=>{$('#music-status').textContent='Press Music on to enable audio.';});
$('#soundtrack').addEventListener('playing',()=>{$('#music-status').textContent='';});
function changeLevel(index){if(!isUnlocked(index,starRecords))return;reset(index);$('#levels-dialog').close();}
function showLevels(){
 $('#campaign-stars').textContent=totalStars(starRecords)+' / 60 stars · Earn stars to open the next two levels';const list=$('#level-list');list.replaceChildren();$('#level-confirm').classList.add('hidden');pendingLevel=null;
 for(const level of LEVELS){
  if(level.id%5===0){const heading=document.createElement('h3');heading.className='difficulty-heading';heading.textContent=`${level.chapter} · ${level.difficulty} · Levels ${level.id+1}-${level.id+5}`;list.append(heading);}
  const unlocked=isUnlocked(level.id,starRecords),stars=starCount(starRecords[level.id]);
  const button=document.createElement('button');button.disabled=!unlocked;button.className='level-card'+(level.id===game.levelIndex?' current':'');button.setAttribute('aria-label',`Level ${level.id+1}: ${level.name}`);
  const preview=document.createElement('canvas');preview.width=200;preview.height=94;preview.setAttribute('aria-hidden','true');const c=preview.getContext('2d');const previewScale=Math.min(200/WIDTH,94/level.height);c.translate((200-WIDTH*previewScale)/2,0);c.scale(previewScale,previewScale);c.drawImage(makeBackground(level.theme,level.height,level),0,0);const t=document.createElement('canvas');t.width=WIDTH;t.height=level.height;const previewGame=new Game(level.id);renderTerrain(previewGame,t);hazards(c,0,level.theme,level.height);ambientWorld(c,180,level);finaleLandmarks(c,180,level);c.drawImage(t,0,0);drawObjects(c,previewGame);scenery(c,0,level);button.append(preview);
  const info=document.createElement('span');const title=document.createElement('strong');title.textContent=`${String(level.id+1).padStart(2,'0')} · ${level.name}`;const sub=document.createElement('small');sub.textContent=`${level.difficulty} · ${level.world} · Rescue ${level.target}/${level.total} · 3★ under ${formatTime(level.targetTime)}${best[level.id]?` · Best ${best[level.id]}/${level.total}`:''}`;info.append(title,sub);button.append(info);
  if(!unlocked){sub.textContent=`${level.difficulty} · ${level.world} · ${unlockHint(level.id,starRecords)}`;button.setAttribute('aria-label',`Level ${level.id+1}: ${level.name}, locked`);}
  const medal=document.createElement('span');medal.className='level-stars';medal.setAttribute('role','img');medal.setAttribute('aria-label',stars+' of 3 stars');medal.innerHTML=starsMarkup(stars);button.append(medal);

  button.addEventListener('click',()=>{if(level.id===game.levelIndex){$('#levels-dialog').close();return;}if(started&&!game.result){pendingLevel=level.id;$('#level-confirm').classList.remove('hidden');$('#level-confirm').scrollIntoView({block:'nearest'});}else changeLevel(level.id);});list.append(button);
 }
 openDialog('#levels-dialog');
}
$('#choose-level').addEventListener('click',showLevels);$('#levels-button').addEventListener('click',showLevels);$('#cancel-level').addEventListener('click',()=>{$('#level-confirm').classList.add('hidden');pendingLevel=null;});$('#confirm-level').addEventListener('click',()=>{if(pendingLevel!==null)changeLevel(pendingLevel);});
window.addEventListener('keydown',e=>{if(document.querySelector('dialog[open]'))return;if(e.code==='Space'){e.preventDefault();togglePause();}if(['1','2','3','4'].includes(e.key)){select(['walk','block','build','dig'][Number(e.key)-1]);}if(e.key.toLowerCase()==='f')toggleSpeed();if(e.key==='.')singleStep();});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&started){paused=true;soundtrack.pause();sync();}last=0;accumulator=0;});
loadIconArt().then(()=>{
  for(const small of document.querySelectorAll('.skill-picture'))skillIcon(small.getContext('2d'),small.width,small.height,small.dataset.pose);
  for(const icon of document.querySelectorAll('[data-ui-icon]'))uiIcon(icon.getContext('2d'),icon.width,icon.height,icon.dataset.uiIcon);
}).catch(error=>console.error('Unable to load character icon artwork',error));
function draw(){
  ctx.imageSmoothingEnabled=false;ctx.drawImage(background,0,0);
  if(renderedRevision!==game.revision){renderTerrain(game,terrain);renderedRevision=game.revision;}
  hazards(ctx,sceneryTick,game.level.theme,game.height);
  ambientWorld(ctx,sceneryTick,game.level);finaleLandmarks(ctx,sceneryTick,game.level);
  ctx.drawImage(terrain,0,0);drawObjects(ctx,game);scenery(ctx,game.tick,game.level,game.spawned,game.lastSpawnTick,sceneryTick,game);
  if(game.level.theme==='woodland')for(let i=0;i<16;i++){const t=game.tick/100+i*4,x=80+(i*67)%870+Math.sin(t)*8,y=65+(i*47)%260+Math.cos(t*.7)*5;ctx.globalAlpha=.2+(Math.sin(t)+1)*.2;ctx.fillStyle='#e5db91';ctx.fillRect(x,y,2,2);}ctx.globalAlpha=1;
  drawSplats(ctx,game.effects,game.tick);impactAudio.consume(game.effects,soundtrack.volume,soundtrack.muted);
  exitPortal(ctx,game.level,game.tick,game.units.some(u=>u.state==='exit'));
  if(pointer)hover=pick(pointer.x,pointer.y);else hover=null;
  for(const u of game.units){
    if(u.state==='drown'){drawDrowning(ctx,u,game.tick,character,game.height);continue;}
    if(u.state==='exit'){enteringLemming(ctx,u,game.level,game.tick);continue;}
    if(u===hover){ctx.strokeStyle=game.canAssign(u,selected)?'#e1b982':'#d8f7a2';ctx.lineWidth=1;ctx.strokeRect(Math.round(u.x)-12,Math.round(u.y)-30,25,33);ctx.fillStyle=ctx.strokeStyle;ctx.beginPath();ctx.moveTo(u.x-3,u.y-35);ctx.lineTo(u.x+3,u.y-35);ctx.lineTo(u.x,u.y-31);ctx.fill();}
    if(u.state==='slide'){ctx.save();ctx.translate(u.x,u.y-5);ctx.rotate(-u.dir*.5);character(ctx,0,5,'fall',u.dir,game.tick);ctx.restore();ctx.fillStyle='#dec18e';for(let i=0;i<4;i++)ctx.fillRect(u.x-u.dir*(5+i*3),u.y-2-(game.tick+i*3)%7,2,2);}
    else character(ctx,u.x,u.y,u.state,u.dir,game.tick);skillEquipment(ctx,u,game.tick);
    if(u.state==='block'){ctx.fillStyle='#e8c988';ctx.fillRect(u.x-4,u.y-31,8,2);}
    if(u.state==='build'){ctx.fillStyle='#e8c988';ctx.fillRect(u.x-7,u.y-32,14*(16-u.steps)/16,2);}
  }
  if(hover&&selected==='build'&&!game.canAssign(hover,'build')){
    ctx.globalAlpha=.4;ctx.fillStyle='#e2c592';for(let i=1;i<=16;i++)ctx.fillRect(hover.x+hover.dir*i*6-4,hover.y-i*2,10,1);ctx.globalAlpha=1;
  }
  if(hover&&selected==='dig'&&!game.canAssign(hover,'dig')){ctx.strokeStyle='#e2c59288';ctx.setLineDash([3,3]);ctx.strokeRect(hover.x-11,hover.y,23,40);ctx.setLineDash([]);}
}
function frame(now){
  if(last===0)last=now;const dt=Math.min(now-last,100);last=now;
  if(!paused&&!document.hidden)sceneryTick+=dt*.06*(started?speed:1);
  if(started&&!paused&&!game.result){accumulator+=dt*speed;while(accumulator>=1000/60){game.step();accumulator-=1000/60;if(game.result){result();break;}}}else accumulator=0;
  draw();sync();requestAnimationFrame(frame);
}
soundtrack.setLevel(game.levelIndex);updateLevelUI();sync();requestAnimationFrame(frame);



$('#map-up').addEventListener('click',()=>$('#viewport').scrollBy({top:-$('#viewport').clientHeight*.7,behavior:'smooth'}));
$('#map-down').addEventListener('click',()=>$('#viewport').scrollBy({top:$('#viewport').clientHeight*.7,behavior:'smooth'}));
$('#viewport').addEventListener('scroll',()=>{const v=$('#viewport');$('#map-depth').textContent=`Depth ${Math.min(100,Math.max(0,Math.round(v.scrollTop/Math.max(1,v.scrollHeight-v.clientHeight)*100)))}%`;pointer=null;hover=null;});
