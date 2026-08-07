export type ArticleLine = {
  text: string;
  emphasis: "strong" | "medium" | "soft";
};
  
export const articleLines: ArticleLine[] = [
  {
    text: "Life is a journey of becoming.",
    emphasis: "medium",
  },
  {
    text: "Every mistake teaches, every challenge strengthens,",
    emphasis: "strong",
  },
  {
    text: " and every choice shapes who we are. Trust your path, ",
    emphasis: "medium",
  },
  {
    text: "keep learning, and never stop building the life you truly believe in.",
    emphasis: "soft",
  },
];

export function getScrollProgress(lineTop: number, viewportHeight: number): number {
  const start = viewportHeight * 0.9;
  const end = viewportHeight * 0.1;
  const progress = (start - lineTop) / (start - end);

  return Math.min(1, Math.max(0, Number(progress.toFixed(3))));
}

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

export type ToolIcon = {
  name: string;
  src: string;
  alt: string;
};

export const toolIcons: ToolIcon[] = [
  { name: "HTML5", src: "/tools/html5.png", alt: "HTML5 logo" },
  { name: "CSS3", src: "/tools/css-3.png", alt: "CSS3 logo" },
  { name: "JavaScript", src: "/tools/js.png", alt: "JavaScript logo" },
  { name: "React", src: "/tools/react.png", alt: "React logo" },
  { name: "Next.js", src: "/tools/nextjs.svg", alt: "Next.js logo" },
  { name: "Figma", src: "/tools/figma.png", alt: "Figma logo" },
  { name: "GitHub", src: "/tools/github.png", alt: "GitHub logo" },
  { name: "GPT", src: "/tools/gpt.png", alt: "GPT logo" },
  { name: "Supabase", src: "/tools/supabase.png", alt: "Supabase logo" },
];

export type TechMarqueeRow = {
  direction: "left" | "right";
  items: ToolIcon[];
};

export function getTechStackRows(items: ToolIcon[]): TechMarqueeRow[] {
  const frontendNames = new Set([
    "HTML5",
    "CSS3",
    "JavaScript",
    "React",
    "Next.js",
  ]);

  return [
    {
      direction: "left",
      items: items.filter((item) => frontendNames.has(item.name)),
    },
    {
      direction: "right",
      items: items.filter((item) => !frontendNames.has(item.name)),
    },
  ];
}
