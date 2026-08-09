import Image from "next/image";
import Link from "next/link";

import type { Project } from "@/types/project";

const accentClasses: Record<Project["accent"], string> = {
  coral: "project-card-coral",
  leaf: "project-card-leaf",
  orange: "project-card-orange",
  blue: "project-card-blue",
  violet: "project-card-violet",
};

export function ProjectCard({ project }: { project: Project }) {
  const accentClass = accentClasses[project.accent] ?? "project-card-coral";

  return (
    <article className={`project-card ${accentClass}`}>
      <Link className="project-card-link" href={`/work/${project.slug}`}>
        <div className="project-visual">
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            sizes="(max-width: 700px) 100vw, 50vw"
            className="project-image"
          />
          <span className="project-index" aria-hidden="true">
            {project.slug.slice(0, 2).toUpperCase()}
          </span>
          <span className="project-view">View project ↗</span>
        </div>

        <div className="project-card-copy">
          <div>
            <div className="project-meta">
              <span>{project.category}</span>
              <span>{project.year}</span>
            </div>
            <h3>{project.title}</h3>
          </div>
          <p className="google-sans">{project.summary}</p>
        </div>

        <ul className="tag-list" aria-label={`${project.title} technologies`}>
          {project.technologies.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
      </Link>
    </article>
  );
}
