type BalanceHistoryRow = {
  date: string;
  type: "ADD" | "SUBTRACT";
  amount: string;
  balanceAfter: string;
  description: string;
};

const balanceHistoryRows: BalanceHistoryRow[] = [
  { date: "6/19/2026\n6 days ago", type: "ADD", amount: "+$10.02", balanceAfter: "$606.04", description: "Top-up request #714 approved\nRef: #714" },
  { date: "6/19/2026\n6 days ago", type: "SUBTRACT", amount: "-$1.00", balanceAfter: "$596.02", description: "ADF_1283_BoostFixter_Legal_06\n2390366276370664" },
  { date: "6/17/2026\n8 days ago", type: "ADD", amount: "+$4.72", balanceAfter: "$605.02", description: "Top-up request #664 approved\nRef: #664" },
  { date: "6/14/2026\n11 days ago", type: "SUBTRACT", amount: "-$29.00", balanceAfter: "$600.30", description: "ADF_1283_BoostFixter_Legal_06\n2390366276370664" },
  { date: "6/14/2026\n11 days ago", type: "ADD", amount: "+$22.36", balanceAfter: "$629.30", description: "Top-up request #674 approved\nRef: #674" },
  { date: "6/14/2026\n11 days ago", type: "SUBTRACT", amount: "-$20.00", balanceAfter: "$597.47", description: "ADF_1283_BoostFixter_Legal_06\n2390366276370664" },
  { date: "6/13/2026\n12 days ago", type: "ADD", amount: "+$23.69", balanceAfter: "$617.47", description: "Top-up request #541 approved\nRef: #541" },
  { date: "6/12/2026\n13 days ago", type: "SUBTRACT", amount: "-$20.00", balanceAfter: "$594.49", description: "ADF_1283_BoostFixter_Legal_06\n2390366276370664" },
  { date: "6/12/2026\n13 days ago", type: "ADD", amount: "+$11.02", balanceAfter: "$614.49", description: "Top-up request #533 approved\nRef: #533" },
  { date: "6/12/2026\n13 days ago", type: "ADD", amount: "+$22.06", balanceAfter: "$604.40", description: "Top-up request #518 approved\nRef: #518" },
  { date: "6/12/2026\n13 days ago", type: "SUBTRACT", amount: "-$20.00", balanceAfter: "$582.35", description: "ADF_1283_BoostFixter_Legal_06\n2390366276370664" },
  { date: "6/12/2026\n13 days ago", type: "SUBTRACT", amount: "-$10.01", balanceAfter: "$572.35", description: "ADF_1283_BoostFixter_Legal_06\n2390366276370664" },
  { date: "6/12/2026\n13 days ago", type: "ADD", amount: "+$17.72", balanceAfter: "$612.36", description: "Top-up request #509 approved\nRef: #509" },
  { date: "6/12/2026\n13 days ago", type: "SUBTRACT", amount: "-$7.63", balanceAfter: "$604.63", description: "ADF_1283_BoostFixter_Legal_06\n2390366276370664" },
  { date: "6/9/2026\n16 days ago", type: "ADD", amount: "+$17.75", balanceAfter: "$613.37", description: "Top-up request #414 approved\nRef: #414" },
];

export function ClientBalanceHistorySection() {
  return (
    <section className="grid w-full gap-5">
      <div>
        <h2 className="m-0 text-2xl font-semibold text-[var(--brand-navy)]">Balance History</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">View your account balance transaction history</p>
      </div>

      <div className="rounded-xl border border-[var(--line)] bg-[var(--white)] p-4">
        <h3 className="m-0 text-base font-semibold text-[var(--brand-navy)]">Balance History</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[820px] border-collapse">
            <thead>
              <tr>
                {["Date", "Type", "Amount", "Balance After", "Description"].map((heading) => (
                  <th className="border-b border-[var(--line)] px-3 py-2 text-left text-xs font-semibold text-[var(--brand-navy)]" key={heading}>
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {balanceHistoryRows.map((row, index) => (
                <tr key={`${row.date}-${index}`}>
                  <td className="whitespace-pre-line border-b border-[var(--line)] px-3 py-2 text-sm text-[var(--brand-navy)]">{row.date}</td>
                  <td className="border-b border-[var(--line)] px-3 py-2 text-sm">
                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${row.type === "ADD" ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-700"}`}>{row.type}</span>
                  </td>
                  <td className={`border-b border-[var(--line)] px-3 py-2 text-sm font-semibold ${row.type === "ADD" ? "text-green-600" : "text-red-600"}`}>{row.amount}</td>
                  <td className="border-b border-[var(--line)] px-3 py-2 text-sm text-[var(--brand-navy)]">{row.balanceAfter}</td>
                  <td className="whitespace-pre-line border-b border-[var(--line)] px-3 py-2 text-sm text-[var(--brand-navy)]">{row.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
