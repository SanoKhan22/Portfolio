import { Hero } from "@/components/Hero";
import { SkillsCarousel } from "@/components/SkillsCarousel";
import { StatsSection } from "@/components/StatsSection";
import { SignatureProjects } from "@/components/SignatureProjects";
import { BuildingNow } from "@/components/BuildingNow";
import { AboutBrand } from "@/components/AboutBrand";
import { TestimonialsSlider } from "@/components/TestimonialsSlider";
import { ContactCta } from "@/components/ContactCta";
import { SiteFooter } from "@/components/SiteFooter";
import ClientThemeToggle from "@/components/ClientThemeToggle";

export default function Home() {
  return (
    <main className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-12 px-4 pb-16 sm:px-6 lg:px-8">
      {/* Temporary: Theme toggle in top-right for testing */}
      <ClientThemeToggle />
      
      <Hero />
      <SkillsCarousel />
      <StatsSection />
      <SignatureProjects />
      <BuildingNow />
      <AboutBrand />
      <TestimonialsSlider />
      <ContactCta />
      <SiteFooter />
    </main>
  );
}
