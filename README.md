# Lemmings — twenty little adventures

A local browser puzzle game with twenty themed levels, original retro music, editable terrain and a compact skill bar.

## Publishing

- Repository: https://github.com/PostWorkCulture/Lemmings
- Play: https://postworkculture.github.io/Lemmings/
- Every push to `main` runs syntax checks, all gameplay tests and the static build before deploying to GitHub Pages. Pull requests run the same checks without publishing.
- `npm run build` prepares the playable site in `dist/`. The deployment includes game modules and runtime artwork/audio; local reference boards, tests and solution routes are excluded from the published site.
- For ongoing updates: make changes, run `npm run check` and `npm test`, commit, then `git push origin main`. Follow the **Check and publish game** workflow in GitHub Actions.

Publishing does not transfer browser progress: the local preview and hosted game have separate saved progress because they use different website addresses.

## Run

Run `npm start`, then open http://127.0.0.1:4173. Node.js is the only dependency; no package installation is needed. The server binds to this computer only and supports byte-range audio playback.

## Levels

Twenty distinct worlds cover woodland, beaches, waterfalls, industry, mountains, tree villages, tombs, asteroids, volcanoes, polar ice, candy, marble, fossils, castles, highlands, circus tents, rooftops, stadiums, a space station and enchanted falls. Nine maps have completely rebuilt interactive routes. See [LEVEL-REVIEW.md](LEVEL-REVIEW.md) for the complete review.

Levels unlock in order after meeting rescue targets. Gold stars require a verified, completed 20/20 rescue with no losses. Existing best scores and level access are retained. Difficulty rises to a 20/20 requirement in the final five maps.

## Controls

- Choose a skill, then click a lemming. The outline identifies the selected creature.
- **1 — Walker:** stop a job or release a blocker; unlimited uses.
- **2 — Blocker:** hold back the crowd; click an existing blocker again to release them for free, even with no uses remaining.
- **3 — Builder:** construct 16 ascending steps in the current direction.
- **4 — Digger:** excavate vertically.
- **Space:** pause/resume; skills can still be assigned while paused.
- **F:** toggle 1×/2× gameplay speed.
- **. (full stop):** pause and advance one simulation frame.
- **Tips:** controls and optional, progressive puzzle hints.

Only skills supplied for the current map appear in the tray. Skill inventories vary by level. There is no time limit. The final result appears only after every lemming is saved or lost, even when the target can no longer be met. It completes after all lemmings are accounted for, so release remaining blockers.

## Soundtrack

