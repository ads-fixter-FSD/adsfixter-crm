import { CreditCard, Eye } from "lucide-react";
import { StatusChip } from "@/components/ui/status-chip";
import type { CrmOverview } from "@/features/crm/types/crm";

type AdAccountsTableProps = {
  accounts: CrmOverview["accounts"];
  onAccountAction: (accountName: string, action: "view" | "top-up") => void;
};

function parseCurrency(value: string) {
  const numericValue = Number(value.replace(/[^0-9.-]+/g, ""));
  return Number.isFinite(numericValue) ? numericValue : 0;
}

export function AdAccountsTable({ accounts, onAccountAction }: AdAccountsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1100px] border-collapse">
        <thead>
          <tr>
            {["Name", "Meta Account ID", "Status", "Budget", "Last Refreshed", "Notes", ""].map((heading) => (
              <th className="border-b border-[var(--line)] px-3 py-2 text-left text-xs font-semibold text-[var(--muted)]" key={heading}>
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => {
            const spendAmount = parseCurrency(account.spend);
            const budgetPercent = Math.min(100, Math.max(8, spendAmount * 5));

            return (
              <tr key={account.id}>
                <td className="border-b border-[var(--line)] px-3 py-2 text-sm font-semibold text-[var(--brand-navy)]">{account.name}</td>
                <td className="border-b border-[var(--line)] px-3 py-2 text-sm">
                  <a className="font-semibold text-[var(--link)] underline-offset-2 hover:underline" href={`#${account.id}`}>
                    {account.id}
                  </a>
                </td>
                <td className="border-b border-[var(--line)] px-3 py-2 text-sm">
                  <StatusChip status={account.status} />
                </td>
                <td className="border-b border-[var(--line)] px-3 py-2 text-sm text-[var(--brand-navy)]">
                  <span className="block text-xs font-semibold">{account.balance}</span>
                  <div className="mt-1 h-1.5 w-36 overflow-hidden rounded-full bg-[var(--neutral-track)]">
                    <div
                      className={`h-full rounded-full ${budgetPercent > 70 ? "bg-[var(--warning-text)]" : "bg-[var(--danger-text)]"}`}
                      style={{ width: `${budgetPercent}%` }}
                    />
                  </div>
                </td>
                <td className="border-b border-[var(--line)] px-3 py-2 text-sm text-[var(--brand-navy)]">{account.lastMetaUpdateAt}</td>
                <td className="border-b border-[var(--line)] px-3 py-2 text-sm text-[var(--brand-navy)]">{account.notes}</td>
                <td className="border-b border-[var(--line)] px-3 py-2 text-center text-sm">
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <button
                      className="inline-flex min-h-8 items-center gap-1.5 rounded-lg border border-[var(--brand-orange)] bg-[var(--brand-orange)] px-2.5 text-xs font-semibold text-[var(--brand-orange-contrast)] transition hover:bg-[var(--brand-orange-hover)]"
                      onClick={() => onAccountAction(account.name, "view")}
                      type="button"
                    >
                      <Eye aria-hidden="true" size={13} strokeWidth={2.1} />
                      View
                    </button>
                    <button
                      className="inline-flex min-h-8 items-center gap-1.5 rounded-lg border border-[var(--brand-orange)] bg-[var(--white)] px-2.5 text-xs font-semibold text-[var(--brand-orange)] transition hover:bg-[var(--brand-orange-soft)]"
                      onClick={() => onAccountAction(account.name, "top-up")}
                      type="button"
                    >
                      <CreditCard aria-hidden="true" size={13} strokeWidth={2.1} />
                      Top Up
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
          {accounts.length === 0 ? (
            <tr>
              <td className="px-3 py-8 text-center text-sm text-[var(--muted)]" colSpan={7}>
                No accounts match your filters.
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}
