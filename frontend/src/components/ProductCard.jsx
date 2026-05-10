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
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 70, damping: 15, delay: index * 0.1 }}
        className="group cursor-pointer flex flex-col p-4 bg-white border-[var(--border-width)] border-[var(--color-border)] hover:shadow-[var(--neo-shadow-hover)] transition-shadow duration-300"
        onClick={() => setShowDetails(true)}
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-bg-primary)] border-[var(--border-width)] border-[var(--color-border)]">
          <motion.img 
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            src={product.imageURL} 
            alt={product.name}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
          />
          
          {/* Actions overlay */}
          <div className="absolute inset-x-0 bottom-0 p-4 flex justify-center items-center">
            <button 
              onClick={handleAdd}
              className={`flex items-center gap-2 px-6 py-3 text-xs uppercase tracking-[0.2em] font-bold border-[var(--border-width)] border-[var(--color-border)] shadow-[4px_4px_0px_#000000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-100 ${
                added 
                  ? 'bg-[var(--color-accent)] text-white' 
                  : 'bg-[var(--color-secondary)] text-black hover:bg-[var(--color-accent)] hover:text-white'
              }`}
            >
              {added ? <Check size={16} /> : <Plus size={16} />}
              {added ? 'Added' : 'Add to Cart'}
            </button>
          </div>
        </div>
        
        <div className="mt-6 flex justify-between items-start">
          <div className="max-w-[70%]">
            <h3 className="text-xl font-black tracking-tight text-[var(--color-text-primary)] leading-tight uppercase">{product.name}</h3>
            <p className="text-sm text-[var(--color-text-primary)]/60 mt-1 font-bold">{product.description}</p>
          </div>
          <span className="text-2xl font-black text-[var(--color-text-primary)] bg-[var(--color-secondary)] px-2 border-[var(--border-width)] border-[var(--color-border)]">₹{product.price}</span>
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
