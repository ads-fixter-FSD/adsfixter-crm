import { Check, X } from "lucide-react";
import { StatusChip } from "@/components/ui/status-chip";
import type { CrmRequest, ToastType } from "@/features/crm/types/crm";

type RequestTableProps = {
  requests: CrmRequest[];
  showToast: (type: ToastType, message: string) => void;
};

export function RequestTable({ requests, showToast }: RequestTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] border-collapse">
        <thead>
          <tr>
            <th className="border-b border-[var(--line)] px-2.5 py-2 text-left text-xs font-semibold uppercase text-[var(--muted)]">Customer</th>
            <th className="border-b border-[var(--line)] px-2.5 py-2 text-left text-xs font-semibold uppercase text-[var(--muted)]">Request</th>
            <th className="border-b border-[var(--line)] px-2.5 py-2 text-left text-xs font-semibold uppercase text-[var(--muted)]">Amount</th>
            <th className="border-b border-[var(--line)] px-2.5 py-2 text-left text-xs font-semibold uppercase text-[var(--muted)]">Reference</th>
            <th className="border-b border-[var(--line)] px-2.5 py-2 text-left text-xs font-semibold uppercase text-[var(--muted)]">Status</th>
            <th className="border-b border-[var(--line)] px-2.5 py-2 text-left text-xs font-semibold uppercase text-[var(--muted)]">Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={`${request.name}-${request.type}`}>
              <td className="border-b border-[var(--line)] px-2.5 py-2 text-sm text-[var(--brand-navy)]">{request.name}</td>
              <td className="border-b border-[var(--line)] px-2.5 py-2 text-sm text-[var(--brand-navy)]">{request.type}</td>
              <td className="border-b border-[var(--line)] px-2.5 py-2 text-sm text-[var(--brand-navy)]">{request.amount}</td>
              <td className="border-b border-[var(--line)] px-2.5 py-2 text-sm text-[var(--brand-navy)]">{request.method}</td>
              <td className="border-b border-[var(--line)] px-2.5 py-2 text-sm text-[var(--brand-navy)]">
                <StatusChip status={request.status} />
              </td>
              <td className="border-b border-[var(--line)] px-2.5 py-2 text-sm text-[var(--brand-navy)]">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    aria-label={`Approve ${request.type}`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--brand-orange)] bg-[var(--brand-orange)] text-white transition hover:bg-[#d63a05]"
                    onClick={() => showToast("success", `${request.type} approved`)}
                    title="Approve"
                    type="button"
                  >
                    <Check aria-hidden="true" size={16} strokeWidth={2.2} />
                  </button>
                  <button
                    aria-label={`Reject ${request.type}`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--white)] text-[var(--brand-orange)] transition hover:bg-[rgba(239,67,7,0.08)]"
                    onClick={() => showToast("error", `${request.type} rejected with notes`)}
                    title="Reject"
                    type="button"
                  >
                    <X aria-hidden="true" size={16} strokeWidth={2.2} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
