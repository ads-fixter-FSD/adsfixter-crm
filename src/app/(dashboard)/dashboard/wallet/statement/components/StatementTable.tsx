"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, ArrowUpDown } from "lucide-react";

interface RowData {
  id: string;
  bankName: string;
  accountNo: string;
  amount: string;
  ref: string;
  date: string;
  status: "Verified" | "Review";
  note: string;
}

const MOCK_DATA: RowData[] = [
  { id: "DEP-2291", bankName: "AB Bank", accountNo: "123456783312", amount: "+৳30,000", ref: "TXN88213", date: "Jul 3, 2026", status: "Verified", note: "—" },
  { id: "DEP-2277", bankName: "City Bank", accountNo: "987654329081", amount: "+৳20,000", ref: "TXN88213", date: "Jul 27, 2026", status: "Verified", note: "It is a long established fact that a reader will be distracted by the readable content of a..." },
  { id: "DEP-2245", bankName: "bKash", accountNo: "01712344471", amount: "+৳10,000", ref: "TXN88213", date: "Jul 20, 2026", status: "Verified", note: "It is a long established fact that a reader will be distracted by the readable content of a..." },
  { id: "DEP-2223", bankName: "nagad", accountNo: "01912344471", amount: "+৳15,000", ref: "TXN88213", date: "Jul 28, 2026", status: "Review", note: "It is a long established fact that a reader will be distracted by the readable content of a..." },
  { id: "DEP-2212", bankName: "bKash", accountNo: "01512344471", amount: "+৳10,000", ref: "TXN88213", date: "May 3, 2026", status: "Verified", note: "It is a long established fact that a reader will be distracted by the readable content of a..." },
  { id: "DEP-2291", bankName: "AB Bank", accountNo: "123456783312", amount: "+৳30,000", ref: "TXN88213", date: "Jul 3, 2026", status: "Verified", note: "—" },
  { id: "DEP-2277", bankName: "City Bank", accountNo: "987654329081", amount: "+৳20,000", ref: "TXN88213", date: "Jul 27, 2026", status: "Verified", note: "It is a long established fact that a reader will be distracted by the readable content of a..." },
  { id: "DEP-2245", bankName: "bKash", accountNo: "01712344471", amount: "+৳10,000", ref: "TXN88213", date: "Jul 20, 2026", status: "Verified", note: "It is a long established fact that a reader will be distracted by the readable content of a..." },
];

