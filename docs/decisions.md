# Decisions

## D-001 — Hero direction

- Decision: use Hero 1 / Improvised System.
- Alternatives: Fourier Story and Right-Brain Index.
- Why: the selected mock makes musical perception feel like code becoming performance and best matches the explicit binary-to-notes request.

## D-002 — Rendering architecture

- Decision: Canvas 2D with seeded entities and a pure mapping module.
- Alternatives: DOM glyph grid; WebGL shader.
- Why: it provides smooth reversible motion without adding a heavy art dependency and keeps the algorithm testable.

## D-003 — Motion contract

- Decision: scroll controls the main transformation; time only supplies subtle breathing.
- Why: the visual tells a chronological story and stays under the user's control.

## D-004 — Booking behavior

- Decision: validate and prepare a local inquiry brief without sending.
- Why: the page is demonstrable now while contact details, publishing, and outreach remain approval-gated.

## D-005 — First paid offer

- Decision: use First Listen as the focused front-door offer, with a local draft launch price of $95.
- Alternatives: an all-services menu; a generic tiered pricing table.
- Why: it directly sells the user’s most distinctive ability—hearing a reference and making it useful—while naturally opening transcription, recording, performance, and lesson work.
- Approval note: price, scope, rights, and turnaround are drafts until the owner confirms them.

## D-006 — Card build delivery

- Decision: package `card.html` as a dedicated secondary Vite entry alongside the main website.
- Alternatives: leave it development-only; embed it inside the single-page app.
- Why: the card needs a durable direct URL and print surface without changing the main conversion journey.
- Approval note: packaging is local-only. Hosting and printing remain owner-approved actions.

## D-007 — Portfolio proof handling

- Decision: the existing audio chooser creates a browser-local preview instead of uploading a file.
- Alternatives: a mock portfolio player; an immediate cloud upload flow.
- Why: it lets AP Music & Audio review a real clip in the actual funnel while preserving media rights, privacy, and publishing approval boundaries.
- Approval note: public portfolio placement requires an approved original or owner-permitted file and explicit publish approval.

## D-008 — First Listen scope page

- Decision: give the focused offer a dedicated, clearly marked draft scope page.
- Alternatives: keep the scope only in the booking form; show a broad services list.
- Why: clients need to understand the first paid step without having to decode every future AP Music & Audio offering.
- Approval note: the $95 price, five-day timing, revision rule, and rights position are proposals until the owner approves them.

## D-009 — Monetization evidence

- Decision: track the first payment, accepted booking, or donation in a local evidence ledger rather than treating a page view or draft as revenue.
- Alternatives: mark the funnel complete when the site is published; rely on memory or an unredacted account screenshot.
- Why: the goal requires a verifiable monetization result, while payment and customer data remain privacy-sensitive and approval-gated.
- Approval note: only the owner can approve a real destination, send outreach, or add payment evidence.

## D-010 — User-provided proof staging

- Decision: stage the explicitly supplied audio, video, and notation files in a local portfolio with a rights-review label on every artifact.
- Alternatives: omit the files until approval; present them as public-ready proof.
- Why: the actual work is now available for local review, while copyright, consent, privacy, and public-release status remain honest and visible.
- Approval note: no file is treated as rights-cleared or published until the owner confirms its status and destination.

## D-011 — Empty external destination defaults

- Decision: keep booking and donation destinations empty by default and expose them through `VITE_BOOKING_URL` and `VITE_DONATION_URL` only after owner approval.
- Alternatives: hard-code a provider link; make the local prototype submit to a placeholder endpoint.
- Why: the funnel can demonstrate its conversion handoff without implying a live provider, sending data, or making an account change.
- Approval note: setting either value is an owner action. The URL is accepted only when it is a valid HTTP(S) destination, and no default provider is assumed.

## D-012 — Copy-only booking handoff

- Decision: after required fields validate, offer a user-triggered “Copy local brief” action that writes the prepared text to the local clipboard.
- Alternatives: submit the form to a placeholder endpoint; open an unapproved mailto or booking provider.
- Why: the owner can carry a complete brief into an approved destination without adding a hidden send path or requiring a provider integration first.
- Approval note: copying is local and user initiated. Public contact delivery, booking, payment, and outreach remain separate approval gates.

## D-013 — Four-pillar service map

- Decision: group the broad AP Music & Audio offer into Performance & Events, Lessons & Ear Training, Engineering & Production, and Transcription & Music Tools.
- Alternatives: list every capability in one undifferentiated menu; hide the breadth behind the booking form.
- Why: a prospective client can recognize their use case quickly while the chronological story and First Listen entry point stay intact.
- Approval note: service descriptions are positioning copy, not claims of a completed booking or public credential.

## D-014 — Domain-neutral service schema

- Decision: add the four service pillars to the existing `ProfessionalService` JSON-LD as an `OfferCatalog`, while leaving canonical and public-domain fields unset.
- Alternatives: invent a canonical `apmusicaudio.com` URL; leave the broad service offer only in rendered copy.
- Why: search engines can understand the offer structure now without asserting ownership, hosting, or publication that has not been approved.
- Approval note: public domain, Google Business Profile, and external SEO account changes remain owner-controlled.

