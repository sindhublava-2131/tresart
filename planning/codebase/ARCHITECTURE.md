# Architecture: TresArt

## Overview
TresArt uses a decoupled React/Vite client and FastAPI service backed by MongoDB. The previous Express backend remains in the repository as a rollback path; FastAPI is the current development and CI backend.

## Layers
1. **Presentation (Client)**: React and Vite frontend with product fallback data when the API is unavailable.
2. **API (Server)**: FastAPI routes for authentication, products, and cart operations; JWT protects profile and cart endpoints.
3. **Storage**: MongoDB accessed asynchronously with PyMongo. Connection settings are loaded from environment configuration.

## Communication
- The frontend calls the API at `http://localhost:5000` by default; `VITE_API_URL` can override the base URL.
- FastAPI CORS permits configured origins, including the local Vite origin.
- The `start.py` launcher starts FastAPI and Vite together; Jenkins installs dependencies, runs API tests, and builds the frontend.

## Verification Boundary
- API tests use a fake database and cover auth, products, cart operations, and protected routes.
- A live MongoDB connection and deployed runtime have not yet been verified.
