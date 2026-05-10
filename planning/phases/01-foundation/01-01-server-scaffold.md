# Plan: 01-01 Server & Database Scaffolding

Establish the backend core for TresArt using Express and MongoDB.

## Goal
A running Express server in the `/server` directory that connects to MongoDB and serves a list of sample products.

## Proposed Changes

### [NEW] server/package.json
- Initialize Node.js project with ESM support (`"type": "module"`).
- Install dependencies: `express@5.1.0`, `mongoose`, `cors`, `dotenv`.
- Add `start` and `dev` (using nodemon) scripts.

### [NEW] server/index.js
- Configure Express 5 app (ESM).
- Set up `cors` and `express.json()` middleware.
- Connect to MongoDB using Mongoose 8 (async/await).
- Define a `Product` schema and model.
- Create `GET /api/products` route (no explicit error handling needed in Express 5).
- Seed database with 3 sample products if empty.

### [NEW] .env
- Add `MONGODB_URI` and `PORT`.

## Verification Plan

### Automated Tests
- `curl http://localhost:5000/api/products` should return a JSON array of 3 products.

### Manual Verification
- Check console logs for "Connected to MongoDB" and "Server running on port 5000".
