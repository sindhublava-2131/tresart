import React from 'react';
import { motion } from 'framer-motion';
import useSound from 'use-sound';
import LogoAnimation from './LogoAnimation';
import Beams from './Beams';

/**
 * EntranceScreen — Full-screen splash overlay with light beams and entry interaction.
 */
const EntranceScreen = ({ onEnter }) => {
  const [playChime] = useSound('/sounds/chime.mp3', { volume: 0.5 });

  // Start chime on mount (best effort - might be blocked by browser)
  React.useEffect(() => {
    playChime();
  }, [playChime]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] bg-[var(--color-bg-primary)] flex flex-col items-center justify-center overflow-hidden font-sans"
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Large soft radial gradients mimicking watercolor */}
        <div className="absolute top-1/4 -left-1/4 w-full h-[150%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-300/30 via-transparent to-transparent rounded-full blur-3xl transform -rotate-45"></div>
        <div className="absolute bottom-0 -right-1/4 w-full h-[120%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-400/20 via-transparent to-transparent rounded-full blur-3xl transform rotate-12"></div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 w-full max-w-lg flex flex-col items-center justify-center">
        {/* Subtle background ring for logo */}
        <div className="absolute top-0 w-[400px] h-[400px] border border-purple-300/50 rounded-full opacity-60"></div>
        <div className="absolute top-4 w-[370px] h-[370px] border-[8px] border-purple-200/40 rounded-full blur-sm"></div>

        {/* The Logo */}
        <div className="mb-6 z-10 w-[240px] h-[240px] md:w-[280px] md:h-[280px]">
          <LogoAnimation onComplete={onEnter} />
        </div>

        {/* Text Details below logo */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="flex flex-col items-center mt-[-30px] md:mt-[-50px]"
        >
          {/* Brand Name */}
          <div className="text-5xl md:text-6xl tracking-widest font-serif font-bold flex">
            <span className="text-[var(--color-text-primary)]">tres</span>
            <span className="text-[var(--color-accent)]">art</span>
          </div>

          {/* Subtitle */}
          <div className="flex items-center gap-2 mt-4">
            <span className="text-[var(--color-accent)] text-xl">♡</span>
            <span className="font-serif italic text-2xl md:text-3xl text-[var(--color-text-primary)] tracking-wide">Feel the artistry</span>
            <span className="text-[var(--color-accent)] text-xl">♡</span>
          </div>

          {/* Divider */}
          <div className="w-48 h-[1px] bg-purple-900/20 my-6"></div>

          {/* Footer Text */}
          <div className="text-[10px] md:text-xs text-center tracking-[0.3em] font-medium text-[#5E4B8B] leading-relaxed uppercase">
            Crafted with love
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EntranceScreen;
