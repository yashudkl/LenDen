
import { useState } from "react";
import { Link } from "react-router-dom";
import TextLogo from "../TextLogo/TextLogo"; // adjust path/export to match your project

const inputClass =
  "w-full rounded-lg border border-lenden-border-light bg-lenden-bg-page px-4 py-3 text-lenden-text-dark placeholder:text-lenden-text-muted/70 outline-none transition focus:border-lenden-border-focus focus:ring-2 focus:ring-lenden-primary/25";

const labelClass = "mb-2 block text-sm font-semibold text-lenden-text-dark";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password.length < 8) {
      return setError("Password must be at least 8 characters.");
    }
    if (form.password !== form.confirmPassword) {
      return setError("Passwords don't match.");
    }
    if (!form.terms) {
      return setError("Please accept the terms to continue.");
    }

    setLoading(true);
    try {
      // TODO: call your signup logic here (Appwrite account.create, etc.)
      // await signup(form.name, form.email, form.password);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
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

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div>
            <label htmlFor="name" className={labelClass}>
              Full name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="John Doe"
              value={form.name}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="email" className={labelClass}>
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="name@company.com"
              value={form.email}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="password" className={labelClass}>
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="At least 8 characters"
              value={form.password}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className={labelClass}>
              Confirm password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              placeholder="Re-enter your password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          <label className="flex cursor-pointer items-start gap-2 text-sm text-lenden-text-muted">
            <input
              type="checkbox"
              name="terms"
              checked={form.terms}
              onChange={handleChange}
              className="mt-0.5 h-4 w-4 rounded border-lenden-border-light accent-lenden-primary"
            />
            <span>
              I agree to the{" "}
              <Link to="/terms" className="font-semibold text-lenden-primary-hover hover:underline">
                Terms
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="font-semibold text-lenden-primary-hover hover:underline">
                Privacy Policy
              </Link>
            </span>
          </label>

          {error && (
            <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-lenden-primary py-3 font-semibold text-white transition hover:bg-lenden-primary-hover active:bg-lenden-primary-active disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <div className="mt-6 border-t border-lenden-border-light pt-5 text-center text-sm text-lenden-text-muted">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-lenden-primary-hover hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
