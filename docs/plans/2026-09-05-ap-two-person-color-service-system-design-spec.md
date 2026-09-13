# AP Music & Audio — Two-Person, Two-Domain Color System

**Status:** implemented in the September 6 continuation; see `2026-09-06-cream-studio-payment-handoff.md` for the cream palette, current behavior, payment testing, and Cloudflare status. The original proposal below is retained as design history.  
**Scope:** `site/` landing page and local inquiry flow only  
**Changed since the prior pass:** AP Music & Audio now has a proposed, explicit way to distinguish Oliver Payton and Alexander Say while retaining the existing buyer-led funnel and First Listen as the focused first offer.

## Goal, audience, and conversion

**Subject:** AP Music & Audio, a two-person music-and-audio practice led by **Oliver Payton** and **Alexander Say**.

**Audience:** artists with an unfinished idea, students wanting a usable musical skill, and hosts or creators who need a recording, system, or room to work.

**Single job:** help a visitor recognize their need in seconds, understand whether it belongs to Music or Audio, see which person is best placed to lead it, inspect one credible example, and start an inquiry without inventing a public booking or payment destination.

**Primary conversion:** choose a predefined service or prepare a custom local brief. The current `First Listen` draft remains the only clearly scoped first paid offer until its terms are approved.

**Non-negotiables from the request**

- Two top-level people: Oliver Payton and Alexander Say.
- Two related cool-color domains: Music and Audio.
- Three color layers within each domain; six semantic service colors in total.
- Landing-page cycle words visibly adopt the color of the service idea they express.
- Services should distinguish live, digital, learning, performance, production, transcription, ear training, routing, and future capabilities.
- Every service area needs a credibility/example/project-feature surface.
- The design should welcome a custom request while keeping final feasibility and acceptance with Oliver and Alexander, not an automated system.

## The service taxonomy

The system is intentionally not a personality quiz. Color answers two practical questions: **what kind of outcome is this?** and **what stage of work is it in?** Person tabs answer: **who will lead the conversation?** Both people can appear on shared work; a lead label should never erase collaboration.

| Layer / meaning | Music — instrumental & musical language | Audio — signal, systems & sound quality |
| --- | --- | --- |
| **Make** — begin or create | `#3CCFA4` **Mint**: instrument lessons, custom piano parts, songwriting/arrangement starts, musical sampling | `#27B9B2` **Teal**: recording setup, session capture, custom music-tool discovery, production setup |
| **Refine** — understand or improve | `#4C88F4` **Cobalt**: transcription, chord charts, ear training, musical analysis, practice maps | `#3975D6` **Indigo Blue**: mix feedback, audio audit, signal routing, sound-quality diagnosis, workflow improvement |
| **Present** — share or perform | `#9771E8` **Violet**: live performance, accompaniment, rehearsal support, performance coaching | `#685BC7` **Indigo**: live sound support, playback systems, event audio, technical rehearsal |

The Music family is brighter and more open—hands, repertoire, and expression. The Audio family is cooler, denser, and more technical—signal, systems, and clarity. The semantic labels (“Make,” “Refine,” “Present”) must always accompany hue, so color is never the only way to understand a service.

### Ownership and collaboration model

The current request identifies Oliver and Alexander but does not confirm personal credentials or a final skill allocation. Therefore the first implementation must use only **provisional lead labels**, with the ability to assign “Oliver,” “Alexander,” or “Oliver + Alexander” per card after approval.

Proposed editorial split, pending confirmation:

- **Oliver Payton:** Music Make, Music Refine, Music Present; shared input on audio production where the music decision is central.
- **Alexander Say:** Audio Make, Audio Refine, Audio Present; shared input on music performance and production where the system serves the performance.
- **Shared / both:** First Listen, recording-and-arrangement packages, custom music tools, and any service card marked “Oliver + Alexander.”

This proposal is a routing hypothesis, not a public credential claim.

