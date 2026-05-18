import type { MetricCardData } from "@/lib/types";

const toneMap: Record<MetricCardData["tone"], string> = {
  cyan: "text-cyan border-cyan/20 bg-cyan/[0.12]",
  lime: "text-lime border-lime/20 bg-lime/[0.12]",
  coral: "text-coral border-coral/20 bg-coral/[0.12]",
  gold: "text-gold border-gold/20 bg-gold/[0.12]",
};

export function MetricRibbon({ items }: { items: MetricCardData[] }) {
  return (
    <section className="grid gap-4 lg:grid-cols-4">
      {items.map((item) => (
        <article key={item.label} className="window-panel p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/[0.4]">
                {item.label}
              </p>
              <p className="mt-4 text-4xl font-semibold tracking-display text-white">{item.value}</p>
            </div>
            <span className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${toneMap[item.tone]}`}>
              Live
            </span>
          </div>
          <div className="mt-6 h-[5px] overflow-hidden rounded-full bg-white/[0.06]">
            <div className="metric-strip h-full w-2/3 rounded-full" />
          </div>
          <p className="mt-4 text-sm text-white/[0.58]">{item.detail}</p>
        </article>
      ))}
    </section>
  );
}
