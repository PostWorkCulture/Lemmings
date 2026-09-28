# Connected campaign design collection

50 individually illustrated landscape studies for the new five worlds, ten in each.
Local review: `http://127.0.0.1:4173/connected-campaign.html`.

## Deliverables

- Artwork: `assets/worlds/studies/` — 25 transparent PNG sheets, each containing two complete connected landscapes. Existing sprite atlases are preserved separately.
- Source rectangles: `assets/worlds/studies/manifest.json` — whole landscapes, with no route cuts or object slicing.
- Individual terrain relationships, proposed puzzles, tool choices and implementation checks: `src/connected-world-plans.js`.
- Prompt set: `docs/connected-world-prompts.json`. Created with the built-in image generation tool. The first ten studies follow the same base specification and the corresponding route descriptions in the plan module. Neon cassette/synth materials were corrected in a separate image edit to remove moss and earth.
- Alpha inspection: `scripts/analyse-connected-studies.py` reads image alpha and writes crop metadata; it never edits the PNGs.
- Browser check: `review-output/connected-fifty-gallery-check.json` records all 50 successful image decodes, matching titles and ten thumbnails in every world.

## Status

The artwork and design review are complete. These are NOT 50 rebuilt playable levels.
The earlier playable campaign still uses its existing geometry. No publish, push or deployment was performed for these studies.

## Conversion requirements

1. Author terrain from the visible object contours. Do not overlay the previous horizontal itineraries or slice the illustrations into shelves.
2. Separate decorative cave back walls from actual floors, ceilings and excavation plugs. Generated alpha alone is insufficient for a cutaway scene.
3. Attach bridges, cables, ramps and ropes at their visible contact points. Every major object must contribute to a route or meaningful alternative.
4. Keep steel machinery separate from soft material. Put yellow/black markings on harmful machinery; natural hazards need no warning stripes.
5. Use quiet backgrounds and few large foreground objects. Maintain contrast for ropes, controls, ladders and characters.
6. Give every entrance a safe arrival and every exit a fully supported footprint. Test edge cases at small steps, sloping joins and gaps.
7. Prototype any proposed new mechanism before relying on it: magnetic loop traversal, timed flippers, functional nets and special pool routes are not currently implemented by this artwork.
8. Preserve permanent IDs 50–99 and all original 0–49 saves. Balance skill stock and star times against actual successful rescues, including 5/10/15/20 populations.
9. Verify every map with real engine input replays, alternate-route checks and visual walkthroughs. Gallery image checks do not prove gameplay solvability.

The originals remain a separate later redesign pass, as requested.
