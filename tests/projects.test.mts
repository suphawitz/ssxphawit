import assert from "node:assert/strict";
import test from "node:test";

import {
  getFeaturedProjects,
  getProjectBySlug,
  getProjects,
} from "../lib/projects.ts";

test("loads all project records from JSON", () => {
  const projects = getProjects();

  assert.equal(projects.length, 5);
  assert.equal(projects[0]?.slug, "aurora-dashboard");
});

test("returns only featured projects for the homepage", () => {
  const featuredProjects = getFeaturedProjects();

  assert.equal(featuredProjects.length, 3);
  assert.ok(featuredProjects.every((project) => project.featured));
});

test("finds a project by slug and returns undefined for an unknown slug", () => {
  assert.equal(getProjectBySlug("field-notes")?.title, "Field Notes");
  assert.equal(getProjectBySlug("missing-project"), undefined);
});
