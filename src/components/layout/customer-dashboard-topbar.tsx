"use client";

import Link from "next/link";
import { Bell, LogOut, Moon, Search, Settings, Sun } from "lucide-react";
import { useRef } from "react";
import { getCustomerBreadcrumbParts } from "@/components/layout/customer-navigation";
import { clearAuthSession } from "@/features/auth/auth-session";
import { resetCustomerSetupProgress } from "@/features/crm/client-dashboard/demo-progress-storage";
import { useClickOutside } from "@/hooks/use-click-outside";

type CustomerDashboardTopbarProps = {
  activeSection: string;
  onNavigateHome: () => void;
  onOpenNotifications: () => void;
  onOpenSearch: () => void;
  onOpenSettings: () => void;
  onToggleTheme: () => void;
  profileMenuOpen: boolean;
  setProfileMenuOpen: (open: boolean) => void;
  theme: "light" | "dark";
};

export function CustomerDashboardTopbar({
  activeSection,
  onNavigateHome,
  onOpenNotifications,
  onOpenSearch,
  onOpenSettings,
  onToggleTheme,
  profileMenuOpen,
  setProfileMenuOpen,
  theme,
}: CustomerDashboardTopbarProps) {
  const profileMenuRef = useRef<HTMLDivElement | null>(null);
  const { parent, current } = getCustomerBreadcrumbParts(activeSection);

  useClickOutside(profileMenuRef, () => setProfileMenuOpen(false));

  return (
    <header className="flex min-h-[72px] items-center justify-between gap-4 bg-[var(--white)] px-5 py-4 max-[720px]:px-3">
      <div className="flex min-w-0 items-center gap-1.5">
        {parent ? (
          <>
            <button className="body-sm-regular m-0 border-0 bg-transparent p-0 subtext hover:text-[var(--brand-navy)]" onClick={onNavigateHome} type="button">
              {parent}
            </button>
            <span className="body-sm-regular subtext">/</span>
          </>
        ) : null}
        <h1 className="body-sm-medium m-0 truncate primary-text">{current}</h1>
      </div>

      <div className="flex shrink-0 items-center gap-3 max-[720px]:gap-2">
        <button
          aria-label="Search"
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[var(--brand-navy)] transition hover:bg-[var(--surface)]"
          onClick={onOpenSearch}
          type="button"
        >
          <Search aria-hidden="true" size={18} strokeWidth={1.8} />
        </button>

        <button
          aria-label="Notifications"
          className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg text-[var(--brand-navy)] transition hover:bg-[var(--surface)]"
          onClick={onOpenNotifications}
          type="button"
        >
          <Bell aria-hidden="true" size={18} strokeWidth={1.8} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[var(--danger-text)]" />
        </button>

        <button
          aria-label="Toggle theme"
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[var(--brand-navy)] transition hover:bg-[var(--surface)]"
          onClick={onToggleTheme}
          type="button"
        >
          {theme === "light" ? <Sun aria-hidden="true" size={18} strokeWidth={1.8} /> : <Moon aria-hidden="true" size={18} strokeWidth={1.8} />}
        </button>

        <div className="relative" ref={profileMenuRef}>
          <button
            className="flex items-center gap-2.5 rounded-lg py-1 pl-1 pr-2 transition hover:bg-[var(--surface)] max-[720px]:pr-1"
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            type="button"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-[linear-gradient(135deg,#f6a623,#e85d2d)] text-sm font-semibold text-white">
              A
            </span>
            <span className="hidden text-left min-[860px]:block">
              <strong className="body-sm-medium block primary-text">Abdullah</strong>
              <span className="body-xsm-regular block subtext">Customer</span>
            </span>
          </button>

          {profileMenuOpen ? (
            <div className="absolute right-0 top-[calc(100%+0.45rem)] z-20 grid min-w-40 gap-1 rounded-xl border border-[var(--line)] bg-[var(--white)] p-1.5 shadow-sm">
              <button
                className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm text-[var(--brand-navy)] hover:bg-[var(--surface)]"
                onClick={() => {
                  onOpenSettings();
                  setProfileMenuOpen(false);
                }}
                type="button"
              >
                <Settings aria-hidden="true" size={15} strokeWidth={1.8} />
                Settings
              </button>
              <Link
                className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm text-[var(--danger-text)] no-underline hover:bg-[var(--surface)]"
                href="/auth/signin"
                onClick={() => {
                  resetCustomerSetupProgress();
                  clearAuthSession();
                  setProfileMenuOpen(false);
                }}
              >
                <LogOut aria-hidden="true" size={15} strokeWidth={1.8} />
                Logout
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
