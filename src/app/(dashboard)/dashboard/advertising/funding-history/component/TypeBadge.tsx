import React from "react";
import { ArrowUp } from "lucide-react";

export default function TypeBadge({ label = "Top-up" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-[var(--color-info-bg)] text-[var(--color-info-text)] text-xs sm:text-sm font-medium">
      <ArrowUp size={12} className="sm:w-3.5 sm:h-3.5" />
      {label}
    </span>
  );
}