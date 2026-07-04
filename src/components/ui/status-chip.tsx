import { Check, CircleX, Loader, Loader2 } from "lucide-react";
import type { MetaAdAccountStatus, Status } from "@/features/crm/types/crm";

type StatusChipProps = {
  status: Status | MetaAdAccountStatus;
};

export function StatusChip({ status }: StatusChipProps) {
  const { className, Icon } = (() => {
    if (status === "Active" || status === "Approved" || status === "ACTIVE") {
      return {
        className: "bg-[var(--success-bg)] text-[var(--success-text)]",
        Icon: Check,
      };
    }

    if (
      status === "Rejected" ||
      status === "Disabled" ||
      status === "Suspended" ||
      status === "DISABLED" ||
      status === "CLOSED"
    ) {
      return {
        className: "bg-[var(--danger-bg)] text-[var(--danger-text)]",
        Icon: CircleX,
      };
    }
    

    return {
      className: "bg-[#ffece6] adsfixter-primary-text",
      Icon: Loader,
    };
  })();

  return (
    <span
      className={`inline-flex h-7 items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-3 text-center text-xs font-semibold leading-none ${className}`}
    >
      <Icon aria-hidden="true" className="shrink-0" size={12} strokeWidth={2} />
      {status}
    </span>
  );
}
