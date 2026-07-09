"use client";

import React, { useState } from "react";
import Sidebar from "@/components/layout/dashboard/Sidebar";
import Topbar from "@/components/layout/dashboard/Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-white overflow-hidden font-sans">
      {/* ─── LEFT SIDEBAR (Desktop: static, Mobile: drawer) ─── */}
      <Sidebar
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* ─── Mobile overlay backdrop (sidebar খোলা থাকলে দেখাবে) ─── */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ─── RIGHT CONTENT AREA ─── */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        {/* ─── TOP NAVBAR ─── */}
        <Topbar onMenuClick={() => setIsMobileSidebarOpen(true)} />

        {/* DYNAMIC CONTENT CONTAINER */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto px-4 sm:px-5 lg:px-6 py-4 sm:py-5 lg:py-0">
          {children}
        </main>
      </div>
    </div>
  );
}