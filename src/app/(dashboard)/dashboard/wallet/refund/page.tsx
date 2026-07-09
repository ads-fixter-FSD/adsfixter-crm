
import React from "react";
import RefundRequestForm from "./components/RefundRequestForm";
import YourRefundRequests from "./components/YourRefundRequests";


export default function RefundPage() {
  return (
    <div className="min-h-screen font-sans antialiased text-slate-900">
      <div className="space-y-6">
        {/* Top Section: Refund Request Interactive Form */}
        <RefundRequestForm />

        {/* Bottom Section: Previous Refund Requests List */}
        <YourRefundRequests />
      </div>
    </div>
  );
}
