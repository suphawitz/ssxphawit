"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { MobileMenu } from "./mobile-menu";

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`site-header${isScrolled ? " is-scrolled" : ""}`}>
      <Link className="site-brand" href="/" aria-label="Phawit home">
        sxpha<span aria-hidden="true">↗</span>
      </Link>

      <nav className="site-nav" aria-label="Main navigation">
        <Link href="/#about">About</Link>
        <Link href="/#work">Work</Link>
        <Link href="/#experience">Experience</Link>
        <Link href="/#contact">Contact</Link>
      </nav>

      <div className="site-header-actions">
        <a className="availability-pill" href="mailto:suphawit.aum.si@gmail.com">
          <span className="availability-dot" aria-hidden="true" />
          Available for opportunities
        </a>
        <MobileMenu />
      </div>
    </header>
  );
}
