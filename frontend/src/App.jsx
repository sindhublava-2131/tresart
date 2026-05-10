import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import useSound from 'use-sound';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import EntranceScreen from './components/EntranceScreen';
import AuthModal from './components/AuthModal';
import CartDrawer from './components/CartDrawer';
import UserProfile from './components/UserProfile';
import { useAuth } from './context/AuthContext';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEntrance, setShowEntrance] = useState(true);
  
  const [showAuth, setShowAuth] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const { user } = useAuth();
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleEnter = () => {
    setShowEntrance(false);
  };

  const handleOpenAuth = () => {
    if (user) {
      setShowProfile(true);
    } else {
      setShowAuth(true);
    }
  };

  const handleGoHome = () => {
    setShowProfile(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 15,
      },
    },
  };

  return (
    <div className="w-full min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] font-sans transition-colors duration-500 selection:bg-[var(--color-accent)] selection:text-white">
      <AnimatePresence>
        {showEntrance && <EntranceScreen onEnter={handleEnter} />}
      </AnimatePresence>

      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
      <CartDrawer 
        isOpen={showCart} 
        onClose={() => setShowCart(false)} 
        onOpenAuth={() => setShowAuth(true)}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={showEntrance ? "hidden" : "visible"}
      >
        <motion.div variants={childVariants}>
          <Navbar 
            onOpenCart={() => setShowCart(true)} 
            onOpenAuth={handleOpenAuth} 
            onGoHome={handleGoHome}
          />
        </motion.div>
        
        <AnimatePresence mode="wait">
          {showProfile && user ? (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <UserProfile />
            </motion.div>
          ) : (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.main variants={childVariants} className="max-w-7xl mx-auto px-8 py-32 pb-48">
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-40 gap-6">
                    <div className="w-12 h-12 border border-[var(--color-text-primary)]/10 border-t-[var(--color-accent)] rounded-full animate-spin" />
                    <p className="text-[10px] uppercase tracking-[0.5em] text-[var(--color-text-primary)]/20">Curating Gallery</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-32">
                    {products.map((product, index) => (
                      <ProductCard key={product._id || index} product={product} index={index} />
                    ))}
                  </div>
                )}
              </motion.main>
            </motion.div>
          )}
        </AnimatePresence>

        <footer className="py-32 border-t border-[var(--color-border)] bg-[var(--color-border)]/5 transition-colors duration-500">
          <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-[10px] uppercase tracking-[0.5em] text-[var(--color-text-primary)]/20">
              TresArt © 2025 • All Rights Reserved
            </div>
            <div className="flex gap-8 text-[10px] uppercase tracking-[0.3em] text-[var(--color-text-primary)]/40">
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Shipping</a>
            </div>
          </div>
        </footer>
      </motion.div>
    </div>
  );
}

export default App;
