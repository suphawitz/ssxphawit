import Image from "next/image";
import Link from "next/link";

import type { Project } from "@/types/project";

export function ProjectDetail({ project }: { project: Project }) {
  return (
    <main className="project-detail-page">
      <div className="project-detail-topline">
        <Link className="back-link" href="/#work">
          ← Back to selected work
        </Link>
        <span className="eyebrow">{project.category}</span>
      </div>

      <header className="project-detail-header">
        <div>
          <p className="eyebrow">
            {project.year} / {project.role}
          </p>
          <h1>{project.title}</h1>
        </div>
        <p className="project-detail-summary">{project.summary}</p>
      </header>

      <div className="project-detail-visual">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          priority
          sizes="(max-width: 900px) 100vw, 92vw"
        />
      </div>

      <div className="project-detail-context">
        <div>
          <p className="eyebrow">The project</p>
          <p className="project-detail-description">{project.description}</p>
        </div>
        <div>
          <p className="eyebrow">Built with</p>
          <ul className="detail-tags">
            {project.technologies.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
        </div>
      </div>

      <section className="highlight-section" aria-labelledby="highlight-title">
        <div>
          <p className="eyebrow">The details</p>
          <h2 id="highlight-title">What I focused on.</h2>
        </div>
        <div className="highlight-list">
          {project.highlights.map((highlight) => (
            <article className="highlight-item" key={highlight.label}>
              <p className="highlight-label">{highlight.label}</p>
              <p>{highlight.body}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="project-links">
        <a href={project.liveUrl} target="_blank" rel="noreferrer">
          Visit live project ↗
        </a>
        <a href={project.repositoryUrl} target="_blank" rel="noreferrer">
          View repository ↗
        </a>
      </div>

      <Link className="next-work-link" href="/#work">
        Back to all work <span aria-hidden="true">↓</span>
      </Link>
    </main>
  );
}
