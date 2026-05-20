import type { Metadata } from "next";
import { PageShell } from "@/components/site/page-shell";

export const metadata: Metadata = {
  title: "Cookie Policy — IC Vacation",
  description: "How IC Vacation uses cookies and tracking technologies.",
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

export default function CookiesPage() {
  return (
    <PageShell>
      <LegalHero title="Cookie Policy" updated="May 2026" />

      <section className="relative py-20 lg:py-28 bg-background">
        <div className="max-w-[760px] mx-auto px-6 lg:px-12">
          <div className="space-y-10 text-foreground/75 leading-relaxed font-editorial text-[16px] sm:text-[17px]">
            <div>
              <h2 className="font-display-tight text-white text-xl mb-3" style={{ letterSpacing: "-0.02em" }}>
                1. What Are Cookies?
              </h2>
              <p>
                Cookies are small text files stored on your device when you visit our website. They help us understand how you use IC Vacation and improve your experience.
              </p>
            </div>
            <div>
              <h2 className="font-display-tight text-white text-xl mb-3" style={{ letterSpacing: "-0.02em" }}>
                2. Essential Cookies
              </h2>
              <p>
                We use essential cookies to keep our website secure and functional. These cookies are necessary for basic site operations and cannot be disabled.
              </p>
            </div>
            <div>
              <h2 className="font-display-tight text-white text-xl mb-3" style={{ letterSpacing: "-0.02em" }}>
                3. Analytics Cookies
              </h2>
              <p>
                We use analytics cookies (Matomo + Tianji) to understand how visitors interact with our site. This data is self-hosted and never sold to third parties.
              </p>
            </div>
            <div>
              <h2 className="font-display-tight text-white text-xl mb-3" style={{ letterSpacing: "-0.02em" }}>
                4. Your Cookie Choices
              </h2>
              <p>
                You can control cookies through your browser settings. Most browsers allow you to refuse cookies or alert you when cookies are being sent.
              </p>
            </div>
            <div>
              <h2 className="font-display-tight text-white text-xl mb-3" style={{ letterSpacing: "-0.02em" }}>
                5. Questions?
              </h2>
              <p>
                Contact us at{" "}
                <a href="mailto:hello@icvacation.com" className="text-brand-green hover:text-brand-green/80 transition-colors">
                  hello@icvacation.com
                </a>{" "}
                with any questions about our cookie practices.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
