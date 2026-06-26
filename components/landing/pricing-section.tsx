"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { useContact } from "@/components/site/contact-provider";

const tiers = [
  {
    name: "Consultation",
    tag: "ENTRY",
    description: "For the trip you're already half-planning",
    price: { single: 350 },
    unit: "one-time",
    features: [
      "90-minute call with Isaac",
      "Written brief & recommendations",
      "Hand-picked stays & operators",
      "Destination calendar",
      "Booking guidance (you book)",
    ],
    cta: "Book a consultation",
    highlight: false,
  },
  {
    name: "Custom",
    tag: "SIGNATURE",
    description: "Most travelers come for this. Fully planned, advisor-led.",
    price: { single: 1850 },
    unit: "per trip",
    features: [
      "Everything in Consultation",
      "Full day-by-day itinerary",
      "All stays, transfers & guides booked",
      "On-the-ground concierge",
      "24-hour response while you travel",
      "2–3 collaborative drafts",
      "Reservations at our private network",
    ],
    cta: "Start planning",
    highlight: true,
  },
  {
    name: "Atelier",
    tag: "BESPOKE",
    description: "Multi-week, multi-region, complex travel for repeat clients.",
    price: { single: null },
    unit: "by application",
    features: [
      "Everything in Custom",
      "Multi-region routing",
      "Private aircraft & yachts",
      "Bespoke access & private guides",
      "Family or group logistics",
      "Dedicated trip director",
      "Year-round advisory",
    ],
    cta: "Apply for atelier",
    highlight: false,
  },
];

export function PricingSection() {
  const { openContact } = useContact();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="relative py-32 lg:py-40"
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="grid lg:grid-cols-12 gap-8 mb-20 items-end">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-3 text-xs font-mono uppercase tracking-[0.22em] text-muted-foreground mb-8">
              <span className="w-12 h-px bg-brand-green" />
              How we work together
            </span>
            <h2
              className={`text-5xl md:text-6xl lg:text-[112px] font-display tracking-tight leading-[0.95] transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              A relationship,
              <br />
              <span className="text-stroke italic">not a transaction.</span>
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p
              className={`text-lg text-muted-foreground leading-relaxed max-w-md transition-all duration-1000 delay-100 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              Three ways to begin. Most travelers start with a consultation,
              and many quietly stay with us for years after.
            </p>
          </div>
        </div>

        {/* Tier cards — sharper, Template B influenced, IC palette */}
        <div className="relative">
          <div className="grid lg:grid-cols-3 gap-4">
            {tiers.map((tier, index) => (
              <div
                key={tier.name}
                className={`relative bg-background border transition-all duration-700 ${
                  tier.highlight
                    ? "border-brand-green lg:scale-[1.025] lg:z-10"
                    : "border-foreground/15 hover:border-foreground/30"
                } ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {tier.highlight && (
                  <div className="absolute -top-3 left-8 right-8 flex justify-center">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-green text-black text-[10px] font-mono uppercase tracking-[0.22em]">
                      Most travelers choose this
                    </span>
                  </div>
                )}

                <div className="p-8 lg:p-10">
                  {/* Tier header */}
                  <div className="mb-8 pb-8 border-b border-foreground/10">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                        [ {String(index + 1).padStart(2, "0")} ]
                      </span>
                      <span
                        className={`px-2 py-0.5 text-[10px] font-mono uppercase tracking-[0.18em] border ${
                          tier.highlight
                            ? "border-brand-green text-brand-green"
                            : "border-foreground/15 text-muted-foreground"
                        }`}
                      >
                        {tier.tag}
                      </span>
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-display">
                      {tier.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                      {tier.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-10">
                    {tier.price.single !== null ? (
                      <div className="flex items-baseline gap-2">
                        <span
                          className={`text-5xl lg:text-6xl font-display ${
                            tier.highlight ? "text-brand-green" : ""
                          }`}
                        >
                          ${tier.price.single}
                        </span>
                        <span className="text-muted-foreground text-sm">
                          {tier.unit}
                        </span>
                      </div>
                    ) : (
                      <span className="text-4xl font-display italic text-muted-foreground">
                        By application
                      </span>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-10">
                    {tier.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3"
                      >
                        <Check className="w-4 h-4 text-brand-green mt-1 shrink-0" />
                        <span className="text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={openContact}
                    type="button"
                    className={`w-full py-4 flex items-center justify-center gap-2 text-sm font-medium transition-all group ${
                      tier.highlight
                        ? "bg-brand-green text-black hover:bg-brand-green/90"
                        : "border border-foreground/20 text-foreground hover:bg-foreground/5 hover:border-foreground/40"
                    }`}
                  >
                    {tier.cta}
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom note */}
        <div
          className={`mt-16 pt-10 border-t border-foreground/10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-brand-green" />
              Consultation fee credited toward Custom or Atelier
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-brand-green" />
              No commission-driven recommendations
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-brand-green" />
              Existing clients: skip the line
            </span>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <span className="text-xs text-muted-foreground italic">
              Indicative pricing · final fee discussed during consultation
            </span>
            <button
              onClick={openContact}
              type="button"
              className="text-sm underline underline-offset-4 hover:text-foreground transition-colors"
            >
              Have a question first? Ask Isaac →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
