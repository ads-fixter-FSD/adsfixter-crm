"use client";

import React, { useState } from "react";
import { Search, Calendar, ChevronDown, Copy, ArrowUpDown, ChevronLeft, ChevronRight, ArrowUpRight, ArrowDownLeft, CreditCard, RefreshCw } from "lucide-react";

interface Transaction {
  id: string;
  date: string;
  time: string;
  title: string;
  subtitle: string;
  txId: string;
  amount: number;
  isPositive: boolean;
  type: "Top-up" | "Cashback" | "Credit Transfer" | "Deposit" | "Refund" | "Adjustment" | "Bonus";
  note: string;
  status: "Completed" | "Processing" | "Canceled";
}

const MOCK_DATA: Transaction[] = [
  { id: "DEP-2291", date: "Jul 4, 2026", time: "11:42 AM", title: "Meta • Retailix Growth...", subtitle: "ID: 90894567", txId: "TRX24567890", amount: 10000, isPositive: false, type: "Top-up", note: "It is a long established fact that a reader will be distracted by the readable content of a page wh...", status: "Completed" },
  { id: "DEP-2291", date: "Jul 4, 2026", time: "10:05 AM", title: "Reconciliation team rew...", subtitle: "Monthly performance cashback", txId: "TRX24567890", amount: 120, isPositive: true, type: "Cashback", note: "It is a long established fact that a reader will be distracted by the readable content of a page wh...", status: "Completed" },
  { id: "DEP-2291", date: "Jul 3, 2026", time: "6:40 PM", title: "UrbanCart Apparel (recl...", subtitle: "Reclaimed unused ad cr...", txId: "TRX24567890", amount: 1150, isPositive: true, type: "Credit Transfer", note: "It is a long established fact that a reader will be distracted by the readable content of a page wh...", status: "Completed" },
  { id: "DEP-2291", date: "Jul 3, 2026", time: "3:15 PM", title: "Bank deposit via Dutch-...", subtitle: "Manual wallet deposit", txId: "TRX24567890", amount: 20000, isPositive: true, type: "Deposit", note: "It is a long established fact that a reader will be distracted by the readable content of a page wh...", status: "Processing" },
  { id: "DEP-2210", date: "Jul 2, 2026", time: "1:22 PM", title: "Ad account spend refund", subtitle: "Refund for overcharged...", txId: "TRX24567890", amount: 2450, isPositive: false, type: "Refund", note: "It is a long established fact that a reader will be distracted by the readable content of a page wh...", status: "Completed" },
  { id: "DEP-2198", date: "Jul 1, 2026", time: "9:10 AM", title: "Manual credit adjustment", subtitle: "Adjusted by system adm...", txId: "TRX24567890", amount: 500, isPositive: false, type: "Adjustment", note: "It is a long established fact that a reader will be distracted by the readable content of a page wh...", status: "Completed" },
  { id: "DEP-2150", date: "Jun 30, 2026", time: "8:30 PM", title: "Monthly usage bonus", subtitle: "Bonus for high ad spend", txId: "TRX24567890", amount: 300, isPositive: true, type: "Bonus", note: "It is a long established fact that a reader will be distracted by the readable content of a page wh...", status: "Completed" },
  { id: "DEP-2149", date: "Jun 30, 2026", time: "8:30 PM", title: "Monthly usage bonus", subtitle: "Bonus for high ad spend", txId: "TRX24567890", amount: 300, isPositive: true, type: "Bonus", note: "It is a long established fact that a reader will be distracted by the readable content of a page wh...", status: "Canceled" },
  { id: "DEP-2291", date: "Jul 4, 2026", time: "11:42 AM", title: "Meta • Retailix Growth...", subtitle: "ID: 90894567", txId: "TRX24567890", amount: 10000, isPositive: false, type: "Top-up", note: "It is a long established fact that a reader will be distracted by the readable content of a page wh...", status: "Completed" },
];

