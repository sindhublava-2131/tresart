import React from 'react';
import { motion } from 'framer-motion';

const Logo = ({ onClick }) => {
  return (
    <motion.div 
      onClick={onClick}
      className="cursor-pointer group"
      whileHover={{ scale: 1.02 }}
    >
      <svg 
        width="180" 
        height="40" 
        viewBox="0 0 180 40" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.text
          x="0"
          y="32"
          fill="currentColor"
          fontSize="36"
          fontWeight="900"
          fontFamily="system-ui, sans-serif"
          letterSpacing="-0.05em"
          className="text-[var(--color-text-primary)] uppercase italic"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          TresArt
        </motion.text>
        
        <motion.path
          d="M0 38H160"
          stroke="var(--color-accent)"
          strokeWidth="4"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </svg>
    </motion.div>
  );
};

export default Logo;
