import { AboutSection } from "@/components/about-section";
import { ArticleSection } from "@/components/article-section";
import { ContactSection } from "@/components/contact-section";
import { HeroSection } from "@/components/hero-section";
import { ProjectIndex } from "@/components/project-index";
import { ScrollReveal } from "@/components/scroll-reveal";
import { TechMarquee } from "@/components/tech-marquee";
import { getFeaturedProjects } from "@/lib/projects";

export default function Home() {
  const featuredProjects = getFeaturedProjects();

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <main id="main-content">
        <HeroSection />
        <ScrollReveal>
          <ProjectIndex projects={featuredProjects} />
        </ScrollReveal>
        <ScrollReveal>
          <ArticleSection />
        </ScrollReveal>
        <ScrollReveal>
          <AboutSection />
        </ScrollReveal>
        <ScrollReveal>
          <ContactSection />
        </ScrollReveal>
        <ScrollReveal>
          <TechMarquee />
        </ScrollReveal>
      </main>
      <footer className="site-footer">
        <span>© 2026 Phawit</span>
        <span>Made with care in Bangkok</span>
      </footer>
    </div>
  );
}
