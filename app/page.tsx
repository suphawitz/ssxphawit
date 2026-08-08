import { AboutSection } from "@/components/about-section";
import { ArticleSection } from "@/components/article-section";
import { ContactSection } from "@/components/contact-section";
import { ExperienceSection } from "@/components/experience-section";
import { HeroSection } from "@/components/hero-section";
import { ProjectIndex } from "@/components/project-index";
import { ScrollReveal } from "@/components/scroll-reveal";
import { TechMarquee } from "@/components/tech-marquee";
import { WorkTogetherMarquee } from "@/components/work-together-marquee";
import { getFeaturedProjects } from "@/lib/projects";
import { getExperiences } from "@/lib/experience";

export default function Home() {
  const featuredProjects = getFeaturedProjects();
  const experiences = getExperiences();

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <main id="main-content">
        <HeroSection />
        <ScrollReveal>
          <ArticleSection />
        </ScrollReveal>
        <ScrollReveal>
          <AboutSection />
        </ScrollReveal>
        <ScrollReveal>
          <TechMarquee />
        </ScrollReveal>
        <ScrollReveal>
          <ProjectIndex projects={featuredProjects} />
        </ScrollReveal>
        <ScrollReveal>
          <ExperienceSection experiences={experiences} />
        </ScrollReveal>
        <ScrollReveal>
          <WorkTogetherMarquee />
        </ScrollReveal>
        <ScrollReveal>
          <ContactSection />
        </ScrollReveal>
      </main>
      <footer className="site-footer">
        <span>© 2026 Suphawit</span>
        <span>Made with care</span>
      </footer>
    </div>
  );
}
