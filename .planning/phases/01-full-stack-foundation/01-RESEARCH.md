# Phase 1: Full-Stack Foundation - Research

## Summary
The "no-compromise" setup for Next.js 15 and Supabase in 2026 utilizes the App Router with Server Actions for all mutations. This minimizes client-side complexity while maintaining high performance.

## Scaffolding Strategy
- **Next.js**: Use `create-next-app` with TypeScript, Tailwind, and App Router.
- **Supabase**: Initialize with the Supabase CLI for local development. This allows for local database migrations and edge function testing.
- **Auth UI**: Use a combination of Shadcn/UI for the structure and Supabase's `auth-helpers-nextjs` for the logic.

## Recommended Project Structure
```
/app
  /auth
    /login
    /signup
    /callback (for Google OAuth)
/components
  /ui (Shadcn)
  /auth (Branded Auth components)
/lib
  /supabase (Client/Server instances)
```

## Validation Architecture
- **Auth Flow**: Verify session persistence across refreshes using Middleware.
- **Branding**: Audit the Auth UI against the "TresArt" luxury aesthetic (Dimension 6).
- **Security**: Test Google OAuth redirect flow and error handling.

## Dependencies to Install
- `lucide-react` (Icons)
- `framer-motion` (Animations)
- `@supabase/supabase-js` & `@supabase/ssr`
- `shadcn-ui` (Initialized)

---
*Phase: 01-full-stack-foundation*
*Research completed: 2026-04-26*
