import type { BMStatus } from "@/types/businessPortfolios";

const STYLES: Record<BMStatus, { bg: string; text: string; label: string }> = {
  active: {
    bg: "var(--color-success-bg)",
    text: "var(--color-success-text)",
    label: "Active",
  },
  "request-pending": {
    bg: "var(--color-primary-soft)",
    text: "var(--color-primary)",
    label: "Request Pending",
  },
  "access-removed": {
    bg: "var(--color-danger-bg)",
    text: "var(--color-danger-text)",
    label: "Access Removed",
  },
  restricted: {
    bg: "var(--color-danger-bg)",
    text: "var(--color-danger-text)",
    label: "Restricted",
  },
};

export default function StatusBadge({ status }: { status: BMStatus }) {
  const style = STYLES[status];
  return (
    <span
      className="rounded-full px-3 py-1 body-xsm-medium whitespace-nowrap"
      style={{ backgroundColor: style.bg, color: style.text }}
    >
      {style.label}
    </span>
  );
}
