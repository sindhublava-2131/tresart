import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import CheckoutModal from './CheckoutModal';

const CartDrawer = ({ isOpen, onClose, onOpenAuth }) => {
  const { cart, cartTotal, updateQuantity, removeFromCart } = useCart();
  const { user } = useAuth();
  const [showCheckout, setShowCheckout] = useState(false);

  const handleCheckout = () => {
    if (!user) {
      onClose();
      onOpenAuth();
    } else {
      setShowCheckout(true);
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const drawerVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1, 
      transition: { type: 'spring', damping: 25, stiffness: 200 }
    },
    exit: { x: '100%', opacity: 0 }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={onClose}
            />
            <motion.div
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-[var(--color-bg-primary)] border-l border-[var(--color-border)] shadow-2xl flex flex-col"
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="flex items-center justify-between p-6 border-b border-[var(--color-border)]">
                <h2 className="text-xl font-serif flex items-center gap-2">
                  <ShoppingBag size={20} />
                  Your Cart
                </h2>
                <button 
                  onClick={onClose}
                  className="p-2 text-[var(--color-text-primary)]/50 hover:text-[var(--color-text-primary)] transition-colors rounded-full hover:bg-[var(--color-border)]"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {cart.length > 0 ? (
                  <div className="space-y-8">
                    {cart.map((item) => (
                      <div key={item._id} className={`flex gap-5 ${!item.productId ? 'opacity-50' : ''}`}>
                        <div className="w-24 h-28 bg-[var(--color-border)] rounded-sm overflow-hidden flex-shrink-0 relative">
                          {item.productId?.imageURL ? (
                            <img 
                              src={item.productId.imageURL} 
                              alt={item.productId.name} 
                              className="w-full h-full object-cover" 
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-[var(--color-border)] text-[var(--color-text-primary)]/20">
                              <ShoppingBag size={24} />
                            </div>
                          )}
                          {!item.productId && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                              <span className="text-[8px] uppercase tracking-widest text-white font-bold bg-red-500 px-2 py-1">Out of Stock</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 flex flex-col">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium text-sm leading-tight">
                              {item.productId?.name || 'Product No Longer Available'}
                            </h3>
                            <button 
                              onClick={() => removeFromCart(item.productId?._id || item._id)}
                              className="text-[var(--color-text-primary)]/30 hover:text-[var(--color-accent)] transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <p className="text-[var(--color-text-primary)]/40 text-[10px] uppercase tracking-widest mt-1">
                            {item.productId ? 'Hand-painted' : 'Legacy Item'}
                          </p>
                          
                          <div className="mt-auto flex justify-between items-center">
                            {item.productId ? (
                              <div className="flex items-center border border-[var(--color-border)] rounded-sm">
                                <button 
                                  onClick={() => updateQuantity(item.productId?._id, item.quantity - 1)}
                                  className="p-1.5 hover:bg-[var(--color-border)] transition-colors"
                                >
                                  <Minus size={12} />
                                </button>
                                <span className="px-3 text-xs">{item.quantity}</span>
                                <button 
                                  onClick={() => updateQuantity(item.productId?._id, item.quantity + 1)}
                                  className="p-1.5 hover:bg-[var(--color-border)] transition-colors"
                                >
                                  <Plus size={12} />
                                </button>
                              </div>
                            ) : (
                              <div className="text-[10px] text-red-500 uppercase tracking-widest font-bold">
                                Please remove to proceed
                              </div>
                            )}
                            <p className="font-serif">
                              {item.productId 
                                ? `₹${(item.productId.price * item.quantity).toLocaleString()}`
                                : '₹450'
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-[var(--color-text-primary)]/50">
                    <ShoppingBag size={48} className="mb-4 opacity-10" />
                    <p className="uppercase tracking-[0.4em] text-[10px]">Your cart is empty</p>
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-[var(--color-border)] bg-[var(--color-bg-primary)]">
                  <div className="flex justify-between mb-6">
                    <span className="uppercase tracking-[0.3em] text-[var(--color-text-primary)]/50 text-xs">Subtotal</span>
                    <span className="font-serif text-2xl">₹{cartTotal.toLocaleString()}</span>
                  </div>
                  <button 
                    onClick={handleCheckout}
                    className="w-full py-5 bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] tracking-[0.3em] uppercase text-xs font-bold hover:bg-[var(--color-accent)] transition-all duration-300 rounded-sm shadow-xl"
                  >
                    Proceed to Checkout
                  </button>
                  {!user && (
                    <p className="text-[10px] uppercase tracking-widest text-center mt-4 text-[var(--color-text-primary)]/40">
                      Login required to finalize order
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <CheckoutModal 
        isOpen={showCheckout} 
        onClose={() => {
          setShowCheckout(false);
          onClose();
        }} 
      />
    </>
  );
};

export default CartDrawer;
