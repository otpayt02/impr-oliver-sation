# Hero 1: Binary to Music Scroll Animation

## Operational brief

Build the selected dark AP Music & Audio concept as a runnable React prototype. The hero must be scroll-linked: a deterministic field of binary glyphs begins at the left, converges into recognizable music notation in the middle, and releases into muted particles at the right. The miniature piano remains a secondary interactive cue. The visual system uses charcoal, ash, brick, eucalyptus, dusty periwinkle, and mushroom—never navy, gold, amber, or neon.

## Approaches considered

1. DOM glyph grid: easiest to inspect, but hundreds of individually animated nodes would be expensive and visually rigid.
2. WebGL shader: strongest particle capacity, but adds dependency and debugging overhead before the visible business funnel exists.
3. Canvas 2D with a deterministic entity model: recommended. It is lightweight, responsive, testable at the mapping layer, and lets scroll—not autoplay—direct the transformation.

## Chosen design

The hero is a 245vh scroll runway containing a 100svh sticky stage. Scroll progress is normalized to 0–1. Each seeded entity has a source position in the binary field, a target staff position, and a final particle position. Two overlapping eased phases create the story: binary to notation from 0.08–0.56, then notation to sound particles from 0.48–0.94. The overlap avoids a mechanical hard cut.

The canvas draws a restrained reaction grid, five staff lines, and the three entity representations. Pointer proximity bends the field when Grid react is enabled. Motion can be disabled; reduced-motion users start with motion disabled and see the finished musical composition. Sound is explicitly off and no Web Audio context is created without a later user-approved feature.

The scroll story continues through input, hear, play, teach, make, and book chapters. The first booking interaction validates a local brief but does not send, publish, or contact anyone. This creates a demonstrable end-to-end slice while preserving approval gates for contact details, payment setup, hosting, and outreach.

## Acceptance checks

- At the hero start, the left field visibly reads as binary.
- At the midpoint, notation and staff lines are clearly visible.
- Near the hero end, the right field visibly reads as music/sound particles.
- Motion and Grid react controls work; reduced-motion has a static result.
- Keyboard focus, mobile layout, booking happy path, and booking empty state are verified.
- Production build and Sites worker tests pass.
