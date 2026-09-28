import {LEVELS} from './levels.js';import {SKILLS} from './skills.js';
import {CONNECTED_WORLDS} from './connected-world-plans.js';
const $=s=>document.querySelector(s),nav=$('nav'),grid=$('.grid'),images=new Map();
let manifest,worldIndex=-1,levelIndex=0,revision=0;
async function imageFor(file){if(!images.has(file)){const image=new Image();image.src=file;images.set(file,image.decode().then(()=>image));}return images.get(file);}
async function draw(canvas,entry){const image=await imageFor(entry.file),[x,y,w,h]=entry.source;canvas.width=w;canvas.height=h;canvas.getContext('2d').drawImage(image,x,y,w,h,0,0,w,h);}
function readHash(){const [key,number]=location.hash.slice(1).split('/');return [Math.max(0,CONNECTED_WORLDS.findIndex(w=>w.key===key)),Math.max(0,Math.min(9,(Number(number)||1)-1))];}
async function select(wi,li){
 const version=++revision,w=CONNECTED_WORLDS[wi],l=w.levels[li];levelIndex=li;
 history.replaceState(null,'',`#${w.key}/${li+1}`);
 $('main').style.setProperty('--scene',w.color);$('#title').textContent=`${l.id+1}. ${l.name}`;$('#counter').textContent=`${w.name} · ${li+1} / 10 · ${l.structure}`;
 $('#terrain').textContent=l.terrain;$('#puzzle').textContent=l.puzzle;const playable=LEVELS[l.id+10];$('#skills').textContent=Object.keys(playable.stock).map(k=>SKILLS[k].name).join(' · ');$('#puzzle').textContent=playable.hints.slice(1).join(' ');$('#play').href=`world-playtest.html?level=${playable.id}`;$('#rescue-link').href=`original-worlds.html#${playable.campaignIndex+1}`;$('#check').textContent=l.check;
 $('#previous').disabled=wi===0&&li===0;$('#next').disabled=wi===4&&li===9;
 $('#landscape').setAttribute('aria-label',`${l.name}: ${l.structure}`);
 for(const button of nav.children)button.setAttribute('aria-pressed',String(Number(button.dataset.world)===wi));
 if(wi!==worldIndex){worldIndex=wi;grid.replaceChildren();w.levels.forEach((level,i)=>{const button=document.createElement('button');button.className='tile';button.setAttribute('aria-label',`${level.id+1}. ${level.name}`);button.onclick=()=>select(wi,i).then(()=>$('.toolbar').scrollIntoView({block:'start',behavior:'smooth'}));const canvas=document.createElement('canvas');canvas.setAttribute('aria-hidden','true');const title=document.createElement('span');title.textContent=`${level.id+1}. ${level.name}`;button.append(canvas,title);grid.append(button);draw(canvas,manifest[w.key][i]).catch(()=>{title.textContent+=' — image unavailable';});});}
 for(const [i,button]of [...grid.children].entries())button.setAttribute('aria-pressed',String(i===li));
 // Decode first, then paint only if selection has not changed during loading.
 const entry=manifest[w.key][li];try{const image=await imageFor(entry.file);if(version!==revision)return;const canvas=$('#landscape'),[x,y,width,height]=entry.source;canvas.width=width;canvas.height=height;canvas.getContext('2d').drawImage(image,x,y,width,height,0,0,width,height);canvas.dataset.level=String(l.id);}catch{$('#title').textContent='Could not load this landscape. Please reload.';}
}
function move(delta){const index=worldIndex*10+levelIndex+delta;if(index>=0&&index<50)select(Math.floor(index/10),index%10);}
for(const [i,w]of CONNECTED_WORLDS.entries()){const button=document.createElement('button');button.dataset.world=i;button.textContent=`${w.name} · 10`;button.onclick=()=>select(i,0);nav.append(button);}
$('#previous').onclick=()=>move(-1);$('#next').onclick=()=>move(1);
window.addEventListener('hashchange',()=>select(...readHash()));
try{const response=await fetch('assets/worlds/studies/manifest.json');if(!response.ok)throw Error();manifest=await response.json();await select(...readHash());}catch{$('#title').textContent='Could not load the review. Please reload.';}
