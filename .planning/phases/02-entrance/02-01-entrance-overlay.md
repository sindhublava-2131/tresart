# Plan: 02-01 Entrance Overlay & Audio Integration

Create a high-end "Entrance Screen" to initialize the audio context and provide a luxury reveal.

## Goal
A minimalist overlay that appears when the user first visits the site, requiring a click to "Enter Gallery" which then triggers a luxury sound chime and reveals the homepage.

## Proposed Changes

### [MOD] client/package.json
- Install `use-sound`.

### [NEW] client/src/components/EntranceScreen.jsx
- Full-screen minimalist overlay (#0a0a0a).
- Centered "Enter Gallery" button with subtle hover animations.
- Orchestrate the `isVisible` state to the parent component.

### [MOD] client/src/App.jsx
- Add `showEntrance` state (default: true).
- Integrate `EntranceScreen` at the top level.
- Use `use-sound` to play the "luxury chime" when the user clicks the button.
- Pass a `onEnter` callback to trigger the staggered reveal of other components.

### [NEW] client/public/sounds/chime.mp3
- Add a high-quality, short (1.5s) ambient chime sound.

## Verification Plan

### Manual Verification
- Does the overlay appear on refresh?
- Does clicking "Enter" play the sound?
- Does the homepage reveal itself smoothly after the click?
