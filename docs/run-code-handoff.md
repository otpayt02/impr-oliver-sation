# Run Code Handoff

- Working directory: `C:\Users\olive\Projects\impr-oliver-sation\site`
- First-time setup: `npm.cmd install --prefer-offline --no-audit --no-fund`
- Start: `npm.cmd run dev -- --host 127.0.0.1 --port 4173`
- Expected URL: `http://127.0.0.1:4173/`
- Smoke check: confirm the first viewport names artists, students, and event hosts; select each of the three starting points and verify its copy and section link change. Turn Motion on, scroll the hero from top to the end of its runway, and confirm the active step changes from `input` to `book` while binary becomes notation on the right. Confirm `#services` shows `Hear the idea`, `Make it playable`, and `Make it heard`, with First Listen still visible. At `#input`, choose an audio file and confirm it previews locally with a rights reminder. Then choose First Listen, complete the required fields, confirm `#book` contains the prefilled local-only brief, and click `Copy local brief`; the status should say it was copied locally and remains unsent.
- Print-card preview: `http://127.0.0.1:4173/card.html` (also emitted as `dist/client/card.html` by the production build).
- First Listen scope preview: `http://127.0.0.1:4173/first-listen.html` (owner-review-only draft; also emitted as `dist/client/first-listen.html`).
- Local proof portfolio: `http://127.0.0.1:4173/#portfolio` (four staged user-provided media items, each marked rights review pending; no upload or public-release action).
- Destination handoff: `http://127.0.0.1:4173/#paths` (booking and support cards show `Pending owner-approved destination` until `VITE_BOOKING_URL` or `VITE_DONATION_URL` is explicitly supplied; no outbound link is present by default).
- SEO source check: `site/index.html` contains domain-neutral `ProfessionalService` JSON-LD with the three buyer outcomes; no canonical domain is asserted.
- Launch gate: `http://127.0.0.1:4173/#launch-gate` lists proof-rights, terms, destination, and evidence checkpoints; browser checks pass at desktop and 390×844 mobile widths, and it has no action controls.
- YouTube draft slate: `http://127.0.0.1:4173/#channel` shows three repeatable draft lanes and links back to First Listen; browser checks pass at desktop and 390×844 mobile widths, and it does not create a channel or publish a clip.
- Lead Map: `http://127.0.0.1:4173/#lead-map` shows three internal draft routes for Louisville rooms, online briefs, and audience proof; browser checks pass at desktop and 390×844 mobile widths with no overflow or console warnings, and it creates no outreach action.
- Owner approval packet: `docs/owner-approval-packet.md` consolidates rights, terms, one destination, outreach approval, and evidence fields; it contains no credentials or send controls.
- Launch readiness check: from `C:\Users\olive\Projects\impr-oliver-sation\site`, run `npm.cmd run check:launch`; it should currently exit 1 with the three missing approval gates, then exit 0 only after the packet is approved and exactly one valid HTTP(S) `VITE_*` destination is supplied. The test suite also proves a synthetic approved packet returns ready without changing the real packet.
- Stop: focus the terminal running Vite and press `Ctrl+C`.
- Tests: `npm.cmd test`
- Production build: `npm.cmd run build`
- Sites packaging check: `npm.cmd run test:sites`

The server can be started with the command above. The ChatGPT Site is privately deployed; contact delivery, payments, and outreach are not connected.
