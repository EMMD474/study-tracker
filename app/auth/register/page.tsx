"use client";

import React, { useState } from "react";
import Link from "next/link";
import AuthLayout from "@/components/auth/AuthLayout";
import FormField from "@/components/auth/FormField";
import PasswordInput from "@/components/auth/PasswordInput";
import AuthSubmitButton from "@/components/auth/AuthSubmitButton";
import SignIn from "@/components/auth/SignIn";
import { authApi } from "@/lib/api"
import { useRouter } from "next/navigation"
import { toast } from "sonner";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    authApi.register({ name, email, password })
      .then(() => {
        toast.success("Registration successful")
        router.push("/auth/login")
      })
      .catch((err) => {
        console.error("Registration failed:", err)
      })
  };

  return (
    <AuthLayout>
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-light tracking-[-0.025em] text-[#e8e6e0]">
          Create an account
        </h1>
        <p className="mt-2 text-sm text-[#5e5a52]">
          Start building your perfect study routine today.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <FormField
          id="name"
          type="text"
          label="Name"
          autoComplete="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />

        <FormField
          id="email"
          type="email"
          label="Email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />

        <PasswordInput
          id="password"
          label="Password"
          autoComplete="new-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />

        <AuthSubmitButton>Create Account</AuthSubmitButton>
      </form>

      {/* Divider */}
      <div className="my-8 flex items-center gap-4">
        <div className="h-px flex-1 bg-[#c8a96e]/8" />
        <span className="text-xs text-[#3a3830]">or</span>
        <div className="h-px flex-1 bg-[#c8a96e]/8" />
      </div>

      <div className="mb-8">
        <SignIn />
      </div>

      {/* Login link */}
      <p className="text-center text-sm text-[#5e5a52]">
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="font-medium text-[#c8a96e] transition-opacity hover:opacity-70"
        >
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
