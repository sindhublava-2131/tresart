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
        className="group cursor-pointer flex flex-col"
        onClick={() => setShowDetails(true)}
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-border)] rounded-sm">
          <motion.img 
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            src={product.imageURL} 
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-700"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
          
          {/* Actions overlay */}
          <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex justify-center items-center bg-gradient-to-t from-black/80 to-transparent">
            <button 
              onClick={handleAdd}
              className={`flex items-center gap-2 px-6 py-3 text-xs uppercase tracking-[0.2em] font-medium rounded-sm transition-all duration-300 ${
                added 
                  ? 'bg-[var(--color-accent)] text-white' 
                  : 'bg-white text-black hover:bg-[var(--color-accent)] hover:text-white'
              }`}
            >
              {added ? <Check size={16} /> : <Plus size={16} />}
              {added ? 'Added' : 'Add to Cart'}
            </button>
          </div>
        </div>
        
        <div className="mt-6 flex justify-between items-start">
          <div className="max-w-[70%]">
            <h3 className="text-lg font-medium tracking-tight text-[var(--color-text-primary)] leading-tight">{product.name}</h3>
            <p className="text-sm text-[var(--color-text-primary)]/40 mt-1">{product.description}</p>
          </div>
          <span className="text-xl font-serif text-[var(--color-text-primary)]">₹{product.price}</span>
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
