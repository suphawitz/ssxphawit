import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

import { toolIcons } from "@/lib/portfolio";

export function AboutSection() {
  return (
    <section
      className="about-section about-bento-section"
      id="about"
      aria-labelledby="about-title"
    >
      <div className="section-heading">
        <p className="eyebrow">01 / About me</p>
        <div>
          <h2 id="work-title">
            Detail-minded, <br />
            <em> curious by default.</em>
          </h2>
          <p className="section-intro">
            Some context, a few tools, and the way I like to work.
          </p>
        </div>
      </div>

      <div className="about-bento">
        <article className="about-bento-card about-availability-card">
          <p className="bento-label">Open to frontend roles</p>
          <div className="availability-status">
            <span className="availability-status-dot" aria-hidden="true" />
            <span>Software house teams</span>
          </div>
          <div>
            <strong className="bento-stat">75%</strong>
            <p className="bento-card-note">Design sense / engineering detail</p>
          </div>
        </article>

        <article className="about-bento-card about-projects-card">
          <p className="bento-label">Selected projects</p>
          <strong className="bento-stat">05</strong>
          <p className="bento-card-note">Small products, shipped with care.</p>
        </article>

        <article className="about-bento-card about-stack-card">
          <p className="bento-label">Core frontend stack</p>
          <strong className="bento-stat">React</strong>
          <p className="bento-card-note">Next.js / TypeScript / CSS</p>
        </article>

        <article className="about-bento-card about-collaboration-card">
          <p className="bento-label">Team of passionate builders</p>
          <h3>
            Build with
            <br />
            <em>care.</em>
          </h3>
          <p className="bento-card-copy">
            Clear handoffs, kind feedback, and work that is easy for the next
            person to build on.
          </p>
          <div className="collaboration-avatars" aria-hidden="true">
            <span>UX</span>
            <span>FE</span>
            <span>PM</span>
          </div>
        </article>

        <article className="about-bento-card about-photo-card">
          <Image
            src="/profile.jpg"
            alt="Suphawit by a lake"
            fill
            sizes="(max-width: 800px) 100vw, (max-width: 980px) 100vw, 50vw"
          />
          <div className="about-photo-overlay">
            <span>Frontend developer</span>
            <span>Bangkok / Thailand ↗</span>
          </div>
        </article>

        <article className="about-bento-card about-craft-card">
          <p className="bento-label">Frontend craft</p>
          <h2 id="about-title">
            Design
            <br />
            <em>to code.</em>
          </h2>
          <div className="about-tool-stack" aria-label="Tools I use">
            {toolIcons.slice(3, 8).map((tool) => (
              <Image key={tool.name} src={tool.src} alt={tool.alt} width={44} height={44} />
            ))}
          </div>
        </article>

        <article className="about-bento-card about-type-card">
          <p className="bento-label">Visual systems</p>
          <h3>
            Type, spacing,
            <br />
            <em>motion.</em>
          </h3>
          <p className="bento-card-note">Small decisions make interfaces feel effortless.</p>
        </article>

        <article className="about-bento-card about-values-card">
          <p className="bento-label">How I work</p>
          <div className="value-pills">
            <span>Attention to detail</span>
            <span>Clear systems</span>
          </div>
        </article>

        <article className="about-bento-card about-contact-card">
          <p className="bento-label">Let&apos;s make it useful</p>
          <a className="resume-link" href="mailto:hello@phawit.dev">
            <FontAwesomeIcon icon={faEnvelope} aria-hidden="true" />
            <span>Start a conversation</span>
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} aria-hidden="true" />
          </a>
          <div className="about-socials" aria-label="Social links">
            <a href="https://github.com/suphawitz" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faGithub} aria-hidden="true" />
              <span>GitHub</span>
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faLinkedin} aria-hidden="true" />
              <span>LinkedIn</span>
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
