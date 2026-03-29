import Link from "next/link";

interface AuthLogoProps {
  size?: number;
  className?: string;
}

export default function AuthLogo({ size = 28, className = "" }: AuthLogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-3 group ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="28" height="28" rx="6" fill="#c8a96e" fillOpacity="0.12" />
        <rect x="6" y="8" width="16" height="2" rx="1" fill="#c8a96e" />
        <rect x="6" y="13" width="11" height="2" rx="1" fill="#c8a96e" fillOpacity="0.7" />
        <rect x="6" y="18" width="7" height="2" rx="1" fill="#c8a96e" fillOpacity="0.4" />
      </svg>
      <span className="text-sm font-semibold tracking-widest text-[#c8a96e] uppercase transition-opacity group-hover:opacity-70">
        Study Tracker
      </span>
    </Link>
  );
}
