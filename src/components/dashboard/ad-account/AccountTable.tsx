import type { AdAccount } from "@/types/account";
import { ArrowUp, ArrowDown, ArrowUpDown, ChevronsUpDown, ChevronUp, ChevronDown } from "lucide-react";
import AccountTableRow from "./AccountTableRow";

export type SortKey =
  | "id"
  | "accountName"
  | "creditBalance"
  | "spendThisMonth"
  | "metaStatus"
  | "agencyStatus"
  | "lastTopUpDate"
  | "updatedLabel";

export type SortDirection = "asc" | "desc";

export interface SortState {
  key: SortKey | null;
  direction: SortDirection;
}

interface Column {
  label: string;
  sortKey: SortKey | null;
}

const COLUMNS: Column[] = [
  { label: "ID", sortKey: "id" },
  { label: "Account Account Details", sortKey: "accountName" },
  { label: "Credit Bal", sortKey: "creditBalance" },
  { label: "Spend(month)", sortKey: "spendThisMonth" },
  { label: "Meta Status", sortKey: "metaStatus" },
  { label: "Agency Status", sortKey: "agencyStatus" },
  { label: "Last Top-Up", sortKey: "lastTopUpDate" },
  { label: "Top Up", sortKey: null },
  { label: "Update", sortKey: "updatedLabel" },
  { label: "Action", sortKey: null },
];

interface AccountTableProps {
  accounts?: AdAccount[] | null;
  sort: SortState;
  onSortChange: (key: SortKey) => void;
  onTopUp: (account: AdAccount) => void;
  onTopUpHistory: (account: AdAccount) => void;
  onViewDetails?: (account: AdAccount) => void;
  onViewCampaign?: (account: AdAccount) => void;
  onSupportTicket?: (account: AdAccount) => void;
  onBmShareRequest?: (account: AdAccount) => void;
  onRequestNameChange?: (account: AdAccount) => void;
  onDeleteAccount?: (account: AdAccount) => void;
}

export default function AccountTable({
  accounts,
  sort,
  onSortChange,
  ...handlers
}: AccountTableProps) {
  const safeAccounts = accounts ?? [];

  return (
    <div className="overflow-x-auto rounded-[var(--btn-radius)] border border-[var(--color-line)]">
      <table className="w-full min-w-[980px] border-collapse">
        <thead>
          <tr
            className="border-b"
            style={{
              backgroundColor: "var(--table-header-bg)",
              borderColor: "var(--table-header-border)",
            }}
          >
            {COLUMNS.map((col, i) => {
              const isSortable = col.sortKey !== null;
              const isActive = isSortable && sort.key === col.sortKey;

              return (
                <th
                  key={col.label}
                  className={`whitespace-nowrap px-4 py-3 text-left body-sm-medium subtext-500 ${
                    i !== COLUMNS.length - 1
                      ? "border-r border-[var(--table-header-border)]"
                      : ""
                  }`}
                >
                  {isSortable ? (
                    <button
                      type="button"
                      onClick={() => onSortChange(col.sortKey as SortKey)}
                      className="flex items-center gap-1 body-sm-medium subtext-500 hover:text-[var(--color-primary-text-500)]"
                    >
                      {col.label}

                      {isActive ? (
                        sort.direction === "asc" ? (
                          <ChevronUp size={14} strokeWidth={2} />
                        ) : (
                          <ChevronDown size={14} strokeWidth={2} />
                        )
                      ) : (
                        <ChevronsUpDown
                          size={14}
                          strokeWidth={2}
                          className="opacity-50"
                        />
                      )}
                    </button>
                  ) : (
                    col.label
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {safeAccounts.length === 0 ? (
            <tr>
              <td
                colSpan={COLUMNS.length}
                className="px-4 py-10 text-center body-sm-regular subtext"
              >
                No accounts match your filters.
              </td>
            </tr>
          ) : (
            safeAccounts.map((account) => (
              <AccountTableRow
                key={`${account.id}-${account.accountId}`}
                account={account}
                {...handlers}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
