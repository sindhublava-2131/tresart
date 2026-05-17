import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, ShoppingBag, Sun, Moon, Menu, X, ChevronDown } from 'lucide-react';
import Logo from './Logo';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = ({ onOpenCart, onOpenAuth, onGoHome, onOpenAbout }) => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const { cartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isCollectionsOpen, setIsCollectionsOpen] = React.useState(false);
  const [isMobileCollectionsOpen, setIsMobileCollectionsOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState('home');

  React.useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const handleIntersect = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const sections = ['home', 'collections', 'custom-orders', 'about', 'contact', 'Tote-Bags', 'Pouches', 'Gifting'];
    
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (id) => {
    onGoHome(id);
    setIsMenuOpen(false);
  };

  const handleAboutClick = () => {
    onOpenAbout();
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-30 px-8 py-6 flex justify-between items-center bg-[var(--color-bg-primary)] border-b border-[var(--color-border)] transition-colors duration-500">
      <div className="flex items-center gap-12">
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
          className="hidden md:flex gap-8 text-[10px] uppercase tracking-[0.4em] text-[var(--color-text-primary)] items-center"
        >
          <button 
            onClick={() => handleNavClick('home')} 
            className={`transition-all duration-300 cursor-pointer uppercase ${activeSection === 'home' ? 'text-[var(--color-accent)] font-bold' : 'hover:text-[var(--color-text-primary)]'}`}
          >
            Home
          </button>
          
          {/* Dropdown for Collections */}
          <div 
            className="relative"
            onMouseEnter={() => setIsCollectionsOpen(true)}
            onMouseLeave={() => setIsCollectionsOpen(false)}
          >
            <button 
              onClick={() => handleNavClick('collections')}
              className={`transition-all duration-300 cursor-pointer uppercase flex items-center gap-1 ${['collections', 'Tote-Bags', 'Pouches', 'Gifting'].includes(activeSection) ? 'text-[var(--color-accent)] font-bold' : 'hover:text-[var(--color-text-primary)]'}`}
            >
              Collections <ChevronDown size={10} className={`transition-transform duration-300 ${isCollectionsOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isCollectionsOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 mt-2 py-4 w-48 bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-xl shadow-2xl flex flex-col gap-3 z-50"
                >
                  <button 
                    onClick={() => handleNavClick('Tote-Bags')}
                    className="text-left px-6 py-1 hover:text-[var(--color-accent)] transition-colors cursor-pointer text-[9px] tracking-[0.3em] uppercase"
                  >
                    Tote Bags
                  </button>
                  <button 
                    onClick={() => handleNavClick('Pouches')}
                    className="text-left px-6 py-1 hover:text-[var(--color-accent)] transition-colors cursor-pointer text-[9px] tracking-[0.3em] uppercase"
                  >
                    Pouches
                  </button>
                  <button 
                    onClick={() => handleNavClick('Gifting')}
                    className="text-left px-6 py-1 hover:text-[var(--color-accent)] transition-colors cursor-pointer text-[9px] tracking-[0.3em] uppercase"
                  >
                    Gift Sets
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button 
            onClick={() => handleNavClick('custom-orders')} 
            className={`transition-all duration-300 cursor-pointer uppercase ${activeSection === 'custom-orders' ? 'text-[var(--color-accent)] font-bold' : 'hover:text-[var(--color-text-primary)]'}`}
          >
            Custom Orders
          </button>
          
          <button 
            onClick={handleAboutClick} 
            className={`transition-all duration-300 cursor-pointer uppercase ${activeSection === 'about' ? 'text-[var(--color-accent)] font-bold' : 'hover:text-[var(--color-text-primary)]'}`}
          >
            About
          </button>

          <button 
            onClick={() => handleNavClick('contact')} 
            className={`transition-all duration-300 cursor-pointer uppercase ${activeSection === 'contact' ? 'text-[var(--color-accent)] font-bold' : 'hover:text-[var(--color-text-primary)]'}`}
          >
            Contact
          </button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 70, damping: 15, delay: 0.4 }}
        className="flex gap-4 md:gap-6 items-center text-[var(--color-text-primary)]"
      >
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden hover:text-[var(--color-text-primary)] transition-colors">
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
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

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-[var(--color-bg-primary)] border-b border-[var(--color-border)] md:hidden z-40 overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col p-8 gap-6 text-[10px] uppercase tracking-[0.3em]">
              <button onClick={() => handleNavClick('home')} className={`text-left py-2 border-b border-[var(--color-border)]/5 ${activeSection === 'home' ? 'text-[var(--color-accent)] font-bold' : ''}`}>Home</button>
              
              <div className="flex flex-col border-b border-[var(--color-border)]/5 pb-2">
                <button 
                  onClick={() => setIsMobileCollectionsOpen(!isMobileCollectionsOpen)} 
                  className={`text-left py-2 flex justify-between items-center ${['collections', 'Tote-Bags', 'Pouches', 'Gifting'].includes(activeSection) ? 'text-[var(--color-accent)] font-bold' : ''}`}
                >
                  Collections <ChevronDown size={12} className={`transition-transform duration-300 ${isMobileCollectionsOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isMobileCollectionsOpen && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="flex flex-col pl-4 gap-3 overflow-hidden pt-2"
                    >
                      <button onClick={() => handleNavClick('Tote-Bags')} className="text-left py-1 text-[8px] hover:text-[var(--color-accent)]">Tote Bags</button>
                      <button onClick={() => handleNavClick('Pouches')} className="text-left py-1 text-[8px] hover:text-[var(--color-accent)]">Pouches</button>
                      <button onClick={() => handleNavClick('Gifting')} className="text-left py-1 text-[8px] hover:text-[var(--color-accent)]">Gift Sets</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button onClick={() => handleNavClick('custom-orders')} className={`text-left py-2 border-b border-[var(--color-border)]/5 ${activeSection === 'custom-orders' ? 'text-[var(--color-accent)] font-bold' : ''}`}>Custom Orders</button>
              <button onClick={handleAboutClick} className={`text-left py-2 border-b border-[var(--color-border)]/5 ${activeSection === 'about' ? 'text-[var(--color-accent)] font-bold' : ''}`}>About</button>
              <button onClick={() => handleNavClick('contact')} className={`text-left py-2 ${activeSection === 'contact' ? 'text-[var(--color-accent)] font-bold' : ''}`}>Contact</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
