export type ArticleLine = {
  text: string;
  emphasis: "strong" | "medium" | "soft";
};

export const articleLines: ArticleLine[] = [
  {
    text: "Hi, I’m Phawit — a frontend developer who cares about how the web feels.",
    emphasis: "strong",
  },
  {
    text: "I turn thoughtful designs into interfaces people can understand without having to think about them.",
    emphasis: "medium",
  },
  {
    text: "From shaping visual systems to building responsive user flows, I’m interested in the details that make digital products feel effortless.",
    emphasis: "medium",
  },
  {
    text: "I work with clarity, systems, and a little curiosity — always looking for the small decision that makes the whole experience better.",
    emphasis: "soft",
  },
  {
    text: "That’s the work I want to keep making.",
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
