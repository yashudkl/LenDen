import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import TextLogo from "../components/TextLogo/TextLogo"; // adjust path/export to match your project
import authService from "../../supbase/auth";
import { login as storeLogin } from "../feature/auth/authSlice";
 
const inputClass =
  "w-full rounded-lg border border-lenden-border-light bg-lenden-bg-page px-4 py-3 text-lenden-text-dark placeholder:text-lenden-text-muted/70 outline-none transition focus:border-lenden-border-focus focus:ring-2 focus:ring-lenden-primary/25";
 
const inputErrorClass = "border-red-500 focus:border-red-500 focus:ring-red-500/25";
 
const labelClass = "mb-2 block text-sm font-semibold text-lenden-text-dark";
 
const fieldErrorClass = "mt-1 text-sm text-red-600";
 
export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
 
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });
 
  const signup = async ({ confirmPassword, terms, ...data }) => {
    setError(null);
    try {
      const { user } = await authService.signUp(data);
      if (user) {
        // TODO: if Supabase email confirmation is enabled, `user` can come
        // back without an active session. In that case, show a "check your
        // email" message here instead of logging in and redirecting.
        dispatch(storeLogin(user));
        navigate("/");
      }
    } catch (err) {
      setError(err?.message || "Something went wrong. Please try again.");
    }
  };
 
  return (
    <div className="flex min-h-screen items-center justify-center bg-lenden-bg-page px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-lenden-bg-card p-8 shadow-lg shadow-slate-900/10">
        <div className="mb-8 flex flex-col items-center text-center">
          <TextLogo />
          <h1 className="mt-4 text-2xl font-bold text-lenden-text-dark">
            Create your LenDen account
          </h1>
          <p className="mt-1 text-sm text-lenden-text-muted">
            Track and manage your lent and borrowed money
          </p>
        </div>
 
        <form onSubmit={handleSubmit(signup)} className="space-y-5" noValidate>
          {/* Full name */}
          <div>
            <label htmlFor="name" className={labelClass}>
              Full name
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              aria-invalid={errors.name ? "true" : "false"}
              aria-describedby={errors.name ? "name-error" : undefined}
              {...register("name", {
                required: "Name is required",
                validate: (value) =>
                  value.trim().length > 0 || "Name is required",
              })}
              className={`${inputClass} ${errors.name ? inputErrorClass : ""}`}
            />
            {errors.name && (
              <p id="name-error" className={fieldErrorClass}>
                {errors.name.message}
              </p>
            )}
          </div>
 
          {/* Email */}
          <div>
            <label htmlFor="email" className={labelClass}>
              Email address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : undefined}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                  message: "Enter a valid email address",
                },
              })}
              className={`${inputClass} ${errors.email ? inputErrorClass : ""}`}
            />
            {errors.email && (
              <p id="email-error" className={fieldErrorClass}>
                {errors.email.message}
              </p>
            )}
          </div>
 
          {/* Password */}
          <div>
            <label htmlFor="password" className={labelClass}>
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              aria-invalid={errors.password ? "true" : "false"}
              aria-describedby={errors.password ? "password-error" : undefined}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Use at least 8 characters",
                },
              })}
              className={`${inputClass} ${errors.password ? inputErrorClass : ""}`}
            />
            {errors.password && (
              <p id="password-error" className={fieldErrorClass}>
                {errors.password.message}
              </p>
            )}
          </div>
 
          {/* Confirm password */}
          <div>
            <label htmlFor="confirmPassword" className={labelClass}>
              Confirm password
            </label>
            <input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              aria-invalid={errors.confirmPassword ? "true" : "false"}
              aria-describedby={
                errors.confirmPassword ? "confirmPassword-error" : undefined
              }
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === getValues("password") || "Passwords do not match",
              })}
              className={`${inputClass} ${
                errors.confirmPassword ? inputErrorClass : ""
              }`}
            />
            {errors.confirmPassword && (
              <p id="confirmPassword-error" className={fieldErrorClass}>
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
 
          {/* Terms */}
          <div>
            <label className="flex cursor-pointer items-start gap-2 text-sm text-lenden-text-muted">
              <input
                type="checkbox"
                aria-invalid={errors.terms ? "true" : "false"}
                aria-describedby={errors.terms ? "terms-error" : undefined}
                {...register("terms", {
                  required: "You must accept the Terms and Privacy Policy",
                })}
                className="mt-0.5 h-4 w-4 rounded border-lenden-border-light accent-lenden-primary"
              />
              <span>
                I agree to the{" "}
                <Link
                  to="/terms"
                  className="font-semibold text-lenden-primary-hover hover:underline"
                >
                  Terms
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy"
                  className="font-semibold text-lenden-primary-hover hover:underline"
                >
                  Privacy Policy
                </Link>
              </span>
            </label>
            {errors.terms && (
              <p id="terms-error" className={fieldErrorClass}>
                {errors.terms.message}
              </p>
            )}
          </div>
 
          {/* Server error */}
          {error && (
            <p
              role="alert"
              className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600"
            >
              {error}
            </p>
          )}
 
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-lenden-primary py-3 font-semibold text-white transition hover:bg-lenden-primary-hover active:bg-lenden-primary-active disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Creating account..." : "Create account"}
          </button>
        </form>
 
        <div className="mt-6 border-t border-lenden-border-light pt-5 text-center text-sm text-lenden-text-muted">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-lenden-primary-hover hover:underline"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
