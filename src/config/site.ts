export const siteConfig = {
  name: "Chetan Rao Sonoo",
  title: "Chetan Rao Sonoo — Backend & AI/ML Engineer",
  description:
    "Backend and AI/ML engineering portfolio featuring technical projects, system design, research and engineering writing.",
  // Configurable via NEXT_PUBLIC_SITE_URL; falls back to a safe placeholder so
  // the build never depends on a hardcoded production domain.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com").replace(
    /\/$/,
    "",
  ),
  author: {
    name: "Chetan Rao Sonoo",
    email: "karancrs.7@gmail.com",
  },
  links: {
    github: "https://github.com/chetancrs7",
    linkedin: "https://www.linkedin.com/in/chetanrsk",
    email: "mailto:karancrs.7@gmail.com",
    resume: "/resume.pdf",
  },
  // Links still pointing at placeholders are hidden in the UI until real values
  // are supplied (see isPlaceholderLink in src/config/site helpers usage).
  placeholders: {
    resume: false,
    linkedin: false,
  },
  availability: "Open to backend and AI/ML opportunities",
} as const;

/** True when a link still points at a scaffold placeholder value. */
export function isPlaceholderLink(href: string) {
  return /your-username|example\.com|resume-coming-soon/.test(href);
}

export type SocialProfile = {
  key: "github" | "linkedin";
  label: string;
  href: string;
  description: string;
};

/**
 * Single source of truth for professional profile links. Consumed by the
 * Contact page, About page, and footer. Placeholder links are filtered by
 * `getVisibleSocialProfiles`.
 */
export const socialProfiles: SocialProfile[] = [
  {
    key: "github",
    label: "GitHub",
    href: siteConfig.links.github,
    description: "Source code and engineering projects.",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    href: siteConfig.links.linkedin,
    description: "Professional experience and background.",
  },
];

export function getVisibleSocialProfiles() {
  return socialProfiles.filter((profile) => !isPlaceholderLink(profile.href));
}
