
import React from "react";
import { ArrowUpRight, ChevronLeft, Plus, Check } from "lucide-react";
import { FAQItem } from "../data";

interface ArticleDetailProps {
  faq: FAQItem;
  onBack: () => void;
}

export default function ArticleDetail({ faq, onBack }: ArticleDetailProps) {
  return (
    <div className="space-y-6">
      {/* সাব-হেডার অ্যাকশন */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-bold text-[#1e293b] hover:text-slate-600 transition-colors self-start"
        >
          <ChevronLeft size={16} strokeWidth={2.5} />
          <span>Back to Knowledge Base</span>
        </button>

        <button className="flex items-center justify-center gap-1.5 px-3.5 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors self-start sm:self-auto">
          <Plus size={14} />
          <span>Request Another Ad Account</span>
        </button>
      </div>

      {/* ২-কলাম স্প্লিট লেআউট */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* বাম পাশের ফিক্সড কার্ড */}
        <div className="lg:col-span-4 lg:sticky lg:top-6">
          <div className="bg-white border border-slate-100 rounded-2xl p-5 md:p-6 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] md:text-[11px] font-bold text-slate-400 uppercase tracking-wider">{faq.category}</span>
              <span className="flex items-center gap-1 px-2.5 py-1.5 border border-slate-100 rounded-lg text-[10px] font-bold text-slate-400 bg-slate-50/50">
                <span>Read More</span>
                <ArrowUpRight size={11} />
              </span>
            </div>
            <div className="space-y-1.5">
              <h3 className="text-xs md:text-sm font-bold text-slate-900 leading-snug">{faq.title}</h3>
              <p className="text-[11px] md:text-xs text-slate-400 font-medium leading-relaxed">{faq.description}</p>
            </div>
          </div>
        </div>

        {/* ডান পাশের মূল কন্টেন্ট উইন্ডো */}
        <div className="lg:col-span-8 bg-white border border-slate-100 rounded-2xl p-6 md:p-8 space-y-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-[10px] md:text-xs font-bold text-slate-400">
              <span>{faq.category} & Ads</span>
              <span>•</span>
              <span>Updated {faq.updatedDate || "July 28, 2026"}</span>
              <span>•</span>
              <span>{faq.readTime || "5 min read"}</span>
            </div>
            <h2 className="text-lg md:text-xl font-bold text-slate-900 leading-snug">{faq.title}</h2>
            <p className="text-xs md:text-sm text-slate-400 font-medium leading-relaxed">
              Connect your verified Meta Business Manager to MetaBari to request ad accounts and start advertising.
            </p>
          </div>

          {/* Overview */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-800">Overview</h4>
            <p className="text-xs md:text-sm text-slate-500 font-medium leading-relaxed">
              Before requesting an ad account, your Meta Business Manager must be connected and verified. Once you approved, you will be able to...
            </p>
            <ul className="space-y-2 pt-1">
              {["Request new Ad Accounts", "Submit Top-up Requests", "Request BM Sharing", "View Campaign Performance"].map((text, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-slate-500 font-medium">
                  <Check size={14} className="text-slate-400 mt-0.5 shrink-0" strokeWidth={2.5} />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Requirements 1 */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-800">Requirements</h4>
            <ul className="space-y-2">
              {["Verified Meta Business Manager", "Business Email", "Business Verification", "Admin Access"].map((text, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-slate-500 font-medium">
                  <Check size={14} className="text-slate-400 mt-0.5 shrink-0" strokeWidth={2.5} />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}