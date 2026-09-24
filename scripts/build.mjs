import { mkdir, cp, writeFile } from 'node:fs/promises';

// Publish only the playable game, not test routes or local reference boards.
await mkdir('dist', { recursive: true });
for (const file of ['index.html', 'style.css', 'src', 'assets']) {
  await cp(file, `dist/${file}`, { recursive: true });
}
await writeFile('dist/.nojekyll', '');
console.log('Playable game prepared in dist/.');
