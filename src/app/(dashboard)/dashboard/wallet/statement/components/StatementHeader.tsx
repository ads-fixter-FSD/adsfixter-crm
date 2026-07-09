import React from "react";
import { Download } from "lucide-react";

export default function StatementHeader() {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.01)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-slate-950">Wallet Statements</h1>
        <p className="text-sm text-slate-400 font-medium">
          Download your wallet statements for any selected period in PDF, Excel, or CSV format.
        </p>
      </div>

      <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-800 font-bold text-xs rounded-xl hover:bg-slate-50 transition tracking-wide shrink-0">
        <Download size={14} className="text-slate-500" strokeWidth={2.5} />
        <span>EXPORT PDF</span>
      </button>
    </div>
  );
}