"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import { fadeUp, fadeScale } from "@/config/motion";
import { FEATURED_PROJECT } from "@/data/projects";

export default function HeroContent() {
  return (
    <>
      {/* ── Left column ── text content ── */}
      <div>
        {/* ── Headline ── */}
        <motion.h1
          className="max-w-[12ch] text-7xl leading-[1.05] font-bold tracking-[-0.04em] text-foreground"
          {...fadeUp(0)}
        >
          Crafting digital products
          <br />
          through thoughtful engineering.
        </motion.h1>

        {/* ── Description ── */}
        <motion.p
          className="mt-8 max-w-[620px] text-lg leading-relaxed text-muted-foreground"
          {...fadeUp(0.1)}
        >
          I&apos;m Suphawit, a software engineer passionate about building
          thoughtful digital experiences with clean code, strong design, and
          scalable systems.
        </motion.p>

        {/* ── CTA buttons ── */}
        <motion.div className="mt-12 flex items-center gap-4" {...fadeUp(0.2)}>
          <Button href="/work">View Work</Button>
          <Button href="/connect" variant="secondary">
            Contact
          </Button>
        </motion.div>
      </div>

      {/* ── Right column ── project preview card ── */}
      <motion.div {...fadeScale}>
        <Link
          href={FEATURED_PROJECT.href}
          className="group block rounded-2xl border border-border bg-card p-8 transition-all duration-200 ease-out hover:-translate-y-1"
        >
          {/* ── Project label ── */}
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Featured Project
          </p>

          {/* ── Title ── */}
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground">
            {FEATURED_PROJECT.title}
          </h2>

          {/* ── Subtitle ── */}
          <p className="mt-2 text-base leading-relaxed text-muted-foreground">
            {FEATURED_PROJECT.subtitle}
          </p>

          {/* ── Technologies ── */}
          <div className="mt-6 flex flex-wrap gap-2">
            {FEATURED_PROJECT.technologies.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>
        </Link>
      </motion.div>
    </>
  );
}
