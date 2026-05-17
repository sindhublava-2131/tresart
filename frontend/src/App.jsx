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
import Customizer from './components/Customizer';
import About from './components/About';
import { useAuth } from './context/AuthContext';
import { Instagram, Youtube } from './components/SocialIcons';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEntrance, setShowEntrance] = useState(true);
  
  const [showAuth, setShowAuth] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [pendingScrollId, setPendingScrollId] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    if (!showProfile && pendingScrollId) {
      const timer = setTimeout(() => {
        if (pendingScrollId === 'top') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const id = pendingScrollId.replace('#', '');
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
        setPendingScrollId(null);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [showProfile, pendingScrollId]);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products, using mock data:", error);
        setProducts([
          {
            _id: "mock1",
            name: "Cartoon Classic Pouch",
            price: 120,
            description: "Hand-painted classic cartoon pouch.",
            imageURL: "/images/cartoon1.png",
            category: "Pouches"
          },
          {
            _id: "mock2",
            name: "Cartoon Fun Pouch",
            price: 120,
            description: "Fun and vibrant cartoon art pouch.",
            imageURL: "/images/cartoon2.png",
            category: "Pouches"
          },
          {
            _id: "mock3",
            name: "Cartoon Adventure Pouch",
            price: 120,
            description: "Adventure themed cartoon pouch.",
            imageURL: "/images/cartoon3.png",
            category: "Pouches"
          },
          {
            _id: "mock4",
            name: "Beauty Art Pouch",
            price: 120,
            description: "Minimalist beauty line art pouch.",
            imageURL: "/images/beauty.png",
            category: "Pouches"
          },
          {
            _id: "mock5",
            name: "Girl Power Tote",
            price: 500,
            description: "Minimalist girl portrait tote.",
            imageURL: "/images/girl.png",
            category: "Tote Bags"
          },
          {
            _id: "mock6",
            name: "Anime Friends Tote",
            price: 500,
            description: "Anime style friends art tote.",
            imageURL: "/images/frnds1.jpg",
            category: "Tote Bags"
          },
          {
            _id: "mock7",
            name: "Combo Pack Tote",
            price: 500,
            description: "Tote and pouch combo.",
            imageURL: "/images/combo.jpg",
            category: "Tote Bags"
          },
          {
            _id: "mock8",
            name: "Evil Eye Tote",
            price: 500,
            description: "Protective evil eye design tote.",
            imageURL: "/images/evil eye.png",
            category: "Tote Bags"
          },
          {
            _id: "mock9",
            name: "Indian Heritage Tote",
            price: 550,
            description: "Hand-painted black tote featuring traditional Indian anklet and ghungroo art.",
            imageURL: "/images/black anklet tote.png",
            category: "Tote Bags"
          },
          {
            _id: "mock10",
            name: "Flower Art Tote",
            price: 500,
            description: "Beautiful flower art tote.",
            imageURL: "/images/flower.png",
            category: "Tote Bags"
          },
          {
            _id: "mock11",
            name: "Gift Special Pouch",
            price: 150,
            description: "Perfect for gifting pouch.",
            imageURL: "/images/gifting.png",
            category: "Gifting"
          },
          {
            _id: "mock12",
            name: "Premium Gift Tote",
            price: 500,
            description: "Premium gifting tote option.",
            imageURL: "/images/gifting1.png",
            category: "Gifting"
          },
          {
            _id: "mock13",
            name: "Combo Deluxe",
            price: 2500,
            description: "Deluxe combo set.",
            imageURL: "/images/combo1.jpg",
            category: "Gifting"
          }
        ]);
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

  const handleGoHome = (targetId = null) => {
    setShowProfile(false);
    // Ensure we only use string IDs, otherwise default to 'home'
    const id = (targetId && typeof targetId === 'string') ? targetId : 'home';
    setPendingScrollId(id);
  };

  const handleOpenAbout = () => {
    setShowProfile(false);
    setPendingScrollId('about');
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
    <div className="w-full max-w-full overflow-x-hidden min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] font-serif transition-colors duration-500 selection:bg-[var(--color-accent)] selection:text-white">
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
            onOpenAbout={handleOpenAbout}
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
              className="pt-24 md:pt-28"
            >
              <UserProfile />
            </motion.div>
          ) : (
            <motion.div
              key="home-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pt-24 md:pt-28"
            >
              {/* Hero Banner — Natural Aspect Ratio & Edge-to-Edge Full Width */}
              <motion.div id="home" variants={childVariants} className="w-full relative overflow-hidden font-sans">
                <img 
                  src="/banner.png" 
                  alt="TresArt Banner" 
                  className="w-full h-auto block object-contain"
                  onError={(e) => {
                    e.target.src = '/image.png';
                  }}
                />
                <div className="absolute inset-0 bg-black/35 flex flex-col justify-center items-center text-white text-center p-4">
                  <p className="text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.3em] sm:tracking-[0.5em] text-white/90 font-medium">Hand-painted canvas pouches & tote bags</p>
                </div>
              </motion.div>

              <motion.main variants={childVariants} className="max-w-7xl mx-auto px-6 md:px-8 py-6 md:py-12 pb-24 md:pb-48">
                {/* Customization Section */}
                <div id="custom-orders">
                  <Customizer />
                </div>
                
                <div id="collections" className="scroll-mt-32">
                  {loading ? (
                    <div className="flex flex-col items-center justify-center py-40 gap-6">
                      <div className="w-12 h-12 border border-[var(--color-text-primary)]/10 border-t-[var(--color-accent)] rounded-full animate-spin" />
                      <p className="text-[10px] uppercase tracking-[0.5em] text-[var(--color-text-primary)]/20">Curating Gallery</p>
                    </div>
                  ) : (
                  <div className="space-y-24">
                    {Array.from(new Set(products.map(p => p.category)))
                      .sort((a, b) => {
                        if (a === 'Tote Bags') return -1;
                        if (b === 'Tote Bags') return 1;
                        return 0;
                      })
                      .map(category => (
                      <div key={category} id={category.replace(/\s+/g, '-')} className="border-t border-[var(--color-border)]/20 pt-12">
                        <h2 className="text-xs font-serif font-bold uppercase tracking-[0.4em] mb-12 text-[var(--color-text-primary)]/70">{category}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-20">
                          {products.filter(p => p.category === category)
                            .sort((a, b) => {
                              if (category === 'Tote Bags') {
                                const aPriority = (a.name?.includes("Indian Heritage") || a.name?.includes("Evil Eye") || a.name?.includes("Flower Art")) ? 1 : 0;
                                const bPriority = (b.name?.includes("Indian Heritage") || b.name?.includes("Evil Eye") || b.name?.includes("Flower Art")) ? 1 : 0;
                                return bPriority - aPriority;
                              }
                              return 0;
                            })
                            .map((product, index) => (
                            <ProductCard key={product._id || index} product={product} index={index} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                </div> {/* Closes #collections */}

                {/* About section at the bottom as requested */}
                <div id="about" className="scroll-mt-32 border-t border-[var(--color-border)]/10 pt-24">
                  <About />
                </div>
              </motion.main>
            </motion.div>
          )}
        </AnimatePresence>

        <footer id="contact" className="py-32 border-t border-[var(--color-border)] bg-[var(--color-border)]/5 transition-colors duration-500 scroll-mt-32">
          <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-[10px] uppercase tracking-[0.5em] text-[var(--color-text-primary)]/60">
              TresArt © 2025 • All Rights Reserved
            </div>
            <div className="flex gap-8 text-[10px] uppercase tracking-[0.3em] text-[var(--color-text-primary)]/70 items-center">
              <a href="https://www.instagram.com/__tresart__?utm_source=qr&igsh=MXh4NzBmcmd6ZnlxMQ==" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent)] transition-colors flex items-center gap-2">
                <Instagram size={14} /> Instagram
              </a>
              <a href="https://youtube.com/@sindhublava?si=xC0wRUj0L9qzZ--9" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent)] transition-colors flex items-center gap-2">
                <Youtube size={14} /> YouTube
              </a>
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
