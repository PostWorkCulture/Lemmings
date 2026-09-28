import {SWEET_PUZZLES} from './sweet-puzzles.js';
import {paintPolishedSweet} from './sweet-materials.js';
const artCache=new WeakMap();
export function paintSweetTerrain(c,game){
 let art=artCache.get(game.level);
 if(!art){
  art=document.createElement('canvas');art.width=1000;art.height=game.height;const a=art.getContext('2d');
  // Runtime painting uses the saved outlines, never regenerates physics from artwork.
  if(game.level.bonusSweet!==undefined){
   const puzzle=SWEET_PUZZLES[game.level.bonusSweet];
   for(const [kind,x,y,w,h]of puzzle.pieces)paintPolishedSweet(a,{kind,x,y,w,h});
   // The authored exit has a tiny flattened landing; extend its own material into that lip.
   const ex=Math.round(game.level.exitX),ey=Math.round(game.level.exitY);
   for(let x=ex-42;x<=ex+42;x++)a.drawImage(art,x,ey+8,1,1,x,ey,1,8);
  }
  for(const p of game.level.sweetPieces||[])paintPolishedSweet(a,p,false);
  artCache.set(game.level,art);
 }
 // Keep every excavated hole visible and leave yellow player-built steps untouched.
 const overlay=document.createElement('canvas');overlay.width=1000;overlay.height=game.height;const o=overlay.getContext('2d');o.drawImage(art,0,0);
 const mask=o.createImageData(1000,game.height);for(let i=0;i<game.terrain.length;i++)if(game.terrain[i]===1)mask.data[i*4+3]=255;
 const stencil=document.createElement('canvas');stencil.width=1000;stencil.height=game.height;stencil.getContext('2d').putImageData(mask,0,0);o.globalCompositeOperation='destination-in';o.drawImage(stencil,0,0);c.drawImage(overlay,0,0);
}
