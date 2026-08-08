# Experience Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a data-driven, scroll-animated Active Role Focus Experience section after Work and before the work-together marquee.

**Architecture:** Keep experience content in `data/experience.json`, expose it through a typed `getExperiences()` loader, and pass it from the server page into a client `ExperienceSection`. The client component owns the selected chapter, observes chapter markers with `IntersectionObserver`, and renders one responsive detail panel with CSS transitions.

**Tech Stack:** Next.js 16.2.10 App Router, React 19, TypeScript, JSON data imports, existing CSS variables and `ScrollReveal`, Font Awesome icons already installed.

## Global Constraints

- Insert the section after `ProjectIndex` and before `WorkTogetherMarquee`.
- Do not modify the existing Work cards, project JSON schema, WorkTogetherMarquee, or Contact section.
- Preserve the existing uncommitted user changes in `components/contact-section.tsx`.
- Use normal document scrolling; do not hijack wheel input or lock the viewport.
- Keep the section responsive with no horizontal overflow on mobile.
- Respect `prefers-reduced-motion: reduce` by removing transform and content transitions.
- Keep contribution labels and copy data-driven so content edits do not require JSX changes.

---

### Task 1: Add the typed experience data boundary

**Files:**
- Create: `data/experience.json`
- Create: `types/experience.ts`
- Create: `lib/experience.ts`
- Create: `lib/experience.test.mjs`

**Interfaces:**
- `Experience` has `id: string`, `period: string`, `title: string`, `context: string`, `description: string`, and `contributions: string[]`.
- `getExperiences(): Experience[]` returns the JSON entries in source order.

- [ ] **Step 1: Write the failing data-loader test**

Create `lib/experience.test.mjs` using the existing Node test style:

```js
import assert from "node:assert/strict";
import test from "node:test";

import { getExperiences } from "./experience.ts";

test("loads the ordered experience chapters", () => {
  const experiences = getExperiences();

  assert.equal(experiences.length, 3);
  assert.deepEqual(experiences.map((item) => item.id), [
    "frontend-developer",
    "independent-builder",
    "digital-business-student",
  ]);
  assert.ok(experiences.every((item) => item.contributions.length > 0));
});
```

- [ ] **Step 2: Run the focused test and confirm it fails**

Run: `node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --experimental-strip-types --test lib/experience.test.mjs`

Expected: FAIL because `./experience.ts` and the experience data do not exist yet.

- [ ] **Step 3: Add the typed interface and mock data**

Create `types/experience.ts`:

```ts
export interface Experience {
  id: string;
  period: string;
  title: string;
  context: string;
  description: string;
  contributions: string[];
}
```

Create `data/experience.json` with these three entries in this exact order:

```json
[
  {
    "id": "frontend-developer",
    "period": "2025 — Present",
    "title": "Frontend Developer",
    "context": "Selected frontend projects",
    "description": "I build responsive interfaces with clear systems, thoughtful interactions, and clean handoffs.",
    "contributions": ["React", "Next.js", "Responsive UI", "Teamwork"]
  },
  {
    "id": "independent-builder",
    "period": "2024",
    "title": "Independent Builder",
    "context": "Small web products",
    "description": "I turn early ideas into focused web experiences by moving from structure to shipped detail.",
    "contributions": ["UI implementation", "Design systems", "Iteration"]
  },
  {
    "id": "digital-business-student",
    "period": "2023 — Present",
    "title": "Digital Business Student",
    "context": "Maejo University",
    "description": "I connect business thinking, product context, and frontend craft while learning through real projects.",
    "contributions": ["Product thinking", "Collaboration", "Continuous learning"]
  }
]
```

- [ ] **Step 4: Implement the loader**

Create `lib/experience.ts` matching `lib/projects.ts`:

```ts
import experiencesJson from "../data/experience.json" with { type: "json" };
import type { Experience } from "../types/experience";

const experiences = experiencesJson as Experience[];

export function getExperiences(): Experience[] {
  return experiences;
}
```

- [ ] **Step 5: Run the focused test and full tests**

Run: `node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --experimental-strip-types --test lib/experience.test.mjs`

Expected: PASS with three ordered entries.

Run: `npm test`

Expected: PASS for the experience loader and existing portfolio tests.

- [ ] **Step 6: Commit the data boundary**

```bash
git add data/experience.json types/experience.ts lib/experience.ts lib/experience.test.mjs
git commit -m "feat: add experience data model"
```

### Task 2: Build the interactive ExperienceSection component

**Files:**
- Create: `components/experience-section.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- `ExperienceSection({ experiences }: { experiences: Experience[] })` renders the section and owns active chapter state.
- `app/page.tsx` calls `getExperiences()` on the server and passes the result to `ExperienceSection` inside the existing `ScrollReveal` wrapper.

- [ ] **Step 1: Add the component shell and initial state**

Create a client component with:

```tsx
"use client";

