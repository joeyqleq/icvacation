"use client";

import { useEffect, useState, useRef } from "react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Isaac doesn't just plan trips, he listens. Our anniversary in the Dolomites felt like it had been imagined by someone who has known us for years.",
    author: "H. & M.",
    role: "Returning clients",
    trip: "Northern Italy, 12 nights",
    metric: { value: "4×", label: "trips planned, so far" },
  },
  {
    quote:
      "Every choice was deliberate. The lodge in the Mara, the timing of the migration crossing, even the bookshop he sent us to in Nairobi. Quietly extraordinary.",
    author: "J.K.",
    role: "Solo traveler",
    trip: "Kenya, 9 nights",
    metric: { value: "0", label: "moments of doubt" },
  },
  {
    quote:
      "We're picky travelers. We don't want guides, we don't want crowds, we don't want a brochure. Isaac gave us a Kyoto we'll be telling friends about for a decade.",
    author: "P. & S.",
    role: "Honeymoon",
    trip: "Japan, 16 nights",
    metric: { value: "16", label: "perfectly paced nights" },
  },
  {
    quote:
      "When our flight rerouted mid-trip, Isaac had a new lodge, a new transfer, and a written apology from the airline by the time we landed. That's what an advisor is.",
    author: "The H. Family",
    role: "Four travelers",
    trip: "Iceland, 8 nights",
    metric: { value: "24h", label: "support, always" },
  },
];

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 8500);
    return () => clearInterval(interval);
  }, []);

  const goTo = (index: number) => setActiveIndex(index);
  const goPrev = () =>
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  const goNext = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);

  const t = testimonials[activeIndex];

  return (
    <section
      id="stories"
      ref={sectionRef}
      className="relative pt-28 lg:pt-40 pb-16 lg:pb-24 bg-background text-foreground"
    >
      {/* Atmospheric backdrop — radial glow + dandelion crop */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(253,249,114,0.04), transparent 70%)",
        }}
      />
      <img
        src="/dandelion-grey.svg"
        alt=""
        aria-hidden="true"
        className="absolute -top-16 -left-24 w-[28rem] h-[28rem] opacity-[0.04] nav-orb-spin"
      />
      <img
        src="/dandelion-yellow.svg"
        alt=""
        aria-hidden="true"
        className="absolute -bottom-32 -right-24 w-[26rem] h-[26rem] opacity-[0.06] nav-orb-spin"
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-16 lg:mb-20 gap-8">
          <div>
            <span className="inline-flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.22em] text-muted-foreground mb-5">
              <span className="w-12 h-px bg-brand-yellow" />
              [ 05 ] // Client stories
            </span>
            <h2
              className={`text-4xl md:text-5xl lg:text-7xl font-display leading-[0.95] tracking-[-0.02em] transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ fontVariationSettings: "'wdth' 80, 'opsz' 96", textWrap: "balance", letterSpacing: "-0.035em" }}
            >
              Quietly,
              <br />
              <span className="font-serif italic text-muted-foreground">
                in their own words.
              </span>
            </h2>
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={goPrev}
              aria-label="Previous testimonial"
              className="glass-panel p-4 hover:border-foreground/30 transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goNext}
              aria-label="Next testimonial"
              className="glass-panel p-4 hover:border-foreground/30 transition-all duration-300"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main quote — glass treatment */}
        <div className="relative">
          {/* Decorative giant quote glyph */}
          <Quote
            className="absolute -top-8 -left-2 lg:-top-12 lg:-left-6 w-24 h-24 lg:w-40 lg:h-40 text-brand-yellow/[0.06]"
            strokeWidth={1}
            aria-hidden="true"
          />

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-7 relative">
              <blockquote
                key={activeIndex}
                className="font-serif italic text-2xl md:text-3xl lg:text-[40px] leading-[1.3] tracking-[-0.005em] animate-fadeSlideIn text-foreground/95"
                style={{ textWrap: "pretty" }}
              >
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="mt-10 flex items-center gap-5">
                <div className="w-14 h-14 glass-panel flex items-center justify-center shrink-0">
                  <span className="font-display text-xl text-brand-yellow">
                    {t.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-base lg:text-lg text-foreground">{t.author}</p>
                  <p className="text-muted-foreground text-xs lg:text-sm font-mono uppercase tracking-[0.15em] mt-1">
                    {t.role} · {t.trip}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-center gap-6">
              <div
                key={`m-${activeIndex}`}
                className="glass-card p-8 lg:p-10 animate-fadeSlideIn relative overflow-hidden"
              >
                {/* Soft inner glow */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-50"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 0%, rgba(253,249,114,0.08), transparent 60%)",
                  }}
                />
                <span
                  className="relative text-6xl lg:text-8xl font-display block mb-3 text-brand-yellow tracking-[-0.04em]"
                  style={{ fontVariationSettings: "'wdth' 100, 'opsz' 144", letterSpacing: "-0.02em" }}
                >
                  {t.metric.value}
                </span>
                <span className="relative text-sm lg:text-base text-muted-foreground font-mono uppercase tracking-[0.15em]">
                  {t.metric.label}
                </span>
              </div>

              <div className="flex gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goTo(idx)}
                    aria-label={`Story ${idx + 1}`}
                    className="flex-1 h-1 bg-foreground/15 overflow-hidden"
                  >
                    <div
                      className={`h-full transition-all duration-300 bg-brand-yellow ${
                        idx === activeIndex
                          ? "w-full"
                          : idx < activeIndex
                          ? "w-full opacity-40"
                          : "w-0"
                      }`}
                      style={
                        idx === activeIndex
                          ? { animation: "progress 8.5s linear forwards" }
                          : {}
                      }
                    />
                  </button>
                ))}
              </div>

              <div className="mt-4 pt-6 border-t border-foreground/10">
                <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-[0.22em] block mb-4">
                  Recent travels
                </span>
                <div className="flex flex-wrap gap-2">
                  {testimonials.map((s, idx) => (
                    <button
                      key={s.author}
                      onClick={() => goTo(idx)}
                      className={`px-3.5 py-1.5 text-xs lg:text-sm transition-all duration-300 ${
                        idx === activeIndex
                          ? "glass-panel border-brand-yellow/50 text-brand-yellow"
                          : "border border-foreground/10 text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                      }`}
                    >
                      {s.trip.split(",")[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fadeSlideIn {
          animation: fadeSlideIn 0.5s ease-out forwards;
        }
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
