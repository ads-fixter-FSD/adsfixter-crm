"use client";

import React from "react";
import { Search, ChevronDown } from "lucide-react";

export default function StatementFilterBar() {
  return (
    <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h3 className="text-base font-bold text-slate-900">Statement History</h3>
        <p className="text-xs text-slate-400 font-medium mt-0.5">View and download your wallet statements.</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <input
            type="text"
            placeholder="Search Statement ID"
            className="w-full pl-4 pr-10 py-2 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 outline-none placeholder-slate-400 focus:border-slate-300 transition"
          />
          <Search size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>

        {/* Month Dropdown */}
        <button className="flex items-center gap-4 px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 transition">
          <span>Month</span>
          <ChevronDown size={14} className="text-slate-400" />
        </button>

        {/* Year Dropdown */}
        <button className="flex items-center gap-4 px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 transition">
          <span>Year</span>
          <ChevronDown size={14} className="text-slate-400" />
        </button>

        {/* Status Dropdown */}
        <button className="flex items-center gap-4 px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 transition">
          <span>Status</span>
          <ChevronDown size={14} className="text-slate-400" />
        </button>
      </div>
    </div>
  );
}