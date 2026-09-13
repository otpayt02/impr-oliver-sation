# Request Adherence Ledger

## September 13 — original AP studio restoration and motion pass

| Request | Delivery | Communication | Evidence / next disposition |
|---|---|---|---|
| Restore the original site surface and start it | partially implemented | acknowledged | `src/main.jsx` remounts `StudioExperience`; local start blocked by corrupted npm/Vite/React dependency files |
| Entire-site scroll/parallax and chaotic notation resolving to musical order | partially implemented | acknowledged | Existing bounded `SignalField` is scroll-scrubbed; local section depth added; fresh browser proof blocked by the local dependency damage |
| Top progress and three circular text controls | implemented | acknowledged | `StudioExperience.jsx` / `studio.css`; circles are service links, not decorative controls |
| 3D pointer-responsive cards | implemented | acknowledged | Bounded pointer transforms on service cards, disabled under reduced motion |
| Surface piano, bass, drums, event setup, teaching, playlists | partially implemented | acknowledged | Service catalog includes requested terms; playlists clearly stated as in development |
| Do not invent payment, business claims, or publish | preserved | acknowledged | Existing local/TEST checkout remains unchanged; no external actions |

## September 10 — cool two-shade landing correction

Current scope supersedes previous charcoal/cream art direction. Details: `docs/plans/2026-09-10-two-shade-landing.md`.

| Request | Delivery | Communication | Evidence / next disposition |
|---|---|---|---|
| Reject charcoal/cream; cool two-shade Music vs Audio | implemented | reported with evidence | `site/src/DuetLanding.jsx`, `site/src/duet.css`; desktop/mobile screenshots in `site/output/playwright/duet-*` |
| Equal dual service landing first | implemented | reported with evidence | Browser verified matching panel dimensions desktop and 390/320px; both CTAs visible at 1280x720 |
| Keep former site's content | implemented | reported with evidence | Reused ServiceColumns, Approach, Inquiry, PracticeCheckout; all six services, collaborator prefill and rehearsal verified |
| Verify rendered desktop/mobile and build | implemented | reported with evidence | Build passed; 29 existing tests passed; 26 browser checks passed in `site/output/playwright/duet-qa.json` |
| Hosted checkout and production kit | partially implemented | acknowledged | Prior audit complete; final payment values missing; kit and cinematic expansion remain outstanding after landing review |

### Omitted or retired by this correction

Prior charcoal/cream styling, long opening scroll sequence and rotating single offer are superseded. Old source and proposal remain reference material, not current design authority. No deployment or payment approval is inferred.

The detailed active request table lives at `docs/request-adherence.md` and is the canonical ledger for this early-stage project.

## September 9 — source-backed cinematic expansion

This request is in design review, not implementation. Proposal: `site/docs/superpowers/specs/2026-09-09-ap-cinematic-expansion-design.md`. The explicitly selected brainstorming skill requires design approval before source implementation. The current live Site was inspected; no deployed content changed this pass.

