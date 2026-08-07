import assert from "node:assert/strict";
import test from "node:test";

import {
  articleLines,
  getToolIconRows,
  toolIcons,
} from "../lib/portfolio.ts";

test("contains article lines for progressive scroll emphasis", () => {
  const wordCount = articleLines
    .map((line) => line.text)
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;

  assert.ok(wordCount >= 30 && wordCount <= 60);
  assert.ok(articleLines.length <= 4);
  assert.ok(articleLines.some((line) => line.emphasis === "strong"));
  assert.equal(articleLines.at(-1)?.emphasis, "soft");
});

test("creates two opposing marquee rows from the tool icons", () => {
  const rows = getToolIconRows(toolIcons);

  assert.equal(rows.length, 2);
  assert.equal(toolIcons.length, 9);
  assert.ok(rows.every((row) => row.items.length >= toolIcons.length));
  assert.notEqual(rows[0]?.direction, rows[1]?.direction);
});
