
"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,

  ResponsiveContainer,
  ReferenceLine,
  Cell,
  Tooltip,
} from "recharts";
import { ChevronDown, Calendar } from "lucide-react";

const data = [
  { name: "Jan", total: 10000, spend: 3000 },
  { name: "Feb", total: 15000, spend: 6000 },
  { name: "Mar", total: 16000, spend: 5500 },
  { name: "Apr", total: 12000, spend: 5000 },
  { name: "May", total: 19000, spend: 12000 },
  { name: "Jun", total: 16000, spend: 9500 },
  { name: "Jul", total: 14000, spend: 7000 },
  { name: "Aug", total: 17000, spend: 3000 },
  { name: "Sep", total: 6000, spend: 1500 },
  { name: "Oct", total: 15000, spend: 6500 },
  { name: "Nov", total: 18000, spend: 8500 },
  { name: "Dec", total: 12000, spend: 8500 },
];

export default function SpendingOverview() {
  return (
 
    <section className="flex h-full w-full flex-col rounded-[12px] border border-[#EDEDED] bg-white p-6 shadow-[0px_1px_2px_0px_#E4E5E73D]">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-[20px] font-medium text-[#0E2038] m-0">Spending Overview</h2>
        <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#EDEDED] text-[14px] text-[#0E2038]">
          <Calendar size={14} className="text-[#7F8482]" />
          Monthly
          <ChevronDown size={14} className="text-[#7F8482]" />
        </button>
      </div>

      {/* Chart */}
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={40} barGap={-40}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#F0F0F0" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: "#7F8482" }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: "#7F8482" }} 
              tickFormatter={(value) => `${value / 1000}k`}
            />
            
            {/* ড্যাশড রেফারেন্স লাইন */}
            <ReferenceLine y={12000} stroke="#F74608" strokeDasharray="5 5" strokeWidth={1} />
            
            {/* ব্যাকগ্রাউন্ড গ্রে বার */}
            <Bar dataKey="total" fill="#F6F6F6" radius={[6, 6, 6, 6]} />
            
            {/* মূল অ্যাড স্পেন্ড বার */}
            <Bar dataKey="spend" fill="#F74608" radius={[6, 6, 6, 6]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}