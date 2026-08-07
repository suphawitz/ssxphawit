import Image from "next/image";

import { articleLines, getToolIconRows, toolIcons } from "@/lib/portfolio";

export function ArticleSection() {
  const rows = getToolIconRows(toolIcons);

  return (
    <section className="article-section tool-section" aria-labelledby="article-title">
      <div className="tool-section-heading">
        <div>
          <p className="eyebrow">02 / Tools I use</p>
          <h2 id="article-title">
            A small toolkit
            <br />
            <em>for thoughtful work.</em>
          </h2>
        </div>
        <p className="tool-section-intro">
          {articleLines.map((line) => line.text).join(" ")}
        </p>
      </div>

      <div className="tool-icon-marquee" aria-label="Tools and technologies">
        {rows.map((row, rowIndex) => (
          <div
            className={`tool-icon-row tool-icon-${row.direction}`}
            key={`${row.direction}-${rowIndex}`}
          >
            <div className="tool-icon-track">
              {row.items.map((tool, itemIndex) => (
                <div className="tool-icon-card" key={`${tool.name}-${itemIndex}`}>
                  <Image src={tool.src} alt={tool.alt} width={64} height={64} />
                  <span>{tool.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
