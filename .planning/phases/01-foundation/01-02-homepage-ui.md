# Plan: 01-02 Client & Homepage Implementation

Build the "Feel the Artistry" homepage using React, Tailwind CSS 4, and Framer Motion.

## Goal
A stunning, responsive homepage in the `/client` directory that fetches and displays products from the backend.

## Proposed Changes

### [NEW] client/ (via Vite 6)
- Initialize React 19 project using Vite.
- Install `tailwindcss@4`, `@tailwindcss/vite`, `framer-motion@12`, `lucide-react`, `axios`.
- Configure Tailwind 4 and the `/api` proxy in `vite.config.js`.

### [NEW] client/src/components/Navbar.jsx
- Minimalist navigation bar using shadcn-inspired primitives.

### [NEW] client/src/components/Hero.jsx
- Full-height immersive section with large typography and "Feel the Artistry" tagline.
- Use Framer Motion for text reveal animations.

### [NEW] client/src/components/ProductCard.jsx
- Elegant card for individual products with hover effects.

### [NEW] client/src/App.jsx
- Assemble the sections: Navbar, Hero, and ProductGrid.
- Fetch products from `http://localhost:5000/api/products` on mount.

## Verification Plan

### Manual Verification
- Visual check: Does it look "luxury and minimal"?
- Responsiveness: Test on mobile view in browser dev tools.
- Interaction: Do hover states and reveal animations feel "fluid"?
