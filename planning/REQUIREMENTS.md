# Requirements: Milestone 3 - Core Cart & WhatsApp Orders

## User Stories

- As a user, I want to see all products on the home page and add them to my cart.
- As a user, I want to manage my cart (add/remove/update quantity) easily.
- As a user, I want to register/login so my shipping details are saved.
- As a logged-in user, I want my shipping details to be pre-filled during checkout.
- As a user, I want to place an order that sends a summary to the shop owner via WhatsApp.

## Technical Requirements

### Backend (Node.js + Express + MongoDB)
- **Models**:
  - `User`: email (unique), password (hashed), name, phone, address, cart (array of objects).
  - `Product`: name, price (fixed at 450), description, imageURL.
- **Routes**:
  - `auth`: `POST /register`, `POST /login`, `GET /me`, `PUT /me`.
  - `cart`: `POST /add`, `PUT /update`, `DELETE /remove`, `GET /`.
  - `products`: `GET /` (fetch all).
- **Middleware**: JWT authentication to protect profile and cart routes.
- **Seed Script**: To populate initial product data.

### Frontend (React + Vite + Tailwind CSS)
- **Context**: `AuthContext` for user state and token management.
- **Components**:
  - `Navbar`: Navigation with auth and cart links.
  - `Home`: Product grid display.
  - `CartPage`: Detailed cart view with quantity adjustment and "Buy" button.
  - `CheckoutModal`: Confirmation of delivery details before WhatsApp redirection.
  - `Auth`: Login and Register forms.
  - `Profile`: View and edit user details.
- **Styling**: Minimalist luxury aesthetic using Tailwind and Framer Motion.
- **WhatsApp Integration**: Redirect to `https://wa.me/6363943487?text={message}` with order details.

## Constraints
- No wishlist feature.
- No direct "Order via WhatsApp" button on product cards.
- Fixed price of ₹450 for all items.
- Only cart-based checkout.
