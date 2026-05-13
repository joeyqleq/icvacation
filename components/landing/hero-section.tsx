"use client";

import { useEffect, useState, useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const cyclingWords = ["quietly", "thoughtfully", "personally", "beautifully"];

function FadeWord({ word, trigger }: { word: string; trigger: number }) {
  const letters = word.split("");
  const STAGGER = 45;
  const DURATION = 520;

  const [states, setStates] = useState<{ opacity: number; blur: number }[]>(
    letters.map(() => ({ opacity: 0, blur: 16 }))
  );
  const framesRef = useRef<number[]>([]);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    framesRef.current.forEach(cancelAnimationFrame);
    timersRef.current.forEach(clearTimeout);
    framesRef.current = [];
    timersRef.current = [];

    setStates(letters.map(() => ({ opacity: 0, blur: 16 })));

    letters.forEach((_, i) => {
      const t = setTimeout(() => {
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / DURATION, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setStates((prev) => {
            const next = [...prev];
            next[i] = { opacity: eased, blur: 16 * (1 - eased) };
            return next;
          });
          if (progress < 1) {
            const id = requestAnimationFrame(tick);
            framesRef.current.push(id);
          }
        };
        const id = requestAnimationFrame(tick);
        framesRef.current.push(id);
      }, i * STAGGER);
      timersRef.current.push(t);
    });

    return () => {
      framesRef.current.forEach(cancelAnimationFrame);
      timersRef.current.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  return (
    <>
      {letters.map((char, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            opacity: states[i]?.opacity ?? 0,
            filter: `blur(${states[i]?.blur ?? 16}px)`,
            color: "#26FC00",
            fontStyle: "italic",
          }}
        >
          {char}
        </span>
      ))}
    </>
  );
}

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % cyclingWords.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-start overflow-hidden bg-black">
      {/* Cinematic background photograph */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-landscape.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center"
        />
        {/* Cinematic gradient overlays — dark left for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />
      </div>

      {/* Subtle grid lines */}
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none opacity-[0.08]">
        {[...Array(8)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute h-px bg-white"
            style={{
              top: `${12.5 * (i + 1)}%`,
              left: 0,
              right: 0,
            }}
          />
        ))}
        {[...Array(12)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute w-px bg-white"
            style={{
              left: `${8.33 * (i + 1)}%`,
              top: 0,
              bottom: 0,
            }}
          />
        ))}
      </div>

      {/* Floating dandelion accent — top right */}
      <div
        className="absolute top-32 right-12 z-[3] pointer-events-none hidden lg:block animate-drift-slow"
        aria-hidden="true"
      >
        <img
          src="/ic-dandelion.svg"
          alt=""
          className="w-24 h-24 opacity-60"
        />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-32 lg:py-40">
        <div className="lg:max-w-[68%]">
          {/* Eyebrow */}
          <div
            className={`mb-10 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="inline-flex items-center gap-3 text-xs font-mono uppercase tracking-[0.22em] text-white/70">
              <span className="w-8 h-px bg-brand-green" />
              Advisor-led vacations · since 2014
            </span>
          </div>

          {/* Main headline */}
          <div className="mb-10">
            <h1
              className={`text-left text-[clamp(2.5rem,6.4vw,7rem)] font-display leading-[0.95] tracking-tight text-white transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <span className="block">Vacations,</span>
              <span className="block">
                shaped{" "}
                <span className="relative inline-block">
                  <FadeWord word={cyclingWords[wordIndex]} trigger={wordIndex} />
                </span>
              </span>
              <span className="block">around{" "}
                <span className="italic text-white/85">you</span>.
              </span>
            </h1>
          </div>

          {/* Subhead */}
          <p
            className={`max-w-xl text-lg lg:text-xl text-white/75 leading-relaxed mb-12 transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            A boutique travel practice led by Isaac Chowrimootoo. Personal
            consultations, quietly curated itineraries, and the kind of trip
            you tell stories about for years.
          </p>

          {/* CTAs */}
          <div
            className={`flex flex-col sm:flex-row items-start gap-4 transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 bg-brand-green hover:bg-brand-green/90 text-black h-14 px-7 text-base font-medium transition-colors"
            >
              Book a consultation
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#destinations"
              className="group inline-flex items-center gap-3 border border-white/30 text-white hover:bg-white/5 h-14 px-7 text-base transition-colors"
            >
              See where we send people
              <span className="font-mono text-white/50 group-hover:translate-x-0.5 transition-transform">
                &rarr;
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Stats — 3 quietly stated proof points */}
      <div
        className={`absolute bottom-12 left-0 right-0 px-6 lg:px-12 transition-all duration-700 delay-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-start gap-8 sm:gap-14 lg:gap-24">
          {[
            { value: "11 yrs", label: "shaping personal itineraries" },
            { value: "62", label: "countries planned & visited" },
            { value: "1:1", label: "advisor relationship, always" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col gap-2 border-l border-brand-green/50 pl-5"
            >
              <span className="text-2xl lg:text-4xl font-display text-white">
                {stat.value}
              </span>
              <span className="text-xs text-white/55 leading-tight font-mono uppercase tracking-[0.15em]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
