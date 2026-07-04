export function AuthDivider() {
  return (
    <div className="flex items-center gap-3 text-sm text-[var(--muted)]">
      <span className="h-px flex-1 bg-[var(--line)]" />
      <p className="m-0">or</p>
      <span className="h-px flex-1 bg-[var(--line)]" />
    </div>
  );
}
