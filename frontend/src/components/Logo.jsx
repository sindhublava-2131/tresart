import React from 'react';
import { motion } from 'framer-motion';

const Logo = ({ onClick }) => {
  return (
    <motion.div 
      onClick={onClick}
      className="cursor-pointer group select-none"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Logo container without background */}
      <div className="flex items-center gap-3 transition-transform duration-300">
        
        {/* Logo Icon - Made bigger, hidden in dark mode */}
        <div className="w-20 h-20 flex items-center justify-center overflow-hidden dark:hidden">
          <img 
            src="/image.png" 
            alt="TresArt Icon" 
            className="w-full h-full object-contain filter drop-shadow-md dark:invert"
            draggable={false}
          />
        </div>

        {/* Text Section - Bigger text, tres in black, art in logo purple */}
        <div className="flex items-center">
          <span className="text-[var(--color-text-primary)] font-bold text-3xl font-serif tracking-wide">
            tres
          </span>
          <span className="text-[var(--color-accent)] font-bold text-3xl font-serif tracking-wide">
            art
          </span>
        </div>

      </div>
    </motion.div>
  );
};

export default Logo;
