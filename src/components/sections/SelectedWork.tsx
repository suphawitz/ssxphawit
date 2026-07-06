import Link from "next/link";
import Container from "../ui/Container";
import ProjectCard from "../project/ProjectCard";
import { PROJECTS } from "@/data/projects";

export default function SelectedWork() {
  return (
    /* ── Section wrapper ── */
    <Container as="section" className="py-24">
      {/* ── Header ── */}
      <div className="mb-12 max-w-xl">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Selected Work
        </h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          A curated collection of projects that reflect my approach to building
          thoughtful, well-engineered digital products.
        </p>
      </div>

      {/* ── Project grid ── */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.href} {...project} />
        ))}
      </div>

      {/* ── View all link ── */}
      <div className="mt-12">
        <Link
          href="/work"
          className="text-sm font-medium text-muted-foreground transition-all duration-200 ease-out hover:-translate-y-px hover:text-foreground"
        >
          View all projects →
        </Link>
      </div>
    </Container>
  );
}
