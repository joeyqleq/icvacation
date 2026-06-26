import type { Metadata } from "next";
import { PageShell } from "@/components/site/page-shell";

export const metadata: Metadata = {
  title: "Terms of Service — IC Vacation",
  description: "Terms and conditions for using IC Vacation services.",
};

function LegalHero({ title, updated }: { title: string; updated: string }) {
  return (
    <section className="relative pt-40 pb-16 lg:pt-52 lg:pb-20 bg-background border-b border-foreground/10 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(38,252,0,0.05) 0%, transparent 70%)",
        }}
      />
      <div className="max-w-[1100px] mx-auto px-6 lg:px-12 relative z-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/40 mb-6">
          Legal /{" "}
          <span className="text-brand-green/70">{title}</span>
        </p>
        <h1
          className="font-display-tight text-white leading-[0.9]"
          style={{ fontSize: "clamp(2.8rem, 8vw, 6.5rem)", letterSpacing: "-0.04em" }}
        >
          {title}
        </h1>
        <p className="mt-5 font-mono text-[12px] tracking-[0.12em] text-foreground/40 uppercase">
          Last updated: {updated}
        </p>
      </div>
    </section>
  );
}

export default function TermsPage() {
  return (
    <PageShell>
      <LegalHero title="Terms of Service" updated="May 2026" />

      <section className="relative py-20 lg:py-28 bg-background">
        <div className="max-w-[760px] mx-auto px-6 lg:px-12">
          <div className="space-y-10 text-foreground/75 leading-relaxed font-editorial text-[16px] sm:text-[17px]">
            <div>
              <h2 className="font-display-tight text-white text-xl mb-3" style={{ letterSpacing: "-0.02em" }}>
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing and using IC Vacation&apos;s website and services, you agree to be bound by these terms. If you do not agree, please do not use our services.
              </p>
            </div>
            <div>
              <h2 className="font-display-tight text-white text-xl mb-3" style={{ letterSpacing: "-0.02em" }}>
                2. Service Description
              </h2>
              <p>
                IC Vacation provides personalised travel consultation and itinerary planning services. We act as an independent advisor — we are not a tour operator, airline, or hotel. We coordinate with third-party travel suppliers on your behalf. Final bookings are subject to the terms and conditions of those suppliers.
              </p>
            </div>
            <div>
              <h2 className="font-display-tight text-white text-xl mb-3" style={{ letterSpacing: "-0.02em" }}>
                3. Consultation Fees
              </h2>
              <p>
                Consultation fees are discussed and agreed upon before service begins. The consultation fee is credited in full toward a Custom or Atelier itinerary if you proceed. Fees are indicative and may vary based on trip complexity.
              </p>
            </div>
            <div>
              <h2 className="font-display-tight text-white text-xl mb-3" style={{ letterSpacing: "-0.02em" }}>
                4. Bookings &amp; Third Parties
              </h2>
              <p>
                When we book travel on your behalf, we act as your agent with airlines, hotels, cruise lines, and ground operators. Those bookings are governed by the supplier&apos;s own terms, cancellation policies, and liability limitations. We recommend reviewing supplier terms before confirming.
              </p>
            </div>
            <div>
              <h2 className="font-display-tight text-white text-xl mb-3" style={{ letterSpacing: "-0.02em" }}>
                5. Cancellation &amp; Changes
              </h2>
              <p>
                Cancellation of the consultation itself must be made at least 48 hours in advance for a full refund. Trip cancellations are subject to the policies of the relevant travel suppliers. We will assist with cancellation processes but cannot override supplier policies.
              </p>
            </div>
            <div>
              <h2 className="font-display-tight text-white text-xl mb-3" style={{ letterSpacing: "-0.02em" }}>
                6. Limitation of Liability
              </h2>
              <p>
                IC Vacation is not liable for delays, cancellations, schedule changes, or incidents caused by airlines, hotels, weather, government action, or other circumstances beyond our control. We strongly recommend comprehensive travel insurance for all bookings.
              </p>
            </div>
            <div>
              <h2 className="font-display-tight text-white text-xl mb-3" style={{ letterSpacing: "-0.02em" }}>
                7. Website Content
              </h2>
              <p>
                Prices, availability, and destination information on this website are for illustrative purposes and may change without notice. Confirmed pricing is provided during the consultation process.
              </p>
            </div>
            <div>
              <h2 className="font-display-tight text-white text-xl mb-3" style={{ letterSpacing: "-0.02em" }}>
                8. Contact
              </h2>
              <p>
                For questions regarding these terms, please contact{" "}
                <a href="mailto:info@icvacation.com" className="text-brand-green hover:text-brand-green/80 transition-colors">
                  info@icvacation.com
                </a>
              </p>
            </div>
            <p className="text-xs text-foreground/40 italic pt-4 border-t border-foreground/10">
              These terms are a general guide and do not constitute legal advice.
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
