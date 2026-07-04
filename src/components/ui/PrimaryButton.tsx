import { ButtonHTMLAttributes } from "react";

export default function PrimaryButton({
  children,
  className = "",
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      className={`body-medium w-full rounded-[var(--btn-radius)] transition-colors ${className}`}
      style={{
        height: "var(--btn-primary-height)",
        padding: "var(--btn-primary-padding-y) var(--btn-primary-padding-x)",
        background: "var(--color-primary)",
        color: "var(--color-on-primary)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "var(--color-primary-hover)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "var(--color-primary)";
      }}
    >
      {children}
    </button>
  );
}
