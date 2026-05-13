"use client";

import { useEffect, useState, useRef } from "react";
import { Compass, Feather, HeartHandshake, Map } from "lucide-react";

const principles = [
  {
    icon: Compass,
    title: "Slow, not packed",
    description:
      "We design days that breathe. Three things matter more than ten.",
  },
  {
    icon: Map,
    title: "Known places, deeply",
    description:
      "We work in regions Isaac has spent years in — never a list of countries on a brochure.",
  },
  {
    icon: HeartHandshake,
    title: "One human, end-to-end",
    description:
      "From first call to homecoming. No handoffs, no call centres.",
  },
  {
    icon: Feather,
    title: "Quietly luxurious",
    description:
      "Comfort is in the details, not the marble. We choose character over chandeliers.",
  },
];

export function PhilosophySection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % principles.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const active = principles[activeFeature];

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-32 lg:py-40 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-20">
          <span
            className={`inline-flex items-center gap-4 text-xs font-mono uppercase tracking-[0.22em] text-muted-foreground mb-8 transition-all duration-700 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="w-12 h-px bg-brand-green" />
            Philosophy
          </span>

          <h2
            className={`text-5xl md:text-6xl lg:text-[112px] font-display tracking-tight leading-[0.95] mb-12 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            Curated,
            <br />
            <span className="text-muted-foreground italic">not catalogued.</span>
          </h2>

          <div
            className={`transition-all duration-1000 delay-100 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Four quiet principles that shape every trip we plan — and every
              trip we politely decline.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Featured principle — big visual card */}
          <div
            className={`lg:col-span-7 relative p-8 lg:p-14 border border-foreground/10 min-h-[460px] overflow-hidden transition-all duration-700 bg-foreground/[0.02] ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {/* Penguin mascot — quiet, sparing */}
            <img
              src="/ic-penguin.svg"
              alt=""
              aria-hidden="true"
              className="absolute -bottom-6 -right-6 w-44 h-auto opacity-90 animate-drift-slow"
            />
            <img
              src="/ic-dandelion.svg"
              alt=""
              aria-hidden="true"
              className="absolute top-10 right-16 w-12 h-12 opacity-20 animate-drift"
            />

            <div className="relative z-10 max-w-md">
              <span className="text-xs font-mono uppercase tracking-[0.22em] text-muted-foreground">
                Currently
              </span>

              <div className="mt-8 mb-10 flex items-center gap-5">
                <div className="w-14 h-14 flex items-center justify-center border border-brand-green/40 bg-brand-green/[0.06]">
                  <active.icon className="w-6 h-6 text-brand-green" />
                </div>
                <span className="text-5xl lg:text-6xl font-display leading-none">
                  {active.title}
                </span>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                {active.description}
              </p>
            </div>

            {/* Quiet bottom strip */}
            <div className="absolute bottom-8 left-8 right-8 lg:left-14 flex flex-wrap gap-2">
              {principles.map((p, index) => (
                <span
                  key={p.title}
                  className={`px-3 py-1 text-[11px] font-mono uppercase tracking-[0.18em] border transition-all duration-500 ${
                    activeFeature === index
                      ? "border-brand-green/60 text-brand-green bg-brand-green/[0.06]"
                      : "border-foreground/10 text-muted-foreground"
                  }`}
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  0{index + 1}
                </span>
              ))}
            </div>
          </div>

          {/* Principle list */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {principles.map((p, index) => (
              <button
                key={p.title}
                onClick={() => setActiveFeature(index)}
                onMouseEnter={() => setActiveFeature(index)}
                className={`text-left p-6 border transition-all duration-500 cursor-pointer ${
                  activeFeature === index
                    ? "border-brand-green/50 bg-brand-green/[0.04]"
                    : "border-foreground/10 hover:border-foreground/30"
                } ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-8"
                }`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`shrink-0 w-10 h-10 flex items-center justify-center border transition-colors ${
                      activeFeature === index
                        ? "border-brand-green bg-brand-green text-black"
                        : "border-foreground/20 text-foreground/60"
                    }`}
                  >
                    <p.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1.5">{p.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
