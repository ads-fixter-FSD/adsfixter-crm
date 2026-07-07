import React from "react";

export default function DepositHeader() {
  return (
    <div className="relative bg-white border border-slate-100 rounded-2xl p-6 shadow-2xs flex items-center justify-between overflow-hidden min-h-[110px]">
      <div className="space-y-1 z-10">
        <h1 className="text-2xl font-bold tracking-tight text-slate-950">Deposit to Wallet</h1>
        <p className="text-sm text-slate-400">
          send money to your assigned Adsrixter account and submit the details below.
        </p>
      </div>
      
      {/* Dynamic/Mock Isometric Wallet SVG Illustration */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden sm:block opacity-90">
        <div className="relative w-24 h-16 bg-[#f24e1e]/90 rounded-xl shadow-md flex items-center justify-center">
          <div className="absolute -top-2 w-16 h-4 bg-amber-400/80 rounded-t-lg" />
          <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-xs text-[#f24e1e] font-bold text-sm">
            +
          </div>
          <div className="absolute -left-4 -top-3 w-3 h-3 rounded-full bg-amber-400 opacity-60" />
          <div className="absolute -left-2 bottom-1 w-2 h-2 rounded-full bg-amber-400 opacity-80" />
        </div>
      </div>
    </div>
  );
}