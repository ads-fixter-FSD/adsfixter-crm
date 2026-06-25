"use client";

import { ArrowLeft, Check, MoreHorizontal, X } from "lucide-react";
import { useRef, useState } from "react";
import type { ToastType } from "@/features/crm/types/crm";
import { useClickOutside } from "@/hooks/use-click-outside";

type PendingBusinessManagerRequest = {
  id: string;
  client: string;
  type: string;
  details: string;
  requested: string;
};

type BusinessManagerPendingRequestsSectionProps = {
  showToast: (type: ToastType, message: string) => void;
  onSectionChange?: (section: string) => void;
};

const initialPendingRequests: PendingBusinessManagerRequest[] = [
  {
    id: "user_3k8m4r7chmnnXQnKrov8B5Yqle",
    client: "user_3k8m4r7chmnnXQnKrov8B5Yqle",
    type: "Top Up",
    details: "Unknown Account\nAmount: $165.31, USD (17,063 BDT)",
    requested: "21 minutes ago",
  },
  {
    id: "user_91h2bmshare004",
    client: "user_91h2bmshare004",
    type: "Ad Account",
    details: "Business Manager share request\nBM ID: 942046120931068",
    requested: "1 hour ago",
  },
];

export function BusinessManagerPendingRequestsSection({ showToast, onSectionChange }: BusinessManagerPendingRequestsSectionProps) {
  const actionDropdownRef = useRef<HTMLDivElement | null>(null);
  const [pendingRequests, setPendingRequests] = useState(initialPendingRequests);
  const [openActionRequestId, setOpenActionRequestId] = useState<string | null>(null);

  const updateRequest = (requestId: string, action: "approved" | "rejected") => {
    setPendingRequests((current) => current.filter((request) => request.id !== requestId));
    setOpenActionRequestId(null);
    showToast(action === "approved" ? "success" : "error", `Pending request ${action}`);
  };

  useClickOutside(actionDropdownRef, () => setOpenActionRequestId(null));

  return (
    <section className="grid gap-4">
      <div className="flex flex-wrap items-start gap-3">
        <button className="inline-flex min-h-8 items-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--white)] px-3 text-sm font-semibold text-[var(--brand-navy)] hover:bg-[var(--surface)]" onClick={() => onSectionChange?.("All Business Managers")} type="button">
          <ArrowLeft aria-hidden="true" size={15} strokeWidth={1.9} />
          Back to All Accounts
        </button>
        <div>
          <h2 className="m-0 text-xl font-semibold text-[var(--brand-navy)]">Pending Requests</h2>
          <p className="mt-1 text-sm text-[var(--muted)]">Process pending client requests for ad accounts</p>
        </div>
      </div>

      <section className="rounded-xl border border-[var(--line)] bg-[var(--white)] p-4">
        <div className="mb-4">
          <h3 className="m-0 text-base font-semibold text-[var(--brand-navy)]">Pending Requests</h3>
          <p className="mt-1 text-sm text-[var(--muted)]">Review and process client requests for ad accounts</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse">
            <thead>
              <tr>
                {["Client", "Type", "Details", "Requested", "Actions"].map((heading) => (
                  <th className="border-b border-[var(--line)] px-3 py-2 text-left text-xs font-semibold text-[var(--brand-navy)]" key={heading}>
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pendingRequests.map((request) => (
                <tr key={request.id}>
                  <td className="border-b border-[var(--line)] px-3 py-2 text-sm text-[var(--brand-navy)]">{request.client}</td>
                  <td className="border-b border-[var(--line)] px-3 py-2 text-sm text-[var(--brand-navy)]">{request.type}</td>
                  <td className="whitespace-pre-line border-b border-[var(--line)] px-3 py-2 text-sm text-[var(--brand-navy)]">{request.details}</td>
                  <td className="border-b border-[var(--line)] px-3 py-2 text-sm text-[var(--brand-navy)]">{request.requested}</td>
                  <td className="relative border-b border-[var(--line)] px-3 py-2 text-center text-sm">
                    <div className="relative inline-flex" ref={openActionRequestId === request.id ? actionDropdownRef : null}>
                      <button
                        aria-label={`Open actions for ${request.type}`}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--white)] text-[var(--brand-navy)] transition hover:bg-[var(--surface)]"
                        onClick={() => setOpenActionRequestId((current) => (current === request.id ? null : request.id))}
                        title="Actions"
                        type="button"
                      >
                        <MoreHorizontal aria-hidden="true" size={17} strokeWidth={2.1} />
                      </button>
                      {openActionRequestId === request.id ? (
                        <div className="absolute right-0 top-[calc(100%+0.35rem)] z-30 grid min-w-32 gap-1 rounded-xl border border-[var(--line)] bg-[var(--white)] p-1.5 text-left">
                          <button className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-semibold text-[var(--brand-navy)] hover:bg-[var(--surface)]" onClick={() => updateRequest(request.id, "approved")} type="button">
                            <Check aria-hidden="true" size={14} strokeWidth={2.1} />
                            Approve
                          </button>
                          <button className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-semibold text-[var(--brand-orange)] hover:bg-[rgba(239,67,7,0.08)]" onClick={() => updateRequest(request.id, "rejected")} type="button">
                            <X aria-hidden="true" size={14} strokeWidth={2.1} />
                            Reject
                          </button>
                        </div>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))}

              {pendingRequests.length === 0 ? (
                <tr>
                  <td className="px-3 py-8 text-center text-sm text-[var(--muted)]" colSpan={5}>
                    No pending requests
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
}
