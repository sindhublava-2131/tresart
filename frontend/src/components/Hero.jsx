import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden">
      <div className="overflow-hidden mb-4">
        <motion.h1 
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 70, damping: 15, delay: 0.2 }}
          className="text-7xl md:text-9xl font-bold tracking-tighter font-serif"
        >
          TresArt
        </motion.h1>
      </div>
      
      <div className="overflow-hidden">
        <motion.p 
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 70, damping: 15, delay: 0.6 }}
          className="text-lg md:text-xl tracking-[0.6em] uppercase text-white/30"
        >
          Feel the Artistry
        </motion.p>
      </div>
      
      <motion.div 
        initial={{ height: 0 }}
        animate={{ height: "100px" }}
        transition={{ duration: 1.5, delay: 1.5, ease: "easeInOut" }}
        className="absolute bottom-10 w-[1px] bg-gradient-to-b from-white/30 to-transparent"
      />
    </section>
  );
};

export default Hero;
