"use client";

import React from "react";
import { ChevronDown, RotateCw, ArrowUpRight } from "lucide-react";
import BalanceTrendChart from "./BalanceTrendChart";


export default function BalanceTrendSection() {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs">
      {/* Header Inside Card */}
      <div className="flex items-center justify-between border-b border-slate-50 pb-5">
        <h3 className="text-lg font-bold text-slate-900">Balance Trend (Last 30 Days)</h3>
        <div className="flex items-center gap-2">
          <div className="relative">
            <select className="appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 pr-9 text-xs font-semibold text-slate-700 outline-none cursor-pointer">
              <option>Monthly</option>
              <option>Weekly</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
          </div>
          <button className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-500 transition">
            <RotateCw size={14} />
          </button>
        </div>
      </div>

      {/* Meta Stats Row */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-slate-900 tracking-tight">৳53,980</span>
          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 bg-emerald-50 text-emerald-500 font-bold text-[11px] rounded-md">
            <ArrowUpRight size={12} strokeWidth={2.5} />
            6.4%
          </span>
          <span className="text-xs font-medium text-slate-400">from May 5 to Jun 4, 2026</span>
        </div>
        
        {/* Custom Legend Indicators */}
        <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#f24e1e]" />
            <span>Balance</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#f5a623]" />
            <span>Top Up</span>
          </div>
        </div>
      </div>

      {/* Recharts Render (Imported from BalanceTrendChart file) */}
      <div className="mt-4">
        <BalanceTrendChart />
      </div>
    </div>
  );
}