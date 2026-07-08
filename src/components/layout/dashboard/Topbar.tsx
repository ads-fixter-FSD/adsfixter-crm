"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Search, Bell, Sun, Moon } from "lucide-react";
import { menuItems } from "@/features/crm/types/constants/sidebar-menu";
import { useTheme } from "@/hooks/useTheme";

export default function Topbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  // বর্তমান pathname দিয়ে parent + child menu item খুঁজে বের করা
  const activeParent = menuItems.find(
    (item) =>
      (!!item.href && pathname === item.href) ||
      item.children?.some((child) => pathname === child.href)
  );

  const activeChild = activeParent?.children?.find(
    (child) => pathname === child.href
  );

  return (
    <header className="h-16 bg-[var(--color-white)] flex items-center justify-between px-8 z-10 shrink-0">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 body-sm-medium">
        {activeParent ? (
          activeParent.href ? (
            <Link
              href={activeParent.href}
              className="text-[var(--color-subtext-500)] hover:text-[var(--color-primary-text-500)] transition-colors"
            >
              {activeParent.name}
            </Link>
          ) : (
            <span className="text-[var(--color-subtext-500)]">
              {activeParent.name}
            </span>
          )
        ) : (
          <span className="text-[var(--color-primary-text-500)] font-semibold">
            Dashboard
          </span>
        )}

        {activeChild && (
          <>
            <span className="text-[var(--color-subtext-500)]">/</span>
            <span className="text-[var(--color-primary-text-500)] font-semibold">
              {activeChild.name}
            </span>
          </>
        )}
      </div>

      {/* Right Header Controls */}
      <div className="flex items-center gap-6">
        {/* Search */}
        <button
          type="button"
          aria-label="Search"
          className="text-[var(--color-subtext-500)] hover:text-[var(--color-primary-text-500)] transition-colors"
        >
          <Search size={20} />
        </button>

        {/* Notification */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative text-[var(--color-subtext-500)] hover:text-[var(--color-primary-text-500)] transition-colors"
        >
          <Bell size={20} />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[var(--color-adsfixter-primary)]" />
        </button>

        {/* Dark / Light mode toggle */}
        <button
          type="button"
          aria-label="Toggle theme"
          onClick={toggleTheme}
          className="text-[var(--color-subtext-500)] hover:text-[var(--color-primary-text-500)] transition-colors"
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Consultant Info */}
        <div className="flex items-center gap-3 border-l pl-6 border-[var(--color-line)]">
          <div className="text-right">
            <p className="body-sm-medium text-[var(--color-primary-text-500)]">
              Sarah Jenkins
            </p>
            <p className="text-xs text-[var(--color-subtext-400)]">
              Senior Consultant
            </p>
          </div>
          <div className="w-9 h-9 rounded-full overflow-hidden relative bg-[var(--color-surface)] shrink-0">
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