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
  sortConfig = { key: null, direction: null },
  onSortChange,
}: {
  rows: FundingRow[];
  sortConfig?: SortConfig;
  onSortChange?: (key: SortKey, direction: "asc" | "desc") => void;
}) {
  return (
    <div className="overflow-x-auto border border-[var(--table-header-border)] rounded-xl">
      <table className="w-full border-collapse min-w-[900px]">
        <thead>
          <tr className="bg-[var(--table-header-bg)]">
            {TABLE_HEADERS.map((header, idx) => {
              const sortKey = HEADER_SORT_KEY_MAP[header] as SortKey | null;
              const isSortable = !!sortKey;
              const isActive = sortConfig.key === sortKey;

              return (
                <th
                  key={header}
                  className={`text-center px-3 sm:px-4 md:px-6 py-3 sm:py-4 whitespace-nowrap border-b border-[var(--table-header-border)] ${
                    idx !== TABLE_HEADERS.length - 1
                      ? "border-r border-[var(--table-header-border)]"
                      : ""
                  }`}
                >
                  {isSortable ? (
                    <div className="flex items-center justify-center gap-1.5">
                      <span
                        className={`text-xs sm:text-sm font-medium transition-colors ${
                          isActive
                            ? "text-[var(--color-primary-text-500)]"
                            : "text-[var(--color-primary-text-400)]"
                        }`}
                      >
                        {header}
                      </span>
                      <SortIcon
                        direction={isActive ? sortConfig.direction : null}
                        onAscClick={() => onSortChange?.(sortKey!, "asc")}
                        onDescClick={() => onSortChange?.(sortKey!, "desc")}
                      />
                    </div>
                  ) : (
                    <span className="flex items-center justify-center text-xs sm:text-sm font-medium text-[var(--color-primary-text-400)]">
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