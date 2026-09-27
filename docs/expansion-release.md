# Expansion release: levels 21–45

The original 20 campaign IDs remain stable. The five previous bonus sweet puzzles remain available separately. The expansion adds five campaign chapters of five levels using the existing woodland, beach, alpine, circus and candy themes.

Every new map has an automated 20/20 route, an exact event replay, a timed third-star target, relevant inventory and a supported exit. The tests also reject automatic no-input victories and verify progress on level 45 survives save merging. Each new chapter includes a map with more than 50% collision terrain. Fourteen of the 45 campaign maps start low and climb upwards.

New route features include diagonal mining, dig-through trapdoors, repaired bridges, a moving ferry, spring crossings, switch-operated scout gates, Attractor crowd control and colour-coded portals. Mountain terrain has physical snow crests; circus uses purple terrain with a red background and yellow floor. Apparatus uses the existing contrast outlines. Sweet labels are kept inside their individual pieces; the giant Double Dip label occupies an intact panel between tunnels.

Validation: 213 automated tests passed, including all 45 campaign solutions and their replays. All 25 new maps were reviewed in the browser by chapter. Production build and live deployment are checked separately at release time.

Cloud-save setup remains optional and unconfigured in this checkout. The supplied Supabase SQL now supports indices 0–44; an existing installation of that optional backend must rerun the updated setup function before syncing expansion progress. Local profiles support all 45 levels immediately.
