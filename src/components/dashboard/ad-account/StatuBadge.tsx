import type { MetaStatus } from "@/types/account";

const STATUS_STYLES: Record<
  MetaStatus,
  { bg: string; text: string; dot: string }
> = {
  Active: {
    bg: "bg-[var(--color-success-bg)]",
    text: "text-[var(--color-success-text)]",
    dot: "bg-[var(--color-success-text)]",
  },
  Disable: {
    bg: "bg-[var(--color-danger-bg)]",
    text: "text-[var(--color-danger-text)]",
    dot: "bg-[var(--color-danger-text)]",
  },
  Inactive: {
    bg: "bg-[var(--color-danger-bg)]",
    text: "text-[var(--color-danger-text)]",
    dot: "bg-[var(--color-danger-text)]",
  },
};

export default function StatusBadge({ status }: { status: MetaStatus }) {
  const style = STATUS_STYLES[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 body-sm-medium ${style.bg} ${style.text}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
      {status}
    </span>
  );
}
