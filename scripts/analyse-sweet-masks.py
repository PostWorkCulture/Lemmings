import json
import numpy as np
from PIL import Image
from pathlib import Path
root=Path('.')
regions=[('01-honeycomb-ribbonfall.png',0,486),('01-honeycomb-ribbonfall.png',497,527),('02-wafer-gummy.png',0,480),('02-wafer-gummy.png',492,532),('03-meringue-liquorice.png',0,495),('03-meringue-liquorice.png',506,518),('04-bonbon-peppermint.png',0,495),('04-bonbon-peppermint.png',508,516),('05-macaron-cathedral.png',0,460),('05-macaron-cathedral.png',466,558)]
# Read-only image analysis: produce collision data, never modify the approved artwork.
allruns=[]
for file,top,height in regions:
 pixels=np.asarray(Image.open(root/'concepts/sweet-reboot'/file).convert('RGB'))
 xs=(np.arange(960)/.625).astype(int); ys=top+(np.arange(round(height*.85))/.85).astype(int)
 rgb=pixels[ys[:,None],xs[None,:]]
 mask=(rgb.max(2)>42)&((rgb.max(2)-rgb.min(2))>8)
 # Close sub-pixel pinholes in chocolate grain without filling the large chambers.
 p=np.pad(mask,1); expanded=np.logical_or.reduce([p[a:a+mask.shape[0],b:b+960] for a in range(3) for b in range(3)])
 p=np.pad(expanded,1); mask=np.logical_and.reduce([p[a:a+mask.shape[0],b:b+960] for a in range(3) for b in range(3)])
 runs=[]
 for y,row in enumerate(mask):
  edges=np.flatnonzero(np.diff(np.pad(row.astype(int),(1,1))))
  for a,b in zip(edges[::2],edges[1::2]):
   if b-a>=3:runs.extend([y+45,int(a)+20,int(b-a)])
 allruns.append(runs)
(root/'src/sweet-reboot-masks.js').write_text('// Collision silhouettes analysed from the approved artwork. Each triple is y, x, width.\nexport const SWEET_MASKS='+json.dumps(allruns,separators=(',',':'))+';\n')
