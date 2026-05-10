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
          y="30"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          fontSize="32"
          fontFamily="'Playfair Display', serif"
          letterSpacing="0.2em"
          className="text-[var(--color-text-primary)]"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ 
            duration: 2.5, 
            ease: "easeInOut",
            pathLength: { duration: 2, ease: "easeInOut" },
            opacity: { duration: 1, delay: 0.5 }
          }}
        >
          TRESART
        </motion.text>
        
        <motion.path
          d="M0 38H180"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-[var(--color-text-primary)]"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.2 }}
          transition={{ duration: 1.5, delay: 2 }}
        />
      </svg>
    </motion.div>
  );
};

export default Logo;
