interface PlatformTabCardProps {
  icon: React.ReactNode;
  label: string;
  statusLabel: string;
  isActive: boolean;
  onClick: () => void;
}

export default function PlatformTabCard({
  icon,
  label,
  statusLabel,
  isActive,
  onClick,
}: PlatformTabCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-1 min-w-[240px] items-center justify-between rounded-lg border text-left transition-colors"
      style={{
        height: "72px",
        padding: "16px",
        borderRadius: "8px",
        borderWidth: "1px",
        borderColor: isActive ? "var(--color-primary)" : "var(--color-line)",
        backgroundColor: isActive
          ? "var(--color-primary-soft)"
          : "var(--color-white)",
        boxShadow: isActive ? "0px 1px 2px 0px #0D0D120F" : "none",
      }}
    >
      <span className="flex items-center gap-2.5">
        <span className="flex h-5 w-5 items-center justify-center shrink-0">
          {icon}
        </span>
        <span className="body-sm-medium primary-text">{label}</span>
      </span>

      <span className="flex items-center gap-3">
        <span className="body-xsm-regular subtext-400">{statusLabel}</span>
        <span
          className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2"
          style={{
            borderColor: isActive
              ? "var(--color-primary)"
              : "var(--color-line)",
          }}
        >
          {isActive && (
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: "var(--color-primary)" }}
            />
          )}
        </span>
      </span>
    </button>
  );
}
