import type { AdAccount } from "@/types/account";
import StatusBadge from ".//StatuBadge";
import PlatformIcon from "./PlatFormIcon";
import ActionMenu from "./ActionMenu";

function formatMoney(amount: number) {
  return `$${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

interface AccountTableRowProps {
  account: AdAccount;
  onTopUp: (account: AdAccount) => void;
  onTopUpHistory: (account: AdAccount) => void;
  onViewDetails?: (account: AdAccount) => void;
  onViewCampaign?: (account: AdAccount) => void;
  onSupportTicket?: (account: AdAccount) => void;
  onBmShareRequest?: (account: AdAccount) => void;
  onRequestNameChange?: (account: AdAccount) => void;
  onDeleteAccount?: (account: AdAccount) => void;
}

const CELL = "px-4 py-4 border-r border-[var(--color-line)]";

export default function AccountTableRow({
  account,
  onTopUp,
  onTopUpHistory,
  onViewDetails,
  onViewCampaign,
  onSupportTicket,
  onBmShareRequest,
  onRequestNameChange,
  onDeleteAccount,
}: AccountTableRowProps) {
  return (
    <tr className="border-b border-[var(--color-line)] last:border-b-0">
      <td className={`${CELL} body-sm-medium primary-text whitespace-nowrap`}>
        {account.id}
      </td>

      <td className={CELL}>
        <div className="flex items-center gap-2.5">
          <PlatformIcon platform={account.platform} />
          <div>
            <p className="body-sm-medium primary-text">{account.accountName}</p>
            <p className="body-xsm-regular subtext-400 flex items-center gap-1">
              ID: {account.accountId}
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                className="opacity-70"
              >
                <rect
                  x="9"
                  y="9"
                  width="12"
                  height="12"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M5 15V5a2 2 0 0 1 2-2h10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </p>
          </div>
        </div>
      </td>

      <td className={`${CELL} body-sm-regular primary-text whitespace-nowrap`}>
        {formatMoney(account.creditBalance)}
      </td>

      <td className={`${CELL} body-sm-regular primary-text whitespace-nowrap`}>
        {formatMoney(account.spendThisMonth)}
      </td>

      <td className={CELL}>
        <StatusBadge status={account.metaStatus} />
      </td>

      <td className={`${CELL} body-sm-regular subtext-400 whitespace-nowrap`}>
        {account.agencyStatus}
      </td>

      <td className={`${CELL} whitespace-nowrap`}>
        <p className="body-sm-regular primary-text">{account.lastTopUpLabel}</p>
        <p className="body-xsm-regular subtext-400">{account.lastTopUpDate}</p>
      </td>

      <td className={`${CELL} whitespace-nowrap`}>
        <button
          type="button"
          onClick={() => onTopUp(account)}
          className="flex items-center gap-1.5 rounded-[var(--btn-radius)] border border-[var(--color-primary)] px-3 py-1.5 body-sm-medium text-[var(--color-primary)] hover:bg-[var(--color-primary-soft)]"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 3v12m0 0-4-4m4 4 4-4M5 21h14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Top Up
        </button>
      </td>

      <td className={`${CELL} body-xsm-regular subtext-400 whitespace-nowrap`}>
        {account.updatedLabel}
      </td>

      <td className="px-4 py-4">
        <ActionMenu
          onViewDetails={() => onViewDetails?.(account)}
          onViewCampaign={() => onViewCampaign?.(account)}
          onTopUpHistory={() => onTopUpHistory(account)}
          onSupportTicket={() => onSupportTicket?.(account)}
          onBmShareRequest={() => onBmShareRequest?.(account)}
          onRequestNameChange={() => onRequestNameChange?.(account)}
          onDeleteAccount={() => onDeleteAccount?.(account)}
        />
      </td>
    </tr>
  );
}
