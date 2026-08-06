import assert from "node:assert/strict";
import test from "node:test";

import {
  articleLines,
  getScrollProgress,
  getTechStackRows,
  techStack,
} from "../lib/portfolio.ts";

test("contains article lines for progressive scroll emphasis", () => {
  const wordCount = articleLines
    .map((line) => line.text)
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;

  assert.ok(wordCount >= 55 && wordCount <= 65);
  assert.ok(articleLines.length <= 4);
  assert.equal(articleLines[0]?.emphasis, "strong");
  assert.equal(articleLines.at(-1)?.emphasis, "soft");
});

test("creates two opposing marquee rows from the tech stack", () => {
  const rows = getTechStackRows(techStack);

  assert.equal(rows.length, 2);
  assert.ok(rows.every((row) => row.items.length >= techStack.length));
  assert.notEqual(rows[0]?.direction, rows[1]?.direction);
});

test("maps article line position to a bounded scroll progress", () => {
  assert.equal(getScrollProgress(900, 1000), 0);
  assert.equal(getScrollProgress(100, 1000), 1);
  assert.equal(getScrollProgress(500, 1000), 0.5);
});
