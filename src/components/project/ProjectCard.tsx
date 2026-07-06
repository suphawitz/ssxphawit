import Link from "next/link";
import Badge from "../ui/Badge";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  href: string;
  featured?: boolean;
}

export default function ProjectCard({
  title,
  description,
  technologies,
  href,
  featured = false,
}: ProjectCardProps) {
  return (
    <Link
      href={href}
      className={[
        /* ── Base ── */
        "group block rounded-[20px] border border-border bg-card p-6",
        /* ── Hover ── */
        "transition-all duration-200 ease-out",
        "hover:-translate-y-1 hover:border-foreground/20 hover:bg-muted/50",
        /* ── Focus ── */
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground",
        /* ── Featured variant ── */
        featured && "lg:p-8",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* ── Title ── */}
      <h3
        className={[
          "font-semibold text-foreground",
          featured ? "text-xl" : "text-lg",
        ].join(" ")}
      >
        {title}
      </h3>

      {/* ── Description ── */}
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>

      {/* ── Technologies ── */}
      <div className="mt-4 flex flex-wrap gap-2" aria-label="Technologies used">
        {technologies.map((tech) => (
          <Badge key={tech}>{tech}</Badge>
        ))}
      </div>
    </Link>
  );
}
