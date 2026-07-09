"use client";

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
  // মোবাইলে সব page number না দেখিয়ে current page এর আশেপাশেরটা দেখানো
  const getVisiblePages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages = new Set<number>([1, totalPages, currentPage]);
    if (currentPage - 1 > 1) pages.add(currentPage - 1);
    if (currentPage + 1 < totalPages) pages.add(currentPage + 1);
    return Array.from(pages).sort((a, b) => a - b);
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 border-t border-[var(--color-line)] mt-2">
      <div className="flex items-center gap-2 body-sm-regular text-[var(--color-subtext-500)] text-xs sm:text-sm order-2 sm:order-1">
        <span className="hidden xs:inline">Show</span>

        <div className="relative">
          <ListFilter
            size={14}
            className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 text-[var(--color-subtext-500)] pointer-events-none"
          />
          <select
            value={perPage}
            onChange={(e) => onPerPageChange(Number(e.target.value))}
            className="h-8 sm:h-9 pl-7 sm:pl-8 pr-6 sm:pr-8 rounded-lg border border-[var(--color-line)] text-xs sm:text-sm text-[var(--color-primary-text-500)] bg-[var(--color-field)] outline-none appearance-none cursor-pointer"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>

        <span className="whitespace-nowrap">Per Page</span>
      </div>

      <div className="flex items-center gap-1 sm:gap-1.5 order-1 sm:order-2">
        <button
          type="button"
          aria-label="Previous page"
          disabled={currentPage === 1}
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg border border-[var(--color-line)] flex items-center justify-center text-[var(--color-subtext-500)] hover:bg-[var(--color-surface)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={14} className="sm:w-4 sm:h-4" />
        </button>

        {visiblePages.map((page, idx) => {
          const prevPage = visiblePages[idx - 1];
          const showEllipsis = prevPage !== undefined && page - prevPage > 1;

          return (
            <React.Fragment key={page}>
              {showEllipsis && (
                <span className="w-6 sm:w-8 text-center text-[var(--color-subtext-400)] text-xs sm:text-sm">
                  ...
                </span>
              )}
              <button
                type="button"
                onClick={() => onPageChange(page)}
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                  currentPage === page
                    ? "bg-[var(--color-adsfixter-primary)] text-[var(--color-on-primary)]"
                    : "border border-[var(--color-line)] text-[var(--color-subtext-500)] hover:bg-[var(--color-surface)]"
                }`}
              >
                {page}
              </button>
            </React.Fragment>
          );
        })}

        <button
          type="button"
          aria-label="Next page"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg border border-[var(--color-line)] flex items-center justify-center text-[var(--color-subtext-500)] hover:bg-[var(--color-surface)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronRight size={14} className="sm:w-4 sm:h-4" />
        </button>
      </div>
    </div>
  );
}