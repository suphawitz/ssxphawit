export function wrapProjectIndex(index: number, total: number) {
  if (total <= 0) return 0;
  return ((index % total) + total) % total;
}

export function getCircularOffset(index: number, activeIndex: number, total: number) {
  if (total <= 1) return 0;

  const forwardOffset = wrapProjectIndex(index - activeIndex, total);
  return forwardOffset > total / 2 ? forwardOffset - total : forwardOffset;
}

export function getSideCardStep(offset: number): -1 | 0 | 1 {
  if (offset === -1) return -1;
  if (offset === 1) return 1;
  return 0;
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

export function getKeyboardStep(key: string): -1 | 0 | 1 {
  if (key === "ArrowRight") return 1;
  if (key === "ArrowLeft") return -1;
  return 0;
}

export function isProjectGalleryClick(deltaX: number, deltaY: number) {
  return Math.hypot(deltaX, deltaY) <= 8;
}

export function shouldCaptureProjectGalleryPointer(
  deltaX: number,
  deltaY: number,
  isInteractiveControl = false,
) {
  if (isInteractiveControl) return false;
  return !isProjectGalleryClick(deltaX, deltaY);
}
