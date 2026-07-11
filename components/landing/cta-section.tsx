"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Minus, Plus } from "lucide-react";
import { PixelButton } from "@/components/site/pixel-button";
import { BackgroundBoxes } from "@/components/site/background-boxes";
import { useContact } from "@/components/site/contact-provider";
import { ColorBends } from "@/components/ui/color-bends";
import { ScrambledText } from "@/components/ui/scrambled-text";

const faqs = [
  {
    q: "Do I have to know where I want to go?",
    a: "Not at all. Most travelers come to us with a feeling, a window of time, or a memory they want to chase. We translate that into places. Knowing nothing is genuinely a fine place to start.",
  },
  {
    q: "How is this different from Expedia, Booking, or my credit card concierge?",
    a: "We don't surface inventory. We don't run a call centre. Isaac plans your trip personally, end-to-end, and is the one human you speak to throughout. The difference shows up most when something goes wrong on the road — and that almost always happens.",
  },
  {
    q: "Is the consultation fee refundable if I book a custom trip?",
    a: "It's credited in full toward your Custom or Atelier itinerary. If we decide we're not the right fit for the trip — which does happen — we'll tell you, and refund it.",
  },
  {
    q: "What kind of traveler is this not for?",
    a: "Travelers who want the cheapest possible rate, who prefer to book themselves piece by piece, or who want a packed sightseeing checklist. We genuinely respect all of those styles — we're just not the right tool for them.",
  },
  {
    q: "Can you plan family, group, or multi-generation trips?",
    a: "Yes. Family travel is one of Isaac's specialisms. The Atelier tier is built for multi-generation and group itineraries with multiple needs running in parallel.",
  },
];

export function FaqCtaSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const { openContact } = useContact();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <BackgroundBoxes variant="mixed" />
      {/* ColorBends — subtle ambient green glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ColorBends color="#26FC00" intensity={0.8} className="opacity-20" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* FAQ */}
        <div className="grid lg:grid-cols-12 gap-12 mb-24 lg:mb-32">
          <div className="lg:col-span-4">
            <span className="inline-flex items-center gap-3 text-xs font-mono uppercase tracking-[0.22em] text-muted-foreground mb-6">
              <span className="w-12 h-px bg-brand-green" />
              Frequently asked
            </span>
            <h2
              className={`text-5xl lg:text-7xl font-display tracking-tight leading-[0.95] transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <ScrambledText scrambleChars="ABCDEFGHIJKLMNOPQRSTUVWXYZ" speed={0.4} radius={100}>Before</ScrambledText>
              <br />
              <span className="text-muted-foreground italic">we begin.</span>
            </h2>
            <p className="mt-8 text-muted-foreground leading-relaxed max-w-sm">
              The questions Isaac is asked most. If yours isn&apos;t here,{" "}
              <button
                onClick={openContact}
                className="text-brand-green hover:underline underline-offset-4 cursor-pointer"
              >
                ask him directly
              </button>
              .
            </p>

            {/* Sunflower decoration */}
            <div className="hidden lg:block mt-12 relative">
              <img src="/icvacation_sunflower.svg" alt="" aria-hidden="true" className="w-48 h-auto opacity-60 animate-drift-slow" />
            </div>
          </div>

          <div className="lg:col-span-8">
            <ul className="border-t border-foreground/15">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <li key={faq.q} className="border-b border-foreground/15">
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="w-full flex items-start justify-between gap-6 py-6 lg:py-7 text-left group"
                    >
                      <div className="flex items-start gap-5 flex-1">
                        <span className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground pt-1.5 shrink-0">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`text-lg lg:text-xl transition-colors duration-300 ${
                            isOpen ? "text-brand-green" : "text-foreground group-hover:text-foreground/80"
                          }`}
                        >
                          {faq.q}
                        </span>
                      </div>
                      <span
                        className={`shrink-0 w-8 h-8 mt-1 flex items-center justify-center border transition-colors ${
                          isOpen
                            ? "border-brand-green text-brand-green"
                            : "border-foreground/20 text-foreground/60 group-hover:border-foreground/40"
                        }`}
                      >
                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </span>
                    </button>
                    <div
                      className={`grid transition-all duration-500 ease-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="pl-0 sm:pl-12 pr-12 pb-7 text-muted-foreground leading-relaxed max-w-2xl">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Cinematic CTA */}
        <div
          className={`relative border border-foreground/30 transition-all duration-1000 overflow-hidden ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setMouse({
              x: ((e.clientX - rect.left) / rect.width) * 100,
              y: ((e.clientY - rect.top) / rect.height) * 100,
            });
          }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <img src="/cta-vista.jpg" alt="" aria-hidden="true" className="w-full h-full object-cover object-center opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
          </div>

          <div
            className="absolute inset-0 opacity-30 pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(700px circle at ${mouse.x}% ${mouse.y}%, rgba(38,252,0,0.10), transparent 50%)`,
            }}
          />

          <div className="relative z-10 px-8 lg:px-16 py-16 lg:py-24">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="flex-1 max-w-2xl">
                <span className="inline-flex items-center gap-3 text-xs font-mono uppercase tracking-[0.22em] text-muted-foreground mb-6">
                  <span className="w-8 h-px bg-brand-green" />
                  Begin
                </span>
                <h2 className="text-5xl md:text-6xl lg:text-[64px] font-display tracking-tight mb-8 leading-[0.98]">
                  When you&apos;re ready,
                  <br />
                  <span className="italic text-brand-green">so are we.</span>
                </h2>

                <p className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-xl">
                  Book a 90-minute consultation, no obligation. Bring a window of
                  time, a feeling, or nothing at all.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-3">
                  <PixelButton variant="yellow" onClick={openContact}>
                    Book a consultation
                    <ArrowUpRight className="w-4 h-4" />
                  </PixelButton>
                  <PixelButton variant="grey" onClick={openContact}>
                    Write to Isaac
                    <span className="font-mono opacity-70">&rarr;</span>
                  </PixelButton>
                </div>

                <p className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground mt-8">
                  Consultation fee credited toward your trip
                </p>
              </div>

              {/* Right column — seal mascot */}
              <div className="hidden lg:flex flex-col items-end justify-center gap-2 w-[280px] xl:w-[340px] shrink-0">
                <img src="/icavacation_seal.svg" alt="" aria-hidden="true" className="w-64 h-auto opacity-90 animate-drift-slow" />
              </div>
            </div>
          </div>

          <div className="absolute top-0 right-0 w-24 h-24 border-b border-l border-foreground/20" />
          <div className="absolute bottom-0 left-0 w-24 h-24 border-t border-r border-foreground/20" />
        </div>
      </div>
    </section>
  );
}
