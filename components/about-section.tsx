import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faDesktop,
  faEnvelope,
  faGraduationCap,
  faLayerGroup,
  faPeopleGroup,
  faSquareUpRight,
  faStar,
  faTableCellsLarge,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons";

import { toolIcons } from "@/lib/portfolio";

export function AboutSection() {
  const frontendStack = [
    { name: "Next.js", src: "/tools/nextjs.svg", alt: "Next.js logo" },
    { name: "JavaScript", src: "/tools/js.png", alt: "JavaScript logo" },
    { name: "Vercel", src: "/tools/vercel.svg", alt: "Vercel logo" },
    { name: "Supabase", src: "/tools/supabase.png", alt: "Supabase logo" },
  ];

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
          <p className="bento-label">
            <FontAwesomeIcon icon={faGraduationCap} aria-hidden="true" />
            Education
          </p>
          <div className="education-header">
            <Image
              className="education-logo"
              src="/mju_logo.webp"
              alt="Maejo University logo"
              width={112}
              height={112}
            />
            <div>
              <p className="education-school">Maejo University</p>
              <p className="education-period text-center">2023 — Present</p>
            </div>
          </div>
          <div className="education-degree">
            <span className="education-degree-label">Degree</span>
            <h3>Bachelor of <em>Business Administration</em></h3>
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
          <p className="bento-label">
            <FontAwesomeIcon icon={faStar} aria-hidden="true" />
            Awards
          </p>
          <div className="award-heading">
            <p>Recognised for consistent academic performance and creative initiative.</p>
          </div>
          <ul className="award-list">
            <li>
              <span>2024</span>
              <div>
                <strong>Academic Excellence Award</strong>
                <small>Maejo University</small>
              </div>
            </li>
            <li>
              <span>2023</span>
              <div>
                <strong>Academic Excellence Award</strong>
                <small>Maejo University</small>
              </div>
            </li>
            <li>
              <span>2022</span>
              <div>
                <strong>National Competition (2nd Runner-up)</strong>
                <small>National Student Arts &amp; Crafts Competition #70</small>
              </div>
            </li>
          </ul>
          {/* <a className="bento-inline-link" href="#award">
            View all achievements <span aria-hidden="true">↗</span>
          </a> */}
        </article>

        <article className="about-bento-card about-stack-card">
          <p className="bento-label">
            <FontAwesomeIcon icon={faLayerGroup} aria-hidden="true" />
            Core frontend stack
          </p>
          <strong className="bento-stat">Vide code</strong>
          <p className="bento-card-note">Next.js / TypeScript / CSS</p>
          <div className="stack-icon-list" aria-label="Core frontend technologies">
            {frontendStack.map((tool) => (
              <span className="stack-icon-item" key={tool.name}>
                <Image src={tool.src} alt={tool.alt} width={32} height={32} />
                <small>{tool.name}</small>
              </span>
            ))}
          </div>
          {/* <a className="bento-inline-link" href="#tech-stack">
            View tech stack <span aria-hidden="true">↗</span>
          </a> */}
        </article>

        <article className="about-bento-card about-collaboration-card">
          <p className="bento-label">
            <FontAwesomeIcon icon={faPeopleGroup} aria-hidden="true" />
            Team &amp; philosophy
          </p>
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
            <span>Thailand ↗</span>
          </div>
        </article>

        <article className="about-bento-card about-craft-card">
          <p className="bento-label">
            <FontAwesomeIcon icon={faDesktop} aria-hidden="true" />
            Frontend craft
          </p>
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
          <p className="bento-label">
            <FontAwesomeIcon icon={faTableCellsLarge} aria-hidden="true" />
            Visual systems
          </p>
          <h3>
            Type, spacing,
            <br />
            <em>motion.</em>
          </h3>
          <p className="bento-card-note">Small decisions make interfaces feel effortless.</p>
          <div className="type-specimen" aria-hidden="true">
            <span>Aa</span>
            <i />
            <i />
            <i />
            <i />
          </div>
          <a className="bento-inline-link">
            Explore visual system <span aria-hidden="true">↗</span>
          </a>
        </article>

        <article className="about-bento-card about-values-card">
          <p className="bento-label">
            <FontAwesomeIcon icon={faUserGroup} aria-hidden="true" />
            How I work
          </p>
          <div className="how-work-list">
            <div className="how-work-item">
              <span aria-hidden="true">⌕</span>
              <p><strong>Attention to detail</strong><small>I care about the little things.</small></p>
            </div>
            <div className="how-work-item">
              <span aria-hidden="true">✓</span>
              <p><strong>Clear systems</strong><small>I document, automate, and reuse.</small></p>
            </div>
            <div className="how-work-item">
              <span aria-hidden="true">◎</span>
              <p><strong>Empathy first</strong><small>I design with real people in mind.</small></p>
            </div>
          </div>
          <a className="bento-inline-link">
            More about my process <span aria-hidden="true">→</span>
          </a>
        </article>

        <article className="about-bento-card about-contact-card">
          <p className="bento-label">
            <FontAwesomeIcon icon={faEnvelope} aria-hidden="true" />
            Let&apos;s connect
          </p>
          <h3>Let&apos;s build<br />something great.</h3>
          <p className="bento-card-note">Available for opportunities and exciting projects.</p>
          <a className="contact-resume-button" href="/resume.pdf" target="_blank" rel="noreferrer">
            <span>View Resume</span>
            <FontAwesomeIcon icon={faSquareUpRight} aria-hidden="true" />
          </a>
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
            <a href="https://www.instagram.com/ssxphawit.si" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faInstagram} aria-hidden="true" />
              <span>Instagram</span>
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
