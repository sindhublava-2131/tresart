import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Palette } from 'lucide-react';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section id="About" className="py-32 relative overflow-hidden bg-[var(--color-bg-primary)]">
      {/* Aesthetic Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-100/10 dark:bg-red-900/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-100/10 dark:bg-purple-900/5 rounded-full blur-[100px] -z-10" />

      <div className="max-w-5xl mx-auto px-8">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start"
        >
          {/* Title Section */}
          <div className="md:col-span-4 sticky top-32">
            <motion.p variants={itemVariants} className="text-[10px] uppercase tracking-[0.5em] text-[var(--color-accent)] font-bold mb-4">
              Our Story
            </motion.p>
            <motion.h2 variants={itemVariants} className="text-5xl md:text-6xl font-serif leading-tight">
              Art Beyond <br /> <span className="italic">The Canvas</span>
            </motion.h2>
          </div>

          {/* Content Section */}
          <div className="md:col-span-8 space-y-12 text-[var(--color-text-primary)]/80 leading-relaxed text-lg font-light">
            <motion.div variants={itemVariants} className="space-y-6">
              <p>
                <span className="text-[var(--color-text-primary)] font-medium">TresArt</span> is a handmade art brand built from creativity, passion, and the love for personalized art. What started as a simple idea of turning everyday accessories into meaningful artistic pieces slowly became a space where emotions, memories, aesthetics, and creativity come together.
              </p>
              <p>
                At TresArt, we specialize in handcrafted tote bags, pouches, keychains, and customized gift sets designed with artistic detail and personal touch. Every product is carefully hand-painted and thoughtfully created to make each piece feel unique and special.
              </p>
            </motion.div>



            <motion.div variants={itemVariants} className="space-y-6">
              <p>
                Our collections are inspired by different styles and emotions. Whether it’s a cute pouch, a custom tote bag, or a heartfelt gift set for someone special, every creation is designed to tell a story.
              </p>
              <p>
                We believe handmade art feels more personal than mass-produced products. That’s why every order at TresArt is crafted with care, creativity, and attention to detail. Customers can customize their own products by sharing their favorite themes, characters, colors, quotes, memories, or inspirations.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-12 border-t border-[var(--color-border)]/10">
              <p className="italic text-xl font-serif text-[var(--color-text-primary)] mb-12">
                "TresArt is more than just a brand — it’s a creative space where art becomes personal, emotional, and expressive. Our goal is to make products that not only look aesthetic but also create a connection with the person using them."
              </p>
              
              <div className="flex flex-col md:flex-row gap-12 items-center justify-between py-8 px-12 bg-[var(--color-border)]/5 rounded-2xl border border-[var(--color-border)]/10">
                <div className="text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2 text-[var(--color-accent)] mb-2">
                    <Sparkles size={14} />
                    <p className="text-[10px] uppercase tracking-[0.3em] font-bold">Designed by imagination</p>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-2 text-[var(--color-accent)] mb-2">
                    <Palette size={14} />
                    <p className="text-[10px] uppercase tracking-[0.3em] font-bold">Painted by hand</p>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-2 text-[var(--color-accent)]">
                    <Heart size={14} />
                    <p className="text-[10px] uppercase tracking-[0.3em] font-bold">Made especially for you</p>
                  </div>
                </div>
                <p className="text-2xl font-serif italic text-[var(--color-text-primary)]">Feel the artistry.</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
