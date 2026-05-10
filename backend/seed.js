import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const products = [
  {
    name: "Signature Bloom Tote",
    price: 450,
    description: "Hand-painted floral masterpiece on organic cotton.",
    imageURL: "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Abstract Azure Bag",
    price: 450,
    description: "Modern abstract strokes in deep ocean blues.",
    imageURL: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Sunset Whisper Tote",
    price: 450,
    description: "A warm, minimalist gradient representing an eternal sunset.",
    imageURL: "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Ethereal Canvas Bag",
    price: 450,
    description: "Light, airy strokes on premium unbleached canvas.",
    imageURL: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Midnight Muse Tote",
    price: 450,
    description: "Elegant gold accents on deep charcoal fabric.",
    imageURL: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=400"
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');
    
    await Product.deleteMany({});
    console.log('Cleared existing products.');
    
    await Product.insertMany(products);
    console.log('Database seeded with ₹450 products!');
    
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
