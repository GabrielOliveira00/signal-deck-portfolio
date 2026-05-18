import Image from "next/image";
import type { DashboardPayload } from "@/lib/types";

export function ProfileWindow({ payload }: { payload: DashboardPayload }) {
  const { profile, generatedAt, fallbackReason } = payload;

  return (
    <div className="grid gap-5">
      <div className="window-panel p-5">
        <div className="flex items-start gap-4">
          <Image
            src={profile.avatarUrl}
            alt={profile.login}
            width={84}
            height={84}
            className="rounded-[24px] border border-white/10 object-cover"
          />
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/[0.42]">Operator</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-display text-white">
              {profile.name || profile.login}
            </h3>
            <p className="mt-2 text-sm text-white/[0.62]">@{profile.login}</p>
            <p className="mt-4 text-sm leading-7 text-white/[0.58]">{profile.bio || "Public GitHub profile with repository signals and language footprint."}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            ["Repos", profile.publicRepos],
            ["Followers", profile.followers],
            ["Following", profile.following],
          ].map(([label, value]) => (
            <div key={label} className="rounded-[22px] border border-white/10 bg-white/[0.03] px-4 py-4">
              <p className="text-xs uppercase tracking-[0.2em] text-white/[0.38]">{label}</p>
              <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="window-panel p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/[0.4]">Signal status</p>
        <div className="mt-4 rounded-[22px] border border-cyan/[0.18] bg-cyan/[0.08] px-4 py-4">
          <p className="text-sm font-semibold text-cyan">
            {payload.source === "github" ? "Live GitHub stream active" : "Fallback mode active"}
          </p>
          <p className="mt-2 text-sm leading-7 text-white/[0.6]">
            {payload.source === "github"
              ? `Last sync generated at ${new Date(generatedAt).toLocaleString("pt-BR")}.`
              : fallbackReason}
          </p>
        </div>
      </div>
    </div>
  );
}