export default function WalletDashboard() {
  const [searchId, setSearchId] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  // তোমার রিকোয়েস্ট অনুযায়ী ১ম লোডেই 'All Time' এসাইন করা হয়েছে
  const [dateRange, setDateRange] = useState("All Time"); 
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const tabs = ["All", "Payment", "Topup", "Refund", "Ticket", "Transfer", "Cashback"];
  const dateOptions = [ "All Time", "Jan 2025 - Jun 2025", "Jul 2025 - Dec 2025", "Jan 2026 - Jun 2026"];

  // ================= STEP 1: ডাটা ফিল্টারিং লজিক =================
  const filteredData = MOCK_DATA.filter((item) => {
    const matchesSearch = item.id.toLowerCase().includes(searchId.toLowerCase()) || 
                          item.txId.toLowerCase().includes(searchId.toLowerCase());

    let matchesTab = true;
    if (activeTab !== "All") {
      const currentTab = activeTab.toLowerCase();
      if (currentTab === "payment") {
        matchesTab = item.type === "Deposit" || item.type === "Adjustment";
      } else if (currentTab === "topup") {
        matchesTab = item.type === "Top-up";
      } else if (currentTab === "transfer") {
        matchesTab = item.type === "Credit Transfer";
      } else {
        matchesTab = item.type.toLowerCase() === currentTab;
      }
    }

    let matchesDate = true;
    if (dateRange !== "All Time") {
      const year = dateRange.split(" ").pop(); 
      matchesDate = item.date.includes(year || "2026");
    }

    return matchesSearch && matchesTab && matchesDate;
  });

  // ================= STEP 2: ডাইনামিক অ্যানালিটিক্স ক্যালকুলেশন =================
  const stats = filteredData.reduce(
    (acc, item) => {
      if (item.status === "Canceled") return acc; 
      
      if (item.type === "Deposit" || item.type === "Bonus" || item.type === "Adjustment") {
        acc.paymentsIn += item.isPositive ? item.amount : -item.amount;
      } else if (item.type === "Top-up") {
        acc.topUpsOut += item.amount;
      } else if (item.type === "Cashback" || item.type === "Credit Transfer") {
        acc.otherCredits += item.amount;
      }
      
      acc.netChange = acc.paymentsIn - acc.topUpsOut + acc.otherCredits;
      return acc;
    },
    { paymentsIn: 0, topUpsOut: 0, otherCredits: 0, netChange: 0 }
  );

  // ================= STEP 3: পেজিনেশন ক্যালকুলেশন =================
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const getTypeBadgeStyle = (type: string) => {
    switch (type) {
      case "Top-up": return "bg-sky-50 text-sky-600 border-sky-100";
      case "Cashback": return "bg-purple-50 text-purple-600 border-purple-100";
      case "Credit Transfer": return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "Deposit": return "bg-orange-50 text-orange-600 border-orange-100";
      case "Refund": return "bg-rose-50 text-rose-600 border-rose-100";
      case "Adjustment": return "bg-indigo-50 text-indigo-600 border-indigo-100";
      default: return "bg-green-50 text-green-600 border-green-100";
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      {/* মোবাইলের জন্য স্ক্রলবার লক করার জন্য সিএসএস */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) {
          .forced-dashboard-scroll {
            overflow-x: scroll !important;
            -webkit-overflow-scrolling: touch !important;
          }
          .forced-dashboard-scroll::-webkit-scrollbar {
            height: 7px !important;
            display: block !important;
          }
          .forced-dashboard-scroll::-webkit-scrollbar-track {
            background: #f1f5f9 !important;
            border-radius: 10px !important;
          }
          .forced-dashboard-scroll::-webkit-scrollbar-thumb {
            background: #94a3b8 !important; /* স্পষ্ট বার ইন্ডিকেটর */
            border-radius: 10px !important;
            border: 1px solid #f1f5f9 !important;
          }
        }
        @media (min-width: 769px) {
          .forced-dashboard-scroll::-webkit-scrollbar {
            display: none !important;
          }
        }
      `}} />

      {/* Top Filter Area */}
      <div className="bg-white border border-slate-100 rounded-[20px] p-4 space-y-4 shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-950 tracking-tight">Wallet activity</h2>
            <p className="text-xs font-medium text-slate-400 mt-0.5">Your complete, official record of every transaction with AdsFixter.</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative max-w-60">
              <input
                type="text"
                placeholder="Search Statement ID"
                value={searchId}
                onChange={(e) => { setSearchId(e.target.value); setCurrentPage(1); }}
                className="w-full pl-3 pr-9 py-2 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-slate-300 transition"
              />
              <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>

            <div className="relative">
              <button 
                onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 transition"
              >
                <Calendar size={14} className="text-slate-400" />
                <span>{dateRange}</span>
                <ChevronDown size={12} className="text-slate-400" />
              </button>
              
              {isDateDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-1 z-50">
                  {dateOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => { setDateRange(opt); setIsDateDropdownOpen(false); setCurrentPage(1); }}
                      className={`w-full text-left px-4 py-2 text-xs font-semibold ${dateRange === opt ? "bg-orange-50 text-[#f24e1e]" : "text-slate-700 hover:bg-slate-50"}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center  gap-1.5 bg-[#F8F8F8] rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition tracking-wide ${
                activeTab === tab ? "bg-white text-[#f24e1e]" : "text-slate-400 hover:text-slate-600 border border-transparent"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Analytics Counter Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Payments in", value: `+৳${stats.paymentsIn.toLocaleString()}`, icon: <ArrowUpRight size={14} className="text-slate-400" /> },
          { label: "Top-ups out", value: `-৳${stats.topUpsOut.toLocaleString()}`, icon: <ArrowDownLeft size={14} className="text-slate-400" /> },
          { label: "Other Credits", value: `+৳${stats.otherCredits.toLocaleString()}`, icon: <CreditCard size={14} className="text-slate-400" /> },
          { label: "Net Change", value: `${stats.netChange >= 0 ? "+" : ""}৳${stats.netChange.toLocaleString()}`, icon: <RefreshCw size={14} className="text-slate-400" /> },
        ].map((box, i) => (
          <div key={i} className="bg-white border border-slate-100 rounded-2xl p-5 space-y-2 shadow-[0_1px_2px_rgba(0,0,0,0.005)]">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 tracking-wide">
              {box.icon}
              <span>{box.label}</span>
            </div>
            <div className="text-xl font-extrabold tracking-tight text-slate-950">{box.value}</div>
          </div>
        ))}
      </div>
      </div>

      

     <div className="border border-[#EDEDED] rounded-[20px] p-4">
       {/* Table Section */}
      <div className=" relative bg-white border border-[#EDEDED] rounded-2xl overflow-hidden">
        
        {/* রাইট ফেড মাস্ক ইফেক্ট (মোবাইলে কলাম লুকানো ইঙ্গিত করবে) */}
        <div className="pointer-events-none  absolute top-0 right-0 bottom-0 w-14 bg-linear-to-l from-white via-white/80 to-transparent z-10 md:hidden" />

        <div className="forced-dashboard-scroll w-full pb-4 ">
          <table className="w-full text-left border-collapse min-w-250">
            <thead>
              <tr className="bg-[#F8F8F8] border-b border-slate-100 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                <th className="py-3 px-4"><div className="flex items-center gap-1"><span>ID</span><ArrowUpDown size={10} /></div></th>
                <th className="py-3 px-4"><div className="flex items-center gap-1"><span>DATE & TIME</span><ArrowUpDown size={10} /></div></th>
                <th className="py-3 px-4"><div className="flex items-center gap-1"><span>DESCRIPTION</span><ArrowUpDown size={10} /></div></th>
                <th className="py-3 px-4"><div className="flex items-center gap-1"><span>TRANSACTION ID</span><ArrowUpDown size={10} /></div></th>
                <th className="py-3 px-4"><div className="flex items-center gap-1"><span>AMOUNT</span><ArrowUpDown size={10} /></div></th>
                <th className="py-3 px-4"><div className="flex items-center gap-1"><span>TYPE</span><ArrowUpDown size={10} /></div></th>
                <th className="py-3 px-4"><div className="flex items-center gap-1"><span>NOTE</span><ArrowUpDown size={10} /></div></th>
                <th className="py-3 px-4 text-center pr-14 md:pr-4"><div className="flex items-center justify-center gap-1"><span>STATUS</span><ArrowUpDown size={10} /></div></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-800">
              {currentItems.length > 0 ? (
                currentItems.map((row, index) => (
                  <tr key={index} className="hover:bg-slate-50/30 transition">
                    <td className="py-3.5 px-4 text-slate-900 font-bold">{row.id}</td>
                    <td className="py-3.5 px-4 whitespace-nowrap text-slate-500 font-medium">
                      <span className="text-slate-900 font-bold block">{row.date}</span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">{row.time}</span>
                    </td>
                    <td className="py-3.5 px-4 max-w-50">
                      <span className="text-slate-900 font-bold block truncate">{row.title}</span>
                      <span className="text-[10px] text-slate-400 block font-medium mt-0.5 truncate">{row.subtitle}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5 text-slate-600 font-bold">
                        <span>{row.txId}</span>
                        <button onClick={() => copyToClipboard(row.txId)} className="text-slate-300 hover:text-slate-500 transition">
                          <Copy size={11} />
                        </button>
                      </div>
                    </td>
                    <td className={`py-3.5 px-4 font-extrabold ${row.isPositive ? "text-emerald-500" : "text-rose-500"}`}>
                      {row.isPositive ? `+৳${row.amount.toLocaleString()}` : `-৳${row.amount.toLocaleString()}`}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold border ${getTypeBadgeStyle(row.type)}`}>
                        {row.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 font-medium max-w-45 truncate">{row.note}</td>
                    {/* শেষ কলামে pr-14 দেওয়া হয়েছে যেন ফেড ওভারলের নিচে টেক্সট কেটে না যায় */}
                    <td className="py-3.5 px-4 text-center pr-14 md:pr-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        row.status === "Completed" ? "bg-emerald-50 text-emerald-600" : row.status === "Processing" ? "bg-amber-50 text-amber-600" : "bg-red-50 text-red-600"
                      }`}>
                        <span className={`w-1 h-1 rounded-full ${row.status === "Completed" ? "bg-emerald-500" : row.status === "Processing" ? "bg-amber-400" : "bg-red-500"}`} />
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400 font-medium">No transactions found matching the filter.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Area */}
        <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-500 bg-white">
          <div className="flex items-center gap-2">
            <span>Show</span>
            <div className="relative">
              <select 
                value={itemsPerPage}
                onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                className="appearance-none pl-3 pr-8 py-1.5 border border-slate-200 rounded-lg bg-white font-bold text-slate-800 text-xs outline-none cursor-pointer"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
            <span>Per Page</span>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded-lg border border-slate-100 hover:bg-slate-50 transition text-slate-400 disabled:opacity-50"
              >
                <ChevronLeft size={13} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-6 h-6 flex items-center justify-center rounded-md font-bold transition ${
                    currentPage === page ? "bg-[#f24e1e] text-white shadow-sm" : "hover:bg-slate-50 text-slate-600"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button 
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-lg border border-slate-100 hover:bg-slate-50 transition text-slate-400 disabled:opacity-50"
              >
                <ChevronRight size={13} />
              </button>
            </div>
          )}
        </div>
      </div>
     </div>
    </div>
  );
}