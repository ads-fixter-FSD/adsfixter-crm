import type { Status } from "@/features/crm/types/crm";

type StatusChipProps = {
  status: Status;
};

export function StatusChip({ status }: StatusChipProps) {
  return <span className={`status-chip ${status.toLowerCase()}`}>{status}</span>;
}
