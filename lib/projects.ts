import projectsJson from "../data/projects.json" with { type: "json" };
import type { Project, ProjectImage } from "../types/project";

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

export function getProjectGallery(project: Pick<Project, "image" | "imageAlt" | "coverImage" | "gallery">): ProjectImage[] {
  const coverSource = project.coverImage ?? project.image;
  const gallery = project.gallery ?? [];
  const cover = gallery.find((image) => image.src === coverSource) ?? {
    src: coverSource,
    alt: project.imageAlt,
  };

  return [cover, ...gallery.filter((image) => image.src !== coverSource)];
}
