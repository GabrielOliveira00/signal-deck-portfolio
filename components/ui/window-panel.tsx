import { ReactNode } from "react";

type WindowPanelProps = {
  title: string;
  label: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function WindowPanel({ title, label, actions, children, className = "" }: WindowPanelProps) {
  return (
    <section className={`window-panel animate-rise ${className}`}>
      <div className="window-header">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/[0.42]">{label}</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-display text-white">{title}</h2>
        </div>
        <div className="flex items-center gap-4">
          {actions}
          <div className="window-dots">
            <span className="bg-coral" />
            <span className="bg-gold" />
            <span className="bg-lime" />
          </div>
        </div>
      </div>
      <div className="p-5 sm:p-6">{children}</div>
    </section>
  );
}
