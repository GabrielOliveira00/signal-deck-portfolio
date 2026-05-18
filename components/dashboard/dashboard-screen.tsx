"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { Sparkles } from "lucide-react";
import { GithubSearch } from "@/components/dashboard/github-search";
import { LanguageDonutChart } from "@/components/dashboard/language-donut-chart";
import { MetricRibbon } from "@/components/dashboard/metric-ribbon";
import { ProfileWindow } from "@/components/dashboard/profile-window";
import { RepoPerformanceChart } from "@/components/dashboard/repo-performance-chart";
import { RepoTable } from "@/components/dashboard/repo-table";
import { UpdateActivityChart } from "@/components/dashboard/update-activity-chart";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { WindowPanel } from "@/components/ui/window-panel";
import { buildInsightNotes, buildLanguageSlices, buildMetricCards, buildRepoMetricPoints, buildTimeline } from "@/lib/github-analytics";
import { mockPayload } from "@/lib/mock-data";
import type { DashboardPayload, DashboardRepo, MetricKey, RangeKey } from "@/lib/types";

const rangeOptions: { label: string; value: RangeKey }[] = [
  { label: "30 days", value: "30d" },
  { label: "90 days", value: "90d" },
  { label: "1 year", value: "1y" },
];

const metricOptions: { label: string; value: MetricKey }[] = [
  { label: "Stars", value: "stars" },
  { label: "Forks", value: "forks" },
  { label: "Issues", value: "issues" },
];

type GithubUser = {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  followers: number;
  following: number;
  public_repos: number;
  html_url: string;
};

type GithubRepo = {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  watchers_count: number;
  size: number;
  archived: boolean;
  updated_at: string;
  html_url: string;
};

function mapRepo(repo: GithubRepo): DashboardRepo {
  return {
    id: repo.id,
    name: repo.name,
    fullName: repo.full_name,
    description: repo.description ?? "",
    language: repo.language ?? "Unknown",
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    openIssues: repo.open_issues_count,
    watchers: repo.watchers_count,
    size: repo.size,
    archived: repo.archived,
    updatedAt: repo.updated_at,
    htmlUrl: repo.html_url,
  };
}

async function loadDashboard(username: string): Promise<DashboardPayload> {
  const headers = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  try {
    const [userResponse, reposResponse] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, { headers }),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, { headers }),
    ]);

    if (!userResponse.ok || !reposResponse.ok) {
      return {
        ...mockPayload,
        generatedAt: new Date().toISOString(),
        fallbackReason: `GitHub API did not respond successfully for ${username}.`,
      };
    }

    const [user, repos] = (await Promise.all([
      userResponse.json(),
      reposResponse.json(),
    ])) as [GithubUser, GithubRepo[]];

    return {
      source: "github",
      generatedAt: new Date().toISOString(),
      profile: {
        login: user.login,
        name: user.name ?? user.login,
        avatarUrl: user.avatar_url,
        bio: user.bio ?? "",
        followers: user.followers,
        following: user.following,
        publicRepos: user.public_repos,
        htmlUrl: user.html_url,
      },
      repos: repos
        .filter((repo) => !repo.archived)
        .map(mapRepo)
        .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt)),
    };
  } catch {
    return {
      ...mockPayload,
      generatedAt: new Date().toISOString(),
      fallbackReason: `Network or parsing error while reading ${username}.`,
    };
  }
}

export function DashboardScreen() {
  const [range, setRange] = useState<RangeKey>("90d");
  const [metric, setMetric] = useState<MetricKey>("stars");
  const [username, setUsername] = useState("vercel");
  const [payload, setPayload] = useState<DashboardPayload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  async function runLookup(nextUsername: string) {
    try {
      setLoading(true);
      setError(null);
      const data = await loadDashboard(nextUsername);

      startTransition(() => {
        setPayload(data);
        setUsername(nextUsername);
      });
    } catch {
      setError("The dashboard could not read that profile right now.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void runLookup("vercel");
  }, []);

  const metricCards = useMemo(() => (payload ? buildMetricCards(payload) : []), [payload]);
  const languageData = useMemo(() => (payload ? buildLanguageSlices(payload.repos) : []), [payload]);
  const timelineData = useMemo(() => (payload ? buildTimeline(payload.repos, range) : []), [payload, range]);
  const repoMetricData = useMemo(() => (payload ? buildRepoMetricPoints(payload.repos, metric) : []), [payload, metric]);
  const insightNotes = useMemo(() => (payload ? buildInsightNotes(payload, range, metric) : []), [payload, range, metric]);

  return (
    <main className="shell pb-10 pt-6">
      <div className="grid gap-6">
        <GithubSearch
          value={username}
          loading={loading || isPending}
          source={payload?.source ?? null}
          onSubmit={runLookup}
          onRefresh={() => runLookup(username)}
        />

        {payload ? <MetricRibbon items={metricCards} /> : null}

        {error ? (
          <div className="window-panel p-5 text-sm text-coral">{error}</div>
        ) : null}

        {payload ? (
          <section className="grid gap-6 xl:grid-cols-[1.02fr_0.98fr]">
            <WindowPanel
              title="Repository update cadence"
              label="Timeline"
              actions={<SegmentedControl options={rangeOptions} value={range} onChange={setRange} />}
            >
              <UpdateActivityChart data={timelineData} />
            </WindowPanel>

            <ProfileWindow payload={payload} />
          </section>
        ) : null}

        {payload ? (
          <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <WindowPanel title="Language surface" label="Composition">
              <LanguageDonutChart data={languageData} />
            </WindowPanel>

            <WindowPanel
              title="Repository performance"
              label="Comparison"
              actions={<SegmentedControl options={metricOptions} value={metric} onChange={setMetric} />}
            >
              <RepoPerformanceChart data={repoMetricData} metric={metric} />
            </WindowPanel>
          </section>
        ) : null}

        {payload ? (
          <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <WindowPanel title="Top repositories" label="Inventory">
              <RepoTable repos={payload.repos} />
            </WindowPanel>

            <WindowPanel title="Operator notes" label="Interpretation">
              <div className="grid gap-4">
                {insightNotes.map((note) => (
                  <div
                    key={note}
                    className="rounded-[22px] border border-white/10 bg-white/[0.03] px-4 py-4 text-sm leading-7 text-white/[0.64]"
                  >
                    <div className="mb-3 inline-flex items-center gap-2 mr-2 rounded-full border border-cyan/[0.2] bg-cyan/[0.08] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan">
                      <Sparkles className="h-3.5 w-3.5" />
                      Readout
                    </div>
                    {note}
                  </div>
                ))}
              </div>
            </WindowPanel>
          </section>
        ) : null}
      </div>
    </main>
  );
}