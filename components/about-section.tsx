import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faEnvelope,
  faSquareUpRight
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons";

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
        <article className="about-bento-card about-availability-card" id="education">
          <p className="bento-label">Education</p>
          <div className="education-header">
            <Image
              className="education-logo"
              src="/mju_logo.webp"
              alt="Maejo University logo"
              width={96}
              height={96}
            />
            <div>
              <p className="education-school text-center">Maejo University</p>
              <p className="education-period text-center">2023 — now</p>
            </div>
          </div>
          <div className="education-degree">
            <h3>Bachelor of Business Administration</h3>
            <p>Major in Digital Business Innovation (DBI)</p>
          </div>
          <div className="education-footer">
            <div className="availability-status">
              <span className="availability-status-dot" aria-hidden="true" />
              <span>Open to software-house teams</span>
            </div>
            <div className="education-gpa">
              <span>Current GPA</span>
              <strong>3.85</strong>
            </div>
          </div>
        </article>

        <article className="about-bento-card about-awards-card" id="award">
          <p className="bento-label">Award</p>
          <div className="award-heading">
            <span className="award-symbol" aria-hidden="true">✦</span>
            <p>Recognised for consistent academic performance.</p>
          </div>
          <ul className="award-list">
            <li>
              <span>2024</span>
              <strong>Academic Excellence Award
                <p className="text-sm text-gray-400">
                  Maejo University
                </p>
              </strong>
            </li>
            <li>
              <span>2023</span>
              <strong>Academic Excellence Award
                <p className="text-sm text-gray-400">
                  Maejo University
                </p></strong>
            </li>
            <li>
              <span>2022</span>
              <strong>National Competition (2nd Runner-up)
                <p className="text-sm text-gray-400">
                  National Student Arts & Crafts Competition #70
                </p>
              </strong>
            </li>
          </ul>
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
            src="/profile-02.jpg"
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
          <p className="bento-label">Let's make it useful</p>

          <div className="flex items-center justify-center mt-5">
            <a href="/resume.pdf" target="_blank" rel="noreferrer">
              <span>Resume</span>
              <FontAwesomeIcon icon={faSquareUpRight} aria-hidden="true" />
            </a>
          </div>
          <a className="resume-link" href="mailto:suphawit.aum.si@gmail.com">
            <FontAwesomeIcon icon={faEnvelope} aria-hidden="true" />
            <span>Start a conversation</span>
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} aria-hidden="true" />
          </a>
          <div className="about-socials" aria-label="Social links">
            <a href="https://github.com/suphawitz" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faGithub} aria-hidden="true" />
              <span>GitHub</span>
            </a>
            <a href="https://www.instagram.com/su_phawit.12" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faInstagram} aria-hidden="true" />
              <span>Instagram</span>
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
