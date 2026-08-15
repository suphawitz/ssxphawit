# Project Gallery Lightbox Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enlarge project images on desktop and add an accessible full-screen lightbox with manual swipe, drag, keyboard navigation, and infinite wrapping.

**Architecture:** Keep `ProjectGallery` as the owner of the ordered images and active index. Add a focused `ProjectLightbox` client component driven by props, reuse the existing carousel helpers for navigation, and add one pure helper for distinguishing a click from a drag. Use native `<dialog>` for modal behavior and CSS-only responsive sizing without new dependencies.

**Tech Stack:** Next.js 16.2.10 App Router, React 19.2.4, TypeScript, native HTML dialog, CSS, Node test runner

## Global Constraints

- Apply gallery size changes only above the existing 800px mobile breakpoint.
- Preserve the approved mobile coverflow dimensions and interaction.
- Open the lightbox only from the active image and suppress opening after a drag.
- Support swipe, pointer drag, Left Arrow, Right Arrow, and infinite wrapping in multi-image lightboxes.
- A one-image project can open the lightbox but has no navigation or dots.
- Close through the visible Close button, Escape, or direct backdrop click.
- Keep dots non-interactive and never autoplay.
- Preserve meaningful alt text, focus return, visible focus, and `prefers-reduced-motion` behavior.
- Add no dependency and do not change project JSON or unrelated project-detail content.
- Read relevant Next.js 16.2.10 documentation before changing client component or `next/image` code.

---

### Task 1: Click-versus-drag contract

**Files:**
- Modify: `lib/project-carousel.ts`
- Modify: `lib/project-carousel.test.mjs`

**Interfaces:**
- Produces: `isProjectGalleryClick(deltaX: number, deltaY: number): boolean`
- Existing: `wrapProjectIndex`, `getCircularOffset`, `getSwipeStep`, and `getKeyboardStep`

- [ ] **Step 1: Write the failing classification test**

Import `isProjectGalleryClick` and append:

```js
test("distinguishes a click from a dragged gallery image", () => {
  assert.equal(isProjectGalleryClick(0, 0), true);
  assert.equal(isProjectGalleryClick(5, 4), true);
  assert.equal(isProjectGalleryClick(10, 1), false);
  assert.equal(isProjectGalleryClick(1, -10), false);
});
```

- [ ] **Step 2: Run the focused test and verify RED**

```bash
node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --experimental-strip-types --test lib/project-carousel.test.mjs
```

Expected: FAIL because `isProjectGalleryClick` is not exported.

- [ ] **Step 3: Implement the minimal helper**

```ts
export function isProjectGalleryClick(deltaX: number, deltaY: number) {
  return Math.hypot(deltaX, deltaY) <= 8;
}
```

- [ ] **Step 4: Run the focused test and verify GREEN**

Run the Step 2 command. Expected: all carousel tests pass.

- [ ] **Step 5: Commit the contract**

```bash
git add lib/project-carousel.ts lib/project-carousel.test.mjs
git commit -m "test: define gallery click gesture"
```

---

### Task 2: Native dialog lightbox

**Files:**
- Create: `components/project-lightbox.tsx`

**Interfaces:**
- Consumes: `ProjectImage[]`, `getSwipeStep`, and `getKeyboardStep`
- Produces: `ProjectLightboxProps`
- Produces: `ProjectLightbox({ images, activeIndex, isOpen, onClose, onNavigate }: ProjectLightboxProps)`

- [ ] **Step 1: Create the lightbox prop boundary**

```tsx
export type ProjectLightboxProps = {
  activeIndex: number;
  images: ProjectImage[];
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (step: -1 | 1) => void;
};
```

- [ ] **Step 2: Synchronize native dialog state**

Add `"use client"`, a `dialogRef`, and an effect:

```tsx
useEffect(() => {
  const dialog = dialogRef.current;
  if (!dialog) return;

  if (isOpen && !dialog.open) dialog.showModal();
  if (!isOpen && dialog.open) dialog.close();
}, [isOpen]);
```

Use `onClose={onClose}` so Escape and programmatic close synchronize React state.

- [ ] **Step 3: Add keyboard and pointer navigation**

For keyboard navigation, reuse `getKeyboardStep` and call `onNavigate(step)` only when `images.length > 1`.

For pointer navigation, store pointer id, x, and start time in a ref. Capture the pointer on down, expose drag distance through `--project-lightbox-drag`, and on release call:

```tsx
const step = getSwipeStep(
  event.clientX - pointerStart.current.x,
  performance.now() - pointerStart.current.time,
  event.currentTarget.clientWidth,
);

if (step !== 0 && images.length > 1) onNavigate(step);
```

