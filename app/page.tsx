import { AboutSection } from "@/components/about-section";
import { ArticleSection } from "@/components/article-section";
import { ContactSection } from "@/components/contact-section";
import { HeroSection } from "@/components/hero-section";
import { ProjectIndex } from "@/components/project-index";
import { SiteHeader } from "@/components/site-header";
import { TechMarquee } from "@/components/tech-marquee";
import { getFeaturedProjects } from "@/lib/projects";

export default function Home() {
  const featuredProjects = getFeaturedProjects();

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main-content">
        <HeroSection />
        <ProjectIndex projects={featuredProjects} />
        <ArticleSection />
        <AboutSection />
        <ContactSection />
        <TechMarquee />
      </main>
      <footer className="site-footer">
        <span>© 2026 Phawit</span>
        <span>Made with care in Bangkok</span>
      </footer>
    </div>
  );
}
