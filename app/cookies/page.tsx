'use client';

import { Navigation } from '@/components/landing/navigation';
import { PageShell } from '@/components/site/page-shell';
import { PageHero } from '@/components/site/page-hero';

export default function CookiesPage() {
  return (
    <PageShell>
      <Navigation />
      
      <PageHero
        title="Cookie Policy"
        subtitle="Transparent about how we track your browsing."
        description="Last updated: May 2026"
      />

      <section className="relative py-20 lg:py-32 bg-black">
        <div className="container max-w-3xl">
          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-display mb-6" style={{ fontVariationSettings: "'wdth' 100, 'opsz' 48" }}>
              Cookie Policy
            </h2>

            <div className="space-y-8 text-foreground/75 leading-relaxed">
              <div>
                <h3 className="text-lg font-medium text-white mb-3">1. What Are Cookies?</h3>
                <p>
                  Cookies are small text files stored on your device when you visit our website. They help us understand how you use IC Vacation and improve your experience.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-white mb-3">2. Essential Cookies</h3>
                <p>
                  We use essential cookies to keep our website secure and functional. These cookies are necessary for basic site operations and cannot be disabled.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-white mb-3">3. Analytics Cookies</h3>
                <p>
                  We use analytics cookies to understand how visitors interact with our site. This data helps us optimize our content and user experience.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-white mb-3">4. Your Cookie Choices</h3>
                <p>
                  You can control cookies through your browser settings. Most browsers allow you to refuse cookies or alert you when cookies are being sent.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-white mb-3">5. Questions?</h3>
                <p>
                  Contact us at hello@icvacation.com with any questions about our cookie practices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
