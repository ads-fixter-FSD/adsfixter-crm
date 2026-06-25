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

  return <span className={`inline-flex h-7 w-44 items-center justify-center rounded-full px-3 text-center text-xs font-semibold leading-none whitespace-nowrap ${statusClassName}`}>{status}</span>;
}
