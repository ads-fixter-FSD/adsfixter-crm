"use client";

import React from "react";
import { Clock, CheckCircle2, XCircle } from "lucide-react";

interface RefundLog {
  id: string;
  requestId: string;
  amount: string;
  date: string;
  reason: string;
  targetBank: string;
  status: "Under Review" | "Completed" | "Rejected";
  errorNote?: string;
}

export default function YourRefundRequests() {
  const logs: RefundLog[] = [
    { id: "1", requestId: "REF-REQ-041", amount: "৳5,000", date: "Jul 4, 2026", reason: "Unused balance", targetBank: "AB Bank **** 3312", status: "Under Review" },
    { id: "2", requestId: "REF-REQ-037", amount: "৳2,500", date: "Jun 28, 2026", reason: "Duplicate deposit", targetBank: "bKash 01xxx-xxx471", status: "Completed" },
    { id: "3", requestId: "REF-REQ-029", amount: "৳2,500", date: "Jun 15, 2026", reason: "Service issue", targetBank: "AB Bank **** 3312", status: "Rejected", errorNote: "Rejected: amount already used for an active top-up" },
  ];

  // স্ট্যাটাস অনুযায়ী ডাইনামিক ব্যাজ ও কালার লজিক
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Under Review":
        return "bg-orange-50 text-orange-600";
      case "Completed":
        return "bg-emerald-50 text-emerald-600";
      case "Rejected":
        return "bg-red-50 text-red-600";
      default:
        return "bg-slate-50 text-slate-600";
    }
  };

  const getIcon = (status: string) => {
    switch (status) {
      case "Under Review":
        return <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center shrink-0"><Clock size={18} strokeWidth={2.5} /></div>;
      case "Completed":
        return <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0"><CheckCircle2 size={18} strokeWidth={2.5} /></div>;
      case "Rejected":
        return <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0"><XCircle size={18} strokeWidth={2.5} /></div>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold text-slate-900 tracking-wide pl-0.5">Your refund requests</h3>

      {/* List Wrapper */}
      <div className="space-y-3">
        {logs.map((log) => (
          <div key={log.id} className="bg-white border border-slate-100 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[0_1px_2px_rgba(0,0,0,0.005)]">
            
            {/* Left Box: Icon + Meta Texts */}
            <div className="flex items-start gap-4">
              {getIcon(log.status)}
              <div className="space-y-1 mt-0.5">
                <h4 className="text-base font-bold text-slate-900 tracking-tight">
                  {log.requestId} <span className="text-slate-400 font-medium mx-1">•</span> ৳{log.amount.replace("৳", "")}
                </h4>
                <div className="text-xs font-semibold text-slate-400 space-y-0.5">
                  <p>Requested {log.date} <span className="text-slate-300 font-medium mx-0.5">•</span> {log.reason}</p>
                  <p className="text-slate-400/90 font-medium">to {log.targetBank}</p>
                </div>
                {log.errorNote && (
                  <p className="text-xs font-bold text-red-500 pt-0.5 tracking-wide">{log.errorNote}</p>
                )}
              </div>
            </div>

            {/* Right Box: Status Badge */}
            <div className="sm:self-start md:self-center ml-14 sm:ml-0">
              <span className={`px-4 py-1.5 rounded-lg text-[10px] font-bold tracking-wide block text-center ${getStatusStyle(log.status)}`}>
                {log.status}
              </span>
            </div>

          </div>
        ))}
      </div>

      {/* Footer Load Button */}
      <div className="pt-2">
        <button className="px-5 py-2.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-bold text-xs rounded-xl transition shadow-[0_1px_2px_rgba(0,0,0,0.01)]">
          View all requests
        </button>
      </div>
    </div>
  );
}