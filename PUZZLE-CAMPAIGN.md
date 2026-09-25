# Puzzle campaign update

The campaign has four five-level chapters: Freaky Forest (1-5), Life's a Beach (6-10), Mountain Rescue (11-15), and What a Circus! (16-20). Difficulty increases from Easy to Extreme across those chapters.
Ten slots have new, individually authored puzzles. Other slots retain their longer excavation expeditions and distinct themes.

| Level | Puzzle | Core dependency |
|---|---|---|
| 4 Easy | Shift Change | Runner crosses a timed press, Platformer reaches shutdown; Attractor holds the crowd. |
| 6 Medium | The Canopy Locksmith | Stacker and Builder reach the canopy switch; a second Basher dismantles the scaffold for the crowd. |
| 7 Medium | The Shifting Dunes | Walk over low dunes; steep sand sends climbers sliding back. Bridge the ravines and bash a lower route through the high dune and tomb wall. |
| 10 Medium | Crevasse Rescue | A lone Parachuter unlocks the rescue pole, then clears and bridges the lower route. |
| 13 Hard | The Fossil Breakthrough | Basher preserves everyone; an alternative Exploder solution meets the 19-person target. Both need a bridge. |
| 9 Medium | The Harbour Drawbridge | Swimmer reaches the moat landing, opens the keep, tunnels to the drawbridge lever and builds to the raised exit. |
| 16 Extreme | The Opening Act | Trampoline transport, Jumper to the control balcony, Digger descent, Basher through scenery, Builder to the exit. |
| 17 Extreme | Rooftop Rendezvous | Two entrances; the upper worker opens the lower gate while a lower Climber opens the upper gate. Recover both groups and span the rooftops. |
| 19 Extreme | Docking Procedure | Three entrances; upper, middle and lower teams open successive gates before all can reunite at the airlock. |
| 20 Extreme | Last Gardener Home | A Parachuter digs down to open the exit; another worker repairs the shaft. Recover the last gardener by a separate ladder route. |

All 16 currently implemented commands appear in verified winning campaign routes:
Walker, Blocker, Builder, Digger, Basher, Miner, Platformer, Climber, Parachuter,
Jumper, Swimmer, Runner, Stacker, Turner, Attractor and Exploder.
Exploder is an optional 19/20 route; every map retains a non-sacrificial 20/20 solution.
The larger wishlist of future skills is not claimed as implemented.

Switches and their gates/bridges carry matching letter badges. One-way arrows disappear as their terrain is removed. Tips remain opt-in.
Existing level unlocks remain; redesigned levels require a new perfect rescue for their gold star.

Validation:
- Every level has a complete, deterministic 20/20 replay within its actual inventory.
- A separate demolition replay verifies the optional 19/20 route.
- Omission checks demonstrate that removing key specialist actions breaks the recorded solutions.
- Mechanics tests cover one-way excavation, switch collision, locked transport, reset and multiple entrances.
These checks establish solvability and route dependencies, not an exhaustive proof against every shortcut or a substitute for human difficulty feedback.

The water-specialist puzzle now occupies beach level 9. Level 14 restores the longer multi-tool mountain expedition, with a four-minute three-star target.
