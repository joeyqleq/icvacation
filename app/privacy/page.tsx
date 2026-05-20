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
              <p>
                We collect information you provide directly to us, such as when you fill out a contact form or book a consultation. This includes your name, email address, phone number, and details about your travel preferences.
              </p>
            </div>
            <div>
              <h2 className="font-display-tight text-white text-xl mb-3" style={{ letterSpacing: "-0.02em" }}>
                2. How We Use Your Information
              </h2>
              <p>
                Your information is used solely to provide travel consultation services, respond to inquiries, and improve our service. We do not sell, trade, or share your personal data with third parties.
              </p>
            </div>
            <div>
              <h2 className="font-display-tight text-white text-xl mb-3" style={{ letterSpacing: "-0.02em" }}>
                3. Data Security
              </h2>
              <p>
                We implement industry-standard security measures to protect your information. All communications are encrypted, and your data is stored securely.
              </p>
            </div>
            <div>
              <h2 className="font-display-tight text-white text-xl mb-3" style={{ letterSpacing: "-0.02em" }}>
                4. Your Rights
              </h2>
              <p>
                You have the right to access, modify, or delete your personal information at any time. Contact us directly to request changes to your data.
              </p>
            </div>
            <div>
              <h2 className="font-display-tight text-white text-xl mb-3" style={{ letterSpacing: "-0.02em" }}>
                5. Contact Us
              </h2>
              <p>
                Questions about this privacy policy?{" "}
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
