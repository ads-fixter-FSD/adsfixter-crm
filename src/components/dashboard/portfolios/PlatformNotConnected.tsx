interface PlatformNotConnectedProps {
  icon: React.ReactNode;
  badgeIcon: React.ReactNode;
  title: string;
  description: string;
  buttonLabel: string;
  onConnect: () => void;
}

export default function PlatformNotConnected({
  icon,
  badgeIcon,
  title,
  description,
  buttonLabel,
  onConnect,
}: PlatformNotConnectedProps) {
  return (
    <div className="flex flex-col items-center justify-center py-14 px-6 text-center">
      <div className="relative mb-6">
        <div className="flex h-32 w-44 flex-col rounded-lg border border-[var(--color-line)] bg-white overflow-hidden">
          <div className="flex items-center gap-1.5 border-b border-[var(--color-line)] px-3 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-line)]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-line)]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-line)]" />
          </div>
          <div className="flex flex-1 items-center justify-center">
            <span className="h-10 w-10 flex items-center justify-center">
              {icon}
            </span>
          </div>
        </div>
        <span className="absolute -bottom-2 -right-2 flex h-9 w-9 items-center justify-center rounded-full bg-white border border-[var(--color-line)] shadow-sm">
          {badgeIcon}
        </span>
      </div>

      <h4 className="body-l-medium primary-text mb-1.5">{title}</h4>
      <p className="body-sm-regular subtext-400 max-w-sm mb-5">{description}</p>

      <button
        type="button"
        onClick={onConnect}
        className="flex items-center gap-2 rounded-[var(--btn-radius)] px-5 py-2.5 body-sm-medium text-white"
        style={{ backgroundColor: "var(--color-primary-text-500)" }}
      >
        <span className="text-lg leading-none">+</span>
        {buttonLabel}
      </button>

      <p className="body-xsm-regular subtext-400 mt-4">
        Don&apos;t know how to add it? Contact our{" "}
        <a href="#" className="text-[var(--color-primary)] underline">
          Support Team.
        </a>
      </p>
    </div>
  );
}
