import type { ButtonHTMLAttributes, ReactNode } from "react";

type SecondaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export function SecondaryButtonWhite({ children, className = "", type = "button", ...props }: SecondaryButtonProps) {
  return (
    <button
      className={`btn btn-secondary !bg-transparent !text-[var(--color-primary-text-500)] !border-[#E9E9E9] transition disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
