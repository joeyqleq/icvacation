"use client";

import { useEffect } from "react";
import { Navigation } from "@/components/landing/navigation";
import { PageShell } from "@/components/site/page-shell";
import { FooterSection } from "@/components/landing/footer-section";
import { useContact } from "@/components/site/contact-provider";
import { PixelButton } from "@/components/site/pixel-button";
import { BackgroundBoxes } from "@/components/site/background-boxes";
import { Mascot } from "@/components/site/mascot";
import { Mail, Phone, MapPin, ArrowUpRight, Clock } from "lucide-react";

export default function ContactPage() {
  const { openContact } = useContact();

  // Auto-open the modal when the page loads — contact is the primary action here
  useEffect(() => {
    const t = setTimeout(openContact, 380);
    return () => clearTimeout(t);
  }, [openContact]);

  return (
    <PageShell>
      <Navigation />

      <main className="relative pt-32 sm:pt-40 pb-16 sm:pb-24 lg:pb-32 overflow-hidden">
        <BackgroundBoxes variant="green" />

        <div className="absolute inset-0 pointer-events-none">
          <img
            src="/hero-landscape.jpg"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-center opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/70 to-background" />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-3 label-ticker text-white/70 mb-5">
                <span className="w-2 h-2 rounded-full pulse-green" />
                <span className="font-mono">[ contact ]</span>
                <span className="w-8 h-px bg-brand-green/60" />
                Reach Isaac directly
              </span>

              <h1
                className="font-display-tight text-white leading-[0.92] tracking-[-0.04em] mb-6"
                style={{ fontSize: "clamp(2.6rem, 7.2vw, 6.8rem)" }}
              >
                Tell us about
                <br />
                <span className="font-serif italic text-brand-yellow">the trip on your mind.</span>
              </h1>

              <p
                className="max-w-[560px] font-editorial text-[17px] sm:text-[19px] text-white/80 leading-[1.5] mb-8"
                style={{ textWrap: "pretty" }}
              >
                The full inquiry form is one click away. The more you can tell
                us now — destination instincts, dates, who&apos;s travelling,
                budget shape — the more personal the first call will feel.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <PixelButton variant="yellow" onClick={openContact}>
                  Open the inquiry form
                  <ArrowUpRight className="w-4 h-4" />
                </PixelButton>
                <PixelButton variant="grey" href="/about-isaac">
                  Read about Isaac first
                  <span className="font-mono opacity-70">&rarr;</span>
                </PixelButton>
              </div>

              {/* Quiet meta */}
              <div className="mt-12 sm:mt-16 grid sm:grid-cols-3 gap-5 sm:gap-6 max-w-2xl">
                {[
                  { icon: Mail,  label: "Email",       value: "info@icvacation.com", href: "mailto:info@icvacation.com" },
                  { icon: Phone, label: "Consultation", value: "By appointment",       href: "mailto:info@icvacation.com" },
                  { icon: Clock, label: "Reply time",  value: "Within one working day"                                   },
                ].map((row) => (
                  <div key={row.label} className="flex flex-col gap-1 border-l border-brand-green/40 pl-4">
                    <span className="label-ticker-sm text-white/55 flex items-center gap-2">
                      <row.icon className="w-3.5 h-3.5 text-brand-green" />
                      {row.label}
                    </span>
                    {row.href ? (
                      <a href={row.href} className="text-white/85 hover:text-brand-green transition-colors text-sm">
                        {row.value}
                      </a>
                    ) : (
                      <span className="text-white/85 text-sm">{row.value}</span>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-10 flex items-start gap-3 text-sm text-white/55 max-w-xl">
                <MapPin className="w-4 h-4 text-brand-green mt-0.5 shrink-0" />
                <span>
                  Based in London — available globally for video consultation
                  across all timezones.
                </span>
              </div>
            </div>

            {/* Mascot column */}
            <div className="hidden lg:flex lg:col-span-5 justify-center relative">
              <div className="relative">
                <Mascot creature="penguin" size={420} pose="hover" tint="yellow" glow />
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-56 h-1 bg-gradient-to-r from-transparent via-brand-green/60 to-transparent blur-sm" />
              </div>
            </div>
          </div>
        </div>
      </main>

      <FooterSection />
    </PageShell>
  );
}
