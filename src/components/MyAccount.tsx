import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye, EyeOff, Edit } from 'lucide-react';
import { toast, Toaster } from 'sonner@2.0.3';
import svgPaths from "../imports/svg-ft5lp4id2v";
import imgAvatarStyle6 from "figma:asset/d7437995b6aeee65e7688cd80dd4ddfdd456da5a.png";
import imgEllipse5 from "figma:asset/e75d1874b61ca0b481f1ae10a918c892cf9636e5.png";

interface User {
  name: string;
  email: string;
}

interface MyAccountProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
}

export default function MyAccount({ user, isOpen, onClose }: MyAccountProps) {
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const handlePasswordChange = (field: string, value: string) => {
    setPasswords(prev => ({ ...prev, [field]: value }));
  };

  const togglePasswordVisibility = (field: string) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSaveChanges = () => {
    if (!passwords.current.trim()) {
      toast.error('Please enter your current password');
      return;
    }
    
    if (!passwords.new.trim()) {
      toast.error('Please enter a new password');
      return;
    }
    
    if (passwords.new !== passwords.confirm) {
      toast.error('New passwords do not match');
      return;
    }

    if (passwords.new.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    // Here you would normally make an API call to update the password
    toast.success('Password updated successfully!');
    setPasswords({ current: '', new: '', confirm: '' });
  };

  const handleCancel = () => {
    setPasswords({ current: '', new: '', confirm: '' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <Toaster 
        position="top-right" 
        theme="dark"
        toastOptions={{
          style: {
            background: '#242424',
            border: '1px solid #3d3d3d',
            color: '#fff',
          },
        }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-neutral-900 rounded-xl w-full max-w-6xl max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="relative border-b border-[#3d3d3d] p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-white font-semibold text-[24px]">My Account</h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="text-white/50 hover:text-white transition-colors"
              >
                <X size={24} />
              </motion.button>
            </div>
          </div>

          {/* Content */}
          <div className="p-10 space-y-10">
            {/* Profile Picture */}
            <div className="relative w-28 h-28">
              <img
                className="block w-full h-full rounded-full object-cover"
                src={imgEllipse5}
                alt="Profile"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute bottom-0 right-0 bg-neutral-50 p-1.5 rounded-full"
              >
                <Edit size={16} className="text-[#181818]" />
              </motion.button>
            </div>

            {/* Personal Information */}
            <div className="space-y-8">
              <h2 className="text-[20px] text-white font-normal tracking-[-0.264px]">
                Personal Information
              </h2>
              
              <div className="flex gap-6">
                {/* Full Name */}
                <div className="flex-1 space-y-3">
                  <label className="block text-white/70 text-[14px]">Full Name</label>
                  <div className="bg-[#242424] rounded-lg p-4 h-14 flex items-center">
                    <span className="text-white text-[16px]">{user.name}</span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex-1 space-y-3">
                  <label className="block text-white/70 text-[14px]">Email</label>
                  <div className="bg-[#242424] rounded-lg p-4 h-14 flex items-center">
                    <span className="text-white/50 text-[16px]">{user.email}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Change Password */}
            <div className="space-y-8">
              <h2 className="text-[20px] text-white font-normal tracking-[-0.264px]">
                Change Password
              </h2>

              {/* Current Password */}
              <div className="space-y-3 max-w-[445px]">
                <label className="block text-white/70 text-[14px]">Current Password</label>
                <div className="bg-[#242424] rounded-lg p-4 h-14 flex items-center justify-between">
                  <input
                    type={showPasswords.current ? "text" : "password"}
                    value={passwords.current}
                    onChange={(e) => handlePasswordChange('current', e.target.value)}
                    className="bg-transparent text-white text-[16px] flex-1 outline-none"
                    placeholder="Enter current password"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => togglePasswordVisibility('current')}
                    className="text-white/50 hover:text-white"
                  >
                    {showPasswords.current ? <EyeOff size={24} /> : <Eye size={24} />}
                  </motion.button>
                </div>
              </div>

              {/* New Password Fields */}
              <div className="flex gap-6">
                {/* New Password */}
                <div className="flex-1 space-y-3">
                  <label className="block text-white/70 text-[14px]">New Password</label>
                  <div className="bg-[#242424] rounded-lg p-4 h-14 flex items-center justify-between">
                    <input
                      type={showPasswords.new ? "text" : "password"}
                      value={passwords.new}
                      onChange={(e) => handlePasswordChange('new', e.target.value)}
                      className="bg-transparent text-white text-[16px] flex-1 outline-none"
                      placeholder="Enter new password"
                    />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => togglePasswordVisibility('new')}
                      className="text-white/50 hover:text-white"
                    >
                      {showPasswords.new ? <EyeOff size={24} /> : <Eye size={24} />}
                    </motion.button>
                  </div>
                </div>

                {/* Confirm New Password */}
                <div className="flex-1 space-y-3">
                  <label className="block text-white/70 text-[14px]">Confirm New Password</label>
                  <div className="bg-[#242424] rounded-lg p-4 h-14 flex items-center justify-between">
                    <input
                      type={showPasswords.confirm ? "text" : "password"}
                      value={passwords.confirm}
                      onChange={(e) => handlePasswordChange('confirm', e.target.value)}
                      className="bg-transparent text-white text-[16px] flex-1 outline-none"
                      placeholder="Enter new password again"
                    />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => togglePasswordVisibility('confirm')}
                      className="text-white/50 hover:text-white"
                    >
                      {showPasswords.confirm ? <EyeOff size={24} /> : <Eye size={24} />}
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="border-t border-[#3d3d3d] pt-6 flex gap-2.5">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSaveChanges}
                className="w-40 h-14 rounded-lg bg-gradient-to-r from-[#5e97ff] to-[#1738de] text-white text-[16px] font-semibold"
              >
                Save & Update
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCancel}
                className="w-[130px] h-14 rounded-lg bg-[#363636] text-white text-[16px] font-semibold"
              >
                Cancel
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}