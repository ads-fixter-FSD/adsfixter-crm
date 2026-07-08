"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

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
  { id: "DEP-2223", bankName: "nagad", accountNo: "01912344471", amount: "+৳15,000", ref: "TXN88213", date: "Jul 28, 2026", status: "Review", note: "It is a long established fact that a reader will be distracted by the readable content of a..." },
  { id: "DEP-2212", bankName: "bKash", accountNo: "01512344471", amount: "+৳10,000", ref: "TXN88213", date: "May 3, 2026", status: "Verified", note: "It is a long established fact that a reader will be distracted by the readable content of a..." },
  { id: "DEP-2291", bankName: "AB Bank", accountNo: "123456783312", amount: "+৳30,000", ref: "TXN88213", date: "Jul 3, 2026", status: "Verified", note: "—" },
  { id: "DEP-2277", bankName: "City Bank", accountNo: "987654329081", amount: "+৳20,000", ref: "TXN88213", date: "Jul 27, 2026", status: "Verified", note: "It is a long established fact that a reader will be distracted by the readable content of a..." },
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
    return `${bankName} . ****${lastFour}`;
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="w-full">
      {/* মোবােইলে স্ক্রলবার ফোর্স করার গ্লোবাল সিএসএস */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) {
          .forced-mobile-scroll {
            overflow-x: scroll !important;
            -webkit-overflow-scrolling: touch !important;
          }
          .forced-mobile-scroll::-webkit-scrollbar {
            height: 7px !important;
            display: block !important;
          }
          .forced-mobile-scroll::-webkit-scrollbar-track {
            background: #f1f5f9 !important;
            border-radius: 10px !important;
          }
          .forced-mobile-scroll::-webkit-scrollbar-thumb {
            background: #94a3b8 !important; /* ডার্ক স্লেট কালার যাতে শুরুতেই চোখে পড়ে */
            border-radius: 10px !important;
            border: 1px solid #f1f5f9 !important;
          }
        }
        @media (min-width: 769px) {
          .forced-mobile-scroll::-webkit-scrollbar {
            display: none !important;
          }
        }
      `}} />

      {/* Table Container with relative layout for right side fade mask */}
      <div className="relative bg-white border border-slate-100 rounded-2xl shadow-xs overflow-hidden w-full">
        
        {/* রাইট গ্রেডিয়েন্ট ওভারলে: ইউজারকে বোঝাবে যে ডানপাশে আরও ডেটা আছে */}
        <div className="pointer-events-none absolute top-0 right-0 bottom-0 w-14 bg-gradient-to-l from-white via-white/80 to-transparent z-10 md:hidden" />

        <div className="forced-mobile-scroll w-full pb-4">
          <table className="w-full text-left border-collapse min-w-[900px] md:min-w-full">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-5">Payment Id</th>
                <th className="py-3 px-5">Bank Details</th>
                <th className="py-3 px-5">Amount</th>
                <th className="py-3 px-5">Reference ID</th>
                <th className="py-3 px-5">Date</th>
                <th className="py-3 px-5">Status</th>
                <th className="py-3 px-5 pr-14 md:pr-5">Your Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/70 text-xs font-semibold text-slate-800">
              {currentItems.map((row, index) => (
                <tr key={index} className="hover:bg-slate-50/40 transition">
                  <td className="py-4 px-5 text-slate-900 font-bold">{row.id}</td>
                  <td className="py-4 px-5 text-slate-600 font-medium">
                    {formatBankDetails(row.bankName, row.accountNo)}
                  </td>
                  <td className="py-4 px-5 text-emerald-500 font-bold">{row.amount}</td>
                  <td className="py-4 px-5 text-slate-500 font-medium">{row.ref}</td>
                  <td className="py-4 px-5 font-bold text-slate-900">{row.date}</td>
                  <td className="py-4 px-5">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold ${
                      row.status === "Verified" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${row.status === "Verified" ? "bg-emerald-500" : "bg-amber-400"}`} />
                      {row.status}
                    </span>
                  </td>
                  {/* শেষ কলামে pr-14 দেওয়া হয়েছে যেন ফেড মাস্কের নিচে টেক্সট কেটে না যায় */}
                  <td className="py-4 px-5 text-slate-400 font-medium max-w-[240px] truncate pr-14 md:pr-5">
                    {row.note}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Footer */}
      <div className="p-4 border border-t-0 border-slate-100 rounded-b-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-500 bg-white">
        {/* Per Page Dropdown */}
        <div className="flex items-center gap-2">
          <span>Show</span>
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
          <span>Per Page</span>
        </div>

        {/* Dynamic Pagination Buttons */}
        {totalPages > 1 && (
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`p-1.5 rounded-lg border border-slate-100 transition ${
                currentPage === 1 ? "text-slate-300 cursor-not-allowed" : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              <ChevronLeft size={14} />
            </button>

            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-7 h-7 flex items-center justify-center rounded-lg font-bold transition ${
                  currentPage === page
                    ? "bg-[#f24e1e] text-white shadow-2xs"
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
                currentPage === totalPages ? "text-slate-300 cursor-not-allowed" : "text-slate-500 hover:bg-slate-50"
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