import { Ban, RefreshCcw, Circle } from "lucide-react";
import type { AdAccountStatus } from "@/types/businessPortfolios";

const STYLES: Record<
  AdAccountStatus,
  { bg: string; text: string; label: string; icon: "dot" | "ban" | "refresh" }
> = {
  active: {
    bg: "var(--color-success-bg)",
    text: "var(--color-success-text)",
    label: "Active",
    icon: "dot",
  },
  disabled: {
    bg: "var(--color-danger-bg)",
    text: "var(--color-danger-text)",
    label: "Disable",
    icon: "ban",
  },
  inactive: {
    bg: "var(--color-primary-soft)",
    text: "var(--color-primary)",
    label: "Inactive",
    icon: "dot",
  },
  "request-pending": {
    bg: "var(--color-primary-soft)",
    text: "var(--color-primary)",
    label: "Request Pending",
    icon: "refresh",
  },
};

export default function AdAccountStatusBadge({
  status,
}: {
  status: AdAccountStatus;
}) {
  const style = STYLES[status];
  return (
    <span
      className="flex items-center gap-1.5 rounded-full px-3 py-1 body-xsm-medium whitespace-nowrap"
      style={{ backgroundColor: style.bg, color: style.text }}
    >
      {style.icon === "dot" && <Circle size={6} fill="currentColor" />}
      {style.icon === "ban" && <Ban size={12} />}
      {style.icon === "refresh" && <RefreshCcw size={12} />}
      {style.label}
    </span>
  );
}