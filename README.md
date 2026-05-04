# 🎨 TresArt

> A bespoke, full-stack art-centric platform for showcasing handmade painted tote bags — where luxury gallery aesthetics meet modern social interactivity.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Auth%20%2B%20DB-3ECF8E?logo=supabase)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)

---

## ✨ Vision

TresArt delivers a **"no-compromise" premium experience** — the platform should feel more like a luxury digital gallery than a standard e-commerce site. Every interaction, from browsing art to tapping a heart, is designed to feel rewarding and artistic.

## 🚀 Features

### Implemented (Phase 1 — Foundation)
- **Full-Stack Architecture** — Next.js 16 + Supabase for premium performance and scalability
- **Branded Authentication** — Split-screen gallery aesthetic with Framer Motion animations
- **Design System** — Luxury minimal theme with deep blacks, clean whites, and soft artistic accents

### Roadmap
- **Curated Discovery Feed** — Stunning, fluid grid with high-res imagery and SSR
- **Interactive Artistry** — Heart micro-interactions with GPU-accelerated animations
- **Premium Hero Experience** — Immersive, animated brand introduction
- **Artisan Shopping Cart** — Persistent, elegant cart system
- **Secure Order Flow** — Seamless checkout with order tracking

## 🛠 Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | Next.js 16 (App Router) | Server-centric performance with RSC |
| **Language** | TypeScript 5 | Type safety across the stack |
| **Styling** | Tailwind CSS 4 | Utility-first luxury aesthetic |
| **Backend** | Supabase | Auth, Database, Row-Level Security |
| **Animations** | Framer Motion | Premium micro-interactions |
| **Forms** | React Hook Form + Zod | Validated, type-safe user input |
| **UI Components** | shadcn/ui (Base UI) | Accessible, customizable primitives |
| **Icons** | Lucide React | Clean, consistent iconography |

## 📁 Project Structure

```
tresart/
├── app/                    # Next.js App Router pages
│   ├── auth/               # Authentication routes (login/signup)
│   ├── globals.css         # Global styles & design tokens
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Landing page
├── components/
│   ├── auth/               # Auth-specific components (AuthForm)
│   └── ui/                 # Reusable UI primitives (shadcn)
├── lib/
│   ├── supabase/           # Supabase client configuration
│   └── utils.ts            # Utility functions (cn, etc.)
├── public/                 # Static assets
├── .env.local.example      # Environment variable template
├── next.config.ts          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies & scripts
```

## ⚡ Getting Started

### Prerequisites

- **Node.js** 18.17 or later
- **npm**, **yarn**, **pnpm**, or **bun**
- A [Supabase](https://supabase.com/) project (free tier works)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/tresart.git
cd tresart
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example file and fill in your Supabase credentials:

```bash
cp .env.local.example .env.local
```

Then edit `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

> You can find these values in your Supabase project dashboard under **Settings → API**.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see TresArt in action.

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint checks |

## 🎨 Design Principles

- **Luxury First** — Every pixel should feel intentional and premium
- **Art-Centric** — The artwork is always the hero; UI stays minimal
- **Alive & Interactive** — Micro-animations make the experience feel responsive
- **Performance Obsessed** — Zero-compromise load times via SSR and image optimization
- **Accessible** — Premium doesn't mean exclusive; WCAG compliance matters

## 🗺 Development Phases

| Phase | Focus | Status |
|-------|-------|--------|
| 1 | Full-Stack Foundation | ✅ Complete |
| 2 | Gallery Feed & Hero | 🔲 Upcoming |
| 3 | Interactive Artistry (Hearts) | 🔲 Upcoming |
| 4 | Artisan Commerce (Cart + Orders) | 🔲 Upcoming |
| 5 | Polishing & Performance | 🔲 Upcoming |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary. All rights reserved.

---

<p align="center">
  <strong>TresArt</strong> — Feel the Artistry ✨
</p>
