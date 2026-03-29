import { InputHTMLAttributes } from "react";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  /** Optional node rendered to the right of the label (e.g. "Forgot?" link) */
  labelAction?: React.ReactNode;
}

export default function FormField({
  id,
  label,
  labelAction,
  className,
  ...inputProps
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="text-xs font-medium tracking-widest text-[#7a7060] uppercase"
        >
          {label}
        </label>
        {labelAction}
      </div>
      <input
        id={id}
        className={`w-full rounded-lg border border-[#c8a96e]/12 bg-[#0f0e0c] px-4 py-3 text-sm text-[#e8e6e0] placeholder-[#3a3830] outline-none ring-0 transition-all duration-200 focus:border-[#c8a96e]/40 focus:bg-[#111009] ${className ?? ""}`}
        {...inputProps}
      />
    </div>
  );
}
