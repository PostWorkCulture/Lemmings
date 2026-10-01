import json
from pathlib import Path
import numpy as np
from PIL import Image
runs=[]
for e in json.loads(Path('assets/creature-comfort/manifest.json').read_text()):
 ox,oy,w,h=e['source'];ah=round(h*960/w);im=np.asarray(Image.open(e['file']).convert('RGBA'))
 xs=ox+np.minimum(w-1,(np.arange(960)*w/960).astype(int));ys=oy+np.minimum(h-1,(np.arange(ah)*h/ah).astype(int));rgba=im[ys[:,None],xs[None,:]]
 mask=(rgba[:,:,3]>80)&(rgba[:,:,:3].max(2)>28)
 rr=[]
 for y,row in enumerate(mask):
  edges=np.flatnonzero(np.diff(np.pad(row.astype(int),(1,1))))
  for a,b in zip(edges[::2],edges[1::2]):
   if b-a>=3:rr.extend([y+60,int(a)+20,int(b-a)])
 runs.append(rr)
Path('src/creature-masks.js').write_text('// Collision silhouette analysis of the Creature Comfort artwork.\nexport const CREATURE_MASKS='+json.dumps(runs,separators=(',',':'))+';\n')