## Page anatomy

### Annotated wireframe

```text
[REQUESTED] AP MUSIC & AUDIO                      [Book / prepare a brief]
[REQUESTED] [ Oliver Payton ] [ Alexander Say ]  ← minimal person tabs

[REQUESTED]  Music / Audio legend
             MAKE  REFINE  PRESENT                ← six labelled color swatches

[REQUESTED]  Hero: one rotating three-part sentence
             [Music Mint] Make your [Audio Indigo] setup [Music Violet] stage-ready.
             A text label below explains each active color's domain + layer.
             [Start with First Listen] [Choose a service]

[INFERRED]   “Choose the kind of help” two-column field
             MUSIC                               AUDIO
             Mint / Cobalt / Violet              Teal / Indigo Blue / Indigo
             3 service cards                     3 service cards
             Lead: Oliver / both                 Lead: Alexander / both

[REQUESTED]  Proof, not promises
             One compact example / project / process card attached to every service.
             Rights / availability status is explicit.

[PROPOSED]   Learn / build / perform comparison
             Helps visitors locate lessons, custom tools, and live support without overlap.

[REQUESTED]  Custom request concierge
             A form asks goal, reference, timeline, budget range, and preferred lead.
             An immediate local reply says: “This sounds worth reviewing. We’ll confirm
             fit, scope, timing, and who leads before accepting it.”

[EXISTING]   First Listen draft scope, local-only brief, visible launch gate, footer
```

## Component-level specification

### 1. Minimal person banner — requested

- Position: directly under the existing header, inside the first viewport.
- Anatomy: two equal buttons, one active at a time; neither is a separate site.
- Content: full name, short role phrase, and a quiet “shared work is possible” note.
- Interaction: selecting a person filters or emphasizes relevant cards and changes the active description; it does not hide shared cards.
- Accessibility: `tablist` semantics, arrow-key support, visible focus, and an explicit text count such as “4 Oliver-led, 3 shared services.”

### 2. Six-color legend — requested

- Position: immediately before the hero headline and repeated as a compact sticky key above the service matrix.
- Anatomy: two labeled domain groups, each containing Make / Refine / Present chips.
- Copy: “Music = what is played and learned. Audio = how it is captured, shaped, and heard.”
- Contrast: bright swatches only on charcoal/graphite surfaces; body copy remains off-white; every chip includes its domain and layer in text.

### 3. Hero cycle — requested

- Retain the current complete-sentence cycling approach; do not independently randomize words.
- Each scene declares one domain/layer token for each colorized phrase. Example scene:
  - `Make` is **Music / Mint**;
  - `your setup` is **Audio / Indigo Blue**;
  - `stage-ready` is **Audio / Indigo**.
- Below the phrase, a one-line decoder updates with the active sentence, for example: “Music / Make · Audio / Refine · Audio / Present.”
- Motion: transform and opacity only, 2.2–3 seconds per complete scene, paused when reduced motion is preferred. The static first scene must still explain the system.

### 4. Music and Audio service matrix — requested

Each domain has three vertical cards in the same structural order: Make, Refine, Present. Card anatomy:

- domain + layer label;
- buyer-facing title;
- concrete result and examples;
- provisional lead badge: Oliver, Alexander, or both;
- “What happens in a first conversation” link to the custom brief;
- proof card with a truthful status: “local review,” “rights review needed,” “draft process example,” or approved proof only.

Initial service content:

| Domain / layer | Buyer-facing card | Example / credibility surface |
| --- | --- | --- |
| Music / Make | Instrument & song-building sessions | a custom piano response or arrangement walkthrough (local/right-reviewed) |
| Music / Refine | Play it by ear | a chord map, transcription excerpt, ear-training exercise, or practice plan |
| Music / Present | Perform with confidence | rehearsal map, accompaniment approach, or live-performance planning case |
| Audio / Make | Build a workable recording setup | recording-chain checklist or custom music-tool sketch |
| Audio / Refine | Hear what the mix or routing needs | annotated audio-audit sample, mix-note format, or signal-flow diagram |
| Audio / Present | Make the room and playback work | technical rehearsal checklist, playback plan, or event signal map |