Pointer cancellation resets drag state without navigating.

- [ ] **Step 4: Render the active image and close controls**

Render only `images[activeIndex]` with `next/image`, `fill`, `object-fit: contain`, and meaningful alt text. Add:

```tsx
<button
  aria-label="Close expanded project image"
  className="project-lightbox-close"
  onClick={() => dialogRef.current?.close()}
  type="button"
>
  Close <span aria-hidden="true">×</span>
</button>
```

Close on backdrop click only when `event.target === event.currentTarget`. Add non-interactive dots only when `images.length > 1`, plus an `aria-live="polite"` `Image n of total` status.

- [ ] **Step 5: Run targeted lint and focused tests**

```bash
npx eslint components/project-lightbox.tsx lib/project-carousel.ts
node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --experimental-strip-types --test lib/project-carousel.test.mjs lib/projects-gallery.test.mjs
```

Expected: targeted lint and focused tests pass.

- [ ] **Step 6: Commit the lightbox component**

```bash
git add components/project-lightbox.tsx
git commit -m "feat: add project image lightbox"
```

---

### Task 3: Expand controls and drag suppression

**Files:**
- Modify: `components/project-gallery.tsx`
- Modify: `components/project-lightbox.tsx`

**Interfaces:**
- Consumes: `isProjectGalleryClick(deltaX, deltaY)` from Task 1
- Consumes: `ProjectLightbox` from Task 2
- Produces: active-image expand buttons for single- and multi-image galleries

- [ ] **Step 1: Integrate shared active index and open state**

In `ProjectGallery`, add:

```tsx
const [isLightboxOpen, setIsLightboxOpen] = useState(false);

function navigate(step: -1 | 1) {
  setActiveIndex((current) => wrapProjectIndex(current + step, images.length));
}
```

Render `ProjectLightbox` as a sibling after the gallery markup so dialog events do not bubble into coverflow handlers.

- [ ] **Step 2: Track two-dimensional gallery pointer movement**

Extend the gallery pointer start shape with `y`. On pointer release calculate `deltaX` and `deltaY`, then set:

```tsx
suppressExpand.current = !isProjectGalleryClick(deltaX, deltaY);
```

Keep the existing horizontal swipe threshold and reset pointer state after the decision is recorded.

- [ ] **Step 3: Add a real expand button to the active card**

Inside the active card, render:

```tsx
<button
  aria-label={`Expand ${image.alt}`}
  className="project-gallery-expand"
  onClick={() => {
    if (suppressExpand.current) {
      suppressExpand.current = false;
      return;
    }
    setIsLightboxOpen(true);
  }}
  type="button"
>
  <span aria-hidden="true">↗</span>
</button>
```

Side cards remain non-interactive and hidden from assistive technology.

- [ ] **Step 4: Preserve single-image behavior while adding expansion**

Change `StaticProjectImage` to accept `onExpand` and render the same real expand button. Do not attach coverflow pointer, keyboard, or dots to the single-image gallery.

- [ ] **Step 5: Prevent lightbox drag from closing or selecting content**

Disable native image drag, set pointer capture on the lightbox media stage, and ensure the Close button stops propagation before calling `dialog.close()`.

- [ ] **Step 6: Run targeted lint and focused tests**

Run the commands from Task 2 Step 5. Expected: pass.

- [ ] **Step 7: Commit expand behavior**

```bash
git add components/project-gallery.tsx components/project-lightbox.tsx
git commit -m "feat: add gallery expand controls"
```

---

### Task 4: Desktop sizing and lightbox presentation

**Files:**
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: `.project-gallery-stage`, `.project-gallery-card`, `.project-gallery-expand`, `.project-lightbox`, `.project-lightbox-media`, `.project-lightbox-close`, and `.project-lightbox-dots`
- Produces: larger desktop coverflow, unchanged mobile coverflow, full-screen modal presentation, and reduced-motion fallback

- [ ] **Step 1: Increase desktop gallery dimensions only above 800px**

```css
@media (min-width: 801px) {
  .project-gallery-stage {
    min-height: clamp(28rem, 54vw, 42rem);
  }

  .project-gallery-card[data-offset="0"] {
    width: min(78%, 54rem);
    height: 80%;
  }

  .project-gallery-card[data-offset="-1"] { left: 7%; width: 8%; }
  .project-gallery-card[data-offset="1"] { left: 93%; width: 8%; }
}
```

Leave the existing `@media (max-width: 800px)` gallery dimensions unchanged.

