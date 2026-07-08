
"use client";

import React from "react";
import { Copy, ChevronUp } from "lucide-react";

type ActivityData = {
  date: string;
  time: string;
  title: string;
  desc: string;
  trxId: string;
  amount: string;
  isPositive: boolean;
  type: "Top-up" | "Cashback" | "Credit Transfer" | "Deposit" | "Refund" | "Adjustment" | "Bonus";
  status: "Completed" | "Processing" | "Canceled";
};

const activities: ActivityData[] = [
  { date: "Jul 4", time: "11:42 AM", title: "Meta · Retailix Growth Co", desc: "Wallet top-up via bKash", trxId: "TRX24567890", amount: "-৳10,000", isPositive: false, type: "Top-up", status: "Completed" },
  { date: "Jul 4", time: "10:05 AM", title: "Reconciliation team reward", desc: "Monthly performance cashback", trxId: "TRX24567890", amount: "+৳120", isPositive: true, type: "Cashback", status: "Completed" },
  { date: "Jul 3", time: "6:40 PM", title: "UrbanCart Apparel (reclaimed)", desc: "Reclaimed unused ad credit", trxId: "TRX24567890", amount: "+৳1,150", isPositive: true, type: "Credit Transfer", status: "Completed" },
  { date: "Jul 3", time: "3:15 PM", title: "Bank deposit via Dutch-Bangla Bank", desc: "Manual wallet deposit", trxId: "TRX24567890", amount: "+৳20,000", isPositive: true, type: "Deposit", status: "Processing" },
  { date: "Jul 2", time: "1:22 PM", title: "Ad account spend refund", desc: "Refund for overcharged amount", trxId: "TRX24567890", amount: "-৳2,450", isPositive: false, type: "Refund", status: "Completed" },
  { date: "Jul 1", time: "9:10 AM", title: "Manual credit adjustment", desc: "Adjusted by system admin", trxId: "TRX24567890", amount: "-৳500", isPositive: false, type: "Adjustment", status: "Completed" },
  { date: "Jun 30", time: "8:30 PM", title: "Monthly usage bonus", desc: "Bonus for high ad spend", trxId: "TRX24567890", amount: "+৳300", isPositive: true, type: "Bonus", status: "Canceled" },
];

const typeStyles: Record<string, string> = {
  "Top-up": "bg-sky-50 text-sky-500 border-sky-100",
  "Cashback": "bg-fuchsia-50 text-fuchsia-500 border-fuchsia-100",
  "Credit Transfer": "bg-emerald-50 text-emerald-500 border-emerald-100",
  "Deposit": "bg-amber-50 text-amber-500 border-amber-100",
  "Refund": "bg-rose-50 text-rose-500 border-rose-100",
  "Adjustment": "bg-blue-50 text-blue-500 border-blue-100",
  "Bonus": "bg-teal-50 text-teal-500 border-teal-100",
};

const statusStyles: Record<string, string> = {
  Completed: "bg-emerald-50/60 text-emerald-500",
  Processing: "bg-amber-50/60 text-amber-500",
  Canceled: "bg-rose-50 text-rose-400",
};

export default function RecentActivityTable() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900">Recent Activity</h2>
        <button className="px-4 py-2 bg-white border border-slate-200 text-slate-500 font-semibold text-xs rounded-xl hover:bg-slate-50 transition">
          View All
        </button>
      </div>

      {/* রিল্যান্ডারিং এবং স্থায়ী স্ক্রলবার দেখানোর গ্লোবাল স্টাইল */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) {
          .mobile-scroll-container {
            overflow-x: auto !important;
            -webkit-overflow-scrolling: touch !important;
          }
          /* স্ক্রলবার শুরুতেই স্থায়ীভাবে দেখানোর জন্য */
          .mobile-scroll-container::-webkit-scrollbar {
            height: 6px !important;
            display: block !important;
          }
          .mobile-scroll-container::-webkit-scrollbar-track {
            background: #f8fafc !important; 
            border-radius: 10px !important;
          }
          .mobile-scroll-container::-webkit-scrollbar-thumb {
            background: #cbd5e1 !important; /* একটু ডার্ক স্লেট কালার যাতে সহজেই চোখে পড়ে */
            border-radius: 10px !important;
          }
        }
        @media (min-width: 769px) {
          .mobile-scroll-container::-webkit-scrollbar {
            display: none !important;
          }
        }
      `}} />

      {/* টেবিলের মেইন কন্টেইনার - রাইট ফেড ইফেক্ট দেওয়ার জন্য রিলেটিভ পজিশন ব্যবহার করা হয়েছে */}
      <div className="relative bg-white border border-slate-100 rounded-2xl shadow-xs overflow-hidden w-full">
        
        {/* রাইট গ্রেডিয়েন্ট ওভারলে: এটি ইউজারকে ইঙ্গিত দেবে যে ডানপাশে আরও ডেটা আছে (শুধু মোবাইলে দেখাবে) */}
        <div className="pointer-events-none absolute top-0 right-0 bottom-0 w-12 bg-gradient-to-l from-white/90 to-transparent z-10 md:hidden" />

        <div className="mobile-scroll-container w-full pb-3">
          <table className="w-full text-left border-collapse min-w-[850px] md:min-w-full">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-bold tracking-wider text-slate-400 uppercase border-b border-slate-100">
                <th className="py-3.5 px-6 whitespace-nowrap">
                  <div className="flex items-center gap-1 cursor-pointer">DATE & TIME <ChevronUp size={12} /></div>
                </th>
                <th className="py-3.5 px-6">DESCRIPTION</th>
                <th className="py-3.5 px-6">TRANSACTION ID</th>
                <th className="py-3.5 px-6">AMOUNT</th>
                <th className="py-3.5 px-6">TYPE</th>
                <th className="py-3.5 px-6">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {activities.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition">
                  {/* Date & Time */}
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className="font-semibold text-slate-700 block">{row.date}, {row.time.split(",")[0]}</span>
                  </td>
                  {/* Description */}
                  <td className="py-4 px-6 max-w-[280px]">
                    <span className="font-bold text-slate-800 block line-clamp-1">{row.title}</span>
                    <span className="text-xs text-slate-400 block mt-0.5">{row.desc}</span>
                  </td>
                  {/* TRX ID */}
                  <td className="py-4 px-6 whitespace-nowrap text-slate-600 font-medium">
                    <div className="flex items-center gap-2">
                      <span>{row.trxId}</span>
                      <button 
                        onClick={() => copyToClipboard(row.trxId)} 
                        className="text-slate-400 hover:text-slate-600 transition cursor-pointer"
                      >
                        <Copy size={13} />
                      </button>
                    </div>
                  </td>
                  {/* Amount */}
                  <td className={`py-4 px-6 whitespace-nowrap font-bold ${row.isPositive ? "text-emerald-500" : "text-rose-500"}`}>
                    {row.amount}
                  </td>
                  {/* Type Badge */}
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 border text-xs font-semibold rounded-xl ${typeStyles[row.type]}`}>
                      {row.type}
                    </span>
                  </td>
                  {/* Status Badge */}
                  <td className="py-4 px-6 whitespace-nowrap pr-10 md:pr-6">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-lg ${statusStyles[row.status]}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}