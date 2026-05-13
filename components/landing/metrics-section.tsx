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
    <section ref={sectionRef} className="relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* The bold yellow stats band — Template B influence, IC palette */}
        <div className="relative bg-brand-yellow text-black overflow-hidden">
          {/* Subtle dandelion ambient */}
          <img
            src="/ic-dandelion.svg"
            alt=""
            aria-hidden="true"
            className="absolute -top-12 -right-12 w-64 h-64 opacity-15 animate-drift-slow"
          />

          <div className="relative z-10 p-8 lg:p-14">
            <div className="flex items-center justify-between mb-10">
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
                  className={`relative pl-6 lg:pl-8 ${
                    index !== 0 ? "lg:border-l border-black/15" : ""
                  } transition-all duration-700`}
                  style={{
                    transitionDelay: `${index * 80}ms`,
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(20px)",
                  }}
                >
                  <span className="text-6xl lg:text-7xl xl:text-8xl font-display leading-none tracking-tight block">
                    <AnimatedNumber end={num.value} suffix={num.suffix} />
                  </span>
                  <span className="block mt-4 text-xs lg:text-sm font-mono uppercase tracking-[0.18em] text-black/70">
                    {num.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom strip — quiet tags */}
          <div className="relative z-10 border-t border-black/20 px-8 lg:px-14 py-5 flex flex-wrap items-center gap-x-10 gap-y-2 text-[11px] font-mono uppercase tracking-[0.18em] text-black/65">
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
    </section>
  );
}
