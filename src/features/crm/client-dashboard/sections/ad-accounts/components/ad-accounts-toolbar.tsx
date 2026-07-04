"use client";

import { ChevronDown, Search } from "lucide-react";
import { useRef, useState } from "react";
import type { MetaAdAccountStatus } from "@/features/crm/types/crm";
import { useClickOutside } from "@/hooks/use-click-outside";

const accountStatusOptions: MetaAdAccountStatus[] = [
  "ACTIVE",
  "UNSETTLED",
  "DISABLED",
  "PENDING_RISK_REVIEW",
  "PENDING_SETTLEMENT",
  "CLOSED",
  "UNKNOWN",
];

type AdAccountsToolbarProps = {
  searchQuery: string;
  selectedStatuses: MetaAdAccountStatus[];
  onSearchChange: (value: string) => void;
  onToggleStatus: (status: MetaAdAccountStatus) => void;
  onClearStatuses: () => void;
};

export function AdAccountsToolbar({
  searchQuery,
  selectedStatuses,
  onSearchChange,
  onToggleStatus,
  onClearStatuses,
}: AdAccountsToolbarProps) {
  const statusFilterRef = useRef<HTMLDivElement | null>(null);
  const [isStatusFilterOpen, setIsStatusFilterOpen] = useState(false);

  useClickOutside(statusFilterRef, () => setIsStatusFilterOpen(false));

  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
      <label className="flex min-h-9 w-72 items-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--white)] px-3 text-[var(--muted)] max-[720px]:w-full">
        <Search aria-hidden="true" size={15} strokeWidth={1.9} />
        <input
          className="min-w-0 flex-1 bg-transparent text-sm text-[var(--brand-navy)] outline-none"
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search accounts..."
          type="search"
          value={searchQuery}
        />
      </label>

      <div className="relative" ref={statusFilterRef}>
        <button
          className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-[var(--brand-orange)] bg-[var(--brand-orange)] px-3 text-sm font-semibold text-[var(--brand-orange-contrast)] hover:bg-[var(--brand-orange-hover)]"
          onClick={() => setIsStatusFilterOpen((current) => !current)}
          type="button"
        >
          Status
          <ChevronDown aria-hidden="true" className={`transition-transform ${isStatusFilterOpen ? "rotate-180" : ""}`} size={15} strokeWidth={2} />
        </button>
        {isStatusFilterOpen ? (
          <div className="absolute right-0 top-[calc(100%+0.4rem)] z-20 grid min-w-56 gap-2 rounded-xl border-2 border-[var(--line)] bg-[var(--white)] p-4">
            <label className="flex items-center gap-2 text-xs font-semibold text-[var(--brand-navy)]">
              <input checked={selectedStatuses.length === 0} onChange={onClearStatuses} type="checkbox" />
              All Statuses
            </label>
            {accountStatusOptions.map((status) => (
              <label className="flex items-center gap-2 text-xs text-[var(--brand-navy)]" key={status}>
                <input checked={selectedStatuses.includes(status)} onChange={() => onToggleStatus(status)} type="checkbox" />
                {status}
              </label>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
