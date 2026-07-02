export default function AuthFooter() {
  return (
    <div className="flex items-center justify-between px-1 text-xs text-neutral-400">
      <span>©2026 metabari. All right reserved.</span>
      <a href="#" className="flex items-center gap-1 hover:text-neutral-600">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 2-3 4" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
        Get help
      </a>
    </div>
  );
}