## D-015 — Visible launch gate

- Decision: show a four-step local checklist for proof rights, First Listen terms, destination approval, and first evidence capture.
- Alternatives: hide the remaining decisions in docs; show a “launch now” control before the owner approves the required inputs.
- Why: the owner can see exactly what is still needed to turn the prepared funnel into a real, verifiable monetization event.
- Approval note: the checklist is informational and has no publish, outreach, payment, or contact side effect.

## D-016 — Draft content lanes

- Decision: show Morning Prelude, Ten-Second Challenge, and Studio Walkthrough as draft YouTube lanes tied to the First Listen offer.
- Alternatives: create a channel or schedule lives immediately; keep the content plan hidden in a document.
- Why: the audience funnel becomes legible now while accounts, publishing, copyrighted references, and live scheduling stay approval-gated.

## D-017 — Buyer-outcome service map

- Decision: replace the four capability-led service pillars with three buyer-led outcomes: Hear the idea, Make it playable, and Make it heard.
- Alternatives: keep the four internal capability categories; list every service in one long menu; lead with the animation alone.
- Why: a new visitor can identify their starting situation and the concrete thing they will leave with before reading the longer story.
- Approval note: the outcome copy describes the existing AP Music & Audio scope; pricing, rights, contact delivery, and public claims remain owner-gated.

## D-018 — Hero starting-point picker

- Decision: keep the binary-to-notation animation as atmosphere, but place an interactive three-way starting-point picker in the first viewport for an idea, a playable blueprint, or a room/studio need.
- Alternatives: add more ambient animation; keep the former abstract headline and single generic CTA.
- Why: the motion now supports a concrete buyer decision instead of asking the animation to explain the offer by itself.
- Approval note: the picker only changes local copy and navigates to existing sections; it does not create a booking, send a message, or connect a provider.
- Approval note: every lane is a draft format, not evidence of a live channel or published performance.

## D-017 — Single owner approval packet

- Decision: consolidate the remaining rights, offer, destination, outreach, and evidence decisions in `docs/owner-approval-packet.md`.
- Alternatives: ask for each decision across separate turns; place provider-specific fields directly in the public UI.
- Why: one copyable response can unlock the next monetization step while keeping credentials, account changes, and external sends out of the repository.
- Approval note: an unanswered or partial packet leaves all corresponding actions disabled and does not count as monetization evidence.

## D-018 — Fail-closed launch readiness check

- Decision: add `site/scripts/check-launch-readiness.mjs` and the `check:launch` package command to evaluate proof rights, First Listen terms, and exactly one approved HTTP(S) destination before a public handoff.
- Alternatives: rely on a manual checklist alone; treat a configured environment value as sufficient without packet approval.
- Why: the first sale path needs a repeatable, auditable transition from owner decision to browser verification while keeping sends, publishing, and payment actions outside the codebase.
- Approval note: the current command intentionally exits non-zero; it never sends, publishes, changes accounts, or records revenue.

## D-019 — Synthetic readiness fixture

- Decision: test the readiness evaluator with an in-memory approved packet and a test-only HTTPS destination.
- Alternatives: test only the current blocked state; create a real provider URL or edit the owner packet during tests.
- Why: the launch transition is important enough to verify, but test data must never imply rights approval, payment setup, or a public destination.
- Approval note: the fixture is not a client, payment, donation, or monetization result.

## D-020 — Draft-only Lead Map

- Decision: show three internal lead routes—Louisville rooms, online briefs, and audience proof—between the draft content and the local offer.
- Alternatives: add outbound venue links; keep lead generation only in research notes; add a map provider before approvals.
- Why: the website should explain how a first “yes” can arrive while preserving the existing no-outreach, no-account, and no-payment boundaries.
- Approval note: routes stay internal and informational; no venue availability, relationship, account, message, booking, or payment is claimed.

## D-021 — Current public submission routes remain research-only

- Decision: stage Buck's, The Monarch, Volare, and Captain's Quarters as public-path lead research, with SoundBetter and Fiverr recorded as online market signals.
- Alternatives: send the forms immediately; add unverified vacancy claims; create marketplace accounts before the offer and destination are approved.
- Why: a real public submission path makes the first outreach decision concrete while preserving rights review, terms approval, account/payment approval, and the no-send boundary.
- Approval note: no page was submitted, no account was created, no provider was contacted, and no opening or interest is claimed.

## D-022 — Five-line owner response shortcut

- Decision: put a compact five-line approval response at the top of the owner packet and keep the detailed fields below it.
- Alternatives: require the owner to edit every field in place; add a form that could accidentally transmit data.
- Why: reducing response friction is the highest-value local change while rights, terms, destination, and outreach remain human-controlled.
- Approval note: the shortcut changes documentation only; it does not approve anything, configure a URL, send a message, or record revenue.
