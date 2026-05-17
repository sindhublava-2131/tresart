import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogOut, User, Settings, Edit3, Save, X, Phone, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { indianStates, majorCitiesByState } from '../utils/indiaData';

const UserProfile = () => {
  const { user, logout, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    street: user?.street || '',
    landmark: user?.landmark || '',
    city: user?.city || '',
    state: user?.state || '',
    pincode: user?.pincode || '',
    nationality: user?.nationality || 'Indian',
    otherCity: ''
  });

  React.useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        street: user.street || '',
        landmark: user.landmark || '',
        city: user.city || '',
        state: user.state || '',
        pincode: user.pincode || '',
        nationality: user.nationality || 'Indian',
        otherCity: ''
      });
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen pt-32 px-8 flex items-center justify-center text-[var(--color-text-primary)]">
        <p className="tracking-widest uppercase text-xs">Please log in to view your profile.</p>
      </div>
    );
  }

  const handleSave = async () => {
    // Validate phone number (exactly 10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      alert('Phone number must be exactly 10 digits.');
      return;
    }

    // Validate 6-digit pincode
    const pincodeRegex = /^[0-9]{6}$/;
    if (!pincodeRegex.test(formData.pincode)) {
      alert('Please include a valid 6-digit pincode.');
      return;
    }

    setLoading(true);
    const { otherCity, ...updateData } = {
      ...formData,
      city: formData.city === 'Other' ? formData.otherCity : formData.city
    };

    if (formData.city === 'Other' && !formData.otherCity) {
      alert('Please specify your city name.');
      setLoading(false);
      return;
    }

    const result = await updateProfile(updateData);
    setLoading(false);
    if (result.success) {
      setIsEditing(false);
    } else {
      alert(result.error);
    }
  };

  return (
    <div className="min-h-screen pt-40 px-8 pb-32 max-w-6xl mx-auto text-[var(--color-text-primary)]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-20 flex flex-col items-center justify-center text-center gap-8"
      >
        <h1 className="text-6xl font-sans font-black tracking-tight uppercase">Dashboard</h1>
        <button 
          onClick={logout}
          className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] px-8 py-3 border border-[var(--color-border)] hover:bg-[var(--color-text-primary)] hover:text-[var(--color-bg-primary)] transition-all duration-500 rounded-sm"
        >
          <LogOut size={14} />
          Secure Sign Out
        </button>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        {/* Content Area */}
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="space-y-12">
                <div className="flex justify-between items-center border-b border-[var(--color-border)] pb-6">
                  <h2 className="text-2xl font-serif tracking-tight">Personal Information</h2>
                  {!isEditing ? (
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[var(--color-text-primary)]/40 hover:text-[var(--color-accent)] transition-colors"
                    >
                      <Edit3 size={16} />
                      Edit Profile
                    </button>
                  ) : (
                    <div className="flex gap-4">
                      <button 
                        onClick={() => setIsEditing(false)}
                        className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-red-500 hover:text-red-400 transition-colors"
                      >
                        <X size={16} />
                        Cancel
                      </button>
                      <button 
                        onClick={handleSave}
                        disabled={loading}
                        className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-green-500 hover:text-green-400 transition-colors"
                      >
                        {loading ? <span className="animate-pulse">Saving...</span> : <><Save size={16} />Save Changes</>}
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-16">
                  <div className="space-y-2">
                    <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-text-primary)]/30">Full Name</p>
                    {isEditing ? (
                      <input 
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-transparent border-b border-[var(--color-border)] py-2 focus:border-[var(--color-accent)] outline-none transition-colors"
                      />
                    ) : (
                      <p className="text-lg font-medium">{user.name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-text-primary)]/30">Email Address</p>
                    <p className="text-lg font-medium opacity-50">{user.email}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[var(--color-text-primary)]/30">
                      <Phone size={12} />
                      <p className="text-[10px] tracking-[0.3em] uppercase">Phone Number</p>
                    </div>
                    {isEditing ? (
                      <input 
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-transparent border-b border-[var(--color-border)] py-2 focus:border-[var(--color-accent)] outline-none transition-colors"
                      />
                    ) : (
                      <p className="text-lg font-medium">{user.phone || 'Not provided'}</p>
                    )}
                  </div>

                  <div className="space-y-6 md:col-span-2 border-t border-[var(--color-border)] pt-10">
                    <div className="flex items-center gap-2 text-[var(--color-text-primary)]/30 mb-4">
                      <MapPin size={12} />
                      <p className="text-[10px] tracking-[0.3em] uppercase">Detailed Shipping Address</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-text-primary)]/30">Street / House No.</p>
                        {isEditing ? (
                          <input 
                            type="text"
                            value={formData.street}
                            onChange={(e) => setFormData({...formData, street: e.target.value})}
                            className="w-full bg-transparent border-b border-[var(--color-border)] py-2 focus:border-[var(--color-accent)] outline-none transition-colors"
                          />
                        ) : (
                          <p className="text-lg font-medium">{formData.street || 'Not provided'}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-text-primary)]/30">Landmark</p>
                        {isEditing ? (
                          <input 
                            type="text"
                            value={formData.landmark}
                            onChange={(e) => setFormData({...formData, landmark: e.target.value})}
                            className="w-full bg-transparent border-b border-[var(--color-border)] py-2 focus:border-[var(--color-accent)] outline-none transition-colors"
                          />
                        ) : (
                          <p className="text-lg font-medium">{formData.landmark || 'Not provided'}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-text-primary)]/30">State</p>
                        {isEditing ? (
                          <select 
                            value={formData.state}
                            onChange={(e) => setFormData({...formData, state: e.target.value, city: ''})}
                            className="w-full bg-transparent border-b border-[var(--color-border)] py-2 focus:border-[var(--color-accent)] outline-none transition-colors appearance-none"
                          >
                            <option value="" className="bg-[var(--color-bg-primary)]">Select State</option>
                            {indianStates.map(state => (
                              <option key={state} value={state} className="bg-[var(--color-bg-primary)]">{state}</option>
                            ))}
                          </select>
                        ) : (
                          <p className="text-lg font-medium">{formData.state || 'Not provided'}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-text-primary)]/30">City</p>
                        {isEditing ? (
                          <select 
                            value={formData.city}
                            onChange={(e) => setFormData({...formData, city: e.target.value})}
                            className="w-full bg-transparent border-b border-[var(--color-border)] py-2 focus:border-[var(--color-accent)] outline-none transition-colors appearance-none"
                            disabled={!formData.state}
                          >
                            <option value="" className="bg-[var(--color-bg-primary)]">Select City</option>
                            {formData.state && majorCitiesByState[formData.state]?.map(city => (
                              <option key={city} value={city} className="bg-[var(--color-bg-primary)]">{city}</option>
                            ))}
                            {formData.state && <option value="Other" className="bg-[var(--color-bg-primary)]">Other</option>}
                          </select>
                        ) : (
                          <p className="text-lg font-medium">{formData.city || 'Not provided'}</p>
                        )}
                      </div>

                      {isEditing && formData.city === 'Other' && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="space-y-2 md:col-span-2"
                        >
                          <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-text-primary)]/30">Specify City Name</p>
                          <input 
                            type="text"
                            value={formData.otherCity}
                            onChange={(e) => setFormData({...formData, otherCity: e.target.value})}
                            className="w-full bg-transparent border-b border-[var(--color-border)] py-2 focus:border-[var(--color-accent)] outline-none transition-colors"
                            placeholder="Enter your city name"
                          />
                        </motion.div>
                      )}

                      <div className="space-y-2">
                        <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-text-primary)]/30">Pincode</p>
                        {isEditing ? (
                          <input 
                            type="text"
                            value={formData.pincode}
                            onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                            className="w-full bg-transparent border-b border-[var(--color-border)] py-2 focus:border-[var(--color-accent)] outline-none transition-colors"
                          />
                        ) : (
                          <p className="text-lg font-medium">{formData.pincode || 'Not provided'}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-text-primary)]/30">Nationality</p>
                        {isEditing ? (
                          <select 
                            value={formData.nationality}
                            onChange={(e) => setFormData({...formData, nationality: e.target.value})}
                            className="w-full bg-transparent border-b border-[var(--color-border)] py-2 focus:border-[var(--color-accent)] outline-none transition-colors appearance-none"
                          >
                            <option value="Indian" className="bg-[var(--color-bg-primary)]">Indian</option>
                            <option value="International" className="bg-[var(--color-bg-primary)]">International</option>
                          </select>
                        ) : (
                          <p className="text-lg font-medium">{formData.nationality}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-16 p-8 bg-[var(--color-border)]/20 rounded-sm">
                  <h3 className="text-xs uppercase tracking-[0.4em] mb-4 text-[var(--color-accent)]">Collector Status</h3>
                  <p className="text-sm leading-relaxed text-[var(--color-text-primary)]/60">
                    Your profile details are used to pre-fill delivery information during checkout. Keep them updated for a seamless artistic acquisition experience.
                  </p>
                </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
