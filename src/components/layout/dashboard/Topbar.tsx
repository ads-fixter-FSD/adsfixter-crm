"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Search, Bell, Sun, Moon, Menu } from "lucide-react";
import { menuItems } from "@/features/crm/types/constants/sidebar-menu";
import { useTheme } from "@/hooks/useTheme";

export default function Topbar({
  onMenuClick,
}: {
  onMenuClick?: () => void;
}) {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const activeParent = menuItems.find(
    (item) =>
      (!!item.href && pathname === item.href) ||
      item.children?.some((child) => pathname === child.href)
  );

  const activeChild = activeParent?.children?.find(
    (child) => pathname === child.href
  );

  return (
    <header className="h-14 sm:h-16 bg-[var(--color-white)] flex items-center justify-between px-3 sm:px-6 lg:px-8 z-10 shrink-0 border-b border-[var(--color-line)] lg:border-b-0">
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        {/* মোবাইলে hamburger বাটন, desktop এ hidden */}
        <button
          type="button"
          aria-label="Open menu"
          onClick={onMenuClick}
          className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg text-[var(--color-subtext-500)] hover:bg-[var(--color-surface)] transition-colors shrink-0"
        >
          <Menu size={20} />
        </button>

        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 sm:gap-2 body-sm-medium min-w-0 overflow-hidden">
          {activeParent ? (
            activeParent.href ? (
              <Link
                href={activeParent.href}
                className="text-[var(--color-subtext-500)] hover:text-[var(--color-primary-text-500)] transition-colors truncate text-sm sm:text-base"
              >
                {activeParent.name}
              </Link>
            ) : (
              <span className="text-[var(--color-subtext-500)] truncate text-sm sm:text-base">
                {activeParent.name}
              </span>
            )
          ) : (
            <span className="text-[var(--color-primary-text-500)] font-semibold text-sm sm:text-base">
              Dashboard
            </span>
          )}

          {activeChild && (
            <>
              <span className="text-[var(--color-subtext-500)] shrink-0">/</span>
              <span className="text-[var(--color-primary-text-500)] font-semibold truncate text-sm sm:text-base">
                {activeChild.name}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Right Header Controls */}
      <div className="flex items-center gap-2 sm:gap-4 lg:gap-6 shrink-0">
        {/* Search — মোবাইলে hidden, শুধু icon হিসেবে থাকতে পারে ভবিষ্যতে */}
        <button
          type="button"
          aria-label="Search"
          className="hidden sm:flex text-[var(--color-subtext-500)] hover:text-[var(--color-primary-text-500)] transition-colors"
        >
          <Search size={20} />
        </button>

        {/* Notification */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative text-[var(--color-subtext-500)] hover:text-[var(--color-primary-text-500)] transition-colors"
        >
          <Bell size={18} className="sm:w-5 sm:h-5" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[var(--color-adsfixter-primary)]" />
        </button>

        {/* Dark / Light mode toggle */}
        <button
          type="button"
          aria-label="Toggle theme"
          onClick={toggleTheme}
          className="text-[var(--color-subtext-500)] hover:text-[var(--color-primary-text-500)] transition-colors"
        >
          {theme === "dark" ? (
            <Sun size={18} className="sm:w-5 sm:h-5" />
          ) : (
            <Moon size={18} className="sm:w-5 sm:h-5" />
          )}
        </button>

        {/* Consultant Info */}
        <div className="flex items-center gap-2 sm:gap-3 border-l pl-2 sm:pl-4 lg:pl-6 border-[var(--color-line)]">
          <div className="text-right hidden sm:block">
            <p className="body-sm-medium text-[var(--color-primary-text-500)]">
              Sarah Jenkins
            </p>
            <p className="text-xs text-[var(--color-subtext-400)]">
              Senior Consultant
            </p>
          </div>
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden relative bg-[var(--color-surface)] shrink-0">
            <Image
              src="/images/dashboard/topbar/avatar-placeholder.png"
              alt="Sarah Jenkins"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
}