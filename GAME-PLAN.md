# Lemmings — initial game direction

## The aim

Preserve the delight of a little crowd marching into trouble, rescued through a few well-timed decisions. Improve control, readability and puzzle variety with lightly polished 2D pixel art. This is a proposed design and build sequence, not an implemented game.

## Character direction

Green mop hair, blue tunics, pale faces and sleeves, tiny feet and expressive movement. Keep the side-on silhouette simple enough to read in a crowd. Use a restrained palette, crisp pixel edges and two or three shading tones. Terrain should be quieter than characters; effects should never hide a selectable creature.

The initial concept sheet shows the same base character in nine states: walker plus eight assignable skills. It establishes visual direction; production sprites still need consistent dimensions, animation frames, pivots and in-game testing.

| State / skill | Function | Visual cue |
| --- | --- | --- |
| Walker | Walks automatically; turns at walls and falls from edges | Green hair, blue tunic, jaunty walk |
| Climber | Climbs vertical walls; persistent ability | Hands and feet against wall |
| Floater | Slows dangerous falls; persistent ability | Open umbrella |
| Blocker | Turns approaching walkers away | Feet planted, arms out |
| Builder | Builds a finite rising staircase | Brick stack and placing motion |
| Basher | Cuts horizontally through soft terrain | Forward striking motion and chips |
| Miner | Cuts diagonally down through soft terrain | Pickaxe and downward stance |
| Digger | Cuts vertically through soft terrain | Spade and digging motion |
| Bomber | Removes a small terrain area after a countdown, sacrificing the assigned creature | Clear countdown; cartoon puff |

Start animation work with walking, turning, falling, landing, entering the exit and celebration. Then add each skill's start, active and finish states. Permanent abilities need visible selection badges so they remain identifiable when their equipment is hidden.

## Keep the rules simple

- Creatures walk automatically; the player assigns a limited stock of skills.
- Each map clearly states its rescue target and available skills before play.
- Most levels use only three to five skill types, chosen for the puzzle.
- Introduce one idea in a safe setting, combine it with something familiar, then test mastery.
- Use time limits only where timing is the point of the puzzle.
- Keep optional perfect-rescue and low-skill challenges separate from campaign progress.

## Modern improvements with a purpose

1. **Rewind and retry:** recover from an execution mistake without repeating the entire setup. Use deterministic simulation so rewinding reproduces the same crowd and terrain.
2. **Reliable selection:** pause to assign, highlight the target, cycle overlapping creatures and filter by walking direction. Display why an assignment is invalid.
3. **Useful previews:** show the immediate staircase or excavation footprint, while leaving the puzzle solution to the player.
4. **Readable terrain:** distinguish destructible earth, solid steel, hazards, switches and exits through shape and texture as well as colour.
5. **Comfortable pacing:** pause, single-step, fast-forward, zoom and a restart command with protection against accidental activation.
6. **Gentle assistance:** optional staged hints: point out the relevant feature, suggest an approach, then reveal a solution only when requested.
7. **More replay value:** optional challenges, saved replays and eventually a level editor. Avoid grind or upgrades that alter the puzzle rules.

## Proposed campaign: 48 carefully authored levels

Six worlds of eight levels. Each world has two introductions, three combinations, two demanding puzzles and one finale. This is a content target after the prototype proves fun, not the first build milestone.

| World | Look | Puzzle focus | Example challenge |
| --- | --- | --- | --- |
| Mossy Hollows | Roots, warm earth, grassy ledges | Safe introductions, falls, digging and bridges | Build above a returning crowd without sealing the exit |
| Sandstone Ruins | Amber stone, buried halls, ancient gates | Route planning around indestructible structures | Tunnel under a sealed hall and approach its switch from behind |
| Clockwork Works | Brass, riveted steel, readable machinery | Switches, doors and synchronised groups | One group holds a passage open for another |
| Crystal Caverns | Violet rock, cyan crystals, dark voids | Multiple elevations, falls and scarce builders | Preserve the only builder charge for the final crossing |
| Frostbound Peaks | Snow, pale stone and blue ice | Carefully introduced slippery surfaces and routes | Send one pioneer ahead to make the descent safe |
| Ember Keep | Basalt, lava and glowing furnaces | Combination puzzles and clearly signalled timed hazards | Split and reunite the crowd through two safe windows |

Decorative water, ice or machinery must not imply an unimplemented rule. Introduce and demonstrate each interactive surface before testing it. Give every level a distinct central idea; changing the scenery alone does not count as variety.

## Build sequence and acceptance gates

### 1. Art and movement test

Create the base sprite and core movement animations. Display a crowd at actual play size against earth, snow and dark stone. Check that direction, selected character and current action remain clear. Compare a nearly original pixel treatment with modest extra shading before expanding the art set.

### 2. Playable core

Build a desktop-browser prototype with spawning, walking, turning, gravity, falls, exit detection and rescue accounting. Add editable terrain and steel, then blocker, builder and digger. Make three small test levels. Gate: predictable collisions, accurate selection and satisfying basic play.

### 3. Complete puzzle toolkit

Add climber, floater, basher, miner and bomber; limited inventories; release-rate controls; pause, fast-forward, step and rewind. Gate: all skill interactions behave consistently at terrain edges and at different simulation speeds.

### 4. First polished world

Build all eight Mossy Hollows levels, onboarding, restrained sound effects, music controls, local progress saving and optional hints. Observe people playing without coaching. Gate: players understand failures and want to retry; revise unclear levels before adding more content.

### 5. Campaign expansion

Create the remaining five worlds in batches. Introduce mechanisms sparingly and playtest each batch before moving on. Store a verified winning replay with every level. Gate: every required level is solvable, varied and appropriately placed in the difficulty curve.

### 6. Longevity and polish

Add a local level editor, level-file import/export, replay viewing, optional challenge goals, accessibility settings and broader device testing. Consider online sharing only as a separate follow-on feature.

## Implementation proposal

A browser-first TypeScript game with a 2D renderer, fixed simulation steps and separate simulation/rendering code. Use a terrain mask for digging and construction, with steel held in a separate immutable mask. Save deterministic input events and periodic snapshots for rewind; snapshot both creature state and terrain changes. Keep level definitions, skill budgets, hints and expected solution replays in data files.

Prototype the renderer and terrain approach before committing to a framework. Target smooth play with a representative full crowd on the intended device. Test keyboard/mouse first, then adapt selection and camera controls for touch.

## Quality checks that matter

- Replaying identical inputs produces identical outcomes.
- Rewinding restores terrain, skills, timers, creature states and rescue counts.
- No tunnelling through steel, lost creatures at terrain seams or invalid skill deductions.
- Builder stairs and excavation match their previews closely enough to trust.
- Every campaign level has a passing solution replay under the current rules.
- Crowds remain selectable and readable at ordinary zoom.
- New players can explain why they failed and identify something to try next.

## Recommended next milestone

A single playable grassy level with animated walkers, blockers, builders and diggers, plus pause and restart. Prove the feel and visual scale before building the full campaign. Add rewind early in the following milestone so level design and testing benefit from it.
