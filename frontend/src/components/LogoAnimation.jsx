import React from 'react';
import { motion } from 'framer-motion';

/**
 * LogoAnimation — Ultra-clean minimalist splash.
 *
 * - Isolates the hanger-paintbrush icon (no white bg, no text)
 * - Black stage
 * - Rapid scale-pop: 0% → 110% → 100% (elastic ease-out)
 * - One thin white circular ripple on settle
 * - Red paint tip stays vibrant via overlay
 * - Auto-navigates after settle
 */
const LogoAnimation = ({ onComplete }) => {
  return (
    <div className="relative flex items-center justify-center w-full h-full overflow-hidden">
      {/* SVG Filter Definition (Hidden) */}
      <svg width="0" height="0" className="absolute">
        <filter id="remove-white" colorInterpolationFilters="sRGB">
          <feColorMatrix 
            type="matrix" 
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    -1.5 -1.5 -1.5 1 1.2" 
          />
        </filter>
      </svg>

      {/* Ripple Effect */}
      <motion.div
        className="absolute rounded-full"
        style={{ border: '1px solid rgba(255, 255, 255, 0.2)' }}
        initial={{ width: 100, height: 100, opacity: 0 }}
        animate={{ width: [100, 1000], height: [100, 1000], opacity: [0, 0.2, 0] }}
        transition={{ delay: 0.5, duration: 2, ease: "easeOut" }}
      />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        onAnimationComplete={() => {
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 2500);
        }}
        className="relative z-10 w-[280px] h-[280px] md:w-[350px] md:h-[350px] flex items-center justify-center"
      >
        <img 
          src="/logo.jpg" 
          alt="TresArt Logo" 
          className="w-full h-auto select-none"
          style={{ 
            filter: 'url(#remove-white)',
            clipPath: 'inset(0% 0% 25% 0%)' // Crop text at bottom
          }}
          draggable={false}
        />
      </motion.div>
    </div>
  );
};

export default LogoAnimation;
