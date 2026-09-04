# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Locked design decisions

- The source of truth is `design/reference-improvised-system.png`.
- Hero 1 is a dark charcoal, code-and-music composition where binary transforms into notation and muted particles as the user scrolls.
- Use brick, eucalyptus, dusty periwinkle, mushroom, ash, and charcoal. Never use navy, gold, amber, or neon.
- Keep the piano to a small seven-key secondary cue.
- The process order is input, hear, play, teach, make, book.
- Motion must remain user-controlled and honor reduced-motion preferences.
- Booking stays local-only until the owner approves a public contact destination.
