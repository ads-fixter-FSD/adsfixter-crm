import React from "react";
import SavedBankAccounts from "./components/SavedBankAccounts";
import AddSendingMethod from "./components/AddSendingMethod";


export default function BankAccountsPage() {
  return (
    <div className="min-h-screen font-sans antialiased text-slate-900">
      <div className="space-y-6">
        {/* Top Section: Saved Bank Accounts List */}
        <SavedBankAccounts />

        {/* Bottom Section: Add Sending Method Form */}
        <AddSendingMethod />
      </div>
    </div>
  );
}