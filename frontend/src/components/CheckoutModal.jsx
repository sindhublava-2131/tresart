import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const CheckoutModal = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const { cart, cartTotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        address: user.address || ''
      });
    }
  }, [user, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Format WhatsApp message
    const orderItems = cart
      .filter(item => item.productId)
      .map(item => 
        `- ${item.productId.name} (x${item.quantity}) - ₹${(item.productId.price * item.quantity).toLocaleString()}`
      ).join('\n');

    const message = `*New Order from TresArt*%0A%0A` +
      `*Order Details:*%0A${encodeURIComponent(orderItems)}%0A%0A` +
      `*Total Amount:* ₹${cartTotal.toLocaleString()}%0A%0A` +
      `*Delivery Information:*%0A` +
      `- Name: ${formData.name}%0A` +
      `- Phone: ${formData.phone}%0A` +
      `- Address: ${formData.address}%0A%0A` +
      `Please confirm my order. Thank you! ✨`;

    const whatsappUrl = `https://wa.me/6363943487?text=${message}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Clear cart and close modals
    clearCart();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-sm shadow-2xl p-8 overflow-hidden"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-[var(--color-text-primary)]/40 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <div className="mb-8">
              <h2 className="text-3xl font-serif tracking-tight">Delivery Details</h2>
              <p className="text-[var(--color-text-primary)]/40 mt-2 text-sm uppercase tracking-widest">Complete your order via WhatsApp</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.2em] text-[var(--color-text-primary)]/60">Full Name</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-[var(--color-bg-primary)] border-b border-[var(--color-border)] py-3 focus:border-[var(--color-accent)] transition-colors outline-none text-lg"
                  placeholder="Your Name"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.2em] text-[var(--color-text-primary)]/60">Phone Number</label>
                <input
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-[var(--color-bg-primary)] border-b border-[var(--color-border)] py-3 focus:border-[var(--color-accent)] transition-colors outline-none text-lg"
                  placeholder="+91"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.2em] text-[var(--color-text-primary)]/60">Delivery Address</label>
                <textarea
                  required
                  rows={3}
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="w-full bg-[var(--color-bg-primary)] border-b border-[var(--color-border)] py-3 focus:border-[var(--color-accent)] transition-colors outline-none text-lg resize-none"
                  placeholder="House No, Street, Landmark, City, Pincode"
                />
              </div>

              <div className="pt-6">
                <div className="flex justify-between items-end mb-6">
                  <span className="text-[var(--color-text-primary)]/40 uppercase tracking-widest text-xs">Total Amount</span>
                  <span className="text-3xl font-serif">₹{cartTotal.toLocaleString()}</span>
                </div>
                
                <button
                  type="submit"
                  className="w-full py-5 bg-[var(--color-accent)] text-white font-medium uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-3 hover:bg-red-600 transition-colors group shadow-lg"
                >
                  <MessageCircle size={18} className="group-hover:scale-110 transition-transform" />
                  Send Order via WhatsApp
                </button>
                <p className="text-[var(--color-text-primary)]/30 text-[10px] uppercase tracking-widest text-center mt-4">
                  Secure checkout • Redirects to official WhatsApp
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CheckoutModal;
