import projectsJson from "../data/projects.json" with { type: "json" };
import type { Project } from "../types/project";

const projects = projectsJson as Project[];

export function getProjects(): Project[] {
  return projects;
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
