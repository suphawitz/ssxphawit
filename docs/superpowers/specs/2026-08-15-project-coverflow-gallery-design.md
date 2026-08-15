# Project Coverflow Gallery Design

## Goal

Replace the automatically moving project-detail marquee with a manual coverflow carousel inspired by the supplied reference. The gallery must keep the existing JSON-driven image and cover-image model while making the active project image easy to inspect.

## Visual Design

- The active image is centered, largest, and shown with a wide rounded frame.
- The previous and next images remain visible at the sides as progressively narrower, rounded previews.
- Side previews are decorative context rather than separate controls.
- Pagination dots sit below the gallery. There is one dot per image, and only the active dot is emphasized.
- Dots are indicators only and cannot be clicked.
- The selected `coverImage` is the initial active image. It does not receive a separate visible badge.
- A one-image project renders one centered image with no side previews or pagination dots.

## Interaction

- The carousel never advances automatically.
- Touch users swipe horizontally and pointer users drag horizontally to move one image at a time.
- A completed swipe or drag advances when it crosses a distance or velocity threshold; otherwise the active image settles back into place.
- Moving forward from the last image wraps to the first image, and moving backward from the first wraps to the last.
- The focused carousel also responds to the Left and Right Arrow keys for keyboard access.
- While dragging, the browser keeps vertical page scrolling available and suppresses accidental image dragging or text selection.

## Component Architecture

- `ProjectGallery` becomes a client component responsible for active index, drag state, pointer events, and keyboard events.
- `getProjectGallery(project)` remains the source of the ordered image list, so `coverImage`, `gallery`, and the existing `image` fallback continue to work without changing `projects.json`.
- A small pure positioning helper maps each image to its shortest circular offset from the active image. This keeps infinite wrapping predictable and testable without cloning the entire gallery.
- CSS custom properties carry each card's offset and drag progress into the coverflow transform, keeping visual calculations in CSS and state transitions in React.

## Responsive Behavior

- Desktop shows the active card plus up to two compact previews on each side when enough images exist.
- Mobile shows the active image with a smaller peek of the immediate previous and next images.
- Card dimensions use responsive `clamp()` values and remain inside the project-detail content width.
- Touch interaction uses Pointer Events so the same implementation supports mouse, touch, and pen.

## Accessibility and Motion

- The gallery is a labelled carousel region and announces the active image position as `Image n of total`.
- Only the active image exposes meaningful alternative text; side previews are hidden from assistive technology until active.
- The carousel receives keyboard focus with a visible focus style.
- Pagination dots use non-interactive elements with an accessible current-state marker.
- With `prefers-reduced-motion`, transitions are removed while manual navigation and infinite wrapping remain available.

## Testing and Verification

- Unit-test circular offset calculation, including wrapping at both ends.
- Unit-test the existing one-image fallback and cover-image ordering.
- Verify drag/swipe, keyboard navigation, dots, and single-image behavior at desktop and mobile widths.
- Run the focused tests, `npm run lint`, and `npm run build`, reporting any unrelated existing failures separately.

## Out of Scope

- Autoplay, timers, arrow buttons, clickable dots, captions, modal lightboxes, and new dependencies.
- Changes to project data shape or unrelated project-detail content.
