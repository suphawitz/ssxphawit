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
