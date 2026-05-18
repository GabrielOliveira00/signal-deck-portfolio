"use client";

import { FormEvent, useState } from "react";
import { LoaderCircle, RefreshCcw, Search } from "lucide-react";

const presets = ["vercel", "microsoft", "facebook"];

type GithubSearchProps = {
  value: string;
  loading: boolean;
  source: "github" | "mock" | null;
  onSubmit: (username: string) => void;
  onRefresh: () => void;
};

export function GithubSearch({ value, loading, source, onSubmit, onRefresh }: GithubSearchProps) {
  const [input, setInput] = useState(value);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!input.trim()) {
      return;
    }

    onSubmit(input.trim());
  }

  return (
    <div className="window-panel p-5 sm:p-6">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
        <div className="max-w-2xl">
          <span className="eyebrow">GitHub analytics cockpit</span>
          <h1 className="mt-6 text-4xl font-semibold tracking-display text-white sm:text-5xl lg:text-6xl">
            Read a public GitHub profile through animated repository signals.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-white/[0.64]">
            Search any public account to inspect repo volume, language mix, update cadence and repo
            performance. If the external API is limited, the interface falls back to a curated mock
            dataset so the product still feels alive.
          </p>
        </div>

        <div className="grid gap-4 xl:min-w-[26rem]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex items-center gap-3 rounded-[26px] border border-white/10 bg-white/[0.04] px-4 py-3">
              <Search className="h-4 w-4 text-cyan" />
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Search a public GitHub username"
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/[0.34]"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-cyan px-4 py-2 text-sm font-semibold text-canvas transition hover:translate-y-[-1px]"
              >
                {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : "Run"}
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {presets.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => {
                    setInput(preset);
                    onSubmit(preset);
                  }}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/[0.64] transition hover:border-cyan/[0.3] hover:bg-cyan/[0.08] hover:text-white"
                >
                  {preset}
                </button>
              ))}

              <button
                type="button"
                onClick={onRefresh}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/[0.64] transition hover:border-white/[0.22] hover:text-white"
              >
                <RefreshCcw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </button>
            </div>
          </form>

          <div className="rounded-[24px] border border-white/10 bg-white/[0.04] px-4 py-4 text-sm text-white/[0.64]">
            <span className="font-semibold text-cyan">Source:</span>{" "}
            {source === "github" ? "Live GitHub API data" : source === "mock" ? "Curated fallback dataset" : "Waiting for first query"}
          </div>
        </div>
      </div>
    </div>
  );
}
