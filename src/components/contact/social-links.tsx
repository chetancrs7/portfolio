import { ArrowUpRight } from "lucide-react";

import { getVisibleSocialProfiles } from "@/config/site";
import { cn } from "@/lib/utils";

type SocialLinksProps = {
  className?: string;
};

/** Professional profile links, sourced from siteConfig.socialProfiles. */
export function SocialLinks({ className }: SocialLinksProps) {
  const profiles = getVisibleSocialProfiles();

  if (profiles.length === 0) {
    return null;
  }

  return (
    <div className={cn("grid gap-4 sm:grid-cols-2", className)}>
      {profiles.map((profile) => (
        <a
          className="group border-border bg-card/55 hover:border-border-strong focus-visible:ring-ring/45 flex items-start justify-between gap-4 rounded-2xl border p-5 transition-colors outline-none focus-visible:ring-3"
          href={profile.href}
          key={profile.key}
          rel="noopener noreferrer"
          target="_blank"
        >
          <div className="min-w-0">
            <p className="text-foreground group-hover:text-accent-cyan font-medium transition-colors">
              {profile.label}
            </p>
            <p className="type-body-sm text-muted-foreground mt-1">
              {profile.description}
            </p>
          </div>
          <ArrowUpRight
            aria-hidden="true"
            className="text-muted-foreground group-hover:text-accent-cyan size-4 shrink-0 transition-colors"
          />
        </a>
      ))}
    </div>
  );
}