const [activeId, setActiveId] = useState(experiences[0]?.id ?? "");
```

Render a `<section id="experience" aria-labelledby="experience-title">` with:

- eyebrow `03 / Experience`
- heading `How I show up.` with the existing display font and coral emphasis
- a left `experience-role-list`
- a right `experience-detail-panel`

Each chapter selector must be a `<button>` with `aria-current={isActive ? "true" : undefined}` and a `data-experience-id` attribute.

- [ ] **Step 2: Add direct selection behavior**

Clicking a role button calls `setActiveId(experience.id)`. Use the selected entry to render the panel title, period, context, description, and contribution chips. Render the progress bar as decorative with `aria-hidden="true"`.

Use a stable `key={active.id}` on the detail content wrapper so the CSS enter animation runs when the chapter changes.

- [ ] **Step 3: Add scroll-driven active state**

Create refs for the chapter buttons and observe them in `useEffect`:

```tsx
const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    const id = visible?.target.getAttribute("data-experience-id");
    if (id) setActiveId(id);
  },
  { rootMargin: "-35% 0px -45% 0px", threshold: [0.1, 0.5, 0.9] },
);
```

Disconnect the observer during cleanup. If `window.matchMedia("(prefers-reduced-motion: reduce)")` matches, keep click selection available but skip any optional scroll-progress animation logic.

- [ ] **Step 4: Add the progress calculation**

Track the section element with a passive scroll listener or `requestAnimationFrame`-throttled handler. Convert the section’s top/bottom bounds to a `0–1` progress value and set a CSS custom property on the section:

```tsx
section.style.setProperty("--experience-progress", `${progress}`);
```

Clamp the value and remove the listener on cleanup. The progress indicator must be visual only and must not affect active chapter selection.

- [ ] **Step 5: Wire the component into the page**

In `app/page.tsx`:

```tsx
const experiences = getExperiences();
```

Import `ExperienceSection`, then render:

```tsx
<ScrollReveal>
  <ExperienceSection experiences={experiences} />
</ScrollReveal>
```

Place this immediately after the existing `ProjectIndex` block and before `WorkTogetherMarquee`.

- [ ] **Step 6: Run lint and tests**

Run: `npm run lint`

Expected: PASS with no new accessibility or React hook errors.

Run: `npm test`

Expected: PASS with the new data-loader test and existing tests.

### Task 3: Add the visual system and responsive animation styles

**Files:**
- Modify: `app/globals.css`

**Interfaces:**
- The component relies on the classes `.experience-section`, `.experience-layout`, `.experience-role-list`, `.experience-role`, `.experience-detail-panel`, `.experience-detail-content`, `.experience-progress`, and `.experience-contributions`.

- [ ] **Step 1: Style the desktop composition**

Add a two-column grid using the current site shell spacing, with the role list on the left and the detail panel on the right. Keep the detail panel visible while the role list is being read with `position: sticky; top: 7rem; align-self: start`, then remove sticky positioning in the mobile media query. Use the existing variables:

```css
.experience-detail-panel {
  background: var(--surface-dark);
  color: var(--background);
}
```

Inactive role buttons use `var(--surface)`, active buttons use `var(--surface-dark)`, and accents use `var(--accent)` / `#a9d29d`.

- [ ] **Step 2: Add active-state and detail-enter transitions**

Implement a short transform/opacity transition for role buttons and a `@keyframes experience-detail-in` animation for `.experience-detail-content`. Keep the movement subtle (`translateY(0.65rem)` maximum) so the section feels editorial rather than application-like.

- [ ] **Step 3: Bind progress to the CSS custom property**

Use the component’s `--experience-progress` value for the progress fill:

```css
.experience-progress-fill {
  transform: scaleX(var(--experience-progress, 0));
  transform-origin: left;
}
```

Add `will-change: transform` only to the progress fill and detail content during transitions.

- [ ] **Step 4: Add tablet and mobile layout rules**

At `max-width: 980px`, reduce the columns and padding. At `max-width: 800px`, switch to one column, keep role buttons at least `44px` tall, place the detail panel below the role list, and remove sticky positioning. Add `overflow-wrap: anywhere` for long titles and ensure the contribution chips wrap.

- [ ] **Step 5: Add reduced-motion overrides**

Under `@media (prefers-reduced-motion: reduce)`, set the detail animation and role transitions to `none`, set the progress fill transition to `none`, and preserve visible active styling.

- [ ] **Step 6: Run formatting checks**

Run: `git diff --check`

Expected: PASS with no whitespace errors.

### Task 4: Verify the complete section and hand off

**Files:**
- Verify: `app/page.tsx`, `components/experience-section.tsx`, `app/globals.css`, `data/experience.json`

- [ ] **Step 1: Run the full verification commands**

Run:

```bash
npm test
npm run lint
npm run build
git diff --check
```

Expected: all commands pass. If `next build` requires local process permission in this environment, rerun the same command with the approved local execution permission; do not change application code to work around the environment restriction.

- [ ] **Step 2: Check desktop behavior**

At a desktop viewport, confirm that the section appears after Work, the first role is selected initially, clicking each role updates the detail panel, and scrolling through the role list changes the active role and progress fill without page locking.

- [ ] **Step 3: Check mobile behavior**

At a narrow viewport, confirm that the section becomes one column, all role buttons remain tappable, the detail panel remains readable, contribution chips wrap, and `document.documentElement.scrollWidth <= window.innerWidth`.

- [ ] **Step 4: Check reduced motion**

With reduced motion enabled, confirm the detail content changes immediately without transform animation and the active role remains visually identifiable.

- [ ] **Step 5: Review the diff and commit the feature**

Confirm `components/contact-section.tsx` contains only the user’s pre-existing changes, then stage only the Experience implementation files and commit:

```bash
git add app/page.tsx app/globals.css components/experience-section.tsx data/experience.json lib/experience.ts lib/experience.test.mjs types/experience.ts
git commit -m "feat: add animated experience section"
```
