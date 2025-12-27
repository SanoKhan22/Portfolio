import { Hero } from "@/components/Hero";
import { SkillsCarousel } from "@/components/SkillsCarousel";
import { StatsSection } from "@/components/StatsSection";
import { SignatureProjects } from "@/components/SignatureProjects";
import { BuildingNow } from "@/components/BuildingNow";
import { AboutBrand } from "@/components/AboutBrand";
import { TestimonialsSlider } from "@/components/TestimonialsSlider";
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
        <section id="projects">
          <SignatureProjects />
        </section>
        <section id="building">
          <BuildingNow />
        </section>
        <section id="about">
          <AboutBrand />
        </section>
        <section id="testimonials">
          <TestimonialsSlider />
        </section>
        <section id="contact">
          <ContactCta />
        </section>
        <SiteFooter />
      </main>
    </>
  );
}
