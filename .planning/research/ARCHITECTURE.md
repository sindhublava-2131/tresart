# Architecture: Separated React/Express

## Structure
```
tresart/
├── frontend/           # React application (Vite)
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Page-level components
│   │   ├── api/        # Backend communication layer
│   │   └── assets/     # Images and styles
├── backend/            # Express.js backend
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API endpoints
│   ├── controllers/    # Route logic
│   └── index.js        # Server entry point
└── .planning/          # GSD project memory
```

## Data Flow
1. **Frontend** requests data from **Backend** via API endpoints (e.g., `GET /api/products`).
2. **Backend** queries **MongoDB** using Mongoose.
3. **Backend** returns JSON response to **Frontend**.
4. **Frontend** updates state and renders UI with **Framer Motion** animations.

## Key Boundaries
- The **Frontend** never talks directly to the database.
- The **Backend** is purely an API (headless).
