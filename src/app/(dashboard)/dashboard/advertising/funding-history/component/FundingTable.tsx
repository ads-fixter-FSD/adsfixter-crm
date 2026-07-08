import React from "react";
import { ArrowUpDown } from "lucide-react";
import { FundingRow } from "@/types/dashboard/advertising/funding-history/types";
import { TABLE_HEADERS } from "@/types/dashboard/advertising/funding-history/data";
import FundingTableRow from "./FundingTableRow";

export default function FundingTable({ rows }: { rows: FundingRow[] }) {
  return (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[var(--table-header-bg)] border-y border-[var(--table-header-border)]">
            {TABLE_HEADERS.map((header) => {
              const sortable = header !== "Action" && header !== "Description";
              return (
                <th key={header} className="text-left px-4 py-3 whitespace-nowrap">
                  <span className="flex items-center gap-1 text-xs font-medium text-[var(--color-subtext-500)]">
                    {sortable && (
                      <ArrowUpDown size={12} className="text-[var(--color-subtext-400)]" />
                    )}
                    <span className="body-xsm-regular font-medium text-[var(--color-subtext-500)]">
                      {header}
                    </span>
                  </span>
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, idx) => (
            <FundingTableRow key={row.id} row={row} isLast={idx === rows.length - 1} />
          ))}
        </tbody>
      </table>
    </div>
  );
}