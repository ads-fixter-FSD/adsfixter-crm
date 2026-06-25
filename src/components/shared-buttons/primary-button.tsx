import type { ButtonHTMLAttributes, ReactNode } from "react";

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export function PrimaryButton({ children, className = "", type = "button", ...props }: PrimaryButtonProps) {
  return (
    <button
      className={`inline-flex min-h-9 items-center justify-center gap-2 rounded-lg border border-[var(--brand-orange)] bg-[var(--brand-orange)] px-4 py-2 text-sm font-semibold leading-tight text-white transition hover:border-[#d63a05] hover:bg-[#d63a05] disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
