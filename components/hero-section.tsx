import Image from "next/image";

export function HeroSection() {
  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="eyebrow-row">
        <p className="eyebrow">Frontend developer / Bangkok</p>
        <p className="eyebrow eyebrow-muted">Scroll to explore ↓</p>
      </div>

      <div className="hero-content">
        <div className="hero-copy-column">
          <h1 id="hero-title">
            I build the web
            <br />
            <em>with intention.</em>
          </h1>

          <div className="hero-supporting-copy">
            <p>
              I&apos;m Suphawit, a frontend developer who turns thoughtful design into
              responsive, useful interfaces.
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
          <span className="hero-portrait-label">Frontend developer / Suphawit ↗</span>
        </div>
      </div>

      <div className="hero-footer">
        <span>01 — 05</span>
        <span>Design / Code / Detail</span>
      </div>
    </section>
  );
}
