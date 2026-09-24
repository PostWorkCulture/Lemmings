# Original Lemmings level-design research

Research completed by a separate agent on 24 September 2026. These are proposals for original adaptations, not copied maps. No gameplay changes were made in this research pass.

## Implementation update

Ten campaign slots now implement these principles with authored inventories, including true one-way excavation, two and three entrances, switch-operated gates and a drawbridge. See PUZZLE-CAMPAIGN.md for the implemented maps and validation. The research below describes the pre-change game and initial proposals.

## Main finding

Vary the reasoning required, not just route length or the number of tools. Our current later levels all supply the same five excavation/construction skills plus Blocker. Jumper, Stacker, Turner and Attractor exist but are stocked on no current levels. Climber, Parachuter, Swimmer and Runner are confined to early levels. Level-specific inventories should be authored deliberately rather than replaced by a generic route budget.

Mike Dailly's development history describes the original team's mixture of minimalist puzzles, dense constructions and huge pictorial landscapes, as well as their efforts to find unintended simpler solutions: https://lemmings.info/lemmings-gamehistory/ (primary developer source).

## Recommended first five designs

| Priority | New concept | Different reasoning | Existing features to use |
| --- | --- | --- | --- |
| 1 | Egypt: Tomb from the Other Side | Reach the far side first, then mine back toward the trapped crowd. | Climber, Turner, Miner; no Blocker |
| 2 | Circus: The Opening Act | A specialist reaches an upper switch while the crowd waits on a separate route. | Trampoline, Jumper, switch, safe holding area |
| 3 | Night: Rooftop Rendezvous | Two specialists prepare different parts of a route and must reunite. | One Climber, one Parachuter, Builder |
| 4 | Factory: Shift Change | Manage the spacing and release of the crowd around machinery. | Attractor, shuttle, visible machine cycle |
| 5 | Enchanted: Last Gardener Home | Recover the worker after the crowd has passed and terrain has changed. | Temporary construction, excavation, Climber |

These need authored layouts and solution verification; the combinations above are design proposals, not already proven routes. Preserve all-20 solutions for Extreme. Freely releasing blockers is already supported, so merely reproducing a classic blocker-release trick would add little challenge.

## Verified original inspirations

Named mechanics below were researched through secondary community walkthroughs unless marked primary. Ports can differ.

- **Postcard from Lemmingland (Tricky 19):** a climber gets ahead and mines back toward the group. Inspiration: work backwards from the apparent destination. https://lemmings.fandom.com/wiki/Postcard_from_Lemmingland
- **The Great Lemming Caper (Mayhem 13):** two lemmings take different routes and prepare their escape. Inspiration: cooperating specialists. https://lemmings.fandom.com/wiki/The_Great_Lemming_Caper
- **No added colours or Lemmings (Mayhem 20):** recovering workers matters after the crowd is safe. Inspiration: the final worker has a different return route. https://lemmings.fandom.com/wiki/No_added_colours_or_Lemmings
- **One-way digging to freedom (Tricky 20):** a directional obstacle must be approached from its allowed side. Our first version could use steel geometry; true arrow-marked one-way terrain requires new engine support. https://strategywiki.org/wiki/Lemmings/Tricky_Levels_16-20
- **And then there were four.... (Mayhem 18):** four entrances create connected local problems. Our engine currently has one entrance; a split path can prototype the idea before adding multiple entrances. https://lemmings.fandom.com/wiki/And_then_there_were_four....
- **Compression Method 1 (Taxing 6):** crowd spacing affects losses through a trap. Adapt the timing principle with a zero-loss solution rather than copying its sacrifice requirement. https://lemmings.fandom.com/wiki/Compression_Method_1
- **Hunt the Nessy:** a large pictorial landscape identified in Dailly's account. Adapt the recognizable whole-map silhouette: a creature-shaped Highland ridge, not repeated shelves. https://lemmings.info/lemmings-gamehistory/ (primary)
- **Lightlines.... (Lemmings 2, Circus 1):** transport machinery gets a specialist around to release the group. Adapt with our trampoline and switches.
- **Swingz and Roundaboutz! (Lemmings 2, Circus 10):** two specialists undertake different jobs. Adapt with jumpers at different elevations and a shared finishing route.
- **Beach Lems (Lemmings 2, Beach 6):** staggered excavation manages fall safety. Adapt as a compact polar crevasse puzzle, using ledges and a landing stack.

The three Lemmings 2 references above are from this secondary PC walkthrough: https://gamefaqs.gamespot.com/pc/564598-lemmings-2-the-tribes/faqs/67370

## Acceptance checks for future implementation

1. The old blocker/digger shortcut must not bypass the intended problem.
2. The signature skill must have a useful, legible role, not merely extra inventory.
3. The route silhouette and dependency must differ from neighboring levels.
4. The map should explain itself through visible geometry, with Tips optional.
5. Verify a complete 20/20 solution and test alternative approaches; an action count alone does not establish human difficulty.
