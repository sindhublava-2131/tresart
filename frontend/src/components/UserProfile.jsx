import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogOut, User, Settings, Edit3, Save, X, Phone, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const UserProfile = () => {
  const { user, logout, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  if (!user) {
    return (
      <div className="min-h-screen pt-32 px-8 flex items-center justify-center text-[var(--color-text-primary)]">
        <p className="tracking-widest uppercase text-xs">Please log in to view your profile.</p>
      </div>
    );
  }

  const handleSave = async () => {
    setLoading(true);
    const result = await updateProfile(formData);
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
        className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8"
      >
        <div>
          <h1 className="text-5xl font-serif mb-4 tracking-tight">Studio Dashboard</h1>
          <div className="flex items-center gap-4 text-[var(--color-text-primary)]/40 tracking-[0.3em] uppercase text-[10px]">
            <span>Collector Profile</span>
            <span className="w-1.5 h-1.5 bg-[var(--color-accent)] rounded-full"></span>
            <span>{user.name}</span>
          </div>
        </div>
        <button 
          onClick={logout}
          className="w-fit flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] px-6 py-3 border border-[var(--color-border)] hover:bg-white hover:text-black transition-all duration-500 rounded-sm"
        >
          <LogOut size={14} />
          Secure Sign Out
        </button>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-16">
        {/* Sidebar Nav */}
        <div className="w-full md:w-64 flex flex-col gap-2">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-4 p-5 text-[10px] tracking-[0.3em] uppercase text-left transition-all duration-300 rounded-sm ${activeTab === 'profile' ? 'bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] font-bold' : 'hover:bg-[var(--color-border)]/40'}`}
          >
            <User size={16} />
            Account Details
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-4 p-5 text-[10px] tracking-[0.3em] uppercase text-left transition-all duration-300 rounded-sm ${activeTab === 'settings' ? 'bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] font-bold' : 'hover:bg-[var(--color-border)]/40'}`}
          >
            <Settings size={16} />
            Preferences
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {activeTab === 'profile' && (
              <div className="space-y-12">
                <div className="flex justify-between items-center border-b border-[var(--color-border)] pb-6">
                  <h2 className="text-2xl font-serif tracking-tight">Personal Information</h2>
                  {!isEditing ? (
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[var(--color-text-primary)]/40 hover:text-white transition-colors"
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

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[var(--color-text-primary)]/30">
                      <MapPin size={12} />
                      <p className="text-[10px] tracking-[0.3em] uppercase">Shipping Address</p>
                    </div>
                    {isEditing ? (
                      <textarea 
                        rows={3}
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        className="w-full bg-transparent border-b border-[var(--color-border)] py-2 focus:border-[var(--color-accent)] outline-none transition-colors resize-none"
                      />
                    ) : (
                      <p className="text-lg font-medium leading-relaxed">{user.address || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                <div className="mt-16 p-8 bg-[var(--color-border)]/20 rounded-sm">
                  <h3 className="text-xs uppercase tracking-[0.4em] mb-4 text-[var(--color-accent)]">Collector Status</h3>
                  <p className="text-sm leading-relaxed text-[var(--color-text-primary)]/60">
                    Your profile details are used to pre-fill delivery information during checkout. Keep them updated for a seamless artistic acquisition experience.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-12">
                <h2 className="text-2xl font-serif border-b border-[var(--color-border)] pb-6 tracking-tight">Preferences</h2>
                <div className="space-y-8">
                  <div className="flex justify-between items-center p-6 border border-[var(--color-border)] rounded-sm">
                    <div>
                      <p className="text-xs uppercase tracking-widest mb-1">Newsletter</p>
                      <p className="text-[10px] text-[var(--color-text-primary)]/40 uppercase tracking-widest">Receive updates on new collections</p>
                    </div>
                    <div className="w-12 h-6 bg-[var(--color-accent)] rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <p className="text-[10px] uppercase tracking-widest text-[var(--color-text-primary)]/30 text-center">
                    More settings coming soon.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
