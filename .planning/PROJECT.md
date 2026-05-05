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
- **BRAND-01**: "Feel the Artistry" brand identity and tagline integration.
- **UIUX-01**: Minimal, elegant, and aesthetic UI design system.
- **UIUX-02**: Fully responsive layouts for mobile and desktop.
- **FEAT-01**: Branded Homepage with Hero section and logo.
- **FEAT-02**: Product Grid showcasing at least 3 sample tote bags.
- **ARCH-01**: Clear separation between `/client` (React) and `/server` (Express).
- **DATA-01**: MongoDB persistence for product data.
- **API-01**: Express API for fetching products (`GET /products`).

### Out of Scope
- **AUTH**: User authentication (Login/Signup) is explicitly excluded from the initial phase.
- **COMM**: Shopping cart and checkout are not part of Phase 1.
- **CMS**: Admin dashboard for product management is deferred.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| **React (no Next.js)** | User preference for a standard SPA architecture. | — Confirmed |
| **Separate Client/Server** | Clean architectural separation between frontend and API logic. | — Confirmed |
| **MongoDB (Direct)** | No Supabase or paid services as per user constraint. | — Confirmed |

## Evolution

This document evolves at phase transitions and milestone boundaries.

---
*Last updated: 2026-05-05 after total project reset*
