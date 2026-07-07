export default function OverviewHeader() {
  return (
    <div className="flex px-6 pt-6 flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="title-bold primary-text">Account Overview</h1>
        <p className="body-sm-regular subtext mt-1">
          Manage and monitor all your Meta ad accounts
        </p>
      </div>

      <button
        type="button"
        className="flex items-center gap-2 rounded-[var(--btn-radius)] bg-[var(--color-primary)] px-4 py-3 body-sm-medium text-[var(--color-on-primary)] transition-colors hover:bg-[var(--color-primary-hover)]"
      >
        <span className="text-lg leading-none">+</span>
        New Ad Account Request
      </button>
    </div>
  );
}
