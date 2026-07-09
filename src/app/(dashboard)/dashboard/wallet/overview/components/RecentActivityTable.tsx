"use client";

import React from "react";
import { Copy, ArrowUpDown, ArrowUp, Gift, RefreshCw, Landmark, ArrowRightLeft, Sparkles, Receipt } from "lucide-react";

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

// ছবির সাথে ম্যাচিং কাস্টম আইকন ম্যাপিং
const getTypeIcon = (type: string) => {
  switch (type) {
    case "Top-up": return <ArrowUp size={12} className="rotate-45" />;
    case "Cashback": return <Gift size={12} />;
    case "Credit Transfer": return <ArrowRightLeft size={12} />;
    case "Deposit": return <Landmark size={12} />;
    case "Refund": return <RefreshCw size={12} />;
    case "Adjustment": return <Receipt size={12} />;
    case "Bonus": return <Sparkles size={12} />;
    default: return null;
  }
};

// ছবির হুবহু টাইপ ব্যাজ স্টাইল
const typeStyles: Record<string, string> = {
  "Top-up": "bg-[#eaf5ff] text-[#3b9eff] border-transparent",
  "Cashback": "bg-[#fae8ff] text-[#d946ef] border-transparent",
  "Credit Transfer": "bg-[#f0fdf4] text-[#22c55e] border-transparent",
  "Deposit": "bg-[#fffbeb] text-[#f59e0b] border-transparent",
  "Refund": "bg-[#fff1f2] text-[#f43f5e] border-transparent",
  "Adjustment": "bg-[#eff6ff] text-[#3b82f6] border-transparent",
  "Bonus": "bg-[#f0fdf4] text-[#22c55e] border-transparent",
};

// ছবির হুবহু স্ট্যাটাস ব্যাজ স্টাইল (ফুল পিল ব্যাকগ্রাউন্ড)
const statusStyles: Record<string, string> = {
  Completed: "bg-[#e6fcf5] text-[#0ca678]",
  Processing: "bg-[#fff9db] text-[#f59f00]",
  Canceled: "bg-[#fff5f5] text-[#fa5252]",
};

export default function RecentActivityTable() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-5 w-full">
      {/* টপ হেডার */}
      <div className="flex items-center justify-between px-1">
        <h2 className="text-xl font-bold text-[#1e293b]">Recent Activity</h2>
        <button className="px-4 py-1.5 bg-white border border-slate-200 text-slate-500 font-bold text-xs rounded-lg hover:bg-slate-50 transition shadow-3xs cursor-pointer">
          View All
        </button>
      </div>

      {/* কাস্টম মোবাইল স্ক্রলবার এবং টেবিল বর্ডার ফিক্সার সিএসএস */}
      <style dangerouslySetInnerHTML={{__html: `
        .mobile-scroll-container {
          overflow-x: auto !important;
          -webkit-overflow-scrolling: touch !important;
        }
        .mobile-scroll-container::-webkit-scrollbar {
          height: 5px !important;
          display: block !important;
        }
        .mobile-scroll-container::-webkit-scrollbar-track {
          background: #fdfdfd !important;
        }
        .mobile-scroll-container::-webkit-scrollbar-thumb {
          background: #cbd5e1 !important;
          border-radius: 10px !important;
        }
      `}} />

      {/* মেইন টেবিল কন্টেইনার */}
      <div className="bg-white border border-[#f1f5f9] rounded-2xl overflow-hidden w-full shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        <div className="mobile-scroll-container w-full">
          {/* টেবিল গ্রিড বর্ডারিং - border-collapse এর বদলে border-separate ও spacing-0 ব্যবহার করা হয়েছে পারফেক্ট বর্ডারের জন্য */}
          <table className="w-full text-left border-separate border-spacing-0 min-w-[1000px] md:min-w-full">
            <thead>
              <tr className="bg-[#f8fafc]">
                {[
                  { name: "DATE & TIME" },
                  { name: "DESCRIPTION" },
                  { name: "TRANSACTION ID" },
                  { name: "AMOUNT" },
                  { name: "TYPE" },
                  { name: "STATUS" }
                ].map((th, index) => (
                  <th 
                    key={index} 
                    className="py-4 px-5 text-[11px] font-bold tracking-wider text-slate-500 uppercase border-b border-[#f1f5f9] border-r border-[#f1f5f9] last:border-r-0"
                  >
                    <div className="flex items-center gap-1.5 text-slate-400 font-bold">
                      <span>{th.name}</span>
                      <ArrowUpDown size={11} className="text-slate-300 stroke-[2.5]" />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            
            <tbody className="text-xs md:text-sm">
              {activities.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/40 transition">
                  
                  {/* Date & Time */}
                  <td className="py-4 px-5 whitespace-nowrap text-slate-700 font-medium border-b border-[#f1f5f9] border-r border-[#f1f5f9]">
                    {row.date}, {row.time}
                  </td>
                  
                  {/* Description */}
                  <td className="py-4 px-5 max-w-[280px] border-b border-[#f1f5f9] border-r border-[#f1f5f9]">
                    <span className="font-bold text-slate-800 block leading-tight">{row.title}</span>
                    <span className="text-[11px] text-slate-400 block mt-1 font-medium">{row.desc}</span>
                  </td>
                  
                  {/* Transaction ID */}
                  <td className="py-4 px-5 whitespace-nowrap text-slate-600 font-semibold border-b border-[#f1f5f9] border-r border-[#f1f5f9]">
                    <div className="flex items-center justify-between gap-4 group">
                      <span>{row.trxId}</span>
                      <button 
                        onClick={() => copyToClipboard(row.trxId)} 
                        className="text-slate-400 hover:text-slate-600 transition cursor-pointer"
                      >
                        <Copy size={13} strokeWidth={2.2} />
                      </button>
                    </div>
                  </td>
                  
                  {/* Amount (হালকা ব্যাকগ্রাউন্ড টিন্ট সহ) */}
                  <td className={`py-4 px-5 whitespace-nowrap font-bold border-b border-[#f1f5f9] border-r border-[#f1f5f9] ${
                    row.isPositive ? "text-[#2baf68] bg-[#fcfdfb]" : "text-[#e04848] bg-[#fffcfc]"
                  }`}>
                    {row.amount}
                  </td>
                  
                  {/* Type Badge */}
                  <td className="py-4 px-5 whitespace-nowrap text-center border-b border-[#f1f5f9] border-r border-[#f1f5f9]">
                    <div className="flex justify-start">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold rounded-lg border min-w-[100px] justify-center ${typeStyles[row.type]}`}>
                        {getTypeIcon(row.type)}
                        <span>{row.type}</span>
                      </span>
                    </div>
                  </td>
                  
                  {/* Status Badge */}
                  <td className="py-4 px-5 whitespace-nowrap border-b border-[#f1f5f9]">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold rounded-xl min-w-[90px] justify-center ${statusStyles[row.status]}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      <span>{row.status}</span>
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