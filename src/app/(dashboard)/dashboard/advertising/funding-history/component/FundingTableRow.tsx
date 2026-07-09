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
  const cellBase =
    "px-3 sm:px-4 md:px-6 py-3.5 sm:py-4 md:py-5 align-middle text-center border-[var(--color-line)] border-r";
  const lastCellBase = "px-3 sm:px-4 md:px-6 py-3.5 sm:py-4 md:py-5 align-middle text-center";

  return (
    <tr className={isLast ? "" : "border-b border-[var(--color-line)]"}>
      <td className={`${cellBase} whitespace-nowrap`}>
        <p className="text-xs sm:text-sm font-medium text-[var(--color-primary-text-500)]">
          {row.date}, {row.time}
        </p>
      </td>

      <td className={cellBase}>
        <div className="flex justify-center">
          <PlatformBadge
            platform={row.platform}
            accountName={row.accountName}
            accountId={row.accountId}
          />
        </div>
      </td>

      <td className={`${cellBase} whitespace-nowrap`}>
        <div className="flex justify-center">
          <TypeBadge />
        </div>
      </td>

      <td className={`${cellBase} whitespace-nowrap`}>
        <span className="text-xs sm:text-sm font-medium text-[var(--color-primary-text-500)]">
          {row.amount}
        </span>
      </td>

      <td className={`${cellBase} whitespace-nowrap`}>
        <span className="text-xs sm:text-sm font-medium text-[var(--color-danger-text)]">
          {row.fee}
        </span>
      </td>

      <td className={`${cellBase} whitespace-nowrap`}>
        <span className="text-xs sm:text-sm font-medium text-[var(--color-primary-text-500)]">
          {row.usd}
        </span>
      </td>

      <td className={`${cellBase} whitespace-nowrap`}>
        <span className="text-xs sm:text-sm font-medium text-[var(--color-success-text)]">
          {row.remainingBal}
        </span>
      </td>

      <td className={`${cellBase} max-w-[160px] sm:max-w-[200px] md:max-w-[220px]`}>
        <span className="text-xs sm:text-sm text-[var(--color-subtext-500)] leading-relaxed">
          {row.description}
        </span>
      </td>

      <td className={lastCellBase}>
        <button
          type="button"
          aria-label="Row actions"
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg border border-[var(--color-line)] flex items-center justify-center text-[var(--color-subtext-500)] hover:bg-[var(--color-surface)] transition-colors mx-auto"
        >
          <MoreVertical size={14} className="sm:w-4 sm:h-4" />
        </button>
      </td>
    </tr>
  );
}