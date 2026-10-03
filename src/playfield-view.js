// The collision map remains in world coordinates while its terrain fills the viewport.
// Decorative sprites keep their proportions; collision-bearing apparatus follows terrain.
const scales=new WeakMap(),naturalContexts=new WeakSet();
export function syncPlayfieldScale(canvas){
 const rect=canvas.getBoundingClientRect(),x=rect.width/canvas.width,y=rect.height/canvas.height;
 const scale={x:x>0?x:1,y:y>0?y:1};scales.set(canvas,scale);return scale;
}
export function syncPlayfieldBackdrop(viewport,background){
 const [r,g,b]=background.getContext('2d').getImageData(0,0,1,1).data;
 viewport.style.backgroundColor=`rgb(${r}, ${g}, ${b})`;
}
export function playfieldPoint(canvas,clientX,clientY){
 const rect=canvas.getBoundingClientRect();
 return {x:(clientX-rect.left)*canvas.width/rect.width,y:(clientY-rect.top)*canvas.height/rect.height};
}
export function spriteHitDistance(canvas,point,x,y,offsetY=-12){
 const scale=scales.get(canvas)||{x:1,y:1},uniform=Math.min(scale.x,scale.y);
 return Math.hypot((point.x-x)*scale.x/uniform,(point.y-y)*scale.y/uniform-offsetY);
}
export function withNaturalSprite(context,x,y,draw){
 const scale=scales.get(context.canvas);
 // Nested character calls (for example inside the exit swirl) inherit their outer frame.
 if(!scale||naturalContexts.has(context)||Math.abs(scale.x-scale.y)<.00001)return draw();
 const uniform=Math.min(scale.x,scale.y);
 context.save();naturalContexts.add(context);
 try{context.translate(x,y);context.scale(uniform/scale.x,uniform/scale.y);context.translate(-x,-y);return draw();}
 finally{naturalContexts.delete(context);context.restore();}
}
