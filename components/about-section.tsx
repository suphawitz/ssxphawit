import Image from "next/image";

import { toolIcons } from "@/lib/portfolio";

export function AboutSection() {
  return (
    <section className="about-section about-bento-section" id="about" aria-labelledby="about-title">
      <div className="bento-section-heading">
        <p className="eyebrow">03 / About me</p>
        <p>Some context, a few tools, and the way I like to work.</p>
      </div>

      <div className="about-bento">
        <article className="about-bento-card about-profile-card">
          <div className="bento-card-topline">
            <span>Suphawit / Frontend Developer</span>
            <span>PH ↗</span>
          </div>
          <div className="about-profile-main">
            <div>
              <h2 id="about-title">
                Detail-minded,
                <br />
                <em>curious by default.</em>
              </h2>
              <p>
                I enjoy the space between a good design and a good experience —
                the small decisions that make a page feel clear, responsive,
                and easy to trust.
              </p>
            </div>
            <div className="about-socials" aria-label="Social links">
              <a href="https://github.com/suphawitz" target="_blank" rel="noreferrer">
                GitHub ↗
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
                LinkedIn ↗
              </a>
              <a href="mailto:hello@phawit.dev">Email ↗</a>
            </div>
          </div>
        </article>

        <article className="about-bento-card about-focus-card">
          <p className="bento-label">Currently exploring</p>
          <h3>
            Interfaces that feel
            <br />
            <em>quietly intuitive.</em>
          </h3>
          <span className="bento-orbit" aria-hidden="true" />
        </article>

        <article className="about-bento-card about-photo-card">
          <Image
            src="/profile.jpg"
            alt="Suphawit by a lake"
            fill
            sizes="(max-width: 800px) 100vw, 25vw"
          />
          <span>Based in Bangkok ↗</span>
        </article>

        <article className="about-bento-card about-practice-card">
          <p className="bento-label">Frontend craft</p>
          <h3>
            Design
            <br />
            <em>to code.</em>
          </h3>
          <p className="bento-card-note">React / Next.js / TypeScript</p>
        </article>

        <a className="about-bento-card about-resume-card" href="/resume.pdf">
          <p className="bento-label">My resume</p>
          <span className="resume-icon" aria-hidden="true">↓</span>
          <strong>View the longer story ↗</strong>
        </a>

        <article className="about-bento-card about-tools-card">
          <p className="bento-label">Tools I use ♡</p>
          <div className="about-tool-stack">
            {toolIcons.slice(3, 8).map((tool) => (
              <Image key={tool.name} src={tool.src} alt={tool.alt} width={56} height={56} />
            ))}
          </div>
        </article>

        <article className="about-bento-card about-values-card">
          <p className="bento-label">How I work</p>
          <div className="value-pills">
            <span>Attention to detail</span>
            <span>Clear systems</span>
            <span>Keep learning</span>
          </div>
        </article>
      </div>
    </section>
  );
}
