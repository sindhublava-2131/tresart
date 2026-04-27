"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background selection:bg-artistic-accent selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 flex items-center justify-between px-8 py-6 bg-background/80 backdrop-blur-md">
        <div className="text-2xl font-light tracking-widest uppercase">
          TresArt
        </div>
        <div className="flex items-center gap-8 font-light text-sm tracking-wide">
          <Link href="/collections" className="hover:text-artistic-accent transition-colors">Collections</Link>
          <Link href="/about" className="hover:text-artistic-accent transition-colors">About</Link>
          <Link href="/auth/login">
            <Button variant="outline" className="rounded-none px-8 border-foreground/20 hover:bg-foreground hover:text-background transition-all">
              Login
            </Button>
          </Link>
        </div>
      </nav>

      <main className="flex-grow flex flex-col items-center justify-center relative overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-artistic-soft/10 rounded-full blur-3xl -z-10" />

        <div className="max-w-4xl w-full px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="text-artistic-accent uppercase tracking-[0.4em] text-xs font-medium mb-6 block">
              Handmade & Painted
            </span>
            <h1 className="text-6xl md:text-8xl font-light tracking-tight mb-8 leading-tight">
              Feel the <span className="italic font-serif">Artistry</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto mb-12">
              Discover a curated collection of bespoke painted tote bags. 
              Each piece is a unique canvas, blending high-end gallery aesthetics 
              with everyday utility.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button className="rounded-none h-14 px-10 text-lg bg-foreground text-background hover:bg-foreground/90 transition-all">
                Shop the Collection
              </Button>
              <Button variant="ghost" className="rounded-none h-14 px-10 text-lg border-b border-transparent hover:border-foreground/20 transition-all">
                Learn our Story
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Floating Interactive Element Teaser */}
        <motion.div 
          className="absolute bottom-20 right-20 hidden lg:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <div className="flex items-center gap-4 text-xs tracking-widest uppercase text-muted-foreground group cursor-pointer">
            <span className="group-hover:text-artistic-accent transition-colors">Interactivity coming soon</span>
            <div className="p-4 rounded-full border border-border group-hover:border-artistic-accent transition-all">
              <Heart className="w-4 h-4 group-hover:fill-artistic-accent group-hover:text-artistic-accent transition-all" />
            </div>
          </div>
        </motion.div>
      </main>

      <footer className="py-12 px-8 flex flex-col md:flex-row items-center justify-between border-t border-border/40 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        <div>© 2026 TresArt Studio</div>
        <div className="flex items-center gap-8 mt-4 md:mt-0">
          <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
          <Link href="/shipping" className="hover:text-foreground transition-colors">Shipping</Link>
        </div>
      </footer>
    </div>
  );
}
