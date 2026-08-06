"use client";

import { useEffect, useRef } from "react";

import { articleLines, getScrollProgress } from "@/lib/portfolio";

export function ArticleSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const lines = Array.from(section.querySelectorAll<HTMLElement>("[data-article-line]"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const updateProgress = () => {
      lines.forEach((line) => {
        const progress = reducedMotion
          ? 1
          : getScrollProgress(line.getBoundingClientRect().top, window.innerHeight);
        line.style.setProperty("--article-progress", `${progress * 100}%`);
      });
    };

    let frame: number | null = null;
    const handleScroll = () => {
      if (frame !== null) return;
      frame = window.requestAnimationFrame(() => {
        frame = null;
        updateProgress();
      });
    };

    updateProgress();
    if (reducedMotion) return;

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="article-section" ref={sectionRef} aria-labelledby="article-title">
      <p className="eyebrow">02 / A short introduction</p>
      <h2 id="article-title" className="sr-only">
        A short introduction
      </h2>
      <div className="article-copy flex flex-col items-center">
        {articleLines.map((line) => (
          <p
            className={`text-center article-line article-line-${line.emphasis}`}
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
