import { StatusChip } from "@/components/ui/status-chip";
import type { Client, ToastType } from "@/features/crm/types/crm";

type ClientTableProps = {
  clients: Client[];
  showToast: (type: ToastType, message: string) => void;
};

export function ClientTable({ clients, showToast }: ClientTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] border-collapse">
        <thead>
          <tr>
            <th className="border-b border-[var(--line)] px-2.5 py-2 text-left text-xs font-semibold uppercase text-[var(--muted)]">Client</th>
            <th className="border-b border-[var(--line)] px-2.5 py-2 text-left text-xs font-semibold uppercase text-[var(--muted)]">Email</th>
            <th className="border-b border-[var(--line)] px-2.5 py-2 text-left text-xs font-semibold uppercase text-[var(--muted)]">Wallet</th>
            <th className="border-b border-[var(--line)] px-2.5 py-2 text-left text-xs font-semibold uppercase text-[var(--muted)]">Credit Limit</th>
            <th className="border-b border-[var(--line)] px-2.5 py-2 text-left text-xs font-semibold uppercase text-[var(--muted)]">Daily Limit</th>
            <th className="border-b border-[var(--line)] px-2.5 py-2 text-left text-xs font-semibold uppercase text-[var(--muted)]">Status</th>
            <th className="border-b border-[var(--line)] px-2.5 py-2 text-left text-xs font-semibold uppercase text-[var(--muted)]">Control</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.email}>
              <td className="border-b border-[var(--line)] px-2.5 py-2 text-sm text-[var(--brand-navy)]">{client.name}</td>
              <td className="border-b border-[var(--line)] px-2.5 py-2 text-sm text-[var(--brand-navy)]">{client.email}</td>
              <td className="border-b border-[var(--line)] px-2.5 py-2 text-sm text-[var(--brand-navy)]">{client.balance}</td>
              <td className="border-b border-[var(--line)] px-2.5 py-2 text-sm text-[var(--brand-navy)]">{client.credit}</td>
              <td className="border-b border-[var(--line)] px-2.5 py-2 text-sm text-[var(--brand-navy)]">{client.dailyLimit}</td>
              <td className="border-b border-[var(--line)] px-2.5 py-2 text-sm text-[var(--brand-navy)]">
                <StatusChip status={client.status} />
              </td>
              <td className="border-b border-[var(--line)] px-2.5 py-2 text-sm text-[var(--brand-navy)]">
                <button className="rounded-lg border border-[var(--line)] bg-[var(--white)] px-3 py-2 text-sm font-semibold leading-tight text-[var(--brand-navy)] transition hover:bg-[var(--surface)]" onClick={() => showToast("warning", `${client.name} status update queued`)} type="button">
                  Manage
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
