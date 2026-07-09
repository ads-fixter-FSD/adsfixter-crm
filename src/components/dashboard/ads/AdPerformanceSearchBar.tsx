// import { Search, SlidersHorizontal } from "lucide-react";

// interface AdPerformanceSearchBarProps {
//   value: string;
//   onChange: (value: string) => void;
// }

// export default function AdPerformanceSearchBar({
//   value,
//   onChange,
// }: AdPerformanceSearchBarProps) {
//   return (
//     <div className="flex items-center gap-3">
//       <div className="flex items-center gap-2 rounded-[var(--btn-radius)] border border-[var(--color-line)] bg-white px-3 py-2.5">
//         <Search size={16} className="text-[var(--color-subtext-500)]" />
//         <input
//           type="text"
//           value={value}
//           onChange={(e) => onChange(e.target.value)}
//           placeholder="Search..."
//           className="w-40 body-sm-regular text-[var(--color-primary-text-500)] outline-none placeholder:text-[var(--color-subtext-400)]"
//         />
//       </div>

//       <button
//         type="button"
//         className="flex items-center gap-2 rounded-[var(--btn-radius)] border border-[var(--color-line)] bg-white px-3.5 py-2.5 body-sm-medium text-[var(--color-primary-text-400)] hover:bg-[var(--color-surface)]"
//       >
//         <SlidersHorizontal size={16} />
//         Filter
//       </button>
//     </div>
//   );
// }

"use client";

import { useEffect, useRef, useState } from "react";
import { Search, SlidersHorizontal, Check } from "lucide-react";

interface AdPerformanceSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  filters?: FilterState;
  onFiltersChange?: (filters: FilterState) => void;
}

export interface FilterState {
  status: "all" | "active" | "paused";
  performance: "all" | "top" | "low";
  ctrMin: string;
}

const DEFAULT_FILTERS: FilterState = {
  status: "all",
  performance: "all",
  ctrMin: "",
};

export default function AdPerformanceSearchBar({
  value,
  onChange,
  filters = DEFAULT_FILTERS,
  onFiltersChange,
}: AdPerformanceSearchBarProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeCount =
    (filters.status !== "all" ? 1 : 0) +
    (filters.performance !== "all" ? 1 : 0) +
    (filters.ctrMin !== "" ? 1 : 0);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function updateFilter<K extends keyof FilterState>(
    key: K,
    val: FilterState[K],
  ) {
    onFiltersChange?.({ ...filters, [key]: val });
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex flex-1 min-w-[280px] max-w-[420px] items-center gap-2 rounded-[var(--btn-radius)] border border-[var(--color-line)] bg-white px-3 py-2.5">
        <Search
          size={16}
          className="text-[var(--color-subtext-500)] shrink-0"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search by campaign or ad name..."
          className="w-full body-sm-regular text-[var(--color-primary-text-500)] outline-none placeholder:text-[var(--color-subtext-400)]"
        />
      </div>

      <div className="relative" ref={containerRef}>
        <button
          type="button"
          onClick={() => setIsFilterOpen((prev) => !prev)}
          className="flex items-center gap-2 rounded-[var(--btn-radius)] border border-[var(--color-line)] bg-white px-3.5 py-2.5 body-sm-medium text-[var(--color-primary-text-400)] hover:bg-[var(--color-surface)]"
        >
          <SlidersHorizontal size={16} />
          Filter
          {activeCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-primary)] body-xsm-medium text-white">
              {activeCount}
            </span>
          )}
        </button>

        {isFilterOpen && (
          <div
            className="absolute right-0 z-20 mt-2 w-64 rounded-[var(--btn-radius)] border border-[var(--color-line)] bg-white p-3 shadow-lg"
            style={{ boxShadow: "0px 8px 24px 0px rgba(0,0,0,0.08)" }}
          >
            {/* Status */}
            <p className="body-xsm-medium subtext-500 mb-2">Ad Status</p>
            <div className="flex flex-col gap-1 mb-3">
              {(["all", "active", "paused"] as const).map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => updateFilter("status", opt)}
                  className="flex items-center justify-between rounded-md px-2 py-1.5 text-left body-sm-regular hover:bg-[var(--color-surface)]"
                >
                  <span className="capitalize primary-text">{opt}</span>
                  {filters.status === opt && (
                    <Check size={14} className="text-[var(--color-primary)]" />
                  )}
                </button>
              ))}
            </div>

            {/* Performance */}
            <p className="body-xsm-medium subtext-500 mb-2">Performance</p>
            <div className="flex flex-col gap-1 mb-3">
              {(
                [
                  { key: "all", label: "All" },
                  { key: "top", label: "Top Performing" },
                  { key: "low", label: "Low Performing" },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => updateFilter("performance", opt.key)}
                  className="flex items-center justify-between rounded-md px-2 py-1.5 text-left body-sm-regular hover:bg-[var(--color-surface)]"
                >
                  <span className="primary-text">{opt.label}</span>
                  {filters.performance === opt.key && (
                    <Check size={14} className="text-[var(--color-primary)]" />
                  )}
                </button>
              ))}
            </div>

            {/* CTR min */}
            <p className="body-xsm-medium subtext-500 mb-2">Min CTR (%)</p>
            <input
              type="number"
              min={0}
              step={0.1}
              value={filters.ctrMin}
              onChange={(e) => updateFilter("ctrMin", e.target.value)}
              placeholder="e.g. 1.5"
              className="w-full rounded-md border border-[var(--color-line)] px-2.5 py-1.5 body-sm-regular outline-none mb-3"
            />

            <button
              type="button"
              onClick={() => onFiltersChange?.(DEFAULT_FILTERS)}
              className="w-full rounded-md border border-[var(--color-line)] px-2.5 py-1.5 body-sm-medium text-[var(--color-primary-text-400)] hover:bg-[var(--color-surface)]"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
