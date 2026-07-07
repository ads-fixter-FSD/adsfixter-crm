import React from "react";
import SavedBankAccounts from "./components/SavedBankAccounts";
import AddSendingMethod from "./components/AddSendingMethod";


export default function BankAccountsPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 lg:p-8 font-sans antialiased text-slate-900">
      <div className="max-w-[1140px] mx-auto space-y-6">
        {/* Top Section: Saved Bank Accounts List */}
        <SavedBankAccounts />

        {/* Bottom Section: Add Sending Method Form */}
        <AddSendingMethod />
      </div>
    </div>
  );
}