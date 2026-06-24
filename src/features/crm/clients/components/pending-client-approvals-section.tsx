"use client";

import { Check, X } from "lucide-react";
import { useState } from "react";
import type { ToastType } from "@/features/crm/types/crm";
import { writeApprovedClientToStorage, type ClientDashboardRow } from "@/features/crm/clients/components/client-storage";

type PendingClientApprovalsSectionProps = {
  showToast: (type: ToastType, message: string) => void;
  onSectionChange?: (section: string) => void;
};

const initialPendingClients: ClientDashboardRow[] = [
  {
    id: "pending-client-01",
    name: "Creative Service",
    email: "creative.service@example.com",
    date: "Just now",
    usdRate: "130.00 BDT",
    balance: "$0.00",
    dueLimit: "$0.00",
    status: "Pending",
  },
  {
    id: "pending-client-02",
    name: "New Digital Buyer",
    email: "buyer@example.com",
    date: "12 minutes ago",
    usdRate: "130.00 BDT",
    balance: "$0.00",
    dueLimit: "$0.00",
    status: "Pending",
  },
];

export function PendingClientApprovalsSection({ showToast, onSectionChange }: PendingClientApprovalsSectionProps) {
  const [pendingClients, setPendingClients] = useState(initialPendingClients);

  const approveClient = (client: ClientDashboardRow) => {
    writeApprovedClientToStorage({ ...client, status: "Active", date: "Approved just now" });
    setPendingClients((current) => current.filter((pendingClient) => pendingClient.id !== client.id));
    showToast("success", `${client.name} approved and moved to all clients`);
    onSectionChange?.("All Clients");
  };

  const rejectClient = (client: ClientDashboardRow) => {
    setPendingClients((current) => current.filter((pendingClient) => pendingClient.id !== client.id));
    showToast("error", `${client.name} rejected`);
  };

  return (
    <section className="grid gap-4">
      <div>
        <h2 className="m-0 text-xl font-semibold text-[var(--brand-navy)]">Pending Client Approvals</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">Review and approve new client registrations to grant them access to the platform.</p>
      </div>

      <section className="rounded-xl border border-[var(--line)] bg-[var(--white)] p-4">
        {pendingClients.length === 0 ? (
          <div className="grid min-h-28 content-center gap-1">
            <h3 className="m-0 text-sm font-semibold text-[var(--brand-navy)]">No Pending Clients</h3>
            <p className="m-0 text-sm text-[var(--muted)]">There are no clients waiting for approval at the moment.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] border-collapse">
              <thead>
                <tr>
                  {["Client", "Email", "Requested", "USD Rate", "Status", "Actions"].map((heading) => (
                    <th className="border-b border-[var(--line)] px-3 py-2 text-left text-xs font-semibold uppercase text-[var(--muted)]" key={heading}>
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pendingClients.map((client) => (
                  <tr key={client.id}>
                    <td className="border-b border-[var(--line)] px-3 py-2 text-sm font-semibold text-[var(--brand-navy)]">{client.name}</td>
                    <td className="border-b border-[var(--line)] px-3 py-2 text-sm text-[var(--brand-navy)]">{client.email}</td>
                    <td className="border-b border-[var(--line)] px-3 py-2 text-sm text-[var(--brand-navy)]">{client.date}</td>
                    <td className="border-b border-[var(--line)] px-3 py-2 text-sm text-[var(--brand-navy)]">{client.usdRate}</td>
                    <td className="border-b border-[var(--line)] px-3 py-2 text-sm">
                      <span className="inline-flex rounded-full bg-yellow-50 px-2 py-1 text-xs font-semibold text-yellow-700">Pending</span>
                    </td>
                    <td className="border-b border-[var(--line)] px-3 py-2 text-sm">
                      <div className="flex flex-wrap items-center gap-2">
                        <button className="inline-flex items-center gap-1 rounded-md border border-green-100 bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-600 hover:bg-green-100" onClick={() => approveClient(client)} type="button">
                          <Check aria-hidden="true" size={13} strokeWidth={1.9} />
                          Approve
                        </button>
                        <button className="inline-flex items-center gap-1 rounded-md border border-red-100 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100" onClick={() => rejectClient(client)} type="button">
                          <X aria-hidden="true" size={13} strokeWidth={1.9} />
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </section>
  );
}
