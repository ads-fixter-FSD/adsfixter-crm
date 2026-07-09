"use client";

import { useState } from "react";
import { Calendar, ChevronDown } from "lucide-react";
import PrimaryButton from "@/components/ui/PrimaryButton";

export interface StatCardData {
  id: string;
  icon: React.ReactNode;
  title: string;
  value: number;
  subtitle: string;
}

export interface TecketSupportCardsProps {
  title?: string;
  todayDate?: string;
  dateRangeLabel?: string;
  stats: StatCardData[];
}

const icon1 = (
  <svg
    width="20"
    height="12"
    viewBox="0 0 12 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.82292 0.5H2.56468C2.51421 0.5 2.48897 0.5 2.47325 0.500247C0.794172 0.526648 -0.10678 2.48552 0.965903 3.77755C0.975946 3.78965 0.99237 3.80881 1.02522 3.84713C1.03972 3.86405 1.04697 3.87251 1.05326 3.87999C1.67837 4.62389 1.67837 5.70945 1.05326 6.45334C1.04697 6.46083 1.03972 6.46929 1.02522 6.4862C0.99237 6.52453 0.975946 6.54369 0.965903 6.55578C-0.10678 7.84782 0.794172 9.80668 2.47325 9.83309C2.48897 9.83333 2.5142 9.83333 2.56468 9.83333H3.82292M3.82292 0.5H9.08115C9.13163 0.5 9.15686 0.5 9.17258 0.500247C10.8517 0.526648 11.7526 2.48552 10.6799 3.77755C10.6699 3.78965 10.6535 3.80881 10.6206 3.84713C10.6061 3.86405 10.5989 3.87251 10.5926 3.87999C9.96746 4.62389 9.96746 5.70945 10.5926 6.45334C10.5989 6.46083 10.6061 6.46929 10.6206 6.4862C10.6535 6.52453 10.6699 6.54369 10.6799 6.55578C11.7526 7.84782 10.8517 9.80668 9.17258 9.83309C9.15686 9.83333 9.13163 9.83333 9.08115 9.83333H3.82292M3.82292 0.5V2.16667M3.82292 4.16667V5.16667M3.82292 9.83333V7.16667"
      stroke="#ffff"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export default function TecketSupportCards({
  title = "Help & Support Overview",
  todayDate = "Wednesday - July 08, 2026",
  dateRangeLabel = "May 2026",
  stats,
}: TecketSupportCardsProps) {
  const [isDateOpen, setIsDateOpen] = useState(false);

  return (
    <section className="flex w-full flex-col gap-5 rounded-xl border border-[#EDEDED] bg-white p-4">
      {/* Header */}
      <div className="flex w-full flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex flex-col">
          <h1 className="m-0 font-sans text-[22px] font-medium leading-tight text-[#0e2038]">
            {title}
          </h1>
     
        </div>

        <div className="relative w-full sm:w-auto">
          <PrimaryButton className="min-h-10 flex items-center justify-center gap-2 px-4 py-2 !bg-[#F74608] hover:!bg-[#e03d04] border-0 text-white max-[640px]:w-full">
            <p>{icon1}</p>
            Open Ticket
          </PrimaryButton>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.id}
            className="flex flex-col justify-between rounded-[10px] border border-[#E9E9E9] bg-white p-4 shadow-[0px_1px_2px_0px_#E4E5E73D]"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F6F6F6]">
              {item.icon}
            </div>

            <p className="mt-3 text-sm text-[#7f8482]">{item.title}</p>
            <p className="mt-1 text-2xl font-medium text-[#0e2038]">
              {item.value}
            </p>
            <p className="mt-1 text-sm text-[#999d9b]">{item.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

