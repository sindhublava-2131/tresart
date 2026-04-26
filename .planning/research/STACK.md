# STACK.md — TresArt Research

## Summary
The 2026 standard for high-end, full-stack art platforms centers on Next.js 15 and Supabase, prioritizing Performance (PPR), Security (RLS), and refined interactivity (Framer Motion).

## Standard Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| **Framework** | Next.js 15 (App Router) | Best-in-class performance with Partial Prerendering (PPR) and Server Actions. |
| **Styling** | Tailwind CSS | Utility-first for rapid "bespoke" luxury UI iteration. |
| **Animations** | Framer Motion | For the "no-compromise" heart animations and layout transitions. |
| **Backend/DB** | Supabase (PostgreSQL) | Native RLS and Auth simplify full-stack social features. |
| **Image Hosting**| Supabase Storage | Low-latency delivery of high-res artistic assets. |
| **Payment** | Stripe (Mocked) | Industry standard for secure checkout flows. |

## Why Next.js 15?
- **Server Actions**: Simplifies the "Heart" interaction by merging backend and frontend logic.
- **PPR (Partial Prerendering)**: Allows the artistic feed to load instantly while social likes hydrate dynamically.

## Don't Hand-Roll
- **Authentication**: Use Supabase Auth (Native support for social/email).
- **Image Optimization**: Use `next/image` exclusively for art assets.
- **State for Likes**: Use `useOptimistic` hook for instant feedback on hearts.

## Confidence Levels
- Next.js 15 + Supabase: **95%** (High stability/performance)
- Framer Motion for Hearts: **90%** (Best for fluid micro-interactions)

---
*Last updated: 2026-04-26*
