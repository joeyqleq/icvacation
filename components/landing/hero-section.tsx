"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const cyclingWords = ["quietly", "thoughtfully", "personally", "beautifully"];

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % cyclingWords.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Gentle single-axis parallax — just the background image drifts
  // slightly upward as the user scrolls.  No multi-layer jolt.
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Smooth parallax — image translates at 0.25x scroll
  const imageTransform = `translate3d(0, ${scrollY * 0.25}px, 0) scale(1.06)`;

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-start overflow-hidden bg-background">
      {/* === Cinematic landscape — single seamless scene === */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 will-change-transform"
          style={{ transform: imageTransform }}
        >
          <img
            src="/hero-landscape.jpg"
            alt="A still alpine lake at dawn, mist rising over the water, surrounded by quiet mountains"
            className="w-full h-full object-cover animate-ken-burns"
          />
        </div>

        {/* Editorial cinematic gradients — keep hero readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-background" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Floating dandelion accent — top right, low opacity, slow drift */}
      <div
        className="absolute -top-12 -right-24 z-[2] pointer-events-none hidden lg:block animate-drift-slow opacity-[0.12]"
        aria-hidden="true"
      >
        <img
          src="/dandelion-yellow.svg"
          alt=""
          className="w-[440px] h-[440px]"
        />
      </div>

      {/* Massive ghost word behind hero — editorial decoration */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-[10%] z-[1] pointer-events-none flex justify-end overflow-hidden"
      >
        <span
          className="font-serif italic text-white/[0.04] leading-none select-none whitespace-nowrap"
          style={{
            fontSize: "clamp(12rem, 26vw, 30rem)",
            transform: "translateX(8%)",
          }}
        >
          vacation
        </span>
      </div>

      {/* === HERO CONTENT === */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-32 lg:py-40">
        <div className="lg:max-w-[78%]">
          {/* Eyebrow ticker — Space Mono, brand green dot */}
          <div
            className={`mb-12 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="inline-flex items-center gap-3 label-ticker text-white/70">
              <span className="w-2 h-2 rounded-full pulse-green" />
              <span className="font-mono">[ 01 ]</span>
              <span className="w-8 h-px bg-brand-green/60" />
              Advisor-led vacations · est. 2014
            </span>
          </div>

          {/* === HEADLINE — three lines, mixed-voice editorial composition === */}
          <h1
            className={`text-left mb-12 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ textWrap: "balance" }}
          >
            {/* line 1 — condensed Bricolage, ultralight, vast tracking-tight */}
            <span
              className="block font-display-tight text-white leading-[0.86]"
              style={{
                fontSize: "clamp(3rem, 9vw, 9.5rem)",
                letterSpacing: "-0.04em",
              }}
            >
              Vacations,
            </span>

            {/* line 2 — Instrument Serif italic with brand green underline mark */}
            <span
              className="block font-serif italic text-brand-yellow leading-[0.95] -mt-2"
              style={{
                fontSize: "clamp(2.6rem, 8.4vw, 8.6rem)",
                paddingLeft: "0.06em",
                letterSpacing: "-0.015em",
              }}
            >
              shaped&nbsp;
              <span className="relative inline-block">
                <CyclingWord word={cyclingWords[wordIndex]} trigger={wordIndex} />
                <span
                  className="absolute left-0 right-0 bottom-[0.08em] h-[6px] bg-brand-green/80 -z-[1]"
                  style={{ filter: "blur(0.2px)" }}
                />
              </span>
            </span>

            {/* line 3 — wide Bricolage, white, terminal brand green period */}
            <span
              className="block font-display-wide text-white leading-[0.92] -mt-1"
              style={{
                fontSize: "clamp(3rem, 9vw, 9.5rem)",
                letterSpacing: "-0.035em",
              }}
            >
              around&nbsp;
              <span className="font-serif italic text-white/85">you</span>
              <span className="text-brand-green">.</span>
            </span>
          </h1>

          {/* Subhead — Newsreader editorial, italic emphasis */}
          <p
            className={`max-w-[560px] font-editorial text-[19px] md:text-[21px] lg:text-[22px] text-white/82 leading-[1.45] mb-12 transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{
              textWrap: "pretty",
              fontVariationSettings: "'opsz' 22",
            }}
          >
            A boutique travel practice led by{" "}
            <span className="font-serif italic text-white">
              Isaac Chowrimootoo
            </span>
            . Personal consultations, quietly curated itineraries, and the kind
            of trip you tell stories about for years.
          </p>

          {/* CTAs */}
          <div
            className={`flex flex-col sm:flex-row items-stretch sm:items-start gap-3 sm:gap-4 transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <a
              href="#contact"
              className="btn-primary group h-14 px-7 text-base justify-center sm:justify-start"
            >
              Book a consultation
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#destinations"
              className="btn-glass group inline-flex items-center justify-center sm:justify-start gap-3 text-white h-14 px-7 text-base"
            >
              See where we send people
              <span className="font-mono text-white/60 group-hover:translate-x-0.5 transition-transform">
                &rarr;
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Stats strip — three quiet measures */}
      <div
        className={`absolute bottom-10 left-0 right-0 px-6 lg:px-12 z-10 transition-all duration-700 delay-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-start gap-6 sm:gap-10 lg:gap-14">
          {[
            { idx: "01", value: "11 yrs", label: "shaping personal itineraries" },
            { idx: "02", value: "62",     label: "countries planned & visited" },
            { idx: "03", value: "1:1",    label: "advisor relationship, always" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex items-baseline gap-4 border-l border-brand-green/40 pl-5"
            >
              <span className="font-mono text-[10px] text-brand-green tracking-[0.32em]">
                {stat.idx}
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="text-2xl lg:text-[28px] font-display-wide text-white tracking-tight leading-none">
                  {stat.value}
                </span>
                <span className="label-ticker-sm text-white/55">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Cycling word — letter-by-letter blur reveal in Instrument Serif italic.
 * Uses CSS animations driven by a key change rather than per-letter state.
 */
function CyclingWord({ word, trigger }: { word: string; trigger: number }) {
  return (
    <span key={trigger} className="inline-block">
      {word.split("").map((char, i) => (
        <span
          key={i}
          className="inline-block animate-char-in"
          style={{
            animationDelay: `${i * 45}ms`,
            color: "var(--brand-yellow)",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
