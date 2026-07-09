"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

type TabType = "bank" | "mobile" | "cash";

export default function AddSendingMethod() {
  const [activeTab, setActiveTab] = useState<TabType>("bank");
  const [isDefault, setIsDefault] = useState(false);

  // ফর্মের সিলেক্টেড ভ্যালুগুলোর জন্য স্টেট
  const [selectedMethod, setSelectedMethod] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [holderName, setHolderName] = useState("");

  // ট্যাব চেঞ্জ হলে ভেতরের ইনপুটগুলো রিসেট করার ফাংশন
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setSelectedMethod("");
    setAccountNo("");
    setHolderName("");
  };

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-4 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.01)] space-y-6 w-full">
      <h3 className="text-lg font-bold text-slate-900 tracking-tight">Add a Sending Method</h3>

      {/* Tabs Row */}
      <div className="inline-flex p-1 bg-slate-50 border border-slate-100 rounded-xl overflow-x-auto max-w-full no-scrollbar">
        {(["bank", "mobile", "cash"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`px-5 py-2 rounded-lg font-bold text-xs transition capitalize tracking-wide whitespace-nowrap cursor-pointer ${
              activeTab === tab
                ? "bg-white text-[#f24e1e] shadow-3xs"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            {tab === "bank" ? "Bank" : tab === "mobile" ? "Mobile Banking" : "Cash Deposit"}
          </button>
        ))}
      </div>

      {/* Input Fields Grid — ডাইনামিক ফিল্টার কন্ডিশন */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* ১. প্রথম কলাম: কন্ডিশনাল ড্রপডাউন */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700">
            {activeTab === "bank" && "Bank Name"}
            {activeTab === "mobile" && "Mobile Operator"}
            {activeTab === "cash" && "Deposit Method"}
          </label>
          <div className="relative">
            <select 
              value={selectedMethod}
              onChange={(e) => setSelectedMethod(e.target.value)}
              className="w-full appearance-none pl-4 pr-10 py-3 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none bg-white focus:border-slate-300 cursor-pointer transition"
            >
              <option value="" disabled hidden>
                {activeTab === "bank" && "Select Bank"}
                {activeTab === "mobile" && "Select Operator"}
                {activeTab === "cash" && "Select Type"}
              </option>
              
              {/* ব্যাংক ট্যাবের অপশনসমূহ */}
              {activeTab === "bank" && (
                <>
                  <option value="city-bank">City Bank</option>
                  <option value="brac-bank">BRAC Bank</option>
                  <option value="dbbl">Dutch-Bangla Bank</option>
                  <option value="ab-bank">AB Bank</option>
                </>
              )}

              {/* মোবাইল ব্যাংকিং ট্যাবের অপশনসমূহ */}
              {activeTab === "mobile" && (
                <>
                  <option value="bkash">bKash</option>
                  <option value="nagad">Nagad</option>
                  <option value="rocket">Rocket</option>
                </>
              )}

              {/* ক্যাশ ডিপোজিট ট্যাবের অপশনসমূহ */}
              {activeTab === "cash" && (
                <>
                  <option value="counter">Over the Counter</option>
                  <option value="cdm">Cash Deposit Machine (CDM)</option>
                </>
              )}
            </select>
            <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* ২. দ্বিতীয় কলাম: কন্ডিশনাল অ্যাকাউন্ট নাম্বার / ফোন নাম্বার */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700">
            {activeTab === "mobile" ? "Mobile Number" : "Account Number"}
          </label>
          <input
            type="text"
            value={accountNo}
            onChange={(e) => setAccountNo(e.target.value)}
            placeholder={activeTab === "mobile" ? "01xx-xxxxxx" : "**** 4487 6122"}
            className="w-full pl-4 pr-4 py-3 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:border-slate-300 placeholder-slate-400 transition"
          />
        </div>

        {/* ৩. তৃতীয় কলাম: কন্ডিশনাল হোল্ডার / রেফারেন্স নেম */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700">
            {activeTab === "cash" ? "Depositor Name" : "Account Holder Name"}
          </label>
          <input
            type="text"
            value={holderName}
            onChange={(e) => setHolderName(e.target.value)}
            placeholder="Abdullah Al Nur"
            className="w-full pl-4 pr-4 py-3 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:border-slate-300 placeholder-slate-400 transition"
          />
        </div>
      </div>

      {/* Checkbox Wrapper */}
      <div className="flex items-center gap-2 pt-1">
        <input
          type="checkbox"
          id="default-method"
          checked={isDefault}
          onChange={(e) => setIsDefault(e.target.checked)}
          className="w-4 h-4 border-slate-300 text-[#f24e1e] rounded-sm focus:ring-0 outline-none transition cursor-pointer accent-[#f24e1e]"
        />
        <label htmlFor="default-method" className="text-xs font-semibold text-slate-500 cursor-pointer select-none">
          Set as default sending method
        </label>
      </div>

      {/* Action Submit Button */}
      <div className="pt-1">
        <button className="px-7 py-3 bg-[#f24e1e] hover:bg-[#e04516] text-white font-bold text-xs rounded-xl shadow-xs tracking-wide transition cursor-pointer">
          Save Method
        </button>
      </div>
    </div>
  );
}