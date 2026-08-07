# Frontend Portfolio Skill

## Purpose

Build a polished, honest, and extensible personal portfolio for a Frontend Developer. The site should feel intentionally designed rather than generated from a generic portfolio template.

## Design principles

1. **Clarity before spectacle** — visitors should understand the role, strengths, and selected work within a few seconds.
2. **Editorial foundation** — use generous spacing, strong type hierarchy, warm neutral surfaces, and a small accent palette.
3. **Human details** — add approachable labels, small transitions, and tactile project interactions without turning the page into a demo reel.
4. **Proof over claims** — show what was built, the problem it addressed, the contribution made, and the technologies used.
5. **Responsive by design** — desktop hover interactions become tap or static states on touch devices.
6. **Responsive with every change** — every new or modified component must be checked at mobile, tablet, and desktop widths; a visual change is incomplete until its layout, interaction, overflow, and focus behavior are considered at each breakpoint.

## Required workflow

- Confirm the page purpose and audience before implementation.
- Keep the first release focused on one homepage and reusable project detail pages.
- Store projects in a typed data module with stable slugs.
- Prefer CSS transitions and small client components for interaction; add a dependency only when it materially improves the experience.
- Add an accessible fallback for every visual interaction.
- Test loading, empty or missing project data, mobile layout, keyboard navigation, and reduced-motion preferences.
- For every UI change, verify at least one narrow mobile viewport, one tablet viewport, and one desktop viewport. Check menu backgrounds, grid gutters, image cropping, text wrapping, horizontal overflow, touch targets, hover/tap fallbacks, and keyboard focus.
- Prefer CSS responsive rules and progressive enhancement over JavaScript viewport checks. If a component behaves differently on touch, provide a non-hover fallback rather than hiding essential content.

## Content rules

- Mock projects must be clearly replaceable with real projects later.
- Do not invent awards, clients, revenue, testimonials, or employment history.
- Project descriptions should explain the goal, the frontend contribution, and one meaningful implementation decision.
- Keep the primary language English unless a future product decision changes the audience.

## Quality bar

The finished page should be fast, readable, visually distinctive, maintainable, and credible to a software-house recruiter. Every animation must support hierarchy or feedback; otherwise remove it.
