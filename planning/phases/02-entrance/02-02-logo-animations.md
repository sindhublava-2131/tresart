# Plan: 02-02 Artistic Logo Reveal & Slikkk Experience

Implement the multi-stage artistic logo reveal with hand-sketched strokes, paint drips, and soft transitions.

## Goal
A 4-6 second premium entrance sequence that tells the story of the TresArt brand (Creativity & Hand-painted Art).

## Proposed Changes

### [NEW] client/src/components/ArtisticLogo.jsx
- Full SVG implementation of the Hanger + Brush design.
- Stage 1: Hanger path animation (stroke-dasharray).
- Stage 2: Heart fade and pulse.
- Stage 3: Brush entry and Red paint droplet animation.
- Stage 4: Text reveal (Masked/Fade).
- State: "Settled" state to transition to the main homepage.

### [MOD] client/src/components/EntranceScreen.jsx
- Update background to soft beige (#fcfaf2) with a vignette.
- Replace the "Enter Gallery" button with the `ArtisticLogo` trigger.
- Add a soft "glow" effect around the red paint tip.

### [MOD] client/src/index.css
- Define the soft beige theme and vignette styles.

## Verification Plan

### Manual Verification
- Does the animation last ~5 seconds?
- Does the hanger draw from left to right?
- Does the red paint droplet look smooth?
- Does the final state feel "breathing" and calm?
