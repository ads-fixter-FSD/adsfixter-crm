import type { ButtonHTMLAttributes, ReactNode } from "react";

type FlatButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export function FlatButton({
  children,
  className = "",
  type = "button",
  ...props
}: FlatButtonProps) {
  return (
    <button
      type={type}
      className={`
        inline-flex h-10 items-center justify-center gap-2
        rounded-lg border border-[var(--Color-Stroke,#E9E9E9)]
        bg-white px-5 py-2.5
        body-sm-medium text-[var(--primary-text)]
        transition-colors
        hover:bg-[var(--surface)]
        active:bg-[var(--surface-hover)]
        disabled:cursor-not-allowed disabled:opacity-60
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
