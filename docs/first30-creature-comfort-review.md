# First 30 levels: quality review and Creature Comfort

The campaign remains 100 levels. Slots 11–20 now contain Creature Comfort; their stable save IDs are retained. No player profiles or later chapters were reset.

## Creature Comfort

Ten individually authored, playable habitats use five new high-resolution transparent terrain sheets generated with the built-in image tool. Prompts: `docs/creature-comfort-prompts.json`. Assets: `assets/creature-comfort/`.

| Level | Habitat and route | Rescue size |
|---|---|---:|
| 11 | The Ant Architects — three earthen seed chambers and a leaf crossing | 15 |
| 12 | A Shell of a Journey — reverse-direction climb through a pearly shell spiral | 10 |
| 13 | Honey, I Shrunk the Lemmings — dig through wax and parachute into the lower hive | 12 |
| 14 | Feather Your Nest — woven branch crossing, eggshell passage and high nest exit | 15 |
| 15 | The Walnut Locksmith — root approach, walnut rooms and acorn balconies | 10 |
| 16 | Making a Mountain of a Molehill — a five-lemming dig-and-parachute descent | 5 |
| 17 | Silk Road — three heights, two crossings and a return over the silk canopy | 12 |
| 18 | The Chrysalis Crossing — leaf ramps, a chrysalis tunnel and flower ascent | 10 |
| 19 | Beetle Backroad — wing-case ramps and a hollow timber crossing | 10 |
| 20 | Do Not Wake the Hedgehog — a long burrow loop returning over an autumn leaf | 20 |

Art is mapped onto editable terrain. Initial passages have shaded recessed walls; excavated solid ground disappears. Staircases remain yellow, ladders remain pale and high-contrast, exits green. Resident animals are decorative; no unmarked animal hazards are introduced. All ten layouts require intervention, use every offered skill, and have recorded zero-loss rescues within their three-star times. The molehill exceeds 50% solid screen coverage.

## Forest review

All ten retain their working Easy puzzles. Painted timber gets subtler texture grain and lighting, exposed undersides have a softer bark silhouette, and repetitive canopy stickers are removed. Small grounded ferns and mushrooms replace obstructive decorative trees. Props require almost their entire footprint to be supported and keep clear of the full ladder/pole height.

1. Hollow Oak: retained clear bridge-and-descent lesson; cleaned ornament and timber edge.
2. Woodland Crossing: retained two crossings and bottom-entry ladder; reduced clutter.
3. Hidden Hollow: retained controlled descent and no waterfall; clearer shelf silhouettes.
4. Old Sawmill: retained timed machinery and switch; less competing scenery around the route.
5. Treetop Trail: retained leftward descent; clearer boundary trunks.
6. Badger Burrow: preserved lower return loop; softened exposed root edges.
7. Acorn Staircase: cleared decorative crowding beside climbing apparatus.
8. Heartwood Hollow: kept the majority-terrain cutaway; removed repetitive trees in chambers.
9. Root Cellar: kept the substantial mining body; restrained ornament and material shading.
10. Moonlit Canopy: kept the upward expedition and pale apparatus contrast.

## Mountain review

All ten keep their Medium puzzle routes, snow surfaces, pointed authored contours, snow floor and one background snowboarder. Glacier undersides get broken contours and restrained icy highlights; props use full-footprint checks. Inside the Iceberg gains a physically connected three-peak snowy roof. Detached experimental peaks were rejected during visual review.

21. Split Glacier: preserved the snowbank crossing and deep return cavern.
22. Stairway to the Summit: preserved the two distinct ladder-and-crossing stages.
23. Frozen Arch: preserved the natural ice arch, fossil passage and optional demolition route.
24. Avalanche Bowl: preserved the descent and opposing cliff climb.
25. Inside the Iceberg: connected pointed roof above the three-storey passage.
26. Snowshoe Switchback: retained winding ascent; cleaned lower terrain edges.
27. Blue Ice Cathedral: retained large chambered mass and pointed crests.
28. Cornice Country: retained overhangs and descending route; supported winter props only.
29. Hidden Summit: retained the four-stage ascent and clear apparatus.
30. Glacier Loop: retained the deep return journey with cleaner snow/ice distinction.

Lift rails now follow each wheel’s actual trajectory, including diagonal travel.

## Verification

- 504 automated tests pass, including full-rescue replays throughout the 100-level campaign and retained archived maps.
- 8 browser rendering checks pass, including excavation cache consistency and switching worlds.
- All first 30 levels rendered for visual review; no browser script errors.
- All exits have supported foundations; all ten new habitats have open crossings and useful skill inventories.
- Retired Dunes mechanics remain isolated regression fixtures for swimming, switches and sliding; they are absent from the active level menu.

Review: `original-worlds.html#11`; Play: `world-playtest.html?level=5`.
