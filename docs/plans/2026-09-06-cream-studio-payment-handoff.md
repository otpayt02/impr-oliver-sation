# Cream studio — implementation and payment handoff

## Current implementation

The September 6 request authorizes continuing the build, a creamier presentation, viewport scroll storytelling, microinteractions, hash/HTML glyphs, payment practice, and Cloudflare deployment. It supersedes the September 5 design approval pause and the former dark-only palette.

- Main page: `site/src/StudioExperience.jsx`, `site/src/studio.css`.
- Shared service/scene data: `site/src/studio-catalog.js`.
- Practice payment UI: `site/src/PracticeCheckout.jsx`.
- Existing bounded artwork: `site/src/SignalField.jsx`, now transitioning hash/HTML glyphs into music notation, measuring only on resize, and pausing when hidden/offscreen.
- Previous full prototype remains in `site/src/App.jsx` as `LegacyStudio`; its private draft material is not mounted in the new landing page.

## Visual and service decisions

Cream `#f3f1e9` surrounds a graphite `#282f32` score. Music uses green `#25765b`, blue `#3459a0`, and violet `#795099`. Audio uses teal `#247071`, indigo blue `#42558b`, and indigo `#5c4e83`. All six map to Make / Refine / Present with visible text labels.

The six story chapters are Input → Hear → Play → Learn → Make → Begin. Scrolling chooses the complete phrase and its three semantic colors; chapter buttons also navigate the story. Reduced motion and short mobile screens use manual chapter selection with normal document flow. Short screens do not have to scroll through a long empty runway.

Oliver Payton and Alexander Say have persistent collaborator selectors. Suggested Music lead: Oliver. Suggested Audio lead: Alexander. Performance and room work remain shared; each suggestion says the fit is confirmed together. These are editable routing suggestions, not experience ratings or approved credentials.

Every service has an expandable process example. Illustrative harmonic and signal-flow examples replace unapproved public media. Future custom music tools, ear-training exercises, and session templates appear as in development. No new client outcomes are claimed.

The custom brief validates name, email, and goal, includes timing/budget/collaborator, and gives a warm local automated response. Editing invalidates the previous prepared brief. Copying requires a user action. It is a deterministic helper, not a connected AI service or message delivery system.

## Payment modes — what each proves

1. **Local rehearsal:** success, decline, and cancellation. No card, account, processor, charge, or booking. Example offers are First Listen at $95 and a Transcription Map starting at $60.
2. **Google Pay TEST:** lazily loads Google's official JavaScript library and official button. Uses `PaymentsClient({ environment: 'TEST' })` and the documented `example` payment gateway. A returned wallet response is discarded; tokens and card details are never logged, saved, or sent by the app. This tests the wallet interaction only; it does not settle money or create a processor transaction.
3. **Real payment processing:** requires a business payment account and recipient, final offer terms, and a processor-backed checkout. The current build has no live charge path.

Google's [integration tutorial](https://developers.google.com/pay/api/web/guides/tutorial) documents the wallet request and example gateway. The [test card suite](https://developers.google.com/pay/api/web/guides/resources/test-card-suite) describes test-account/card requirements. Google Pay availability depends on browser and account; the site provides an actionable fallback if unavailable.

## First-sale route

Recommended next commercial step: keep the studio site as the storefront and connect a **Stripe Payment Link for First Listen**, after the business account and final offer are known. It gives one fixed-scope path without building a card form or operating a custom payment backend. Stripe [Payment Links](https://stripe.com/payments/payment-links) supports hosted payment links, and its [payment-links guide](https://stripe.com/resources/more/payment-links) includes Google Pay among supported methods. Wallet presentation depends on eligibility and settings.

The first-sale workflow is: one permission-cleared sample → the First Listen offer → approved processor checkout → confirmed receipt → a scoped delivery conversation. Start with one approved warm introduction or an existing audience post. No outreach was sent in this pass. A successful local rehearsal or Google Pay test response is not first-sale evidence.

## Cloudflare

- Config: `site/wrangler.jsonc`.
- Build: `npm.cmd run build:cloudflare` from `site`.
- Publish: `npx.cmd wrangler deploy` after authentication to the intended account.
- Build output: `site/dist/cloudflare`, containing only current HTML, hashed assets, favicon, and headers. Legacy private proof media and older draft pages are excluded from this deployment package.
- Source changes belong in `src`; the build emits them into `dist`.
- Read-only account check returned **not authenticated**. `wrangler login` opened the standard OAuth flow but timed out waiting for the authorization code. The normal-account route was replaced by Cloudflare's documented temporary preview route within the user's hosting authorization.
- **Temporary deployment succeeded:** https://ap-music-audio.hot-cupboard.workers.dev . Version `74730d69-329d-4c4d-a1b5-ca1dee82f36d`. Owner must complete the claim within one hour of provisioning (approximately 11:56 UTC, September 6). The claim link is delivered directly in the conversation and is not stored in project files. Cloudflare [claim documentation](https://developers.cloudflare.com/workers/platform/claim-deployments/) explains expiry and persistence after claiming.
- Wrangler's deployment dry run validates the configuration and upload package without publishing.

## Local preview and verification

From `C:\Users\olive\Projects\impr-oliver-sation\site`:

```powershell
npm.cmd run dev -- --host 127.0.0.1 --port 4173 --strictPort
```

Open `http://127.0.0.1:4173/`; payment practice is `http://127.0.0.1:4173/#checkout`.

Smoke check: `curl.exe -I http://127.0.0.1:4173/`.

Verification: `npm.cmd test`, `npm.cmd run build:cloudflare`, `npx.cmd wrangler deploy --dry-run`.

Browser runner: `npx.cmd --yes --package @playwright/cli playwright-cli -s=ap-cream run-code --filename scripts/qa-cream.cjs` after opening that browser session. Screenshots are in `site/output/playwright/cream-*.png`.

Stop safely with **Ctrl+C in the terminal running this specific Vite server**. Do not terminate unrelated Node processes.

## Verification evidence

- 27/27 Node checks pass. The earlier source-contract tests still cover the retained legacy prototype; these are not evidence for new runtime behavior by themselves. Two new tests validate offer amounts and reject unknown/altered Google Pay practice requests.
- Production Vite build and Cloudflare preparation pass; Wrangler dry run passes; temporary deployment reports uploaded assets and a deployed version.
- 20 browser checks pass on the new page: scroll middle/final/reverse, refresh at position, collaborator selection, service example expansion, service-to-brief selection, form preparation/edit invalidation, local success/decline/cancel, price changes, Google Pay ready/fallback, 390px/mobile final stage and checkout, reduced motion, 320px overflow, and application runtime errors.
- Final local wallet capture shows the official **Pay with G Pay** artwork and TEST caption. An actual button invocation returned cancellation in the automated browser; a completed wallet test response was not observed. Chrome also reported an external Google payment-manifest download issue in earlier checks. The app retains a usable local rehearsal and handles wallet loading/artwork failures.
- UI screenshots: `cream-desktop.png`, `cream-mobile.png`, `cream-story-04Learn.png`, `cream-story-06Begin.png`, `cream-story-01Input.png`, `cream-services.png`, `cream-checkout.png`, `cream-wallet.png`, `cream-mobile-end.png`, `cream-mobile-checkout.png`, `cream-reduced-motion.png`, `cream-small.png` under `site/output/playwright`.
- Remote JavaScript and CSS returned HTTP 200. The root HEAD request received a Cloudflare browser challenge (403); no bypass was attempted. Hosted browser verification is recorded separately after opening the standard browser URL.
