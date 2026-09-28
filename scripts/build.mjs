import './vendor.mjs';
import { mkdir, cp, writeFile } from 'node:fs/promises';

// Publish the game and the approved sweet adventures and terrain gallery.
await mkdir('dist', { recursive: true });
for (const file of ['index.html', 'style.css', 'src', 'assets', 'sweets-review.html', 'sweet-level-review.html', 'sweet-range-review.html', 'terrain-review.html', 'new-levels.html', 'connected-campaign.html', 'original-worlds.html', 'world-playtest.html']) {
  await cp(file, `dist/${file}`, { recursive: true });
}
await writeFile('dist/.nojekyll', '');
console.log('Playable game prepared in dist/.');
