# Plan: Phase 3 - Core Backend (Auth & Cart)

Implement the secure API foundation for user accounts and cart management.

## Objectives
- [ ] **Dependencies**: Install `bcryptjs` and `jsonwebtoken` in the backend.
- [ ] **Models**: Define `User` and `Product` Mongoose schemas.
- [ ] **Middleware**: Create JWT authentication middleware.
- [ ] **Auth Routes**: Implement registration, login, and profile (GET/PUT) endpoints.
- [ ] **Cart Routes**: Implement cart management (Add/Update/Remove/Get) logic.
- [ ] **Products Route**: Implement endpoint to fetch all products.
- [ ] **Seed Script**: Create script to populate initial ₹450 products.

## Proposed Changes

### [MOD] backend/package.json
- Add `bcryptjs` and `jsonwebtoken` to dependencies.

### [NEW] backend/models/User.js
- Schema: name, email (unique), password, phone, address, cart (array of {productId, quantity}).

### [NEW] backend/models/Product.js
- Schema: name, price (fixed 450), description, imageURL.

### [NEW] backend/middleware/auth.js
- JWT verification and user attachment to `req.user`.

### [NEW] backend/routes/auth.js
- `POST /register`: Hash password, create user, return token.
- `POST /login`: Verify password, return token.
- `GET /me`: Return current user (protected).
- `PUT /me`: Update user details (protected).

### [NEW] backend/routes/cart.js
- `GET /`: Get user's cart (protected).
- `POST /add`: Add product to cart (protected).
- `PUT /update`: Update item quantity (protected).
- `DELETE /remove`: Remove item from cart (protected).

### [NEW] backend/routes/products.js
- `GET /`: List all products.

### [NEW] backend/seed.js
- Mongoose script to clear and seed 3-6 sample products with ₹450 price.

### [MOD] backend/server.js
- Register all routes and ensure MongoDB connection is solid.

## Verification Plan

### Automated Tests
- Test registration/login flow using `curl`.
- Verify JWT protection by attempting to access `/api/auth/me` without a token.
- Test cart operations: Add, Get, Update, Remove.

### Manual Verification
- Run `node seed.js` and verify product count in MongoDB.
