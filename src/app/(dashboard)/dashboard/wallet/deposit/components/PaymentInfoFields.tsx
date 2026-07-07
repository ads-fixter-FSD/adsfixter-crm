"use client";

import React, { useRef } from "react";

export default function PaymentInfoFields() {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target;
    // প্রথমে হাইট রিসেট করে নিচ্ছে যাতে টেক্সট ডিলিট করলে বক্স আবার ছোট হতে পারে
    target.style.height = "44px";
    // টেক্সটের কন্টেন্ট অনুযায়ী হাইট বাড়িয়ে দিচ্ছে
    target.style.height = `${target.scrollHeight}px`;
  };

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-5">
      {/* Title block */}
      <div className="flex gap-3">
        <span className="w-6 h-6 rounded-full bg-[#f24e1e] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">3</span>
        <div className="space-y-0.5">
          <h3 className="text-[15px] font-bold text-[#0f172a]">Payment Information</h3>
          <p className="text-xs text-slate-400 font-medium">Enter the payment details and upload the screenshot.</p>
        </div>
      </div>

      {/* Form Input Grid mapping */}
      <div className="grid md:grid-cols-3 gap-5 items-start">
        {/* Amount BDT */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-700">Amount (BDT)</label>
          <div className="relative flex items-center">
            <span className="absolute left-4 text-sm font-semibold text-slate-600">৳</span>
            <input
              type="text"
              placeholder="25,000"
              className="w-full h-[44px] pl-9 pr-4 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 outline-none placeholder-slate-300 focus:border-slate-400 transition"
            />
          </div>
          <span className="text-[10px] text-slate-400 block font-medium leading-normal mt-1.5">
            Transaction ID is required to match and verify your payment.
          </span>
        </div>

        {/* Transaction ID */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-700">Transaction ID / Reference Number</label>
          <input
            type="text"
            placeholder="TRX87456213"
            className="w-full h-[44px] px-4 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 outline-none placeholder-slate-300 focus:border-slate-400 transition"
          />
        </div>

        {/* Payment Note (Auto Resizing Layout) */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-700">Payment Note (Optional)</label>
          <textarea
            ref={textareaRef}
            onChange={handleTextareaChange}
            placeholder="e.g. Sent from my BRAC Bank account instead of City Bank"
            rows={1}
            className="w-full min-h-[44px] max-h-[150px] px-4 py-3 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 outline-none placeholder-slate-300 focus:border-slate-400 transition resize-none overflow-y-hidden scrollbar-none block"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          />
        </div>
      </div>
    </div>
  );
}