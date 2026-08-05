import assert from "node:assert/strict";
import test from "node:test";

import {
  articleLines,
  getTechStackRows,
  techStack,
} from "../lib/portfolio.ts";

test("contains article lines for progressive scroll emphasis", () => {
  assert.equal(articleLines.length, 5);
  assert.equal(articleLines[0]?.emphasis, "strong");
  assert.equal(articleLines.at(-1)?.emphasis, "soft");
});

test("creates two opposing marquee rows from the tech stack", () => {
  const rows = getTechStackRows(techStack);

  assert.equal(rows.length, 2);
  assert.ok(rows.every((row) => row.items.length >= techStack.length));
  assert.notEqual(rows[0]?.direction, rows[1]?.direction);
});
