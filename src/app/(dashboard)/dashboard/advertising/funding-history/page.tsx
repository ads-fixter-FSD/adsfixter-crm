"use client";

import React, { useState } from "react";
import { Clock } from "lucide-react";
import SummaryCard from "./component/SummaryCard";
import FundingTabs from "./component/FundingTabs";
import SearchFilterBar from "./component/SearchFilterBar";
import { fundingRows, TABS } from "@/types/dashboard/advertising/funding-history/data";
import FundingTable from "./component/FundingTable";
import Pagination from "./component/Pagination";

export default function FundingHistoryPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const totalPages = 5;

  return (
    <div className="bg-[var(--color-white)] border border-[var(--color-line)] rounded-2xl">
      {/* Header */}
      <div className="px-6 py-6 border-b border-[var(--color-line)]">
        <h1 className="h6-bold text-[var(--color-primary-text-500)]">
          Funding History for this Account
        </h1>
        <p className="body-sm-regular text-[var(--color-subtext-500)] mt-1">
          Only top-ups - for platform spend, see the spend tab.
        </p>
      </div>

      {/* Summary cards */}
      <div className="px-6 pt-6 flex flex-col sm:flex-row gap-4">
        <SummaryCard icon="∞" label="Total Funded (Lifetime)" value="$49.45" />
        <SummaryCard
          icon={<Clock size={16} />}
          label="Last Funded"
          value="Jul 4, 11:42 AM"
        />
      </div>

      {/* Tabs + Search/Filter */}
      <div className="px-6 pt-6 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <FundingTabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />
        <SearchFilterBar search={search} onSearchChange={setSearch} />
      </div>

      {/* Table */}
      <FundingTable rows={fundingRows} />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        perPage={perPage}
        onPageChange={setCurrentPage}
        onPerPageChange={setPerPage}
      />
    </div>
  );
}