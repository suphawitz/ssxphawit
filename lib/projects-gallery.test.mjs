import assert from "node:assert/strict";
import test from "node:test";

import { getProjectGallery } from "./projects.ts";

test("puts the selected cover image first in the project gallery", () => {
  const gallery = getProjectGallery({
    image: "/projects/fallback.png",
    imageAlt: "Fallback image",
    coverImage: "/projects/cover.svg",
    gallery: [
      { src: "/projects/detail.svg", alt: "Detail image" },
      { src: "/projects/cover.svg", alt: "Cover image" },
    ],
  });

  assert.deepEqual(gallery, [
    { src: "/projects/cover.svg", alt: "Cover image" },
    { src: "/projects/detail.svg", alt: "Detail image" },
  ]);
});

test("falls back to the existing project image when no gallery is provided", () => {
  assert.deepEqual(getProjectGallery({
    image: "/projects/fallback.png",
    imageAlt: "Fallback image",
  }), [
    { src: "/projects/fallback.png", alt: "Fallback image" },
  ]);
});

test("keeps a one-image project as a single gallery item", () => {
  const gallery = getProjectGallery({
    image: "/projects/cover.png",
    imageAlt: "Cover image",
    gallery: [{ src: "/projects/cover.png", alt: "Cover image" }],
  });

  assert.equal(gallery.length, 1);
});
