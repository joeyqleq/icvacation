import { Navigation } from "@/components/landing/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { ConsultantSection } from "@/components/landing/features-section";
import { ProcessSection } from "@/components/landing/how-it-works-section";
import { AdvisorSection } from "@/components/landing/infrastructure-section";
import { NumbersSection } from "@/components/landing/metrics-section";
import { DestinationsSection } from "@/components/landing/integrations-section";
import { PhilosophySection } from "@/components/landing/security-section";
import { JournalSection } from "@/components/landing/developers-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { FaqCtaSection } from "@/components/landing/cta-section";
import { FooterSection } from "@/components/landing/footer-section";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <Navigation />
      <HeroSection />
      <ConsultantSection />
      <AdvisorSection />
      <ProcessSection />
      <DestinationsSection />
      <NumbersSection />
      <TestimonialsSection />
      <PhilosophySection />
      <JournalSection />
      <PricingSection />
      <FaqCtaSection />
      <FooterSection />
    </main>
  );
}
