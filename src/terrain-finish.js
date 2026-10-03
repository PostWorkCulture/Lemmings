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

// Snow and moss settle on substantial upward-facing ground. Thin remnants
// and steep edge fragments retain their material colour instead of becoming
// glowing stripes. This is colour coverage only: no collision/alpha is erased.
export function soilCoatingCoverage(terrain,width,height,depth=exposedSoilDepth(terrain,width,height)){
 const coverage=new Uint8Array(terrain.length),clamp=n=>Math.max(0,Math.min(1,n));
 for(let y=0;y<height;y++)for(let x=0;x<width;x++){
  const p=y*width+x;if(terrain[p]!==1||depth[p]===BURIED_DEPTH)continue;
  if(depth[p]>1){coverage[p]=coverage[p-width];continue;}
  let thickness=0,support=0;
  while(thickness<14&&(y+thickness>=height||terrain[p+thickness*width]===1))thickness++;
  for(let dx=-3;dx<=3;dx++)if(x+dx<0||x+dx>=width||y+6>=height||terrain[(y+6)*width+x+dx]===1)support++;
  coverage[p]=Math.round(255*clamp((thickness-5)/9)*clamp((support-3)/4));
 }
 return coverage;
}

// A 3:4 chamfer measures diagonal edges as well as vertical/horizontal ones.
// Values are in thirds of a pixel. Off-canvas terrain continues beyond the
// frame, so the screen boundary never gains an artificial bevel.
export function soilEdgeDistance(terrain,width,height){
 const d=new Uint8Array(terrain.length),limit=120;
 for(let p=0;p<d.length;p++)if(terrain[p]===1)d[p]=limit;
 for(let y=0;y<height;y++)for(let x=0;x<width;x++){
  const p=y*width+x;if(!d[p])continue;
  d[p]=Math.min(d[p],x?d[p-1]+3:limit,y?d[p-width]+3:limit,
   x&&y?d[p-width-1]+4:limit,x<width-1&&y?d[p-width+1]+4:limit);
 }
 for(let y=height-1;y>=0;y--)for(let x=width-1;x>=0;x--){
  const p=y*width+x;if(!d[p])continue;
  d[p]=Math.min(d[p],x<width-1?d[p+1]+3:limit,y<height-1?d[p+width]+3:limit,
   x<width-1&&y<height-1?d[p+width+1]+4:limit,x&&y<height-1?d[p+width-1]+4:limit);
 }
 return d;
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
