import React from "react";

export default function SummaryCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex-1 flex items-center justify-between gap-3 px-5 py-4 rounded-xl border border-[var(--color-line)]">
      <div className="flex items-center gap-3">
        <span className="w-8 h-8 rounded-lg bg-[var(--color-surface)] flex items-center justify-center text-[var(--color-primary-text-500)] shrink-0">
          {icon}
        </span>
        <span className="body-sm-medium text-[var(--color-primary-text-500)]">
          {label}
        </span>
      </div>
      <span className="body-l-medium text-[var(--color-primary-text-500)]">
        {value}
      </span>
    </div>
  );
}