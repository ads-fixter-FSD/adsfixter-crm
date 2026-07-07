"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

// রিসিভিং ব্যাংক ডাটা স্ট্রাকচার
interface ReceivingBank {
  id: string;
  name: string;
  logoText: string;
  bgColor: string;
  accountName: string;
  accountNumber: string;
  routingNumber: string;
  branch: string;
}

const RECEIVING_BANKS: ReceivingBank[] = [
  {
    id: "city",
    name: "City Bank",
    logoText: "🔴",
    bgColor: "from-red-600 to-rose-500",
    accountName: "Meta Bari Ltd.",
    accountNumber: "2109 4487 6612",
    routingNumber: "225261442",
    branch: "Gulshan Branch, Dhaka"
  },
  {
    id: "brac",
    name: "BRAC Bank",
    logoText: "⭐",
    bgColor: "from-blue-700 to-sky-500",
    accountName: "Meta Bari Ltd.",
    accountNumber: "5501 2248 9913",
    routingNumber: "115261774",
    branch: "Banani Branch, Dhaka"
  }
];

export default function ReceivingBankCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState<ReceivingBank>(RECEIVING_BANKS[0]);
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // বাইরে ক্লিক করলে ড্রপডাউন বন্ধ করার লজিক
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleIndividualCopy = (text: string, field: string) => {
    // স্পেস রিমুভ করে ক্লিন নাম্বার কপি করার জন্য
    navigator.clipboard.writeText(text.replace(/\s+/g, ''));
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 1500);
  };

  const handleCopyAll = () => {
    const fullText = `Bank: ${selectedBank.name}\nAccount Name: ${selectedBank.accountName}\nAccount Number: ${selectedBank.accountNumber}\nRouting Number: ${selectedBank.routingNumber}\nBranch: ${selectedBank.branch}`;
    navigator.clipboard.writeText(fullText);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between relative" ref={dropdownRef}>
      <div className="space-y-5">
        {/* Step Marker */}
        <div className="flex gap-3">
          <span className="w-6 h-6 rounded-full bg-[#f24e1e] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">2</span>
          <div className="space-y-0.5">
            <h3 className="text-[15px] font-bold text-[#0f172a]">Select Receiving Bank (AdsFixter Account)</h3>
            <p className="text-xs text-slate-400 font-medium">This is the account where you will send the money.</p>
          </div>
        </div>

        {/* Receiving Bank Input Wrapper */}
        <div className="space-y-2 relative">
          <label className="text-xs font-semibold text-slate-700">Receiving Bank</label>
          
          {/* Dropdown Trigger */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between border border-slate-200 rounded-xl px-3.5 py-2.5 bg-white text-sm font-semibold text-slate-800 outline-none focus:border-slate-400 transition text-left"
          >
            <div className="flex items-center gap-2.5">
              <div className={`w-5 h-5 rounded-md bg-gradient-to-r ${selectedBank.bgColor} text-white font-bold text-[8px] flex items-center justify-center shadow-xs shrink-0`}>
                {selectedBank.logoText}
              </div>
              <span className="text-slate-800 font-bold text-[13px]">{selectedBank.name}</span>
            </div>
            <ChevronDown size={16} className={`text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
          </button>

          {/* Dropdown Options Layout */}
          {isOpen && (
            <div className="absolute left-0 right-0 top-[calc(100%+4px)] bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden z-50 py-1">
              {RECEIVING_BANKS.map((bank) => (
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
                    <div className={`w-5 h-5 rounded-md bg-gradient-to-r ${bank.bgColor} text-white font-bold text-[8px] flex items-center justify-center shrink-0`}>
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

        {/* Details Section with Shaded Layout */}
        <div className="bg-[#fdfaf7] rounded-xl px-4 py-1 border border-[#faf3ec]/60">
          <div className="flex justify-between items-center py-3 border-b border-slate-100/60">
            <span className="text-xs font-medium text-slate-400">Account Name</span>
            <span className="text-xs font-bold text-slate-800">{selectedBank.accountName}</span>
          </div>
          
          <div className="flex justify-between items-center py-3 border-b border-slate-100/60">
            <span className="text-xs font-medium text-slate-400">Account Number</span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-800 tracking-wide">{selectedBank.accountNumber}</span>
              <button 
                type="button"
                onClick={() => handleIndividualCopy(selectedBank.accountNumber, "acc")} 
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
              <span className="text-xs font-bold text-slate-800">{selectedBank.routingNumber}</span>
              <button 
                type="button"
                onClick={() => handleIndividualCopy(selectedBank.routingNumber, "route")} 
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
            <span className="text-xs font-bold text-slate-800">{selectedBank.branch}</span>
          </div>
        </div>
      </div>

      {/* Dynamic Copy Button */}
      <button
        type="button"
        onClick={handleCopyAll}
        className="mt-5 w-full py-2.5 bg-[#f24e1e] text-white text-xs font-bold rounded-xl hover:bg-[#e03d0d] transition shadow-2xs active:scale-[0.99]"
      >
        {copiedAll ? "Copied Successfully! ✓" : "Copy Account Details"}
      </button>
    </div>
  );
}