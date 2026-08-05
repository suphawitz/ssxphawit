export function ContactSection() {
  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="contact-heading">
        <p className="eyebrow">03 / Start a conversation</p>
        <h2 id="contact-title">
          Have a good project
          <br />
          <em>in mind?</em>
        </h2>
      </div>
      <div className="contact-actions">
        <p>
          I&apos;m open to frontend roles, thoughtful collaborations, and the next
          opportunity to make something useful.
        </p>
        <a className="contact-email" href="mailto:hello@phawit.dev">
          hello@phawit.dev <span aria-hidden="true">↗</span>
        </a>
        <div className="social-links" aria-label="Social links">
          <a href="https://github.com/suphawitz" target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
            LinkedIn ↗
          </a>
          <a href="/resume.pdf">Resume ↗</a>
        </div>
      </div>
    </section>
  );
}
