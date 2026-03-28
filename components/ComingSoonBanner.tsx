export default function ComingSoonBanner() {
  return (
    <div className="relative z-50 flex w-full items-center justify-center border-b border-[#c8a96e]/15 bg-[#0f0f0f]/80 px-4 py-2.5 text-xs text-[#a09880] backdrop-blur-md sm:text-sm">
      <div className="flex items-center gap-2.5">
        {/* Pulsing indicator dot */}
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c8a96e] opacity-60"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#c8a96e]"></span>
        </span>
        
        <p className="tracking-wide">
          <strong className="font-semibold text-[#c8a96e]">Median Stratum</strong> is currently in active development. Features will be rolling out soon.
        </p>
      </div>
    </div>
  );
}
