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
          className="font-serif"
          style={{
            display: "inline-block",
            opacity: states[i]?.opacity ?? 0,
            filter: `blur(${states[i]?.blur ?? 16}px)`,
            color: "#FDF972",
            fontStyle: "italic",
          }}
        >
          {char}
        </span>
      ))}
    </>
  );
}

/**
 * Pre-calculated sparkle positions over the water region (left ~55% of frame).
 * Deterministic so SSR + client match.
 */
const SPARKLES = Array.from({ length: 28 }, (_, i) => {
  const seed = i * 1.618;
  return {
    left: 4 + ((seed * 73.1) % 50),
    top: 38 + ((seed * 41.7) % 32),
    delay: (seed * 0.31) % 4,
    duration: 2 + ((seed * 0.27) % 2),
    size: 1 + ((seed * 0.19) % 2),
  };
});

const BIRDS = [
  { top: "14%", delay: "0s", duration: "32s", scale: 0.55, opacity: 0.55 },
  { top: "22%", delay: "11s", duration: "38s", scale: 0.42, opacity: 0.5 },
  { top: "18%", delay: "20s", duration: "34s", scale: 0.48, opacity: 0.45 },
];

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % cyclingWords.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Multipoint parallax — track scroll to drive multiple layered transforms,
  // bridging the beach scene into the site's deep black background.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      // Normalize to 0..1 over first viewport
      const p = Math.min(1, Math.max(0, y / (window.innerHeight * 0.9)));
      setScrollProgress(p);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Layer transforms — multipoint
  const baseTransform = `translate3d(0, ${scrollProgress * 80}px, 0) scale(${1 + scrollProgress * 0.06})`;
  const skyTransform = `translate3d(0, ${scrollProgress * 40}px, 0)`;
  const foregroundTransform = `translate3d(0, ${scrollProgress * 140}px, 0)`;
  const contentTransform = `translate3d(0, ${scrollProgress * 60}px, 0)`;
  const blackoutOpacity = Math.min(1, scrollProgress * 1.4);
  const sceneBrightness = 1 - scrollProgress * 0.5;
  const sceneBlur = scrollProgress * 6;

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-start overflow-hidden bg-black">
      {/* === ATMOSPHERIC BEACH SCENE (multi-layer, seamless loop) === */}
      <div
        className="absolute inset-0 z-0"
        style={{
          filter: `brightness(${sceneBrightness}) blur(${sceneBlur}px)`,
          transition: "filter 0.08s linear",
        }}
      >
        {/* Sky layer — slowest parallax */}
        <div
          className="absolute inset-0 will-change-transform"
          style={{ transform: skyTransform, transition: "transform 0.08s linear" }}
        >
          <img
            src="/hero-beach.jpg"
            alt="Sunbathing first-person view over crystal clear turquoise water with a distant cruise ship and white sand beach"
            className="w-full h-full object-cover object-center"
            // Decorative-prime image: still loaded for accessibility but described
          />
        </div>

        {/* Mid layer — gentle living water shimmer over the ocean region */}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-overlay will-change-transform"
          style={{ transform: baseTransform, transition: "transform 0.08s linear" }}
          aria-hidden="true"
        >
          <div
            className="absolute left-0 right-[40%] top-[35%] h-[40%]"
            style={{
              background:
                "linear-gradient(110deg, transparent 0%, rgba(255,255,255,0.18) 35%, rgba(180,220,255,0.22) 50%, rgba(255,255,255,0.14) 65%, transparent 100%)",
              backgroundSize: "240% 240%",
              animation: "shimmer 14s ease-in-out infinite",
            }}
          />
          <div
            className="absolute left-0 right-[30%] top-[42%] h-[35%]"
            style={{
              background:
                "linear-gradient(80deg, transparent 30%, rgba(255,255,240,0.12) 50%, transparent 70%)",
              backgroundSize: "200% 200%",
              animation: "shimmer 22s ease-in-out infinite reverse",
              animationDelay: "3s",
            }}
          />
        </div>

        {/* Sun reflection sparkles on the water (deterministic positions, infinite seamless loop) */}
        <div
          className="absolute inset-0 pointer-events-none will-change-transform"
          style={{ transform: baseTransform, transition: "transform 0.08s linear" }}
          aria-hidden="true"
        >
          {SPARKLES.map((s, i) => (
            <span
              key={i}
              className="absolute rounded-full bg-white animate-twinkle"
              style={{
                left: `${s.left}%`,
                top: `${s.top}%`,
                width: `${s.size}px`,
                height: `${s.size}px`,
                animationDelay: `${s.delay}s`,
                animationDuration: `${s.duration}s`,
                boxShadow: "0 0 4px rgba(255,255,255,0.9)",
              }}
            />
          ))}
        </div>

        {/* Distant flying birds — loop seamlessly across the sky */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          {BIRDS.map((b, i) => (
            <div
              key={i}
              className="absolute -left-12 animate-float-bird"
              style={{
                top: b.top,
                animationDelay: b.delay,
                animationDuration: b.duration,
                opacity: b.opacity,
              }}
            >
              <svg
                width={28 * b.scale * 1.8}
                height={14 * b.scale * 1.8}
                viewBox="0 0 28 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.2))",
                }}
              >
                <path
                  d="M1 9 Q 6 2, 11 8 Q 14 4, 17 8 Q 22 2, 27 9"
                  stroke="#1f2937"
                  strokeWidth="1.4"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          ))}
        </div>

        {/* Foreground layer — moves faster on scroll to feel closer */}
        <div
          className="absolute inset-0 pointer-events-none will-change-transform"
          style={{ transform: foregroundTransform, transition: "transform 0.08s linear" }}
          aria-hidden="true"
        >
          {/* Bottom warm sun haze */}
          <div
            className="absolute inset-x-0 bottom-0 h-1/2"
            style={{
              background:
                "linear-gradient(to top, rgba(253,249,114,0.05) 0%, transparent 60%)",
            }}
          />
        </div>

        {/* Editorial cinematic gradients — keep hero readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/55" />
      </div>

      {/* === MULTIPOINT BLACKOUT TRANSITION INTO PAGE BODY === */}
      {/* Static fade at the bottom of the hero (always there) */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[40vh] z-[4] bg-gradient-to-b from-transparent via-black/70 to-black" />
      {/* Dynamic scroll-driven full-frame blackout — engages as user scrolls */}
      <div
        className="pointer-events-none absolute inset-0 z-[5] bg-black"
        style={{
          opacity: blackoutOpacity,
          transition: "opacity 0.08s linear",
        }}
        aria-hidden="true"
      />

      {/* Floating dandelion accent — top right, large/opacity-low cropped variant */}
      <div
        className="absolute -top-10 -right-20 z-[6] pointer-events-none hidden lg:block animate-drift-slow"
        aria-hidden="true"
        style={{
          opacity: 0.18 * (1 - scrollProgress),
        }}
      >
        <img
          src="/dandelion-yellow.svg"
          alt=""
          className="w-[420px] h-[420px]"
          style={{ filter: "blur(0.5px)" }}
        />
      </div>

      {/* === HERO CONTENT === */}
      <div
        className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-32 lg:py-40 will-change-transform"
        style={{
          transform: contentTransform,
          opacity: 1 - scrollProgress * 0.8,
          transition: "transform 0.08s linear, opacity 0.08s linear",
        }}
      >
        <div className="lg:max-w-[72%]">
          {/* Eyebrow */}
          <div
            className={`mb-10 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="inline-flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.28em] text-white/75">
              <span className="w-10 h-px bg-brand-yellow" />
              Advisor-led vacations · since 2014
            </span>
          </div>

          {/* Main headline — Fraunces variable, expressive editorial feel */}
          <div className="mb-10">
            <h1
              className={`text-left text-[clamp(2.8rem,7vw,7.5rem)] font-display leading-[0.92] tracking-[-0.02em] text-white transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{
                fontVariationSettings: "'SOFT' 100, 'WONK' 1, 'opsz' 144",
                textWrap: "balance",
              }}
            >
              <span className="block">Vacations,</span>
              <span className="block">
                shaped{" "}
                <span className="relative inline-block">
                  <FadeWord word={cyclingWords[wordIndex]} trigger={wordIndex} />
                </span>
              </span>
              <span className="block">
                around{" "}
                <span className="font-serif italic text-white/90">you</span>
                <span className="text-brand-yellow">.</span>
              </span>
            </h1>
          </div>

          {/* Subhead — Inter Tight body, premium boutique */}
          <p
            className={`max-w-xl text-base md:text-lg lg:text-xl text-white/80 leading-[1.55] mb-12 transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ textWrap: "pretty" }}
          >
            A boutique travel practice led by Isaac Chowrimootoo. Personal
            consultations, quietly curated itineraries, and the kind of trip
            you tell stories about for years.
          </p>

          {/* CTAs — unified glass + brand hover */}
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

      {/* Stats strip — quiet, atmospheric */}
      <div
        className={`absolute bottom-10 left-0 right-0 px-6 lg:px-12 z-10 transition-all duration-700 delay-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          opacity: (isVisible ? 1 : 0) * (1 - scrollProgress * 1.6),
        }}
      >
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-start gap-6 sm:gap-12 lg:gap-20">
          {[
            { value: "11 yrs", label: "shaping personal itineraries" },
            { value: "62", label: "countries planned & visited" },
            { value: "1:1", label: "advisor relationship, always" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="glass-panel flex flex-col gap-1.5 border-l-2 border-l-brand-yellow/70 pl-5 pr-6 py-3"
            >
              <span className="text-2xl lg:text-3xl font-display text-white tracking-tight">
                {stat.value}
              </span>
              <span className="text-[10px] sm:text-xs text-white/65 leading-tight font-mono uppercase tracking-[0.2em]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
