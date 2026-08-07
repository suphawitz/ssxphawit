import Image from "next/image";

import { getTechStackRows, toolIcons } from "@/lib/portfolio";

const GROUP_REPEAT_COUNT = 3;

export function TechMarquee() {
  const rows = getTechStackRows(toolIcons);

  return (
    <section className="tech-marquee-section" aria-labelledby="tech-stack-title">
      <div className="tech-marquee-heading">
        <p className="eyebrow" id="tech-stack-title">
          Tools, thinking, and the stack in between
        </p>
      </div>
      <div className="tech-marquee" aria-label="Tech stack">
        {rows.map((row, rowIndex) => (
          <div
            className={`tech-marquee-row tech-marquee-${row.direction}`}
            key={`${row.direction}-${rowIndex}`}
          >
            <div className="tech-marquee-track">
              {[false, true].map((isDuplicate) => (
                <div
                  className="tech-marquee-group"
                  aria-hidden={isDuplicate || undefined}
                  key={isDuplicate ? "duplicate" : "original"}
                >
                  {Array.from({ length: GROUP_REPEAT_COUNT }, (_, cycleIndex) =>
                    row.items.map((technology) => (
                      <span
                        className="tech-marquee-item"
                        key={`${technology.name}-${cycleIndex}`}
                      >
                        <Image
                          className="tech-marquee-icon"
                          src={technology.src}
                          alt={
                            isDuplicate || cycleIndex > 0 ? "" : technology.alt
                          }
                          width={128}
                          height={128}
                          sizes="(max-width: 720px) 62px, 90px"
                        />
                      </span>
                    )),
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
