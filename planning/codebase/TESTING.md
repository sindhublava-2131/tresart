# Testing: TresArt

## Current State
- **Backend**: Pytest and HTTPX API tests cover registration, login, product listing, cart operations, and authentication guards. Tests use a fake database and do not require MongoDB.
- **Frontend**: Vite production build is the current automated build check; ESLint is available through the frontend package scripts.
- **Manual/integration**: Visual UI checks and a live MongoDB-backed runtime check remain necessary for end-to-end verification.

## Verified on 2026-09-29
- From `backend/fastapi_app`: `python -m pytest tests` — 4 passed.
- From the repository root: `npm --prefix frontend run build` — passed. Vite reported a config-loader warning and a large-chunk warning.

## Remaining
- Verify API behavior against a configured MongoDB instance and test the deployed runtime.
- Visual regression testing for high-end animations is not configured.
