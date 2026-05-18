"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { MetricKey, RepoMetricPoint } from "@/lib/types";

const toneMap: Record<MetricKey, string> = {
  stars: "#51d9ff",
  forks: "#ffd76f",
  issues: "#ff8f72",
};

export function RepoPerformanceChart({
  data,
  metric,
}: {
  data: RepoMetricPoint[];
  metric: MetricKey;
}) {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
          <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
          <XAxis dataKey="name" tick={{ fill: "rgba(237,242,255,0.52)", fontSize: 12 }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fill: "rgba(237,242,255,0.5)", fontSize: 12 }} tickLine={false} axisLine={false} allowDecimals={false} />
          <Tooltip
            contentStyle={{
              background: "#12172a",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16,
              color: "#edf2ff",
            }}
          />
          <Bar
            dataKey={metric}
            fill={toneMap[metric]}
            radius={[12, 12, 0, 0]}
            isAnimationActive
            animationDuration={950}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
