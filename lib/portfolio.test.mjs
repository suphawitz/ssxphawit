import assert from "node:assert/strict";
import test from "node:test";

import { getTechStackRows, toolIcons } from "./portfolio.ts";

test("builds distinct frontend and tools marquee rows", () => {
  const rows = getTechStackRows(toolIcons);
  const frontendNames = rows[0].items.map((item) => item.name);
  const toolNames = rows[1].items.map((item) => item.name);

  assert.deepEqual(frontendNames, [
    "HTML5",
    "CSS3",
    "JavaScript",
    "React",
    "Next.js",
  ]);
  assert.deepEqual(toolNames, ["Figma", "GitHub", "GPT", "Supabase"]);
  assert.equal(frontendNames.some((name) => toolNames.includes(name)), false);
});
