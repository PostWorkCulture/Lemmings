import json
import numpy as np
from PIL import Image
from pathlib import Path
manifest=json.loads(Path('assets/worlds/studies/manifest.json').read_text())
allruns=[]
for entries in manifest.values():
 for e in entries:
  ox,oy,w,h=e['source']; ah=round(h*960/w)
  im=np.asarray(Image.open(e['file']).convert('RGBA'))
  xs=ox+np.minimum(w-1,(np.arange(960)*w/960).astype(int));ys=oy+np.minimum(h-1,(np.arange(ah)*h/ah).astype(int));rgb=im[ys[:,None],xs[None,:]]
  mask=(rgb[:,:,:3].max(2)>28)&(rgb[:,:,3]>80)
  p=np.pad(mask,1);d=np.logical_or.reduce([p[a:a+ah,b:b+960] for a in range(3) for b in range(3)])
  p=np.pad(d,1);mask=np.logical_and.reduce([p[a:a+ah,b:b+960] for a in range(3) for b in range(3)])
  runs=[]
  for y,row in enumerate(mask):
   edges=np.flatnonzero(np.diff(np.pad(row.astype(int),(1,1))))
   for a,b in zip(edges[::2],edges[1::2]):
    if b-a>=3:runs.extend([y+60,int(a)+20,int(b-a)])
  allruns.append(runs)
Path('src/connected-masks.js').write_text('// Read-only analysis of approved landscape silhouettes: y,x,width.\nexport const CONNECTED_MASKS='+json.dumps(allruns,separators=(',',':'))+';\n')
