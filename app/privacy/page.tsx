import type { Metadata } from "next";
import { PageShell } from "@/components/site/page-shell";

export const metadata: Metadata = {
  title: "Privacy Policy — IC Vacation",
  description: "How IC Vacation protects and uses your personal information.",
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

export default function PrivacyPage() {
  return (
    <PageShell>
      <LegalHero title="Privacy Policy" updated="May 2026" />

      <section className="relative py-20 lg:py-28 bg-background">
        <div className="max-w-[760px] mx-auto px-6 lg:px-12">
          <div className="space-y-10 text-foreground/75 leading-relaxed font-editorial text-[16px] sm:text-[17px]">
            <div>
              <h2 className="font-display-tight text-white text-xl mb-3" style={{ letterSpacing: "-0.02em" }}>
                1. Information We Collect
              </h2>
              <p className="mb-3">
                We collect information you provide directly when you fill out our inquiry form, book a consultation, or correspond with us. This includes:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-foreground/65">
                <li>Name, email address, and phone number</li>
                <li>Travel preferences, dates, destinations, and party size</li>
                <li>Budget indications and special requirements</li>
                <li>Any other details you choose to share about your trip</li>
              </ul>
              <p className="mt-3">
                We also collect basic analytics data (pages visited, time on site) through self-hosted analytics tools. No data is sent to third-party advertising networks.
              </p>
            </div>
            <div>
              <h2 className="font-display-tight text-white text-xl mb-3" style={{ letterSpacing: "-0.02em" }}>
                2. How We Use Your Information
              </h2>
              <p className="mb-3">Your information is used to:</p>
              <ul className="list-disc pl-5 space-y-1 text-foreground/65">
                <li>Provide personalised travel consultation and itinerary planning</li>
                <li>Respond to your inquiries and follow up on trip briefs</li>
                <li>Coordinate with third-party travel suppliers (airlines, hotels, cruise lines) on your behalf</li>
                <li>Improve our website and services based on aggregate usage patterns</li>
              </ul>
              <p className="mt-3">
                We do not sell, rent, or trade your personal data to third parties for marketing purposes.
              </p>
            </div>
            <div>
              <h2 className="font-display-tight text-white text-xl mb-3" style={{ letterSpacing: "-0.02em" }}>
                3. Third-Party Services
              </h2>
              <p>
                When you book a trip through IC Vacation, we may share relevant details (name, dates, preferences) with travel suppliers such as airlines, hotels, cruise lines, and ground operators to fulfil your itinerary. These suppliers have their own privacy policies. We also use third-party booking platforms (e.g. Signature Travel Network) whose links may appear on this site — when you follow those links, their privacy policies apply.
              </p>
            </div>
            <div>
              <h2 className="font-display-tight text-white text-xl mb-3" style={{ letterSpacing: "-0.02em" }}>
                4. Data Security &amp; Retention
              </h2>
              <p>
                We use encrypted communications and secure hosting. Your inquiry data is retained for up to 24 months after your last interaction to support ongoing travel planning. You may request earlier deletion at any time.
              </p>
            </div>
            <div>
              <h2 className="font-display-tight text-white text-xl mb-3" style={{ letterSpacing: "-0.02em" }}>
                5. Your Rights
              </h2>
              <p>
                You have the right to access, correct, or delete your personal information at any time. You may also withdraw consent for future communications. To exercise these rights, contact us directly.
              </p>
            </div>
            <div>
              <h2 className="font-display-tight text-white text-xl mb-3" style={{ letterSpacing: "-0.02em" }}>
                6. Contact Us
              </h2>
              <p>
                Questions about this privacy policy?{" "}
                <a href="mailto:info@icvacation.com" className="text-brand-green hover:text-brand-green/80 transition-colors">
                  info@icvacation.com
                </a>
              </p>
            </div>
            <p className="text-xs text-foreground/40 italic pt-4 border-t border-foreground/10">
              This policy is a general guide and does not constitute legal advice. We recommend consulting a qualified professional for compliance with specific jurisdictions.
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
