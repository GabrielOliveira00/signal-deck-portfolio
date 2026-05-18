import type {
  DashboardPayload,
  DashboardRepo,
  LanguageSlice,
  MetricCardData,
  MetricKey,
  RangeKey,
  RepoMetricPoint,
  TimelinePoint,
} from "@/lib/types";

function formatCompact(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function daysBetween(dateA: Date, dateB: Date) {
  return Math.round((dateA.getTime() - dateB.getTime()) / (1000 * 60 * 60 * 24));
}

export function buildMetricCards(payload: DashboardPayload): MetricCardData[] {
  const totalStars = payload.repos.reduce((sum, repo) => sum + repo.stars, 0);
  const totalForks = payload.repos.reduce((sum, repo) => sum + repo.forks, 0);
  const activeRepos = payload.repos.filter((repo) => daysBetween(new Date(), new Date(repo.updatedAt)) <= 30).length;
  const openIssues = payload.repos.reduce((sum, repo) => sum + repo.openIssues, 0);

  return [
    {
      label: "Total stars",
      value: formatCompact(totalStars),
      detail: `${payload.repos.length} public repos in scope`,
      tone: "cyan",
    },
    {
      label: "Followers",
      value: formatCompact(payload.profile.followers),
      detail: `${payload.profile.following} following`,
      tone: "lime",
    },
    {
      label: "Active repos",
      value: String(activeRepos),
      detail: "Updated within the last 30 days",
      tone: "gold",
    },
    {
      label: "Open issues",
      value: formatCompact(openIssues),
      detail: `${formatCompact(totalForks)} forks across the portfolio`,
      tone: "coral",
    },
  ];
}

export function buildLanguageSlices(repos: DashboardRepo[]): LanguageSlice[] {
  const aggregate = repos.reduce<Record<string, number>>((acc, repo) => {
    const key = repo.language || "Unknown";
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});

  const total = Object.values(aggregate).reduce((sum, count) => sum + count, 0);

  return Object.entries(aggregate)
    .map(([name, value]) => ({
      name,
      value,
      share: total === 0 ? 0 : Math.round((value / total) * 100),
    }))
    .sort((left, right) => right.value - left.value)
    .slice(0, 6);
}

export function buildTimeline(repos: DashboardRepo[], range: RangeKey): TimelinePoint[] {
  const totalDays = range === "30d" ? 30 : range === "90d" ? 90 : 365;
  const bucketCount = 6;
  const bucketSpan = Math.floor(totalDays / bucketCount);
  const now = new Date();

  return Array.from({ length: bucketCount }, (_, index) => {
    const upper = totalDays - bucketSpan * index;
    const lower = upper - bucketSpan;

    const updated = repos.filter((repo) => {
      const distance = daysBetween(now, new Date(repo.updatedAt));
      return distance <= upper && distance > lower;
    }).length;

    return {
      label: `${Math.max(0, lower)}-${upper}d`,
      updated,
    };
  }).reverse();
}

export function buildRepoMetricPoints(repos: DashboardRepo[], metric: MetricKey): RepoMetricPoint[] {
  const sorted = [...repos].sort((left, right) => {
    if (metric === "stars") {
      return right.stars - left.stars;
    }

    if (metric === "forks") {
      return right.forks - left.forks;
    }

    return right.openIssues - left.openIssues;
  });

  return sorted.slice(0, 6).map((repo) => ({
    name: repo.name,
    stars: repo.stars,
    forks: repo.forks,
    issues: repo.openIssues,
  }));
}

export function buildInsightNotes(payload: DashboardPayload, range: RangeKey, metric: MetricKey) {
  const totalStars = payload.repos.reduce((sum, repo) => sum + repo.stars, 0);
  const activeRepos = payload.repos.filter((repo) => daysBetween(new Date(), new Date(repo.updatedAt)) <= 30).length;
  const languageLeader = buildLanguageSlices(payload.repos)[0];

  return [
    `${payload.profile.name || payload.profile.login} is being read through ${payload.source === "github" ? "live GitHub data" : "a curated fallback dataset"}.`,
    `${activeRepos} repos changed inside the last 30 days, which suggests a ${activeRepos >= 4 ? "healthy operational rhythm" : "more concentrated release cadence"}.`,
    `${languageLeader?.name ?? "Unknown"} leads the language mix, while the current comparison view is focused on ${metric}.`,
    `The visible timeline is scoped to ${range}, so chart motion and repository ranking update whenever the operator changes the time horizon.`,
    `Total star volume currently sits around ${formatCompact(totalStars)}, which helps anchor the broader signal around repository impact.`,
  ];
}
