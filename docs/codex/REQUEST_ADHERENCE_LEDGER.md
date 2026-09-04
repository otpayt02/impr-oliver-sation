# Request Adherence Ledger

The detailed active request table lives at `docs/request-adherence.md` and is the canonical ledger for this early-stage project.

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
