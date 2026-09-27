# Two-player cloud saves

The game remains on GitHub Pages. Local profiles work without Supabase.

1. Create a Supabase **Free** project. Keep the database password private.
2. Run `supabase/setup.sql` once in its SQL editor. It enables per-account row access and an atomic best-progress merge.
3. In Authentication > Users, create the two player accounts with separate emails and passwords (auto-confirm for these manually provisioned accounts). Players enter their passwords only in the game, not in chat or source files. For this private two-player setup, disable public sign-ups in Authentication settings.
4. Put the project URL and **publishable** key into `src/cloud-config.js`. Never use a secret/service-role key. These browser credentials are public; database access is protected by the sign-in session and row-level policies.
5. Build and publish. Each person chooses/adds their local player and signs into their own account from Players. On another device, create a local profile and sign into the same account. Stars, best rescue counts and best perfect times merge without decreasing.
6. Verify with both accounts: each can sync its own save, cannot read the other account's row, offline completions upload after reconnection, and signing out keeps the local save.

Existing browser progress is copied into Player 1 once. Original storage keys remain as a backup. Unfinished runs are not saved; switching players restarts the run. Local profiles are not a privacy boundary on a shared browser; use separate browser profiles if needed.

Cloud saves are not anti-cheat or verified leaderboard scores. Free projects can pause after inactivity; if that happens, restore the project in Supabase. Local progress remains usable. There is no application-email provider needed for these two manually created accounts. Password recovery can be managed in Supabase until a public account/recovery flow is added.

Development: `npm ci`, `node scripts/vendor.mjs`, `npm start`. `npm run build` bundles the official Supabase client and copies the static game to dist. No cloud calls occur until configured.
