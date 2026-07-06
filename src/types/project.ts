export interface Project {
  title: string;
  description: string;
  technologies: string[];
  href: string;
  featured?: boolean;
}

export interface FeaturedProject {
  title: string;
  subtitle: string;
  technologies: string[];
  href: string;
}