# Experience Section Design

## Goal

Add an Experience section after the selected Work section and before the work-together marquee. The section should communicate both career context and practical frontend contributions for software-house recruiters without repeating the project list.

The approved direction is **Active role focus**: a compact role/chapter list controls a larger detail panel, with scroll-driven animation and direct selection.

## Placement and content

`ExperienceSection` will be rendered in `app/page.tsx` immediately after `ProjectIndex` and before `WorkTogetherMarquee`.

The initial mock data will contain three replaceable entries:

1. `Frontend Developer` — `2025 — Present` — selected frontend projects.
2. `Independent Builder` — `2024` — small web products and project-based work.
3. `Digital Business Student` — `2023 — Present` — Maejo University and digital business innovation.

Each entry contains:

- `id`
- `period`
- `title`
- `context`
- `description`
- `contributions`

The content will live in `data/experience.json`, with a typed loader in `lib/experience.ts` and a reusable `Experience` type in `types/experience.ts`.

## Desktop interaction model

The section uses two columns within a single bounded section:

- Left column: a vertical list of the three experience chapters.
- Right column: the active detail panel with chapter number, title, description, contribution chips, and a progress indicator.

The page keeps normal document scrolling; it will not hijack the wheel or lock the viewport. An `IntersectionObserver` watches the chapter markers and updates the active entry as the user scrolls. Clicking a chapter updates it immediately and moves focus to the corresponding detail state without navigating away.

The active chapter uses the existing dark surface language. Inactive chapters remain light and muted. The detail panel uses the existing cream/green/coral palette so the section fits between Work and the following marquee.

## Animation behavior

- Active chapter transitions use a short color, opacity, and translate transition.
- Detail content fades and slides a small distance when the active entry changes.
- The progress indicator grows with the current section progress and resets cleanly when the section leaves the viewport.
- Entry reveal uses the existing `ScrollReveal` behavior at the section boundary; the internal active state remains controlled by the Experience component.
- `prefers-reduced-motion: reduce` disables transform and content transitions while keeping the active state and content fully usable.
- There will be no autoplay loop and no hover-dependent behavior.

## Responsive behavior

At desktop widths, the two-column layout is preserved and the detail panel may use sticky positioning within the section if it improves reading flow without extending beyond the section bounds.

At tablet widths, columns become narrower while retaining the same interaction model.

At mobile widths:

- The layout becomes one column.
- Chapter buttons appear first as a compact list.
- The detail panel follows the list and remains visible for the active chapter.
- The section does not create horizontal overflow.
- Touch targets remain comfortably tappable and the animation duration is reduced.

## Component and data boundaries

`ExperienceSection` will be a client component only because it owns active chapter state and observers. Data loading remains server-safe and static: `app/page.tsx` obtains the typed experience list and passes it into the component, matching the existing project data pattern where possible.

The component will not depend on project cards, Work section state, or external services. All copy and contribution labels are data-driven so future edits do not require JSX changes.

## Accessibility and failure behavior

- Chapter selectors use buttons with accessible labels and `aria-current` for the active entry.
- The detail panel has a stable labelled heading and remains readable when JavaScript is unavailable through a sensible initial active entry.
- Keyboard focus must be visible and chapter selection must work without a pointer.
- The progress indicator is decorative and will be hidden from assistive technology.
- Missing optional contribution data will render an empty chip group rather than breaking the section.

## Verification

Before completion, verify:

- `npm run lint`
- `npm run build`
- `git diff --check`
- desktop visual layout and scroll state changes
- mobile layout at a narrow viewport with no horizontal overflow
- reduced-motion behavior through the existing media query path

## Scope exclusions

This change does not alter the existing Work cards, project JSON schema, WorkTogetherMarquee, or Contact section. It does not add a CMS, API, database, or automatic resume parsing.
