import assert from "node:assert/strict";
import test from "node:test";

import { heroVideoSource } from "./hero.ts";

test("uses the available seamless hero video asset", () => {
  assert.equal(heroVideoSource, "/seamless-hero.mp4");
});
