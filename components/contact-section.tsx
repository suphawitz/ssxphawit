import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faPhone, faFile } from "@fortawesome/free-solid-svg-icons";

export function ContactSection() {
  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="contact-heading">
        <p className="eyebrow pb-4">04 / Start a conversation</p>
        <h2 id="contact-title">
          Suphawit
          <br />
          <em>Jaikaewma</em>
        </h2>
      </div>
      <div className="contact-actions">
        <p>
          I&apos;m open to frontend roles, thoughtful collaborations, and the next
          opportunity to make something useful.
        </p>
        <a className="contact-email" href="mailto:suphawit.aum.si@gmail.com">
          suphawit.aum.si@gmail.com 
        </a>
        <div className="social-links" aria-label="Social links">
          <a href="https://github.com/suphawitz" className="flex items-center" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faGithub} className="pr-1 text-lg" aria-hidden="true" />
            <span>GitHub</span>
          </a>
          <a href="https://www.instagram.com/ssxphawit.si" className="flex items-center" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faInstagram} className="pr-1 text-lg" aria-hidden="true" />
            <span>Instagram</span>
          </a>
          <a target="_blank" rel="noreferrer" href="/resume.pdf" className="flex items-center">
            <FontAwesomeIcon icon={faFile} className="pr-1 text-lg" aria-hidden="true" />
            <span>Resume</span>
          </a>
          <a target="_blank" rel="noreferrer" href="tel:+66649582354" className="flex items-center">
            <FontAwesomeIcon icon={faPhone} className="pr-1 text-lg" aria-hidden="true" />
            <span>+66 64 958 2354</span>
          </a>
        </div>
      </div>
    </section>
  );
}
