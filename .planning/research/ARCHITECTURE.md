# ARCHITECTURE.md — TresArt Research

## Summary
The system follows a "Server-Centric, Client-Hydrated" architecture, leveraging Next.js App Router to keep the "Gallery" fast while providing "Social" reactivity.

## Component Boundaries

### 1. The Art Gallery (Server Components)
- Responsible for fetching and rendering high-res images from Supabase.
- SEO-optimized metadata generation for each tote bag.
- Static rendering of product descriptions.

### 2. The Interaction Layer (Client Components)
- **Heart Interaction**: Handles the Framer Motion animation and calls the `likeArt` Server Action.
- **Shopping Cart**: Client-side state managed by a custom hook, synced with Supabase for logged-in users.
- **Hero Animation**: Zoom/Fade effects on initial page load.

### 3. The Data Foundation (Supabase)
- **Tables**: `products`, `profiles`, `likes`, `orders`, `order_items`.
- **Policies (RLS)**: Users can only see their own orders, but anyone can see product likes.

## Data Flow
1. **Fetch**: Next.js fetches `products` + `like_count` in a Server Component.
2. **Action**: User clicks "Heart" → Client Component calls `likeArt` (Server Action).
3. **Optimistic UI**: Client UI increments heart count instantly using `useOptimistic`.
4. **Sync**: Server Action updates PostgreSQL and revalidates the path.

## Build Order
1. **Core Data**: Set up Supabase schema and Auth.
2. **Gallery Feed**: Build the Next.js Server Component grid.
3. **Interactivity**: Implement "Hearts" and Animations.
4. **Commerce**: Build the Cart and Checkout flow.

---
*Last updated: 2026-04-26*
