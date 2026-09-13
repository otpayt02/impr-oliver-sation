# Progress

## Phase 1 — Direction and offer

- Selected Hero 1: the dark Improvised System concept.
- The original lead promise is retained in the project history; the current visitor-facing promise is “Bring us a song, a room, or a rough idea.”
- Kept the public story broad but organized around one chronological process.

## Phase 2 — Runnable vertical slice

- Binary-to-music hero, service story, and safe booking brief are implemented.
- Verification: 7/7 tests, production build, Sites packaging, desktop/mobile browser states, booking empty/happy paths, and design QA passed.

## Phase 3 — Offer proof and conversion

- First Listen offer ledger: browser-verified. Selecting it scrolls to `#book`, pre-fills the local brief, and shows a local-only receipt.
- Business card: browser-verified as two print faces with a valid `@page` rule and now emitted at `dist/client/card.html` for Sites packaging.
- Draft-only YouTube recording slate and local/online lead preparation: implemented.
- Audio intake now provides a local-only proof preview with an explicit original/owner-permitted rights gate. User-provided audio, video, and notation are staged in the local proof portfolio; rights confirmation is still pending.
- First Listen now has a separate draft scope page with proposed price, timing, scope, exclusions, and rights checkpoint. It is packaged but remains owner-review-only.
- The local prospect slate now includes Varanese, The Brown Hotel, and The Seelbach Hilton, with sourced fit hypotheses and unsent drafts only.
- A one-take, original-piano capture sheet now defines the exact evidence needed to turn the local preview into a real portfolio and YouTube proof item.
- A local monetization ledger now defines what counts as a first payment/accepted booking and keeps booking and donation paths explicitly approval-gated.
- The local proof portfolio now renders four user-provided media artifacts (audio, two notation pages, and video) with a visible rights-review status.
- Booking and support path cards now use an empty-by-default destination adapter; the local build shows the approval gate and creates no outbound link until an owner-approved Vite URL is supplied.
- A validated booking brief can now be copied to the local clipboard for a user-controlled handoff; the copy action has no network or submission path.
- Browser verification now covers the copy happy path, cleared-field failure state, buyer-outcome service map, and four-step launch gate at desktop and mobile widths with no console warnings or horizontal overflow.
- A three-outcome service map now makes the broader offer scannable through the buyer's desired result without replacing First Listen as the focused paid entry point.
- JSON-LD now mirrors the three buyer outcomes for discoverability without adding an unapproved canonical domain.
- A visible launch gate now lists the four human checkpoints between the local prototype and a real monetization result: proof rights, offer terms, destination, and evidence capture.
- The YouTube draft slate now turns the documented channel plan into three visible, repeatable proof lanes without creating an account, schedule, or published clip.
- Browser checks now cover the service map, YouTube slate, launch gate, and copyable brief at desktop and 390×844 mobile widths with no console warnings or horizontal overflow.
- A single owner approval packet now consolidates rights, First Listen terms, one destination, outreach approval, and the first evidence format so the next response can unlock the real handoff without a refactor.
- A fail-closed `npm.cmd run check:launch` command now reports the three remaining approval gates and refuses a ready state until the packet is approved and exactly one valid HTTP(S) destination is configured.
- The readiness evaluator now has a synthetic approved-fixture path, proving the transition to `READY` without writing the real packet, credentials, or external destinations.
- A draft-only Lead Map now connects Louisville venue research, online briefs, and YouTube proof to the existing offer; browser checks pass at desktop and 390×844 mobile widths with no overflow or console warnings.
- The first viewport now names the audience, the three concrete starting situations, and the result of each path; the animation remains a single scroll-linked atmosphere rather than the only explanation of the offer.
- A read-only lead refresh now adds four public submission routes (Buck's, The Monarch, Volare, and Captain's Quarters) plus current SoundBetter/Fiverr online market signals; every route remains unsent and approval-gated.
- The owner packet now leads with a five-line response block so the human approval needed for the first handoff can be returned without scanning the full document.
- Current focus: confirm rights/public release, approve draft pricing and terms, then supply an owner-approved booking or donation destination.

## Blockers and approval gates

- Public contact identity and final destination are not approved.
- Payments/donations, hosting, publishing, outreach, and account changes remain locked.
- A verified first monetization result has not occurred.

## Next milestone

Confirm rights and public-release status for the staged proof set, approve or revise First Listen terms, supply an owner-approved booking/donation destination, and record the first evidence artifact.
