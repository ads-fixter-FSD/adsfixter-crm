import React from "react";
import Sidebar from "@/components/layout/dashboard/Sidebar";
import Topbar from "@/components/layout/dashboard/Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full bg-white overflow-hidden font-sans">
      {/* ─── LEFT SIDEBAR ─── */}
      <Sidebar />

      {/* ─── RIGHT CONTENT AREA ─── */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* ─── TOP NAVBAR ─── */}
        <Topbar />

        {/* DYNAMIC CONTENT CONTAINER */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}