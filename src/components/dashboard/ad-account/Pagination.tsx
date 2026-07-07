interface PaginationProps {
  page: number;
  totalPages: number;
  perPage: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
}

const PER_PAGE_OPTIONS = [10, 25, 50];

export default function Pagination({
  page,
  totalPages,
  perPage,
  onPageChange,
  onPerPageChange,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex flex-wrap px-6 pb-6 items-center justify-between gap-4 pt-4">
      <div className="flex items-center gap-2 body-sm-regular subtext-500">
        <span>Show</span>
        <select
          value={perPage}
          onChange={(e) => onPerPageChange(Number(e.target.value))}
          className="rounded-[var(--btn-radius)] border border-[var(--color-line)] bg-white px-2 py-1.5 body-sm-medium primary-text"
        >
          {PER_PAGE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span>Per Page</span>
      </div>

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-line)] text-[var(--color-subtext-500)] disabled:opacity-40"
          aria-label="Previous page"
        >
          ‹
        </button>

        {pages.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            className={`flex h-8 w-8 items-center justify-center rounded-full body-sm-medium transition-colors ${
              p === page
                ? "bg-[var(--color-primary)] text-[var(--color-on-primary)]"
                : "text-[var(--color-primary-text-400)] hover:bg-[var(--color-surface)]"
            }`}
          >
            {p}
          </button>
        ))}

        <button
          type="button"
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-line)] text-[var(--color-subtext-500)] disabled:opacity-40"
          aria-label="Next page"
        >
          ›
        </button>
      </div>
    </div>
  );
}
