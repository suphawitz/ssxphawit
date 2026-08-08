"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { getNearestExperienceId } from "@/lib/experience";
import type { Experience } from "@/types/experience";

export function ExperienceSection({ experiences }: { experiences: Experience[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const detailRef = useRef<HTMLElement>(null);
  const roleRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [activeId, setActiveId] = useState(experiences[0]?.id ?? "");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || experiences.length === 0) return;

    let frame = 0;
    const updateActiveChapter = () => {
      const positions = Object.values(roleRefs.current)
        .filter((role): role is HTMLButtonElement => role !== null)
        .map((role) => {
          const rect = role.getBoundingClientRect();

          return {
            id: role.dataset.experienceId ?? "",
            center: rect.top + rect.height / 2,
          };
        })
        .filter((position) => position.id);

      const nearestId = getNearestExperienceId(positions, window.innerHeight * 0.45);
      if (nearestId) setActiveId(nearestId);
      frame = 0;
    };

    const handleScroll = () => {
      if (frame === 0) frame = window.requestAnimationFrame(updateActiveChapter);
    };

    updateActiveChapter();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [experiences.length]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let frame = 0;
    const updateProgress = () => {
      const bounds = section.getBoundingClientRect();
      const nextProgress = (window.innerHeight - bounds.top) / (bounds.height + window.innerHeight);
      const clampedProgress = Math.min(1, Math.max(0, nextProgress));

      setProgress(Number(clampedProgress.toFixed(3)));
      frame = 0;
    };

    const handleScroll = () => {
      if (frame === 0) frame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  if (experiences.length === 0) return null;

  const activeExperience = experiences.find((experience) => experience.id === activeId) ?? experiences[0];
  const activeIndex = experiences.findIndex((experience) => experience.id === activeExperience.id);
  const sectionStyle = { "--experience-progress": progress } as CSSProperties;

  const selectExperience = (experience: Experience) => {
    setActiveId(experience.id);
    window.requestAnimationFrame(() => detailRef.current?.focus({ preventScroll: true }));
  };

  return (
    <section
      ref={sectionRef}
      className="experience-section"
      id="experience"
      aria-labelledby="experience-title"
      style={sectionStyle}
    >
      <div className="section-heading experience-heading">
        <p className="eyebrow">03 / Experience</p>
        <div>
          <h2 id="experience-title">
            How I
            <br />
            <em>show up.</em>
          </h2>
          <p className="section-intro">
            A few chapters, the work behind them, and the way I keep getting better.
          </p>
        </div>
      </div>

      <div className="experience-layout">
        <div className="experience-role-column">
          <p className="experience-column-label">Selected chapters</p>
          <div className="experience-role-list" role="list" aria-label="Experience chapters">
            {experiences.map((experience, index) => {
              const isActive = experience.id === activeExperience.id;

              return (
                <div key={experience.id} role="listitem">
                  <button
                    ref={(element) => {
                      roleRefs.current[experience.id] = element;
                    }}
                    className={`experience-role${isActive ? " is-active" : ""}`}
                    type="button"
                    data-experience-id={experience.id}
                    aria-current={isActive ? "true" : undefined}
                    onClick={() => selectExperience(experience)}
                  >
                    <span className="experience-role-index" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="experience-role-copy">
                      <strong>{experience.title}</strong>
                      <small>{experience.period}</small>
                    </span>
                    <span className="experience-role-arrow" aria-hidden="true"><FontAwesomeIcon icon={faArrowRightLong} /></span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="experience-detail-column">
          <article
            ref={detailRef}
            className="experience-detail-panel"
            tabIndex={-1}
            aria-live="polite"
            aria-label="Selected experience details"
          >
            <div className="experience-detail-content" key={activeExperience.id}>
              <div className="experience-detail-meta">
                <span>0{activeIndex + 1} / Current chapter</span>
                <span>{activeExperience.period}</span>
              </div>
              <p className="experience-detail-context">{activeExperience.context}</p>
              <h3>{activeExperience.title}</h3>
              <p className="experience-detail-description">{activeExperience.description}</p>
              <div className="experience-contributions" aria-label="Contributions">
                {activeExperience.contributions.map((contribution) => (
                  <span key={contribution}>{contribution}</span>
                ))}
              </div>
            </div>

            <div className="experience-progress-wrap">
              <div className="experience-progress" aria-hidden="true">
                <span className="experience-progress-fill" />
              </div>
              <span>Scroll to move through chapters</span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
