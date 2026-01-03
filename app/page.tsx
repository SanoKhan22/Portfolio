import { Hero } from "@/components/Hero";
import { SkillsCarousel } from "@/components/SkillsCarousel";
import { StatsSection } from "@/components/StatsSection";
import PremiumFeaturedProjects from "@/components/PremiumFeaturedProjects";
import { GitHubContributionsCalendar } from "@/components/GitHubContributionsCalendar";
import { Timeline } from "@/components/Timeline";
import { EnhancedTestimonials } from "@/components/EnhancedTestimonials";
import { ContactCta } from "@/components/ContactCta";
import { SiteFooter } from "@/components/SiteFooter";
import FloatingHeader from "@/components/FloatingHeader";

export default function Home() {
  return (
    <>
      <FloatingHeader />
      <main className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-12 px-4 pb-16 pt-24 sm:px-6 lg:px-8">
        <section id="home">
          <Hero />
        </section>
        
        <section id="skills">
          <SkillsCarousel />
        </section>
        <section id="stats">
          <StatsSection />
        </section>
        
        {/* Premium Featured Projects from GitHub */}
        <section id="featured-projects">
          <PremiumFeaturedProjects />
        </section>
        
        {/* GitHub Contributions Calendar */}
        <section id="contributions">
          <GitHubContributionsCalendar />
        </section>
        
        {/* Timeline & Experience */}
        <section id="experience">
          <Timeline />
        </section>
        
        <section id="testimonials">
          <EnhancedTestimonials />
        </section>
        
        <section id="contact">
          <ContactCta />
        </section>
        <SiteFooter />
      </main>
    </>
  );
}
