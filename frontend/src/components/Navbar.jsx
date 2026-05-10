import React from 'react';
import { motion } from 'framer-motion';
import { User, ShoppingBag, Sun, Moon } from 'lucide-react';
import Logo from './Logo';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = ({ onOpenCart, onOpenAuth, onGoHome }) => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const { cartCount } = useCart();

  return (
    <nav className="fixed top-0 left-0 w-full z-30 px-8 py-6 flex justify-between items-center bg-transparent backdrop-blur-sm border-b border-[var(--color-border)] transition-colors duration-500">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 70, damping: 15 }}
      >
        <Logo onClick={onGoHome} />
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 70, damping: 15, delay: 0.2 }}
        className="hidden md:flex gap-8 text-[10px] uppercase tracking-[0.4em] text-[var(--color-text-primary)]/40"
      >
        <a href="#" className="hover:text-[var(--color-text-primary)] transition-colors duration-500">Home</a>
        <a href="#" className="hover:text-[var(--color-text-primary)] transition-colors duration-500">Collection</a>
        <a href="#" className="hover:text-[var(--color-text-primary)] transition-colors duration-500">Studio</a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 70, damping: 15, delay: 0.4 }}
        className="flex gap-6 items-center text-[var(--color-text-primary)]/60"
      >
        <button onClick={toggleTheme} className="hover:text-[var(--color-text-primary)] transition-colors">
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        
        <button onClick={onOpenAuth} className="hover:text-[var(--color-text-primary)] transition-colors flex items-center gap-2 relative group">
          <div className="flex flex-col items-end">
            <User size={18} />
            {user && (
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute -bottom-4 right-0 text-[8px] uppercase tracking-widest text-[var(--color-accent)] whitespace-nowrap"
              >
                {user.name.split(' ')[0]}
              </motion.span>
            )}
          </div>
        </button>

        <button onClick={onOpenCart} className="hover:text-[var(--color-text-primary)] transition-colors relative">
          <ShoppingBag size={18} />
          {cartCount > 0 && (
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -bottom-2 -right-2 text-[0.6rem] font-bold bg-[var(--color-accent)] text-white w-4 h-4 rounded-full flex items-center justify-center shadow-lg"
            >
              {cartCount}
            </motion.span>
          )}
        </button>
      </motion.div>
    </nav>
  );
};

export default Navbar;
