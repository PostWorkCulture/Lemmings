const tree=(key,x,y,height)=>({key,x,y,height});
export const FOREST_TREE_ASPECT={'old-oak':1106/1173,'silver-birch':930/1508,'weeping-willow':1148/1280};
// Authored on actual flat footing, away from doors, tools and drop/landing lanes.
export const FOREST_TREE_LAYOUTS={
 0:[tree('old-oak',590,220,124),tree('silver-birch',298,220,96),tree('weeping-willow',790,366,83)],
 1:[tree('silver-birch',280,235,80),tree('old-oak',480,225,116),tree('silver-birch',700,235,88)],
 2:[tree('silver-birch',280,140,100),tree('weeping-willow',520,250,105),tree('old-oak',740,366,110)],
 // The sawmill has narrow timber walkways and working machinery, not tree footing.
 3:[],
 4:[tree('old-oak',438,155,104),tree('silver-birch',660,160,105),tree('weeping-willow',278,370,56)],
 20:[tree('silver-birch',400,220,126),tree('old-oak',708,220,145),tree('weeping-willow',480,560,115)],
 21:[tree('weeping-willow',284,800,52),tree('silver-birch',570,560,125),tree('old-oak',736,290,52)],
 22:[tree('old-oak',380,260,72),tree('silver-birch',720,540,72),tree('weeping-willow',520,830,72)],
 23:[tree('old-oak',400,250,136),tree('silver-birch',520,390,112),tree('weeping-willow',682,390,125)],
 24:[tree('silver-birch',260,330,126),tree('old-oak',520,330,145),tree('weeping-willow',520,650,68),tree('silver-birch',700,900,72)]
};
export function forestTreePlacements(level){return level.theme==='woodland'?FOREST_TREE_LAYOUTS[level.id]||[]:[];}
export function forestTreeBounds(spec){
 const half=spec.height*FOREST_TREE_ASPECT[spec.key]/2+spec.height*.025;
 return {left:spec.x-half,right:spec.x+half,top:spec.y-spec.height,bottom:spec.y};
}
export function forestTreePlacementClear(spec,terrainAt){
 if(!terrainAt)return false;const b=forestTreeBounds(spec);
 if(b.left<4||b.right>996||b.top<12)return false;
 // Check the spread of the roots, not only the middle of the trunk.
 const rootHalf=Math.max(10,spec.height*FOREST_TREE_ASPECT[spec.key]*.29);
 for(let dx=-rootHalf;dx<=rootHalf;dx+=3)if(!terrainAt(spec.x+dx,spec.y))return false;
 if(!terrainAt(spec.x,spec.y)||!terrainAt(spec.x+rootHalf,spec.y))return false;
 for(let y=b.top;y<spec.y-3;y+=4)for(let x=b.left;x<=b.right;x+=4)if(terrainAt(x,y))return false;
 return true;
}
