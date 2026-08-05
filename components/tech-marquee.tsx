import { getTechStackRows, techStack } from "@/lib/portfolio";

export function TechMarquee() {
  const rows = getTechStackRows(techStack);

  return (
    <section className="tech-marquee-section" aria-labelledby="tech-stack-title">
      <div className="tech-marquee-heading">
        <p className="eyebrow" id="tech-stack-title">
          Tools, thinking, and the stack in between
        </p>
        <span className="tech-marquee-note">Hover to pause</span>
      </div>
      <div className="tech-marquee" aria-label="Tech stack">
        {rows.map((row, rowIndex) => (
          <div
            className={`tech-marquee-row tech-marquee-${row.direction}`}
            key={`${row.direction}-${rowIndex}`}
          >
            <div className="tech-marquee-track">
              {row.items.map((technology, itemIndex) => (
                <span className="tech-marquee-item" key={`${technology}-${itemIndex}`}>
                  <span aria-hidden="true">✦</span>
                  {technology}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
