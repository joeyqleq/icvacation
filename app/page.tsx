import { Navigation } from "@/components/landing/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { ConsultantSection } from "@/components/landing/features-section";
import { DeferredHomeSections } from "@/components/landing/deferred-home-sections";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <Navigation />
      <HeroSection />
      <ConsultantSection />
      <DeferredHomeSections />
    </main>
  );
}
