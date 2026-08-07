import type { Project } from "@/types/project";

import { ProjectCard } from "./project-card";

export function ProjectIndex({ projects }: { projects: Project[] }) {
  return (
    <section className="work-section" id="work" aria-labelledby="work-title">
      <div className="section-heading">
        <p className="eyebrow">02 / Selected work</p>
        <div>
          <h2 id="work-title">
            A few things
            <br />
            I've built.
          </h2>
          <p className="section-intro">
            Small frontend projects, made with care for the interface and the
            people using it.
          </p>
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
