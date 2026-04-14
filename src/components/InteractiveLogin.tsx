import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { toast, Toaster } from 'sonner@2.0.3';
import svgPaths from "../imports/svg-rht60jhy7b";
import imgRectangle360 from "figma:asset/7b5023966d8cb9ceedae5fbfbde32832dfb971a3.png";
import logoImage from "figma:asset/216d05b2dad1126a3e864df88d0bdb14f3f35226.png";
import AIVideoBackground from './AIVideoBackground';

interface User {
  name: string;
  email: string;
}

interface InteractiveLoginProps {
  onLogin: (user: User) => void;
  onSwitchToRegister: () => void;
}

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  error?: string;
  name: string;
  rightIcon?: React.ReactNode;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  error,
  name,
  rightIcon
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full"
    >
      <motion.label
        animate={{ 
          color: isFocused ? '#5e97ff' : '#ffffff',
          scale: isFocused ? 1.02 : 1
        }}
        transition={{ duration: 0.2 }}
        className="flex flex-col justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-left text-nowrap font-medium"
      >
        <p className="block leading-[normal] whitespace-pre">{label}</p>
      </motion.label>
      
      <div className="relative w-full">
        <motion.input
          type={type}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          whileFocus={{ 
            scale: 1.01,
            boxShadow: '0 0 0 2px rgba(94, 151, 255, 0.3)',
          }}
          className={`bg-[#242424] border border-[#3d3d3d] box-border content-stretch h-14 p-4 relative rounded-lg shrink-0 w-full text-white placeholder-white/50 text-[16px] outline-none transition-all duration-200 pr-${rightIcon ? '12' : '4'} ${
            error ? 'border-red-500 focus:border-red-500' : 'focus:border-[#5e97ff] hover:border-[#4d4d4d]'
          }`}
        />
        {rightIcon && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            {rightIcon}
          </div>
        )}
      </div>
      
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2 text-red-400 text-sm"
          >
            <AlertCircle size={16} />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};



