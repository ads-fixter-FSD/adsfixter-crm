"use client";

import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  type TooltipProps,
} from "recharts";
import type { GrowthTrendPoint } from "@/types/adsPerformance";

const REACH_COLOR = "#16A34A";
const CTR_COLOR = "#F74608";

function CustomTooltip({ active, payload }: TooltipProps<number, string> & { payload?: Array<{ payload: GrowthTrendPoint }> }) {
  if (!active || !payload || payload.length === 0) return null;

  const point = payload[0].payload as GrowthTrendPoint;

  return (
    <div
      className="rounded-[var(--btn-radius)] border border-[var(--color-line)] bg-white px-4 py-3"
      style={{ boxShadow: "0px 8px 24px 0px rgba(0,0,0,0.1)" }}
    >
      <p className="body-xsm-medium subtext-500 mb-2 uppercase tracking-wide">
        {point.dateRangeLabel}
      </p>
      <div className="flex items-center justify-between gap-6">
        <span className="body-sm-regular subtext-500">Reach</span>
        <span className="body-sm-medium" style={{ color: REACH_COLOR }}>
          {point.reach >= 1000
            ? `${(point.reach / 1000).toFixed(0)}K`
            : point.reach}
        </span>
      </div>
      <div className="flex items-center justify-between gap-6">
        <span className="body-sm-regular subtext-500">CTR</span>
        <span className="body-sm-medium" style={{ color: CTR_COLOR }}>
          {point.ctr.toFixed(1)}%
        </span>
      </div>
    </div>
  );
}

interface GrowthTrendsChartProps {
  data: GrowthTrendPoint[];
}

export default function GrowthTrendsChart({ data }: GrowthTrendsChartProps) {
  return (
    <div className="rounded-xl border border-[var(--color-line)] bg-white p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="title-medium primary-text">Growth Trends</h3>
        <div className="flex items-center gap-4 body-xsm-medium subtext-500">
          <span className="flex items-center gap-1.5">
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: REACH_COLOR }}
            />
            Reach
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: CTR_COLOR }}
            />
            CTR
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between body-xsm-regular subtext-400">
        <span>Reach</span>
        <span>CTR</span>
      </div>

      <div className="mt-1" style={{ width: "100%", height: 280 }}>
        <ResponsiveContainer>
          <ComposedChart
            data={data}
            margin={{ top: 10, right: 8, left: 8, bottom: 0 }}
          >
            <CartesianGrid
              vertical
              horizontal={false}
              stroke="var(--color-line)"
              strokeDasharray="4 4"
            />
            <XAxis
              dataKey="week"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: "var(--color-subtext-400)" }}
              dy={10}
            />
            <YAxis
              yAxisId="reach"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: "var(--color-subtext-400)" }}
              tickFormatter={(v) => (v >= 1000 ? `${v / 1000}K` : `${v}`)}
            />
            <YAxis
              yAxisId="ctr"
              orientation="right"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: "var(--color-subtext-400)" }}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              yAxisId="reach"
              type="monotone"
              dataKey="reach"
              stroke={REACH_COLOR}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
            <Line
              yAxisId="ctr"
              type="monotone"
              dataKey="ctr"
              stroke={CTR_COLOR}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
