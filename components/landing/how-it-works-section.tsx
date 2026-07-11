"use client";

import { useEffect, useRef, useState } from "react";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { DandelionRiver } from "@/components/landing/dandelion-river";
import { SideRays } from "@/components/ui/side-rays";

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
      className="relative py-16 lg:py-20 bg-[#080808] text-white overflow-hidden"
    >
      {/* SideRays — ambient brand color glow from edges */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
        <SideRays rayColor1="#26FC00" rayColor2="#FFE500" rayCount={4} origin="both" />
      </div>
      <div
        className="absolute inset-x-0 top-0 h-40 pointer-events-none"
        style={{
          zIndex: 20,
          background: "linear-gradient(to bottom, #080808 0%, rgba(8,8,8,0.6) 60%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
        style={{
          zIndex: 20,
          background: "linear-gradient(to top, #080808 0%, rgba(8,8,8,0.6) 60%, transparent 100%)",
        }}
      />

      {/* === LAYER 1: Twinkling star field === */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        <StarsBackground
          starDensity={0.00008}
          allStarsTwinkle={false}
          twinkleProbability={0.6}
          minTwinkleSpeed={0.3}
          maxTwinkleSpeed={1.0}
          maxStarSize={1.3}
        />
      </div>

      {/* === LAYER 2: Shooting stars === */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
        <ShootingStars
          minSpeed={10}
          maxSpeed={26}
          minDelay={700}
          maxDelay={2400}
          starColor="#ffffff"
          trailColor="#b0b8e8"
          starWidth={200}
          starHeight={2}
          maxStars={5}
        />
      </div>

      {/* === LAYER 3: Dandelion river S-curve === */}
      <DandelionRiver />

      {/* Soft ambient blob */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-brand-green/[0.03] blur-[120px] pointer-events-none" style={{ zIndex: 4 }} />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Subtle tree decoration */}
        <img src="/icvacation_tree.svg" alt="" aria-hidden="true" className="absolute top-0 right-0 w-[280px] h-auto opacity-[0.06] pointer-events-none hidden lg:block" />
        {/* Header */}
        <div className="relative mb-16">
          <div>
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
