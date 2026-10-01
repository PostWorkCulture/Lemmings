// Surface coatings start at real air-to-soil boundaries, never the edge of the
// canvas or a join to steel. The sentinel keeps buried material uncapped.
export const BURIED_DEPTH=65535;
export function exposedSoilDepth(terrain,width,height){
 const depth=new Uint16Array(terrain.length);
 for(let y=0;y<height;y++)for(let x=0;x<width;x++){
  const p=y*width+x;if(terrain[p]!==1)continue;
  depth[p]=!y?BURIED_DEPTH:!terrain[p-width]?1:terrain[p-width]===1?Math.min(BURIED_DEPTH,depth[p-width]+1):BURIED_DEPTH;
 }
 return depth;
}

// Coverage is applied only inside convex corners. Straight working ledges and
// player-built steps stay crisp, and collision pixels are never changed.
export function cornerCoverage(terrain,width,height,x,y){
 const p=y*width+x;if(!terrain[p]||terrain[p]===3)return 255;
 const up=y>0&&!terrain[p-width],down=y<height-1&&!terrain[p+width];
 const left=x>0&&!terrain[p-1],right=x<width-1&&!terrain[p+1];
 if(!((up||down)&&(left||right)))return 255;
 return [255,255,192,128,64][Number(up)+Number(down)+Number(left)+Number(right)];
}
export function softenTerrainCorners(c,game){
 const w=1000,h=game.height,image=c.getImageData(0,0,w,h),d=image.data,t=game.terrain;
 for(let y=0;y<h;y++)for(let x=0;x<w;x++){
  const p=y*w+x;if(!t[p])continue;
  const coverage=cornerCoverage(t,w,h,x,y);if(coverage<255)d[p*4+3]=Math.round(d[p*4+3]*coverage/255);
 }
 c.putImageData(image,0,0);
}
