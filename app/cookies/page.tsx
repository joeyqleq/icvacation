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
                Cookies are small text files stored on your device when you visit our website. They help us understand how visitors use IC Vacation and allow basic site functionality.
              </p>
            </div>
            <div>
              <h2 className="font-display-tight text-white text-xl mb-3" style={{ letterSpacing: "-0.02em" }}>
                2. Essential Cookies
              </h2>
              <p>
                Required for the site to function. These handle form state, session continuity, and security. They cannot be disabled without breaking site functionality.
              </p>
            </div>
            <div>
              <h2 className="font-display-tight text-white text-xl mb-3" style={{ letterSpacing: "-0.02em" }}>
                3. Analytics Cookies
              </h2>
              <p className="mb-3">
                We use self-hosted analytics (Matomo and Tianji) to understand traffic patterns and improve the site. Key points:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-foreground/65">
                <li>Data is stored on our own servers, not sent to third-party ad networks</li>
                <li>No personal data is sold or shared for advertising</li>
                <li>IP addresses are anonymised</li>
                <li>You can opt out using your browser&apos;s Do Not Track setting</li>
              </ul>
            </div>
            <div>
              <h2 className="font-display-tight text-white text-xl mb-3" style={{ letterSpacing: "-0.02em" }}>
                4. Third-Party Cookies
              </h2>
              <p>
                When you follow links to external booking platforms (e.g. Signature Travel Network cruise or hotel pages), those sites may set their own cookies. We have no control over those cookies — refer to the respective site&apos;s cookie policy.
              </p>
            </div>
            <div>
              <h2 className="font-display-tight text-white text-xl mb-3" style={{ letterSpacing: "-0.02em" }}>
                5. Managing Your Preferences
              </h2>
              <p>
                Most browsers allow you to refuse or delete cookies. Note that disabling essential cookies may affect site functionality. You can also enable &ldquo;Do Not Track&rdquo; in your browser to opt out of analytics.
              </p>
            </div>
            <div>
              <h2 className="font-display-tight text-white text-xl mb-3" style={{ letterSpacing: "-0.02em" }}>
                6. Questions?
              </h2>
              <p>
                Contact us at{" "}
                <a href="mailto:info@icvacation.com" className="text-brand-green hover:text-brand-green/80 transition-colors">
                  info@icvacation.com
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
