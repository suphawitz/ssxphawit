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
        <div>
          <div>
            <h2 id="work-title">
              A few things
              <br />
              <em>I've built.</em>
            </h2>
            <p className="section-intro">
              Small frontend projects, made with care for the interface and the
              people using it.
            </p>
          </div>
        </div>
      </div>

      <div className="project-grid">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {showAllLink ? (
      
      <div className="flex items-center justify-center mt-12">
        <Link className="all-work-link" href="/work">
          View all work <span aria-hidden="true">↗</span>
        </Link>
      </div>
      ) : null}
    </section>
  );
}
