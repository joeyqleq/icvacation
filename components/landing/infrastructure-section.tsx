"use client";

import { useEffect, useState, useRef } from "react";

const credentials = [
  { name: "Italy", years: "since 2014", note: "Hand-picked agriturismi, hill towns, the slower Tuscan north" },
  { name: "Japan", years: "since 2016", note: "Ryokan stays, regional cuisine, off-season Kyoto" },
  { name: "East Africa", years: "since 2018", note: "Mobile camps, owner-led safari lodges, conservation-led" },
  { name: "Iceland & the Faroes", years: "since 2020", note: "Quiet fjords, remote farm-stays, weather-led routing" },
];

export function AdvisorSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeRegion, setActiveRegion] = useState(0);
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
      setActiveRegion((prev) => (prev + 1) % credentials.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="advisor"
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
            Personal advisor
          </span>

          <div className="grid lg:grid-cols-[auto_1fr] gap-10 lg:gap-16 items-stretch">
            {/* Advisor desk image — left column */}
            <div
              className={`w-full lg:w-[420px] xl:w-[480px] shrink-0 transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="relative aspect-[4/5] overflow-hidden img-frame">
                <span className="img-frame-tr" aria-hidden="true" />
                <span className="img-frame-bl" aria-hidden="true" />
                <img
                  src="/images/ai/isaac-beach-advisor.png"
                  alt="Isaac advising on travel plans"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent pointer-events-none" />
                {/* Owl mascot — quiet brand presence, small */}
                <img
                  src="/mascot-owl.svg"
                  alt=""
                  aria-hidden="true"
                  className="absolute -bottom-4 -right-3 w-36 h-auto opacity-90 animate-drift-slow"
                />
              </div>
              <div className="mt-6 flex items-center gap-3">
                <span className="w-1 h-10 bg-brand-green" />
                <div>
                  <p className="text-base text-foreground">
                    Isaac Chowrimootoo
                  </p>
                  <p className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">
                    Founder · lead advisor
                  </p>
                </div>
              </div>
            </div>

            {/* Title + bio */}
            <div className="flex flex-col justify-center">
              <h2
                className={`text-5xl md:text-6xl lg:text-[112px] leading-[0.95] transition-all duration-1000 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <span className="premium-heading block">One advisor.</span>
                <span className="premium-heading-yellow block">Every detail.</span>
              </h2>

              <p
                className={`mt-10 text-lg lg:text-xl font-editorial text-white/82 leading-relaxed max-w-xl transition-all duration-1000 delay-100 ${
                  isVisible ? "opacity-100" : "opacity-0"
                }`}
              >
                Isaac has been quietly shaping vacations for travelers who care
                about the details since 2014. No call centres. No anonymous
                inbox. The person who plans your trip is the person you speak
                to — and the one who picks up when something needs solving on
                the road.
              </p>

              <div
                className={`mt-10 flex flex-wrap gap-x-10 gap-y-4 text-sm text-muted-foreground transition-all duration-1000 delay-200 ${
                  isVisible ? "opacity-100" : "opacity-0"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-brand-green" />
                  Independent advisor since 2014
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-brand-green" />
                  Signature Travel Network
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-brand-green" />
                  50+ countries personally visited
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quiet credentials strip — what Isaac specialises in */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Large signature stat */}
          <div
            className={`lg:col-span-2 relative p-8 lg:p-14 border border-foreground/10 bg-foreground/[0.02] overflow-hidden transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {/* Dandelion accents — quiet, ambient */}
            <img
              src="/ic-dandelion.svg"
              alt=""
              aria-hidden="true"
              className="absolute -top-6 -right-6 w-40 h-40 opacity-15 animate-drift"
            />
            <img
              src="/ic-dandelion.svg"
              alt=""
              aria-hidden="true"
              className="absolute bottom-8 right-32 w-16 h-16 opacity-10 animate-drift-slow"
            />

            <div className="relative z-10">
              <span className="text-xs font-mono uppercase tracking-[0.22em] text-muted-foreground">
                The signature
              </span>
              <div className="flex items-baseline gap-3 mt-4 mb-6">
                <span className="text-7xl lg:text-[9rem] font-display leading-none">
                  62
                </span>
                <span className="text-xl text-muted-foreground italic">
                  countries
                </span>
              </div>
              <p className="text-muted-foreground max-w-md text-lg leading-relaxed">
                Every itinerary is shaped from places Isaac has been to,
                stayed in, and walked through — never guessed at from a
                booking screen.
              </p>
            </div>
          </div>

          {/* Two quiet stat cards */}
          <div className="flex flex-col gap-6">
            <div
              className={`p-8 border border-foreground/10 bg-foreground/[0.02] transition-all duration-700 delay-100 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <span className="text-4xl lg:text-5xl font-display">24h</span>
              <span className="block text-sm text-muted-foreground mt-2">
                response, always
              </span>
            </div>

            <div
              className={`p-8 border border-foreground/10 bg-foreground/[0.02] transition-all duration-700 delay-200 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <span className="text-4xl lg:text-5xl font-display">1:1</span>
              <span className="block text-sm text-muted-foreground mt-2">
                relationship, by design
              </span>
            </div>
          </div>
        </div>

        {/* Specialism rows */}
        <div
          className={`mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {credentials.map((region, index) => (
            <div
              key={region.name}
              className={`p-6 border transition-all duration-300 cursor-default ${
                activeRegion === index
                  ? "border-brand-green/60 bg-brand-green/[0.04]"
                  : "border-foreground/10 hover:border-foreground/30"
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className={`w-1.5 h-1.5 transition-colors ${
                    activeRegion === index ? "bg-brand-green" : "bg-foreground/20"
                  }`}
                />
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.18em]">
                  {region.years}
                </span>
              </div>
              <span className="font-display text-xl block mb-2">
                {region.name}
              </span>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {region.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