- [ ] **Step 2: Style the expand control**

```css
.project-gallery-expand {
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  z-index: 2;
  display: grid;
  width: 2.75rem;
  height: 2.75rem;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.45);
  border-radius: 50%;
  background: rgba(251, 250, 246, 0.82);
  color: var(--foreground);
  cursor: zoom-in;
}

.project-gallery-expand:hover,
.project-gallery-expand:focus-visible {
  background: var(--background);
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}
```

- [ ] **Step 3: Style native dialog and backdrop**

```css
.project-lightbox {
  width: 100vw;
  max-width: none;
  height: 100dvh;
  max-height: none;
  margin: 0;
  border: 0;
  padding: clamp(1rem, 3vw, 2.5rem);
  background: rgba(12, 12, 12, 0.96);
  color: #fff;
}

.project-lightbox::backdrop {
  background: rgba(0, 0, 0, 0.76);
}

.project-lightbox-media {
  position: relative;
  width: 100%;
  height: calc(100dvh - clamp(5rem, 10vw, 8rem));
  touch-action: pan-y;
}

.project-lightbox-media img { object-fit: contain; }
```

- [ ] **Step 4: Add Close button, dots, and motion styles**

```css
.project-lightbox-close {
  position: absolute;
  top: clamp(1rem, 3vw, 2rem);
  right: clamp(1rem, 3vw, 2rem);
  z-index: 3;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 999px;
  padding: 0.7rem 1rem;
  background: rgba(0, 0, 0, 0.42);
  color: #fff;
}

.project-lightbox-dots {
  position: absolute;
  bottom: clamp(1rem, 3vw, 2rem);
  left: 50%;
  display: flex;
  gap: 0.5rem;
  transform: translateX(-50%);
}

.project-lightbox[open] .project-lightbox-media {
  animation: project-lightbox-enter 220ms ease-out both;
}

@keyframes project-lightbox-enter {
  from { opacity: 0; transform: scale(0.985); }
  to { opacity: 1; transform: scale(1); }
}

@media (prefers-reduced-motion: reduce) {
  .project-lightbox-media,
  .project-gallery-card {
    animation: none;
    transition-duration: 0.01ms;
  }
}
```

- [ ] **Step 5: Verify no mobile regression in computed dimensions**

At 390px, compare the active card width, gallery width, dots count, and document scroll width with the current accepted values. Confirm the gallery still has no horizontal overflow.

- [ ] **Step 6: Commit presentation changes**

```bash
git add app/globals.css
git commit -m "style: enlarge gallery and add lightbox presentation"
```

---

### Task 5: Browser and build verification

**Files:**
- Verify: `components/project-gallery.tsx`
- Verify: `components/project-lightbox.tsx`
- Verify: `lib/project-carousel.ts`
- Verify: `app/globals.css`

**Interfaces:**
- Consumes: completed Tasks 1-4
- Produces: verification evidence and clean Git status

- [ ] **Step 1: Verify desktop behavior at approximately 1440px**

- Confirm the active gallery card is materially larger than the prior roughly 66% layout.
- Click the active card and confirm the native dialog opens with the complete image visible.
- Swipe and use Arrow keys through last-to-first and first-to-last wrapping.
- Confirm dots update but cannot receive focus or clicks.
- Close through Close, Escape, and backdrop; confirm focus returns to the expand button.

- [ ] **Step 2: Verify mobile and one-image behavior at approximately 390px**

- Confirm existing coverflow dimensions and no horizontal overflow.
- Open and close the multi-image lightbox with touch-sized controls.
- Open a one-image project and confirm no dots or navigation are rendered.

- [ ] **Step 3: Check browser console**

Confirm there are no new hydration, image-parent-position, dialog, or event-handler warnings from the changed components.

- [ ] **Step 4: Run focused and full verification**

```bash
node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --experimental-strip-types --test lib/project-carousel.test.mjs lib/projects-gallery.test.mjs
npx eslint components/project-gallery.tsx components/project-lightbox.tsx lib/project-carousel.ts lib/project-carousel.test.mjs
npm test
npm run lint
npm run build
git diff --check
git status --short
```

Expected: focused checks and production build pass. Report the existing experience-count, marquee-data, and `project-index.tsx` apostrophe failures separately if they remain unchanged.

- [ ] **Step 5: Commit final corrections only if required**

```bash
git add components/project-gallery.tsx components/project-lightbox.tsx lib/project-carousel.ts lib/project-carousel.test.mjs app/globals.css
git commit -m "fix: finalize project gallery lightbox"
```

Skip this commit when verification requires no correction.
