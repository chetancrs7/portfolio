export const siteConfig = {
  name: "Backend + AI/ML Engineering Portfolio",
  description:
    "A modern developer portfolio showcasing backend engineering, AI/ML projects, system design case studies, technical research, and engineering insights.",
  author: {
    name: "Your Name",
    email: "hello@example.com",
  },
  links: {
    github: "https://github.com/your-username",
    linkedin: "https://www.linkedin.com/in/your-username",
    resume: "/documents/resume.pdf",
  },
  navigation: [
    { title: "Home", href: "/" },
    { title: "Work", href: "/work" },
    { title: "Experience", href: "/experience" },
    { title: "About", href: "/about" },
    { title: "Contact", href: "/contact" },
  ],
} as const;
