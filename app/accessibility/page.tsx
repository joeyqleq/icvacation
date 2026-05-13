'use client';

import { Navigation } from '@/components/landing/navigation';
import { PageShell } from '@/components/site/page-shell';
import { PageHero } from '@/components/site/page-hero';

export default function AccessibilityPage() {
  return (
    <PageShell>
      <Navigation />
      
      <PageHero
        title="Accessibility Statement"
        subtitle="We&apos;re committed to making IC Vacation accessible to everyone."
        description="Last updated: May 2026"
      />

      <section className="relative py-20 lg:py-32 bg-black">
        <div className="container max-w-3xl">
          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-display mb-6" style={{ fontVariationSettings: "'wdth' 100, 'opsz' 48" }}>
              Accessibility Statement
            </h2>

            <div className="space-y-8 text-foreground/75 leading-relaxed">
              <div>
                <h3 className="text-lg font-medium text-white mb-3">Our Commitment</h3>
                <p>
                  IC Vacation is committed to ensuring digital accessibility for people with disabilities. We are continuously working to improve the accessibility of our website.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-white mb-3">Accessibility Features</h3>
                <p>
                  Our website includes:
                </p>
                <ul className="list-disc list-inside space-y-2 mt-3">
                  <li>Keyboard navigation support</li>
                  <li>High contrast text options</li>
                  <li>Alt text for all images</li>
                  <li>Semantic HTML structure</li>
                  <li>Screen reader compatibility</li>
                  <li>Responsive design for mobile devices</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-white mb-3">Feedback</h3>
                <p>
                  If you encounter any accessibility issues or have suggestions for improvement, please contact us. We value your feedback and are committed to making our site more accessible.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-white mb-3">Contact</h3>
                <p>
                  Email: hello@icvacation.com<br />
                  Phone: +44 (0) 123 456 7890
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
