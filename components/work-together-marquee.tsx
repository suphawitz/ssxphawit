import styles from "./work-together-marquee.module.css";

const MESSAGE_COUNT = 6;

function MarqueeGroup() {
  return (
    <div className={styles.group}>
      {Array.from({ length: MESSAGE_COUNT }, (_, index) => (
        <span className={styles.item} key={index}>
          Let’s work together <span aria-hidden="true">*</span>
        </span>
      ))}
    </div>
  );
}

export function WorkTogetherMarquee() {
  return (
    <section
      className={styles.section}
      data-marquee="work-together"
      aria-label="Let’s work together"
    >
      <div className={styles.row}>
        <div className={styles.track} data-marquee-track aria-hidden="true">
          <MarqueeGroup />
          <MarqueeGroup />
        </div>
      </div>
    </section>
  );
}
