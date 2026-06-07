"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    title: "Listen",
    subtitle: "the consultation",
    description:
      "A quiet conversation — sometimes a call, sometimes a long email. Isaac asks the questions that matter: who you travel with, how you move, what you want to feel.",
    note: "60-90 minutes · no obligation",
  },
  {
    number: "02",
    title: "Shape",
    subtitle: "the itinerary",
    description:
      "A hand-built day-by-day, refined together over two or three drafts. Every stay, ride, and dinner is chosen for the kind of traveler you are.",
    note: "2–3 weeks · refined collaboratively",
  },
  {
    number: "03",
    title: "Travel",
    subtitle: "& a real person on call",
    description:
      "On the road, Isaac is in your pocket. Weather shifts, a museum closes, a private guide opens up — the trip moves with you, not against you.",
    note: "24h response · for the entire trip",
  },
];

export function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#0f0f0f] text-white overflow-hidden"
    >
      {/* Soft ambient blob */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-brand-green/[0.03] blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Header — title + bird accent */}
        <div className="relative mb-16 grid lg:grid-cols-2 gap-6 lg:gap-12 items-end">
          <div className="overflow-hidden pb-0 lg:pb-24">
            <div
              className={`transition-all duration-1000 ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-12 opacity-0"
              }`}
            >
              <span className="inline-flex items-center gap-3 text-xs font-mono uppercase tracking-[0.22em] text-white/45 mb-8">
                <span className="w-12 h-px bg-brand-green" />
                The process
              </span>
            </div>

            <h2
              className={`text-5xl md:text-6xl lg:text-[112px] leading-[0.92] transition-all duration-1000 delay-100 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-16 opacity-0"
              }`}
            >
              <span className="premium-heading block">Listen.</span>
              <span className="premium-heading-yellow block">Shape.</span>
              <span className="premium-heading-glass block">Travel.</span>
            </h2>

            <p
              className={`mt-10 text-lg font-editorial text-white/80 leading-relaxed max-w-md transition-all duration-1000 delay-200 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              Three quiet stages. The middle one is where most of the magic
              actually lives.
            </p>
          </div>

          {/* Bird in flight — quiet ambient mascot */}
          <div
            className={`relative h-[260px] lg:h-[520px] overflow-hidden transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src="/mascot-bird.svg"
              alt=""
              aria-hidden="true"
              className="absolute right-8 bottom-8 lg:right-20 lg:bottom-20 w-48 lg:w-72 h-auto animate-drift-slow"
            />
            <img
              src="/dandelion-yellow.svg"
              alt=""
              aria-hidden="true"
              className="absolute left-12 top-12 w-20 h-auto opacity-50 animate-drift"
            />
            {/* Cinematic fade */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f0f] via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* The three quiet process cards — clean, advisor-led, Template B-sharp */}
        <div className="grid lg:grid-cols-3 gap-4">
          {steps.map((step, index) => (
            <button
              key={step.number}
              type="button"
              onClick={() => setActiveStep(index)}
              className={`relative text-left p-8 lg:p-12 border transition-all duration-500 ${
                activeStep === index
                  ? "bg-black border-brand-green/60"
                  : "bg-black border-white/15 hover:border-white/40"
              }`}
            >
              {/* Step number with line */}
              <div className="flex items-center gap-4 mb-10">
                <span
                  className={`font-mono text-xs uppercase tracking-[0.22em] transition-colors duration-300 ${
                    activeStep === index ? "text-brand-green" : "text-white/30"
                  }`}
                >
                  {step.number} //
                </span>
                <div className="flex-1 h-px bg-white/10 overflow-hidden">
                  {activeStep === index && (
                    <div className="h-full bg-brand-green/70 animate-progress" />
                  )}
                </div>
              </div>

              <h3 className="text-3xl lg:text-5xl font-display mb-1">
                {step.title}
              </h3>
              <span className="text-base text-white/40 font-display italic block mb-7">
                {step.subtitle}
              </span>

              <p
                className={`font-editorial text-[15px] sm:text-[16px] text-white/76 leading-relaxed mb-10 transition-opacity duration-300 ${
                  activeStep === index ? "opacity-100" : "opacity-70"
                }`}
              >
                {step.description}
              </p>

              <div className="pt-5 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-white/45">
                  {step.note}
                </span>
                <span
                  className={`text-xs font-mono transition-opacity ${
                    activeStep === index ? "text-brand-green opacity-100" : "opacity-0"
                  }`}
                >
                  ●
                </span>
              </div>

              {/* Active bottom bar */}
              <div
                className={`absolute bottom-0 left-0 right-0 h-px bg-brand-green transition-transform duration-500 origin-left ${
                  activeStep === index ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
        .animate-progress {
          animation: progress 6s linear forwards;
        }
      `}</style>
    </section>
  );
}
