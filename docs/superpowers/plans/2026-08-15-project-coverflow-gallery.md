# Project Coverflow Gallery Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the project-detail autoplay marquee with an accessible manual coverflow carousel that supports drag, swipe, keyboard navigation, indicator dots, infinite wrapping, and a static one-image fallback.

**Architecture:** Keep `getProjectGallery(project)` as the JSON-to-gallery boundary. Add pure carousel math helpers for wrapping and gesture decisions, then make `ProjectGallery` a client component that owns the active index and pointer state. CSS positions the active and neighboring images as a responsive coverflow without adding a carousel dependency.

**Tech Stack:** Next.js 16.2.10 App Router, React 19.2.4, TypeScript, CSS, Node test runner

## Global Constraints

- The carousel never advances automatically.
- Pagination dots show position only and cannot be clicked.
- A project with one image has no gestures, side previews, or dots.
- The last and first images wrap in both directions.
- Keep vertical touch scrolling available with `touch-action: pan-y`.
- Preserve keyboard access, meaningful active-image alt text, visible focus, and `prefers-reduced-motion` behavior.
- Add no new dependency and do not change the project JSON schema.
- Read the relevant Next.js 16.2.10 guides in `node_modules/next/dist/docs/` before changing Next.js component code.

---

### Task 1: Carousel math and gesture decisions

**Files:**
- Create: `lib/project-carousel.ts`
- Create: `lib/project-carousel.test.mjs`

**Interfaces:**
- Produces: `wrapProjectIndex(index: number, total: number): number`
- Produces: `getCircularOffset(index: number, activeIndex: number, total: number): number`
- Produces: `getSwipeStep(deltaX: number, elapsedMs: number, viewportWidth: number): -1 | 0 | 1`

- [ ] **Step 1: Write failing tests for wrapping, circular positions, and gesture thresholds**

```js
import assert from "node:assert/strict";
import test from "node:test";

import {
  getCircularOffset,
  getSwipeStep,
  wrapProjectIndex,
} from "./project-carousel.ts";

test("wraps project indices in both directions", () => {
  assert.equal(wrapProjectIndex(3, 3), 0);
  assert.equal(wrapProjectIndex(-1, 3), 2);
});

test("returns the shortest circular offset from the active image", () => {
  assert.equal(getCircularOffset(0, 4, 5), 1);
  assert.equal(getCircularOffset(4, 0, 5), -1);
  assert.equal(getCircularOffset(3, 0, 5), -2);
});

test("turns a deliberate horizontal gesture into one carousel step", () => {
  assert.equal(getSwipeStep(-90, 300, 900), 1);
  assert.equal(getSwipeStep(90, 300, 900), -1);
  assert.equal(getSwipeStep(15, 300, 900), 0);
  assert.equal(getSwipeStep(-35, 50, 900), 1);
});
```

- [ ] **Step 2: Run the focused test and verify RED**

Run:

```bash
node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --experimental-strip-types --test lib/project-carousel.test.mjs
```

Expected: FAIL because `lib/project-carousel.ts` does not exist.

- [ ] **Step 3: Implement the pure helpers**

```ts
export function wrapProjectIndex(index: number, total: number) {
  if (total <= 0) return 0;
  return ((index % total) + total) % total;
}

export function getCircularOffset(index: number, activeIndex: number, total: number) {
  if (total <= 1) return 0;
  const forwardOffset = wrapProjectIndex(index - activeIndex, total);
  return forwardOffset > total / 2 ? forwardOffset - total : forwardOffset;
}

export function getSwipeStep(
  deltaX: number,
  elapsedMs: number,
  viewportWidth: number,
): -1 | 0 | 1 {
  const distanceThreshold = Math.max(48, viewportWidth * 0.08);
  const velocity = Math.abs(deltaX) / Math.max(elapsedMs, 1);

  if (Math.abs(deltaX) < distanceThreshold && velocity < 0.45) return 0;
  return deltaX < 0 ? 1 : -1;
}
```

- [ ] **Step 4: Run the focused test and verify GREEN**

Run the Step 2 command. Expected: 3 tests pass.

- [ ] **Step 5: Commit the logic**

```bash
git add lib/project-carousel.ts lib/project-carousel.test.mjs
git commit -m "test: define project carousel behavior"
```

---

### Task 2: Manual project gallery interaction

**Files:**
- Modify: `components/project-gallery.tsx`
- Modify: `lib/project-carousel.ts`
- Test: `lib/project-carousel.test.mjs`

