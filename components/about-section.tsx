export function AboutSection() {
  return (
    <section className="about-section" id="about" aria-labelledby="about-title">
      <p className="eyebrow">02 / A little about me</p>
      <div className="about-grid">
        <h2 id="about-title">
          Detail-minded,
          <br />
          <em>curious by default.</em>
        </h2>
        <div className="about-copy">
          <p>
            I enjoy the space between a good design and a good experience — the
            small decisions that make a page feel clear, responsive, and easy to
            trust.
          </p>
          <p>
            I&apos;m growing my practice through React, Next.js, TypeScript, and
            the daily work of making interfaces a little more considered.
          </p>
          <div className="capability-list" aria-label="Core capabilities">
            <span>Responsive UI</span>
            <span>Component systems</span>
            <span>Interaction</span>
            <span>Accessibility</span>
          </div>
        </div>
      </div>
    </section>
  );
}
