import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative h-[80vh] flex flex-col justify-center items-center text-center px-4 overflow-hidden bg-[var(--color-secondary)] border-b-[var(--border-width)] border-[var(--color-border)]">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
        className="relative mb-8 p-4 bg-white border-[var(--border-width)] border-[var(--color-border)] shadow-[var(--neo-shadow)]"
      >
        <img 
          src="/logo.jpg" 
          alt="TresArt Logo" 
          className="w-48 h-48 md:w-64 md:h-64 object-contain grayscale hover:grayscale-0 transition-all duration-500"
        />
      </motion.div>

      <div className="overflow-hidden mb-4">
        <motion.h1 
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 70, damping: 15, delay: 0.4 }}
          className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic"
        >
          TresArt
        </motion.h1>
      </div>
      
      <div className="overflow-hidden">
        <motion.p 
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 70, damping: 15, delay: 0.8 }}
          className="px-4 py-2 bg-[var(--color-accent)] text-white text-lg md:text-xl font-bold uppercase border-[var(--border-width)] border-[var(--color-border)] shadow-[var(--neo-shadow)]"
        >
          Feel the Artistry
        </motion.p>
      </div>
    </section>
  );
};

export default Hero;
