import {TERRAIN_CLEARANCES} from './terrain-clearances.js';

// Continue existing outer landforms through the obsolete authoring gutters.
// The final collision mask is the source: both art and lemmings use these pixels.
export function extendOriginalBoundaries(game){
 const l=game.level;
 if(!['woodland','alpine','volcano'].includes(l.theme)||l.connectedStudy!==undefined||l.sweetReboot!==undefined)return;
 const extents=[];
 for(const [x,,width,,type=1] of l.terrain||[])if(type&&width>=60)extents.push([x,x+width]);
 for(const shape of l.shapes||[])if((shape.type??1)>0){const xs=shape.points.map(p=>p[0]),a=Math.min(...xs),b=Math.max(...xs);if(b-a>=60)extents.push([a,b]);}
 const leftEdges=extents.map(e=>e[0]).filter(x=>x>=0&&x<=120),rightEdges=extents.map(e=>e[1]-1).filter(x=>x>=879&&x<1000);
 if(!leftEdges.length&&!rightEdges.length)return;
 // Different shelves may meet the same border at slightly different margins.
 const width=1000,left=Math.floor(Math.max(...leftEdges)),right=Math.ceil(Math.min(...rightEdges));
 const keep=new Uint8Array(250*Math.ceil(game.height/4)),spans=TERRAIN_CLEARANCES[l.id]||[];
 for(let n=0;n<spans.length;n+=3)keep.fill(1,spans[n]*250+spans[n+1],spans[n]*250+spans[n+2]);
 const safe=(x,y)=>!keep[Math.floor(y/4)*250+Math.floor(x/4)];
 // A short sample inside the landform avoids reproducing clipped rounded
 // corners as rectangular lips. No extension reaches the central puzzle.
 const sampleLeft=Math.min(136,left+16),sampleRight=Math.max(863,right-16);
 const source=game.terrain.slice();
 for(let y=0;y<Math.min(game.height,game.hazardY);y++){
  const row=y*width;
  if(left>=0&&left<=120){
   const material=source[row+sampleLeft];
   if(material)for(let x=0;x<sampleLeft;x++)if(!source[row+x]&&safe(x,y))game.terrain[row+x]=material;
  }
  if(right>=879&&right<width){
   const material=source[row+sampleRight];
   if(material)for(let x=sampleRight+1;x<width;x++)if(!source[row+x]&&safe(x,y))game.terrain[row+x]=material;
  }
 }
}
