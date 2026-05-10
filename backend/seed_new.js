import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const products = [
  {
    name: 'Shinchan Hand-Painted Tote',
    description: 'A playful, hand-painted Shinchan masterpiece on premium canvas. Durable, artistic, and unique.',
    price: 450,
    imageURL: '/images/shinchan.jpg'
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Delete all existing products
    await Product.deleteMany({});
    console.log('🗑️ Deleted existing products');

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
