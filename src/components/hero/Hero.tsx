import Container from "../ui/Container";
import HeroContent from "./HeroContent";

export default function Hero() {
  return (
    /* ── Section wrapper ── full viewport, vertically centered ── */
    <section className="flex min-h-screen items-center">
      {/* ── Container ── matches site-wide width system ── */}
      <Container>
        {/* ── Two-column grid ── stacks on mobile ── */}
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <HeroContent />
        </div>
      </Container>
    </section>
  );
}
