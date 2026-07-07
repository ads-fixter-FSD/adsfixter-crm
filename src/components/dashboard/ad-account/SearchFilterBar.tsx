interface SearchFilterBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchFilterBar({
  value,
  onChange,
}: SearchFilterBarProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 rounded-[var(--btn-radius)] border border-[var(--color-line)] bg-white px-3 py-2.5">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          className="text-[var(--color-subtext-500)]"
        >
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <path
            d="M21 21L16.65 16.65"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search..."
          className="w-40 body-sm-regular text-[var(--color-primary-text-500)] outline-none placeholder:text-[var(--color-subtext-400)]"
        />
      </div>

      <button
        type="button"
        className="flex items-center gap-2 rounded-[var(--btn-radius)] border border-[var(--color-line)] bg-white px-3.5 py-2.5 body-sm-medium text-[var(--color-primary-text-400)] hover:bg-[var(--color-surface)]"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 6H20M7 12H17M10 18H14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        Filter
      </button>
    </div>
  );
}
