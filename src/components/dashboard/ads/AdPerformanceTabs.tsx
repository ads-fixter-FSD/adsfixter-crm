export type AdFilterKey = "all" | "topPerforming";

interface AdPerformanceTabsProps {
  active: AdFilterKey;
  counts: Record<AdFilterKey, number>;
  onChange: (key: AdFilterKey) => void;
}

const TABS: { key: AdFilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "topPerforming", label: "Top Performing" },
];

export default function AdPerformanceTabs({
  active,
  counts,
  onChange,
}: AdPerformanceTabsProps) {
  return (
    <div
      className="inline-flex items-center gap-1 rounded-xl p-1"
      style={{
        height: 36,
        background: "var(--color-tab-track)",
      }}
    >
      {TABS.map((tab) => {
        const isActive = tab.key === active;
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onChange(tab.key)}
            className="flex items-center justify-center rounded-lg body-sm-medium transition-colors whitespace-nowrap"
            style={{
              height: 28,
              padding: "4px 10px",
              gap: 6,
              background: isActive
                ? "var(--color-tab-active-bg)"
                : "transparent",
              boxShadow: isActive ? "var(--color-tab-active-shadow)" : "none",
              color: isActive
                ? "var(--color-primary-text-500)"
                : "var(--color-primary-text-400)",
            }}
          >
            <span>{tab.label}</span>
            <span
              className="flex items-center justify-center rounded-full body-sm-s"
              style={{
                minWidth: 20,
                height: 20,
                padding: "0 6px",
                background: isActive
                  ? "var(--color-tab-badge-active-bg)"
                  : "var(--color-tab-badge-inactive-bg)",
                color: "var(--color-primary-text-500)",
              }}
            >
              {counts[tab.key]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
