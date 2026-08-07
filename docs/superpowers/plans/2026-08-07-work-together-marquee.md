# Work Together Marquee Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add one continuously looping `Let’s work together *` marquee directly after the homepage Work section, moving from left to right.

**Architecture:** Create a dedicated presentational component so the existing two-row `TechMarquee` remains unchanged. Reuse the project’s marquee layout conventions and add a scoped right-moving animation plus reduced-motion fallback.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, CSS animations.

## Global Constraints

- Render exactly one marquee row.
- Repeat the copy `Let’s work together *` enough times for a seamless loop.
- Move from left to right and do not pause on hover.
- Place the component immediately after `ProjectIndex` on the homepage.
- Keep the existing `TechMarquee`, Work cards, About section, and project routes unchanged.
- Keep static readable content when `prefers-reduced-motion: reduce` is enabled.
- Do not add automated tests; verify with lint and a production build as requested by the user.

---

### Task 1: Build and place the single-row marquee

**Files:**
- Create: `components/work-together-marquee.tsx`
- Modify: `app/page.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Produces: `WorkTogetherMarquee(): JSX.Element`.
- Consumes: no props or runtime data.

- [ ] **Step 1: Create the presentational component**

Render a semantic section containing one `.work-together-marquee-row`, one `.work-together-marquee-track`, and twelve repeated `.work-together-marquee-item` elements with the exact text `Let’s work together *`.

- [ ] **Step 2: Add scoped animation styles**

Add a full-width overflow wrapper, large editorial text, and a right-moving linear infinite animation. Start at `translateX(-50%)` and finish at `translateX(0)` so the visible movement is left to right.

- [ ] **Step 3: Add the component after Work**

Import `WorkTogetherMarquee` in `app/page.tsx` and render it in a `ScrollReveal` immediately after `ProjectIndex` and before `ContactSection`.

- [ ] **Step 4: Add reduced-motion behavior**

Inside the existing reduced-motion media query, disable the new track animation and reset its transform.

- [ ] **Step 5: Verify the implementation**

Run: `git diff --check`

Run: `npm run lint`

Run: `npm run build`

Expected: no whitespace errors, ESLint exits with code 0, and Next.js prerenders `/`, `/work`, and `/work/[slug]` successfully.

---

### Task 2: Make the marquee full-bleed

**Files:**
- Modify: `components/work-together-marquee.module.css`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: the existing `WorkTogetherMarquee` section and its scoped CSS Module.
- Produces: an edge-to-edge marquee that remains in the existing homepage content order.

- [ ] **Step 1: Capture the current contained layout**

Inspect the section width against the viewport width and confirm the marquee is constrained by `.site-shell`.

- [ ] **Step 2: Apply the full-bleed layout**

Make `html` an inline-size query container. Set the section to `width: 100cqw`, position it with `margin-left: calc(50% - 50cqw)`, and remove the container-padding compensation from `margin-inline`. Using query-container units excludes desktop scrollbar width without globally hiding overflow.

- [ ] **Step 3: Verify viewport coverage**

Confirm the section starts at viewport x-coordinate `0`, matches the viewport width, and does not increase the document scroll width on desktop or mobile.

- [ ] **Step 4: Verify project health**

Run: `git diff --check`

Run: `npm run lint`

Run: `npm run build`

Expected: no whitespace errors, ESLint exits with code 0, and the production build succeeds.
