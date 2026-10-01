import {exposedSoilDepth} from './terrain-finish.js';
// Large material marks, softly bevelled silhouettes and a quiet palette keep
// the *editable collision surface* in charge. There is no scenic collision art.
const bases=new WeakMap(),paintedGames=new WeakMap();
let atlas=null;
if(typeof document!=='undefined'){
 const image=new Image();image.src=new URL('../assets/terrain/original-materials.png',import.meta.url).href;
 try{await image.decode();atlas=image;}catch{ /* Offline fallback retains readable physical terrain. */ }
}

const clamp=(n,a=0,b=255)=>Math.max(a,Math.min(b,n));
const mix=(a,b,t)=>a.map((v,i)=>Math.round(v+(b[i]-v)*t));
const noise=(x,y)=>{let n=Math.imul(x+37,374761393)^Math.imul(y+71,668265263);n=Math.imul(n^(n>>>13),1274126177);return (n>>>24)/255;};
function baseTexture(level,height){
 let base=bases.get(level);if(base)return base;
 base=new Uint8ClampedArray(1000*height*3);const key=level.theme,v=level.campaignIndex%10;
 const wood=key==='woodland',sand=key==='beach',snow=key==='alpine',lava=key==='volcano';
 for(let y=0;y<height;y++)for(let x=0;x<1000;x++){
  const grit=(noise(x,y)-.5)*3,n=noise(Math.floor(x/36),Math.floor(y/28));let rgb;
  if(wood){
   const grain=Math.sin(x*.063+Math.sin(y*.011+v)*1.8+Math.sin(y*.039)*.28),wide=Math.sin(x*.012+y*.003+v);
   rgb=mix([77,43,27],[143,89,46],.44+wide*.16+grain*.21);
   const groove=Math.sin(x*.11+Math.sin(y*.014)*2.2);if(groove>.94)rgb=mix(rgb,[47,31,23],.42);
   const kx=170+(Math.floor(y/230)%3)*270,ky=Math.floor(y/230)*230+120;
   const r=Math.hypot((x-kx)*.8,(y-ky)*1.4);
   if(r<58){const ring=Math.sin(r*.36+Math.sin(Math.atan2(y-ky,x-kx)*3));rgb=mix(rgb,[57,32,21],Math.max(0,ring)*.28*(1-r/65));}
  }else if(sand){
   const layer=y+Math.sin(x*.008+v)*24+Math.sin(x*.021+v*.7)*6;
   rgb=mix([197,132,58],[247,200,105],.57+Math.sin(layer*.04)*.19+Math.sin(x*.003+y*.009)*.11);
   if(layer%48<1.6)rgb=mix(rgb,[164,98,50],.36);
   if(layer%48>43)rgb=mix(rgb,[255,224,150],.23);
  }else if(snow){
   const facet=Math.sin(x*.013+y*.007+v)+Math.cos(x*.026-y*.011);
   rgb=mix([56,100,134],[134,181,204],.46+facet*.14);
   const crack=(x+Math.floor(y*.37)+Math.round(Math.sin(y*.025)*8))%101;
   if(crack<2)rgb=mix(rgb,[36,73,112],.55);else if(crack<5)rgb=mix(rgb,[172,218,229],.5);
   if((y+Math.sin(x*.012)*13)%70<2)rgb=mix(rgb,[68,120,153],.36);
  }else if(lava){
   const column=Math.floor((x+Math.sin(y*.012)*8)/66),face=((x+Math.sin(y*.012)*8)%66)/66;
   rgb=mix([22,21,31],[70,54,72],.22+face*.48+n*.12);
   if(face<.055)rgb=[17,17,24];else if(face<.085)rgb=[80,64,80];
   if((y+column*31)%117<3)rgb=mix(rgb,[15,15,22],.7);
  }else rgb=[165,137,184];
  const i=(y*1000+x)*3;base[i]=clamp(rgb[0]+grit);base[i+1]=clamp(rgb[1]+grit);base[i+2]=clamp(rgb[2]+grit);
 }
 if(atlas){
  const tile=document.createElement('canvas');tile.width=1000;tile.height=height;const c=tile.getContext('2d');
  const quadrant={woodland:[0,0],beach:[1,0],alpine:[0,1],volcano:[1,1]}[key];
  if(quadrant){const half=atlas.width/2;c.save();if(v%2){c.translate(1000,0);c.scale(-1,1);}c.drawImage(atlas,quadrant[0]*half,quadrant[1]*half,half,half,0,0,1000,height);c.restore();
   const painted=c.getImageData(0,0,1000,height).data;
   for(let i=0;i<1000*height;i++)for(let channel=0;channel<3;channel++){const adjustment=key==='volcano'?.68:key==='beach'?1.1:1;const value=painted[i*4+channel]*adjustment,grainWeight=key==='woodland'?.28:.18;base[i*3+channel]=base[i*3+channel]*grainWeight+value*(1-grainWeight);}
  }
 }
 bases.set(level,base);return base;
}
export function paintSculptedMaterials(c,game){
 const key=game.level.theme;if(!['woodland','beach','alpine','volcano','candy'].includes(key))return;
 const w=1000,h=game.height,t=game.terrain,size=t.length,candy=key==='candy',base=candy?null:baseTexture(game.level,h);
 const old=paintedGames.get(game),previous=old?.level===game.level&&old.image.height===h?old:null;let x0=0,y0=0,x1=w,y1=h;
 if(previous){x0=w;y0=h;x1=0;y1=0;for(let p=0;p<size;p++)if(t[p]!==previous.mask[p]){const x=p%w,y=Math.floor(p/w);x0=Math.min(x0,x);y0=Math.min(y0,y);x1=Math.max(x1,x+1);y1=Math.max(y1,y+1);}
  if(x0===w){c.putImageData(previous.image,0,0);return;}
  x0=Math.max(0,x0-45);x1=Math.min(w,x1+45);y0=Math.max(0,y0-45);y1=Math.min(h,y1+70);
 }
 // Distance to the current, excavated edge gives tunnels the same finish as cliffs.
 const surfaceDepth=exposedSoilDepth(t,w,h);
 const distance=new Uint8Array(size);for(let i=0;i<size;i++)distance[i]=t[i]===1?40:0;
 for(let y=0;y<h;y++)for(let x=0;x<w;x++){const i=y*w+x;if(distance[i])distance[i]=Math.min(distance[i],x?distance[i-1]+1:40,y?distance[i-w]+1:40);}
 for(let y=h-1;y>=0;y--)for(let x=w-1;x>=0;x--){const i=y*w+x;if(distance[i])distance[i]=Math.min(distance[i],x<w-1?distance[i+1]+1:40,y<h-1?distance[i+w]+1:40);}
 const image=previous?.image||c.getImageData(0,0,w,h),d=image.data;
 if(previous){const fresh=c.getImageData(x0,y0,x1-x0,y1-y0);for(let y=y0;y<y1;y++)d.set(fresh.data.subarray((y-y0)*(x1-x0)*4,(y-y0+1)*(x1-x0)*4),(y*w+x0)*4);}
 for(let y=y0;y<y1;y++)for(let x=x0;x<x1;x++){
  const p=y*w+x,i=p*4;if(t[p]!==1)continue;
  if(['water','lava'].includes(game.level.hazard)&&y>=game.hazardY)continue;
  let rgb=candy?[d[i],d[i+1],d[i+2]]:[base[p*3],base[p*3+1],base[p*3+2]];
  const edge=distance[p],up=surfaceDepth[p],bottom=y+1<h&&!t[p+w],left=x&&!t[p-1];
  if(!candy){
   if(key==='woodland'&&up<13+Math.sin(x*.09)*3){rgb=mix([42,83,31],[121,175,56],clamp(1-up/18,0,1));if(up<3)rgb=[177,208,99];}
   if(key==='beach'&&up<15)rgb=mix(rgb,[255,228,152],(1-up/18)*.82);
   if(key==='alpine'&&up<25+Math.sin(x*.031)*9+Math.sin(x*.11)*3){rgb=mix([164,203,218],[247,253,251],Math.pow(clamp(1-up/45,0,1),.55));if(up<3)rgb=[249,254,251];}
  }
  if(edge<15){const slopeX=(x<w-1?distance[p+1]:edge)-(x?distance[p-1]:edge),slopeY=(y<h-1?distance[p+w]:edge)-(y?distance[p-w]:edge);
   const light=clamp((slopeX*.35+slopeY*.6),-1,1)*(1-edge/16);
   rgb=light>0?mix(rgb,key==='volcano'?[159,131,153]:[255,242,208],light*(candy?.16:.24)):mix(rgb,[8,16,25],-light*(candy?.22:.38));
  }
  if(key==='alpine'&&up>38){const seam=Math.sin(x*.012+y*.022+game.level.id*.7);if(seam>.97)rgb=mix(rgb,[195,231,237],.17);}
  if(key==='woodland'&&up>16){const sheen=Math.sin(x*.023+y*.008+game.level.id);if(sheen>.6)rgb=mix(rgb,[202,140,73],(sheen-.6)*.15);}
  if(edge===1&&(bottom||left))rgb=mix(rgb,[15,18,24],candy?.28:.5);
  d[i]=rgb[0];d[i+1]=rgb[1];d[i+2]=rgb[2];
 }
 c.putImageData(image,0,0);paintedGames.set(game,{image,mask:t.slice(),level:game.level});
}
