# Centered Portrait Bento Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the About section as a responsive bento grid with Suphawit’s portrait centered and recruiter-friendly frontend content arranged around it.

**Architecture:** Keep `AboutSection` as a presentational server component. Express the desktop composition with CSS grid areas, use the existing local portrait/tool assets and Font Awesome imports, then collapse the composition into two columns for tablet and one column for mobile.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, CSS custom properties/grid, `next/image`, Font Awesome React SVG icons, Node’s built-in test runner.

## Global Constraints

- The portrait must use the existing `/profile.jpg` asset with responsive `sizes` and useful alt text.
- Desktop above 980px uses a central portrait spanning two columns and three rows.
- Tablet from 801px to 980px uses a two-column layout with a prominent full-width portrait.
- Mobile up to 800px uses one column with the portrait near the beginning and no horizontal overflow.
- Keep the About section semantic with one `h2`, visible focus states, and no hover-only content.
- Preserve Font Awesome social, contact, resume, and external-link affordances.
- Do not change project JSON loading or unrelated sections.

---

### Task 1: Add a focused About section regression test

**Files:**
- Modify: `tests/portfolio.test.mts`
- Test: `tests/portfolio.test.mts`

**Interfaces:**
- Consumes: the existing `AboutSection` source file as text.
- Produces: assertions that protect the new content anchors and centered portrait asset.

- [ ] **Step 1: Write the failing test**

Add a test that reads `components/about-section.tsx` and asserts it contains the following stable anchors: `/profile.jpg`, `Selected projects`, `Core frontend stack`, `Available for software-house teams`, and `about-photo-card`.

```ts
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

test("keeps the centered portrait bento content anchors", () => {
  const source = readFileSync(
    resolve(process.cwd(), "components/about-section.tsx"),
    "utf8",
  );

  for (const anchor of [
    "/profile.jpg",
    "Selected projects",
    "Core frontend stack",
    "Available for software-house teams",
    "about-photo-card",
  ]) {
    assert.ok(source.includes(anchor), `missing About anchor: ${anchor}`);
  }
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --experimental-strip-types --test tests/portfolio.test.mts`

Expected: FAIL because the current About markup does not contain the new card copy.

- [ ] **Step 3: Keep the test as the implementation contract**

Do not add production code until the expected failure is confirmed.

---

### Task 2: Implement the centered portrait card composition

**Files:**
- Modify: `components/about-section.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: existing `toolIcons`, Font Awesome icon imports, and `/profile.jpg`.
- Produces: semantic About cards with the portrait as the central visual anchor.

- [ ] **Step 1: Replace the current card order with the approved content structure**

Use these cards in the desktop grid:

1. `about-availability-card`: `Available for software-house teams`, with a short line about building responsive interfaces.
2. `about-projects-card`: `Selected projects`, value `05`, and a short supporting label.
3. `about-stack-card`: `Core frontend stack`, `React / Next.js / TypeScript`.
4. `about-collaboration-card`: `Team-minded frontend developer`, with a compact collaboration message.
5. `about-photo-card`: `/profile.jpg`, alt `Suphawit by a lake`, overlay `Frontend developer / Bangkok`.
6. `about-craft-card`: `Frontend craft`, `Design to code`, and a short implementation note.
7. `about-focus-card`: `Currently exploring`, with an accessible interface-focused sentence.
8. `about-values-card`: `How I work`, existing value pills, and the resume action/social links where they fit without overcrowding the card.

Keep one `h2` with `id="about-title"` in the identity/craft content and preserve the existing Font Awesome links.

- [ ] **Step 2: Define the desktop grid areas**

Use a four-column, four-row grid with named areas so the portrait is unambiguously central:

```css
.about-bento {
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr) minmax(0, 1.15fr) minmax(0, 1fr);
  grid-template-rows: repeat(4, minmax(8rem, auto));
  grid-template-areas:
    "availability projects stack collaboration"
    "availability portrait portrait collaboration"
    "craft portrait portrait focus"
    "craft portrait portrait values";
}
```

Assign each card class to one area, keep card heights controlled by the grid, and retain a consistent gap and radius.

- [ ] **Step 3: Add responsive grid behavior**

At 801–980px, use two columns and make `about-photo-card` span both columns near the top. At 800px and below, use one column, clear all named areas, set the portrait’s aspect ratio, and stack cards in reading order.

- [ ] **Step 4: Run the focused test**

Run: `node --experimental-strip-types --test tests/portfolio.test.mts`

Expected: PASS for the new content-anchor test and all existing portfolio tests.

---

### Task 3: Verify the complete responsive implementation

**Files:**
- Verify: `components/about-section.tsx`
- Verify: `app/globals.css`
- Verify: `tests/portfolio.test.mts`

**Interfaces:**
- Consumes: the implemented About section and existing project routes.
- Produces: evidence that the change compiles and does not regress the portfolio.

- [ ] **Step 1: Check formatting and removed old layout references**

Run: `git diff --check`

Run: `rg -n "about-profile-card|about-practice-card|about-resume-card" components/about-section.tsx app/globals.css`

Expected: no stale layout classes remain in the component, and the new card classes are present.

- [ ] **Step 2: Run all tests**

Run: `node --experimental-strip-types --test tests/portfolio.test.mts tests/projects.test.mts`

Expected: all tests pass.

- [ ] **Step 3: Run lint**

Run: `npm run lint`

Expected: exit code 0 with no ESLint errors.

- [ ] **Step 4: Run the production build**

Run: `npm run build`

Expected: Next.js compiles successfully and prerenders the home and project detail routes.

- [ ] **Step 5: Review responsive CSS manually**

Check that desktop uses the center portrait area, tablet switches to two columns, mobile switches to one column, all images have responsive sizing, and no rule creates horizontal overflow.
