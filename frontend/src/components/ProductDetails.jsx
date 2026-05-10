import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Truck, RotateCcw, Star } from 'lucide-react';

const ProductDetails = ({ product, isOpen, onClose }) => {
  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 40 }}
            className="relative w-full max-w-4xl bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-sm shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 z-10 p-2 bg-black/20 text-white hover:bg-[var(--color-accent)] transition-colors rounded-full"
            >
              <X size={20} />
            </button>

            {/* Image Section */}
            <div className="w-full md:w-1/2 bg-[var(--color-border)]">
              <img 
                src={product.imageURL} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info Section */}
            <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto">
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2 py-1 bg-[var(--color-accent)] text-white text-[8px] uppercase tracking-widest font-bold rounded-sm">Featured</span>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star size={10} fill="currentColor" />
                    <Star size={10} fill="currentColor" />
                    <Star size={10} fill="currentColor" />
                    <Star size={10} fill="currentColor" />
                    <Star size={10} fill="currentColor" />
                    <span className="text-[10px] text-[var(--color-text-primary)]/40 ml-1">(4.9)</span>
                  </div>
                </div>
                <h2 className="text-4xl font-serif tracking-tight mb-2">{product.name}</h2>
                <p className="text-2xl font-serif text-[var(--color-accent)]">₹{product.price}</p>
              </div>

              <div className="space-y-8">
                {/* Description */}
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-text-primary)]/40 mb-3 font-bold">About the piece</h4>
                  <p className="text-sm leading-relaxed text-[var(--color-text-primary)]/80">
                    {product.description}
                  </p>
                </div>

                {/* Highlights Table */}
                <div className="grid grid-cols-2 gap-y-4 gap-x-8 py-6 border-y border-[var(--color-border)]">
                  <div>
                    <h5 className="text-[9px] uppercase tracking-widest text-[var(--color-text-primary)]/40 mb-1">Occasion</h5>
                    <p className="text-xs font-medium">Casual / Artistic</p>
                  </div>
                  <div>
                    <h5 className="text-[9px] uppercase tracking-widest text-[var(--color-text-primary)]/40 mb-1">Product Net Weight</h5>
                    <p className="text-xs font-medium">100g</p>
                  </div>
                  <div>
                    <h5 className="text-[9px] uppercase tracking-widest text-[var(--color-text-primary)]/40 mb-1">Product Breadth</h5>
                    <p className="text-xs font-medium">10 cm</p>
                  </div>
                  <div>
                    <h5 className="text-[9px] uppercase tracking-widest text-[var(--color-text-primary)]/40 mb-1">Product Height</h5>
                    <p className="text-xs font-medium">10 cm</p>
                  </div>
                </div>

                {/* Seller Info */}
                <div className="flex items-center justify-between p-4 bg-[var(--color-border)]/20 rounded-sm border border-[var(--color-border)]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-black flex items-center justify-center text-white font-serif text-lg rounded-sm">T</div>
                    <div>
                      <p className="text-[9px] uppercase tracking-widest text-[var(--color-text-primary)]/40">Sold by</p>
                      <p className="text-xs font-bold tracking-widest text-[var(--color-accent)]">TRESART OFFICIAL</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 bg-green-500/10 text-green-500 rounded-full">
                    <Star size={10} fill="currentColor" />
                    <span className="text-[10px] font-bold">4.9</span>
                  </div>
                </div>

                {/* Guarantees */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center text-center">
                    <ShieldCheck size={20} className="mb-2 text-[var(--color-accent)]" />
                    <p className="text-[8px] uppercase tracking-widest font-medium">Authentic Art</p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <Truck size={20} className="mb-2 text-[var(--color-accent)]" />
                    <p className="text-[8px] uppercase tracking-widest font-medium">Secure Delivery</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProductDetails;