### 5. Credibility and examples — requested

This replaces generic testimonials. Use project evidence that can be inspected locally and label its status. A card must never imply a paid client, released track, event, or public permission unless that fact is confirmed.

- Available now: existing local audio/video/notation proof may appear only with its current rights-review label.
- Safe process proof: abbreviated chord-map template, routing diagram, session checklist, or 30-second “what we listen for” explanation.
- Future proof: one approved case study per service, using problem → approach → deliverable → verified outcome.

### 6. Custom request concierge — requested, with a safety correction

The request asked for a conversion bot that says yes even if the team may not offer the work. That would create an unreliable promise. The conversion-oriented alternative keeps the warmth but protects customers and the team:

> “That sounds like a strong brief. Oliver and Alexander review every request for fit, scope, timing, and the best lead. Share what you are trying to make possible and we’ll tell you the clearest next step.”

- No artificial claim that a request is accepted, feasible, priced, or bookable.
- Before an approved provider is chosen, preserve the existing local-only prepare/copy flow; do not send data or imply an automatic reply.
- If a future AI assistant is approved, it may classify the stated goal against a maintained service catalogue and propose questions. It must show a human-review notice, not fabricate availability, credentials, turnaround, or acceptance.

## Layout and visual language

- **Grid:** 12 columns desktop. Music occupies left 6 columns; Audio occupies right 6; the divider is a one-pixel quiet rule, not a heavy color split. At 900px, two horizontal fields; below 560px, all cards stack and the legend remains visible before the group.
- **Type:** retain the existing restrained serif display for buyer outcomes and mono utility type for system labels. Do not introduce a generic third font.
- **Surfaces:** charcoal `#252A33`, raised graphite `#343C49`, ink `#E7EBF0`, cool-muted copy `#A5ACB7`.
- **Signature interaction:** the landing sentence acts as a live color decoder; its three colored phrases light the same legend chips and the relevant service cards, rather than acting as decoration.
- **Boundaries:** no generic rainbow gradient, color-only service names, personality stereotypes, animated clutter, or invented portfolio claims.

## Responsive and accessibility checklist

- At small widths, person tabs become full-width touch targets; Music then Audio stack with their complete legends.
- Card proof elements cannot be mistaken for published or clickable content unless there is a real local preview/action.
- Cards use headings, lists, and normal reading order; domain and layer labels appear as text.
- Focus follows visible tabs and filters; no hover-only information.
- `prefers-reduced-motion` leaves the first cycle sentence, legend, card filters, and selected-person state fully readable.
- Test desktop, 390px mobile, keyboard tabs, static/reduced-motion hero, and a refresh within the service matrix.

## Approval decisions before implementation

1. Confirm or revise the proposed person-to-service allocations.
2. Approve the six-color taxonomy and labels: Music/Audio × Make/Refine/Present.
3. Confirm which locally staged proof items can appear and their accurate rights labels.
4. Choose whether a later concierge should remain static/local or use an approved AI provider; external delivery, payments, and booking remain separate owner approvals.

## Acceptance criteria

- A first-time visitor can state the difference between Music and Audio and identify a service’s work stage without relying on color alone.
- A visitor can find Oliver-led, Alexander-led, and shared work without a duplicated site or confusing routing.
- Six service cards, six truthful example/proof surfaces, and a custom request path are present.
- The hero never generates an incoherent sentence and each colored phrase maps to an active, labeled service token.
- Existing First Listen, local-only booking, launch gates, and rights labels remain intact.
- `npm.cmd test`, `npm.cmd run build`, and browser checks at desktop/mobile/reduced-motion pass after implementation.
