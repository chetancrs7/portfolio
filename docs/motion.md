# Motion

Motion should support the portfolio's backend and AI/ML positioning without changing the visual system. It is intentionally sparse, slow, and tied to existing hierarchy.

## Components

Installed Magic UI components:

- `animated-gradient-text`
- `number-ticker`
- `border-beam`

Local wrappers:

- `MotionNumber` keeps the number ticker behind a small client boundary and renders a static number for reduced motion.
- `FlagshipBorderBeam` keeps the border beam behind a small client boundary and renders nothing for reduced motion.

## Homepage Usage

- Hero copy reveals in sequence once on load.
- The headline accent uses the animated gradient text component.
- The status badge dot pulses slowly.
- The technical visual uses low-speed orbit markers on desktop only.
- The credibility strip animates the real `3` core-area metric once.
- The flagship work card uses the only border beam on the homepage.

## Accessibility

The global reduced-motion media query disables CSS animations and transitions. Motion-powered wrappers also check the user's media preference before mounting JavaScript-driven animation.

## Performance

Motion is limited to transform, opacity, and background-position. Client component boundaries are isolated to the wrappers that need Motion runtime APIs.

## Rejected For This Phase

- Animated beams between content blocks
- Marquees
- Particle fields
- Custom cursor effects
- Parallax layers
- Broad scroll reveals across every section

Future motion additions should introduce one effect at a time, document the rationale, and verify desktop, tablet, mobile, and reduced-motion behavior before merging.