| Request | Delivery | Communication | Evidence / next disposition |
|---|---|---|---|
| Inspect apmusicaudio.com and current Site | answered | reported with evidence | Live web content and in-app Site inspected September 9 |
| Incorporate actual business content | planned | acknowledged | Source register and service migration map; implementation after approval |
| Pair Music/Audio in six colors | planned | acknowledged | Three families × two domains, primary-category rules in proposal |
| Bold, minimal landing | planned | acknowledged | Preserve charcoal/cream; fixed editorial frame |
| Stable viewport during two-tab changes | planned | acknowledged | switchDomain contract preserves dimensions, scroll and focus |
| Entirely redesigned cinematic video | planned | acknowledged | Paired 18-second masters proposed; FFmpeg exists locally; videos not produced |
| Smooth scroll, hover and cursor effects | planned | acknowledged | Timing, seek coalescing, pointer limits and fallback contracts |
| Separate digital product/asset/template page | planned | acknowledged | /products with honest readiness/license states |
| Separate custom software/AI page | planned | acknowledged | /technology; demonstrated projects separate from proposed services |
| Separate music performance/production portfolio | planned | acknowledged | /work; source-backed evidence only |
| Bios and named skill allocations | planned | acknowledged | Current domain supplies roles; no invented ratings |
| Full improvisation quote | partially implemented | reported with evidence | Exact quote stored in proposal; not yet displayed on Site |
| Named skills and connectors | partially implemented | reported with evidence | Design/motion/business instructions applied; GitHub/Drive read-only; irrelevant brands/bundlers not imposed; safety-settings unavailable |
| Create/install useful skills | answered | reported with evidence | Existing system and motion guides cover need; no new untested skill or duplicate installation |
| Named system-design/pipeline templates and sizing | deferred | acknowledged | Template manifests inspected; document/workbook authoring and defensible sizing inputs outstanding; no speculative revenue/lead claims |
| Update existing ChatGPT Site | planned | acknowledged | After design approval, implementation and verification; current live version unchanged |

Omitted or retired by proposed design: thin sine-only hero, overloaded independent phrase/scene clocks, fake portraits or stock-as-client-proof, grammar colors competing with service identity. These are proposal decisions, not claims of implemented removal.

## September 6 — cream studio continuation

Evidence: `docs/plans/2026-09-06-cream-studio-payment-handoff.md`; actual browser checks in `site/scripts/qa-cream.cjs` and captures in `site/output/playwright/cream-*.png`. Delivery and communication below apply to this pass, not historic claims.

| Request | Delivery | Communication | Evidence / next disposition |
|---|---|---|---|
| Creamier polished landing page | implemented | reported with evidence | `StudioExperience.jsx`, `studio.css`; desktop/mobile inspected |
| Same-viewport scroll story | implemented | reported with evidence | Six chapters; middle/end/reverse and refresh browser checks |
| Purposeful microinteractions | implemented | reported with evidence | Collaborator controls, service disclosures, form states; reduced-motion and overflow checks |
| Distinct Oliver Payton / Alexander Say presentation | implemented | reported with evidence | Persistent preferences, suggested service leads, shared work; no skill rating claims |
| Six Music/Audio service colors and phrase semantics | implemented | reported with evidence | `studio-catalog.js`; visible domain/layer legend and service titles |
| Credibility per service and future offerings | implemented | reported with evidence | Six labeled illustrative process examples; future workbench; public package excludes pending-rights media |
| Custom request helper | partially implemented | reported with evidence | Validated local brief and deterministic warm reply; real AI/provider and message delivery not connected |
| Practice payment | implemented | reported with evidence | Local success/decline/cancel and $95/$60 offer switches verified; no charges |
| Google Pay | partially implemented | reported with evidence | Official TEST button renders; native invocation returned cancellation; completed wallet response and settlement not verified |
| Cloudflare hosting | partially implemented | reported with evidence | Temporary deployment succeeded, version `74730d69-329d-4c4d-a1b5-ca1dee82f36d`; owner must claim within one hour |
| Hash / HTML glyphs in distribution | implemented | reported with evidence | Existing canvas transitions hash/HTML to notation; emitted bundle deployed |
| Design specification continuation | implemented | reported with evidence | September 5 spec marked historical; September 6 handoff records current decisions and first-sale route |

### Omitted or retired

- Dark-only landing direction and September 5 pre-implementation approval pause are superseded by the explicit September 6 continuation.
- Earlier public-facing owner checklists, lead research, and local proof portfolio are retained in `LegacyStudio` but not mounted in the customer landing page.
- The proposed bot promise that every request is deliverable is replaced by a warm exploration response with scope and timing reviewed by the team.

## Deferred by project

