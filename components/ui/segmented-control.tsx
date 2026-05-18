"use client";

type SegmentedOption<T extends string> = {
  label: string;
  value: T;
};

type SegmentedControlProps<T extends string> = {
  options: SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
};

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
}: SegmentedControlProps<T>) {
  return (
    <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] p-1">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            value === option.value
              ? "bg-cyan/[0.14] text-white shadow-glow"
              : "text-white/[0.62] hover:bg-white/[0.05] hover:text-white"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
