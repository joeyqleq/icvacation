import type { Metadata } from "next";
import { PageShell } from "@/components/site/page-shell";

export const metadata: Metadata = {
  title: "Accessibility Statement — IC Vacation",
  description: "IC Vacation's commitment to digital accessibility for all users.",
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

export default function AccessibilityPage() {
  return (
    <PageShell>
      <LegalHero title="Accessibility Statement" updated="May 2026" />

      <section className="relative py-20 lg:py-28 bg-background">
        <div className="max-w-[760px] mx-auto px-6 lg:px-12">
          <div className="space-y-10 text-foreground/75 leading-relaxed font-editorial text-[16px] sm:text-[17px]">
            <div>
              <h2 className="font-display-tight text-white text-xl mb-3" style={{ letterSpacing: "-0.02em" }}>
                Our Commitment
              </h2>
              <p>
                IC Vacation is committed to ensuring digital accessibility for people with disabilities. We are continuously working to improve the accessibility of our website.
              </p>
            </div>
            <div>
              <h2 className="font-display-tight text-white text-xl mb-3" style={{ letterSpacing: "-0.02em" }}>
                Accessibility Features
              </h2>
              <p className="mb-4">Our website includes:</p>
              <ul className="list-none space-y-2">
                {[
                  "Keyboard navigation support",
                  "High contrast text with brand-green accent",
                  "Alt text for all informational images",
                  "Semantic HTML structure with ARIA roles",
                  "Screen reader compatibility",
                  "Responsive design for all screen sizes",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-[5px] w-1.5 h-1.5 rounded-full bg-brand-green shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display-tight text-white text-xl mb-3" style={{ letterSpacing: "-0.02em" }}>
                Feedback
              </h2>
              <p>
                If you encounter any accessibility issues or have suggestions for improvement, please contact us. We value your feedback and are committed to making our site more accessible.
              </p>
            </div>
            <div>
              <h2 className="font-display-tight text-white text-xl mb-3" style={{ letterSpacing: "-0.02em" }}>
                Contact
              </h2>
              <p>
                Email:{" "}
                <a href="mailto:info@icvacation.com" className="text-brand-green hover:text-brand-green/80 transition-colors">
                  info@icvacation.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
