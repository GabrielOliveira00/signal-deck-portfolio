import type { DashboardRepo } from "@/lib/types";

export function RepoTable({ repos }: { repos: DashboardRepo[] }) {
  return (
    <div className="overflow-hidden rounded-[24px] border border-white/10">
      <div className="grid grid-cols-[1.3fr_0.7fr_0.45fr_0.45fr_0.45fr] bg-white/[0.03] px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/[0.4]">
        <span>Repository</span>
        <span>Language</span>
        <span>Stars</span>
        <span>Forks</span>
        <span>Issues</span>
      </div>

      <div className="divide-y divide-white/10">
        {repos.slice(0, 6).map((repo) => (
          <a
            key={repo.id}
            href={repo.htmlUrl}
            target="_blank"
            rel="noreferrer"
            className="grid grid-cols-[1.3fr_0.7fr_0.45fr_0.45fr_0.45fr] px-4 py-4 text-sm transition hover:bg-white/[0.03]"
          >
            <div>
              <p className="font-semibold text-white">{repo.name}</p>
              <p className="mt-1 truncate text-white/[0.52]">{repo.description || "No description provided"}</p>
            </div>
            <span className="text-white/[0.62]">{repo.language || "Unknown"}</span>
            <span className="text-white/[0.72]">{repo.stars}</span>
            <span className="text-white/[0.72]">{repo.forks}</span>
            <span className="text-white/[0.72]">{repo.openIssues}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
