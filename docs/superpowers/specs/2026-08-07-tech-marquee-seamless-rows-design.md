# Tech Marquee Seamless Rows Design

Date: 2026-08-07
Status: Approved for inline implementation

## Goal

Give each TechMarquee row a distinct icon set and remove the visible snap when an animation iteration resets.

## Icon sets

- Frontend row: HTML5, CSS3, JavaScript, React, and Next.js.
- Tools and services row: Figma, GitHub, GPT, and Supabase.
- The two rows must not share icons.
- Both rows keep their existing opposite movement directions.

## Seamless loop structure

Each row renders two identical copies of its own base icon group inside one track. Spacing belongs to each group, including trailing spacing, so both groups have exactly the same rendered width. The left-moving row animates from `translateX(0)` to `translateX(-50%)`; the right-moving row animates from `translateX(-50%)` to `translateX(0)`.

This replaces the current three-copy flat list. The flat list has 26 gaps across 27 icons, so one third of the track width does not equal one nine-icon sequence plus its boundary gap. That mismatch causes the visible reset snap.

## Motion and accessibility

- Use a slightly shorter duration for the four-icon row so both rows have a similar perceived pixel speed.
- Expose alternative text only for the first group in each row; duplicated groups are decorative.
- Keep the existing reduced-motion behavior.

## Verification

- Confirm the two row sets are disjoint and contain the expected icon names.
- Confirm every track contains two equal-width groups.
- Confirm the rows move in opposite directions.
- Confirm there is no horizontal page overflow on desktop or mobile.
- Run the focused data test, lint, and production build.
