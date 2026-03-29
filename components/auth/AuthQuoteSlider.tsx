"use client";

import { useState, useEffect } from "react";

const quotes = [
  {
    text: "Consistency is the foundation of every academic win.",
    subtext: "Daily progress, compounded.",
  },
  {
    text: "Focus on the process, not just the outcome.",
    subtext: "Master your schedule.",
  },
  {
    text: "Small steps today lead to big results tomorrow.",
    subtext: "Track every victory.",
  },
  {
    text: "Your future self will thank you for the work you do now.",
    subtext: "Stay on the streak.",
  },
];

export default function AuthQuoteSlider() {
  const [index, setIndex] = useState(0);
  const [stage, setStage] = useState<"visible" | "leaving" | "entering">("visible");

  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Start leaving
      setStage("leaving");

      // 2. Change content while invisible
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % quotes.length);
        setStage("entering");

        // 3. Become visible again
        setTimeout(() => {
          setStage("visible");
        }, 50); // Small buffer to ensure "entering" styles are applied
      }, 600); // Wait for leaving transition to finish
    }, 7000); // Total cycle time

    return () => clearInterval(interval);
  }, []);

  // Visual states mapping
  // - visible: opacity-100, translate-y-0
  // - leaving: opacity-0, translate-y-4 (slide down)
  // - entering: opacity-0, translate-y-[-10px] (start slightly above)
  
  const getStyles = () => {
    switch (stage) {
      case "leaving":
        return "opacity-0 translate-y-4 scale-[0.98]";
      case "entering":
        return "opacity-0 -translate-y-4 scale-[0.98]";
      case "visible":
      default:
        return "opacity-100 translate-y-0 scale-100";
    }
  };

  return (
    <div className="max-w-xs overflow-hidden">
      <div className={`transition-all duration-700 ease-out transform-gpu ${getStyles()}`}>
        <div className="mb-6 h-px w-10 bg-[#c8a96e]/40" />
        <blockquote className="text-3xl font-light leading-[1.3] tracking-[-0.02em] text-[#e8e6e0]">
          &ldquo;{quotes[index].text}&rdquo;
        </blockquote>
        <p className="mt-5 text-xs tracking-widest text-[#3a3830] uppercase">
          {quotes[index].subtext}
        </p>
      </div>
    </div>
  );
}

