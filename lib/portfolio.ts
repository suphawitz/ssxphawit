export type ArticleLine = {
  text: string;
  emphasis: "strong" | "medium" | "soft";
};
  
export const articleLines: ArticleLine[] = [
  {
    text: "Life is a journey of becoming. Every mistake teaches, every challenge strengthens,",
    emphasis: "strong",
  },
  {
    text: " and every choice shapes who we are.Trust your path, keep learning, and never stop building the life you truly believe in.",
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
