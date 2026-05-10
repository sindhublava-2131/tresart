# Architecture: TresArt

## Overview
TresArt follows a decoupled Client-Server architecture (MERN-style, though currently using mock data).

## Layers
1. **Presentation (Client)**: React-based frontend focused on high-end aesthetics and animations.
2. **API (Server)**: Express-based REST API providing product data.
3. **Storage**: Currently in-memory, planned for MongoDB.

## Communication
- Client communicates with Server via RESTful API calls.
- `cors` is enabled on the server to allow cross-origin requests from the Vite dev server.
