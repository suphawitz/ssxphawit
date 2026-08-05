<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project context

This repository is a personal English-language portfolio for a Frontend Developer
targeting software-house opportunities and future professional opportunities.

## Product direction

- Use the provided portfolio references as visual inspiration only; do not copy their code, text, imagery, branding, or distinctive assets.
- Keep the visual language editorial and minimal, with approachable details and restrained interaction.
- Optimize for clear recruiter scanning first, then personality and exploration.
- Use mock content and placeholder imagery until the owner supplies final project information.

## Implementation rules

- Read the relevant guides in `node_modules/next/dist/docs/` before changing Next.js code; this project uses Next 16.2.10 and its APIs may differ from familiar Next.js conventions.
- Prefer focused components and data-driven project content over large page components.
- Keep project content separate from presentation so real projects can replace mock data without restructuring the UI.
- Treat mobile as a first-class layout: hover-only behavior must have a tap or static fallback.
- Respect `prefers-reduced-motion`, maintain keyboard access, use meaningful alt text, and preserve visible focus states.
- Avoid unnecessary dependencies, heavy animation libraries, fake metrics, fake testimonials, and decorative UI that harms performance or clarity.

## Verification

- Run `npm run lint` after implementation changes.
- Run `npm run build` before claiming the site is complete.
- Verify the page at desktop and mobile widths, including keyboard navigation and reduced-motion behavior.
