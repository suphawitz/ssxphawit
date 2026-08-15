import assert from "node:assert/strict";
import test from "node:test";

import {
  getCircularOffset,
  getKeyboardStep,
  getSwipeStep,
  isProjectGalleryClick,
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

test("maps only horizontal arrow keys to navigation steps", () => {
  assert.equal(getKeyboardStep("ArrowRight"), 1);
  assert.equal(getKeyboardStep("ArrowLeft"), -1);
  assert.equal(getKeyboardStep("Enter"), 0);
});

test("distinguishes a click from a dragged gallery image", () => {
  assert.equal(isProjectGalleryClick(0, 0), true);
  assert.equal(isProjectGalleryClick(5, 4), true);
  assert.equal(isProjectGalleryClick(10, 1), false);
  assert.equal(isProjectGalleryClick(1, -10), false);
});
