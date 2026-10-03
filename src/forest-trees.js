import {forestTreePlacements,forestTreePlacementClear} from './forest-tree-data.js';
export {forestTreePlacementClear} from './forest-tree-data.js';
// Sparse, grounded foliage for the physical Forest campaign.
import {withNaturalSprite} from './playfield-view.js';
export const FOREST_TREE_STUDIES=[
 {key:'old-oak',name:'Old oak',x:590,y:220,height:124},
 {key:'silver-birch',name:'Silver birch',x:298,y:220,height:96},
 {key:'weeping-willow',name:'Weeping willow',x:790,y:366,height:83}
];
const assets=new Map();
export const forestTreesReady=typeof document==='undefined'?Promise.resolve():Promise.all(FOREST_TREE_STUDIES.map(async spec=>{
 const image=new Image();image.src=new URL('../assets/forest-studies/'+spec.key+'.png',import.meta.url).href;await image.decode();
 const sample=document.createElement('canvas');sample.width=image.width;sample.height=image.height;const c=sample.getContext('2d',{willReadFrequently:true});c.drawImage(image,0,0);
 const data=c.getImageData(0,0,image.width,image.height).data;let x0=image.width,y0=image.height,x1=0,y1=0;
 for(let y=0;y<image.height;y++)for(let x=0;x<image.width;x++)if(data[(y*image.width+x)*4+3]>24){x0=Math.min(x0,x);x1=Math.max(x1,x);y0=Math.min(y0,y);y1=Math.max(y1,y);}
 assets.set(spec.key,{image,x:x0,y:y0,w:x1-x0+1,h:y1-y0+1});
})).catch(error=>console.warn('Forest tree artwork unavailable',error));
export function drawForestTree(c,key,x,base,height,seconds){
 const asset=assets.get(key);if(!asset)return;
 const width=height*asset.w/asset.h,phase=FOREST_TREE_STUDIES.findIndex(s=>s.key===key)*1.8;
 const sway=Math.sin(seconds*.55+phase)*.7+Math.sin(seconds*.91+phase)*.3;
 c.save();c.imageSmoothingEnabled=true;c.imageSmoothingQuality='high';
 // Connected one-pixel strips progressively bend from completely fixed roots.
 const slices=Math.ceil(height),step=asset.h/slices;
 for(let i=0;i<slices;i++){
  const v=i/slices,weight=v>.84?0:Math.pow((.84-v)/.84,2.25),flutter=Math.sin(seconds*1.35+v*15+phase)*Math.sin(Math.PI*v);
  const dx=(sway*height*.019+flutter*height*.004)*weight,sy=asset.y+i*step,dy=base-height+i*height/slices;
  c.drawImage(asset.image,asset.x,sy,asset.w,Math.min(step,asset.y+asset.h-sy),x-width/2+dx,dy,width,height/slices);
 }
 c.restore();
}
export function drawForestTrees(c,tick,level,terrainAt){
 if(level.theme!=='woodland')return;
 const seconds=typeof matchMedia==='function'&&matchMedia('(prefers-reduced-motion: reduce)').matches?0:tick/60;
 for(const spec of forestTreePlacements(level))if(forestTreePlacementClear(spec,terrainAt)){
  withNaturalSprite(c,spec.x,spec.y,()=>drawForestTree(c,spec.key,spec.x,spec.y+1,spec.height,seconds));
 }
}
