import { Check } from "lucide-react";
import { useState } from "react";
import { StatusChip } from "@/components/ui/status-chip";
import type { AdAccount } from "@/features/crm/types/crm";

export type AccountColumnKey = "name" | "spendInfo" | "metaStatus" | "balance" | "todaySpend" | "yesterdaySpend" | "cardName" | "client" | "lastMetaUpdateAt" | "notes";

type AccountTableProps = {
  accounts: AdAccount[];
  visibleColumns?: AccountColumnKey[];
};

const defaultAccountColumns: AccountColumnKey[] = ["name", "spendInfo", "metaStatus", "balance", "todaySpend", "yesterdaySpend", "cardName", "client", "lastMetaUpdateAt", "notes"];

export function AccountTable({ accounts, visibleColumns = defaultAccountColumns }: AccountTableProps) {
  const [selectedAccountIds, setSelectedAccountIds] = useState<string[]>([]);
  const isColumnVisible = (column: AccountColumnKey) => visibleColumns.includes(column);
  const visibleColumnCount = (visibleColumns.length || 1) + 1;
  const areAllVisibleAccountsSelected = accounts.length > 0 && accounts.every((account) => selectedAccountIds.includes(account.id));

  const toggleAllVisibleAccounts = () => {
    setSelectedAccountIds((current) => {
      if (areAllVisibleAccountsSelected) {
        return current.filter((accountId) => !accounts.some((account) => account.id === accountId));
      }

      return Array.from(new Set([...current, ...accounts.map((account) => account.id)]));
    });
  };

  const toggleAccountSelection = (accountId: string) => {
    setSelectedAccountIds((current) => (current.includes(accountId) ? current.filter((selectedAccountId) => selectedAccountId !== accountId) : [...current, accountId]));
  };

  return (
    <div className="max-w-full overflow-x-auto">
      <table className="w-full min-w-[1480px] table-fixed border-collapse">
        <thead className="bg-[var(--surface)]">
          <tr>
            <th className="w-[44px] border-b border-[var(--line)] px-5 py-3 text-left">
              <button
                aria-label="Select all visible ad accounts"
                className={`grid h-3.5 w-3.5 place-items-center rounded-sm border ${areAllVisibleAccountsSelected ? "border-[var(--brand-orange)] bg-[var(--brand-orange)] text-[var(--brand-orange-contrast)]" : "border-[var(--line)] bg-[var(--white)]"}`}
                onClick={toggleAllVisibleAccounts}
                type="button"
              >
                {areAllVisibleAccountsSelected ? <Check aria-hidden="true" size={10} strokeWidth={3} /> : null}
              </button>
            </th>
            {isColumnVisible("name") ? <th className="w-[230px] border-b border-[var(--line)] px-3 py-3 text-left text-[0.68rem] font-semibold uppercase whitespace-nowrap text-[var(--muted)]">Ad Account</th> : null}
            {isColumnVisible("spendInfo") ? <th className="w-[130px] border-b border-[var(--line)] px-3 py-3 text-left text-[0.68rem] font-semibold uppercase whitespace-nowrap text-[var(--muted)]">Spend Info</th> : null}
            {isColumnVisible("metaStatus") ? <th className="w-[200px] border-b border-[var(--line)] px-3 py-3 text-left text-[0.68rem] font-semibold uppercase whitespace-nowrap text-[var(--muted)]">Meta Status</th> : null}
            {isColumnVisible("balance") ? <th className="w-[120px] border-b border-[var(--line)] px-3 py-3 text-left text-[0.68rem] font-semibold uppercase whitespace-nowrap text-[var(--muted)]">Balance</th> : null}
            {isColumnVisible("todaySpend") ? <th className="w-[110px] border-b border-[var(--line)] px-3 py-3 text-left text-[0.68rem] font-semibold uppercase whitespace-nowrap text-[var(--muted)]">Today</th> : null}
            {isColumnVisible("yesterdaySpend") ? <th className="w-[120px] border-b border-[var(--line)] px-3 py-3 text-left text-[0.68rem] font-semibold uppercase whitespace-nowrap text-[var(--muted)]">Yesterday</th> : null}
            {isColumnVisible("cardName") ? <th className="w-[150px] border-b border-[var(--line)] px-3 py-3 text-left text-[0.68rem] font-semibold uppercase whitespace-nowrap text-[var(--muted)]">Card Name</th> : null}
            {isColumnVisible("client") ? <th className="w-[150px] border-b border-[var(--line)] px-3 py-3 text-left text-[0.68rem] font-semibold uppercase whitespace-nowrap text-[var(--muted)]">Client</th> : null}
            {isColumnVisible("lastMetaUpdateAt") ? <th className="w-[180px] border-b border-[var(--line)] px-3 py-3 text-left text-[0.68rem] font-semibold uppercase whitespace-nowrap text-[var(--muted)]">Last Meta Update At</th> : null}
            {isColumnVisible("notes") ? <th className="w-[160px] border-b border-[var(--line)] px-3 py-3 text-left text-[0.68rem] font-semibold uppercase whitespace-nowrap text-[var(--muted)]">Notes</th> : null}
          </tr>
        </thead>
        <tbody>
          {accounts.length > 0 ? (
            accounts.map((account) => {
              const isSelected = selectedAccountIds.includes(account.id);

              return (
              <tr className={isSelected ? "bg-[var(--brand-orange-soft)]" : ""} key={account.id}>
                <td className="border-b border-[var(--line)] px-5 py-2 align-top">
                  <button
                    aria-label={`Select ${account.name}`}
                    className={`mt-1 grid h-3.5 w-3.5 place-items-center rounded-sm border ${isSelected ? "border-[var(--brand-orange)] bg-[var(--brand-orange)] text-[var(--brand-orange-contrast)]" : "border-[var(--line)] bg-[var(--white)]"}`}
                    onClick={() => toggleAccountSelection(account.id)}
                    type="button"
                  >
                    {isSelected ? <Check aria-hidden="true" size={10} strokeWidth={3} /> : null}
                  </button>
                </td>
                {isColumnVisible("name") ? (
                  <td className="border-b border-[var(--line)] px-3 py-2 align-top text-xs text-[var(--brand-navy)]">
                    <div className="grid gap-1">
                      <strong className="break-words text-xs font-semibold text-[var(--brand-navy)]">{account.name}</strong>
                      <span className="break-words font-sans text-[0.7rem] text-[var(--muted)]">{account.businessManager}</span>
                      <code className="break-all font-sans text-[0.7rem] text-[var(--muted)]">{account.id}</code>
                    </div>
                  </td>
                ) : null}
                {isColumnVisible("spendInfo") ? <td className="border-b border-[var(--line)] px-3 py-2 align-top text-xs break-words text-[var(--brand-navy)]">{account.spendInfo}</td> : null}
                {isColumnVisible("metaStatus") ? (
                  <td className="border-b border-[var(--line)] px-3 py-2 align-top text-xs text-[var(--brand-navy)]">
                    <StatusChip status={account.status} />
                  </td>
                ) : null}
                {isColumnVisible("balance") ? <td className="border-b border-[var(--line)] px-3 py-2 align-top text-xs break-words text-[var(--brand-navy)]">{account.balance}</td> : null}
                {isColumnVisible("todaySpend") ? <td className="border-b border-[var(--line)] px-3 py-2 align-top text-xs break-words text-[var(--brand-navy)]">{account.spend}</td> : null}
                {isColumnVisible("yesterdaySpend") ? <td className="border-b border-[var(--line)] px-3 py-2 align-top text-xs break-words text-[var(--brand-navy)]">{account.yesterdaySpend}</td> : null}
                {isColumnVisible("cardName") ? <td className="border-b border-[var(--line)] px-3 py-2 align-top text-xs break-words text-[var(--brand-navy)]">{account.cardName}</td> : null}
                {isColumnVisible("client") ? <td className="border-b border-[var(--line)] px-3 py-2 align-top text-xs break-words text-[var(--brand-navy)]">{account.client}</td> : null}
                {isColumnVisible("lastMetaUpdateAt") ? <td className="border-b border-[var(--line)] px-3 py-2 align-top text-xs break-words text-[var(--brand-navy)]">{account.lastMetaUpdateAt}</td> : null}
                {isColumnVisible("notes") ? <td className="border-b border-[var(--line)] px-3 py-2 align-top text-xs break-words text-[var(--brand-navy)]">{account.notes}</td> : null}
              </tr>
              );
            })
          ) : (
            <tr>
              <td className="border-b border-[var(--line)] px-2.5 py-2 text-center text-sm text-[var(--muted)]" colSpan={visibleColumnCount}>
                No ad accounts match your filters.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
