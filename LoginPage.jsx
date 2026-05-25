import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { authService } from './authService';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const navigate = useNavigate();
  
  // Validation functions
  const validateEmail = (email) => {
    if (!email) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return '';
  };

  const validatePassword = (password) => {
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters';
    return '';
  };

  const validateName = (name) => {
    if (!name.trim()) return 'Name is required';
    return '';
  };

  const validateForm = () => {
    const errors = {};
    errors.email = validateEmail(formData.email);
    errors.password = validatePassword(formData.password);
    if (!isLogin) {
      errors.name = validateName(formData.name);
    }
    setFieldErrors(errors);
    return Object.values(errors).every(e => e === '');
  };

  const hasErrors = () => {
    if (isLogin) {
      return fieldErrors.email !== '' || fieldErrors.password !== '';
    }
    return fieldErrors.email !== '' || fieldErrors.password !== '' || fieldErrors.name !== '';
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Clear server error when user starts typing
    
    // Real-time validation
    let error = '';
    if (name === 'email') {
      error = validateEmail(value);
    } else if (name === 'password') {
      error = validatePassword(value);
    } else if (name === 'name') {
      error = validateName(value);
    }
    setFieldErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleFieldBlur = (fieldName) => {
    let error = '';
    if (fieldName === 'email') {
      error = validateEmail(formData.email);
    } else if (fieldName === 'password') {
      error = validatePassword(formData.password);
    } else if (fieldName === 'name') {
      error = validateName(formData.name);
    }
    setFieldErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      setError('Please fix all validation errors');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        // Login
        await authService.login(formData.email, formData.password);
      } else {
        // Register
        await authService.register(formData.email, formData.password, formData.name);
      }
      
      // Redirect to dashboard on successful login/register
      navigate('/customer-dashboard');
    } catch (err) {
      // Display user-friendly error messages
      let displayError = 'An error occurred. Please try again.';
      
      if (err.message) {
        displayError = err.message;
      }
      
      // Log detailed error for debugging (don't expose to user)
      console.error(`${isLogin ? 'Login' : 'Register'} error:`, err);
      
      setError(displayError);
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center pt-32 pb-20 bg-gradient-to-br from-luxury-dark to-luxury-dark/90">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-md w-full mx-4"
      >
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-playfair text-luxury-dark mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-gray-600">
              {isLogin ? 'Sign in to manage your reservations' : 'Join Hatsey Kaleb Hotel'}
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
           {!isLogin && (
              <div>
                <label className="block text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onBlur={() => handleFieldBlur('name')}
                  className={`input-field ${fieldErrors.name ? 'border-red-500' : ''}`}
                  placeholder="John Doe"
                  required
                />
                {fieldErrors.name && (
                  <p className="text-red-500 text-sm mt-1">{fieldErrors.name}</p>
                )}
              </div>
            )}
            
            <div>
              <label className="block text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={() => handleFieldBlur('email')}
                  className={`input-field pl-10 ${fieldErrors.email ? 'border-red-500' : ''}`}
                  placeholder="guest@hatseykaleb.com"
                  required
                />
              </div>
              {fieldErrors.email && (
                <p className="text-red-500 text-sm mt-1">{fieldErrors.email}</p>
              )}
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Password</label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onBlur={() => handleFieldBlur('password')}
                  className={`input-field pl-10 pr-10 ${fieldErrors.password ? 'border-red-500' : ''}`}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {fieldErrors.password && (
                <p className="text-red-500 text-sm mt-1">{fieldErrors.password}</p>
              )}
            </div>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
            
            {isLogin && (
              <div className="text-right">
                <a href="#" className="text-sm text-luxury-gold hover:underline">
                  Forgot Password?
                </a>
              </div>
            )}
            
            <button 
              type="submit" 
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading || hasErrors()}
            >
              {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Register')}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-luxury-gold font-semibold hover:underline"
              >
                {isLogin ? 'Register' : 'Sign In'}
              </button>
            </p>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-gray-500 text-sm">
              Demo Credentials: <br />
              Email: admin@hatseykaleb.com <br />
              Password: password123
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;