export type SourceType = "github" | "mock";
export type RangeKey = "30d" | "90d" | "1y";
export type MetricKey = "stars" | "forks" | "issues";

export type DashboardRepo = {
  id: number;
  name: string;
  fullName: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  openIssues: number;
  watchers: number;
  size: number;
  archived: boolean;
  updatedAt: string;
  htmlUrl: string;
};

export type DashboardProfile = {
  login: string;
  name: string;
  avatarUrl: string;
  bio: string;
  followers: number;
  following: number;
  publicRepos: number;
  htmlUrl: string;
};

export type DashboardPayload = {
  source: SourceType;
  profile: DashboardProfile;
  repos: DashboardRepo[];
  generatedAt: string;
  fallbackReason?: string;
};

export type MetricCardData = {
  label: string;
  value: string;
  detail: string;
  tone: "cyan" | "lime" | "coral" | "gold";
};

export type LanguageSlice = {
  name: string;
  value: number;
  share: number;
};

export type TimelinePoint = {
  label: string;
  updated: number;
};

export type RepoMetricPoint = {
  name: string;
  stars: number;
  forks: number;
  issues: number;
};
