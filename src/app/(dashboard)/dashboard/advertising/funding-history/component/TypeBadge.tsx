import React from "react";
import { ArrowUp } from "lucide-react";

export default function TypeBadge({ label = "Top-up" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--color-info-bg)] text-[var(--color-info-text)] body-sm-medium">
      <ArrowUp size={14} />
      {label}
    </span>
  );
}