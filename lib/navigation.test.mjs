import assert from "node:assert/strict";
import test from "node:test";

import { canNavigateBack } from "./navigation.ts";

test("uses browser history when a previous page exists", () => {
  assert.equal(canNavigateBack(2), true);
});

test("uses the fallback when the detail page has no previous history", () => {
  assert.equal(canNavigateBack(1), false);
});
