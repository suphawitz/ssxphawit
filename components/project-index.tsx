import Link from "next/link";

import type { Project } from "@/types/project";

import { ProjectCard } from "./project-card";

export function ProjectIndex({
  projects,
  showAllLink = true,
}: {
  projects: Project[];
  showAllLink?: boolean;
}) {
  return (
    <section className="work-section" id="work" aria-labelledby="work-title">
      <div className="section-heading">
        <p className="eyebrow">02 / Selected work</p>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 id="work-title">
              A few things
              <br />
              I&apos;ve built.
            </h2>
            <p className="section-intro">
              Small frontend projects, made with care for the interface and the
              people using it.
            </p>
          </div>
          {showAllLink ? (
            <Link className="all-work-link" href="/work">
              View all work <span aria-hidden="true">↗</span>
            </Link>
          ) : null}
        </div>
      </div>

      <div className="project-grid">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
