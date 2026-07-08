import React from "react";
import { FundingRow, SortConfig, SortKey } from "@/types/dashboard/advertising/funding-history/types";
import {
  TABLE_HEADERS,
  HEADER_SORT_KEY_MAP,
} from "@/types/dashboard/advertising/funding-history/data";
import FundingTableRow from "./FundingTableRow";
import SortIcon from "./SortIcon";

export default function FundingTable({
  rows,
  sortConfig = { key: null, direction: null }, // ← default value যোগ করলাম
  onSortChange,
}: {
  rows: FundingRow[];
  sortConfig?: SortConfig;
  onSortChange?: (key: SortKey) => void;
}) {
  return (
    <div className="overflow-x-auto border border-[var(--table-header-border)] rounded-xl">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[var(--table-header-bg)]">
            {TABLE_HEADERS.map((header, idx) => {
              const sortKey = HEADER_SORT_KEY_MAP[header] as SortKey | null;
              const isSortable = !!sortKey;
              const isActive = sortConfig.key === sortKey;

              return (
                <th
                  key={header}
                  className={`text-center px-6 py-4 whitespace-nowrap border-b border-[var(--table-header-border)] ${
                    idx !== TABLE_HEADERS.length - 1
                      ? "border-r border-[var(--table-header-border)]"
                      : ""
                  }`}
                >
                  {isSortable ? (
                    <button
                      type="button"
                      onClick={() => onSortChange?.(sortKey!)}
                      className="flex items-center justify-center gap-1.5 mx-auto group"
                    >
                      <span
                        className={`body-sm-medium transition-colors ${
                          isActive
                            ? "text-[var(--color-primary-text-500)]"
                            : "text-[var(--color-primary-text-400)] group-hover:text-[var(--color-primary-text-500)]"
                        }`}
                      >
                        {header}
                      </span>
                      <SortIcon
                        direction={isActive ? sortConfig.direction : null}
                      />
                    </button>
                  ) : (
                    <span className="flex items-center justify-center body-sm-medium text-[var(--color-primary-text-400)]">
                      {header}
                    </span>
                  )}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, idx) => (
            <FundingTableRow
              key={row.id}
              row={row}
              isLast={idx === rows.length - 1}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}