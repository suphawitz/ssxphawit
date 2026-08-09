import Image from "next/image";

export function HeroSection() {
  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="eyebrow-row">
        <p className="eyebrow">Frontend developer</p>
        <p className="eyebrow eyebrow-muted">Scroll to explore ↓</p>
      </div>

      <div className="hero-content">
        <div className="hero-copy-column">
          <h1 id="hero-title">
            I build the web
            <em> with intention.</em>
          </h1>

          <div className="hero-supporting-copy pt-4">
            <p>
              Building thoughtful digital experiences that combine engineering, design and human-centered thinking.
            </p>
            <a className="text-link" href="#work">
              See selected work <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        <div className="hero-portrait">
          <Image
            src="/profile.jpg"
            alt="Suphawit by a lake"
            fill
            priority
            sizes="(max-width: 800px) 72vw, 30vw"
          />
          <span className="hero-portrait-label">Suphawit Jaikaewma ↗</span>
        </div>
      </div>

      <div className="hero-footer">
        <span>01 — 04</span>
        <span>Design / Code / Detail</span>
      </div>
    </section>
  );
}
