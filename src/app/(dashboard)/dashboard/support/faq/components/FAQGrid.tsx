"use client";

import React, { useState } from "react";
import { Search, ArrowUpRight } from "lucide-react";
import { FAQItem, MOCK_FAQS } from "../data";

interface FAQGridProps {
  onSelectFAQ: (faq: FAQItem) => void;
}

export default function FAQGrid({ onSelectFAQ }: FAQGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  const getCount = (category: string) => {
    if (category === "All") return MOCK_FAQS.length;
    return MOCK_FAQS.filter((faq) => faq.category === category).length;
  };

  const tabs = [
    { name: "All", label: "All" },
    { name: "Meta API", label: "Meta API & Ads" },
    { name: "Billing & Wallet", label: "Billing & Wallet" },
    { name: "Integration", label: "Inegration" },
  ];

  const filteredFAQs = MOCK_FAQS.filter((faq) => {
    const matchesTab = activeTab === "All" || faq.category === activeTab;
    const matchesSearch =
      faq.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6 md:space-y-8">
      {/* ফিল্টার এবং সার্চ বার */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* ট্যাব বাটন */}
        <div className="w-full lg:w-auto overflow-x-auto no-scrollbar -mx-4 px-4 lg:mx-0 lg:px-0">
          <div className="flex items-center gap-2 min-w-max  py-1  bg-[#F8F8F8] p ">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.name;
              return (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl transition-all ${
                    isActive
                      ? "bg-white text-[#3E4D60]"
                      : " text-[#525866] border-transparent hover:text-slate-600"
                  }`}
                >
                  <span className="whitespace-nowrap">{tab.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${isActive ? "bg-white text-slate-600 border border-slate-200/40" : "bg-slate-50 text-slate-400"}`}>
                    {getCount(tab.name)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* সার্চ ইনপুট */}
        <div className="relative w-full lg:max-w-[280px]">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 placeholder-slate-400 outline-none focus:border-slate-300 transition-all"
          />
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>
      </div>

      {/* গ্রিড লেআউট */}
      {filteredFAQs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {filteredFAQs.map((faq) => (
            <div key={faq.id} className="group bg-white border border-slate-100 rounded-2xl p-5 md:p-6 flex flex-col justify-between space-y-4 hover:border-slate-200/80 hover:shadow-[0_4px_16px_rgba(0,0,0,0.01)] transition-all duration-200">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] md:text-[12px] text-[#5E6A7A] uppercase tracking-wider">{faq.category}</span>
                <button 
                  onClick={() => onSelectFAQ(faq)}
                  className="flex items-center gap-1 px-2.5 py-1.5 border border-slate-100 rounded-lg text-[12px] text-[#5E6A7A] bg-white hover:bg-slate-50 transition-colors"
                >
                  <span>Read More</span>
                  <ArrowUpRight size={11} className=" transition-colors" />
                </button>
              </div>
              <div className="space-y-1.5 flex-1">
                <h3 className="text-xs md:text-[16px] font-medium text-[#0E2038] leading-snug group-hover:text-slate-950 transition-colors line-clamp-2">{faq.title}</h3>
                <p className="text-[11px] md:text-[14px] text-[#7F8482] leading-relaxed line-clamp-3">{faq.description}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center text-slate-400 text-xs font-semibold">No FAQ found matching your filter.</div>
      )}
    </div>
  );
}