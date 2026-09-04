import { siteConfig } from "@/config/site";

export const mainNavigation = [
  { label: "Work", href: "/work" },
  { label: "Writing", href: "/writing" },
  { label: "Experience", href: "/experience" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const shellActions = [
  {
    label: "GitHub",
    href: siteConfig.links.github,
    external: true,
    placeholder: false,
  },
  {
    label: "Resume",
    href: siteConfig.links.resume,
    external: false,
    placeholder: siteConfig.placeholders.resume,
  },
] as const;

export const footerLinks = [
  { label: "GitHub", href: siteConfig.links.github, external: true },
  { label: "LinkedIn", href: siteConfig.links.linkedin, external: true },
  { label: "Email", href: siteConfig.links.email, external: false },
] as const;

export function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}
