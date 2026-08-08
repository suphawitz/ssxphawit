import assert from "node:assert/strict";
import test from "node:test";

import { getExperiences } from "./experience.ts";

test("loads the ordered experience chapters", () => {
  const experiences = getExperiences();

  assert.equal(experiences.length, 3);
  assert.deepEqual(experiences.map((item) => item.id), [
    "frontend-developer",
    "independent-builder",
    "digital-business-student",
  ]);
  assert.ok(experiences.every((item) => item.contributions.length > 0));
});
