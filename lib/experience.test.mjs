import assert from "node:assert/strict";
import test from "node:test";

import { getExperiences, getNearestExperienceId } from "./experience.ts";

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

test("selects the chapter nearest to the scroll focus line", () => {
  const activeId = getNearestExperienceId([
    { id: "frontend-developer", center: 229 },
    { id: "independent-builder", center: 332 },
    { id: "digital-business-student", center: 435 },
  ], 324);

  assert.equal(activeId, "independent-builder");
});
