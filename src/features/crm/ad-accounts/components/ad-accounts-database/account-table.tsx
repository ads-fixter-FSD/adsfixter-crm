import { StatusChip } from "@/components/ui/status-chip";
import type { AdAccount } from "@/features/crm/types/crm";

export type AccountColumnKey = "name" | "spendInfo" | "metaStatus" | "balance" | "todaySpend" | "yesterdaySpend" | "cardName" | "client" | "lastMetaUpdateAt" | "notes";

type AccountTableProps = {
  accounts: AdAccount[];
  visibleColumns?: AccountColumnKey[];
};

const defaultAccountColumns: AccountColumnKey[] = ["name", "spendInfo", "metaStatus", "balance", "todaySpend", "yesterdaySpend", "cardName", "client", "lastMetaUpdateAt", "notes"];

export function AccountTable({ accounts, visibleColumns = defaultAccountColumns }: AccountTableProps) {
  const isColumnVisible = (column: AccountColumnKey) => visibleColumns.includes(column);
  const visibleColumnCount = visibleColumns.length || 1;

  return (
    <div className="max-w-full overflow-x-auto">
      <table className="w-full min-w-[1440px] table-fixed border-collapse">
        <thead>
          <tr>
            {isColumnVisible("name") ? <th className="w-[230px] border-b border-[var(--line)] px-3 py-2 text-left text-xs font-semibold uppercase whitespace-nowrap text-[var(--muted)]">Ad Account</th> : null}
            {isColumnVisible("spendInfo") ? <th className="w-[130px] border-b border-[var(--line)] px-3 py-2 text-left text-xs font-semibold uppercase whitespace-nowrap text-[var(--muted)]">Spend Info</th> : null}
            {isColumnVisible("metaStatus") ? <th className="w-[200px] border-b border-[var(--line)] px-3 py-2 text-left text-xs font-semibold uppercase whitespace-nowrap text-[var(--muted)]">Meta Status</th> : null}
            {isColumnVisible("balance") ? <th className="w-[120px] border-b border-[var(--line)] px-3 py-2 text-left text-xs font-semibold uppercase whitespace-nowrap text-[var(--muted)]">Balance</th> : null}
            {isColumnVisible("todaySpend") ? <th className="w-[110px] border-b border-[var(--line)] px-3 py-2 text-left text-xs font-semibold uppercase whitespace-nowrap text-[var(--muted)]">Today</th> : null}
            {isColumnVisible("yesterdaySpend") ? <th className="w-[120px] border-b border-[var(--line)] px-3 py-2 text-left text-xs font-semibold uppercase whitespace-nowrap text-[var(--muted)]">Yesterday</th> : null}
            {isColumnVisible("cardName") ? <th className="w-[150px] border-b border-[var(--line)] px-3 py-2 text-left text-xs font-semibold uppercase whitespace-nowrap text-[var(--muted)]">Card Name</th> : null}
            {isColumnVisible("client") ? <th className="w-[150px] border-b border-[var(--line)] px-3 py-2 text-left text-xs font-semibold uppercase whitespace-nowrap text-[var(--muted)]">Client</th> : null}
            {isColumnVisible("lastMetaUpdateAt") ? <th className="w-[180px] border-b border-[var(--line)] px-3 py-2 text-left text-xs font-semibold uppercase whitespace-nowrap text-[var(--muted)]">Last Meta Update At</th> : null}
            {isColumnVisible("notes") ? <th className="w-[160px] border-b border-[var(--line)] px-3 py-2 text-left text-xs font-semibold uppercase whitespace-nowrap text-[var(--muted)]">Notes</th> : null}
          </tr>
        </thead>
        <tbody>
          {accounts.length > 0 ? (
            accounts.map((account) => (
              <tr key={account.id}>
                {isColumnVisible("name") ? (
                  <td className="border-b border-[var(--line)] px-3 py-2 align-top text-sm text-[var(--brand-navy)]">
                    <div className="grid gap-1">
                      <strong className="break-words text-sm font-semibold text-[var(--brand-navy)]">{account.name}</strong>
                      <span className="break-words font-sans text-xs text-[var(--muted)]">{account.businessManager}</span>
                      <code className="break-all font-sans text-xs text-[var(--muted)]">{account.id}</code>
                    </div>
                  </td>
                ) : null}
                {isColumnVisible("spendInfo") ? <td className="border-b border-[var(--line)] px-3 py-2 align-top text-sm break-words text-[var(--brand-navy)]">{account.spendInfo}</td> : null}
                {isColumnVisible("metaStatus") ? (
                  <td className="border-b border-[var(--line)] px-3 py-2 align-top text-sm text-[var(--brand-navy)]">
                    <StatusChip status={account.status} />
                  </td>
                ) : null}
                {isColumnVisible("balance") ? <td className="border-b border-[var(--line)] px-3 py-2 align-top text-sm break-words text-[var(--brand-navy)]">{account.balance}</td> : null}
                {isColumnVisible("todaySpend") ? <td className="border-b border-[var(--line)] px-3 py-2 align-top text-sm break-words text-[var(--brand-navy)]">{account.spend}</td> : null}
                {isColumnVisible("yesterdaySpend") ? <td className="border-b border-[var(--line)] px-3 py-2 align-top text-sm break-words text-[var(--brand-navy)]">{account.yesterdaySpend}</td> : null}
                {isColumnVisible("cardName") ? <td className="border-b border-[var(--line)] px-3 py-2 align-top text-sm break-words text-[var(--brand-navy)]">{account.cardName}</td> : null}
                {isColumnVisible("client") ? <td className="border-b border-[var(--line)] px-3 py-2 align-top text-sm break-words text-[var(--brand-navy)]">{account.client}</td> : null}
                {isColumnVisible("lastMetaUpdateAt") ? <td className="border-b border-[var(--line)] px-3 py-2 align-top text-sm break-words text-[var(--brand-navy)]">{account.lastMetaUpdateAt}</td> : null}
                {isColumnVisible("notes") ? <td className="border-b border-[var(--line)] px-3 py-2 align-top text-sm break-words text-[var(--brand-navy)]">{account.notes}</td> : null}
              </tr>
            ))
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
