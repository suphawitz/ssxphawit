"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  return (
    <div className="mobile-menu">
      <button
        className="mobile-menu-trigger"
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        onClick={() => setIsOpen((open) => !open)}
      >
        <span>{isOpen ? "Close" : "Menu"}</span>
        <span className="menu-icon" aria-hidden="true">
          {isOpen ? "×" : "☰"}
        </span>
      </button>

      <div
        className={`mobile-menu-panel${isOpen ? " is-open" : ""}`}
        id="mobile-navigation"
        aria-hidden={!isOpen}
      >
        <div className="mobile-menu-panel-topline">
          <span>Navigation</span>
          <button
            className="mobile-menu-close"
            type="button"
            onClick={() => setIsOpen(false)}
          >
            Close <span aria-hidden="true">×</span>
          </button>
        </div>
        <nav aria-label="Mobile navigation">
          <Link href="/#about" onClick={() => setIsOpen(false)}>
            About <span aria-hidden="true">↗</span>
          </Link>
          <Link href="/#work" onClick={() => setIsOpen(false)}>
            Work <span aria-hidden="true">↗</span>
          </Link>
          <Link href="/#contact" onClick={() => setIsOpen(false)}>
            Contact <span aria-hidden="true">↗</span>
          </Link>
        </nav>
        <button
          className="mobile-menu-dismiss"
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setIsOpen(false)}
        >
          <span>Tap here to close</span>
        </button>
        <p>Frontend developer / Bangkok</p>
      </div>
    </div>
  );
}
