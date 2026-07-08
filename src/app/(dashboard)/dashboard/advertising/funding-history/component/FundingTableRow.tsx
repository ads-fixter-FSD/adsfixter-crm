import React from "react";
import { MoreVertical } from "lucide-react";
import { FundingRow } from "@/types/dashboard/advertising/funding-history/types";
import PlatformBadge from "./PlatformBadge";
import TypeBadge from "./TypeBadge";

export default function FundingTableRow({
  row,
  isLast,
}: {
  row: FundingRow;
  isLast: boolean;
}) {
  return (
    <tr className={isLast ? "" : "border-b border-[var(--color-line)]"}>
      <td className="px-4 py-4 whitespace-nowrap">
        <p className="body-sm-medium text-[var(--color-primary-text-500)]">
          {row.date}, {row.time}
        </p>
      </td>

      <td className="px-4 py-4">
        <PlatformBadge
          platform={row.platform}
          accountName={row.accountName}
          accountId={row.accountId}
        />
      </td>

      <td className="px-4 py-4 whitespace-nowrap">
        <TypeBadge />
      </td>

      <td className="px-4 py-4 whitespace-nowrap">
        <span className="body-sm-regular text-[var(--color-primary-text-500)]">
          {row.amount}
        </span>
      </td>

      <td className="px-4 py-4 whitespace-nowrap">
        <span className="body-sm-regular text-[var(--color-danger-text)]">
          {row.fee}
        </span>
      </td>

      <td className="px-4 py-4 whitespace-nowrap">
        <span className="body-sm-regular text-[var(--color-primary-text-500)]">
          {row.usd}
        </span>
      </td>

      <td className="px-4 py-4 whitespace-nowrap">
        <span className="body-sm-medium text-[var(--color-success-text)]">
          {row.remainingBal}
        </span>
      </td>

      <td className="px-4 py-4 max-w-[200px]">
        <span className="body-sm-regular text-[var(--color-subtext-500)]">
          {row.description}
        </span>
      </td>

      <td className="px-4 py-4">
        <button
          type="button"
          aria-label="Row actions"
          className="w-8 h-8 rounded-lg border border-[var(--color-line)] flex items-center justify-center text-[var(--color-subtext-500)] hover:bg-[var(--color-surface)] transition-colors"
        >
          <MoreVertical size={16} />
        </button>
      </td>
    </tr>
  );
}