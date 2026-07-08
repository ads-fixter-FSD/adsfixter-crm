import React from "react";
import WalletDashboard from "./components/WalletDashboard";

export default function WalletActivityPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 lg:p-8 font-sans antialiased text-slate-900">
      <div className="">
        <WalletDashboard />
      </div>
    </div>
  );
}