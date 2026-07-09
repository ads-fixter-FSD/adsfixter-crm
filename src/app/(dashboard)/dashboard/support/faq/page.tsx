"use client";

import React, { useState } from "react";
import { Ticket } from "lucide-react";
import { FAQItem } from "./data";
import FAQGrid from "./components/FAQGrid";
import ArticleDetail from "./components/ArticleDetail";

export default function FAQPage() {
  const [selectedFAQ, setSelectedFAQ] = useState<FAQItem | null>(null);

  return (
    <div className="w-full min-h-screen  flex justify-center items-start">
      {/* গ্লোবাল স্ক্রলবার হাইডার সিএসএস */}
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      <div className="w-full bg-white border border-slate-100 rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.012)] space-y-6 md:space-y-8">
        
        {/* টপ ফিক্সড হেডার */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100/70 pb-5 md:pb-6">
          <div className="space-y-1">
            <h1 className="text-lg md:text-2xl font-bold text-[#1e293b] tracking-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-xs md:text-sm text-slate-400 font-medium">
              Got questions about metabari? Find real-time answer and expert resolution guides below
            </p>
          </div>
          
          <button className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2.5 bg-[#f24e1e] hover:bg-[#db4316] text-white text-xs font-bold rounded-xl transition-colors shrink-0 shadow-xs">
            <Ticket size={14} className="-rotate-45" />
            <span>Open New Ticket</span>
          </button>
        </div>

        {/* কন্ডিশনাল রেন্ডারিং কন্ট্রোলার */}
        {!selectedFAQ ? (
          <FAQGrid onSelectFAQ={(faq) => setSelectedFAQ(faq)} />
        ) : (
          <ArticleDetail faq={selectedFAQ} onBack={() => setSelectedFAQ(null)} />
        )}

      </div>
    </div>
  );
}