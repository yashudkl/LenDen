
import React, { useState } from 'react';
import TextLogo from '../components/TextLogo/TextLogo';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { useDispatch } from "react-redux"
import authService from "../../supbase/auth";
import { login as storeLogin } from '../feature/auth/authSlice'
export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()
  const [error, setError] = useState("")

  const login = async (data) => {
    setError("")
    try {
      const { user } = await authService.login(data)
      if (!user) {
        setError("Unable to sign in. Please try again.")
        return
      }

      dispatch(storeLogin(user))
      navigate('/')
    } catch (authError) {
      setError(authError.message || "Unable to sign in. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-lenden-bg-page flex items-center justify-center p-4">
      {/* Card Container */}
      <div className="w-full max-w-md bg-lenden-bg-card rounded-2xl shadow-xl border border-lenden-border-light p-8 space-y-6">

        {/* Branding & Header */}
        <div className="text-center space-y-2">
          {/* Brand Logo Badge */}
          <TextLogo />
          <h1 className="text-2xl font-bold tracking-tight text-lenden-text-dark">
            Sign in to LenDen
          </h1>
          <p className="text-sm text-lenden-text-muted">
            Track and manage your lent and borrowed money
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit(login)}>
          {error && (
            <p
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
            >
              {error}
            </p>
          )}

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
              aria-invalid={errors.email ? "true" : "false"}
              {...register("email", {
                required: "Email address is required",
                validate: {
                  matchPattern: (value) => {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value) ||
                      "Email address must be a valid address"
                  }
                }
              })}
              className="w-full px-4 py-2.5 rounded-lg border border-lenden-border-light text-lenden-text-dark text-sm placeholder-lenden-text-muted focus:outline-none focus:ring-2 focus:ring-lenden-border-focus focus:border-lenden-border-focus transition-all duration-150"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
            )}
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
              aria-invalid={errors.password ? "true" : "false"}
              {...register("password",{
                required: "Password is required",
              })}
              className="w-full px-4 py-2.5 rounded-lg border border-lenden-border-light text-lenden-text-dark text-sm placeholder-lenden-text-muted focus:outline-none focus:ring-2 focus:ring-lenden-border-focus focus:border-lenden-border-focus transition-all duration-150"
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                name="rememberMe"
              
                
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
            disabled={isSubmitting}
            className="w-full py-2.5 px-4 bg-lenden-primary hover:bg-lenden-primary-hover active:bg-lenden-primary-active text-white font-medium text-sm rounded-lg shadow-sm hover:shadow transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-lenden-primary focus:ring-offset-2"
          >
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        {/* Footer Link */}
        <div className="text-center pt-2 border-t border-lenden-border-light">
          <p className="text-xs sm:text-sm text-lenden-text-muted">
            Don't have an account yet?{' '}
            <NavLink
              to="/signup"
              className="font-semibold text-lenden-primary hover:text-lenden-primary-hover hover:underline"
            >
              Sign up
            </NavLink>
          </p>
        </div>

      </div>
    </div>
  );
}