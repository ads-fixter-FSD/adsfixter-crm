import React from "react";

import { Lock } from "lucide-react";
import DepositHeader from "./components/DepositHeader";
import SendingBankCard from "./components/SendingBankCard";
import ReceivingBankCard from "./components/ReceivingBankCard";
import PaymentInfoFields from "./components/PaymentInfoFields";
import PaymentScreenshotUpload from "./components/PaymentScreenshotUpload";

export default function DepositToWalletPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 lg:p-8 font-sans antialiased text-slate-900">
      <div className="max-w-[1100px] mx-auto space-y-6">
        
        {/* Top Banner Header */}
        <DepositHeader />

        {/* Step 1 & Step 2 Row */}
        <div className="grid md:grid-cols-2 gap-6">
          <SendingBankCard />
          <ReceivingBankCard />
        </div>

        {/* Step 3: Payment Information */}
        <PaymentInfoFields />

        {/* Step 4: Upload & Form Actions */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-2xs space-y-6">
          <PaymentScreenshotUpload />
          
          {/* Bottom Footer Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-50 pt-5">
            <button type="button" className="w-full sm:w-auto px-10 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition">
              Cancel
            </button>
            <button type="submit" className="w-full sm:w-auto flex items-center justify-center gap-2 px-12 py-3 rounded-xl bg-[#f24e1e] text-white font-bold text-sm hover:bg-[#e03d0d] transition shadow-xs">
              <span>Submit Deposit</span>
              <span className="text-base">→</span>
            </button>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-slate-400">
            <Lock size={13} />
            <span>Your payment information is secure and encrypted.</span>
          </div>
        </div>

      </div>
    </div>
  );
}