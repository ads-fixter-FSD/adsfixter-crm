"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

type TabType = "bank" | "mobile" | "cash";

export default function AddSendingMethod() {
  const [activeTab, setActiveTab] = useState<TabType>("bank");
  const [isDefault, setIsDefault] = useState(false);

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.01)] space-y-6">
      <h3 className="text-lg font-bold text-slate-900 tracking-tight">Add a Sending Method</h3>

      {/* Tabs Row */}
      <div className="inline-flex p-1 bg-slate-50 border border-slate-100 rounded-xl">
        {(["bank", "mobile", "cash"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-lg font-bold text-xs transition capitalize tracking-wide ${
              activeTab === tab
                ? "bg-white text-[#f24e1e] shadow-2xs"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            {tab === "bank" ? "Bank" : tab === "mobile" ? "Mobile Banking" : "Cash Deposit"}
          </button>
        ))}
      </div>

      {/* Input Fields Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Dynamic Dropdown Select */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700">Bank</label>
          <div className="relative">
            <select className="w-full appearance-none pl-4 pr-10 py-3 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none bg-white focus:border-slate-300 cursor-pointer transition">
              <option>City Bank</option>
              <option>BRAC Bank</option>
              <option>Dutch-Bangla Bank</option>
            </select>
            <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Account Number Input */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700">Account Number</label>
          <input
            type="text"
            placeholder="**** 4487 6122"
            className="w-full pl-4 pr-4 py-3 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:border-slate-300 placeholder-slate-400 transition"
          />
        </div>

        {/* Account Holder Name Input */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700">Account Holder Name</label>
          <input
            type="text"
            placeholder="Abdullah Al Nur"
            className="w-full pl-4 pr-4 py-3 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:border-slate-300 placeholder-slate-400 transition"
          />
        </div>
      </div>

      {/* Checkbox Wrapper */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="default-method"
          checked={isDefault}
          onChange={(e) => setIsDefault(e.target.checked)}
          className="w-4 h-4 border-slate-300 text-[#f24e1e] rounded focus:ring-0 outline-none transition cursor-pointer accent-[#f24e1e]"
        />
        <label htmlFor="default-method" className="text-xs font-semibold text-slate-500 cursor-pointer select-none">
          Set as default sending method
        </label>
      </div>

      {/* Action Submit Button */}
      <div className="pt-2">
        <button className="px-8 py-3.5 bg-[#f24e1e] hover:bg-[#e04516] text-white font-bold text-xs rounded-xl shadow-xs tracking-wide transition">
          Save Method
        </button>
      </div>
    </div>
  );
}