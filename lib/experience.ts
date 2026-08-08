import experiencesJson from "../data/experience.json" with { type: "json" };
import type { Experience } from "../types/experience";

const experiences = experiencesJson as Experience[];

export function getExperiences(): Experience[] {
  return experiences;
}

export interface ExperiencePosition {
  id: string;
  center: number;
}

export function getNearestExperienceId(
  positions: ExperiencePosition[],
  focusLine: number,
): string {
  return positions.reduce((nearest, current) => {
    if (!nearest) return current;

    const nearestDistance = Math.abs(nearest.center - focusLine);
    const currentDistance = Math.abs(current.center - focusLine);

    return currentDistance < nearestDistance ? current : nearest;
  }, positions[0] as ExperiencePosition | undefined)?.id ?? "";
}
