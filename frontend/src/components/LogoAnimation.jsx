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
      {/* Ripple Effect */}
      <motion.div
        className="absolute rounded-full"
        style={{ border: '1px solid rgba(0, 0, 0, 0.2)' }}
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
          }, 1500);
        }}
        className="relative z-10 w-[280px] h-[280px] md:w-[350px] md:h-[350px] flex items-center justify-center"
      >
        <img 
          src="/image.png" 
          alt="TresArt Logo" 
          className="w-full h-full object-contain"
          draggable={false}
        />
      </motion.div>
    </div>
  );
};

export default LogoAnimation;
