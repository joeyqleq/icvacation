"use client";

import dynamic from "next/dynamic";

const AdvisorSection = dynamic(
  () => import("@/components/landing/infrastructure-section").then((mod) => mod.AdvisorSection),
  { ssr: false },
);

const ProcessSection = dynamic(
  () => import("@/components/landing/how-it-works-section").then((mod) => mod.ProcessSection),
  { ssr: false },
);

const DestinationsSection = dynamic(
  () => import("@/components/landing/integrations-section").then((mod) => mod.DestinationsSection),
  { ssr: false },
);

const FlightSearchPreview = dynamic(
  () => import("@/components/landing/flight-search-preview").then((mod) => mod.FlightSearchPreview),
  { ssr: false },
);

const NumbersSection = dynamic(
  () => import("@/components/landing/metrics-section").then((mod) => mod.NumbersSection),
  { ssr: false },
);

const TestimonialsSection = dynamic(
  () => import("@/components/landing/testimonials-section").then((mod) => mod.TestimonialsSection),
  { ssr: false },
);

const PhilosophySection = dynamic(
  () => import("@/components/landing/security-section").then((mod) => mod.PhilosophySection),
  { ssr: false },
);

const JournalSection = dynamic(
  () => import("@/components/landing/developers-section").then((mod) => mod.JournalSection),
  { ssr: false },
);

const PricingSection = dynamic(
  () => import("@/components/landing/pricing-section").then((mod) => mod.PricingSection),
  { ssr: false },
);

const ConsultantSection = dynamic(
  () => import("@/components/landing/features-section").then((mod) => mod.ConsultantSection),
  { ssr: false },
);

const FaqCtaSection = dynamic(
  () => import("@/components/landing/cta-section").then((mod) => mod.FaqCtaSection),
  { ssr: false },
);

const FamilyLegacySection = dynamic(
  () => import("@/components/landing/family-legacy-section").then((mod) => mod.FamilyLegacySection),
  { ssr: false },
);

const FooterSection = dynamic(
  () => import("@/components/landing/footer-section").then((mod) => mod.FooterSection),
  { ssr: false },
);

export function DeferredHomeSections() {
  return (
    <>
      <AdvisorSection />
      <ProcessSection />
      <DestinationsSection />
      <FlightSearchPreview />
      <NumbersSection />
      <TestimonialsSection />
      <PhilosophySection />
      <JournalSection />
      <ConsultantSection />
      <PricingSection />
      <FamilyLegacySection />
      <FaqCtaSection />
      <FooterSection />
    </>
  );
}
