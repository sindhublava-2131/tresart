# Project: TresArt (Minimal & Aesthetic Art E-commerce)

## Context

TresArt is a handmade art brand focused on selling hand-painted products, specifically starting with tote bags. The brand is designed to be creative and aesthetic, moving away from a standard "tech" feel toward a minimal, elegant gallery experience.

**Target Audience:** Young users who value artistry, customization, and premium minimalist design.

## Core Value

Deliver a high-end, artistic shopping experience that makes hand-painted products feel like collectible art pieces, using a modern and responsive MERN stack (React, Express, MongoDB).

## Requirements

### Validated
(None — starting fresh)

### Active
- **AUTH-01**: User registration and login (JWT stored in localStorage).
- **USER-01**: User profile management (Name, Phone, Delivery Address).
- **CART-01**: Functional shopping cart (Add, quantity adjust, remove).
- **COMM-01**: WhatsApp order integration (Send summary to +91 6363943487).
- **UIUX-03**: Premium minimalist luxury styling with Tailwind & Framer Motion.

### Out of Scope
- **WISHLIST**: Explicitly excluded as per user request.
- **CMS**: Admin dashboard for product management is deferred.
- **PYMT**: Direct payment gateway integration (using WhatsApp for order finalization).

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| **WhatsApp Orders** | Simple, no-cost order processing via `wa.me` links. | — Confirmed |
| **Fixed Pricing** | All tote bags priced at ₹450 for simplicity. | — Confirmed |
| **JWT Auth** | Secure, stateless authentication for user profiles and carts. | — Confirmed |

## Operational Standards

- **Commit Protocol**: Every completed Phase (from the Roadmap) or Debug Session must be followed by a git commit.
- **Verification Gate**: Commits are permitted once all associated tests have passed and the application functions correctly (explicit user approval is not strictly required).
- **Documentation Sync**: Update `.planning` artifacts (ROADMAP, PROJECT) alongside code changes to maintain state accuracy.

## Evolution

- **2026-05-10**: Milestone 3 initialized — focusing on Core Cart + WhatsApp flow. Removed wishlist and refined order process.
- **2026-05-10**: Established Global Process Standard for mandatory commits after phase/debug completion.

---
*Last updated: 2026-05-10 after Establishing Operational Standards*
