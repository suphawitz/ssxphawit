import Link from "next/link";
import Container from "../ui/Container";
import { NAV_LINKS } from "@/config/design";

export default function Navbar() {
  return (
    /* ── Outer wrapper ── fixed at top with offset ── */
    <header className="fixed inset-x-0 top-4 z-50">
      {/* ── Inner container ── centered, constrained width ── */}
      <Container
        as="nav"
        className="flex h-16 items-center justify-between"
        aria-label="Main navigation"
      >
        {/* ── Brand ── */}
        <Link
          href="/"
          className="text-base font-semibold tracking-wide text-foreground"
        >
          SUPHAWIT
        </Link>

        {/* ── Navigation links ── */}
        <ul className="flex items-center gap-8" role="list">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className="text-sm font-medium text-muted-foreground transition-all duration-200 ease-out hover:-translate-y-px hover:text-foreground"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* ── Theme toggle placeholder ── replaced when theme logic is added ── */}
        <div aria-hidden="true" className="size-10" />
      </Container>
    </header>
  );
}