| Item | State | Why | Exact next action |
|---|---|---|---|
| Public booking delivery | deferred | No approved contact destination; the UI adapter intentionally renders an approval gate | Approve a business email or booking provider, set `VITE_BOOKING_URL`, then verify the external link before any outreach. |
| Payment/donation path | deferred | Account and payment changes require approval; the UI adapter intentionally renders an approval gate | Select an owned payment provider, set `VITE_DONATION_URL`, and verify the public button copy and destination. |
| Real performance/audio proof | partially implemented | User-provided audio, video, and notation are now staged locally; rights and public-release approval are not confirmed | Confirm which files are original/owner-permitted, then approve a public title/destination before publishing or outreach. |
| GitHub repository and deployment | deferred | Externally consequential publishing action | Approve repository creation and hosting target after browser QA. |
| Outreach and first-client activity | deferred | Sending messages requires approval | Approve one lead list and one draft before any send. |
| First Listen terms | deferred | Draft price needs owner confirmation | Approve price, delivery scope, licensing, and revision boundary. |

## Implemented but still owner-gated

| Item | State | Evidence | Next owner action |
|---|---|---|---|
| Copy-only booking handoff | verified | `site/src/App.jsx` validates the brief and uses the browser clipboard only after a user click; 22/22 tests, production build, and browser happy/failure checks pass | Paste the copied brief only into an approved destination. |

| Owner approval packet | implemented | `docs/owner-approval-packet.md` consolidates rights, terms, destination, outreach, and evidence fields without secrets or send controls | Return the completed fields; keep blank destinations and unapproved rights disabled. |

| Launch readiness check | verified | `site/scripts/launch-readiness.mjs` evaluates the gates; `site/scripts/check-launch-readiness.mjs` reports them and exits non-zero while incomplete; blocked and synthetic-ready fixtures pass in the 22/22 suite | After owner approval, run the check again, then browser-verify the single configured destination before any external action. |

| Lead Map | verified | `site/src/App.jsx` presents three internal draft routes for Louisville research, online briefs, and audience proof; `docs/local-lead-drafts.md` now adds seven current public-path research routes; browser checks at desktop and 390×844 show three routes with no overflow or console warnings | Approve one lead, one message, and one proof asset before any outreach. |

| Private ChatGPT Site deployment | verified | Sites version 1 was saved from the validated `f6a8b657c68f9d3385dd1b03d1ab8cf2c9753cc3` source state and privately deployed at the owner-only ChatGPT Site URL | Keep the Site private until rights, First Listen terms, and one approved destination are confirmed. |

| Buyer-outcome clarity pass | verified | The first viewport now names the audience and three starting situations, while `#services` maps to `Hear the idea`, `Make it playable`, and `Make it heard`; 23/23 tests and production build pass | Review the live private Site and provide any copy corrections before a future public-launch phase. |
| Curated landing phrase and cool-spectrum pass | implemented | The landing headline now shuffles only pre-approved, complete service scenes, so no random word combination can become nonsensical. Its bright phrase roles follow emerald/cyan → blue → violet, while the bounded glyph field and gray page surfaces use muted cool tones; desktop and mobile captures are recorded in `site/output/playwright/`. | Review the live private Site and name any sentence that should be added, removed, or made less personal. |
| Baroque score-to-signal animation pass | implemented | The old particle drift is replaced by one scroll-scrubbed canvas scene: a sine-wave score unfurls into ASCII dither, then notes resolve into compact code and engineering symbols. Serif display and humanist sans replace all-site terminal typography. | Review the live private Site and name whether the manuscript or engineering moment should dominate longer. |
| Six-stage service journey and chaos-to-score pass | implemented | The first viewport now keeps stages 01–06 in one scroll-scrubbed journey. It moves from incoming multicolor, irregular notation to controlled music-wave families; each stage names a buyer action and result, and the final stage exposes Oliver/Alex studio-focus tabs. | Supply the exact payment provider and approved checkout URL to activate a genuine pay-now action. |
