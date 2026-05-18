"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { TimelinePoint } from "@/lib/types";

export function UpdateActivityChart({ data }: { data: TimelinePoint[] }) {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
          <defs>
            <linearGradient id="timelineFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor="#51d9ff" stopOpacity={0.7} />
              <stop offset="95%" stopColor="#51d9ff" stopOpacity={0.04} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
          <XAxis dataKey="label" tick={{ fill: "rgba(237,242,255,0.54)", fontSize: 12 }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fill: "rgba(237,242,255,0.5)", fontSize: 12 }} tickLine={false} axisLine={false} allowDecimals={false} />
          <Tooltip
            contentStyle={{
              background: "#12172a",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16,
              color: "#edf2ff",
            }}
          />
          <Area
            type="monotone"
            dataKey="updated"
            stroke="#51d9ff"
            strokeWidth={2.5}
            fill="url(#timelineFill)"
            isAnimationActive
            animationDuration={1100}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
