"use client";

import { RefreshCw } from "lucide-react";
import { useState } from "react";
import { PrimaryButton } from "@/components/shared-buttons";
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
    <div className="grid w-full gap-5">
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

        <PrimaryButton className="w-fit px-3" onClick={fetchAvailableMetaAccounts} type="button">
          <RefreshCw aria-hidden="true" size={15} strokeWidth={1.8} />
          Fetch Available Accounts
        </PrimaryButton>
      </div>
    </div>
  );
}
