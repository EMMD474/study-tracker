import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-[#0a0a0a] text-[#e8e6e0] font-[family-name:var(--font-geist-sans)]">

      {/* ── Ambient background ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Large warm arc at top-right */}
        <div className="absolute -top-40 -right-40 h-[700px] w-[700px] rounded-full bg-[#c8a96e]/8 blur-[160px]" />
        {/* Cool teal hint bottom-left */}
        <div className="absolute bottom-0 -left-32 h-[500px] w-[500px] rounded-full bg-[#1d9e75]/6 blur-[140px]" />
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(200,169,110,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,110,0.5) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        {/* Horizontal rule lines for depth */}
        <div className="absolute left-0 right-0 top-[28%] h-px bg-gradient-to-r from-transparent via-[#c8a96e]/15 to-transparent" />
        <div className="absolute left-0 right-0 top-[70%] h-px bg-gradient-to-r from-transparent via-[#c8a96e]/8 to-transparent" />
      </div>

      {/* ── Navigation ── */}
      <nav className="relative z-20 flex items-center justify-between border-b border-[#c8a96e]/10 px-6 py-5 sm:px-12">
        <div className="flex items-center gap-3">
          {/* Logo mark */}
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#c8a96e]/10 border border-[#c8a96e]/20">
            <span className="text-xs font-bold tracking-tighter text-[#c8a96e]">MS</span>
          </div>
          <span className="text-sm font-semibold tracking-widest text-[#c8a96e] uppercase">
            Median Stratum
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/auth/login"
            className="rounded-md px-4 py-2 text-sm font-medium text-[#a09880] transition-colors hover:text-[#e8e6e0]"
          >
            Sign in
          </Link>
          <Link
            href="/auth/register"
            className="rounded-md border border-[#c8a96e]/30 bg-[#c8a96e]/8 px-4 py-2 text-sm font-medium text-[#c8a96e] transition-all hover:bg-[#c8a96e]/15 hover:border-[#c8a96e]/50"
          >
            Get started
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-24 text-center sm:px-12">

        {/* Status badge */}
        <div className="mb-10 inline-flex items-center gap-2.5 rounded-full border border-[#c8a96e]/20 bg-[#c8a96e]/6 px-5 py-2 text-xs font-medium tracking-widest text-[#c8a96e] uppercase">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#c8a96e]" />
          Academic Progress System
        </div>

        {/* Headline — editorial style with weight contrast */}
        <h1 className="mb-6 max-w-4xl text-[clamp(2.8rem,8vw,6rem)] font-light leading-[1.05] tracking-[-0.03em] text-[#e8e6e0]">
          Every subject.{" "}
          <br className="hidden sm:block" />
          Every{" "}
          <em className="not-italic font-semibold text-[#c8a96e]">session</em>.{" "}
          <br className="hidden sm:block" />
          Accounted for.
        </h1>

        {/* Subtitle */}
        <p className="mb-12 max-w-xl text-base leading-relaxed text-[#7a7060] sm:text-lg">
          Build structured study plans around your actual workload. Track what you complete, what you missed, and where your time goes — one day at a time.
        </p>

        {/* CTA row */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-5">
          <Link
            href="/auth/register"
            className="group inline-flex items-center gap-2.5 rounded-full bg-[#c8a96e] px-8 py-3.5 text-sm font-semibold text-[#0a0a0a] shadow-[0_0_50px_-8px_rgba(200,169,110,0.5)] transition-all duration-300 hover:shadow-[0_0_70px_-8px_rgba(200,169,110,0.7)] hover:scale-[1.02]"
          >
            Start for free
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>

          <Link
            href="/auth/login"
            className="inline-flex items-center gap-2 rounded-full border border-[#e8e6e0]/10 px-8 py-3.5 text-sm font-medium text-[#a09880] transition-all duration-300 hover:border-[#e8e6e0]/20 hover:text-[#e8e6e0]"
          >
            I have an account
          </Link>
        </div>
      </section>

      {/* ── Feature strip — 3 columns ── */}
      <section className="relative z-10 border-t border-[#c8a96e]/8 px-6 py-16 sm:px-12">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-px sm:grid-cols-3">
          {[
            {
              number: "01",
              label: "Plan",
              description:
                "Add your subjects, set time allocations, and assign priorities. We build your daily schedule automatically.",
            },
            {
              number: "02",
              label: "Track",
              description:
                "Log sessions as you go. Each completion updates your streak and marks progress across the week.",
            },
            {
              number: "03",
              label: "Stay on track",
              description:
                "Smart reminders fire at 10 PM if sessions are still pending. Nothing slips through at midnight.",
            },
          ].map((item) => (
            <div
              key={item.number}
              className="group relative border border-[#c8a96e]/8 bg-[#0f0f0f] p-8 transition-colors hover:bg-[#111008]"
            >
              {/* Corner accent */}
              <div className="absolute right-0 top-0 h-px w-12 bg-[#c8a96e]/25 transition-all duration-300 group-hover:w-full" />

              <span className="mb-5 block text-xs font-medium tracking-[0.2em] text-[#c8a96e]/50">
                {item.number}
              </span>
              <h3 className="mb-3 text-lg font-semibold text-[#e8e6e0]">
                {item.label}
              </h3>
              <p className="text-sm leading-relaxed text-[#5e5a52]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Stat strip ── */}
      <section className="relative z-10 border-t border-[#c8a96e]/8 px-6 py-14 sm:px-12">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 sm:flex-row sm:justify-around sm:gap-0">
          {[
            { value: "Priority-aware", unit: "", label: "scheduling" },
            { value: "22:00", unit: "", label: "smart reminder threshold" },
            { value: "5 phases", unit: "", label: "of planned features" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center">
              <span className="text-3xl font-semibold tracking-tight text-[#c8a96e]">
                {stat.value}
                <span className="ml-0.5 text-sm font-normal text-[#c8a96e]/60">
                  {stat.unit}
                </span>
              </span>
              <span className="mt-1.5 text-xs tracking-widest text-[#5e5a52] uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative z-10 border-t border-[#c8a96e]/8 px-6 py-6 sm:px-12">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <p className="text-xs text-[#3a3830]">
            © {new Date().getFullYear()} Median Stratum
          </p>
          <p className="text-xs text-[#3a3830]">
            Built for students who mean it.
          </p>
        </div>
      </footer>
    </main>
  );
}