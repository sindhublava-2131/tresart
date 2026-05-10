# Research: Slikkk Experience & Artistic Logo Reveal

## Logo Design (Hanger + Brush)
- **Hanger**: Smooth, thin-line stroke. Features a small heart loop in the center.
- **Brush**: Vertical alignment. Tapered bristles.
- **Paint**: Red droplet at the tip. Subtle drip animation.

## Animation Sequence (4-6 Seconds)
1. **Background**: Soft beige (`#fcfaf2`) with a subtle vignette effect.
2. **Hanger**: Hand-sketched stroke animation (`stroke-dashoffset`).
3. **Heart**: Soft fade and rhythmic "breathing" pulse (`scale: [1, 1.05, 1]`).
4. **Brush**: Slide down from top-center.
5. **Drip**: Red circle scaling and moving down with a gravity-like ease.
6. **Ink Spread**: Radial gradient expansion or soft SVG blur filter expansion.
7. **Typography**: "tresart" (lowercase, elegant serif) and "Feel the artistry" (italicized light weight).

## Physics & Motion
- **Easing**: `easeInOut` for everything.
- **Soft Springs**: `stiffness: 40`, `damping: 20` (slower and calmer than previous version).
- **Floating**: After settlement, apply a slow `y: [-2, 2, -2]` oscillation to the entire logo group.
