"use client";

import { useEffect, useRef, useState } from "react";

interface ActionMenuProps {
  onViewDetails?: () => void;
  onViewCampaign?: () => void;
  onTopUpHistory: () => void;
  onSupportTicket?: () => void;
  onBmShareRequest?: () => void;
  onRequestNameChange?: () => void;
  onDeleteAccount?: () => void;
}

const ICONS = {
  eye: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  ),
  megaphone: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 11v2a2 2 0 0 0 2 2h1l1 5h2l-1-5h2l7 4V6l-7 4H6a2 2 0 0 0-2 2Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  ),
  download: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3v12m0 0-4-4m4 4 4-4M5 21h14"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  ticket: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2 2 0 1 0 0 4v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2a2 2 0 1 0 0-4V8Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  ),
  share: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="18" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="6" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="18" cy="19" r="2.5" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M8.2 10.7 15.8 6.3M8.2 13.3l7.6 4.4"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  ),
  edit: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 20h4l10.5-10.5a2.1 2.1 0 0 0-3-3L5 17v3Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  ),
  trash: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 7h16M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2m-9 0 1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

export default function ActionMenu({
  onViewDetails,
  onViewCampaign,
  onTopUpHistory,
  onSupportTicket,
  onBmShareRequest,
  onRequestNameChange,
  onDeleteAccount,
}: ActionMenuProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function runAndClose(fn?: () => void) {
    setOpen(false);
    fn?.();
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        aria-label="Row actions"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--color-subtext-500)] hover:bg-[var(--color-surface)]"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="5" r="1.8" />
          <circle cx="12" cy="12" r="1.8" />
          <circle cx="12" cy="19" r="1.8" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 z-40 mt-2 w-56 overflow-hidden rounded-[var(--btn-radius)] border border-[var(--color-line)] bg-[var(--color-white)] py-1.5 shadow-xl">
          <MenuItem
            icon={ICONS.eye}
            label="View Details"
            onClick={() => runAndClose(onViewDetails)}
          />
          <MenuItem
            icon={ICONS.megaphone}
            label="View Campaign"
            onClick={() => runAndClose(onViewCampaign)}
          />
          <MenuItem
            icon={ICONS.download}
            label="Top Up History"
            onClick={() => runAndClose(onTopUpHistory)}
          />

          <div className="my-1 border-t border-[var(--color-line)]" />

          <MenuItem
            icon={ICONS.ticket}
            label="Open Support Ticket"
            onClick={() => runAndClose(onSupportTicket)}
          />
          <MenuItem
            icon={ICONS.share}
            label="BM Share Request"
            onClick={() => runAndClose(onBmShareRequest)}
          />
          <MenuItem
            icon={ICONS.edit}
            label="Request Name Change"
            onClick={() => runAndClose(onRequestNameChange)}
          />

          <div className="my-1 border-t border-[var(--color-line)]" />

          <MenuItem
            icon={ICONS.trash}
            label="Delete Ad Account"
            danger
            onClick={() => runAndClose(onDeleteAccount)}
          />
        </div>
      )}
    </div>
  );
}

function MenuItem({
  icon,
  label,
  onClick,
  danger,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-2.5 px-4 py-2.5 body-sm-regular text-left hover:bg-[var(--color-surface)] ${
        danger
          ? "text-[var(--color-danger-text)]"
          : "text-[var(--color-primary-text-400)]"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
