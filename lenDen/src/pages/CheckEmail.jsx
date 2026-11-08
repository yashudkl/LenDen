import React, { useState } from 'react'
import { useLocation, NavLink } from 'react-router-dom'
import { Mail, ArrowLeft } from 'lucide-react'
import TextLogo from '../components/TextLogo/TextLogo'
import { supabase } from '../../supbase/client'

export default function CheckEmail() {
  const email = useLocation().state?.email
  const [msg, setMsg] = useState("")
  const [isError, setIsError] = useState(false)
  const [loading, setLoading] = useState(false)

  const resend = async () => {
    if (!email) return
    setLoading(true)
    setMsg("")

    const { error } = await supabase.auth.resend({ type: 'signup', email })

    setIsError(!!error)
    setMsg(error ? error.message : "Confirmation email sent again.")
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-lenden-bg-page flex items-center justify-center p-4">
      {/* Card Container */}
      <div className="w-full max-w-md bg-lenden-bg-card rounded-2xl shadow-xl border border-lenden-border-light p-8 space-y-6 text-center">

        {/* Branding & Header */}
        <div className="space-y-3">
          <TextLogo />

          {/* Mail icon badge */}
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-lenden-primary/10 text-lenden-primary">
            <Mail size={28} strokeWidth={1.5} />
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-lenden-text-dark">
            Check your email
          </h1>

          <p className="text-sm text-lenden-text-muted">
            We sent a confirmation link to
          </p>

          {/* Email pill */}
          <div className="mx-auto inline-flex max-w-full items-center gap-2 rounded-lg border border-lenden-border-light bg-lenden-bg-page px-3 py-2">
            <Mail size={16} strokeWidth={1.5} className="shrink-0 text-lenden-text-blue" />
            <span className="truncate text-sm font-semibold text-lenden-text-dark">
              {email || 'your email'}
            </span>
          </div>

          <p className="text-sm text-lenden-text-muted">
            Click it to activate your account, then sign in.
          </p>
        </div>

        {/* Status message (resend success or error) */}
        {msg && (
          <p
            role="status"
            className={`rounded-lg border px-3 py-2 text-sm ${
              isError
                ? 'border-lenden-text-red/30 bg-lenden-text-red/10 text-lenden-text-red'
                : 'border-lenden-primary/30 bg-lenden-primary/10 text-lenden-primary-active'
            }`}
          >
            {msg}
          </p>
        )}

        {/* Resend button */}
        {email && (
          <button
            type="button"
            onClick={resend}
            disabled={loading}
            className="w-full py-2.5 px-4 bg-lenden-primary hover:bg-lenden-primary-hover active:bg-lenden-primary-active text-white font-medium text-sm rounded-lg shadow-sm hover:shadow transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-lenden-border-focus focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Sending...' : 'Resend email'}
          </button>
        )}

        {/* Helper tip */}
        <p className="text-xs text-lenden-text-blue">
          Didn't get it? Check your spam folder or try resending.
        </p>

        {/* Footer Link */}
        <div className="pt-2 border-t border-lenden-border-light">
          <NavLink
            to="/login"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-lenden-primary hover:text-lenden-primary-hover hover:underline transition"
          >
            <ArrowLeft size={16} strokeWidth={1.5} />
            Back to sign in
          </NavLink>
        </div>

      </div>
    </div>
  )
}