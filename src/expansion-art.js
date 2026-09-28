import {prepareSweetPuzzle} from './sweet-puzzles.js';
import {drawSweetKind} from './sweet-range.js';
const crops={5:[89,25,182,168],0:[32,58,296,80],1:[139,30,82,140],2:[32,54,296,88],3:[32,51,296,95],4:[25,62,310,78],9:[61,55,238,91]};
const artCache=new WeakMap();
export function paintSweetTerrain(c,game){
 let art=artCache.get(game.level);
 if(!art){art=document.createElement('canvas');art.width=1000;art.height=game.height;const a=art.getContext('2d'),tile=document.createElement('canvas');tile.width=360;tile.height=200;const t=tile.getContext('2d');
  if(game.level.bonusSweet!==undefined)prepareSweetPuzzle(game.level.bonusSweet,art);
  for(const p of game.level.sweetPieces||[]){t.clearRect(0,0,360,200);drawSweetKind(t,p.kind,p.kind!==5);a.drawImage(tile,...crops[p.kind],p.x,p.y,p.w,p.h);}
  if(game.level.sweetPieces?.some(p=>p.kind===5)){a.textAlign='center';a.textBaseline='middle';a.font='900 34px Arial';a.lineWidth=3;a.strokeStyle='#694934';a.strokeText('Double Dip',610,350);a.fillStyle='#ffe757';a.fillText('Double Dip',610,350);a.font='700 13px Arial';a.fillStyle='#fff5df';a.fillText('ORANGE + CHERRY',610,378);}
  artCache.set(game.level,art);
 }
 // Keep every excavated hole visible and leave yellow player-built steps untouched.
 const overlay=document.createElement('canvas');overlay.width=1000;overlay.height=game.height;const o=overlay.getContext('2d');o.drawImage(art,0,0);
 const mask=o.createImageData(1000,game.height);for(let i=0;i<game.terrain.length;i++)if(game.terrain[i]===1)mask.data[i*4+3]=255;
 const stencil=document.createElement('canvas');stencil.width=1000;stencil.height=game.height;stencil.getContext('2d').putImageData(mask,0,0);o.globalCompositeOperation='destination-in';o.drawImage(stencil,0,0);c.drawImage(overlay,0,0);
}
