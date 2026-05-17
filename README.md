<h1 align="center">
  <br/>
  🎨 TresArt
  <br/>
</h1>

<p align="center">
  <b>Handcrafted art, brought online — tote bags, pouches & custom gifts, painted with soul.</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Express-5-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
</p>

<p align="center">
  <a href="https://www.instagram.com/__tresart__" target="_blank">
    <img src="https://img.shields.io/badge/Instagram-@__tresart__-E4405F?style=flat-square&logo=instagram&logoColor=white" />
  </a>
  <a href="https://youtube.com/@sindhublava" target="_blank">
    <img src="https://img.shields.io/badge/YouTube-@sindhublava-FF0000?style=flat-square&logo=youtube&logoColor=white" />
  </a>
</p>

---

## ✨ About TresArt

**TresArt** is a handmade art brand built from creativity, passion, and the love for personalized art. What started as a simple idea — turning everyday accessories into meaningful artistic pieces — slowly became a space where emotions, memories, aesthetics, and creativity come together.

> *"TresArt is more than just a brand — it's a creative space where art becomes personal, emotional, and expressive."*

We specialize in:
- 🖼️ **Hand-painted Tote Bags** — unique canvas art you carry everywhere
- 👜 **Artistic Pouches** — compact but full of character
- 🎁 **Customized Gift Sets** — thoughtful, personal, one-of-a-kind
- 🎨 **Custom Orders** — your theme, your memory, your art

---

## 🛒 Features

| Feature | Description |
|---|---|
| **Product Gallery** | Browse collections by category — Tote Bags, Pouches, Gifting |
| **Product Details** | Detailed view with descriptions, pricing, and add-to-cart |
| **Shopping Cart** | Persistent cart drawer with quantity controls |
| **User Authentication** | Sign up / Login with JWT-based secure sessions |
| **User Profile** | Manage name, phone, and full delivery address (India-specific) |
| **Custom Orders** | Submit custom artwork requests via the Customizer |
| **Dark / Light Mode** | Theme toggle with smooth transition |
| **Animated Entrance** | Splash/entrance screen on first visit |
| **Framer Motion UI** | Smooth page and element animations throughout |
| **Responsive Design** | Fully mobile-friendly layout |
| **Social Links** | Direct links to Instagram & YouTube |

---

## 🏗️ Tech Stack

### Frontend
| Tech | Role |
|---|---|
| **React 18** | UI framework |
| **Vite** | Build tool & dev server |
| **Tailwind CSS** | Utility-first styling |
| **Framer Motion** | Animations & page transitions |
| **Axios** | HTTP client for API calls |
| **Lucide React** | Icon library |
| **use-sound** | UI sound effects |

### Backend
| Tech | Role |
|---|---|
| **Node.js + Express 5** | REST API server |
| **MongoDB Atlas** | Cloud database |
| **Mongoose** | ODM for MongoDB |
| **bcryptjs** | Password hashing |
| **JSON Web Tokens** | Auth session management |
| **dotenv** | Environment config |
| **nodemon** | Dev hot-reload |

---

## 📁 Project Structure

