import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { indianStates, majorCitiesByState } from '../utils/indiaData';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, register } = useAuth();
  
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '',
    phone: '',
    street: '',
    landmark: '',
    city: '',
    state: '',
    pincode: '',
    otherCity: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Clean inputs to strip out mobile auto-completed trailing spaces
    const cleanEmail = (formData.email || '').trim();
    const cleanName = (formData.name || '').trim();
    const cleanStreet = (formData.street || '').trim();
    const cleanLandmark = (formData.landmark || '').trim();
    const cleanPincode = (formData.pincode || '').trim();

    // Extract exactly the last 10 digits from phone input to accommodate country code prefixes or spaces (+91, 0, etc.)
    const digitsOnly = (formData.phone || '').replace(/\D/g, '');
    const cleanPhone = digitsOnly.length >= 10 ? digitsOnly.slice(-10) : digitsOnly;

    if (!isLogin) {
      // Validate email (must be @gmail.com)
      if (!cleanEmail.toLowerCase().endsWith('@gmail.com')) {
        setError('Only @gmail.com email addresses are accepted.');
        setLoading(false);
        return;
      }

      // Validate phone number (exactly 10 digits)
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(cleanPhone)) {
        setError('Phone number must be a valid 10-digit number (e.g. 9876543210).');
        setLoading(false);
        return;
      }

      // Validate address fields
      if (!cleanStreet || !formData.city || !formData.state) {
        setError('Street, City, and State are required.');
        setLoading(false);
        return;
      }

      // Validate 6-digit pincode
      const pincodeRegex = /^[0-9]{6}$/;
      if (!pincodeRegex.test(cleanPincode)) {
        setError('Pincode must be exactly 6 digits.');
        setLoading(false);
        return;
      }
    }

    let result;
    if (isLogin) {
      result = await login(cleanEmail, formData.password);
    } else {
      // Prepare registration data (use otherCity if selected)
      const finalCity = formData.city === 'Other' ? (formData.otherCity || '').trim() : formData.city;
      
      if (formData.city === 'Other' && !finalCity) {
        setError('Please specify your city name.');
        setLoading(false);
        return;
      }

      const registrationData = {
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        street: cleanStreet,
        landmark: cleanLandmark,
        city: finalCity,
        state: formData.state,
        pincode: cleanPincode,
        password: formData.password
      };
      
      result = await register(registrationData);
    }

    setLoading(false);
    if (result.success) {
      onClose();
    } else {
      setError(result.error);
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.95 },
    visible: { 
      y: 0, 
      opacity: 1, 
      scale: 1,
      transition: { type: 'spring', damping: 25, stiffness: 300 }
    },
    exit: { y: 20, opacity: 0, scale: 0.95 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className="relative w-full max-w-md p-8 bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-sm shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-[var(--color-text-primary)]/40 hover:text-[var(--color-accent)] transition-colors"
            >
              <X size={20} />
            </button>

            <h2 className="text-3xl font-serif mb-2">
              {isLogin ? 'Welcome Back' : 'Join TresArt'}
            </h2>
            <p className="text-[var(--color-text-primary)]/40 text-[10px] uppercase tracking-[0.3em] mb-8">
              {isLogin ? 'Sign in to your account' : 'Create your collector profile'}
            </p>

            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mb-6 p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-xs text-center uppercase tracking-widest"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-[var(--color-text-primary)]/40">Full Name</label>
                  <input 
                    type="text" 
                    required
                    className="w-full bg-transparent border-b border-[var(--color-border)] py-2 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)] transition-colors text-sm"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              )}
              
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-[var(--color-text-primary)]/40">
                  {isLogin ? 'Email or Phone Number' : 'Email'}
                </label>
                <input 
                  type="text" 
                  required
                  placeholder={isLogin ? 'yourname@gmail.com or 10-digit phone' : 'yourname@gmail.com'}
                  className="w-full bg-transparent border-b border-[var(--color-border)] py-2 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)] transition-colors text-sm placeholder-[var(--color-text-primary)]/20"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              {!isLogin && (
                <>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-[var(--color-text-primary)]/40">Phone Number (10 digits)</label>
                    <input 
                      type="tel" 
                      required
                      className="w-full bg-transparent border-b border-[var(--color-border)] py-2 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)] transition-colors text-sm"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-[var(--color-text-primary)]/40">Street / House No.</label>
                    <input 
                      type="text" 
                      required
                      className="w-full bg-transparent border-b border-[var(--color-border)] py-2 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)] transition-colors text-sm"
                      value={formData.street}
                      onChange={(e) => setFormData({...formData, street: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-[var(--color-text-primary)]/40">Landmark</label>
                    <input 
                      type="text" 
                      className="w-full bg-transparent border-b border-[var(--color-border)] py-2 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)] transition-colors text-sm"
                      value={formData.landmark}
                      onChange={(e) => setFormData({...formData, landmark: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-[var(--color-text-primary)]/40">State</label>
                      <select 
                        required
                        className="w-full bg-transparent border-b border-[var(--color-border)] py-2 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)] transition-colors text-sm appearance-none"
                        value={formData.state}
                        onChange={(e) => setFormData({...formData, state: e.target.value, city: ''})}
                      >
                        <option value="" className="bg-[var(--color-bg-primary)]">Select State</option>
                        {indianStates.map(state => (
                          <option key={state} value={state} className="bg-[var(--color-bg-primary)]">{state}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-[var(--color-text-primary)]/40">City</label>
                      <select 
                        required
                        className="w-full bg-transparent border-b border-[var(--color-border)] py-2 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)] transition-colors text-sm appearance-none"
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                        disabled={!formData.state}
                      >
                        <option value="" className="bg-[var(--color-bg-primary)]">Select City</option>
                        {formData.state && majorCitiesByState[formData.state]?.map(city => (
                          <option key={city} value={city} className="bg-[var(--color-bg-primary)]">{city}</option>
                        ))}
                        {formData.state && <option value="Other" className="bg-[var(--color-bg-primary)]">Other</option>}
                      </select>
                    </div>
                  </div>

                  {formData.city === 'Other' && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-1"
                    >
                      <label className="text-[10px] uppercase tracking-widest text-[var(--color-text-primary)]/40">Specify City Name</label>
                      <input 
                        type="text" 
                        required
                        className="w-full bg-transparent border-b border-[var(--color-border)] py-2 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)] transition-colors text-sm"
                        value={formData.otherCity}
                        onChange={(e) => setFormData({...formData, otherCity: e.target.value})}
                      />
                    </motion.div>
                  )}

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-[var(--color-text-primary)]/40">Pincode (6 digits)</label>
                    <input 
                      type="text" 
                      required
                      className="w-full bg-transparent border-b border-[var(--color-border)] py-2 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)] transition-colors text-sm"
                      value={formData.pincode}
                      onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                    />
                  </div>
                </>
              )}

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-[var(--color-text-primary)]/40">Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    required
                    className="w-full bg-transparent border-b border-[var(--color-border)] py-2 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)] transition-colors text-sm pr-10"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--color-text-primary)]/40 hover:text-[var(--color-accent)] transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full py-5 mt-8 bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] tracking-[0.4em] uppercase text-xs font-bold hover:bg-[var(--color-accent)] disabled:opacity-50 transition-all duration-300 rounded-sm flex items-center justify-center gap-3"
              >
                {loading && <Loader2 size={16} className="animate-spin" />}
                {isLogin ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            <div className="mt-8 text-center border-t border-[var(--color-border)] pt-6">
              <button 
                type="button"
                onClick={() => { setIsLogin(!isLogin); setError(''); }}
                className="text-[10px] uppercase tracking-widest text-[var(--color-text-primary)]/40 hover:text-[var(--color-accent)] transition-colors"
              >
                {isLogin ? 'New to TresArt? Create an account' : 'Already have an account? Sign in'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
