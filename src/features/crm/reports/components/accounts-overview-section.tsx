import type { CrmOverview, MetaAdAccountStatus } from "@/features/crm/types/crm";

type AccountsOverviewSectionProps = {
  data: CrmOverview;
};

const statusOrder: MetaAdAccountStatus[] = ["ACTIVE", "UNSETTLED", "DISABLED", "PENDING_RISK_REVIEW", "PENDING_SETTLEMENT", "CLOSED", "UNKNOWN"];

function countAccountsByStatus(accounts: CrmOverview["accounts"]) {
  return statusOrder.map((status) => ({
    status,
    count: accounts.filter((account) => account.status === status).length,
  }));
}

function parseCurrency(value: string) {
  const numericValue = Number(value.replace(/[^0-9.-]+/g, ""));
  return Number.isFinite(numericValue) ? numericValue : 0;
}

export function AccountsOverviewSection({ data }: AccountsOverviewSectionProps) {
  const statusBreakdown = countAccountsByStatus(data.accounts);
  const activeAccounts = data.accounts.filter((account) => account.status === "ACTIVE").length;
  const totalBalance = data.accounts.reduce((total, account) => total + parseCurrency(account.balance), 0);
  const totalSpend = data.accounts.reduce((total, account) => total + parseCurrency(account.spend), 0);
  const maxStatusCount = Math.max(...statusBreakdown.map((item) => item.count), 1);

  return (
    <section className="grid gap-4">
      <div>
        <h2 className="m-0 text-2xl font-semibold text-[var(--brand-navy)]">Accounts Overview</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">High-level health report for Meta ad accounts, statuses, balance, and spend.</p>
      </div>

      <div className="grid grid-cols-4 gap-3 max-[1180px]:grid-cols-2 max-[720px]:grid-cols-1">
        {[
          { label: "Total Accounts", value: data.accounts.length.toString(), detail: "Database accounts" },
          { label: "Active Accounts", value: activeAccounts.toString(), detail: `${Math.round((activeAccounts / Math.max(data.accounts.length, 1)) * 100)}% active` },
          { label: "Total Balance", value: `$${totalBalance.toFixed(2)}`, detail: "Available account balance" },
          { label: "Total Spend", value: `$${totalSpend.toFixed(2)}`, detail: "Tracked current spend" },
        ].map((metric) => (
          <article className="rounded-xl border border-[var(--line)] bg-[var(--white)] p-4" key={metric.label}>
            <p className="m-0 text-xs font-semibold uppercase text-[var(--muted)]">{metric.label}</p>
            <strong className="mt-2 block text-2xl text-[var(--brand-navy)]">{metric.value}</strong>
            <span className="mt-1 block text-xs text-[var(--muted)]">{metric.detail}</span>
          </article>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-4">
        <section className="col-span-5 rounded-xl border border-[var(--line)] bg-[var(--white)] p-4 max-[1180px]:col-span-12">
          <h3 className="m-0 text-base font-semibold text-[var(--brand-navy)]">Status Breakdown</h3>
          <div className="mt-4 grid gap-3">
            {statusBreakdown.map((item) => (
              <div className="grid gap-1" key={item.status}>
                <div className="flex items-center justify-between text-xs font-semibold text-[var(--brand-navy)]">
                  <span>{item.status}</span>
                  <span>{item.count}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[var(--surface)]">
                  <div className="h-full rounded-full bg-[var(--brand-orange)]" style={{ width: `${(item.count / maxStatusCount) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="col-span-7 rounded-xl border border-[var(--line)] bg-[var(--white)] p-4 max-[1180px]:col-span-12">
          <h3 className="m-0 text-base font-semibold text-[var(--brand-navy)]">Top Account Snapshot</h3>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse">
              <thead>
                <tr>
                  {["Account", "Client", "Status", "Balance", "Spend", "Last Meta Update"].map((heading) => (
                    <th className="border-b border-[var(--line)] px-3 py-2 text-left text-xs font-semibold uppercase text-[var(--muted)]" key={heading}>
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.accounts.slice(0, 8).map((account) => (
                  <tr key={account.id}>
                    <td className="border-b border-[var(--line)] px-3 py-2 text-sm text-[var(--brand-navy)]">
                      <span className="block font-semibold">{account.name}</span>
                      <span className="text-xs text-[var(--muted)]">{account.id}</span>
                    </td>
                    <td className="border-b border-[var(--line)] px-3 py-2 text-sm text-[var(--brand-navy)]">{account.client}</td>
                    <td className="border-b border-[var(--line)] px-3 py-2 text-xs font-semibold text-[var(--brand-orange)]">{account.status}</td>
                    <td className="border-b border-[var(--line)] px-3 py-2 text-sm text-[var(--brand-navy)]">{account.balance}</td>
                    <td className="border-b border-[var(--line)] px-3 py-2 text-sm text-[var(--brand-navy)]">{account.spend}</td>
                    <td className="border-b border-[var(--line)] px-3 py-2 text-sm text-[var(--brand-navy)]">{account.lastMetaUpdateAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </section>
  );
}