```
tresart/
├── backend/
│   ├── middleware/
│   │   └── auth.js            # JWT verification middleware
│   ├── models/
│   │   ├── User.js            # User schema (cart, address, auth)
│   │   └── Product.js         # Product schema
│   ├── routes/
│   │   ├── auth.js            # Register / Login / Profile
│   │   ├── cart.js            # Cart management
│   │   └── products.js        # Product listing
│   ├── seed.js                # Initial seed script
│   ├── seed_new.js            # Updated product seeder
│   └── server.js              # Express app entry point
│
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── Navbar.jsx         # Top navigation bar
│       │   ├── EntranceScreen.jsx # Animated splash screen
│       │   ├── ProductCard.jsx    # Product grid card
│       │   ├── ProductDetails.jsx # Product detail modal
│       │   ├── CartDrawer.jsx     # Slide-in cart panel
│       │   ├── AuthModal.jsx      # Login / Register modal
│       │   ├── UserProfile.jsx    # User profile page
│       │   ├── Customizer.jsx     # Custom order request form
│       │   ├── About.jsx          # Brand story section
│       │   ├── Beams.jsx          # Decorative background animation
│       │   ├── Logo.jsx           # Brand logo component
│       │   └── SocialIcons.jsx    # Instagram & YouTube icons
│       ├── context/
│       │   ├── AuthContext.jsx    # Global auth state
│       │   └── ThemeContext.jsx   # Dark/light mode state
│       ├── utils/
│       │   └── indiaData.js       # Indian states & cities data
│       └── App.jsx                # Root application component
│
├── frontend/public/images/    # Product artwork images
├── other/logo/                # Brand logo assets
├── start.py                   # 🚀 One-command dev launcher
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ — [Download](https://nodejs.org)
- **Python** 3.8+ — [Download](https://python.org) *(for the launcher)*
- **MongoDB Atlas** account — [Sign up free](https://www.mongodb.com/cloud/atlas)

### 1. Clone the Repository

```bash
git clone https://github.com/sindhublava-2131/tresart.git
cd tresart
```

### 2. Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 3. Configure Environment Variables

Create a `.env` file inside the `backend/` directory:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/tresart
JWT_SECRET=your_super_secret_jwt_key
PORT=5000
```

> ⚠️ **Never commit your `.env` file.** It's already in `.gitignore`.

### 4. Seed the Database *(Optional)*

```bash
cd backend
node seed_new.js
```

### 5. Start the Dev Servers

#### ✅ Option A — One Command (Recommended)

```bash
python start.py
```

This launches both backend and frontend simultaneously with colored, prefixed logs. Press `Ctrl+C` to stop everything.

#### Option B — Manual (Two Terminals)

```bash
# Terminal 1 — Backend
cd backend
npm run dev

# Terminal 2 — Frontend
cd frontend
npm run dev
```

### 6. Open the App

| Service | URL |
|---|---|
| **Frontend** | http://localhost:5173 |
| **Backend API** | http://localhost:5000 |
| **API Health** | http://localhost:5000/ |

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Create new account |
| `POST` | `/api/auth/login` | Login & receive JWT |
| `GET` | `/api/auth/profile` | Get logged-in user profile |
| `PUT` | `/api/auth/profile` | Update profile details |

### Products
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/products` | List all products |
| `GET` | `/api/products/:id` | Get single product |

### Cart
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/cart` | Get user's cart |
| `POST` | `/api/cart` | Add item to cart |
| `PUT` | `/api/cart/:productId` | Update item quantity |
| `DELETE` | `/api/cart/:productId` | Remove item from cart |

> 🔒 Cart and Profile endpoints require a valid JWT in the `Authorization: Bearer <token>` header.

---

## 🎨 Product Categories

| Category | Items | Price Range |
|---|---|---|
| **Tote Bags** | Anime, Evil Eye, Indian Heritage, Flower Art, Girl Power | ₹500 – ₹550 |
| **Pouches** | Cartoon series, Beauty Art | ₹120 – ₹150 |
| **Gifting** | Gift Pouches, Premium Totes, Deluxe Combos | ₹150 – ₹2,500 |

---

## 🛠️ Development Notes

- The frontend proxies `/api/*` requests to the backend via Vite's dev proxy config.
- If the backend is unreachable, the app gracefully falls back to **mock product data** so the UI remains functional.
- All images are served from `frontend/public/images/`.
- The app features an **animated entrance splash screen** on first load.
- Theme preference is stored locally and persists across sessions.

---

## 📸 Connect & Follow

Made with 🎨 and ❤️ by **Sindhublava**

- 📸 Instagram: [@__tresart__](https://www.instagram.com/__tresart__?utm_source=qr&igsh=MXh4NzBmcmd6ZnlxMQ==)
- 🎥 YouTube: [@sindhublava](https://youtube.com/@sindhublava?si=xC0wRUj0L9qzZ--9)

---

## 📄 License

© 2025 TresArt. All Rights Reserved.
