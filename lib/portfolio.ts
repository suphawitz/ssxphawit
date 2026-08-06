export type ArticleLine = {
  text: string;
  emphasis: "strong" | "medium" | "soft";
};

export const articleLines: ArticleLine[] = [
  {
    text: "Hi, I’m Suphawit — a frontend developer who cares about how the web feels.",
    emphasis: "strong",
  },
  {
    text: "I turn thoughtful designs into interfaces people can understand and enjoy.",
    emphasis: "medium",
  },
  {
    text: "I work with React, Next.js, and TypeScript to build responsive experiences with clear systems and careful details.",
    emphasis: "medium",
  },
  {
    text: "I’m always looking for the small decision that makes a digital product feel a little more natural.",
    emphasis: "soft",
  },
];

export const techStack = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "CSS",
  "Tailwind",
  "Git",
  "Figma",
  "Accessibility",
  "Responsive UI",
];

export type TechMarqueeRow = {
  direction: "left" | "right";
  items: string[];
};

export function getTechStackRows(items: string[]): TechMarqueeRow[] {
  const repeatedItems = [...items, ...items, ...items];

  return [
    { direction: "left", items: repeatedItems },
    { direction: "right", items: [...repeatedItems].reverse() },
  ];
}

export function getScrollProgress(lineTop: number, viewportHeight: number): number {
  const start = viewportHeight * 0.9;
  const end = viewportHeight * 0.1;
  const progress = (start - lineTop) / (start - end);

  return Math.min(1, Math.max(0, Number(progress.toFixed(3))));
}