export default function StatementTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalPages = Math.ceil(MOCK_DATA.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = MOCK_DATA.slice(indexOfFirstItem, indexOfLastItem);

  const formatBankDetails = (bankName: string, accountNo: string) => {
    if (!accountNo) return bankName;
    const cleanNumber = accountNo.replace(/\s+/g, "");
    const lastFour = cleanNumber.slice(-4);
    // ছবির মতো স্পেসিং ম্যাচ করার জন্য
    return `${bankName} • ****${lastFour}`;
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="w-full p-3">
      {/* মোবাইল স্ক্রলবার হ্যান্ডলার সিএসএস */}
      <style dangerouslySetInnerHTML={{__html: `
        .forced-mobile-scroll {
          overflow-x: auto !important;
          -webkit-overflow-scrolling: touch !important;
        }
        .forced-mobile-scroll::-webkit-scrollbar {
          height: 5px !important;
          display: block !important;
        }
        .forced-mobile-scroll::-webkit-scrollbar-track {
          background: #fdfdfd !important;
        }
        .forced-mobile-scroll::-webkit-scrollbar-thumb {
          background: #cbd5e1 !important;
          border-radius: 10px !important;
        }
      `}} />

      {/* মেইন টেবিল কন্টেইনার */}
      <div className="bg-white border border-[#f1f5f9] rounded-[20px] overflow-hidden w-full shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
        <div className="forced-mobile-scroll w-full">
          {/* border-separate এবং cellspacing-0 দিয়ে পারফেক্ট গ্রিড তৈরি */}
          <table className="w-full text-left border-separate border-spacing-0 min-w-[1000px] md:min-w-full">
            <thead>
              <tr className="bg-[#F8F8F8]">
                {[
                  { name: "Payment Id" },
                  { name: "Bank Details" },
                  { name: "Amount" },
                  { name: "Reference ID" },
                  { name: "Date" },
                  { name: "Status" },
                  { name: "Your Note" }
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
              {currentItems.map((row, index) => (
                <tr key={index} className="hover:bg-slate-50/40 transition">
                  
                  {/* Payment ID */}
                  <td className="py-4 px-5 text-slate-900 font-bold border-b border-[#f1f5f9] border-r border-[#f1f5f9]">
                    {row.id}
                  </td>
                  
                  {/* Bank Details */}
                  <td className="py-4 px-5 text-slate-700 font-semibold border-b border-[#f1f5f9] border-r border-[#f1f5f9]">
                    {formatBankDetails(row.bankName, row.accountNo)}
                  </td>
                  
                  {/* Amount (হালকা ব্যাকগ্রাউন্ড টিন্ট সহ) */}
                  <td className="py-4 px-5 text-[#2baf68] font-bold border-b border-[#f1f5f9] border-r border-[#f1f5f9]">
                    {row.amount}
                  </td>
                  
                  {/* Reference ID */}
                  <td className="py-4 px-5 text-slate-500 font-semibold border-b border-[#f1f5f9] border-r border-[#f1f5f9]">
                    {row.ref}
                  </td>
                  
                  {/* Date */}
                  <td className="py-4 px-5 font-bold text-slate-900 border-b border-[#f1f5f9] border-r border-[#f1f5f9]">
                    {row.date}
                  </td>
                  
                  {/* Status (ফুল পিল ব্যাকগ্রাউন্ড) */}
                  <td className="py-4 px-5 border-b border-[#f1f5f9] border-r border-[#f1f5f9]">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold rounded-xl min-w-[95px] justify-center ${
                      row.status === "Verified" ? "bg-[#e6fcf5] text-[#0ca678]" : "bg-[#fff9db] text-[#f59f00]"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full bg-current`} />
                      <span>{row.status}</span>
                    </span>
                  </td>
                  
                  {/* Your Note */}
                  <td className="py-4 px-5 text-slate-400 font-medium max-w-[240px] truncate border-b border-[#f1f5f9]">
                    {row.note}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* প্যাজিনেশন ফুটার (টেবিলের গ্রিড বর্ডারের সাথে এলাইন করা) */}
      <div className=" p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-500 bg-white rounded-b-2xl shadow-[0_1px_2px_rgba(0,0,0,0.01)]">
        {/* Per Page Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-bold">Show</span>
          <div className="relative">
            <select 
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="appearance-none pl-3 pr-8 py-1.5 border border-slate-200 rounded-lg bg-white font-bold text-slate-800 text-xs outline-none focus:border-slate-300 cursor-pointer"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
          <span className="text-slate-400 font-bold">Per Page</span>
        </div>

        {/* ডাইনামিক প্যাজিনেশন বাটন */}
        {totalPages > 1 && (
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`p-1.5 rounded-lg border border-slate-100 transition ${
                currentPage === 1 ? "text-slate-300 cursor-not-allowed" : "text-slate-500 hover:bg-slate-50 cursor-pointer"
              }`}
            >
              <ChevronLeft size={14} />
            </button>

            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-7 h-7 flex items-center justify-center rounded-lg font-bold transition cursor-pointer ${
                  currentPage === page
                    ? "bg-[#f24e1e] text-white shadow-3xs"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`p-1.5 rounded-lg border border-slate-100 transition ${
                currentPage === totalPages ? "text-slate-300 cursor-not-allowed" : "text-slate-500 hover:bg-slate-50 cursor-pointer"
              }`}
            >
              <ChevronRight size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}