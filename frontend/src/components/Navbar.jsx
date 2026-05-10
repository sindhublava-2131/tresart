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
    <nav className="fixed top-0 left-0 w-full z-30 px-8 py-4 flex justify-between items-center bg-white border-b-[var(--border-width)] border-[var(--color-border)] shadow-[0_4px_0px_#000000] transition-colors duration-500">
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
        className="hidden md:flex gap-8 text-xs uppercase tracking-widest text-[var(--color-text-primary)] font-black"
      >
        <a href="#" className="hover:bg-[var(--color-secondary)] px-2 border-b-[var(--border-width)] border-transparent hover:border-[var(--color-border)] transition-all">Home</a>
        <a href="#" className="hover:bg-[var(--color-secondary)] px-2 border-b-[var(--border-width)] border-transparent hover:border-[var(--color-border)] transition-all">Collection</a>
        <a href="#" className="hover:bg-[var(--color-secondary)] px-2 border-b-[var(--border-width)] border-transparent hover:border-[var(--color-border)] transition-all">Studio</a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 70, damping: 15, delay: 0.4 }}
        className="flex gap-6 items-center text-[var(--color-text-primary)]/60"
      >
        <button onClick={toggleTheme} className="p-2 border-[var(--border-width)] border-[var(--color-border)] shadow-[2px_2px_0px_#000000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all">
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <button onClick={onOpenAuth} className="p-2 border-[var(--border-width)] border-[var(--color-border)] shadow-[2px_2px_0px_#000000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all relative group">
          <User size={20} />
          {user && (
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute -top-6 right-0 bg-black text-white text-[8px] px-1 font-black uppercase"
            >
              {user.name.split(' ')[0]}
            </motion.span>
          )}
        </button>

        <button onClick={onOpenCart} className="p-2 border-[var(--border-width)] border-[var(--color-border)] shadow-[2px_2px_0px_#000000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all relative">
          <ShoppingBag size={20} />
          {cartCount > 0 && (
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 text-[0.7rem] font-black bg-[var(--color-accent)] text-white w-5 h-5 border-2 border-black flex items-center justify-center"
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
