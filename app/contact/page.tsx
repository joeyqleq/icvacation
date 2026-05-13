'use client';

import { Navigation } from '@/components/landing/navigation';
import { PageShell } from '@/components/site/page-shell';
import { PageHero } from '@/components/site/page-hero';
import { PageCta } from '@/components/site/page-cta';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });

  return (
    <PageShell>
      <Navigation />
      
      <PageHero
        title="Begin a conversation with Isaac"
        subtitle="Share your travel dreams, and let's shape something extraordinary together."
        description="IC Vacation is personal by design. Whether you're dreaming of a quiet escape or an adventure abroad, Isaac reads every inquiry personally and responds thoughtfully within 24 hours."
      />

      <section className="relative py-20 lg:py-32 bg-black">
        <div className="container max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20">
            {/* Contact form */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl lg:text-4xl font-display tracking-tight mb-4" style={{ fontVariationSettings: "'wdth' 100, 'opsz' 48" }}>
                  Tell us about your ideal getaway.
                </h2>
                <p className="text-foreground/65 leading-relaxed">
                  We'll listen closely to your preferences, constraints, and dreams — then shape an itinerary that feels uniquely yours.
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // Form submission would go here
                  console.log('[v0] Form submitted:', formState);
                }}
                className="space-y-5"
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Your name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-brand-green/50"
                    placeholder="Isaac would like to know…"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-brand-green/50"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Your message
                  </label>
                  <textarea
                    id="message"
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    rows={6}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-brand-green/50 resize-none"
                    placeholder="Tell us about your travel vision, preferred pace, who you're traveling with, and what makes you come alive…"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary group w-full h-12 justify-center"
                >
                  Send inquiry
                  <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </form>
            </div>

            {/* Contact info */}
            <div className="space-y-12">
              <div>
                <div className="flex items-start gap-4 mb-6">
                  <Mail className="w-5 h-5 text-brand-green mt-1 shrink-0" />
                  <div>
                    <h3 className="font-medium mb-1">Email</h3>
                    <a href="mailto:hello@icvacation.com" className="text-foreground/65 hover:text-brand-green transition-colors">
                      hello@icvacation.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 mb-6">
                  <Phone className="w-5 h-5 text-brand-green mt-1 shrink-0" />
                  <div>
                    <h3 className="font-medium mb-1">Phone</h3>
                    <a href="tel:+44-123-456-7890" className="text-foreground/65 hover:text-brand-green transition-colors">
                      +44 (0) 123 456 7890
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-brand-green mt-1 shrink-0" />
                  <div>
                    <h3 className="font-medium mb-1">Based in</h3>
                    <p className="text-foreground/65">
                      London, UK<br />
                      Available globally
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <p className="text-sm leading-relaxed text-foreground/65">
                  <strong className="text-white">Response time:</strong> Isaac reads and responds to all inquiries within 24 hours. For urgent requests, reach out via phone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PageCta />
    </PageShell>
  );
}
