
import React from "react";
import RefundRequestForm from "./components/RefundRequestForm";
import YourRefundRequests from "./components/YourRefundRequests";


export default function RefundPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 lg:p-8 font-sans antialiased text-slate-900">
      <div className="max-w-[1140px] mx-auto space-y-6">
        {/* Top Section: Refund Request Interactive Form */}
        <RefundRequestForm />

        {/* Bottom Section: Previous Refund Requests List */}
        <YourRefundRequests />
      </div>
    </div>
  );
}
