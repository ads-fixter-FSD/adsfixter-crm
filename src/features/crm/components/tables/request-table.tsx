"use client";

import { Check, MoreHorizontal, X } from "lucide-react";
import { useRef, useState } from "react";
import { StatusChip } from "@/components/ui/status-chip";
import type { CrmRequest, Status, ToastType } from "@/features/crm/types/crm";
import { useClickOutside } from "@/hooks/use-click-outside";

type RequestTableProps = {
  requests: CrmRequest[];
  showToast: (type: ToastType, message: string) => void;
};

export function RequestTable({ requests, showToast }: RequestTableProps) {
  const actionDropdownRef = useRef<HTMLDivElement | null>(null);
  const [openActionKey, setOpenActionKey] = useState<string | null>(null);
  const [statusOverrides, setStatusOverrides] = useState<Record<string, Status>>({});

  const updateRequestActionStatus = (request: CrmRequest, nextStatus: "Approved" | "Rejected") => {
    const requestKey = `${request.name}-${request.type}`;
    setStatusOverrides((current) => ({ ...current, [requestKey]: nextStatus }));
    setOpenActionKey(null);
    showToast(nextStatus === "Approved" ? "success" : "error", `${request.type} ${nextStatus.toLowerCase()}`);
  };

  useClickOutside(actionDropdownRef, () => setOpenActionKey(null));

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
            <th className="w-[90px] border-b border-[var(--line)] px-2.5 py-2 text-center text-xs font-semibold uppercase text-[var(--muted)]">Action</th>
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
              <td className="relative border-b border-[var(--line)] px-2.5 py-2 text-center text-sm text-[var(--brand-navy)]">
                <div className="relative inline-flex" ref={openActionKey === requestKey ? actionDropdownRef : null}>
                  <button
                    aria-label={`Open actions for ${request.type}`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--white)] text-[var(--brand-navy)] transition hover:bg-[var(--surface)]"
                    onClick={() => setOpenActionKey((current) => (current === requestKey ? null : requestKey))}
                    title="Actions"
                    type="button"
                  >
                    <MoreHorizontal aria-hidden="true" size={17} strokeWidth={2.1} />
                  </button>
                  {openActionKey === requestKey ? (
                    <div className="absolute right-0 top-[calc(100%+0.35rem)] z-30 grid min-w-32 gap-1 rounded-xl border border-[var(--line)] bg-[var(--white)] p-1.5 text-left">
                      <button className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-semibold text-[var(--brand-navy)] hover:bg-[var(--surface)]" onClick={() => updateRequestActionStatus(request, "Approved")} type="button">
                        <Check aria-hidden="true" size={14} strokeWidth={2.1} />
                        Approve
                      </button>
                      <button className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-semibold text-[var(--brand-orange)] hover:bg-[rgba(239,67,7,0.08)]" onClick={() => updateRequestActionStatus(request, "Rejected")} type="button">
                        <X aria-hidden="true" size={14} strokeWidth={2.1} />
                        Reject
                      </button>
                    </div>
                  ) : null}
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
