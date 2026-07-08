
import React from "react";
import StatementHeader from "./components/StatementHeader";
import StatementFilterBar from "./components/StatementFilterBar";
import StatementTable from "./components/StatementTable";
import StatementStatsCards from "./components/StatementStatsCards";

export default function WalletStatementsPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 lg:p-8 font-sans antialiased text-slate-900">
      <div className="space-y-6">
        
        {/* Header with Export Button */}
        <StatementHeader />

        {/* 5 Grid Summary Cards */}
        <StatementStatsCards />

        {/* Main Content Area (Filters + Table) */}
        <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.01)] overflow-hidden">
          <StatementFilterBar />
          <StatementTable />
        </div>

      </div>
    </div>
  );
}
