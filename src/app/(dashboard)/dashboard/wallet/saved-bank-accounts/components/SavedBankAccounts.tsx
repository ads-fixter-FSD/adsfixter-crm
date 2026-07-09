"use client";

import React, { useState } from "react";
import { Plus, Landmark, Smartphone, Banknote, Edit2, Trash2, Star } from "lucide-react";

interface Account {
  id: string;
  name: string;
  type?: string;
  accountNo: string;
  holder: string;
  isDefault: boolean;
  category: "bank" | "mobile" | "cash";
}

export default function SavedBankAccounts() {
  const [accounts, setAccounts] = useState<Account[]>([
    { id: "1", name: "City Bank", accountNo: "**** 4487 6122", holder: "Abdullah Al Nur", isDefault: true, category: "bank" },
    { id: "2", name: "BRAC Bank", accountNo: "**** 4487 6122", holder: "Abdullah Al Nur", isDefault: false, category: "bank" },
    { id: "3", name: "bKash", type: "Mobile Banking", accountNo: "01xx-xxx471", holder: "Abdullah Al Nur", isDefault: false, category: "mobile" },
    { id: "4", name: "Nagad", type: "Mobile Banking", accountNo: "01xx-xxx471", holder: "Abdullah Al Nur", isDefault: false, category: "mobile" },
    { id: "5", name: "Cash Deposit", type: "Over the Counter", accountNo: "**** 4487 6122", holder: "Abdullah Al Nur", isDefault: false, category: "cash" },
  ]);

  const handleSetDefault = (id: string) => {
    setAccounts(prev => prev.map(acc => ({ ...acc, isDefault: acc.id === id })));
  };

  const getIcon = (category: string, name: string) => {
    if (category === "bank") {
      return <div className="w-12 h-12 rounded-full bg-[#1e66c3] text-white flex items-center justify-center shrink-0"><Landmark size={20} /></div>;
    }
    if (category === "mobile") {
      const isBkash = name.toLowerCase() === "bkash";
      return <div className={`w-12 h-12 rounded-full text-white flex items-center justify-center shrink-0 ${isBkash ? "bg-[#d11a59]" : "bg-[#f24e1e]"}`}><Smartphone size={20} /></div>;
    }
    return <div className="w-12 h-12 rounded-full bg-[#00e676] text-white flex items-center justify-center shrink-0"><Banknote size={20} /></div>;
  };

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-4 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.01)] w-full">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div className="space-y-1">
          <h2 className="text-xl font-bold tracking-tight text-slate-900">Saved Bank Accounts</h2>
          <p className="text-xs font-semibold text-slate-400">
            Save your sending methods - bank, mobile banking, or cash deposit — for faster checkouts.
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#f24e1e] hover:bg-[#e04516] text-white font-bold text-xs rounded-xl transition shrink-0 tracking-wide cursor-pointer">
          <Plus size={14} strokeWidth={3} />
          <span>Add Bank Account</span>
        </button>
      </div>

      {/* Accounts Vertical List */}
      <div className="divide-y divide-slate-100/70">
        {accounts.map((acc) => (
          <div 
            key={acc.id} 
            className="py-5 grid grid-cols-1 md:grid-cols-12 items-start md:items-center gap-5"
          >
            {/* 1. Left Column: Branding & Meta (6/12 width) */}
            <div className="flex items-start gap-4 md:col-span-6 lg:col-span-5">
              {getIcon(acc.category, acc.name)}
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm sm:text-base font-bold text-slate-900 leading-none">{acc.name}</span>
                  {acc.type && <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{acc.type}</span>}
                  {acc.isDefault && <span className="px-1.5 py-0.5 bg-amber-50 text-amber-600 rounded-md font-bold text-[9px] uppercase tracking-wider border border-amber-200/40">Default</span>}
                </div>
                <div className="text-xs font-medium text-slate-500 space-y-0.5 leading-relaxed">
                  <p>Account: <span className="font-bold text-slate-800">{acc.accountNo}</span></p>
                  <p>Holder: <span className="font-bold text-slate-800">{acc.holder}</span></p>
                </div>
              </div>
            </div>
            
            {/* 2. Center Column: Default Button Controller (3/12 width) */}
            <div className="md:col-span-3 lg:col-span-4 flex md:justify-center">
              {acc.isDefault ? (
                <button className="flex items-center justify-center gap-1.5 px-5 py-2 bg-[#f24e1e] text-white font-bold text-xs rounded-xl min-w-[145px]">
                  <Star size={12} fill="currentColor" />
                  <span>Default Account</span>
                </button>
              ) : (
                <button 
                  onClick={() => handleSetDefault(acc.id)}
                  className="px-5 py-2 bg-white border border-[#f24e1e] text-[#f24e1e] hover:bg-[#fff5f2] font-bold text-xs rounded-xl transition min-w-[145px] cursor-pointer"
                >
                  Set as Default
                </button>
              )}
            </div>

            {/* 3. Right Column: Actions Controls (Edit / Delete) (3/12 width) */}
            <div className="md:col-span-3 lg:col-span-3 flex items-center justify-start md:justify-end gap-2.5">
              <button className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl transition shadow-3xs cursor-pointer">
                <Edit2 size={12} className="text-slate-400" strokeWidth={2.5} />
                <span>Edit</span>
              </button>
              <button className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 bg-white hover:bg-red-50 text-slate-700 hover:text-[#be1c23] font-bold text-xs rounded-xl transition shadow-3xs cursor-pointer group">
                <Trash2 size={12} className="text-[#be1c23] transition" strokeWidth={2.5} />
                <span className="text-[#be1c23]">Delete</span>
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}