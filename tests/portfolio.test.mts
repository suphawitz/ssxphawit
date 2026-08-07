import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { resolve } from "node:path";

import {
  articleLines,
  getScrollProgress,
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

test("maps article line position to a clamped scroll progress", () => {
  assert.equal(getScrollProgress(900, 1000), 0);
  assert.equal(getScrollProgress(500, 1000), 0.5);
  assert.equal(getScrollProgress(100, 1000), 1);
});

test("keeps the centered portrait bento content anchors", () => {
  const source = readFileSync(
    resolve(process.cwd(), "components/about-section.tsx"),
    "utf8",
  );

  for (const anchor of [
    "/profile.jpg",
    "Selected projects",
    "Core frontend stack",
    "Available for software-house teams",
    "about-photo-card",
  ]) {
    assert.ok(source.includes(anchor), `missing About anchor: ${anchor}`);
  }
});
