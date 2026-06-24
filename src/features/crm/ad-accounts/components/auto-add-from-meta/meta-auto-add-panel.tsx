"use client";

import { RefreshCw } from "lucide-react";
import { useState } from "react";
import type { ToastAction } from "@/features/crm/components/forms/form-types";
import type { BusinessManager } from "@/features/crm/types/crm";

type MetaAutoAddPanelProps = {
  businessManagers: BusinessManager[];
  showToast: ToastAction;
};

export function MetaAutoAddPanel({ businessManagers, showToast }: MetaAutoAddPanelProps) {
  const [selectedBusinessManagerId, setSelectedBusinessManagerId] = useState(businessManagers[0]?.id ?? "");

  const fetchAvailableMetaAccounts = () => {
    const selectedBusinessManager = businessManagers.find((businessManager) => businessManager.id === selectedBusinessManagerId);
    showToast("success", `Fetching accounts from ${selectedBusinessManager?.name ?? "selected Business Manager"}`);
  };

  return (
    <div className="grid max-w-2xl gap-5">
      <div>
        <h3 className="m-0 text-base font-semibold text-[var(--brand-navy)]">Auto-Add Meta Ad Accounts</h3>
        <p className="mt-1 text-xs text-[var(--muted)]">Automatically import ad accounts from Meta and assign them to a Business Manager.</p>
      </div>

      <div className="grid gap-4">
        <label className="grid gap-2 text-sm font-semibold text-[var(--brand-navy)]">
          Business Manager
          <select className="min-h-9 w-full rounded-lg border border-[var(--line)] bg-[var(--white)] px-3 py-2 text-sm text-[var(--brand-navy)] outline-none focus:border-[var(--brand-navy)]" onChange={(event) => setSelectedBusinessManagerId(event.target.value)} value={selectedBusinessManagerId}>
            {businessManagers.map((businessManager) => (
              <option key={businessManager.id} value={businessManager.id}>
                {businessManager.name} ({businessManager.id})
              </option>
            ))}
          </select>
          <span className="text-xs font-normal text-[var(--muted)]">Select the Business Manager that will be used to fetch and assign ad accounts.</span>
        </label>

        <button className="inline-flex min-h-9 w-fit items-center justify-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--white)] px-3 py-2 text-sm font-semibold text-[var(--brand-navy)] transition hover:bg-[var(--surface)]" onClick={fetchAvailableMetaAccounts} type="button">
          <RefreshCw aria-hidden="true" size={15} strokeWidth={1.8} />
          Fetch Available Accounts
        </button>
      </div>
    </div>
  );
}
