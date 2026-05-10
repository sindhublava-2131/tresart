import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, register } = useAuth();
  
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '',
    phone: '',
    address: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    let result;
    if (isLogin) {
      result = await login(formData.email, formData.password);
    } else {
      result = await register(formData);
    }

    setLoading(false);
    if (result.success) {
      onClose();
    } else {
      setError(result.error);
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.95 },
    visible: { 
      y: 0, 
      opacity: 1, 
      scale: 1,
      transition: { type: 'spring', damping: 25, stiffness: 300 }
    },
    exit: { y: 20, opacity: 0, scale: 0.95 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className="relative w-full max-w-md p-8 bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-sm shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-[var(--color-text-primary)]/40 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <h2 className="text-3xl font-serif mb-2">
              {isLogin ? 'Welcome Back' : 'Join TresArt'}
            </h2>
            <p className="text-[var(--color-text-primary)]/40 text-[10px] uppercase tracking-[0.3em] mb-8">
              {isLogin ? 'Sign in to your account' : 'Create your collector profile'}
            </p>

            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mb-6 p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-xs text-center uppercase tracking-widest"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-[var(--color-text-primary)]/40">Full Name</label>
                  <input 
                    type="text" 
                    required
                    className="w-full bg-transparent border-b border-[var(--color-border)] py-2 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)] transition-colors text-sm"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              )}
              
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-[var(--color-text-primary)]/40">Email</label>
                <input 
                  type="email" 
                  required
                  className="w-full bg-transparent border-b border-[var(--color-border)] py-2 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)] transition-colors text-sm"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              {!isLogin && (
                <>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-[var(--color-text-primary)]/40">Phone Number</label>
                    <input 
                      type="tel" 
                      required
                      className="w-full bg-transparent border-b border-[var(--color-border)] py-2 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)] transition-colors text-sm"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-[var(--color-text-primary)]/40">Delivery Address</label>
                    <input 
                      type="text" 
                      required
                      className="w-full bg-transparent border-b border-[var(--color-border)] py-2 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)] transition-colors text-sm"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                    />
                  </div>
                </>
              )}

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-[var(--color-text-primary)]/40">Password</label>
                <input 
                  type="password" 
                  required
                  className="w-full bg-transparent border-b border-[var(--color-border)] py-2 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)] transition-colors text-sm"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full py-5 mt-8 bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] tracking-[0.4em] uppercase text-xs font-bold hover:bg-[var(--color-accent)] disabled:opacity-50 transition-all duration-300 rounded-sm flex items-center justify-center gap-3"
              >
                {loading && <Loader2 size={16} className="animate-spin" />}
                {isLogin ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            <div className="mt-8 text-center border-t border-[var(--color-border)] pt-6">
              <button 
                type="button"
                onClick={() => { setIsLogin(!isLogin); setError(''); }}
                className="text-[10px] uppercase tracking-widest text-[var(--color-text-primary)]/40 hover:text-[var(--color-accent)] transition-colors"
              >
                {isLogin ? 'New to TresArt? Create an account' : 'Already have an account? Sign in'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
