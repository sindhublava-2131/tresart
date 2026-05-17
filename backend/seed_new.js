import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import User from './models/User.js';

dotenv.config();

const products = [
  {
    name: "Cartoon Classic Pouch",
    price: 120,
    description: "Hand-painted classic cartoon pouch.",
    imageURL: "/images/cartoon1.png",
    category: "Pouches"
  },
  {
    name: "Cartoon Fun Pouch",
    price: 120,
    description: "Fun and vibrant cartoon art pouch.",
    imageURL: "/images/cartoon2.png",
    category: "Pouches"
  },
  {
    name: "Cartoon Adventure Pouch",
    price: 120,
    description: "Adventure themed cartoon pouch.",
    imageURL: "/images/cartoon3.png",
    category: "Pouches"
  },
  {
    name: "Beauty Art Pouch",
    price: 120,
    description: "Minimalist beauty line art pouch.",
    imageURL: "/images/beauty.png",
    category: "Pouches"
  },
  {
    name: "Girl Power Tote",
    price: 500,
    description: "Minimalist girl portrait tote.",
    imageURL: "/images/girl.png",
    category: "Tote Bags"
  },
  {
    name: "Anime Friends Tote",
    price: 500,
    description: "Anime style friends art tote.",
    imageURL: "/images/frnds1.jpg",
    category: "Tote Bags"
  },
  {
    name: "Combo Pack Tote",
    price: 500,
    description: "Tote and pouch combo.",
    imageURL: "/images/combo.jpg",
    category: "Tote Bags"
  },
  {
    name: "Evil Eye Tote",
    price: 500,
    description: "Protective evil eye design tote.",
    imageURL: "/images/evil eye.png",
    category: "Tote Bags"
  },
  {
    name: "Indian Heritage Tote",
    price: 550,
    description: "Hand-painted black tote featuring traditional Indian anklet and ghungroo art.",
    imageURL: "/images/black anklet tote.png",
    category: "Tote Bags"
  },
  {
    name: "Flower Art Tote",
    price: 500,
    description: "Beautiful flower art tote.",
    imageURL: "/images/flower.png",
    category: "Tote Bags"
  },
  {
    name: "Gift Special Pouch",
    price: 150,
    description: "Perfect for gifting pouch.",
    imageURL: "/images/gifting.png",
    category: "Gifting"
  },
  {
    name: "Premium Gift Tote",
    price: 500,
    description: "Premium gifting tote option.",
    imageURL: "/images/gifting1.png",
    category: "Gifting"
  },
  {
    name: "Combo Deluxe",
    price: 2500,
    description: "Deluxe combo set.",
    imageURL: "/images/combo1.jpg",
    category: "Gifting"
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Delete all existing products
    await Product.deleteMany({});
    console.log('🗑️ Deleted existing products');

    // Clear all users' carts as product IDs have changed
    await User.updateMany({}, { $set: { cart: [] } });
    console.log('🧹 Cleared all users\' carts');

    // Insert new products
    await Product.insertMany(products);
    console.log('✨ Seeded new products');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
