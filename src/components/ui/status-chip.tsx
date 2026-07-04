import type { MetaAdAccountStatus, Status } from "@/features/crm/types/crm";

type StatusChipProps = {
  status: Status | MetaAdAccountStatus;
};

export function StatusChip({ status }: StatusChipProps) {
  const statusClassName = (() => {
    if (status === "Active" || status === "Approved" || status === "ACTIVE") return "bg-[var(--success-bg)] text-[var(--success-text)]";
    if (status === "Rejected" || status === "Disabled" || status === "Suspended" || status === "DISABLED" || status === "CLOSED") return "bg-[var(--danger-bg)] text-[var(--danger-text)]";
    return "bg-[var(--warning-bg)] text-[var(--warning-text)]";
  })();

  return <span className={`inline-flex h-7 w-44 items-center justify-center rounded-full px-3 text-center text-xs font-semibold leading-none whitespace-nowrap ${statusClassName}`}>{status}</span>;
}