Twenty original 32-bar stereo compositions, inspired by the bright DOS/FM direction of the supplied [Lemmings soundtrack reference](https://www.youtube.com/watch?v=EF3vMAmEnsY). No recording or melody is copied from that video. Each track has its own tune, key, tempo and lead sound, with bass, chord accompaniment, arpeggios and light percussion. Tracks run for approximately 53–75 seconds and loop.

Music starts on **Play level** and continues on the results screen. Pause/resume remains available after completion. Choosing another level stops the old track; opening and closing the level menu from the results screen keeps it playing. During an active run, music pauses with gameplay, menus or a hidden tab. Fast-forward does not change the music tempo. The **♫** control opens mute and volume settings, which persist in this browser. Audio is local and needs no streaming service or network connection once the app is loaded.

`npm run compose` rebuilds the WAV files from `scripts/compose-music.mjs`. `assets/audio/manifest.json` records track durations and measured peak/RMS levels. The server supplies the audio MIME type and byte-range support.

## Checks

- `npm test`: 90 checks, including a 20/20 solution and deterministic replay for every map, inventory limits, terrain, falls, restarts, map changes, delayed rescue counting, portal arrivals and non-silent/unclipped soundtrack files.
- `npm run check`: JavaScript syntax checks.
- Browser checks: rendered all five themes; verified map selection and persistence, skill availability, change-level confirmation, music startup/pause/track changes, mute and volume controls.

## Source

- `src/levels.js`: map definitions, themes, inventories and optional hints.
- `src/engine.js`: fixed-step simulation and editable terrain.
- `src/art.js`: pixel characters, backgrounds, exit and icons.
- `src/game.js`: input, display, level navigation and progress.
- `src/music.js`: soundtrack playback and preferences.
- `tests/campaign.test.js`: complete winning routes and campaign verification.

Toolbar/Tips portraits use the central character from the supplied `Lemmings 4.jpg`, copied unchanged to `assets/lemming-reference.jpg` and silhouette-clipped in canvas. Bodies and props are simplified artwork. Gameplay sprites remain pixel art. `icon-review.html` compares the icons against the supplied reference.

Current scope: twenty levels and 16 commands. Rewind, additional skills, moving mechanisms and a level editor remain future work. Optional Google Fonts have local system-font fallbacks.

## Exit sequence

Every arrival turns toward the doorway, walks inside, then spirals into a small glowing portal. The 96-frame sequence runs on the simulation clock, respects pause and 2× speed, and increments the rescue count only when complete. The final result waits for all arrivals. `exit-review.html` provides enlarged animation playback and phase-by-phase inspection.

The red-and-white rocket entrance, based on Rocket.avif, has twin underside doors synchronized to release: closed before play, open throughout release, and closed after the last lemming clears the hatch. The doors use simulation time, so pause and 2× speed remain synchronized. `entrance-review.html` compares the open and closed states.

Released blockers follow the last walker they redirected. If no walker has reached them, they retain their original direction. Water has moving waves and foam; Clockwork Works has glowing, bubbling lava. Hazard animation follows the simulation clock.

Levels 6-20 add linked staircases, switchback chambers, descending routes and narrow islands. Levels 11-15 require 19 rescues; levels 16-20 require all 20, with tighter skill budgets. Every map has a deterministic 20/20 solution test. Each level has its own soundtrack; the later tracks develop the original five musical themes.

Gold stars require a completed 20/20 rescue with zero losses recorded in lemmings-perfect-v2. Legacy best scores retain level progression but do not award stars because they may include development test runs.

## Expanded mechanics

Only the current map's functional skills appear in the compact scrolling toolbar. Tips remain opt-in. Ladders, poles, trampolines, a moving shuttle, pressure levers, crushers and lasers use simulation time, so pause and 2x speed apply consistently. Gentle dunes and ridges are solid terrain. Waterfalls and distant landmarks are scenery.

The full requested skill catalogue is staged in [SKILL-CATALOGUE.md](SKILL-CATALOGUE.md); 16 commands are playable now. Fan control, aimed projectiles and the remaining advanced skills are not implemented. `world-playtest.html` is a separate review harness with no progress writes.

## Difficulty and scrolling

- Easy: levels 1-5 retain their introductory layouts.
- Medium: levels 6-10 add a lower chamber and require at least three different construction/excavation skills, plus crowd control.
- Hard: levels 11-15 add two lower chambers and require all five of Builder, Platformer, Basher, Digger and Miner across the complete route.
- Extreme: levels 16-20 add three lower chambers, more consecutive jobs, machinery and exact skill supplies. All 20 lemmings must survive.

Use the mouse wheel, scrollbar, or the up/down buttons in the information panel to explore tall levels. The depth indicator shows your position. Terrain collision, editing, picking and hazards use each map's full height. Cracked rock barriers are bashable; blue-grey lintels are steel. Horizontal bridges fit beneath low lintels, while stairs reach raised landings.

`src/levels.js` assembles the introductory/world definitions from `levels-base-for-authoring.js` and the authored extended layouts in `difficulty-layouts.js`. `scripts/expand-campaign.mjs` rebuilds those extended layouts and their canonical test routes from the base definitions.

## Living scenery

All twenty worlds have animated ambient scenery, visible even before Play: birds, swaying trees, windmills, dolphins, falling background rocks, rolling snowballs, gears, satellites, candy wheels, fountains, flags, a Ferris wheel and butterflies. Tall maps retain movement at lower depths. Ambient animation stops with Pause and follows 2x speed during play. These additions are decorative and do not change level collision or rescue routes.

Waterfalls in Fernfall Grotto and Prism Falls now originate in cliff springs, flow over visible rock lips and land in the actual bottom water. Layered moving ribbons, spray, foam and expanding ripples replace the disconnected decorative strips.
