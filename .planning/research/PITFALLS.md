# PITFALLS.md — TresArt Research

## Summary
Building a "luxury" site requires avoiding common "cheap" web patterns and technical bottlenecks that break the artistic illusion.

## Critical Pitfalls

### 1. Cumulative Layout Shift (CLS) on High-Res Images
- **The Risk**: Images popping in and moving content down feels "unstable" and non-premium.
- **Prevention**: Use `next/image` with explicit `aspect-ratio` and `blurDataURL` placeholders.

### 2. "Jank" in Heart Animations
- **The Risk**: If the heart animation is tied to a network request without optimistic updates, it will feel sluggish.
- **Prevention**: Use Framer Motion for GPU-accelerated transforms and `useOptimistic` to decouple UI from API latency.

### 3. Over-Engineering Global State
- **The Risk**: Using Redux/Zustand for a simple cart + hearts can bloat the client bundle.
- **Prevention**: Use React Context for the Cart and Server Actions for the hearts. Keep it lean.

### 4. Weak RLS (Row Level Security)
- **The Risk**: A user could spoof likes or view others' orders if Supabase policies are not strictly tested.
- **Prevention**: Implement exhaustive testing for RLS policies during the "Full-Stack Foundation" phase.

## Prevention Strategy
- **Performance Budget**: Monitor LCP (Largest Contentful Paint) — should be < 1.2s for "luxury" feel.
- **Micro-Interaction Audit**: Test every button hover and interaction for responsiveness.

---
*Last updated: 2026-04-26*
