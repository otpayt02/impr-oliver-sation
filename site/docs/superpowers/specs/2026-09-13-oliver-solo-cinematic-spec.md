# Spec: Oliver Payton Solo Cinematic Scroll-Scrubbed Experience (v3)

> **Document:** `site/docs/superpowers/specs/2026-09-13-oliver-solo-cinematic-spec.md`  
> **Brand Directive:** AP Music & Audio is exclusively **Oliver Payton** (no co-founder credits/byline).  
> **Architecture:** Single-viewport GSAP ScrollTrigger timeline with pinned stage, sticky 3-tier grammar morphing, horizontal parallax travel, and interactive ASCII dither displacement background.

---

## 1. Brand Identity & Typography Rules
- **Brand Title:** AP Music & Audio (Operated by Oliver Payton)
- **Top Byline:** `OLIVER PAYTON` (Mono uppercase tracking `.25em`, `#7ea293`)
- **Typography:** Georgia Display Serif (Headlines), `ui-monospace` (Tags, metrics, ASCII grid)
- **Palette Tokens:**
  - Background: Obsidian Black `#07070b` / Slate Matte `#0e1312`
  - Lane 1 (Verb): Sage Green `#7ea293` / Emerald Light `#86efac`
  - Lane 2 (Focus / Predicate): Royal Steel Blue `#60a5fa` / Sky Soft `#8da9b8`
  - Lane 3 (Prepositional Extension): Electric Violet `#9333ea` / Lilac `#c084fc`

---

## 2. Pinned Hero 3-Tier Grammar Engine

The headline is **sticky** inside a pinned 400vh scroll container. As the user scrubs down, the text cycles across 8 combinations while note-glyphs (`♩ ♪ ♫ ♬ 𝄞 𝄢 ♭ ♮ ♯`) continuously scatter and retarget:

| Step | Verb (Green 2-shades) | Focus (Blue 2-shades) | Extension (Purple 2-shades) |
|---|---|---|---|
| 01 | **Develop** your | **playstyle** | *to fill the room.* |
| 02 | **Connect** your | **equipment** | *with intention.* |
| 03 | **Turn** your | **ideas** | *into music.* |
| 04 | **Bring** your | **song** | *to life.* |
| 05 | **Trace** your | **signal** | *from the source.* |
| 06 | **Prepare** your | **setup** | *for the stage.* |
| 07 | **Explore** your | **harmony** | *beyond the chords.* |
| 08 | **Shape** your | **sound** | *for the room.* |

---

## 3. Scene Scrubbing Choreography

1. **Scene 1 (0%–25% Scroll):**
   - Hero headline pinned at center.
   - Music glyphs converge from outer edges, locking onto current text anchors.
   - Text morphs across combinations on scrub milestones.

2. **Scene 2 (25%–55% Scroll): Horizontal Parallax Deck**
   - Stage remains pinned while a horizontal ribbon of 4 service cards scrolls `X: 0% → -75%`:
     - Card A: *Ear-First Piano Improvisation*
     - Card B: *Zero-Cost DAW Signal Routing*
     - Card C: *Church & Multitrack Stage Systems*
     - Card D: *Local AI Media Pipeline Automation*

3. **Scene 3 (55%–80% Scroll): The Artifact Vault**
   - 4-tier ladder rises into view:
     - 01: First-Hour Improv Sheet (Free PDF)
     - 02: Discord Artist Community (Free)
     - 03: 7-Day Improv Accelerator ($29)
     - 04: Master Arc System ($149)

4. **Scene 4 (80%–100% Scroll): Ahead of Sound Daily & Direct Booking**
   - Radial purple bloom emerges behind single-field email capture.
   - Direct booking action: "Work 1:1 with Oliver".

---

## 4. Background ASCII Dither Glyph Matrix

- A background HTML5 canvas renders a dynamic grid (18px cell stride) of subtle characters (`·`, `+`, `×`, `♩`, `♪`, `♫`, `♭`, `♯`).
- **Idle State:** Opacity 0.06–0.09 with random glyph flips every 120ms.
- **Pointer Reactive:** Hover/mouse position calculates distance `r < 140px`. Inside the radius, glyphs displace outward along the angle vector and increase opacity to 0.28 in `#7ea293` / `#9333ea`.
- Clamped at DPR 1.5 for steady 60fps performance on Intel UHD 620 / 8GB RAM.
