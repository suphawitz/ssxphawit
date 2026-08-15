# Project Gallery Lightbox Design

## Goal

Increase the visual prominence of project images on desktop and let visitors open any active project image in an accessible full-screen lightbox. Preserve the approved mobile coverflow layout and all existing JSON-driven gallery behavior.

## Desktop Gallery Sizing

- Apply sizing changes only above the existing 800px mobile breakpoint.
- Increase the active coverflow card from roughly 66% to roughly 78% of the available gallery width.
- Increase the desktop stage height enough to keep the larger image balanced with its side previews.
- Reposition the previous and next previews so they remain visibly cropped at both edges without introducing horizontal page overflow.
- Keep the existing mobile card size, stage height, side peeks, dots, and swipe behavior unchanged.

## Lightbox Interaction

- Clicking the active image opens a full-screen native `<dialog>` lightbox.
- The lightbox uses a dark translucent backdrop and displays the active image with `object-fit: contain`, preserving the complete image.
- The gallery and lightbox share one active index. Opening the lightbox shows the image currently selected in the coverflow.
- Multi-image projects support horizontal swipe, pointer drag, Left Arrow, and Right Arrow navigation inside the lightbox.
- Lightbox navigation wraps infinitely in both directions and never advances automatically.
- Indicator dots mirror the project image count and active image but remain non-interactive.
- A one-image project can open the lightbox, but it has no swipe navigation or dots.

## Opening and Closing

- The active gallery image exposes a clear expand action and pointer cursor.
- A small pointer movement counts as a click; a completed carousel drag suppresses the following click so the lightbox does not open accidentally.
- The lightbox closes through its visible Close button, the Escape key, or a click directly on the backdrop.
- Closing returns focus to the expand control that opened the lightbox.
- Native modal behavior prevents interaction with the underlying page while open.

## Component Architecture

- Keep `ProjectGallery` as the single client boundary and source of `activeIndex`.
- Add a focused `ProjectLightbox` component in its own file. It receives the ordered images, active index, navigation callback, open state, and close callback.
- Reuse the pure carousel helpers for wrapping, keyboard steps, and swipe thresholds rather than duplicating navigation math.
- Add a pure drag-versus-click helper so suppression behavior can be verified independently.
- Keep project data and `getProjectGallery(project)` unchanged.

## Accessibility

- Use native `<dialog>.showModal()` and `<dialog>.close()` for modal semantics and focus containment.
- Give the dialog an accessible label and expose `Image n of total` through a polite live region.
- The visible Close button has an explicit accessible name and a clear focus style.
- Only the active lightbox image exposes meaningful alt text.
- Gallery expand controls are real buttons, not clickable generic elements.
- Keyboard navigation is active only while the lightbox or gallery has focus.

## Motion and Responsive Behavior

- Preserve the existing coverflow transition outside the lightbox.
- Use a short opacity and scale entrance for the lightbox content.
- Remove lightbox and gallery transitions under `prefers-reduced-motion` while keeping all manual controls functional.
- Keep the mobile coverflow dimensions unchanged; the lightbox itself uses safe viewport padding and adapts to portrait screens.

## Error and Edge Cases

- If an image fails to load, its existing alt text remains available through `next/image`.
- Repeated open and close cycles must not leave the page locked or the dialog in an invalid state.
- Pointer cancellation resets drag state without navigating or opening the lightbox.
- Navigation is omitted when the ordered gallery contains one image.

## Testing and Verification

- Test drag-versus-click classification and reuse the existing wrapping, keyboard, and swipe tests.
- Verify click-to-open, backdrop/Escape/Close behavior, focus return, arrow navigation, swipe navigation, and infinite wrapping in a browser.
- Verify one-image lightbox behavior separately.
- Check desktop around 1440px and mobile around 390px, confirming the mobile carousel dimensions do not regress.
- Run focused tests, targeted lint, full tests, full lint, and a production build. Report unrelated existing failures separately.

## Out of Scope

- Image captions, zoom/pan controls, downloads, clickable dots, autoplay, thumbnails, route-based modals, and new dependencies.
- Changes to project JSON, project cards, or unrelated project-detail sections.
