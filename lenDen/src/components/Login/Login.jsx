    

import React, { useState } from 'react';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Logging in with:', formData);
    // Add your auth API call here
  };

  return (
    <div className="min-h-screen bg-lenden-bg-page flex items-center justify-center p-4">
      {/* Card Container */}
      <div className="w-full max-w-md bg-lenden-bg-card rounded-2xl shadow-xl border border-lenden-border-light p-8 space-y-6">
        
        {/* Branding & Header */}
        <div className="text-center space-y-2">
          {/* Brand Logo Badge */}
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-lenden-primary text-white font-bold text-xl shadow-md shadow-lenden-primary/20 mb-2">
            LD
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-lenden-text-dark">
            Sign in to LenDen
          </h1>
          <p className="text-sm text-lenden-text-muted">
            Track and manage your lent and borrowed money
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          
          {/* Email Input */}
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-semibold text-lenden-text-dark mb-1.5"
            >
              Email address
            </label>
            <input 
              type="email" 
              id="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@company.com" 
              required 
              className="w-full px-4 py-2.5 rounded-lg border border-lenden-border-light text-lenden-text-dark text-sm placeholder-lenden-text-muted focus:outline-none focus:ring-2 focus:ring-lenden-border-focus focus:border-lenden-border-focus transition-all duration-150"
            />
          </div>

          {/* Password Input */}
          <div>
            <label 
              htmlFor="password" 
              className="block text-sm font-semibold text-lenden-text-dark mb-1.5"
            >
              Password
            </label>
            <input 
              type="password" 
              id="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••" 
              required 
              className="w-full px-4 py-2.5 rounded-lg border border-lenden-border-light text-lenden-text-dark text-sm placeholder-lenden-text-muted focus:outline-none focus:ring-2 focus:ring-lenden-border-focus focus:border-lenden-border-focus transition-all duration-150"
            />
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input 
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="w-4 h-4 rounded text-lenden-primary border-lenden-border-light focus:ring-lenden-primary focus:ring-offset-0 transition"
              />
              <span className="text-lenden-text-muted text-xs sm:text-sm">
                Remember me
              </span>
            </label>
            <a 
              href="#forgot-password" 
              className="text-xs sm:text-sm font-semibold text-lenden-primary hover:text-lenden-primary-hover hover:underline transition"
            >
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full py-2.5 px-4 bg-lenden-primary hover:bg-lenden-primary-hover active:bg-lenden-primary-active text-white font-medium text-sm rounded-lg shadow-sm hover:shadow transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-lenden-primary focus:ring-offset-2"
          >
            Sign in
          </button>
        </form>

        {/* Footer Link */}
        <div className="text-center pt-2 border-t border-lenden-border-light">
          <p className="text-xs sm:text-sm text-lenden-text-muted">
            Don't have an account yet?{' '}
            <a 
              href="#signup" 
              className="font-semibold text-lenden-primary hover:text-lenden-primary-hover hover:underline"
            >
              Sign up
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}