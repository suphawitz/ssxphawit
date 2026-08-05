"use client";

import { useEffect, useRef } from "react";

import { articleLines } from "@/lib/portfolio";

export function ArticleSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !("IntersectionObserver" in window)) return;

    const lines = Array.from(section.querySelectorAll<HTMLElement>("[data-article-line]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.visible = "true";
          }
        });
      },
      { rootMargin: "-12% 0px -12% 0px", threshold: 0.2 },
    );

    lines.forEach((line) => observer.observe(line));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="article-section" ref={sectionRef} aria-labelledby="article-title">
      <p className="eyebrow">02 / A short introduction</p>
      <h2 id="article-title" className="sr-only">
        A short introduction
      </h2>
      <div className="article-copy">
        {articleLines.map((line) => (
          <p
            className={`article-line article-line-${line.emphasis}`}
            data-article-line
            key={line.text}
          >
            {line.text}
          </p>
        ))}
      </div>
    </section>
  );
}
