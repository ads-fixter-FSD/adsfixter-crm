import type { AdAccount } from "@/types/account";
import AccountTableRow from "./AccountTableRow";

const COLUMNS = [
  "ID",
  "Account Account Details",
  "Credit Bal",
  "Spend(month)",
  "Meta Status",
  "Agency Status",
  "Last Top-Up",
  "Top Up",
  "Update",
  "Action",
];

interface AccountTableProps {
  accounts?: AdAccount[] | null;
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
            {COLUMNS.map((col, i) => (
              <th
                key={col}
                className={`whitespace-nowrap px-4 py-3 text-left body-sm-medium subtext-500 ${
                  i !== COLUMNS.length - 1
                    ? "border-r border-[var(--table-header-border)]"
                    : ""
                }`}
              >
                {col}
              </th>
            ))}
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
