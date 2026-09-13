# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

### September 13 — restore the original studio motion surface

- User superseded the two-shade-only landing for the active local runtime: remount `StudioExperience` and retain its bounded scroll-scrubbed notation field and full service surface.
- The requested motion narrative is chaotic ASCII-dither/music notation resolving into organized waves as scroll progresses; keep native scrolling, a top progress line, and complete reduced-motion fallback.
- Return three circular, text-led service wayfinders as useful links (play, learn, make), rather than decorative badges. Pointer depth belongs on service cards only; do not replace the native cursor or add a full-page cursor trail.
- User named piano, bass, drums, audio event setup, teaching, and curated study/workout playlists. Keep those items truthful: the playlists are an in-development practice aid unless approved content is supplied.

### September 13 — service foreground cycling

- The service surface now needs smooth division transitions and user-controlled foreground cycling: Oliver/Alex collaborator controls and Music/Audio service tabs must clearly bring the selected route forward while keeping the other route readable in the background.

### September 13 — saturated glyph formation hero

- The sticky hero must use bounded scroll-scrubbed notation: scattered music notes sequentially settle into oversized letter masks, then change from mixed glyphs into notation. Keep the formation deterministic, reversible, reduced-motion readable, and visibly saturated in distinct green, blue, and purple hues. Music and Audio receive separate saturated palettes.
- Hero letter masks use the existing service-subtitle sans voice at display scale and occupy the left foreground rather than introducing a new display typeface.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Locked design decisions

### September 10 — two-shade landing takes precedence

- User explicitly rejected charcoal/cream. Use a cool two-shade Music versus Audio service landing first: light periwinkle Music and deeper iris-blue Audio, equal emphasis, vertically stacked on mobile.
- Preserve content from the former StudioExperience: named collaborators, service descriptions, process examples, First Listen draft, local brief and TEST rehearsal checkout.
- Active entry is now `src/main.jsx` -> `DuetLanding.jsx`; the prior components are reused as content. Do not remount the charcoal hero or impose its palette, rotating headline, or long scroll runway.
- The cinematic expansion and hosted checkout remain outstanding work; this correction prioritizes the landing page. No payment details were supplied. No go-live approval is implied.

### September 8 — current landing and Sites release

- Active entry is StudioExperience with ServiceLanding. Preserve the cream service sections; retire the multi-scene Film hero from the mounted runtime.
- Minimal charcoal landing: green action, white `your`, blue subject, purple ending. Music and Audio use related lighter/darker cool shades. Choose complete curated phrases, 5.8 seconds apart, with six-phrase repeat exclusion.
- One scroll-controlled composition resolves sporadic left-side HTML/hash waves into orderly musical waves. No fake portraits, photography credits, EQ bars, duplicate headline, or stacked chapter panels in the opening.
- Keep motion pausable, offscreen/hidden-tab gated, and readable without animation. Customer brief and payment remain explicitly local/TEST.
- Publish requested changes to the existing owner-private ChatGPT Site; do not change its audience.

### September 6 continuation — takes precedence for the current landing page

- User requested a creamier, highly polished Music/Audio experience with Oliver Payton and Alexander Say, a viewport scroll story, and restrained microinteractions. Current implementation is `src/StudioExperience.jsx` / `src/studio.css`; `App.jsx` retains the earlier local prototype as `LegacyStudio` for reference.
- Six semantic colors describe Music/Audio × Make/Refine/Present. People are named collaborator preferences, not unverified skill rankings.
- User explicitly authorized payment testing and Cloudflare hosting this pass. Google Pay remains TEST with an example gateway; local order simulations are labeled and never count as charges or bookings.
- Cloudflare package uses `dist/cloudflare` and excludes legacy private proof media. Source edits go in `src`, then the build emits HTML/CSS/JS into `dist`.
- Requested hash/HTML glyphs transition into notation in the existing bounded signal renderer.

- The source of truth is `design/reference-improvised-system.png`.
- Hero 1 is a dark charcoal, code-and-music composition where binary transforms into notation and muted particles as the user scrolls.
- Use brick, eucalyptus, dusty periwinkle, mushroom, ash, and charcoal. Never use navy, gold, amber, or neon.
- Keep the piano to a small seven-key secondary cue.
- The process order is input, hear, play, teach, make, book.
- Motion must remain user-controlled and honor reduced-motion preferences.
- Booking stays local-only until the owner approves a public contact destination.
