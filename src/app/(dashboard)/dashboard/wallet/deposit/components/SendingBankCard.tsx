"use client";

import React, { useState, useRef, useEffect } from "react";
import { Info, ChevronDown, Check } from "lucide-react";

// ব্যাংক ডাটা টাইপ
interface BankOption {
  id: string;
  name: string;
  logoText: string;
  bgColor: string;
}

const BANK_OPTIONS: BankOption[] = [
  { id: "brac", name: "BRAC Bank", logoText: "⭐", bgColor: "from-blue-700 to-sky-500" },
  { id: "city", name: "City Bank", logoText: "🔴", bgColor: "from-red-600 to-rose-500" },
  { id: "dbbl", name: "Dutch-Bangla Bank", logoText: "🔷", bgColor: "from-emerald-700 to-green-500" },
  { id: "eastern", name: "Eastern Bank", logoText: "🦅", bgColor: "from-indigo-700 to-blue-500" },
];

export default function SendingBankCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState<BankOption>(BANK_OPTIONS[0]);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // ড্রপডাউন এর বাইরে ক্লিক করলে যেন ক্লোজ হয়ে যায়
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 1500);
  };

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between" ref={dropdownRef}>
      <div className="space-y-5">
        {/* Step Marker */}
        <div className="flex gap-3">
          <span className="w-6 h-6 rounded-full bg-[#f24e1e] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">1</span>
          <div className="space-y-0.5">
            <h3 className="text-[15px] font-bold text-[#0f172a]">Select Your Sending Bank</h3>
            <p className="text-xs text-slate-400 font-medium">This is the bank or mobile wallet you are sending from.</p>
          </div>
        </div>

        {/* Your Bank Dropdown Selector */}
        <div className="space-y-2 relative">
          <label className="text-xs font-semibold text-slate-700">Your Bank</label>
          
          {/* Custom Select Trigger Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between border border-slate-200 rounded-xl px-3.5 py-2.5 bg-white text-sm font-semibold text-slate-800 outline-none focus:border-slate-400 transition text-left"
          >
            <div className="flex items-center gap-2.5">
              <div className={`w-5 h-5 rounded-md bg-gradient-to-br ${selectedBank.bgColor} text-white font-bold text-[9px] flex items-center justify-center shadow-xs shrink-0`}>
                {selectedBank.logoText}
              </div>
              <span className="text-slate-800 font-bold text-[13px]">{selectedBank.name}</span>
            </div>
            <ChevronDown size={16} className={`text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
          </button>

          {/* Dynamic Dropdown Menu Options */}
          {isOpen && (
            <div className="absolute left-0 right-0 top-[calc(100%+4px)] bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden z-50 py-1">
              {BANK_OPTIONS.map((bank) => (
                <button
                  key={bank.id}
                  type="button"
                  onClick={() => {
                    setSelectedBank(bank);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium hover:bg-slate-50 transition ${
                    selectedBank.id === bank.id ? "bg-slate-50/70 text-[#f24e1e]" : "text-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-5 h-5 rounded-md bg-gradient-to-br ${bank.bgColor} text-white font-bold text-[9px] flex items-center justify-center shrink-0`}>
                      {bank.logoText}
                    </div>
                    <span className="font-bold text-[13px]">{bank.name}</span>
                  </div>
                  {selectedBank.id === bank.id && <Check size={14} className="text-[#f24e1e]" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details Section with Light Orange Shaded Rows */}
        <div className="bg-[#fdfaf7] rounded-xl px-4 py-1 border border-[#faf3ec]/60">
          <div className="flex justify-between items-center py-3 border-b border-slate-100/60">
            <span className="text-xs font-medium text-slate-400">Account Name</span>
            <span className="text-xs font-bold text-slate-800">Meta Bari Ltd.</span>
          </div>
          
          <div className="flex justify-between items-center py-3 border-b border-slate-100/60">
            <span className="text-xs font-medium text-slate-400">Account Number</span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-800 tracking-wide">2109 4487 6612</span>
              <button 
                type="button"
                onClick={() => handleCopy("210944876612", "acc")} 
                className="text-[#f24e1e] hover:text-[#e03d0d] transition"
              >
                {copiedField === "acc" ? (
                  <Check size={13} className="text-emerald-500" />
                ) : (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                )}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center py-3 border-b border-slate-100/60">
            <span className="text-xs font-medium text-slate-400">Routing Number</span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-800">225261442</span>
              <button 
                type="button"
                onClick={() => handleCopy("225261442", "route")} 
                className="text-[#f24e1e] hover:text-[#e03d0d] transition"
              >
                {copiedField === "route" ? (
                  <Check size={13} className="text-emerald-500" />
                ) : (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                )}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center py-3">
            <span className="text-xs font-medium text-slate-400">Branch</span>
            <span className="text-xs font-bold text-slate-800">Gulshan Branch, Dhaka</span>
          </div>
        </div>
      </div>

      {/* Info Notice Box */}
      <div className="mt-5 flex gap-2.5 p-3.5 bg-slate-50/80 border border-slate-100 rounded-xl text-[11px] text-slate-500 leading-relaxed">
        <Info size={14} className="text-slate-400 shrink-0 mt-0.5" />
        <span>If you are sending from a bank other than City Bank, please add a note below.</span>
      </div>
    </div>
  );
}