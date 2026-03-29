"use client";

import { useState } from "react";
import { InputHTMLAttributes } from "react";
import Link from "next/link";

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  showForgotPassword?: boolean;
}

export default function PasswordInput({
  id,
  label,
  showForgotPassword = false,
  className,
  ...inputProps
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="text-xs font-medium tracking-widest text-[#7a7060] uppercase"
        >
          {label}
        </label>
        {showForgotPassword && (
          <Link
            href="/auth/forgot-password"
            className="text-xs text-[#5e5a52] transition-colors hover:text-[#c8a96e]"
          >
            Forgot?
          </Link>
        )}
      </div>
      <div className="relative">
        <input
          id={id}
          type={showPassword ? "text" : "password"}
          className={`w-full rounded-lg border border-[#c8a96e]/12 bg-[#0f0e0c] px-4 py-3 pr-11 text-sm text-[#e8e6e0] placeholder-[#3a3830] outline-none transition-all duration-200 focus:border-[#c8a96e]/40 focus:bg-[#111009] ${className ?? ""}`}
          {...inputProps}
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
  );
}
