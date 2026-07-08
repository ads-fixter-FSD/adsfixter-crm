import React from "react";
import { ArrowUp } from "lucide-react";

export default function TypeBadge({ label = "Top-up" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[var(--color-info-bg)] text-[var(--color-info-text)] text-xs font-medium">
      <ArrowUp size={12} />
      {label}
    </span>
  );
}