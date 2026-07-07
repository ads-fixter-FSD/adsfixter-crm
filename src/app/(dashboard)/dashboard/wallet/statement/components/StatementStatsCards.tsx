import React from "react";
import { Calendar, ArrowDownLeft, ArrowUpRight, TrendingUp, Wallet } from "lucide-react";

export default function StatementStatsCards() {
  const cards = [
    { title: "Statement Period", val: "Jun 01 - Jun 30", sub: "30 Days", icon: <Calendar size={14} /> },
    { title: "Opening Balance", val: "৳52,000", sub: "Beginning Balance", icon: <ArrowDownLeft size={14} /> },
    { title: "Total Credits", val: "+৳95,000", sub: "Money Added", icon: <ArrowUpRight size={14} />, isGreen: true },
    { title: "Total Debits", val: "-৳67,500", sub: "Top-up & Charges", icon: <TrendingUp size={14} />, isBlack: true },
    { title: "Closing Balance", val: "৳79,000", sub: "Available Balance", icon: <Wallet size={14} /> },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((card, i) => (
        <div key={i} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-[0_1px_2px_rgba(0,0,0,0.01)] space-y-3">
          <div className="flex items-center gap-2 text-slate-400">
            {card.icon}
            <span className="text-xs font-semibold tracking-wide text-slate-400">{card.title}</span>
          </div>
          <div className="space-y-0.5">
            <h2 className={`text-[22px] font-bold tracking-tight ${
              card.isGreen ? "text-emerald-500" : card.isBlack ? "text-slate-900" : "text-slate-900"
            }`}>
              {card.val}
            </h2>
            <p className="text-[11px] text-slate-400 font-semibold">{card.sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}