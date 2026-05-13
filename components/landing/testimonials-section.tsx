"use client";

import { useEffect, useState, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const testimonials = [
  {
    quote:
      "Isaac doesn't just plan trips, he listens. Our anniversary in the Dolomites felt like it had been imagined by someone who has known us for years.",
    author: "Helena & Marc V.",
    role: "Returning clients",
    trip: "Northern Italy, 12 nights",
    metric: { value: "4×", label: "trips planned, so far" },
  },
  {
    quote:
      "Every choice was deliberate. The lodge in the Mara, the timing of the migration crossing, even the bookshop he sent us to in Nairobi. Quietly extraordinary.",
    author: "James K.",
    role: "Solo traveler",
    trip: "Kenya, 9 nights",
    metric: { value: "0", label: "moments of doubt" },
  },
  {
    quote:
      "We're picky travelers. We don't want guides, we don't want crowds, we don't want a brochure. Isaac gave us a Kyoto we'll be telling friends about for a decade.",
    author: "Priya & Sam",
    role: "Honeymoon",
    trip: "Japan, 16 nights",
    metric: { value: "16", label: "perfectly paced nights" },
  },
  {
    quote:
      "When our flight rerouted mid-trip, Isaac had a new lodge, a new transfer, and a written apology from the airline by the time we landed. That's what an advisor is.",
    author: "The Hartwood Family",
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
      className="relative py-32 lg:py-40 bg-foreground text-background overflow-hidden"
    >
      {/* Subtle quote pattern — deterministic so SSR & client match */}
      <div className="absolute inset-0 font-mono text-[10px] text-background/[0.02] leading-tight overflow-hidden whitespace-pre select-none" aria-hidden="true">
        {Array.from({ length: 60 }, (_, row) =>
          Array.from({ length: 100 }, (_, col) => {
            // Cheap hash so the layout is stable but visually scattered
            const v = (row * 73856093) ^ (col * 19349663);
            return ((v >>> 0) % 100) > 72 ? '"' : " ";
          }).join("")
        ).join("\n")}
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex items-end justify-between mb-20 gap-8">
          <div>
            <span className="inline-flex items-center gap-3 text-xs font-mono uppercase tracking-[0.22em] text-background/40 mb-5">
              <span className="w-12 h-px bg-brand-green-deep" />
              Client stories
            </span>
            <h2
              className={`text-4xl md:text-5xl lg:text-6xl font-display leading-tight transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              Quietly,
              <br />
              <span className="text-background/45 italic">
                in their own words.
              </span>
            </h2>
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={goPrev}
              aria-label="Previous testimonial"
              className="p-4 border border-background/20 hover:bg-background/10 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goNext}
              aria-label="Next testimonial"
              className="p-4 border border-background/20 hover:bg-background/10 transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main quote */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-7 relative">
            <span className="absolute -left-4 -top-12 text-[220px] font-display text-background/[0.06] leading-none select-none">
              &ldquo;
            </span>

            <div className="relative">
              <blockquote
                key={activeIndex}
                className="text-2xl lg:text-4xl xl:text-[42px] font-display leading-[1.25] tracking-tight animate-fadeSlideIn"
              >
                {t.quote}
              </blockquote>

              <div className="mt-12 flex items-center gap-6">
                <div className="w-14 h-14 border border-background/30 flex items-center justify-center">
                  <span className="font-display text-xl">{t.author.charAt(0)}</span>
                </div>
                <div>
                  <p className="text-lg">{t.author}</p>
                  <p className="text-background/55 text-sm">
                    {t.role} · {t.trip}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-center gap-6">
            <div
              key={`m-${activeIndex}`}
              className="p-10 border border-background/20 bg-background/[0.04] animate-fadeSlideIn"
            >
              <span className="text-7xl lg:text-8xl font-display block mb-4 text-brand-green-deep">
                {t.metric.value}
              </span>
              <span className="text-base text-background/60">
                {t.metric.label}
              </span>
            </div>

            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goTo(idx)}
                  aria-label={`Story ${idx + 1}`}
                  className="flex-1 h-1 bg-background/20 overflow-hidden"
                >
                  <div
                    className={`h-full transition-all duration-300 bg-background ${
                      idx === activeIndex
                        ? "w-full"
                        : idx < activeIndex
                        ? "w-full opacity-50"
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

            <div className="mt-4 pt-6 border-t border-background/10">
              <span className="text-xs font-mono text-background/35 uppercase tracking-[0.22em] block mb-4">
                Recent travels
              </span>
              <div className="flex flex-wrap gap-3">
                {testimonials.map((s, idx) => (
                  <button
                    key={s.author}
                    onClick={() => goTo(idx)}
                    className={`px-4 py-2 text-sm border transition-all ${
                      idx === activeIndex
                        ? "border-background/50 text-background"
                        : "border-background/10 text-background/45 hover:border-background/30"
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
