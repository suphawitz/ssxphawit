import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="site-brand" href="/" aria-label="Phawit home">
        PH<span aria-hidden="true">↗</span>
      </Link>

      <nav className="site-nav" aria-label="Main navigation">
        <Link href="/#work">Work</Link>
        <Link href="/#about">About</Link>
        <Link href="/#contact">Contact</Link>
      </nav>

      <a className="availability-pill" href="mailto:hello@phawit.dev">
        <span className="availability-dot" aria-hidden="true" />
        Available for opportunities
      </a>
    </header>
  );
}
