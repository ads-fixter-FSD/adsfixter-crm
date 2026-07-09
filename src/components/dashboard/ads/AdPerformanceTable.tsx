import { ArrowUp, ArrowDown, ArrowUpDown, ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";
import type { AdPerformanceRow } from "@/types/adsPerformance";
import AdPerformanceTableRow, {
  type AdRowAction,
} from "./AdPerformanceTableRow";

export type AdSortKey =
  | "campaignName"
  | "spend"
  | "ctr"
  | "cpm"
  | "reach"
  | "results";

export interface AdSortState {
  key: AdSortKey | null;
  direction: "asc" | "desc";
}

interface Column {
  label: string;
  sortKey: AdSortKey | null;
}

const COLUMNS: Column[] = [
  { label: "Campaign", sortKey: "campaignName" },
  { label: "AD", sortKey: null },
  { label: "Spend", sortKey: "spend" },
  { label: "CTR", sortKey: "ctr" },
  { label: "CPM", sortKey: "cpm" },
  { label: "Reach", sortKey: "reach" },
  { label: "Results", sortKey: "results" },
  { label: "Action", sortKey: null }, 
];

interface AdPerformanceTableProps {
  rows: AdPerformanceRow[];
  sort: AdSortState;
  onSortChange: (key: AdSortKey) => void;
  onAction?: (action: AdRowAction, row: AdPerformanceRow) => void;
}

export default function AdPerformanceTable({
  rows,
  sort,
  onSortChange,
  onAction,
}: AdPerformanceTableProps) {
  return (
    <div className="overflow-x-auto rounded-[var(--btn-radius)] border border-[var(--color-line)]">
      <table className="w-full min-w-[900px] border-collapse">
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
                      onClick={() => onSortChange(col.sortKey as AdSortKey)}
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
                          className="opacity-40"
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
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={COLUMNS.length}
                className="px-4 py-10 text-center body-sm-regular subtext"
              >
                No ads match your filters.
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <AdPerformanceTableRow
                key={row.id}
                row={row}
                onAction={onAction}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
