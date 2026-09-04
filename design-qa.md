# AP Music & Audio Hero 1 — Design QA

## Evidence

- Source visual truth: `site/design/reference-improvised-system.png`
- Primary implementation capture: `site/output/qa-v3-start.png`
- Scroll-state captures: `site/output/qa-v3-mid.png`, `site/output/qa-v3-end.png`
- Responsive capture: `site/output/hero-mobile-passed.png`
- Booking interaction capture: `site/output/booking-ready.png`
- Current conversion proof: browser selection moved First Listen to `#book`, prefilled `First Listen — `, and showed the local-only receipt.
- Current card proof: browser inspection found two card faces and a valid `@page` print rule.
- Local proof portfolio capture: `site/output/portfolio-proof.png`, `site/output/portfolio-proof-section.png`.
- Destination handoff proof: fresh browser inspection at `#paths` found two approval-gated cards, no default outbound links, and no horizontal overflow.
- Service map proof: browser DOM checks now confirm all four `#services` pillars at desktop and 390×844 mobile widths with no horizontal overflow.
- SEO proof: source and packaging checks include a domain-neutral JSON-LD `OfferCatalog` for the four service pillars; no public domain is asserted.
- Launch gate proof: browser DOM checks confirm all four `#launch-gate` checkpoints at desktop and 390×844 mobile widths with no horizontal overflow.
- YouTube slate proof: browser DOM checks confirm the draft `#channel` lanes at desktop and 390×844 mobile widths; account creation, live scheduling, and publishing remain absent.
- Lead Map proof: browser DOM checks confirm all three `#lead-map` routes at desktop and 390×844 mobile widths; no overflow or console warnings were observed, and the routes remain internal draft navigation.
- Source/rendered comparison: `site/output/design-comparison.png`
- Source pixels: 1536 × 1024.
- Desktop CSS viewport: 1536 × 1024 at device scale factor 1. Browser-rendered content capture: 1521 × 927 because in-app browser chrome and scrollbar reserve pixels.
- Mobile CSS viewport: 390 × 844 at device scale factor 1. Browser-rendered content capture: 375 × 812 for the same browser-chrome reason.
- State: dark theme; Motion on; Grid react on; Generated noise off.

## Findings

- No actionable P0, P1, or P2 findings remain.
- [P3] The rendered field retains more recognizable notation at the right edge than the source, whose right edge becomes mostly abstract particles. This is an intentional response to the user's explicit request that the binary “turn into the music notes” on the right.
- [P3] The source shows the beginning of the `01 input` chapter in the same frame. The rendered version reserves a full viewport for the scroll performance and reveals the chapter after the 245vh runway. This is an intentional interaction constraint introduced by the requested scrolling animation.

## Required fidelity surfaces

- Fonts and typography: the system monospace stack matches the source's coded editorial character; hierarchy, line height, letter spacing, and wrapping are stable at desktop and mobile.
- Spacing and layout rhythm: header, left-aligned command, right control rail, lower piano cue, process track, and signal field preserve the source anatomy. Mobile controls were separated from the CTA by 15px after correction.
- Colors and tokens: charcoal, ash, brick, eucalyptus, dusty periwinkle, and mushroom are present. No navy, gold, amber, or neon token is used.
- Image quality and asset fidelity: the source image is preserved unchanged. The central artwork is deliberately code-native because animation is the requested behavior; the canvas stays sharp at up to 2× device density.
- Copy and content: the command, no-genre stance, Louisville/remote context, Don Toliver rotation note, and AP Music service story match the selected direction.
- Accessibility and behavior: keyboard-focus styles are visible; controls are native form elements; reduced-motion starts in a resolved static state; mobile has no horizontal overflow; empty and ready booking states are both legible.
- Portfolio proof behavior: four owner-provided media cards render with native audio/video controls or notation images, every card carries `rights review pending`, and no public-release claim is made.
- Destination behavior: booking and support cards remain visibly disconnected until owner-approved `VITE_*` values are supplied; default browser state has no external anchors.
- Service behavior: `#services` makes the broad offer scannable and links back to the focused First Listen offer without creating an external action.

## Comparison history

1. Initial capture found native checkboxes inheriting the 44px form-input height and a center-only notation clump. Fixed with purpose-built 37 × 20 switches and a routed entity pipeline that maintains the left-to-right continuum.
2. Mobile capture found the control rail colliding with the primary CTA. Fixed by moving controls to a compact three-column rail; browser measurement confirmed no overlap.
3. Settled scroll capture found the React visual state one scroll event behind the browser position. Fixed by sampling the normalized runway position on animation frames. Post-fix evidence: `input` at scrollY 0, `teach` at 760, and `book` at 1470, with matching captures and no console warnings/errors.

## Focused comparison evidence

- `site/output/qa-v3-mid.png` proves the staff/notation transition.
- `site/output/qa-v3-end.png` proves the right-side musical resolution.
- `site/output/hero-mobile-passed.png` proves the compact control rail, simple piano, and process navigation at the mobile breakpoint.
- `site/output/booking-ready.png` proves the local-only happy path; the browser also verified the required-fields error state.
- `site/output/portfolio-proof-section.png` proves the staged audio and notation cards at the mobile viewport; browser measurement found no horizontal overflow and all media URLs returned 200.
- The fresh `#paths` browser check proves both monetization handoffs are approval-gated, have no default links, and produce no console warnings.

## Implementation checklist

- [x] Binary, notation, and music are visible in the initial composition.
- [x] Scroll advances the field and its process indicator in sync.
- [x] Motion and Grid react controls work.
- [x] Reduced-motion has a complete static result.
- [x] Mobile layout has no control collision or horizontal overflow.
- [x] Empty and ready booking states work without sending data.
- [x] Browser console has no warnings or errors.
- [x] Booking and support destinations remain empty until owner approval.

final result: passed
