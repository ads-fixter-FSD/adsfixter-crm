import type { CrmOverview } from "@/features/crm/types/crm";

type RevenueReportsSectionProps = {
  data: CrmOverview;
};

const monthlyRevenue = [
  { month: "Jan", revenue: 18400, topups: 14200, spend: 9800 },
  { month: "Feb", revenue: 22150, topups: 17600, spend: 12400 },
  { month: "Mar", revenue: 24580, topups: 19600, spend: 14890 },
  { month: "Apr", revenue: 28120, topups: 22500, spend: 16750 },
  { month: "May", revenue: 31840, topups: 25400, spend: 18830 },
  { month: "Jun", revenue: 35290, topups: 28700, spend: 21460 },
];

const revenueChannels = [
  { name: "Top-up Service Fee", amount: "$14,820", share: "42%" },
  { name: "Ad Account Setup", amount: "$8,450", share: "24%" },
  { name: "Business Manager Share", amount: "$6,310", share: "18%" },
  { name: "Wallet Adjustments", amount: "$3,940", share: "11%" },
  { name: "Other Revenue", amount: "$1,770", share: "5%" },
];

function formatUsd(value: number) {
  return new Intl.NumberFormat("en-US", { currency: "USD", maximumFractionDigits: 0, style: "currency" }).format(value);
}

export function RevenueReportsSection({ data }: RevenueReportsSectionProps) {
  const currentRevenue = monthlyRevenue.at(-1)?.revenue ?? 0;
  const previousRevenue = monthlyRevenue.at(-2)?.revenue ?? 0;
  const revenueGrowth = previousRevenue ? Math.round(((currentRevenue - previousRevenue) / previousRevenue) * 100) : 0;
  const totalRevenue = monthlyRevenue.reduce((total, item) => total + item.revenue, 0);
  const totalTopups = monthlyRevenue.reduce((total, item) => total + item.topups, 0);
  const totalSpend = monthlyRevenue.reduce((total, item) => total + item.spend, 0);
  const maxRevenue = Math.max(...monthlyRevenue.map((item) => item.revenue), 1);

  return (
    <section className="grid gap-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="m-0 text-2xl font-semibold text-[var(--brand-navy)]">Revenue Reports</h2>
          <p className="mt-1 text-sm text-[var(--muted)]">Revenue, top-up volume, spend trend, and client contribution overview.</p>
        </div>
        <button className="rounded-lg border border-[var(--line)] bg-[var(--white)] px-4 py-2 text-sm font-semibold text-[var(--brand-navy)] hover:bg-[var(--surface)]" type="button">
          Export Report
        </button>
      </div>

      <div className="grid grid-cols-4 gap-3 max-[1180px]:grid-cols-2 max-[720px]:grid-cols-1">
        {[
          { label: "Total Revenue", value: formatUsd(totalRevenue), detail: "Last 6 months" },
          { label: "Top-up Volume", value: formatUsd(totalTopups), detail: "Approved top-ups" },
          { label: "Tracked Spend", value: formatUsd(totalSpend), detail: "Meta account spend" },
          { label: "Monthly Growth", value: `${revenueGrowth}%`, detail: "Compared with last month" },
        ].map((metric) => (
          <article className="rounded-xl border border-[var(--line)] bg-[var(--white)] p-4" key={metric.label}>
            <p className="m-0 text-xs font-semibold uppercase text-[var(--muted)]">{metric.label}</p>
            <strong className="mt-2 block text-2xl text-[var(--brand-navy)]">{metric.value}</strong>
            <span className="mt-1 block text-xs text-[var(--muted)]">{metric.detail}</span>
          </article>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-4">
        <section className="col-span-8 rounded-xl border border-[var(--line)] bg-[var(--white)] p-4 max-[1180px]:col-span-12">
          <h3 className="m-0 text-base font-semibold text-[var(--brand-navy)]">Monthly Revenue Trend</h3>
          <div className="mt-5 flex h-64 items-end gap-4 border-b border-l border-[var(--line)] px-4 pb-4">
            {monthlyRevenue.map((month) => (
              <div className="flex flex-1 flex-col items-center gap-2" key={month.month}>
                <div className="flex h-48 w-full items-end justify-center rounded-t-lg bg-[var(--surface)]">
                  <div className="w-10 rounded-t-lg bg-[var(--brand-orange)]" style={{ height: `${(month.revenue / maxRevenue) * 100}%` }} title={`${month.month}: ${formatUsd(month.revenue)}`} />
                </div>
                <span className="text-xs font-semibold text-[var(--brand-navy)]">{month.month}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="col-span-4 rounded-xl border border-[var(--line)] bg-[var(--white)] p-4 max-[1180px]:col-span-12">
          <h3 className="m-0 text-base font-semibold text-[var(--brand-navy)]">Revenue Channels</h3>
          <div className="mt-4 grid gap-3">
            {revenueChannels.map((channel) => (
              <div className="rounded-lg border border-[var(--line)] bg-[var(--surface)] p-3" key={channel.name}>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-[var(--brand-navy)]">{channel.name}</span>
                  <span className="text-sm font-bold text-[var(--brand-orange)]">{channel.share}</span>
                </div>
                <span className="mt-1 block text-sm text-[var(--muted)]">{channel.amount}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="rounded-xl border border-[var(--line)] bg-[var(--white)] p-4">
        <h3 className="m-0 text-base font-semibold text-[var(--brand-navy)]">Top Client Revenue Snapshot</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[820px] border-collapse">
            <thead>
              <tr>
                {["Client", "Wallet Balance", "Credit", "Daily Limit", "Revenue Note"].map((heading) => (
                  <th className="border-b border-[var(--line)] px-3 py-2 text-left text-xs font-semibold uppercase text-[var(--muted)]" key={heading}>
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.clients.map((client) => (
                <tr key={client.email}>
                  <td className="border-b border-[var(--line)] px-3 py-2 text-sm text-[var(--brand-navy)]">
                    <span className="block font-semibold">{client.name}</span>
                    <span className="text-xs text-[var(--muted)]">{client.email}</span>
                  </td>
                  <td className="border-b border-[var(--line)] px-3 py-2 text-sm text-[var(--brand-navy)]">{client.balance}</td>
                  <td className="border-b border-[var(--line)] px-3 py-2 text-sm text-[var(--brand-navy)]">{client.credit}</td>
                  <td className="border-b border-[var(--line)] px-3 py-2 text-sm text-[var(--brand-navy)]">{client.dailyLimit}</td>
                  <td className="border-b border-[var(--line)] px-3 py-2 text-sm text-[var(--muted)]">Eligible for monthly service fee review</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
}
