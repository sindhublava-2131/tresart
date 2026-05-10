# Pitfalls: React/Express Common Issues

## 1. CORS Errors
- **Issue**: The browser blocks requests from `localhost:5173` (React) to `localhost:5000` (Express).
- **Prevention**: Use the `cors` middleware in Express and configure a proxy in `vite.config.js`.

## 2. Hardcoded URLs
- **Issue**: Fetching from `http://localhost:5000/api` breaks when deploying or changing ports.
- **Prevention**: Use environment variables (`VITE_API_URL`) and a proxy layer.

## 3. Environment Variables
- **Issue**: Exposing MongoDB credentials in the source code.
- **Prevention**: Use `.env` files and ensure they are added to `.gitignore` immediately.

## 4. Giant Components
- **Issue**: Putting all logic and styles into `App.jsx`.
- **Prevention**: Enforce a component-based structure early (ProductCard, Hero, Navbar).

## 5. Sync vs Async
- **Issue**: Forgetting to use `async/await` for database calls, leading to `undefined` errors.
- **Prevention**: Standardize on `async/await` and robust `try/catch` blocks in controllers.
