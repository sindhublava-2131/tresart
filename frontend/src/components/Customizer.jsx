import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImagePlus, MessageCircle, Sparkles, Briefcase, Box, Gift, X } from 'lucide-react';

const Customizer = () => {
  const [selectedProduct, setSelectedProduct] = useState(null); // 'tote', 'pouch', 'giftset'
  const [selectedTheme, setSelectedTheme] = useState('');
  const [customText, setCustomText] = useState('');
  const [instructions, setInstructions] = useState('');
  const [giftFor, setGiftFor] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]); // array of { file, previewUrl }
  const [uploadError, setUploadError] = useState('');

  const fileInputRef = useRef(null);

  const themes = ['Floral', 'Anime', 'Minimal', 'Cute', 'Other'];
  const giftItems = ['Tote Bag', 'Pouch', 'Keychain', 'Letter Card', 'Extra Gift'];

  const handleProductSelect = (product) => {
    if (selectedProduct === product) {
      setSelectedProduct(null);
    } else {
      setSelectedProduct(product);
      // Reset states
      setSelectedTheme('');
      setCustomText('');
      setInstructions('');
      setGiftFor('');
      // Revoke and clear file previews
      uploadedFiles.forEach(f => URL.revokeObjectURL(f.previewUrl));
      setUploadedFiles([]);
      setUploadError('');
    }
  };

  const handleFileChange = (e) => {
    setUploadError('');
    const files = Array.from(e.target.files || []);
    const validFiles = [];

    for (const file of files) {
      // Validate file type (image only)
      if (!file.type.startsWith('image/')) {
        setUploadError('Only image files (JPEG, PNG, etc.) are allowed.');
        continue;
      }
      // Validate size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setUploadError('Images must be smaller than 5MB.');
        continue;
      }
      validFiles.push({
        file,
        previewUrl: URL.createObjectURL(file)
      });
    }

    if (validFiles.length > 0) {
      setUploadedFiles(prev => [...prev, ...validFiles]);
    }
  };

  const removeFile = (indexToRemove) => {
    setUploadedFiles(prev => {
      const target = prev[indexToRemove];
      if (target) {
        URL.revokeObjectURL(target.previewUrl);
      }
      return prev.filter((_, idx) => idx !== indexToRemove);
    });
  };

  const toggleGiftItem = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(i => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleWhatsApp = () => {
    let message = `Hello TresArt! I'd like to customize a *${selectedProduct === 'giftset' ? 'Gift Set' : selectedProduct === 'tote' ? 'Tote Bag' : 'Pouch'}*.\n\n`;
    
    if (selectedProduct === 'tote' || selectedProduct === 'pouch') {
      if (selectedTheme) message += `*Theme:* ${selectedTheme}\n`;
      if (customText) message += `*Custom Text:* ${customText}\n`;
      if (uploadedFiles.length > 0) {
        message += `*Reference Images:* ${uploadedFiles.length} selected (I will send them in this chat next)\n`;
      }
    } else if (selectedProduct === 'giftset') {
      message += `*Included Items:* ${giftItems.join(', ')}\n`;
      if (giftFor) message += `*Gift For:* ${giftFor}\n`;
    }
    
    if (instructions) message += `*Special Instructions:* ${instructions}\n`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/916363943487?text=${encodedMessage}`, '_blank');
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div id="Custom-Orders" className="py-12 md:py-24 relative overflow-hidden mt-8 md:mt-16 border-t border-[var(--color-border)]/10">
      {/* Soft Background Decor */}
      <div className="absolute top-0 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-purple-200/20 dark:bg-purple-900/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-amber-100/10 dark:bg-amber-900/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="flex justify-center mb-4">
            <span className="px-3 py-1 bg-[var(--color-border)]/5 border border-[var(--color-border)]/10 rounded-full text-[10px] uppercase tracking-[0.3em] text-[var(--color-text-primary)]/50 flex items-center gap-2">
              <Sparkles size={12} className="text-[var(--color-accent)]" /> Custom Studio
            </span>
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-serif text-[var(--color-text-primary)] mb-6">
            Customize Your Own Story
          </motion.h2>
          <motion.p variants={itemVariants} className="text-[var(--color-text-primary)]/60 max-w-lg mx-auto text-sm leading-relaxed">
            Select a canvas and let us paint your emotions.
          </motion.p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {/* Product Cards */}
          {[
            { id: 'tote', title: 'Tote Bag', icon: <Briefcase className="mb-4" />, desc: 'A spacious canvas for your daily adventures.' },
            { id: 'pouch', title: 'Pouch', icon: <Box className="mb-4" />, desc: 'A compact companion for your essentials.' },
            { id: 'giftset', title: 'Gift Set', icon: <Gift className="mb-4" />, desc: 'Curated magic for someone special.' }
          ].map(prod => (
            <motion.div
              key={prod.id}
              variants={itemVariants}
              onClick={() => handleProductSelect(prod.id)}
              className={`relative overflow-hidden cursor-pointer rounded-2xl p-8 transition-all duration-500 border flex flex-col items-center text-center ${
                selectedProduct === prod.id 
                  ? 'bg-[var(--color-text-primary)] border-[var(--color-text-primary)] text-[var(--color-bg-primary)] shadow-2xl scale-[1.02]' 
                  : 'bg-[var(--color-bg-primary)]/50 border-[var(--color-border)]/20 hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-border)]/5 hover:shadow-lg backdrop-blur-sm'
              }`}
            >
              <div className={`${selectedProduct === prod.id ? 'text-[var(--color-bg-primary)]' : 'text-[var(--color-accent)]'}`}>
                {React.cloneElement(prod.icon, { size: 32 })}
              </div>
              <h3 className="text-xl font-serif font-medium mb-3">{prod.title}</h3>
              <p className={`text-xs leading-relaxed ${selectedProduct === prod.id ? 'opacity-80' : 'text-[var(--color-text-primary)]/60'}`}>
                {prod.desc}
              </p>
              
              {selectedProduct === prod.id && (
                <motion.div layoutId="activeGlow" className="absolute inset-0 rounded-2xl ring-2 ring-[var(--color-accent)]/30 pointer-events-none" />
              )}
            </motion.div>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          {selectedProduct && (
            <motion.div
              key={selectedProduct}
              initial={{ opacity: 0, height: 0, y: 20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="bg-[var(--color-bg-primary)]/40 backdrop-blur-xl border border-[var(--color-border)]/20 rounded-3xl p-8 md:p-12 shadow-[0_20px_40px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.2)]"
            >
              {(selectedProduct === 'tote' || selectedProduct === 'pouch') && (
                <div className="space-y-10">
                  
                  {/* Theme Selection */}
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--color-text-primary)]/70 mb-4 flex items-center gap-2">
                      1. Select an Aesthetic
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {themes.map(theme => (
                        <button
                          key={theme}
                          onClick={() => setSelectedTheme(theme)}
                          className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                            selectedTheme === theme
                              ? 'bg-[var(--color-accent)]/10 border-[var(--color-accent)] text-[var(--color-accent)] shadow-[0_0_15px_rgba(159,139,227,0.2)] scale-105'
                              : 'bg-white/50 dark:bg-black/20 border-[var(--color-border)]/20 text-[var(--color-text-primary)]/70 hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-border)]/10'
                          }`}
                        >
                          {theme}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Image Upload Area */}
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--color-text-primary)]/70 mb-4">
                      2. Inspiration (Optional)
                    </h4>
                    <input
                      type="file"
                      ref={fileInputRef}
                      multiple
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-[var(--color-border)]/20 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]/5 transition-all duration-300 group"
                    >
                      <div className="w-12 h-12 rounded-full bg-[var(--color-border)]/10 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-[var(--color-accent)]/10 transition-all duration-300">
                        <ImagePlus size={20} className="text-[var(--color-text-primary)]/60 group-hover:text-[var(--color-accent)]" />
                      </div>
                      <p className="text-sm font-semibold text-[var(--color-text-primary)]/80 group-hover:text-[var(--color-text-primary)] transition-colors">Click to upload reference images</p>
                      <p className="text-xs text-[var(--color-text-primary)]/40 mt-1">JPEG, PNG up to 5MB</p>
                    </div>

                    {uploadError && (
                      <p className="text-xs font-medium text-red-500 mt-2 text-center animate-pulse">{uploadError}</p>
                    )}

                    {/* Uploaded Images Preview Grid */}
                    <AnimatePresence>
                      {uploadedFiles.length > 0 && (
                        <div className="mt-6 space-y-3">
                          <div className="flex justify-between items-center">
                            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-accent)]">
                              ✓ Selected Reference Images ({uploadedFiles.length})
                            </p>
                            <button
                              onClick={() => {
                                uploadedFiles.forEach(f => URL.revokeObjectURL(f.previewUrl));
                                setUploadedFiles([]);
                              }}
                              className="text-[10px] uppercase font-bold tracking-wider text-red-400 hover:text-red-500 transition-colors"
                            >
                              Clear All
                            </button>
                          </div>
                          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                            {uploadedFiles.map((fileObj, idx) => (
                              <motion.div
                                key={fileObj.previewUrl}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="relative aspect-square rounded-xl overflow-hidden border border-[var(--color-border)]/20 shadow-md group"
                              >
                                <img
                                  src={fileObj.previewUrl}
                                  alt="preview"
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeFile(idx);
                                  }}
                                  className="absolute top-1 right-1 p-1 bg-black/60 hover:bg-black/80 rounded-full text-white/90 hover:text-white transition-colors shadow-sm"
                                >
                                  <X size={12} />
                                </button>
                              </motion.div>
                            ))}
                          </div>
                          <p className="text-[10px] text-[var(--color-text-primary)]/40 italic">
                            These reference files will be specified in your WhatsApp design order!
                          </p>
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )}

              {selectedProduct === 'giftset' && (
                <div className="space-y-10">
                  {/* Gift Items Display */}
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--color-text-primary)]/70 mb-4">
                      1. Included in Your Set
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {giftItems.map(item => (
                        <div
                          key={item}
                          className="px-5 py-2.5 rounded-full text-sm font-medium border border-[var(--color-border)]/20 bg-[var(--color-border)]/5 text-[var(--color-text-primary)]/70"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Gift For Input */}
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--color-text-primary)]/70 mb-4">
                      2. Who is this gift for?
                    </h4>
                    <input 
                      type="text" 
                      placeholder="e.g. For my best friend's birthday, my mother, etc..."
                      value={giftFor}
                      onChange={(e) => setGiftFor(e.target.value)}
                      className="w-full bg-white/50 dark:bg-black/20 border border-[var(--color-border)]/20 rounded-xl px-5 py-4 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-primary)]/40 focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all"
                    />
                  </div>
                </div>
              )}

              {/* Shared Instructions Area */}
              <div className="mt-10 pt-10 border-t border-[var(--color-border)]/10">
                <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--color-text-primary)]/70 mb-4">
                  Special Instructions
                </h4>
                <textarea 
                  rows="4"
                  placeholder="Tell us the vibe you're going for, specific color preferences, or any small details that matter to you..."
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  className="w-full bg-white/50 dark:bg-black/20 border border-[var(--color-border)]/20 rounded-xl px-5 py-4 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-primary)]/40 focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all resize-none"
                />
              </div>

              {/* CTA Button */}
              <div className="mt-10 flex justify-center">
                <button 
                  onClick={handleWhatsApp}
                  className="group relative flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] font-semibold text-sm uppercase tracking-widest overflow-hidden hover:scale-105 transition-all duration-300 shadow-[0_10px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_40px_rgba(255,255,255,0.05)]"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Send to TresArt <MessageCircle size={18} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default Customizer;
