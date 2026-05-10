# Plan: Phase 4 - Core Frontend (Cart & WhatsApp)

Implement the user interface and checkout flow with WhatsApp redirection.

## Objectives
- [x] **AuthContext**: Update to handle JWT and user state persistence.
- [x] **Home Page**: Update to fetch products from backend and enable "Add to Cart".
- [x] **CartPage**: Create a dedicated page/drawer to manage items and quantities.
- [x] **Checkout Flow**: 
    - [x] Login/Register modal for unauthenticated users.
    - [x] CheckoutModal to confirm delivery details.
    - [x] Redirect to `wa.me` with a formatted order summary.
    - [x] Clear cart after successful redirection.
- [x] **Profile**: Enable users to update their delivery details.

## Proposed Changes

### [MOD] frontend/src/context/AuthContext.jsx
- Implement `login`, `register`, and `logout` functions.
- Store JWT in `localStorage`.
- Fetch `me` on initial load.

### [MOD] frontend/src/components/Home.jsx (or App.jsx)
- Fetch products from `/api/products`.
- Update `ProductCard` to handle "Add to Cart" with loading states.

### [NEW] frontend/src/components/CartPage.jsx
- List items with images, names, and quantities.
- Total price calculation.
- "Checkout" button logic (checks auth).

### [NEW] frontend/src/components/CheckoutModal.jsx
- Form to confirm/edit Name, Phone, and Delivery Address.
- "Confirm & Send to WhatsApp" button.
- Logic to generate `wa.me/6363943487?text=...` link.

### [MOD] frontend/src/components/Navbar.jsx
- Add links to Home, Cart, and Profile/Auth.
- Show cart item count badge.

### [MOD] frontend/src/components/UserProfile.jsx
- Ensure it allows updating address and phone.

## Verification Plan

### Manual Verification
1. **Authentication**: Sign up, log out, log back in. Verify name appears in Navbar.
2. **Shopping**: Add 2 items to cart. Increase quantity of one. Remove the other.
3. **Checkout**: Click "Buy". Verify address is pre-filled from profile.
4. **WhatsApp**: Click "Confirm". Verify it opens WhatsApp with a message like:
   `Order from TresArt:%0A-%20Item%20A%20x2%0A-%20Total:%20₹900%0AName:%20John%0AAddress:%20123%20Street`
5. **Post-Checkout**: Verify cart is empty after returning to the site.
