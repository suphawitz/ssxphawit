import Image from "next/image";
import Link from "next/link";

import type { Project } from "@/types/project";

export function ProjectDetail({ project }: { project: Project }) {
  return (
    <main className="project-detail-page">
      <div className="project-detail-topline mt-12 md:mt-0">
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
        <p className="project-detail-summary google-sans">{project.summary}</p>
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

      <div className="project-links">
        {project.liveUrl && (
          <a href={project.liveUrl} className="border rounded-4xl py-3 px-6" target="_blank" rel="noreferrer">
            Live project ↗
          </a>
        )}

        {project.repositoryUrl && (
          <a href={project.repositoryUrl} className="border rounded-4xl py-3 px-6" target="_blank" rel="noreferrer">
            View repository ↗
          </a>
        )}
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
          <h2 id="highlight-title" className="pb-10">What I focused on.</h2>
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

      

      <Link className="next-work-link" href="/#work">
        Back to all work <span aria-hidden="true">↓</span>
      </Link>
    </main>
  );
}
