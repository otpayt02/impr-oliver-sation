# AP Music & Audio — First Monetization Evidence Ledger

Status: no monetization result recorded yet. This ledger is local-only and contains no credentials, payment tokens, or private customer data.

## Finish line

The goal becomes verifiable when one row below has a primary evidence artifact (for example, a redacted receipt, accepted booking message, platform payment record, or donation confirmation) and the date, offer, amount, and rights/privacy review are recorded.

## Event log

| ID | Date | Channel | Offer / activity | Counterparty label | Amount / currency | Evidence path | Verification status | Notes |
|---|---|---|---|---|---|---|---|---|
| M-001 | — | — | — | — | — | — | `not recorded` | No first monetization result exists yet. |

## Accepted evidence types

- An accepted paid performance, lesson, transcription, recording, or engineering booking.
- A payment or donation confirmation tied to AP Music & Audio work.
- A paid platform order or signed deal whose amount and date can be verified.

## Booking path — approval-gated

1. Client chooses First Listen or another approved scope.
2. The local brief is completed and reviewed.
3. The owner may copy the validated local brief into an approved destination.
4. Owner approves the public contact destination and exact message.
5. Client acceptance is captured without exposing private details.
6. Payment and delivery evidence are recorded here with sensitive values redacted where appropriate.

## Donation path — approval-gated

1. Owner selects and owns a donation provider and destination.
2. Provider fees, identity, tax, and payout implications are reviewed by the owner.
3. Owner approves the exact public button copy and destination URL.
4. A donation confirmation is saved as local evidence with account identifiers redacted.

## Current gates

- The site now mirrors these gates in a local `#launch-gate` checklist; the checklist itself is not evidence of revenue.
- `docs/owner-approval-packet.md` is the single local response surface for resolving the remaining gates; completing it is not itself evidence of revenue.
- `npm.cmd run check:launch` is the fail-closed readiness check; it currently reports rights, terms, and destination as blocked until the owner approves them.
- Its evaluator also has a synthetic approved-fixture test; that fixture is test data only and does not count as revenue.
- The `#lead-map` section is draft-only navigation between research, offers, and proof; it is not evidence of a lead, booking, or payment.
- Public booking destination: not approved; the UI adapter is present but `VITE_BOOKING_URL` is empty by default.
- Donation provider and destination: not approved; the UI adapter is present but `VITE_DONATION_URL` is empty by default.
- First Listen price, timing, revision, and rights terms: draft only.
- Original performance proof: user-provided audio/video/notation are staged locally; original-work and public-release confirmation are still pending.
- Outreach: no message approved or sent.

Do not mark M-001 complete from a draft, a source file, a page view, or a verbal intention. The evidence artifact must exist and be checked.