export default function InteractiveLogin({
  onLogin,
  onSwitchToRegister,
}: InteractiveLoginProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email format is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Simulate API call
      setTimeout(() => {
        const user: User = {
          name: formData.email.split('@')[0],
          email: formData.email,
        };
        onLogin(user);
        toast.success('Login successful!');
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      toast.error('Login failed. Please try again.');
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      // Simulate Google OAuth
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Successfully logged in with Google!');
      onLogin({
        name: 'Google User',
        email: 'user@gmail.com'
      });
    } catch (error) {
      toast.error('Google login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="backdrop-blur-[48.25px] backdrop-filter bg-neutral-900 box-border content-stretch flex flex-row items-center justify-start p-0 relative size-full">
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#242424',
            color: '#ffffff',
            border: '1px solid #3d3d3d',
          },
        }}
      />
      
      <div className="relative size-full">
        <div className="relative size-full">
          <div className="box-border content-stretch flex flex-row gap-[120px] items-center justify-start pl-20 pr-10 py-10 relative size-full">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="box-border content-stretch flex flex-col gap-16 items-start justify-start p-0 relative shrink-0 w-[445px]"
            >
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="h-[42.256px] relative shrink-0 w-[180.96px]"
              >
                <img
                  src={logoImage}
                  alt="Logo"
                  className="block size-full object-contain"
                />
              </motion.div>

              {/* Form Container */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="box-border content-stretch flex flex-col gap-10 items-center justify-start p-0 relative shrink-0 w-full"
              >
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="box-border content-stretch flex flex-col gap-2 items-start justify-start leading-[0] not-italic p-0 relative shrink-0 text-left w-[445px]"
                >
                  <div className="flex flex-col justify-center relative shrink-0 text-[32px] text-neutral-50 text-nowrap font-semibold">
                    <p className="block leading-[normal] whitespace-pre">Login</p>
                  </div>
                  <div className="flex flex-col justify-center relative shrink-0 text-[#8692a6] text-[18px] w-[411px]">
                    <p className="block leading-[28px]">
                      Add your credentials to log in
                    </p>
                  </div>
                </motion.div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="box-border content-stretch flex flex-col gap-6 items-start justify-start p-0 relative shrink-0 w-[445px]">
                  <InputField
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(value) => handleInputChange('email', value)}
                    placeholder="Enter your email"
                    error={errors.email}
                    name="email"
                  />

                  <InputField
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(value) => handleInputChange('password', value)}
                    placeholder="Enter password"
                    error={errors.password}
                    name="password"
                    rightIcon={
                      <motion.button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="relative shrink-0 size-6 text-white/50 hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
                      </motion.button>
                    }
                  />
                </form>

                {/* Email Login Button - Primary */}
                <motion.button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  whileHover={{ scale: isLoading ? 1 : 1.02, boxShadow: '0 8px 25px rgba(94, 151, 255, 0.3)' }}
                  whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  className="box-border content-stretch flex flex-row gap-14 h-14 items-center justify-center p-[16px] relative rounded-lg shrink-0 w-[445px] transition-all duration-200 disabled:opacity-50"
                  style={{
                    backgroundImage: "linear-gradient(93.4416deg, rgb(94, 151, 255) 13.302%, rgb(23, 56, 222) 93.324%)",
                  }}
                >
                  <div className="flex flex-col justify-center leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[20px] text-center text-nowrap font-semibold">
                    <p className="block leading-[normal] whitespace-pre">
                      {isLoading ? 'Logging in...' : 'Login'}
                    </p>
                  </div>
                </motion.button>

                {/* Divider */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="box-border content-stretch flex flex-row gap-8 items-center justify-start p-0 relative shrink-0"
                >
                  <div className="flex items-center justify-center relative shrink-0">
                    <div className="h-[1px] bg-white/20 w-[183px]" />
                  </div>
                  <div className="flex flex-col justify-center leading-[0] not-italic relative shrink-0 text-[#bababa] text-[12px] text-center text-nowrap">
                    <p className="block leading-[normal] whitespace-pre">Or</p>
                  </div>
                  <div className="flex items-center justify-center relative shrink-0">
                    <div className="h-[1px] bg-white/20 w-[183px]" />
                  </div>
                </motion.div>

                {/* Google Login Button - Secondary */}
                <motion.button
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                  whileHover={{ scale: 1.02, backgroundColor: '#404040' }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-[#363636] box-border content-stretch flex flex-row gap-2.5 h-14 items-center justify-center overflow-clip p-[16px] relative rounded-lg shrink-0 w-[445px] transition-colors duration-200 disabled:opacity-50"
                >
                  <motion.div
                    animate={{ rotate: isLoading ? 360 : 0 }}
                    transition={{ duration: 1, repeat: isLoading ? Infinity : 0, ease: "linear" }}
                    className="relative shrink-0 size-6"
                  >
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                      <g id="flat-color-icons:google">
                        <path d={svgPaths.p257b0b00} fill="#FFC107" />
                        <path d={svgPaths.p2a795380} fill="#FF3D00" />
                        <path d={svgPaths.p1df7e300} fill="#4CAF50" />
                        <path d={svgPaths.p8514300} fill="#1976D2" />
                      </g>
                    </svg>
                  </motion.div>
                  <div className="flex flex-col justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-neutral-50 text-nowrap font-medium">
                    <p className="block leading-[normal] whitespace-pre">
                      {isLoading ? 'Logging in...' : 'Continue with Google'}
                    </p>
                  </div>
                </motion.button>

                {/* Register Link */}
                <motion.button
                  onClick={onSwitchToRegister}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="leading-[0] not-italic relative shrink-0 text-[#181818] text-[0px] text-left text-nowrap font-semibold"
                >
                  <p className="leading-[normal] text-[14px] whitespace-pre">
                    <span className="text-[rgba(255,255,255,0.7)]">
                      Don't have an Account?
                    </span>
                    <span className="font-semibold"> </span>
                    <span className="[text-decoration-line:underline] [text-decoration-skip-ink:none] [text-decoration-style:solid] [text-underline-position:from-font] text-[#5e97ff] hover:text-[#4285f4] transition-colors">
                      Register
                    </span>
                  </p>
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right Side Image with AI Animations */}
            <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0">
              {/* Main Image Container */}
              <motion.div
                initial={{ opacity: 0, x: 50, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  x: 0, 
                  scale: 1,
                  y: [0, -8, 0, 8, 0], // Floating animation
                }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.4,
                  y: {
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                className="relative w-full h-full rounded-[40px] overflow-hidden"
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-center bg-cover bg-no-repeat"
                  style={{ backgroundImage: `url('${imgRectangle360}')` }}
                />

                {/* Animated Blur Overlay */}
                <motion.div
                  animate={{
                    opacity: [0.3, 0.1, 0.3],
                    backdropFilter: ['blur(0px)', 'blur(3px)', 'blur(0px)'],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10"
                />

                {/* Moving Gradient Overlay */}
                <motion.div
                  animate={{
                    background: [
                      'linear-gradient(45deg, rgba(94, 151, 255, 0.1) 0%, rgba(23, 56, 222, 0.05) 50%, rgba(94, 151, 255, 0.1) 100%)',
                      'linear-gradient(135deg, rgba(23, 56, 222, 0.1) 0%, rgba(94, 151, 255, 0.05) 50%, rgba(23, 56, 222, 0.1) 100%)',
                      'linear-gradient(225deg, rgba(94, 151, 255, 0.1) 0%, rgba(23, 56, 222, 0.05) 50%, rgba(94, 151, 255, 0.1) 100%)',
                      'linear-gradient(315deg, rgba(23, 56, 222, 0.1) 0%, rgba(94, 151, 255, 0.05) 50%, rgba(23, 56, 222, 0.1) 100%)',
                      'linear-gradient(45deg, rgba(94, 151, 255, 0.1) 0%, rgba(23, 56, 222, 0.05) 50%, rgba(94, 151, 255, 0.1) 100%)'
                    ]
                  }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute inset-0"
                />

                {/* Pulsing Glow Effect */}
                <motion.div
                  animate={{
                    opacity: [0.1, 0.3, 0.1],
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 bg-gradient-to-tr from-blue-400/10 via-transparent to-purple-400/10 rounded-[40px]"
                  style={{
                    filter: 'blur(1px)',
                    boxShadow: 'inset 0 0 50px rgba(94, 151, 255, 0.1)'
                  }}
                />

                {/* Animated Particles */}
                <AIVideoBackground className="rounded-[40px]" intensity="high" />

                {/* Moving Light Streak */}
                <motion.div
                  animate={{
                    x: ['-100%', '100%'],
                    opacity: [0, 0.5, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: "easeInOut"
                  }}
                  className="absolute top-1/3 left-0 w-1/3 h-1 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"
                  style={{
                    filter: 'blur(2px)',
                    transform: 'rotate(15deg)'
                  }}
                />

                {/* Circuit-like Pattern Overlay */}
                <motion.div
                  animate={{
                    opacity: [0.1, 0.3, 0.1],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `
                      linear-gradient(90deg, rgba(94, 151, 255, 0.1) 1px, transparent 1px),
                      linear-gradient(rgba(94, 151, 255, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px',
                    filter: 'blur(0.5px)'
                  }}
                />

                {/* Corner Glow Effects */}
                <motion.div
                  animate={{
                    opacity: [0.2, 0.4, 0.2],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute top-4 right-4 w-16 h-16 bg-blue-400/20 rounded-full"
                  style={{
                    filter: 'blur(8px)'
                  }}
                />
                
                <motion.div
                  animate={{
                    opacity: [0.1, 0.3, 0.1],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    delay: 2,
                    ease: "easeInOut"
                  }}
                  className="absolute bottom-8 left-8 w-12 h-12 bg-purple-400/20 rounded-full"
                  style={{
                    filter: 'blur(6px)'
                  }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}