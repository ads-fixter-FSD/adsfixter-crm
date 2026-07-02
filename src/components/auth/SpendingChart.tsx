const MONTHS = [
  { label: "Jan", value: 30 },
  { label: "Feb", value: 45 },
  { label: "Mar", value: 40 },
  { label: "Apr", value: 55 },
  { label: "May", value: 85 },
];

export default function SpendingChart() {
  return (
    <div className="rounded-xl border border-neutral-100 bg-white p-3">
      <p className="text-xs font-medium text-neutral-700">Spending Overview</p>
      <div className="mt-3 flex h-24 items-end gap-3">
        {MONTHS.map((month, i) => (
          <div key={month.label} className="flex flex-1 flex-col items-center gap-1">
            <div
              className={`w-full rounded-t-md ${
                i === MONTHS.length - 1 ? "bg-orange-400" : "bg-neutral-100"
              }`}
              style={{ height: `${month.value}%` }}
            />
            <span className="text-[9px] text-neutral-400">{month.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
