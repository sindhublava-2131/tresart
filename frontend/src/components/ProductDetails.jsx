import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Truck, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductDetails = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = React.useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!product) return null;

  const handleAdd = async () => {
    const result = await addToCart(product._id);
    if (result.success) {
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } else {
      alert(result.error);
    }
  };

  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
    exit: { opacity: 0, transition: { duration: 0.4, delay: 0.2 } }
  };

  const containerVariants = {
    hidden: { x: '100%' },
    visible: { 
      x: 0, 
      transition: { 
        type: 'spring', 
        damping: 30, 
        stiffness: 250, 
        mass: 0.8,
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    },
    exit: { 
      x: '100%', 
      transition: { type: 'spring', damping: 30, stiffness: 250 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex">
          {/* Backdrop */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
          />
          
          {/* Slide-in Panel */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative ml-auto w-full md:w-[85vw] lg:w-[75vw] h-full bg-[var(--color-bg-primary)] shadow-2xl flex flex-col md:flex-row overflow-hidden border-l border-[var(--color-border)]"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 z-50 p-3 bg-[var(--color-bg-primary)]/80 backdrop-blur-md text-[var(--color-text-primary)] hover:bg-[var(--color-accent)] hover:text-white transition-colors duration-300 rounded-full border border-[var(--color-border)] shadow-sm group"
            >
              <X size={20} className="group-hover:rotate-90 transition-transform duration-500" />
            </button>

            {/* Left: Image Hero */}
            <div className="w-full md:w-1/2 h-[50vh] md:h-full relative bg-[var(--color-bg-primary)]">
              <motion.img 
                initial={{ scale: 1.05, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                src={product.imageURL} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)]/40 via-transparent to-transparent md:bg-gradient-to-r" />
            </div>

            {/* Right: Content & Details */}
            <div className="w-full md:w-1/2 h-[50vh] md:h-full overflow-y-auto bg-[var(--color-bg-primary)]">
              <div className="p-8 md:p-14 flex flex-col min-h-full">
                
                <motion.div variants={itemVariants} className="mb-6">
                  <h2 className="text-3xl font-serif text-[var(--color-text-primary)] leading-tight mb-2">{product.name}</h2>
                  <p className="text-xl font-serif text-[var(--color-text-primary)]/70">₹{product.price}</p>
                </motion.div>

                <div className="space-y-6 flex-grow">
                  {/* Detailed Specifications */}
                  <motion.div variants={itemVariants} className="mt-4 pb-6">
                    {/* Product Highlights */}
                    <div className="mb-6">
                      <h3 className="text-sm font-serif font-bold text-[var(--color-text-primary)] mb-4 border-b border-[var(--color-border)]/20 pb-2">
                        Product Highlights
                      </h3>
                      <div className="grid grid-cols-2 gap-y-4 gap-x-4">
                        <div>
                          <h5 className="text-[10px] uppercase tracking-wider text-[var(--color-text-primary)]/50 mb-1">Occasion</h5>
                          <p className="text-xs font-medium tracking-wide text-[var(--color-text-primary)]">Casual</p>
                        </div>
                        <div>
                          <h5 className="text-[10px] uppercase tracking-wider text-[var(--color-text-primary)]/50 mb-1">Product Net Weight</h5>
                          <p className="text-xs font-medium tracking-wide text-[var(--color-text-primary)]">100</p>
                        </div>
                        {product.category !== 'Pouches' && (
                          <>
                            <div>
                              <h5 className="text-[10px] uppercase tracking-wider text-[var(--color-text-primary)]/50 mb-1">Product Breadth</h5>
                              <p className="text-xs font-medium tracking-wide text-[var(--color-text-primary)]">10</p>
                            </div>
                            <div>
                              <h5 className="text-[10px] uppercase tracking-wider text-[var(--color-text-primary)]/50 mb-1">Product Height</h5>
                              <p className="text-xs font-medium tracking-wide text-[var(--color-text-primary)]">10</p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Additional Details */}
                    <div>
                      <h3 className="text-sm font-serif font-bold text-[var(--color-text-primary)] mb-4 border-b border-[var(--color-border)]/20 pb-2">
                        Additional Details
                      </h3>
                      <div className="grid grid-cols-2 gap-y-4 gap-x-4">
                        <div>
                          <h5 className="text-[10px] uppercase tracking-wider text-[var(--color-text-primary)]/50 mb-1">Generic Name</h5>
                          <p className="text-xs font-medium tracking-wide text-[var(--color-text-primary)]">{product.category === 'Pouches' ? 'Pouch' : 'Tote'}</p>
                        </div>
                        <div>
                          <h5 className="text-[10px] uppercase tracking-wider text-[var(--color-text-primary)]/50 mb-1">Type</h5>
                          <p className="text-xs font-medium tracking-wide text-[var(--color-text-primary)]">{product.category === 'Pouches' ? 'Pouch' : 'Tote & Hobo'}</p>
                        </div>
                        <div>
                          <h5 className="text-[10px] uppercase tracking-wider text-[var(--color-text-primary)]/50 mb-1">Size</h5>
                          <p className="text-xs font-medium tracking-wide text-[var(--color-text-primary)]">{product.category === 'Pouches' ? 'M' : 'Free Size'}</p>
                        </div>
                        <div>
                          <h5 className="text-[10px] uppercase tracking-wider text-[var(--color-text-primary)]/50 mb-1">Material</h5>
                          <p className="text-xs font-medium tracking-wide text-[var(--color-text-primary)]">Canvas</p>
                        </div>
                        <div>
                          <h5 className="text-[10px] uppercase tracking-wider text-[var(--color-text-primary)]/50 mb-1">Pattern</h5>
                          <p className="text-xs font-medium tracking-wide text-[var(--color-text-primary)]">{product.category === 'Pouches' ? 'Solid' : 'Textured'}</p>
                        </div>
                        <div>
                          <h5 className="text-[10px] uppercase tracking-wider text-[var(--color-text-primary)]/50 mb-1">Product Length</h5>
                          <p className="text-xs font-medium tracking-wide text-[var(--color-text-primary)]">{product.category === 'Pouches' ? '12' : '10'}</p>
                        </div>
                        {product.category === 'Pouches' && (
                          <div>
                            <h5 className="text-[10px] uppercase tracking-wider text-[var(--color-text-primary)]/50 mb-1">Product Width</h5>
                            <p className="text-xs font-medium tracking-wide text-[var(--color-text-primary)]">21</p>
                          </div>
                        )}
                        <div>
                          <h5 className="text-[10px] uppercase tracking-wider text-[var(--color-text-primary)]/50 mb-1">Unit</h5>
                          <p className="text-xs font-medium tracking-wide text-[var(--color-text-primary)]">Cm</p>
                        </div>
                        <div>
                          <h5 className="text-[10px] uppercase tracking-wider text-[var(--color-text-primary)]/50 mb-1">Net Quantity</h5>
                          <p className="text-xs font-medium tracking-wide text-[var(--color-text-primary)]">{product.category === 'Pouches' ? '1' : '1'}</p>
                        </div>
                        <div>
                          <h5 className="text-[10px] uppercase tracking-wider text-[var(--color-text-primary)]/50 mb-1">Ideal For</h5>
                          <p className="text-xs font-medium tracking-wide text-[var(--color-text-primary)]">Women</p>
                        </div>
                        <div>
                          <h5 className="text-[10px] uppercase tracking-wider text-[var(--color-text-primary)]/50 mb-1">Country of Origin</h5>
                          <p className="text-xs font-medium tracking-wide text-[var(--color-text-primary)]">India</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Sticky Action Footer */}
                <motion.div 
                  variants={itemVariants}
                  className="mt-6 pt-6 border-t border-[var(--color-border)]/20 sticky bottom-0 bg-[var(--color-bg-primary)] pb-4 md:pb-0"
                >
                  <button 
                    onClick={handleAdd}
                    disabled={added}
                    className={`w-full py-4 px-6 text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 flex items-center justify-center gap-3 ${
                      added 
                        ? 'bg-green-600 text-white' 
                        : 'bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] hover:bg-[var(--color-accent)] hover:text-white'
                    }`}
                  >
                    {added ? 'Added to Cart' : 'Add to Cart'}
                  </button>
                </motion.div>

              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProductDetails;
