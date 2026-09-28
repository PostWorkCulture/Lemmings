# Fifty-level campaign

The campaign is displayed as five chapters of ten maps:

- Levels 1–10: Freaky Forest — Easy
- Levels 11–20: Dunes — Medium
- Levels 21–30: Mountain Rescue — Medium
- Levels 31–40: Pick ’n’ Mix — Hard
- Levels 41–50: What a Circus! — Extreme

The five previously separate sweet adventures now participate in the campaign, with stars, target times, individual music and saved results. An attractor holds the crowd while a scout prepares the route.

Level IDs remain permanent storage keys. `CAMPAIGN` determines display order and `campaignIndex` determines displayed numbering. Never reorder `LEVELS` or renumber its IDs: local and cloud saves use those identities. Completed maps remain replayable, while new unlocks follow campaign order.

Optional Supabase installations must rerun `supabase/setup.sql` to accept saved IDs 45–49. This checkout has no configured cloud project; local profiles work immediately.
