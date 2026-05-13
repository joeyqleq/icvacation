"use client";

import { useEffect, useState, useRef } from "react";

const numbers = [
  { value: "11", suffix: " yrs", label: "Shaping personal trips" },
  { value: "62", suffix: "", label: "Countries personally visited" },
  { value: "100", suffix: "%", label: "Hand-built itineraries" },
  { value: "24", suffix: "h", label: "Response, on the road" },
];

function AnimatedNumber({
  end,
  suffix = "",
}: {
  end: string;
  suffix?: string;
}) {
  const target = parseInt(end, 10);
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 1800;
          const startTime = performance.now();
          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return (
    <div ref={ref} className="inline-flex items-baseline">
      <span className="tabular-nums">{count}</span>
      <span>{suffix}</span>
    </div>
  );
}

export function NumbersSection() {
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
    <section ref={sectionRef} className="relative overflow-hidden bg-background">
      {/* Inbound transition: subtle dark→yellow fade so the band lands gracefully */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent z-10" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-16 pb-0">
        {/* The bold yellow stats band — Template B influence, IC palette */}
        <div className="relative bg-brand-yellow text-black overflow-hidden">
          {/* Subtle dandelion ambient — large, low opacity, cropped */}
          <img
            src="/dandelion-grey.svg"
            alt=""
            aria-hidden="true"
            className="absolute -top-16 -right-20 w-80 h-80 opacity-[0.08] animate-drift-slow rotate-12"
          />
          <img
            src="/dandelion-yellow.svg"
            alt=""
            aria-hidden="true"
            className="absolute -bottom-24 -left-16 w-72 h-72 opacity-[0.12] animate-drift -rotate-12"
          />

          <div className="relative z-10 p-8 lg:p-14">
            <div className="flex items-center justify-between mb-10 gap-4">
              <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-black/65">
                [ 04 ] // by the numbers
              </span>
              <span className="hidden sm:inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.18em] text-black/65">
                <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                still counting
              </span>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10">
              {numbers.map((num, index) => (
                <div
                  key={num.label}
                  className={`relative pl-5 lg:pl-8 ${
                    index !== 0 ? "lg:border-l border-black/15" : ""
                  } transition-all duration-700`}
                  style={{
                    transitionDelay: `${index * 80}ms`,
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(20px)",
                  }}
                >
                  <span
                    className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-display leading-none tracking-[-0.03em] block"
                    style={{ fontVariationSettings: "'wdth' 100, 'opsz' 144", letterSpacing: "-0.04em" }}
                  >
                    <AnimatedNumber end={num.value} suffix={num.suffix} />
                  </span>
                  <span className="block mt-3 lg:mt-4 text-[11px] lg:text-sm font-mono uppercase tracking-[0.18em] text-black/70">
                    {num.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom strip — quiet tags */}
          <div className="relative z-10 border-t border-black/20 px-8 lg:px-14 py-5 flex flex-wrap items-center gap-x-8 gap-y-2 text-[11px] font-mono uppercase tracking-[0.18em] text-black/65">
            <span>Virtuoso member</span>
            <span className="w-1 h-1 rounded-full bg-black/40" />
            <span>ASTA verified</span>
            <span className="w-1 h-1 rounded-full bg-black/40" />
            <span>Travel + Leisure A-List, 2023</span>
            <span className="w-1 h-1 rounded-full bg-black/40 hidden lg:block" />
            <span className="hidden lg:inline">Condé Nast Traveler Top Advisor</span>
          </div>
        </div>
      </div>

      {/* Outbound transition: graceful yellow → deep black bridge.
          Two-stage gradient: yellow softly fades to a warm dark tone, then to pure black.
          This eliminates the abrupt creamy-yellow to white shift that felt off-brand. */}
      <div className="relative h-32 lg:h-40">
        {/* Layer 1: yellow → warm shadow (sun setting on the field) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, var(--brand-yellow) 0%, rgba(253,249,114,0.45) 25%, rgba(80,68,20,0.7) 60%, var(--background) 100%)",
          }}
        />
        {/* Layer 2: dandelion silhouette drifting across the bridge */}
        <img
          src="/dandelion-grey.svg"
          alt=""
          aria-hidden="true"
          className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-40 h-40 opacity-20 animate-drift-slow"
        />
        {/* Layer 3: editorial film grain to mask the gradient banding */}
        <div
          className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </div>
    </section>
  );
}
