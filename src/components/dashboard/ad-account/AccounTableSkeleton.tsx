import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CELL = "px-4 py-4 border-r border-[var(--color-line)]";

// Roughly mirrors AccountTable's column widths so the skeleton doesn't jump
// around once real data loads in.
const COLUMN_WIDTHS = [60, 220, 70, 90, 84, 90, 90, 100, 70, 32];

interface AccountTableSkeletonProps {
  rows?: number;
}

export default function AccountTableSkeleton({
  rows = 8,
}: AccountTableSkeletonProps) {
  return (
    <SkeletonTheme
      baseColor="var(--color-line)"
      highlightColor="var(--color-surface)"
    >
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
              {COLUMN_WIDTHS.map((width, i) => (
                <th
                  key={i}
                  className={`px-4 py-3 text-left ${
                    i !== COLUMN_WIDTHS.length - 1
                      ? "border-r border-[var(--table-header-border)]"
                      : ""
                  }`}
                >
                  <Skeleton width={width} height={12} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b border-[var(--color-line)] last:border-b-0"
              >
                {/* ID */}
                <td className={CELL}>
                  <Skeleton width={COLUMN_WIDTHS[0]} height={14} />
                </td>

                {/* Account details */}
                <td className={CELL}>
                  <div className="flex items-center gap-2.5">
                    <Skeleton circle width={28} height={28} />
                    <div className="flex-1">
                      <Skeleton width={140} height={14} />
                      <Skeleton width={110} height={11} />
                    </div>
                  </div>
                </td>

                {/* Credit balance */}
                <td className={CELL}>
                  <Skeleton width={COLUMN_WIDTHS[2]} height={14} />
                </td>

                {/* Spend this month */}
                <td className={CELL}>
                  <Skeleton width={COLUMN_WIDTHS[3]} height={14} />
                </td>

                {/* Meta status badge */}
                <td className={CELL}>
                  <Skeleton width={84} height={26} borderRadius={6} />
                </td>

                {/* Agency status */}
                <td className={CELL}>
                  <Skeleton width={COLUMN_WIDTHS[5]} height={14} />
                </td>

                {/* Last top-up */}
                <td className={CELL}>
                  <Skeleton width={90} height={13} />
                  <Skeleton width={80} height={11} />
                </td>

                {/* Top up button */}
                <td className={CELL}>
                  <Skeleton width={100} height={32} borderRadius={8} />
                </td>

                {/* Updated label */}
                <td className={CELL}>
                  <Skeleton width={COLUMN_WIDTHS[8]} height={12} />
                </td>

                {/* Action menu */}
                <td className="px-4 py-4">
                  <Skeleton width={32} height={32} borderRadius={8} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SkeletonTheme>
  );
}
