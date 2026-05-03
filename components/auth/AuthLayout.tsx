"use client";

import { motion } from "framer-motion";
import { Palette } from "lucide-react";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-background selection:bg-artistic-accent/30">
      {/* Decorative Side - Gallery Theme */}
      <div className="hidden md:flex w-1/2 relative overflow-hidden bg-primary p-12 flex-col justify-between">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="z-10 flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-full bg-artistic-accent flex items-center justify-center">
            <Palette className="w-6 h-6 text-primary" />
          </div>
          <span className="text-2xl font-bold tracking-tighter text-primary-foreground">TresArt</span>
        </motion.div>

        <div className="z-10 space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-6xl font-bold leading-tight text-primary-foreground"
          >
            Feel the <br />
            <span className="text-artistic-accent italic">Artistry</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-primary-foreground/60 text-lg max-w-md"
          >
            Experience the intersection of high-performance engineering and curated digital art.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="z-10 text-primary-foreground/40 text-sm font-medium tracking-widest uppercase"
        >
          © 2026 TresArt Collective
        </motion.div>
      </div>

      {/* Form Side */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
