import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

import ProductDetails from './ProductDetails';

const ProductCard = ({ product, index }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleAdd = async (e) => {
    e.stopPropagation();
    const result = await addToCart(product._id);
    if (result.success) {
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } else {
      alert(result.error);
    }
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98], delay: index * 0.1 }}
        className="group cursor-pointer flex flex-col w-full"
        onClick={() => setShowDetails(true)}
      >
        {/* Image Container with Glassmorphic Hover */}
        <div className="relative aspect-[3/4] overflow-hidden bg-[var(--color-bg-primary)] border border-[var(--color-border)] transition-all duration-700 ease-out">
          <motion.img 
            whileHover={{ scale: 1.07 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            src={product.imageURL} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-1000 will-change-transform"
          />
          
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          {/* Elegant Add to Cart Action */}
          <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-center translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out z-10">
            <button 
              onClick={handleAdd}
              className={`flex items-center justify-center gap-3 w-full py-3.5 px-6 text-[11px] uppercase tracking-[0.25em] font-medium backdrop-blur-md transition-all duration-300 border ${
                added 
                  ? 'bg-white/20 border-white/40 text-white shadow-[0_0_20px_rgba(255,255,255,0.2)]' 
                  : 'bg-black/40 border-white/20 text-white hover:bg-black/60 hover:border-white/50'
              }`}
            >
              {added ? <Check size={14} /> : <Plus size={14} className="group-hover:rotate-90 transition-transform duration-500" />}
              <span>{added ? 'Added' : 'Add to Cart'}</span>
            </button>
          </div>
        </div>
        
        {/* Typography and Meta Info */}
        <div className="mt-5 flex justify-between items-start gap-4 px-1">
          <div className="flex-1">
            <h3 className="text-lg font-serif text-[var(--color-text-primary)] leading-tight group-hover:text-[var(--color-accent)] transition-colors duration-300">
              {product.name}
            </h3>
            <p className="text-[11px] uppercase tracking-widest text-[var(--color-text-primary)]/50 mt-2 line-clamp-1">
              {product.description || "Limited Edition"}
            </p>
          </div>
          <span className="text-base font-serif text-[var(--color-text-primary)] whitespace-nowrap">
            ₹{product.price}
          </span>
        </div>
      </motion.div>

      <ProductDetails 
        product={product} 
        isOpen={showDetails} 
        onClose={() => setShowDetails(false)} 
      />
    </>
  );
};

export default ProductCard;
