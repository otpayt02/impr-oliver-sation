TASK: Implement Oliver Payton Solo Cinematic Scroll-Scrubbed Experience in React / Vite

CONTEXT & SPEC:
Read `site/docs/superpowers/specs/2026-09-13-oliver-solo-cinematic-spec.md` before generating code.
Brand identity is strictly OLIVER PAYTON (AP Music & Audio). Do NOT include any other names.

ARCHITECTURE & REQUIREMENTS:
1. Pinned Viewport Scrubbing (GSAP ScrollTrigger):
   - Hero section is pinned (`pin: true`, `scrub: 1.2`) across a 400vh virtual scroll track.
   - Sticky 3-tier headline morphs smoothly through the 8 grammar combinations:
     - Verb (2-shade Green: #7ea293 / #86efac)
     - Focus (2-shade Blue: #60a5fa / #8da9b8)
     - Extension (2-shade Purple: #9333ea / #c084fc)
2. Dual-Layer Note Glyph Canvas:
   - Foreground: Music notes (♩, ♪, ♫, ♬, 𝄞, 𝄢, ♭, ♮, ♯) spawn outside edges, spring-lerp into position, and scatter on word morphs.
   - Background: Sinusoidal wandering ambient notes.
3. Horizontal Parallax Deck (Scene 2):
   - Card deck translates along the X-axis (`xPercent: -75`) as the user continues scrolling down.
4. Interactive ASCII Dither Background Canvas:
   - Fullscreen canvas rendering a matrix of subtle glyphs (`·`, `+`, `×`, `♩`, `♭`).
   - Pointer move causes outward radial displacement and illumination around cursor (`r < 140px`).
5. Performance Guardrails (Intel UHD 620 / 8GB RAM):
   - Clamp DPR to <= 1.5.
   - Pause requestAnimationFrame loops when `document.hidden` or offscreen.
   - Provide clean static layout under `@media (prefers-reduced-motion: reduce)`.

FILES TO GENERATE/UPDATE:
- `site/src/SoloCinematicStage.jsx`
- `site/src/solo-cinematic.css`
- `site/src/AsciiDitherCanvas.jsx`
- `site/src/NoteGlyphEngine.jsx`
- Mount into `site/src/App.jsx` as primary view.

Run `cd site && npm run build` and ensure zero errors.
