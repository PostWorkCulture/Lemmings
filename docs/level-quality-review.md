# Campaign clarity review

Reviewed the effective 20-level campaign exported by `src/levels.js`, including all chapter, entrance and puzzle overrides. This is a layout, instructions and deterministic solution audit; visual assessment belongs to the separate rendered review.

The forest establishes a useful pattern: an obvious journey and a small number of distinct decisions. Most bespoke later puzzles follow that pattern already. The density outliers are levels 8, 11, 12, 14, 15 and 18. Many of their 35–55 rectangles are thin internal steel seams, not independent visible obstacles; blindly deleting those would create shortcut shafts and change the puzzles.

| Level | Finding and action |
| --- | --- |
| 1 — The Hollow Oak | Clear bridge-and-descent introduction. Retain. |
| 2 — Woodland Crossing | Two clear crossings; automatic ladder was described as something to prepare. Hint now says to walk to it. |
| 3 — The Hidden Hollow | Distinct controlled-descent puzzle with readable shelves. Retain. |
| 4 — The Old Sawmill | One timing problem plus shutdown and crossing. Retain the runner window. |
| 5 — Treetop Trail | Leftward route changes the familiar lesson without extra machinery. Retain. |
| 6 — The Palm Grove Locksmith | Strong raised-switch idea. Clarified bottom crossing, ascent, temporary scaffold and crowd release. |
| 7 — The Shifting Dunes | One useful terrain contrast: walkable dune versus sliding slope. Replaced unrelated tomb wording with sand wall. |
| 8 — Island Hopping | Moving island gives identity; later descent is busier. Removed one repetitive wall on the approach. New opening hint leads with the moving island. |
| 9 — The Harbour Drawbridge | Strong one-swimmer rescue. Replaced fortress/moat/keep language with harbour, gate and drawbridge. |
| 10 — Clifftop Rescue | Clear specialist-and-rescue-pole puzzle. Removed stale ice terminology from this beach map. |
| 11 — The Snowbound Detour | Most unnecessary opening repetition: two preliminary bash walls before the chamber sequence. Removed both; retained crossings and lower tunnel decisions. |
| 12 — The Frozen Pass | Three rising steps and pole are meaningful. Lower chambers repeat the expedition pattern; retain collision geometry and explain the distinctive opening. |
| 13 — The Frozen Fossil | Welcome simpler mountain interlude. Hint now explicitly covers the bottom wall before the optional demolition decision. |
| 14 — The Summit Expedition | Leftward high approach distinguishes this expedition. New hint establishes direction first. Containment and route-bearing geometry retained. |
| 15 — The Crooked Ridge | Similar long chamber pattern, but leftward staircase and pole provide identity. New opening hint highlights them. |
| 16 — The Opening Act | Springboard, Jumper and curtain form a coherent show. Instructions now name the ascent gap and actual ball obstacle. |
| 17 — Big-Top Rendezvous | Strong two-group cooperation. Removed stale rooftop/chimney language; hints refer to the tents and reciprocal curtains. |
| 18 — The Championship Circuit | Highest workload and visual density. Removed the redundant third opening wall while retaining both springboard walls. Removed repeated scenic ring metadata; renderer already suppressed these, so this is cleanup, not a claimed visible improvement. Hint now names the two springboards and press lever. |
| 19 — Three-Ring Rescue | Three groups are justified by switch cooperation. Replaced docking/airlock wording; matching portal colours and upper destination are now explained. |
| 20 — Last Performer Home | Strong final worker-recovery idea. Clarified stack-operated ascent switch, repaired shaft and returning last performer; removed garden wording. |

## Implemented scope

Four redundant soft approach walls removed across levels 8, 11 and 18. Skill budgets stay generous and recorded solutions remain valid; old recordings may spend an unnecessary Basher where an approach wall used to stand. No chamber barrier, crossing, steel seam, exit roof, hazard, switch relationship or timing window was removed.

For a larger reauthoring pass, levels 12, 14 and 15 would benefit most from replacing a whole repeated lower chamber with a single distinctive decision. That requires changing recorded solutions, inventories, targets and shortcut tests together, rather than deleting terrain without proving the resulting puzzle.

## Terrain and presentation follow-up

The follow-up direction adds actual collidable rolling hills between precision-work stations, rather than using background hills to imply uneven ground. Walkers follow these slopes; the terrain retains its underlying material's excavation rules. Mountain presentation uses white snow and quieter backgrounds so the playable route reads clearly. These changes are an implementation direction, not evidence that players prefer the result.

The Crooked Ridge keeps its pole landing flat: a trial ridge at x90–170 on the y400 shelf trapped the returning pioneer before the first lower tunnel. Removing that one ridge restores the recorded route while preserving the other five contours on this level.

## Validation

All 65 campaign, difficulty, puzzle and chapter tests passed after the wall removals. Following the contour changes, the focused Level 15 perfect rescue and exact replay tests both pass with the pole-landing ridge removed. The campaign suite checks all 20 perfect rescues against skill budgets and time targets, then replays every solution; difficulty tests check exit containment and core tool use. This verifies solvability and preserves known routes, but is not a substitute for human enjoyment testing.


## Final validation and visual review

- All 144 tests pass after the contour and clearance fixes, including 20 perfect rescues, exact solution replays, and physical snowbank traversal/excavation checks.
- The main reviewer inspected all four chapter galleries, covering all 20 rendered layouts. Foreground contrast, supported scenery, portals, rescue exits and the quiet background hierarchy were checked.
- Forest hard roots now retain a bark cue even where embedded in soil, avoiding the misleading impression that hard terrain is diggable. Their exposed top edge was brightened for readability.
- Snowbank clearance considers both ends of ladders and poles. One ridge obstructed the Crooked Ridge pole landing; it was removed and the route retested.
- The local review gallery links to a full-size view and a playable local test for each level. These review pages and screenshots are excluded from the production build.
- No publishing was performed. Automated solutions establish solvability and replay reliability, not that every alternative strategy works or that this is objectively better than the original.

## Design reference

Mike Dailly describes adding detail around simple play areas without interfering with their gameplay in [his development history](https://lemmings.info/lemmings-gamehistory/). This pass follows that principle: useful terrain takes priority over repeated scenery. The original remains a design reference, not an objective score to claim we have exceeded.
