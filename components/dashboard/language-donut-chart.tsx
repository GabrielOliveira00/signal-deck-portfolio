"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { LanguageSlice } from "@/lib/types";

const palette = ["#51d9ff", "#8b89ff", "#9cff8f", "#ff8f72", "#ffd76f", "#8ea7ff"];

export function LanguageDonutChart({ data }: { data: LanguageSlice[] }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={62}
              outerRadius={104}
              paddingAngle={4}
              isAnimationActive
              animationDuration={1100}
              animationBegin={120}
            >
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={palette[index % palette.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "#12172a",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 16,
                color: "#edf2ff",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid gap-3">
        {data.map((item, index) => (
          <div key={item.name} className="rounded-[22px] border border-white/10 bg-white/[0.03] px-4 py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: palette[index % palette.length] }} />
                <p className="text-sm font-semibold text-white">{item.name}</p>
              </div>
              <p className="text-sm text-white/[0.6]">{item.share}%</p>
            </div>
            <p className="mt-2 text-xs uppercase tracking-[0.18em] text-white/[0.38]">{item.value} repos</p>
          </div>
        ))}
      </div>
    </div>
  );
}
