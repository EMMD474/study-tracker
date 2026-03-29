interface AuthSubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function AuthSubmitButton({
  children,
  className,
  ...props
}: AuthSubmitButtonProps) {
  return (
    <button
      type="submit"
      className={`group mt-2 flex w-full items-center justify-center gap-2.5 rounded-lg bg-[#c8a96e] px-6 py-3.5 text-sm font-semibold text-[#0a0a0a] shadow-[0_0_40px_-10px_rgba(200,169,110,0.4)] transition-all duration-300 hover:shadow-[0_0_60px_-10px_rgba(200,169,110,0.6)] hover:scale-[1.01] active:scale-[0.99] ${className ?? ""}`}
      {...props}
    >
      {children}
      <svg
        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    </button>
  );
}
