# AP Music & Audio — two-shade landing

## Current direction

September 10 user correction: reject charcoal/cream, build the cool two-shade Music vs Audio landing first, retaining the old site's content. This takes precedence over earlier aesthetic specifications.

Subject: a two-person music/audio service practice. Audience: musicians, students and event organizers. Job: understand the two offers and enter the matching service or First Listen.

Palette: Music periwinkle #D1D9FC, Audio iris #454B9B, supporting ice #EEF1FF, ink #242961, muted ink #545C83. Display: Georgia; body: Segoe UI; utility: Consolas. No new font payload.

Structure: compact header -> shared introduction -> equally sized Music/Audio offers -> shared First Listen link -> existing services -> approach -> First Listen -> local brief -> TEST checkout -> footer. Mobile stacks both offers with equivalent anatomy and equal actions.

Signature: two matched musical/signal illustrations share the same frame, but show the difference between notes and sound. The illustrations are abstract process drawings, not proof of delivered work. No autoplay or prolonged hero sequence. Hover/focus raises only the selected action, with reduced-motion fallback.

Implementation: DuetLanding reuses ServiceColumns, Approach, Inquiry and PracticeCheckout; duet.css supplies the new visual system. Existing content and draft terms remain intact. Legacy sources are preserved for reference.

## Omitted or retired

- Charcoal/cream palette and single cycling headline: superseded by the explicit correction.
- Paired 18-second video and multi-page expansion: deferred until after this landing review; not claimed implemented.
- Hosted checkout: still blocked on actual provider/link, recipient and final offer terms, then go-live approval. Rehearsal remains usable; no card data is collected or stored by this landing.

## Verification target

Production build and existing tests; desktop/mobile rendered views; equal offer sizes; both service anchors; preserved six services and names; collaborator-to-brief flow; rehearsal states; all fragment links; keyboard and reduced motion; no horizontal overflow at 320/390/1440px.

## Verified outcome

- `npm.cmd run build`: passed, emitting the required Sites package. No deployment performed.
- `node --test tests/*.test.mjs`: 29/29 existing tests passed. Several legacy tests inspect retained source; browser checks separately verify the active entry.
- `scripts/qa-duet.cjs`: 26/26 browser checks passed using installed Edge through Playwright. Initial in-app desktop screenshot also inspected; that connection later closed, so Edge completed QA.
- Screenshots: `site/output/playwright/duet-desktop.png`, `duet-short-desktop.png`, `duet-mobile.png`, `duet-mobile-audio.png`, `duet-services.png`, `duet-checkout.png`.
- Preview: http://127.0.0.1:4173/ ; Music: /#music-make ; Audio: /#audio-make ; First Listen: /#offer ; rehearsal: /#checkout.
- Existing standalone draft /first-listen.html and /card.html are preserved. Their legacy styling is outside the new landing page.

## Run locally

From PowerShell: `Set-Location 'C:\Users\olive\Projects\impr-oliver-sation\site'` then `npm.cmd run preview -- --host 127.0.0.1 --port 4173 --strictPort` (after build).

Smoke: `curl.exe -I http://127.0.0.1:4173/` returns 200. For source edits use `npm.cmd run dev -- --host 127.0.0.1 --port 4174 --strictPort`. Stop the corresponding foreground server with Ctrl+C; do not stop unrelated Node processes.

Fresh production-kit document and hosted payment destination are not complete. The new two-shade direction must be used for those subsequent steps. No synthetic transaction was recorded as revenue.
