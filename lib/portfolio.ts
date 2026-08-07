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
    text: " and every choice shapes who we are. ",
    emphasis: "medium",
  },
  {
    text: "Trust your path, keep learning, and never stop building the life you truly believe in.",
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
  items: string[];
};

export function getTechStackRows(items: string[]): TechMarqueeRow[] {
  const repeatedItems = [...items, ...items, ...items];

  return [
    { direction: "left", items: repeatedItems },
    { direction: "right", items: [...repeatedItems].reverse() },
  ];
}

export type ToolIconMarqueeRow = {
  direction: "left" | "right";
  items: ToolIcon[];
};

export function getToolIconRows(items: ToolIcon[]): ToolIconMarqueeRow[] {
  const repeatedItems = [...items, ...items, ...items];

  return [
    { direction: "left", items: repeatedItems },
    { direction: "right", items: [...repeatedItems].reverse() },
  ];
}
