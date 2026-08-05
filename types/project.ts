export interface ProjectHighlight {
  label: string;
  body: string;
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  description: string;
  role: string;
  technologies: string[];
  image: string;
  imageAlt: string;
  accent: string;
  featured: boolean;
  liveUrl: string;
  repositoryUrl: string;
  highlights: ProjectHighlight[];
}
