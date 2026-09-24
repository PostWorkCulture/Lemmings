# Level review and redesign

The original campaign repeated bridge-and-dig shelves across five palettes. This pass gives all 20 maps separate art directions; nine routes are rebuilt around new mechanics. The remaining maps retain proven routes with distinct terrain, scenery and optional skills.

| Level | World | Review outcome |
|---|---|---|
| 1. The Hollow Oak | Bramblewood | Classic bridge-and-descent introduction framed by forest roots. |
| 2. Castles in the Sand | Shellshore Bay | Walkable sand dunes, palms, sandcastles and two coastal crossings. |
| 3. Behind the Waterfall | Fernfall Grotto | Descending grotto shelves behind animated waterfalls; optional safe-fall and mining routes. |
| 4. The Engine Room | Coppercoil Foundry | Copper machinery, a pressure lever and a timed crusher before the raised crossing. |
| 5. Above the Clouds | Cloudcap Ridge | Snowy mountain ridges with a mirrored route and optional climbing. |
| 6. Branches and Ladders | Treetop Village | Automatic canopy ladder, bridge crossing and a bashable tree trunk. |
| 7. The Pharaohs Staircase | Amber Tombs | Pyramids, glyph columns, sandstone masonry and two tomb descents. |
| 8. Across the Asteroids | Moonflower Orbit | Low-gravity asteroid crossing on a moving shuttle with safe boarding waits. |
| 9. The Sleeping Giant | Emberjaw Caldera | Volcanic caldera, glowing rock seams and lava surrounding a bridge-and-descent route. |
| 10. The Ice Slide | Aurora Fjord | Safe sliding pole followed by an ice crossing and a bashable ice wall. |
| 11. Gingerbread Detour | Sugarplum Valley | Cookie walls, icing and lollipops; horizontal tunnelling and syrup crossings. |
| 12. The Column Garden | Rosewater Palace | Rose marble columns with a rising sequence of island crossings. |
| 13. Into the Fossil | Bonefern Caverns | A thick fossil shelf requiring a continuous diagonal mining tunnel. |
| 14. Moat and Turrets | Briarstone Keep | Castle walls, turrets and a moat route with climbing alternatives. |
| 15. The Crooked Glen | Heather Highlands | Walkable heather ridges and a right-to-left chain of precise crossings. |
| 16. The Great Bounce | Starlight Circus | Group trampoline jump followed by a prepared crossing inside the big top. |
| 17. Midnight Express | Moonlit Rooftops | Moonlit rooftop switchbacks with three levels of descent. |
| 18. The Obstacle Course | Lemming Games | Two springboard jumps and a final bashable hurdle in a stadium. |
| 19. The Gravity Garden | Starport Nine | Maintenance ladder, pressure lever and laser gate on an orbital deck. |
| 20. Journey to the Rainbow | Prism Falls | Sliding pole, trampoline, bridge and crystal tunnel below a rainbow and waterfalls. |

All 20 maps have automated complete-crowd rescue solutions and deterministic replay tests. Visual review covers all 20 scenes; it does not establish that difficulty is perfectly balanced for human players. Full skill coverage remains staged: see SKILL-CATALOGUE.md.

## Difficulty pass

All levels now show Easy, Medium, Hard or Extreme in groups of five. Levels 6-20 extend below the original viewport. Medium has one extra chamber, Hard two, and Extreme three. Each chamber varies the barrier position, crossing width and travel direction. Cracked barriers require bashing; steel lintels and raised landings distinguish horizontal Platformer crossings from Builder staircases. Deeper transitions alternate mining and digging. The proven routes use three to four route skills in Medium, and all five excavation/construction types in Hard and Extreme, plus Blocker/Walker crowd control. Human difficulty remains a playtesting judgement, not a guarantee established by automated rescue tests.

## Distinct extreme finales

16. Under the Big Top: a narrowing ring course with circus canopies and swinging trapezes.
17. Chimney Chase: clustered short towers opening onto a long final rooftop, with windows and cables.
18. The Championship Circuit: three broad stadium circuits, terraces and floodlights.
19. Orbital Maintenance: four compact offset service pods with moving machinery and status lights.
20. Heart of Prism Falls: a wide basin narrowing into an asymmetric crystal gorge with waterfalls.

Each finale has a separately authored footprint, crossing placement, descent spacing, solid underside shapes and exact skill budget. All require 20/20; deterministic solution tests verify solvability, while subjective difficulty remains a playtesting judgement. Rebuild with `node scripts/expand-campaign.mjs`, which reapplies `scripts/author-extremes.mjs`.

## Difficulty reinforcement

Medium maps now include two lower puzzle stages and five required tools in the verified route. Hard maps add a third stage; extreme maps retain their individual footprints with extra landing barriers and a third stadium circuit. Thin steel layers close direct digging shortcuts while preserving authored dig shafts and diagonal mining corridors. Every exit is roofed with a sealed far wall, requiring a side approach over its final crossing. Regression checks attempt vertical entry from both directions and confirm zero rescues. `scripts/reinforce-campaign.mjs` is applied automatically by the campaign authoring pipeline.
