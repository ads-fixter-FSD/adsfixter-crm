import type { Status } from "@/features/crm/types/crm";

type StatusChipProps = {
  status: Status;
};

export function StatusChip({ status }: StatusChipProps) {
  const statusClassName = (() => {
    if (status === "Active" || status === "Approved" || status === "ACTIVE") return "bg-green-100 text-[var(--success)]";
    if (status === "Rejected" || status === "Disabled" || status === "Suspended" || status === "DISABLED" || status === "CLOSED") return "bg-red-100 text-[var(--error)]";
    return "bg-amber-100 text-[var(--warning)]";
  })();

  return <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${statusClassName}`}>{status}</span>;
}
