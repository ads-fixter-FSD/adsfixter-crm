"use client";

import { RefreshCw, Search, UserPlus } from "lucide-react";
import { useMemo, useState } from "react";
import type { ToastAction } from "@/features/crm/components/forms/form-types";
import type { BusinessManager, Client } from "@/features/crm/types/crm";

type MetaAutoAddPanelProps = {
  businessManagers: BusinessManager[];
  clients: Client[];
  showToast: ToastAction;
};

const availableMetaAccounts = [
  {
    id: "901245781234001",
    name: "ADF_2026_Meta Imported Sales",
    status: "ACTIVE",
    currency: "USD",
    balance: "$34.20",
    businessHint: "New account from selected BM",
  },
  {
    id: "901245781234002",
    name: "ADF_2026_Retargeting Backup",
    status: "PENDING_SETTLEMENT",
    currency: "USD",
    balance: "$0.00",
    businessHint: "Needs client assignment",
  },
  {
    id: "901245781234003",
    name: "ADF_2026_Lead Campaigns",
    status: "UNSETTLED",
    currency: "USD",
    balance: "$8.10",
    businessHint: "Recently discovered",
  },
];

export function MetaAutoAddPanel({ businessManagers, clients, showToast }: MetaAutoAddPanelProps) {
  const [selectedBusinessManagerId, setSelectedBusinessManagerId] = useState(businessManagers[0]?.id ?? "");
  const [selectedAccountIds, setSelectedAccountIds] = useState<string[]>([]);
  const [assignedClientEmail, setAssignedClientEmail] = useState("");
  const [hasFetchedAccounts, setHasFetchedAccounts] = useState(false);

  const selectedBusinessManager = useMemo(() => businessManagers.find((businessManager) => businessManager.id === selectedBusinessManagerId), [businessManagers, selectedBusinessManagerId]);

  const toggleSelectedAccount = (accountId: string) => {
    setSelectedAccountIds((current) => (current.includes(accountId) ? current.filter((id) => id !== accountId) : [...current, accountId]));
  };

  const fetchAvailableMetaAccounts = () => {
    setHasFetchedAccounts(true);
    showToast("success", `Fetched ${availableMetaAccounts.length} accounts from ${selectedBusinessManager?.name ?? "selected Business Manager"}`);
  };

  const importSelectedAccounts = () => {
    if (selectedAccountIds.length === 0) {
      showToast("error", "Select at least one Meta ad account first");
      return;
    }

    showToast("success", `${selectedAccountIds.length} Meta ad account added to CRM`);
  };

  return (
    <div className="grid gap-5">
      <div>
        <h3 className="m-0 text-base font-semibold text-[var(--brand-navy)]">Auto-Add Meta Ad Accounts</h3>
        <p className="mt-1 text-xs text-[var(--muted)]">Select a Business Manager, fetch available Meta ad accounts, then assign them to a client before importing.</p>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3 max-[720px]:grid-cols-1">
        <label className="grid gap-2 text-sm font-semibold text-[var(--brand-navy)]">
          Business Manager
          <select className="min-h-9 w-full rounded-lg border border-[var(--line)] bg-[var(--white)] px-3 py-2 text-sm text-[var(--brand-navy)] outline-none focus:border-[var(--brand-navy)]" onChange={(event) => setSelectedBusinessManagerId(event.target.value)} value={selectedBusinessManagerId}>
            {businessManagers.map((businessManager) => (
              <option key={businessManager.id} value={businessManager.id}>
                {businessManager.name} ({businessManager.id})
              </option>
            ))}
          </select>
          <span className="text-xs font-normal text-[var(--muted)]">This Business Manager will be scanned for unassigned ad accounts.</span>
        </label>

        <button className="inline-flex min-h-9 items-center justify-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--white)] px-3 py-2 text-sm font-semibold text-[var(--brand-navy)] transition hover:bg-[var(--surface)]" onClick={fetchAvailableMetaAccounts} type="button">
          <RefreshCw aria-hidden="true" size={15} strokeWidth={1.8} />
          Fetch Available Accounts
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 max-[980px]:grid-cols-1">
        <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-3">
          <span className="text-xs font-semibold text-[var(--muted)]">Selected BM</span>
          <strong className="mt-1 block text-sm text-[var(--brand-navy)]">{selectedBusinessManager?.name ?? "No Business Manager selected"}</strong>
        </div>
        <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-3">
          <span className="text-xs font-semibold text-[var(--muted)]">Fetched Accounts</span>
          <strong className="mt-1 block text-sm text-[var(--brand-navy)]">{hasFetchedAccounts ? availableMetaAccounts.length : 0}</strong>
        </div>
        <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-3">
          <span className="text-xs font-semibold text-[var(--muted)]">Selected For Import</span>
          <strong className="mt-1 block text-sm text-[var(--brand-navy)]">{selectedAccountIds.length}</strong>
        </div>
      </div>

      {hasFetchedAccounts ? (
        <div className="grid gap-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-[var(--brand-navy)]">
            <Search aria-hidden="true" size={15} strokeWidth={1.8} />
            Available Meta Accounts
          </div>

          <div className="grid gap-2">
            {availableMetaAccounts.map((account) => (
              <label className="grid cursor-pointer grid-cols-[auto_1fr_auto] items-center gap-3 rounded-xl border border-[var(--line)] bg-[var(--white)] p-3 transition hover:bg-[var(--surface)] max-[720px]:grid-cols-[auto_1fr]" key={account.id}>
                <input checked={selectedAccountIds.includes(account.id)} onChange={() => toggleSelectedAccount(account.id)} type="checkbox" />
                <span className="grid gap-1">
                  <strong className="text-sm text-[var(--brand-navy)]">{account.name}</strong>
                  <small className="text-xs text-[var(--muted)]">
                    act_{account.id} | {account.businessHint}
                  </small>
                </span>
                <span className="text-right text-xs text-[var(--muted)] max-[720px]:col-span-2 max-[720px]:text-left">
                  {account.status} | {account.currency} | {account.balance}
                </span>
              </label>
            ))}
          </div>

          <label className="grid gap-2 text-sm font-semibold text-[var(--brand-navy)]">
            Assign Imported Accounts To Client
            <select className="min-h-9 w-full rounded-lg border border-[var(--line)] bg-[var(--white)] px-3 py-2 text-sm text-[var(--brand-navy)] outline-none focus:border-[var(--brand-navy)]" onChange={(event) => setAssignedClientEmail(event.target.value)} value={assignedClientEmail}>
              <option value="">Leave unassigned</option>
              {clients.map((client) => (
                <option key={client.email} value={client.email}>
                  {client.name} ({client.email})
                </option>
              ))}
            </select>
            <span className="text-xs font-normal text-[var(--muted)]">You can keep accounts unassigned and assign later from the database table.</span>
          </label>

          <button className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border-0 bg-[var(--brand-orange)] px-3 py-2 text-sm font-semibold text-[var(--white)] transition hover:bg-[var(--black)]" onClick={importSelectedAccounts} type="button">
            <UserPlus aria-hidden="true" size={15} strokeWidth={1.8} />
            Add Selected Accounts To CRM
          </button>
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-[var(--line)] bg-[var(--surface)] p-5 text-center">
          <p className="m-0 text-sm text-[var(--muted)]">Choose a Business Manager and fetch available accounts to start auto adding from Meta.</p>
        </div>
      )}
    </div>
  );
}
