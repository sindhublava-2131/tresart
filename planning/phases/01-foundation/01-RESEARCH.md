# Research: Phase 1 — Homepage UI & Backend Foundation

## Standard Stack (2025)
- **Frontend**: React 19 (Stable), Vite 6, Tailwind CSS 4, Framer Motion 12.
- **Backend**: Express 5.1.0 (Stable), Node.js 22 (LTS), Mongoose 8.x.
- **State Management**: React 19 `useActionState` for forms; Context API for minimal global state.
- **UI Primitives**: **shadcn/ui** (fits the minimal luxury aesthetic perfectly).

## Architecture Patterns
- **Monorepo Structure**: Separate `/client` and `/server` directories.
- **Vite Proxy**: Configured in `client/vite.config.js` to route `/api` requests to `localhost:5000`.
- **Root Scripts**: Use `concurrently` in a root `package.json` to start both frontend and backend with one command.

## Don't Hand-Roll
- **CORS**: Use the standard `cors` package in Express.
- **Environment Management**: Use `dotenv` for secrets.
- **Animations**: Use `framer-motion` for staggered reveals (don't write raw CSS animations).

## Common Pitfalls
- **React 19 Refs**: Pass `ref` as a prop directly (no `forwardRef` needed).
- **Express 5 Async**: Express 5 handles async route errors automatically—no more `next(error)` in every catch block.
- **Hydration Errors**: Ensure no browser-only global usage outside `useEffect`.

## Code Examples

### Mongoose 8 Connection
```javascript
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
```

### Vite Proxy Config
```javascript
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
});
```
