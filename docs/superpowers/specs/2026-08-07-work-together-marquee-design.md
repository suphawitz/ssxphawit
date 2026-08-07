# Work Together Marquee Design

Date: 2026-08-07
Status: Approved direction; ready for implementation planning

## Goal

Add a single-line text marquee immediately after the homepage Work section to create a clear transition into the following content and reinforce the portfolio’s contact intent.

## Content and motion

- The repeated text is `Let’s work together *`.
- The marquee contains one continuous row only.
- The text moves from left to right in a seamless loop.
- The movement uses the existing TechMarquee animation structure and timing conventions where practical.
- The marquee does not pause on hover.
- Under `prefers-reduced-motion: reduce`, the text remains visible without continuous movement.

## Placement and scope

- Render the marquee directly after `ProjectIndex` on the homepage.
- Keep the existing two-row `TechMarquee` unchanged.
- Do not modify the Work cards, About section, contact content, or project routes.
- The marquee must remain full-width within the existing site shell and avoid horizontal page overflow on desktop and mobile.

## Component approach

Create a small presentational component dedicated to this message rather than adding conditionals to `TechMarquee`. Reuse the existing marquee class patterns and keyframes, adding only the CSS needed for a single right-moving row and its visual scale.

## Verification

- Confirm the component appears once after the Work section.
- Confirm the repeated text is continuous and moves left to right.
- Confirm reduced-motion behavior leaves readable static content.
- Run lint and a production build.
