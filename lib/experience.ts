import experiencesJson from "../data/experience.json" with { type: "json" };
import type { Experience } from "../types/experience";

const experiences = experiencesJson as Experience[];

export function getExperiences(): Experience[] {
  return experiences;
}
