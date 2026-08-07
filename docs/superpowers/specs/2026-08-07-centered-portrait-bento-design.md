# Centered Portrait Bento Design

Date: 2026-08-07
Status: Approved direction; ready for implementation planning

## Goal

Rework the About section into an editorial bento grid inspired by the supplied reference image, with Suphawit’s portrait as the visual anchor and concise recruiter-friendly content around it.

## Visual direction

The section will use warm, soft surfaces, restrained borders, rounded cards, and a mix of dark, pastel, and image-led cards. The layout will borrow the reference’s composition rather than its copy or branding: small information cards frame a large central portrait, creating a clear visual hierarchy without turning the portfolio into a dashboard.

## Desktop composition

Use a four-column CSS grid with three compact content rows and consistent gaps.

- The portrait card sits in the center and spans two columns and one row.
- The upper-left card communicates availability for software-house teams.
- Two compact cards above the portrait show selected project count and core frontend stack.
- The upper-right card communicates collaboration and team fit.
- The lower row contains frontend craft, visual systems, working principles, and a contact action.
- The portrait card uses `/profile.jpg`, an accessible alt text, and a small overlay label such as “Frontend developer / Bangkok”.

The content should be short enough to remain scannable inside compact cards. The existing social links, resume action, and tool imagery remain available, but they should be placed only where they support the new hierarchy instead of competing with the portrait.

## Responsive behavior

- Desktop above 980px: retain the four-column composition and central portrait spanning two columns.
- Tablet from 801px to 980px: switch to a two-column grid; the portrait becomes a prominent full-width card followed by compact information cards.
- Mobile up to 800px: use one column, keep the portrait near the beginning of the section, and stack all information cards with readable minimum heights.
- The section must not create horizontal overflow, clipped card content, or controls that rely on hover.
- Image sizing must use responsive `sizes`, preserve the portrait’s focal point with `object-fit: cover`, and keep the overlay label tappable/readable.

## Component and data approach

Keep `AboutSection` presentational and preserve the existing Font Awesome imports for social, email, resume, and external-link affordances. Update the card markup and class names to express the new composition. Keep tool imagery sourced from `lib/portfolio.ts` and local files in `public/tools`; no remote image dependency is needed.

The card copy can remain inline because it is static identity content, while project data continues to come from `data/projects.json`. No new runtime state or interaction is required for this layout change.

## Accessibility and motion

- Keep one semantic `h2` for the About section and use descriptive labels for each card.
- Preserve visible keyboard focus states for social and resume links.
- Treat the portrait as content, not decoration, with useful alt text.
- Keep existing reduced-motion behavior; the bento layout itself should not depend on animation.

## Verification

- Add or update a focused test that checks the About section’s key content anchors and the portrait asset reference.
- Run the full project test command used by the repository.
- Run `npm run lint` and `npm run build`.
- Inspect the responsive rules at desktop, tablet, and mobile widths for grid overflow and card readability.
