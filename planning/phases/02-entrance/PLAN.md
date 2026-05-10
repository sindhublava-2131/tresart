# Plan: Phase 2 - The Premium Entrance

Elevate the first impression with a "buttery" luxury reveal sequence.

## Objectives
- [ ] **Interaction**: Add "Enter Gallery" button to `EntranceScreen` to trigger the reveal.
- [ ] **Audio**: Ensure `use-sound` plays `chime.mp3` on button click.
- [ ] **Animation**: Refine `LogoAnimation` to feel premium and "artistic" (hand-painted feel).
- [ ] **Transition**: Implement staggered "soft spring" entrance for Navbar, Hero, and Product Grid.
- [ ] **Asset**: Verify/Add `public/sounds/chime.mp3`.

## Proposed Changes

### [MOD] frontend/src/components/EntranceScreen.jsx
- Add state to manage "Ready to Enter" vs "Animating".
- Render "Enter Gallery" button with high-end hover state.
- Trigger `LogoAnimation` only after click.

### [MOD] frontend/src/components/LogoAnimation.jsx
- (Optional) Enhance the SVG paths for a more "hand-painted" look if necessary.
- Ensure the circular ripple and scale-pop are buttery smooth.

### [MOD] frontend/src/App.jsx
- Refine the `AnimatePresence` and `motion.div` transitions for the main content.
- Use `staggerChildren` or individual delays for Navbar and Hero.

## Verification
- [ ] Site loads with a minimalist black screen and "Enter Gallery" button.
- [ ] Clicking button plays a high-quality chime.
- [ ] Logo animation plays smoothly for ~2-3 seconds.
- [ ] Homepage elements glide in with soft spring physics after the animation.
