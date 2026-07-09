"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface Destination {
  id: string;
  bankCode: string;
  bankName: string;
  accountNo: string;
  isDefault: boolean;
  bgColor: string;
}

export default function RefundRequestForm() {
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("Unused balance");
  const [selectedDest, setSelectedDest] = useState("dest-1");
  const [note, setNote] = useState("");

  const destinations: Destination[] = [
    { id: "dest-1", bankCode: "AB", bankName: "AB Bank", accountNo: "••••• 3312", isDefault: true, bgColor: "bg-[#00b0ff]" },
    { id: "dest-2", bankCode: "BR", bankName: "BRAC Bank", accountNo: "•••• 7741", isDefault: false, bgColor: "bg-[#a100ff]" },
    { id: "dest-3", bankCode: "BK", bankName: "bKash", accountNo: "01xxx-xxx471", isDefault: false, bgColor: "bg-[#ff007f]" },
  ];

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.01)] space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-xl font-bold tracking-tight text-slate-950">Request a Refund</h2>
        <p className="text-xs font-semibold text-slate-400">
          Send unused wallet balance back to one of your saved accounts.
        </p>
      </div>

      {/* Top Config Row */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
        {/* Available Balance Box */}
        <div className="md:col-span-3 bg-slate-50/50 border border-slate-100/80 rounded-xl p-4 space-y-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide block">Available for refund</span>
          <span className="text-xl font-extrabold text-slate-950 block tracking-tight">৳53,980</span>
        </div>

        {/* Amount Input */}
        <div className="md:col-span-5 space-y-1.5">
          <label className="text-xs font-bold text-slate-700">Amount (BDT)</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-800 font-bold text-sm">৳</span>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full pl-8 pr-4 py-3.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 outline-none focus:border-slate-300 transition"
            />
          </div>
          <span className="text-[10px] font-bold text-slate-400 block pl-0.5">Max ৳53,980</span>
        </div>

        {/* Reason Dropdown */}
        <div className="md:col-span-4 space-y-1.5">
          <label className="text-xs font-bold text-slate-700">Reason</label>
          <div className="relative">
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full appearance-none pl-4 pr-10 py-3.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 outline-none bg-white focus:border-slate-300 cursor-pointer transition"
            >
              <option>Unused balance</option>
              <option>Incorrect top-up</option>
              <option>Service issue</option>
            </select>
            <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Destination Grid List */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-slate-900 tracking-wide">Refund destination</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {destinations.map((dest) => {
            const isSelected = selectedDest === dest.id;
            return (
              <div
                key={dest.id}
                onClick={() => setSelectedDest(dest.id)}
                className={`border rounded-xl p-4 flex items-center gap-4 cursor-pointer transition select-none ${
                  isSelected 
                    ? "border-[#f24e1e] bg-orange-50/5" 
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                {/* Custom Radio Button */}
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition ${
                  isSelected ? "border-[#f24e1e]" : "border-slate-300"
                }`}>
                  {isSelected && <div className="w-2 h-2 rounded-full bg-[#f24e1e]" />}
                </div>

                {/* Bank Rounded Avatar */}
                <div className={`w-9 h-9 rounded-lg ${dest.bgColor} text-white text-[11px] font-bold flex items-center justify-center shrink-0 tracking-wider`}>
                  {dest.bankCode}
                </div>

                {/* Bank Meta Info */}
                <div className="text-xs font-bold text-slate-900 truncate">
                  <span>{dest.bankName} • </span>
                  <span className="text-slate-500 font-medium">{dest.accountNo}</span>
                  {dest.isDefault && (
                    <span className="ml-1.5 text-[10px] font-bold text-[#f24e1e] capitalize">(Default)</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Note & Action Controls */}
      <div className="space-y-3 pt-1">
        <label className="text-xs font-bold text-slate-700 block">Note (Optional)</label>
        <div className="flex flex-col md:flex-row items-end gap-4 justify-between">
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Any extra context for our team"
            className="w-full md:max-w-[700px] pl-4 pr-4 py-3 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 outline-none focus:border-slate-300 placeholder-slate-400 transition"
          />
          <button className="w-full md:w-auto px-8 py-3 bg-[#f24e1e] hover:bg-[#e04516] text-white font-bold text-xs rounded-xl shadow-xs tracking-wide transition shrink-0">
            Submit Refund Request
          </button>
        </div>
      </div>
    </div>
  );
}