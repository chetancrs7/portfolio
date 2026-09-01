# Navigation

Global navigation is configured in `src/config/navigation.ts`.

Primary routes:

- Work: `/work`
- Experience: `/experience`
- About: `/about`
- Contact: `/contact`

Secondary shell actions are configured separately from primary navigation:

- GitHub opens the configured repository/profile URL in a new tab.
- Resume is currently a safe placeholder because no resume PDF is available yet.

Active states use prefix matching for nested routes, so future URLs such as `/work/project-name` will keep Work active.

Desktop navigation renders as a compact floating pill. Mobile navigation uses the existing shadcn Sheet primitive and keeps interactive behavior inside `MobileNav`.
