import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Check, AlertCircle } from 'lucide-react';
import { toast, Toaster } from 'sonner@2.0.3';
import svgPaths from "../imports/svg-rht60jhy7b";
import imgRectangle360 from "figma:asset/7b5023966d8cb9ceedae5fbfbde32832dfb971a3.png";
import logoImage from "figma:asset/216d05b2dad1126a3e864df88d0bdb14f3f35226.png";
import AIVideoBackground from './AIVideoBackground';

interface User {
  name: string;
  email: string;
}

interface SignUpProps {
  onSignUp: (user: User) => void;
  onSwitchToLogin: () => void;
}

interface FormData {
  fullName: string;
  email: string;
  company: string;
  password: string;
  agreeToTerms: boolean;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  company?: string;
  password?: string;
  agreeToTerms?: string;
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
        className="flex flex-col justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-left text-nowrap font-medium opacity-70"
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

export default function InteractiveSignUp({ onSignUp, onSwitchToLogin }: SignUpProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    company: '',
    password: '',
    agreeToTerms: false
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Company validation
    if (!formData.company.trim()) {
      newErrors.company = 'Company is required';
    } else if (formData.company.trim().length < 2) {
      newErrors.company = 'Company name must be at least 2 characters';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Terms validation
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'Please agree to terms & conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors before submitting');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Account created successfully!');
      onSignUp({
        name: formData.fullName,
        email: formData.email
      });
    } catch (error) {
      toast.error('Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      setIsLoading(true);
      // Simulate Google OAuth
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Successfully signed up with Google!');
      onSignUp({
        name: 'Google User',
        email: 'user@gmail.com'
      });
    } catch (error) {
      toast.error('Google sign up failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const GoogleButton = () => (
    <motion.button
      onClick={handleGoogleSignUp}
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
          {isLoading ? 'Signing up...' : 'Register with Google'}
        </p>
      </div>
    </motion.button>
  );

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
      <div className="backdrop-blur-[48.25px] backdrop-filter bg-[#171717cc] bg-neutral-900 relative size-full">
        <div className="flex flex-row items-center relative size-full">
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
                    <p className="block leading-[normal] whitespace-pre">Create an Account</p>
                  </div>
                  <div className="flex flex-col justify-center relative shrink-0 text-[#8692a6] text-[18px] w-[411px]">
                    <p className="block leading-[28px]">
                      Kindly fill in your details to create an account
                    </p>
                  </div>
                </motion.div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="box-border content-stretch flex flex-col gap-6 items-start justify-start p-0 relative shrink-0 w-[445px]">
                  <div className="box-border content-stretch flex flex-col gap-6 items-start justify-start p-0 relative shrink-0 w-[445px]">
                    <InputField
                      label="Full Name"
                      value={formData.fullName}
                      onChange={(value) => handleInputChange('fullName', value)}
                      placeholder="Enter your name"
                      error={errors.fullName}
                      name="fullName"
                    />

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
                      label="Company"
                      value={formData.company}
                      onChange={(value) => handleInputChange('company', value)}
                      placeholder="Enter company"
                      error={errors.company}
                      name="company"
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
                  </div>

                  {/* Terms Checkbox */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                    className="box-border content-stretch flex flex-row gap-4 items-center justify-start p-0 relative shrink-0 w-[445px]"
                  >
                    <motion.button
                      type="button"
                      onClick={() => handleInputChange('agreeToTerms', !formData.agreeToTerms)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`relative shrink-0 size-5 rounded border-2 transition-all duration-200 ${
                        formData.agreeToTerms 
                          ? 'bg-[#5E97FF] border-[#5E97FF]' 
                          : 'bg-transparent border-[#8692A6]'
                      } ${errors.agreeToTerms ? 'border-red-500' : ''}`}
                    >
                      <AnimatePresence>
                        {formData.agreeToTerms && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            className="absolute inset-0 flex items-center justify-center"
                          >
                            <Check size={12} className="text-white" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                    <div className="flex flex-col justify-center leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[16px] text-left text-nowrap">
                      <p className="block leading-[normal] whitespace-pre">I agree to terms & conditions</p>
                    </div>
                  </motion.div>

                  {/* Terms Error */}
                  <AnimatePresence>
                    {errors.agreeToTerms && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center gap-2 text-red-400 text-sm -mt-4"
                      >
                        <AlertCircle size={16} />
                        <span>{errors.agreeToTerms}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>

                {/* Sign Up Button */}
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
                      {isLoading ? 'Creating Account...' : 'Sign Up'}
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

                {/* Google Sign Up */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <GoogleButton />
                </motion.div>

                {/* Login Link */}
                <motion.button
                  onClick={onSwitchToLogin}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="leading-[0] not-italic relative shrink-0 text-[#181818] text-[0px] text-left text-nowrap font-semibold"
                >
                  <p className="leading-[normal] text-[14px] whitespace-pre">
                    <span className="text-[rgba(255,255,255,0.7)]">
                      Already have an Account?
                    </span>
                    <span className="font-semibold"> </span>
                    <span className="[text-decoration-line:underline] [text-decoration-skip-ink:none] [text-decoration-style:solid] [text-underline-position:from-font] text-[#5e97ff] hover:text-[#4285f4] transition-colors">
                      Login
                    </span>
                  </p>
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right Side with AI Video Background */}
            <motion.div
              initial={{ opacity: 0, x: 50, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="basis-0 grow h-full min-h-px min-w-px rounded-[40px] shrink-0 relative overflow-hidden"
              style={{ backgroundImage: `url('${imgRectangle360}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <AIVideoBackground className="rounded-[40px]" intensity="high" />
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}