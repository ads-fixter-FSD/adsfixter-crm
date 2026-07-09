"use client";

import React, { useState } from "react";
import Sidebar from "@/components/layout/dashboard/Sidebar";
import Topbar from "@/components/layout/dashboard/Topbar";
import { DashboardThemeInit } from "@/components/layout/dashboard/dashboard-theme-init";
import "@/app/styles/dashboard-theme.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="dashboard-shell flex h-screen w-full overflow-hidden bg-[var(--color-white)] font-sans text-[var(--color-primary-text-500)]">
      <DashboardThemeInit />

      <Sidebar
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={() => setIsMobileSidebarOpen(false)}
      />

      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <div className="flex h-full min-w-0 flex-1 flex-col overflow-hidden">
        <Topbar onMenuClick={() => setIsMobileSidebarOpen(true)} />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[var(--color-surface)] px-4 py-4 sm:px-5 sm:py-5 lg:px-6 lg:py-0">
          {children}
        </main>
      </div>
    </div>
  );
}
