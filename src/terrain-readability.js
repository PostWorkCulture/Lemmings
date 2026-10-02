// The complete painting stays at its original colour and brightness. Routes
// are communicated by physical material edges, never by dark corridor masks.
export function illustratedBackdrop(texture,height,base,breaks=[]){
 const canvas=document.createElement('canvas');canvas.width=1000;canvas.height=height;
 const c=canvas.getContext('2d'),im=c.createImageData(1000,height),d=im.data,t=texture.data;
 for(let p=0;p<d.length;p+=4){const lum=t[p]*.2126+t[p+1]*.7152+t[p+2]*.0722;
  const alpha=t[p+3]/255*Math.max(0,Math.min(1,(lum-18)/28));
  for(let k=0;k<3;k++)d[p+k]=base[k]*(1-alpha)+t[p+k]*alpha;
  d[p+3]=255;
 }
 // A broken crossing is an actual opening in the illustrated bridge. Restrict
 // the tear to the bridge itself; never put a stripe across a whole passage.
 for(const gap of breaks)for(let x=gap.x;x<=gap.right;x++){
  const t=(x-gap.x)/Math.max(1,gap.right-gap.x),y=gap.leftY+(gap.rightY-gap.leftY)*t;
  const depth=12+5*Math.sin(Math.PI*t),edge=Math.min(x-gap.x,gap.right-x);
  for(let yy=Math.max(0,Math.floor(y-depth));yy<Math.min(height,y+depth);yy++){
   const a=Math.max(0,Math.min(1,edge+.35,depth-Math.abs(yy-y))),p=(yy*1000+x)*4;
   for(let k=0;k<3;k++)d[p+k]=d[p+k]*(1-a)+base[k]*a;
  }
 }
 c.putImageData(im,0,0);return canvas;
}
const noise=(x,y)=>{let a=Math.imul(x+59,374761393)^Math.imul(y+37,668265263);return ((a^(a>>>13))>>>0)%997/997;};
export function readableTerrain(image,g,walls,base,light,shafts=[]){
 const d=image.data,t=g.terrain,w=1000,h=g.height;
 // Small obstructions are coherent chunks of material, rather than slices of the rear illustration.
 for(const {x,y} of walls)for(let yy=Math.max(0,y-37);yy<Math.min(h,y);yy++)for(let xx=x;xx<x+18;xx++){
  const i=yy*w+xx;if(t[i]!==1)continue;const p=i*4,u=(xx-x)/17,v=(y-yy)/37;
  const form=.85+Math.sin(u*Math.PI)*.22+(1-u)*.16,grain=(noise(xx,yy)-.5)*.1;
  const seam=8+Math.sin((yy-y)*.48)*2.2,crack=v>.02&&v<.65&&Math.abs(xx-x-seam)<.8;
  const chip=v>.1&&v<.58&&Math.abs(xx-x-seam-1.2)<.7;
  for(let k=0;k<3;k++)d[p+k]=crack?base[k]*.3:chip?light[k]:(base[k]*(form+grain)*.56+light[k]*.44);
 }
 // A single, soft material bevel follows the real boundary. Spreading the
 // highlight over three pixels avoids a bright, jagged wire around every cut.
 for(let y=1;y<h-1;y++)for(let x=1;x<w-1;x++){
  const i=y*w+x;if(t[i]!==1)continue;const p=i*4;
  const up=!t[i-w]?1:y>1&&!t[i-w*2]?2:y>2&&!t[i-w*3]?3:0;
  const down=!t[i+w]?1:y<h-2&&!t[i+w*2]?2:0;
  const left=!t[i-1],right=!t[i+1];
  if(up){const amount=[0,.58,.32,.14][up];for(let k=0;k<3;k++)d[p+k]=d[p+k]*(1-amount)+light[k]*amount;}
  else if(down){const shade=down===1?.91:.97;for(let k=0;k<3;k++)d[p+k]*=shade;}
  if(left||right){for(let k=0;k<3;k++)d[p+k]=left?d[p+k]*.82+light[k]*.18:d[p+k]*.88+light[k]*.12;}
 }
 // A short fracture in the actual shelf identifies each authored digging spot.
 // This mark disappears with the material; nothing floats above an opened shaft.
 for(const {x,y} of shafts)for(let dx=-9;dx<=9;dx++){
  const xx=Math.round(x+dx),yy=Math.round(y+2+Math.abs(dx%5)*.6);
  if(xx<1||xx>=w-1||yy<1||yy>=h-1)continue;
  for(let dy=0;dy<2;dy++){const i=(yy+dy)*w+xx;if(t[i]!==1)continue;for(let k=0;k<3;k++)d[i*4+k]=dy?light[k]:base[k]*.34;}
 }


}
export function stampBreakableObstacle(g,x,y){
 // Rounded breakable rubble fits inside a basher's cut: no unsupported cap remains.
 g.rect(x,y-37,18,37,0);
 for(let dx=0;dx<18;dx++){const rise=17+Math.round(6*Math.sin(Math.PI*(dx+.5)/18));g.rect(x+dx,y-rise,1,rise+14,1);}
}

// Only newly excavated, originally solid material reveals a recessed interior.
// Pre-existing passages keep the unmodified painting, so no route-shaped bands
// remain. Removable plugs expose the painting beneath them without a scar.
export function paintFreshCuts(image,g,initial,walls,base,light){
 if(!initial)return;
 const t=g.terrain,d=image.data,w=1000,h=g.height;
 for(let y=1;y<h-1;y++)for(let x=1;x<w-1;x++){
  const i=y*w+x;if(!initial[i]||t[i]||walls.some(wall=>x>=wall.x&&x<wall.x+18&&y>=wall.y-37&&y<wall.y))continue;
  const grain=(noise(x,y)-.5)*.035,form=Math.sin(x*.08+Math.sin(y*.06))*.025;
  const edge=Boolean(t[i-w]||t[i+w]||t[i-1]||t[i+1]);
  for(let k=0;k<3;k++)d[i*4+k]=base[k]*(.55+grain+form)+light[k]*(edge?.14:.085);
  d[i*4+3]=255;
 }
}
