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
                By accessing and using IC Vacation services, you agree to be bound by these terms. If you do not agree, please do not use our services.
              </p>
            </div>
            <div>
              <h2 className="font-display-tight text-white text-xl mb-3" style={{ letterSpacing: "-0.02em" }}>
                2. Service Description
              </h2>
              <p>
                IC Vacation provides personalized travel consultation and itinerary planning services. Consultations are tailored to individual preferences and requirements.
              </p>
            </div>
            <div>
              <h2 className="font-display-tight text-white text-xl mb-3" style={{ letterSpacing: "-0.02em" }}>
                3. Payment and Booking
              </h2>
              <p>
                Consultation fees and booking terms will be discussed during your initial consultation with Isaac. Payment terms are agreed upon before service commencement.
              </p>
            </div>
            <div>
              <h2 className="font-display-tight text-white text-xl mb-3" style={{ letterSpacing: "-0.02em" }}>
                4. Cancellation Policy
              </h2>
              <p>
                Cancellations must be made with at least 14 days notice for a full refund. Cancellations within 14 days are subject to a 50% fee.
              </p>
            </div>
            <div>
              <h2 className="font-display-tight text-white text-xl mb-3" style={{ letterSpacing: "-0.02em" }}>
                5. Limitation of Liability
              </h2>
              <p>
                IC Vacation is not responsible for any travel delays, cancellations, or incidents beyond our control. We recommend travel insurance for all bookings.
              </p>
            </div>
            <div>
              <h2 className="font-display-tight text-white text-xl mb-3" style={{ letterSpacing: "-0.02em" }}>
                6. Contact
              </h2>
              <p>
                For questions regarding these terms, please contact{" "}
                <a href="mailto:hello@icvacation.com" className="text-brand-green hover:text-brand-green/80 transition-colors">
                  hello@icvacation.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
