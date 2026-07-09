import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceDot,
} from "recharts";

// মক ডাটা (আপনার ডিজাইনের ওয়েভ প্যাটার্ন অনুযায়ী তৈরি)
const data = [
  { name: "Jan", balance: 39000, topUp: 40000 },
  { name: "Feb", balance: 39000, topUp: 42000 },
  { name: "Mar", balance: 29000, topUp: 24000 },
  { name: "Apr", balance: 34000, topUp: 22000 },
  { name: "May", balance: 24000, topUp: 40000 },
  { name: "Jun", balance: 48000, topUp: 36000 },
  { name: "Jul", balance: 28000, topUp: 24000 }, // হাইলাইটেড মাস
  { name: "Aug", balance: 42000, topUp: 32000 },
  { name: "Sep", balance: 30000, topUp: 30000 },
  { name: "Oct", balance: 22000, topUp: 39000 },
  { name: "Nov", balance: 29000, topUp: 28000 },
  { name: "Dec", balance: 26000, topUp: 46000 },
];

// কাস্টম টুলটিপ ডিজাইন (ঠিক আপনার ইমেজের মতো)
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white px-5 py-4 shadow-xl rounded-2xl border border-slate-100 min-w-[180px]">
        <p className="text-[11px] font-bold text-slate-400 tracking-wider uppercase mb-2">
          JULY 17, 2026
        </p>
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 font-medium">Balance (৳)</span>
            <span className="font-bold text-[#f24e1e]">
              ৳{payload[0].value.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 font-medium">Top-up (৳)</span>
            <span className="font-bold text-[#f5a623]">
              ৳{payload[1].value.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default function BalanceTrendChart() {
  return (
    <div className="w-full h-[360px] bg-white mt-6 relative">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 20, right: 10, left: -10, bottom: 0 }}
        >
          <defs>
            {/* লাইন দুটির নিচের শ্যাডো বা গ্রেডিয়েন্ট ইফেক্ট */}
            <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f24e1e" stopOpacity={0.06} />
              <stop offset="95%" stopColor="#f24e1e" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="topUpGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f5a623" stopOpacity={0.04} />
              <stop offset="95%" stopColor="#f5a623" stopOpacity={0} />
            </linearGradient>

            {/* জুলাই মাসের পেছনের কাস্টম হাইলাইট শ্যাডো */}
            <linearGradient id="julHighlight" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f24e1e" stopOpacity={0.1} />
              <stop offset="100%" stopColor="#f24e1e" stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* কাস্টম গ্রিডলাইন */}
          <CartesianGrid
            strokeDasharray="4 4"
            vertical={true}
            horizontal={true}
            stroke="#f1f5f9"
          />

          {/* X Axis */}
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={({ x, y, payload }) => (
              <text
                x={Number(x)}
                y={Number(y) + 16}
                textAnchor="middle"
                className={`text-xs font-medium ${
                  payload.value === "Jul"
                    ? "fill-slate-900 font-bold"
                    : "fill-slate-400"
                }`}
              >
                {payload.value}
              </text>
            )}
          />

          {/* Y Axis */}
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 500 }}
            domain={[10000, 50000]}
            ticks={[10000, 20000, 30000, 40000, 50000]}
            tickFormatter={(value) => `৳${value / 1000}K`}
          />

          {/* ইমেজের মতো নির্দিষ্ট পয়েন্টে ডট মার্কার এড করা */}
          <ReferenceDot
            x="Jul"
            y={28000}
            r={4}
            fill="#f24e1e"
            stroke="#fff"
            strokeWidth={2}
          />
          <ReferenceDot
            x="Jul"
            y={24000}
            r={4}
            fill="#f5a623"
            stroke="#fff"
            strokeWidth={2}
          />

          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: "url(#julHighlight)", strokeWidth: 40 }} // জুলাই সেকশনের কাস্টম থিক কার্সার
            defaultIndex={6} // ডিফল্ট জুলাই মাসের ডাটা ওপেন থাকবে
          />

          {/* Balance Line */}
          <Area
            type="monotone"
            dataKey="balance"
            stroke="#f24e1e"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#balanceGradient)"
            dot={false}
            activeDot={{ r: 5, strokeWidth: 2, stroke: "#fff", fill: "#f24e1e" }}
          />

          {/* Top Up Line */}
          <Area
            type="monotone"
            dataKey="topUp"
            stroke="#f5a623"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#topUpGradient)"
            dot={false}
            activeDot={{ r: 5, strokeWidth: 2, stroke: "#fff", fill: "#f5a623" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}