**Interfaces:**
- Consumes: `getProjectGallery(project): ProjectImage[]`
- Consumes: `wrapProjectIndex`, `getCircularOffset`, and `getSwipeStep` from Task 1
- Produces: `getKeyboardStep(key: string): -1 | 0 | 1`
- Produces: `ProjectGallery({ project }: { project: Project })`

- [ ] **Step 1: Add a failing keyboard-action test to the pure navigation contract**

Import `getKeyboardStep` from `project-carousel.ts`, then append:

```js
test("maps only horizontal arrow keys to navigation steps", () => {
  assert.equal(getKeyboardStep("ArrowRight"), 1);
  assert.equal(getKeyboardStep("ArrowLeft"), -1);
  assert.equal(getKeyboardStep("Enter"), 0);
});
```

Run the focused test. Expected: FAIL because `getKeyboardStep` is not exported.

- [ ] **Step 2: Convert `ProjectGallery` to a client component**

Add the keyboard helper to `lib/project-carousel.ts`:

```ts
export function getKeyboardStep(key: string): -1 | 0 | 1 {
  if (key === "ArrowRight") return 1;
  if (key === "ArrowLeft") return -1;
  return 0;
}
```

Then add `"use client"`, React state and refs, and imports for the carousel helpers. Keep the one-image branch before the interactive markup:

```tsx
const images = getProjectGallery(project);
const [activeIndex, setActiveIndex] = useState(0);
const [dragX, setDragX] = useState(0);
const [isDragging, setIsDragging] = useState(false);
const pointerStart = useRef({ x: 0, time: 0, pointerId: -1 });

if (images.length === 1) {
  return <StaticProjectImage image={images[0]} />;
}
```

- [ ] **Step 3: Implement pointer navigation without autoplay**

Use pointer capture and apply at most one step on release:

```tsx
function finishPointerGesture(currentX: number) {
  const elapsedMs = performance.now() - pointerStart.current.time;
  const step = getSwipeStep(
    currentX - pointerStart.current.x,
    elapsedMs,
    galleryRef.current?.clientWidth ?? window.innerWidth,
  );

  if (step !== 0) {
    setActiveIndex((current) => wrapProjectIndex(current + step, images.length));
  }

  setDragX(0);
  setIsDragging(false);
}
```

Implement `onPointerDown`, `onPointerMove`, `onPointerUp`, and `onPointerCancel`. Ignore non-primary mouse buttons and release pointer capture after finishing.

- [ ] **Step 4: Add keyboard navigation and accessible state**

Make the interactive gallery focusable and handle Arrow keys:

```tsx
function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
  const step = getKeyboardStep(event.key);
  if (step === 0) return;
  event.preventDefault();
  setActiveIndex((current) => wrapProjectIndex(current + step, images.length));
}
```

Use `role="region"`, `aria-roledescription="carousel"`, `tabIndex={0}`, an updating `aria-label`, and an `aria-live="polite"` status containing `Image {activeIndex + 1} of {images.length}`.

- [ ] **Step 5: Render circular card positions and non-clickable dots**

For each image, calculate `offset = getCircularOffset(index, activeIndex, images.length)`, expose it as `data-offset`, and set `aria-hidden={offset !== 0}`. Render dots as spans:

```tsx
<div className="project-gallery-dots" aria-hidden="true">
  {images.map((image, index) => (
    <span
      className={`project-gallery-dot${index === activeIndex ? " is-active" : ""}`}
      key={image.src}
    />
  ))}
</div>
```

Do not render timers, arrow buttons, click handlers on dots, or duplicated autoplay groups.

- [ ] **Step 6: Run focused tests and TypeScript build**

```bash
node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --experimental-strip-types --test lib/project-carousel.test.mjs lib/projects-gallery.test.mjs
npm run build
```

Expected: focused tests and Next.js compilation pass.

- [ ] **Step 7: Commit the component**

```bash
git add components/project-gallery.tsx lib/project-carousel.ts lib/project-carousel.test.mjs
git commit -m "feat: add manual project coverflow navigation"
```

---

### Task 3: Responsive coverflow styling

**Files:**
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: `.project-gallery-stage`, `.project-gallery-card[data-offset]`, `.project-gallery-dots`, `.project-gallery-dot`, and `.is-dragging` emitted by Task 2
- Produces: centered active card, side previews, drag feedback, focus state, responsive sizing, and reduced-motion fallback

- [ ] **Step 1: Replace autoplay-track styles with a stage layout**

