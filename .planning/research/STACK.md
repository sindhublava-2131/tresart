# Tech Stack: TresArt (2025 Standard)

## Frontend (Client)
- **Framework**: React 19 (via Vite) — fastest dev loop and modern concurrent features.
- **Styling**: Tailwind CSS 4 — using the new CSS-first engine for minimal config.
- **Animations**: Framer Motion — for "luxury gallery" micro-interactions and smooth page transitions.
- **Icons**: Lucide React — clean, stroke-based minimal iconography.
- **State**: React Context or Zustand — keeping it lightweight and beginner-friendly.
- **API Client**: Axios or Fetch API with a custom service layer.

## Backend (Server)
- **Runtime**: Node.js 22 (LTS)
- **Framework**: Express.js — industry standard for flexibility.
- **Language**: JavaScript (ESM) — keeping it simple for the initial phase.
- **Middleware**: `cors`, `dotenv`, `morgan` (logging), `express.json()`.

## Database
- **Provider**: MongoDB (Self-hosted or Atlas free tier).
- **ODM**: Mongoose — for structured schemas and easy validation.

## Deployment/Environment
- **Dev Tooling**: Vite for the frontend, Nodemon for the backend.
- **Env Management**: `.env` files for secrets (URIs, Secrets).
