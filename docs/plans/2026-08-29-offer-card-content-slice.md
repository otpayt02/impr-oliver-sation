# Offer, Card, and Content Slice

## Subject and page job

AP Music & Audio helps a person turn a reference they can hear into music they can use. The page's single conversion job is to move that person from a vague music goal to one safe, clear starting offer: First Listen.

## Design direction

- Palette: carbon `#101110`, ash `#e8e3da`, brick `#b46f68`, eucalyptus `#7e9279`, mushroom `#ad9a83`, periwinkle `#86809c`.
- Type: coded utility text in the existing monospace system; Georgia display only for decisive editorial statements.
- Layout: an offer ledger after the process story—not a SaaS pricing table. It treats each service as a different output from the same ear-to-hand system.
- Signature: a small `FIRST LISTEN` receipt strip with a controlled, local-only “selected” state that carries into the booking brief.
- Risk: expose a draft launch price directly, but label it as a draft so it creates focus without becoming an unapproved public promise.

## Approaches considered

1. A generic three-tier pricing grid. Rejected: it would flatten the distinctive performance/transcription/teaching process into standard service cards.
2. A single giant booking form. Rejected: it makes a first-time visitor do the diagnosis work before they understand the offer.
3. A focused offer ledger with one primary starting point and two follow-on paths. Chosen: it gives the visitor a clear next move while preserving the user's broad capability set.

## Pseudocode

`OfferLedger` receives the currently selected offer and a callback.

1. Show First Listen as the only active launch offer with its draft price, concrete deliverables, and booking action.
2. Show Transcription Map and One-to-One Session as follow-on outputs, each with a booking action.
3. When a visitor selects an offer, record only the offer name in local React state, update the ledger receipt, and move focus/scroll to the booking section through the existing anchor.
4. Booking pre-fills its goal field with the selected offer but never sends, stores, or transmits user data.
5. The printable card is a separate static artifact with print CSS, AP Music & Audio identity, range of work, partners, Louisville/remote region, and the owner-provided domain reference.

## Error and approval handling

- A visitor who skips selection can still use the booking brief.
- Missing booking fields retain the existing local validation message.
- The offer price is explicitly marked `draft launch price`; it must be confirmed before public hosting or outreach.
- No booking, payment, donation, lead research, or card production action submits data or contacts another party.

## Acceptance checks

- First Listen, price, outputs, and draft status are visible.
- Selecting every offer updates the booking brief locally.
- Card prints at 3.5 × 2 inches per face and does not expose an unapproved personal phone/email.
- YouTube and lead documents clearly remain draft-only.