Remove `.project-gallery-track`, `.project-gallery-group`, duplicate-group rules, and `@keyframes project-gallery-loop`. Add a contained stage:

```css
.project-gallery {
  position: relative;
  overflow: hidden;
  background: var(--surface);
  touch-action: pan-y;
  user-select: none;
}

.project-gallery-stage {
  position: relative;
  min-height: clamp(22rem, 50vw, 38rem);
}

.project-gallery-card {
  position: absolute;
  top: 50%;
  left: 50%;
  width: min(66%, 46rem);
  height: 82%;
  transform: translate(calc(-50% + var(--project-gallery-drag, 0px)), -50%);
  transition: left 480ms cubic-bezier(0.22, 1, 0.36, 1), width 480ms cubic-bezier(0.22, 1, 0.36, 1), height 480ms cubic-bezier(0.22, 1, 0.36, 1), opacity 240ms ease, transform 240ms ease;
}
```

- [ ] **Step 2: Define active and side card positions**

Use cropped side cards rather than horizontally stretching images:

```css
.project-gallery-card[data-offset="0"] { z-index: 5; }
.project-gallery-card[data-offset="-1"] { left: 16%; width: 10%; height: 64%; z-index: 4; }
.project-gallery-card[data-offset="1"] { left: 84%; width: 10%; height: 64%; z-index: 4; }
.project-gallery-card[data-offset="-2"] { left: 4%; width: 4%; height: 46%; z-index: 3; }
.project-gallery-card[data-offset="2"] { left: 96%; width: 4%; height: 46%; z-index: 3; }
.project-gallery-card[data-hidden="true"] { opacity: 0; pointer-events: none; }
```

Keep `object-fit: cover`, use a responsive border radius, and remove the visible cover-image badge.

- [ ] **Step 3: Add drag, focus, and pagination-dot styles**

```css
.project-gallery:not(.project-gallery-single) { cursor: grab; }
.project-gallery.is-dragging { cursor: grabbing; }
.project-gallery.is-dragging .project-gallery-card { transition: none; }
.project-gallery:focus-visible { outline: 2px solid var(--accent); outline-offset: 4px; }
.project-gallery-dots { display: flex; justify-content: center; gap: 0.5rem; padding: 1rem 0 1.25rem; }
.project-gallery-dot { width: 0.42rem; height: 0.42rem; border-radius: 50%; background: var(--line); }
.project-gallery-dot.is-active { width: 1.25rem; border-radius: 999px; background: var(--foreground); }
```

- [ ] **Step 4: Add mobile and reduced-motion behavior**

At the existing mobile breakpoint, increase the active card to about 78% width and keep only a small previous/next peek. In `prefers-reduced-motion`, set card transition duration to `0.01ms`; retain pointer and keyboard navigation.

- [ ] **Step 5: Verify styles at representative widths**

Check at approximately 1440px, 768px, and 390px:

- active image remains centered and readable;
- previous and next images peek without causing horizontal page overflow;
- vertical scrolling still works after a mostly vertical touch gesture;
- the active dot changes after drag/swipe and keyboard navigation;
- a one-image project shows no dots or side previews.

- [ ] **Step 6: Commit the responsive styles**

```bash
git add app/globals.css
git commit -m "style: add responsive project coverflow"
```

---

### Task 4: Full verification

**Files:**
- Verify: `components/project-gallery.tsx`
- Verify: `lib/project-carousel.ts`
- Verify: `app/globals.css`
- Verify: `data/projects.json`

**Interfaces:**
- Consumes: the completed gallery behavior from Tasks 1-3
- Produces: verification evidence and a clean handoff

- [ ] **Step 1: Run all project tests**

```bash
npm test
```

Expected: all gallery tests pass. If unrelated existing data assertions fail, record their exact names and output without changing unrelated data.

- [ ] **Step 2: Run lint**

```bash
npm run lint
```

Expected: no new lint errors. Report any unrelated existing lint finding separately.

- [ ] **Step 3: Run the production build**

```bash
npm run build
```

Expected: exit code 0 and all project routes generated.

- [ ] **Step 4: Check the final diff**

```bash
git diff --check
git status --short
```

Expected: no whitespace errors and only intentional implementation files changed.

- [ ] **Step 5: Commit any final corrections**

```bash
git add components/project-gallery.tsx lib/project-carousel.ts lib/project-carousel.test.mjs app/globals.css
git commit -m "fix: finalize project coverflow carousel"
```

Skip this commit when verification requires no correction.
