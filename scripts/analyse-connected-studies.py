"""Read-only alpha analysis: writes source rectangles, never modifies artwork."""
from pathlib import Path
from PIL import Image
import numpy as np
import json

root = Path('assets/worlds/studies')
manifest = {}
for key in ['neon', 'space', 'food', 'sports', 'dino']:
    manifest[key] = []
    for pair in range(5):
        path = root / f'{key}-{pair if pair else "connected"}.png'
        im = Image.open(path).convert('RGBA')
        alpha = np.array(im)[:, :, 3] > 180
        h, w = alpha.shape
        rows = alpha.sum(axis=1)
        lo, hi = int(h * .38), int(h * .64)
        # Split only in the central gutter, keeping the whole connected scene.
        empty = np.where(rows[lo:hi] < 5)[0] + lo
        if not len(empty):
            raise ValueError(f'{path}: no transparent gutter')
        runs = np.split(empty, np.where(np.diff(empty) > 1)[0] + 1)
        gap = max(runs, key=len)
        split = int((gap[0] + gap[-1]) // 2)
        for start, end in [(0, split), (split, h)]:
            yy, xx = np.where(alpha[start:end])
            x0, x1 = max(0, int(xx.min())-10), min(w, int(xx.max())+11)
            y0, y1 = max(start, start+int(yy.min())-10), min(end, start+int(yy.max())+11)
            manifest[key].append({'file': path.as_posix(), 'source': [x0,y0,x1-x0,y1-y0]})
Path('assets/worlds/studies/manifest.json').write_text(json.dumps(manifest, indent=2), encoding='utf-8')
print('Verified transparent gutters and source rectangles for 50 landscapes.')
