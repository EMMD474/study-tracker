"use client";

import React, { useState } from "react";
import Link from "next/link";
import AuthLayout from "@/components/auth/AuthLayout";
import FormField from "@/components/auth/FormField";
import PasswordInput from "@/components/auth/PasswordInput";
import AuthSubmitButton from "@/components/auth/AuthSubmitButton";
import SignIn from "@/components/auth/SignIn";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const toastId = toast.loading("Signing in...");
    
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Invalid email or password", { id: toastId });
      } else {
        toast.success("Welcome back!", { id: toastId });
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error("An unexpected error occurred", { id: toastId });
      console.error("Login error:", error);
    }
  };

  return (
    <AuthLayout>
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
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          showForgotPassword
        />

        <AuthSubmitButton>Sign in</AuthSubmitButton>
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
    </AuthLayout>
  );
}