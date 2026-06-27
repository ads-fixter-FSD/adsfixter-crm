"use client";

import { Check, X } from "lucide-react";
import { useState } from "react";
import { StatusChip } from "@/components/ui/status-chip";
import type { CrmRequest, Status, ToastType } from "@/features/crm/types/crm";

type RequestTableProps = {
  requests: CrmRequest[];
  showToast: (type: ToastType, message: string) => void;
};

export function RequestTable({ requests, showToast }: RequestTableProps) {
  const [statusOverrides, setStatusOverrides] = useState<Record<string, Status>>({});

  const updateRequestActionStatus = (request: CrmRequest, nextStatus: "Approved" | "Rejected") => {
    const requestKey = `${request.name}-${request.type}`;
    setStatusOverrides((current) => ({ ...current, [requestKey]: nextStatus }));
    showToast(nextStatus === "Approved" ? "success" : "error", `${request.type} ${nextStatus.toLowerCase()}`);
  };

  return (
    <div className="max-w-full overflow-x-auto">
      <table className="w-full min-w-[900px] table-fixed border-collapse">
        <thead>
          <tr>
            <th className="w-[180px] border-b border-[var(--line)] px-2.5 py-2 text-left text-xs font-semibold uppercase text-[var(--muted)]">Customer</th>
            <th className="w-[150px] border-b border-[var(--line)] px-2.5 py-2 text-left text-xs font-semibold uppercase text-[var(--muted)]">Request</th>
            <th className="w-[100px] border-b border-[var(--line)] px-2.5 py-2 text-left text-xs font-semibold uppercase text-[var(--muted)]">Amount</th>
            <th className="w-[120px] border-b border-[var(--line)] px-2.5 py-2 text-left text-xs font-semibold uppercase text-[var(--muted)]">Reference</th>
            <th className="w-[190px] border-b border-[var(--line)] px-2.5 py-2 text-left text-xs font-semibold uppercase text-[var(--muted)]">Status</th>
            <th className="w-[160px] border-b border-[var(--line)] px-2.5 py-2 text-center text-xs font-semibold uppercase text-[var(--muted)]">Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => {
            const requestKey = `${request.name}-${request.type}`;
            const visibleStatus = statusOverrides[requestKey] ?? request.status;

            return (
            <tr key={requestKey}>
              <td className="border-b border-[var(--line)] px-2.5 py-2 text-sm break-words text-[var(--brand-navy)]">{request.name}</td>
              <td className="border-b border-[var(--line)] px-2.5 py-2 text-sm break-words text-[var(--brand-navy)]">{request.type}</td>
              <td className="border-b border-[var(--line)] px-2.5 py-2 text-sm break-words text-[var(--brand-navy)]">{request.amount}</td>
              <td className="border-b border-[var(--line)] px-2.5 py-2 text-sm break-words text-[var(--brand-navy)]">{request.method}</td>
              <td className="border-b border-[var(--line)] px-2.5 py-2 text-sm text-[var(--brand-navy)]">
                <StatusChip status={visibleStatus} />
              </td>
              <td className="border-b border-[var(--line)] px-2.5 py-2 text-center text-sm text-[var(--brand-navy)]">
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <button className="inline-flex min-h-8 items-center gap-1.5 rounded-lg border border-[var(--brand-orange)] bg-[var(--brand-orange)] px-2.5 text-xs font-semibold text-[var(--brand-orange-contrast)] transition hover:bg-[var(--brand-orange-hover)]" onClick={() => updateRequestActionStatus(request, "Approved")} type="button">
                    <Check aria-hidden="true" size={13} strokeWidth={2.1} />
                    Approve
                  </button>
                  <button className="inline-flex min-h-8 items-center gap-1.5 rounded-lg border border-[var(--brand-orange)] bg-[var(--white)] px-2.5 text-xs font-semibold text-[var(--brand-orange)] transition hover:bg-[var(--brand-orange-soft)]" onClick={() => updateRequestActionStatus(request, "Rejected")} type="button">
                    <X aria-hidden="true" size={13} strokeWidth={2.1} />
                    Reject
                  </button>
                </div>
              </td>
            </tr>
          );
          })}
        </tbody>
      </table>
    </div>
  );
}
