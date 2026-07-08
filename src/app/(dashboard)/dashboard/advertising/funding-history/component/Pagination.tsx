import React from "react";
import { ChevronLeft, ChevronRight, ListFilter } from "lucide-react";

export default function Pagination({
  currentPage,
  totalPages,
  perPage,
  onPageChange,
  onPerPageChange,
}: {
  currentPage: number;
  totalPages: number;
  perPage: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (value: number) => void;
}) {
  return (
    <div className="px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[var(--color-line)] mt-2">
      <div className="flex items-center gap-2 body-sm-regular text-[var(--color-subtext-500)]">
        <span>Show</span>

        <div className="relative">
          <ListFilter
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-subtext-500)] pointer-events-none"
          />
          <select
            value={perPage}
            onChange={(e) => onPerPageChange(Number(e.target.value))}
            className="h-9 pl-8 pr-8 rounded-lg border border-[var(--color-line)] body-sm-regular text-[var(--color-primary-text-500)] bg-[var(--color-field)] outline-none appearance-none cursor-pointer"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>

        <span>Per Page</span>
      </div>

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          aria-label="Previous page"
          disabled={currentPage === 1}
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          className="w-9 h-9 rounded-lg border border-[var(--color-line)] flex items-center justify-center text-[var(--color-subtext-500)] hover:bg-[var(--color-surface)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={16} />
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={`w-9 h-9 rounded-lg body-sm-medium transition-colors ${
              currentPage === page
                ? "bg-[var(--color-adsfixter-primary)] text-[var(--color-on-primary)]"
                : "border border-[var(--color-line)] text-[var(--color-subtext-500)] hover:bg-[var(--color-surface)]"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          aria-label="Next page"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          className="w-9 h-9 rounded-lg border border-[var(--color-line)] flex items-center justify-center text-[var(--color-subtext-500)] hover:bg-[var(--color-surface)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}