'use client';

import { Navigation } from '@/components/landing/navigation';
import { PageShell } from '@/components/site/page-shell';
import { PageHero } from '@/components/site/page-hero';

export default function PrivacyPage() {
  return (
    <PageShell>
      <Navigation />
      
      <PageHero
        title="Privacy Policy"
        subtitle="How we protect your information."
        description="Last updated: May 2026"
      />

      <section className="relative py-20 lg:py-32 bg-black">
        <div className="container max-w-3xl">
          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-display mb-6" style={{ fontVariationSettings: "'wdth' 100, 'opsz' 48" }}>
              Privacy Policy
            </h2>

            <div className="space-y-8 text-foreground/75 leading-relaxed">
              <div>
                <h3 className="text-lg font-medium text-white mb-3">1. Information We Collect</h3>
                <p>
                  We collect information you provide directly to us, such as when you fill out a contact form or book a consultation. This includes your name, email address, phone number, and details about your travel preferences.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-white mb-3">2. How We Use Your Information</h3>
                <p>
                  Your information is used solely to provide travel consultation services, respond to inquiries, and improve our service. We do not sell, trade, or share your personal data with third parties.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-white mb-3">3. Data Security</h3>
                <p>
                  We implement industry-standard security measures to protect your information. All communications are encrypted, and your data is stored securely.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-white mb-3">4. Your Rights</h3>
                <p>
                  You have the right to access, modify, or delete your personal information at any time. Contact us directly to request changes to your data.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-white mb-3">5. Contact Us</h3>
                <p>
                  If you have questions about this privacy policy, please reach out to us at hello@icvacation.com.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
