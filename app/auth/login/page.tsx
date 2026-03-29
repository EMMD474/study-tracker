"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // handle login logic
  };

  return (
    <main className="relative flex min-h-screen overflow-hidden bg-[#0a0a0a] text-[#e8e6e0]">

      {/* ── Ambient background ── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-[#c8a96e]/6 blur-[150px]" />
        <div className="absolute bottom-0 -left-20 h-[400px] w-[400px] rounded-full bg-[#1d9e75]/5 blur-[130px]" />
        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(200,169,110,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,110,0.6) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* ── Left panel — branding ── */}
      <div className="relative z-10 hidden w-[45%] flex-col justify-between border-r border-[#c8a96e]/8 px-14 py-12 lg:flex">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="28" height="28" rx="6" fill="#c8a96e" fillOpacity="0.12" />
            <rect x="6" y="8" width="16" height="2" rx="1" fill="#c8a96e" />
            <rect x="6" y="13" width="11" height="2" rx="1" fill="#c8a96e" fillOpacity="0.7" />
            <rect x="6" y="18" width="7" height="2" rx="1" fill="#c8a96e" fillOpacity="0.4" />
          </svg>
          <span className="text-sm font-semibold tracking-widest text-[#c8a96e] uppercase transition-opacity group-hover:opacity-70">
            Study Tracker
          </span>
        </Link>

        {/* Center quote / tagline */}
        <div className="max-w-xs">
          <div className="mb-6 h-px w-10 bg-[#c8a96e]/40" />
          <blockquote className="text-3xl font-light leading-[1.3] tracking-[-0.02em] text-[#e8e6e0]">
            "Consistency is the foundation of every academic win."
          </blockquote>
          <p className="mt-5 text-xs tracking-widest text-[#3a3830] uppercase">
            Daily progress, compounded.
          </p>
        </div>

        {/* Bottom stat row */}
        <div className="flex gap-10">
          {[
            { val: "Priority", label: "scheduling" },
            { val: "Streaks", label: "tracked" },
            { val: "10 PM", label: "reminders" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-sm font-semibold text-[#c8a96e]">{s.val}</p>
              <p className="text-xs text-[#3a3830] uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right panel — form ── */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-12 sm:px-12">

        {/* Mobile logo */}
        <Link href="/" className="mb-10 flex items-center gap-3 lg:hidden">
          <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="28" height="28" rx="6" fill="#c8a96e" fillOpacity="0.12" />
            <rect x="6" y="8" width="16" height="2" rx="1" fill="#c8a96e" />
            <rect x="6" y="13" width="11" height="2" rx="1" fill="#c8a96e" fillOpacity="0.7" />
            <rect x="6" y="18" width="7" height="2" rx="1" fill="#c8a96e" fillOpacity="0.4" />
          </svg>
          <span className="text-sm font-semibold tracking-widest text-[#c8a96e] uppercase">
            Study Tracker
          </span>
        </Link>

        <div className="w-full max-w-sm">

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl font-light tracking-[-0.025em] text-[#e8e6e0]">
              Welcome back
            </h1>
            <p className="mt-2 text-sm text-[#5e5a52]">
              Sign in to continue your study streak.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Email field */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-xs font-medium tracking-widest text-[#7a7060] uppercase">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-[#c8a96e]/12 bg-[#0f0e0c] px-4 py-3 text-sm text-[#e8e6e0] placeholder-[#3a3830] outline-none ring-0 transition-all duration-200 focus:border-[#c8a96e]/40 focus:bg-[#111009]"
              />
            </div>

            {/* Password field */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-xs font-medium tracking-widest text-[#7a7060] uppercase">
                  Password
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-xs text-[#5e5a52] transition-colors hover:text-[#c8a96e]"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-[#c8a96e]/12 bg-[#0f0e0c] px-4 py-3 pr-11 text-sm text-[#e8e6e0] placeholder-[#3a3830] outline-none transition-all duration-200 focus:border-[#c8a96e]/40 focus:bg-[#111009]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#3a3830] transition-colors hover:text-[#7a7060]"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    // Eye-off icon
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    // Eye icon
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="group mt-2 flex w-full items-center justify-center gap-2.5 rounded-lg bg-[#c8a96e] px-6 py-3.5 text-sm font-semibold text-[#0a0a0a] shadow-[0_0_40px_-10px_rgba(200,169,110,0.4)] transition-all duration-300 hover:shadow-[0_0_60px_-10px_rgba(200,169,110,0.6)] hover:scale-[1.01] active:scale-[0.99]"
            >
              Sign in
              <svg
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-[#c8a96e]/8" />
            <span className="text-xs text-[#3a3830]">or</span>
            <div className="h-px flex-1 bg-[#c8a96e]/8" />
          </div>

          {/* Register link */}
          <p className="text-center text-sm text-[#5e5a52]">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/register"
              className="font-medium text-[#c8a96e] transition-opacity hover:opacity-70"
            >
              Create one free
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="absolute bottom-6 text-xs text-[#2a2820]">
          © {new Date().getFullYear()} Study Tracker
        </p>
      </div>
    </main>
  );
}