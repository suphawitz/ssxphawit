import type { Project, FeaturedProject } from "@/types/project";

/** All projects displayed in the SelectedWork grid. */
export const PROJECTS: Project[] = [
  {
    title: "ERP System",
    description:
      "Enterprise resource planning platform for business management.",
    technologies: ["Laravel", "PHP", "MySQL"],
    href: "/work/erp-system",
  },
  {
    title: "Anonymous",
    description:
      "Anonymous communication platform for university students.",
    technologies: ["Flutter", "Firebase"],
    href: "/work/anonymous",
  },
  {
    title: "Portfolio",
    description: "Minimal portfolio focused on thoughtful engineering.",
    technologies: ["Next.js", "TypeScript"],
    href: "/work/portfolio",
  },
  {
    title: "Telegram Bot",
    description: "Workflow automation using Telegram Bot API.",
    technologies: ["Node.js", "Telegram API"],
    href: "/work/telegram-bot",
  },
];

/** Featured project shown in the hero section. */
export const FEATURED_PROJECT: FeaturedProject = {
  title: "ERP System",
  subtitle: "Enterprise Resource Planning Platform",
  technologies: ["Laravel", "Next.js", "PostgreSQL"],
  href: "/work/erp-system",
};