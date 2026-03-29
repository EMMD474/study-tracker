import { ReactNode } from "react";
import AuthLogo from "@/components/auth/AuthLogo";

import AuthQuoteSlider from "@/components/auth/AuthQuoteSlider";

interface AuthLayoutProps {
  children: ReactNode;
  /** Footer copyright year is computed automatically */
}

const stats = [
  { val: "Priority", label: "scheduling" },
  { val: "Streaks", label: "tracked" },
  { val: "10 PM", label: "reminders" },
];

export default function AuthLayout({ children }: AuthLayoutProps) {
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

        <AuthLogo />

        {/* Center quote / tagline */}
        <AuthQuoteSlider />

        {/* Bottom stat row */}
        <div className="flex gap-10">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-sm font-semibold text-[#c8a96e]">{s.val}</p>
              <p className="text-xs text-[#3a3830] uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right panel — form slot ── */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-12 sm:px-12">

        {/* Mobile logo */}
        <div className="mb-10 lg:hidden">
          <AuthLogo size={24} />
        </div>

        <div className="w-full max-w-sm">
          {children}
        </div>

        {/* Footer */}
        <p className="absolute bottom-6 text-xs text-[#2a2820]">
          © {new Date().getFullYear()} Study Tracker
        </p>
      </div>
    </main>
  );
}
