import './vendor.mjs';
import { mkdir, cp, writeFile } from 'node:fs/promises';

// Publish the three physical-terrain worlds and their current galleries.
await mkdir('dist', { recursive: true });
for (const file of ['index.html', 'style.css', 'src', 'assets', 'terrain-review.html', 'new-levels.html', 'original-worlds.html', 'world-playtest.html']) {
  await cp(file, `dist/${file}`, { recursive: true });
}
// Old gallery bookmarks lead to the current campaign; source studies stay local.
for (const file of ['sweets-review.html','sweet-level-review.html','sweet-range-review.html','connected-campaign.html','sweet-reboot.html']) {
  await writeFile(`dist/${file}`, '<!doctype html><html lang="en"><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=original-worlds.html"><title>Lemmings adventures</title><p><a href="original-worlds.html">Explore the three worlds</a></p></html>');
}
await writeFile('dist/.nojekyll', '');
console.log('Playable game prepared in dist/.');
