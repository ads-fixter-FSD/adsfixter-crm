export type FilterKey = "all" | "active" | "inactive";

interface FilterTabsProps {
  active: FilterKey;
  counts: Record<FilterKey, number>;
  onChange: (key: FilterKey) => void;
}

const TABS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "active", label: "Active Account" },
  { key: "inactive", label: "Inactive Account" },
];

export default function FilterTabs({
  active,
  counts,
  onChange,
}: FilterTabsProps) {
  return (
    <div className="flex items-center gap-2">
      {TABS.map((tab) => {
        const isActive = tab.key === active;
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onChange(tab.key)}
            className={`flex items-center gap-1.5 rounded-full border px-3.5 py-2 body-sm-medium transition-colors ${
              isActive
                ? "border-[var(--color-primary-text-500)] bg-[var(--color-primary-text-500)] text-[var(--color-on-primary-text)]"
                : "border-[var(--color-line)] bg-white text-[var(--color-primary-text-400)] hover:bg-[var(--color-surface)]"
            }`}
          >
            {tab.label}
            <span
              className={`rounded-full px-1.5 py-0.5 body-sm-s ${
                isActive ? "bg-white/15" : "bg-[var(--color-surface)]"
              }`}
            >
              {counts[tab.key]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
