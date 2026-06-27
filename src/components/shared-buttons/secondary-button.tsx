import type { ButtonHTMLAttributes, ReactNode } from "react";

type SecondaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export function SecondaryButton({ children, className = "", type = "button", ...props }: SecondaryButtonProps) {
  return (
    <button
      className={`inline-flex min-h-9 items-center justify-center gap-2 rounded-lg border border-[var(--brand-orange)] bg-[var(--white)] px-4 py-2 text-sm font-light leading-tight text-[var(--brand-orange)] transition hover:bg-[var(--brand-orange-soft)] disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
