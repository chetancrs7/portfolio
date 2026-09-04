export const siteConfig = {
  name: "Chetan Rao Sonoo",
  title: "Chetan Rao Sonoo - Backend & AI/ML Engineer",
  description:
    "Backend and AI/ML engineering portfolio featuring technical projects, system design, research and engineering writing.",
  url: "https://example.com",
  author: {
    name: "Chetan Rao Sonoo",
    email: "hello@example.com",
  },
  links: {
    github: "https://github.com/chetancrs7",
    linkedin: "https://www.linkedin.com/in/your-username",
    email: "mailto:hello@example.com",
    resume: "#resume-coming-soon",
  },
  // Links still pointing at placeholders are hidden in the UI until real values
  // are supplied (see isPlaceholderLink in src/config/site helpers usage).
  placeholders: {
    resume: true,
    linkedin: true,
    email: true,
  },
  availability: "Open to backend and AI/ML opportunities",
} as const;

/** True when a link still points at a scaffold placeholder value. */
export function isPlaceholderLink(href: string) {
  return /your-username|example\.com|resume-coming-soon/.test(href);
}
