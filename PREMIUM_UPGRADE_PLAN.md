# AP Music & Audio — Premium Cinematic Upgrade Plan

## Vision
Transform the current cream-themed, functional prototype into a **$10,000 premium cinematic website** that animates the visualization of Oliver Payton and Alexander Say providing exceptional music services. The site should feel like a high-end creative studio portfolio — immersive, intentional, and emotionally resonant.

## Current State Analysis
- **Theme**: Cream/light (#f3f1e9 base) with six-color service system (mint, cobalt, violet, teal, indigo-blue, indigo)
- **Hero**: Scroll-driven SignalField canvas (binary → notation → particles)
- **Structure**: Single-page narrative (input → hear → play → teach → make → book)
- **Interactions**: Person picker (Oliver/Alex), motion controls, local-only booking, Google Pay test
- **Visual Language**: Restrained, professional, but lacks cinematic depth

## Premium Upgrade Strategy

### 1. Cinematic Scroll Film Hero (KOA Pattern)
**Replace current hero with full cinematic film stage:**
- 2400-frame scroll film with momentum physics
- Chapter dots navigation (6 chapters matching service stages)
- Frame counter (FRAME 0000 / 2400)
- **Scene 1 (Logo/Orbit)**: AP monogram with seal halo + torch flare, "Music for the feeling. Audio for the way it reaches you."
- **Scene 2 (Portrait)**: Oliver at piano — "Bring your idea to life."
- **Scene 3 (Ribbon)**: Alexander at console — "Hear the detail. Find the way."
- **Scene 4 (Portrait)**: Collaborative session — "Shape your sound. Make it yours."
- **Scene 5 (Ribbon)**: Room/Event — "Build the moment. Let it resonate."
- **Scene 6 (Generated/CTA)**: Final frame — "Find your people. Start something."

### 2. Enhanced SignalField (Premium Music Visualization)
**Upgrade the existing canvas to premium quality:**
- Real staff notation rendering (not just glyphs)
- Note particles with physics (gravity, attraction, dispersion)
- Frequency spectrum visualization bars
- Smooth binary → staff → particles morphing
- Reactive to scroll velocity (not just position)
- Pointer proximity creates "magnetic" field distortion
- Color-coded by domain: Music (warm/gold) vs Audio (cool/teal)

### 3. Cinematic Reveal Animations
**Add to ALL content sections below the film:**
- Service matrix cards (stagger 80ms)
- Offer ledger rows (stagger 60ms)
- Content slate lanes
- Lead map routes
- Portfolio proof cards
- Practice checkout card
- Respects `prefers-reduced-motion` and manual toggle

### 4. Premium Design Token System
**Replace current CSS variables with cinematic tokens:**

```css
:root {
  /* Cinematic Navy Theme (Primary - Dark) */
  --navy-950: #050814;
  --navy-900: #0a1628;
  --navy-850: #102038;
  --navy-800: #162a48;
  --navy-700: #223d5e;
  
  --porcelain: #f5f0e8;
  --cream: #f3f1e9;
  --cream-raised: #faf9f4;
  
  --koa-red: #d84a4d;
  --koa-red-dark: #b9162b;
  --gold: #d4a843;
  --gold-soft: #e8c97a;
  
  --eucalyptus: #6fc7a5;
  --eucalyptus-soft: #a8e4c8;
  
  --violet: #9771e8;
  --indigo: #685bc7;
  
  /* Motion tokens */
  --transition-fast: 160ms;
  --transition-base: 280ms;
  --transition-slow: 420ms;
  --ease-cinematic: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  
  /* Layout */
  --gutter: clamp(1.5rem, 4vw, 3rem);
  --container-max: 1400px;
  --header-height: 88px;
  
  /* Z-index layers */
  --z-film: 0;
  --z-content: 10;
  --z-header: 50;
  --z-modal: 100;
  
  /* Typography */
  --serif-display: 'Libre Caslon Display', Georgia, serif;
  --serif-body: 'Libre Caslon Text', Georgia, serif;
  --sans: 'DM Sans', 'Segoe UI', sans-serif;
  --mono: 'JetBrains Mono', Consolas, monospace;
}

/* Cream/Light Theme (Current - Secondary) */
[data-theme="cream"] {
  --bg-primary: var(--cream);
  --bg-surface: var(--cream-raised);
  --bg-elevated: #ffffff;
  --text-primary: #242a2a;
  --text-secondary: #626b67;
  --text-muted: #a5acb7;
  --line: rgba(36, 42, 42, 0.12);
  --line-strong: rgba(36, 42, 42, 0.22);
}

/* Navy/Dark Theme (Premium - Primary) */
[data-theme="navy"] {
  --bg-primary: var(--navy-900);
  --bg-surface: var(--navy-850);
  --bg-elevated: var(--navy-800);
  --text-primary: var(--porcelain);
  --text-secondary: var(--muted);
  --text-muted: #8a94a3;
  --line: rgba(245, 240, 232, 0.1);
  --line-strong: rgba(245, 240, 232, 0.18);
}
```

### 5. Theme Toggle (Cream ↔ Navy)
- Persisted in localStorage (`ap-theme`)
- Respects `prefers-color-scheme` on first visit
- Smooth cross-fade transition (300ms)
- Updates SignalField palette dynamically
- Updates all component colors via CSS variables

### 6. Visual Polish Details
- **Micro-interactions**: Button hover/tap states, focus rings, loading skeletons
- **Scroll indicators**: Subtle scroll progress bar, "scroll to explore" invitation
- **Typography**: Display serif for headlines, readable serif for body, mono for labels
- **Depth**: Layered shadows, glassmorphism cards, subtle gradients
- **Color accents**: Gold for CTAs, Red for urgent/primary, Eucalyptus for success/growth
- **Empty states**: Beautiful illustrations, not just text

### 7. Service Visualization Enhancement
- Each service card gets a **mini SignalField preview** (small canvas)
- Interactive: hover to see the "sound" of that service
- Color-coded by domain/layer
- "Inside the approach" expands with animated process diagram

## Implementation Order

1. **Phase 1**: Design tokens + theme system (foundation)
2. **Phase 2**: Cinematic scroll film hero (showstopper)
3. **Phase 3**: Enhanced SignalField (core visual)
4. **Phase 4**: Reveal animations (polish)
5. **Phase 5**: Theme toggle + persistence
6. **Phase 6**: Service card micro-visualizations
7. **Phase 7**: Final verification (build, test, browser)

## Success Criteria
- [ ] `npm run build` passes with no errors
- [ ] `npm test` all 27 tests pass
- [ ] Dev server renders at localhost:5173
- [ ] Desktop (1440px): Film hero fills viewport, smooth scroll, chapters navigate
- [ ] Mobile (390px): Film stacks, chapters accessible, touch scroll works
- [ ] Reduced motion: All animations disable, content fully readable
- [ ] Theme toggle: Instant switch, persists on reload
- [ ] SignalField: 60fps scroll-linked animation, reactive pointer
- [ ] Visual parity: Feels like a $10k creative studio site