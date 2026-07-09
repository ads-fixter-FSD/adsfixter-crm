

import React from "react";
import WalletCards from "./components/WalletCards";
import BalanceTrendSection from "./components/BalanceTrendSection";
import RecentActivityTable from "./components/RecentActivityTable";
import { Plus, FileText } from "lucide-react";
import { PrimaryButton } from "@/components/shared-buttons";
import { FlatButton } from "@/components/shared-buttons/flat-button";


export default function WalletOverviewPage() {
  return (
    <div className="min-h-screen text-[#0f172a]">
      <div className=" space-y-6">
        
        <div className="p-4 border border-[#EDEDED] rounded-[20px] flex flex-col gap-5">
          {/* Top Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Wallet Overview</h1>
            <p className="text-sm text-slate-400 mt-1">
              Your balance, activity and quick actions in one place.
            </p>
          </div>
          <div className="flex items-center gap-3">
           
            <PrimaryButton>
                <Plus size={16} strokeWidth={2.5} />
                <span>Deposit</span>
            </PrimaryButton>
            <FlatButton>
                <FileText size={16} className="text-slate-400" />
              <span>View Statement</span>
            </FlatButton>
          
          </div>
        </div>

        {/* 1. Top Balance Cards Grid */}
        <WalletCards />
        </div>

        {/* 2. Balance Trend Graph Chart Section */}
        <BalanceTrendSection />

        {/* 3. Recent Activity Data Table Section */}
        <RecentActivityTable />

      </div>
    </div>
  );
}
