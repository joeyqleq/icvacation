'use client';

import { Navigation } from '@/components/landing/navigation';
import { PageShell } from '@/components/site/page-shell';
import { PageHero } from '@/components/site/page-hero';

export default function TermsPage() {
  return (
    <PageShell>
      <Navigation />
      
      <PageHero
        title="Terms of Service"
        subtitle="Please read carefully before using IC Vacation."
        description="Last updated: May 2026"
      />

      <section className="relative py-20 lg:py-32 bg-black">
        <div className="container max-w-3xl">
          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-display mb-6" style={{ fontVariationSettings: "'wdth' 100, 'opsz' 48" }}>
              Terms of Service
            </h2>

            <div className="space-y-8 text-foreground/75 leading-relaxed">
              <div>
                <h3 className="text-lg font-medium text-white mb-3">1. Acceptance of Terms</h3>
                <p>
                  By accessing and using IC Vacation services, you agree to be bound by these terms. If you do not agree, please do not use our services.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-white mb-3">2. Service Description</h3>
                <p>
                  IC Vacation provides personalized travel consultation and itinerary planning services. Consultations are tailored to individual preferences and requirements.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-white mb-3">3. Payment and Booking</h3>
                <p>
                  Consultation fees and booking terms will be discussed during your initial consultation with Isaac. Payment terms are agreed upon before service commencement.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-white mb-3">4. Cancellation Policy</h3>
                <p>
                  Cancellations must be made with at least 14 days notice for a full refund. Cancellations within 14 days are subject to a 50% fee.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-white mb-3">5. Limitation of Liability</h3>
                <p>
                  IC Vacation is not responsible for any travel delays, cancellations, or incidents beyond our control. We recommend travel insurance for all bookings.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-white mb-3">6. Contact</h3>
                <p>
                  For questions regarding these terms, please contact us at hello@icvacation.com.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
