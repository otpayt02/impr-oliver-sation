# Spec: Hero Heading Visual Hierarchy & Music Note Glyph Motion System

> **Document:** `site/docs/superpowers/specs/2026-09-13-hero-heading-motion-spec.md`  
> **Source Target:** Extracted from visual recording (`hero_heading_spec.mp4`) & `koa.html` motion physics spec.

---

## 1. Visual Hierarchy & Typography Tokens

The hero headline follows a strict tripartite visual grammar on a dark matte canvas (`#161c1b` / `#07070b`):

```
┌────────────────────────────────────────────────────────┐
│  ap. MUSIC & AUDIO                                     │
│                                                        │
│  OLIVER PAYTON                                         │  <-- Byline Mono Subhead (Solo Track)
│  Connect your                                          │  <-- Verb (Sage Green) + Object Focus 1 (Off-White)
│  equipment                                             │  <-- Object Focus 2 (Muted Steel Blue)
│  with intention.                                       │  <-- Predicate Context (Muted Lilac Purple)
└────────────────────────────────────────────────────────┘
```

### Color Token Mapping
- **Canvas / Background:** `#131918` to `#161c1b` (Deep matte obsidian/slate)
- **Top Brand Mark:** `ap.` (Georgia serif, White `#ffffff`), `MUSIC & AUDIO` (Stacked Mono, `#8b9a96`)
- **Byline Subhead:** `OLIVER PAYTON` (Uppercase mono tracking `.24em`, Sage tint `#7ea293`)
- **Action Verb (Line 1):** Soft Sage Green (`#7ea293` / `#86efac`)
- **Object Focus (Line 1 suffix / Line 2):** Pure Off-White (`#f2f4f3`) & Muted Steel Blue (`#8da9b8` / `#60a5fa`)
- **Predicate Context (Line 3):** Muted Lilac Purple (`#b99cb6` / `#c084fc`) with trailing period `.`

---

## 2. Phrase Rotation Inventory

Each slide state transitions synchronously across all 3 color lanes:

| Verb (Sage Green) | Focus (White / Steel Blue) | Predicate (Lilac Purple) |
|---|---|---|
| **Connect** your | **equipment** | with intention. |
| **Turn** your | **ideas** | into music. |
| **Bring** your | **song** | to life. |
| **Trace** your | **signal** | from the source. |
| **Develop** your | **ear** | one note at a time. |
| **Prepare** your | **setup** | for the stage. |
| **Explore** your | **harmony** | beyond the chords. |
| **Shape** your | **sound** | for the room. |

---

## 3. Note-Glyph Particle Assembly Engine

Instead of Karen / Burmese characters, particles use standard musical glyphs:
`♩` (quarter), `♪` (eighth), `♫` (beamed eighths), `♬` (beamed sixteenths), `𝄞` (treble clef), `𝄢` (bass clef), `♭` (flat), `♮` (natural), `♯` (sharp).

### Layer Architecture
1. **Word-Formation Canvas Layer (Z-Index: 2):**
   - **Edge Injection (Default-on):** On initial page load and mount, glyphs spawn 30–80px outside all 4 screen bounds and converge towards pixel anchor coordinates.
   - **Text Pixel Sampling:** An offscreen HTML5 canvas renders the target 3-line text block in Georgia serif, scanning pixel stride grids for alpha `> 128`.
   - **Spring Lerp Kinetics:**
     ```javascript
     vx += (targetX - x) * 0.022;
     vy += (targetY - y) * 0.022;
     vx *= 0.85;
     vy *= 0.85;
     x += vx;
     y += vy;
     ```
   - **No Despawn Reshuffle:** When phrases cycle (~3.2s), glyphs receive a radial explosion vector (`2–5px/frame` outward from phrase centroid) decaying over 400ms, then immediately lerp into the next phrase's anchor matrix.

2. **Ambient Floating Drift Layer (Z-Index: 1):**
   - 60–80 background music glyphs wandering sinusoidally across the canvas.
   - Low opacity (`0.12 - 0.22`), tinted `#4ade80` and `#60a5fa`.
   - Never form words; provide atmospheric depth behind the assembling foreground letters.

---

## 4. Hardware & Performance Guardrails

- **Target Benchmark:** Intel UHD 620 / 8 GB RAM.
- **DPR Clamping:** `Math.min(window.devicePixelRatio || 1, 1.5)`.
- **Adaptive Load Balancer:** Max 220 active foreground particles. If frame time exceeds 20ms over 60 consecutive frames, drop particle stride down automatically.
- **Intersection & Tab Inactive:** Freeze `requestAnimationFrame` when tab loses focus (`document.hidden`) or hero canvas scrolls out of viewport.
- **Accessibility:** `@media (prefers-reduced-motion: reduce)` renders clean static typography without canvas overhead.
