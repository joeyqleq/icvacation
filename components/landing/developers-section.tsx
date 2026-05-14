"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const journalEntries = [
  {
    number: "01",
    category: "Field notes",
    title: "Why we still send people to the Dolomites in late June",
    excerpt:
      "A short note on the rifugio season, alpine wildflowers, and the quiet hour between dinner and dusk.",
    region: "Northern Italy",
    minutes: 6,
  },
  {
    number: "02",
    category: "Travel craft",
    title: "What we ask, before we plan",
    excerpt:
      "Five questions Isaac uses to build a brief — and one he refuses to answer with a destination.",
    region: "Method",
    minutes: 4,
  },
  {
    number: "03",
    category: "On the ground",
    title: "The owner-led safari camp problem",
    excerpt:
      "Why the lodge you don't see on the homepage is almost always the better stay.",
    region: "East Africa",
    minutes: 8,
  },
];

export function JournalSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);

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
    <section
      id="journal"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Soft cinematic ambient — destination vista on the right */}
      <div
        className={`absolute bottom-0 right-0 w-[55%] h-[80%] pointer-events-none transition-all duration-1000 delay-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <img
          src="/cta-vista.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div
          className={`mb-16 transition-all duration-700 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-xs font-mono uppercase tracking-[0.22em] text-muted-foreground mb-6">
            <span className="w-8 h-px bg-brand-green" />
            From the journal
          </span>
          <h2 className="text-5xl md:text-6xl lg:text-[112px] font-display tracking-tight leading-[0.95]">
            Notes from
            <br />
            <span className="text-muted-foreground italic">the road.</span>
          </h2>
        </div>

        {/* Journal preview — list + active card */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          <div className="lg:col-span-5 max-w-xl">
            <p
              className={`text-lg text-muted-foreground mb-12 leading-relaxed transition-all duration-700 delay-100 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              Short essays on the craft of travel — written quietly, between
              trips, for the kind of traveler who reads them.
            </p>

            <Link
              href="/blog"
              className={`group inline-flex items-center gap-3 text-sm font-mono uppercase tracking-[0.22em] text-foreground hover:text-brand-green transition-colors ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              Read the journal
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Article rows — Template B sharper card mechanic */}
          <div className="lg:col-span-7 flex flex-col">
            {journalEntries.map((entry, index) => (
              <article
                key={entry.number}
                onMouseEnter={() => setActiveIndex(index)}
                className={`group relative border-t last:border-b border-foreground/15 py-8 lg:py-10 cursor-pointer transition-all duration-500 ${
                  activeIndex === index ? "pl-4" : ""
                } ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${index * 100 + 200}ms` }}
              >
                {/* Active vertical bar */}
                <span
                  className={`absolute left-0 top-0 bottom-0 w-px bg-brand-green transition-transform origin-top duration-500 ${
                    activeIndex === index ? "scale-y-100" : "scale-y-0"
                  }`}
                />

                <div className="flex items-start gap-6 lg:gap-10">
                  <span className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground pt-1.5 shrink-0 hidden sm:block">
                    {entry.number}
                  </span>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3 text-[11px] font-mono uppercase tracking-[0.22em] text-muted-foreground">
                      <span className="text-brand-green">
                        {entry.category}
                      </span>
                      <span className="w-1 h-1 bg-foreground/20 rounded-full" />
                      <span>{entry.region}</span>
                      <span className="w-1 h-1 bg-foreground/20 rounded-full" />
                      <span>{entry.minutes} min read</span>
                    </div>

                    <h3 className="text-2xl lg:text-[28px] font-display leading-tight text-foreground group-hover:text-brand-green transition-colors duration-300 mb-3">
                      {entry.title}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed max-w-xl">
                      {entry.excerpt}
                    </p>
                  </div>

                  <ArrowUpRight
                    className={`w-5 h-5 transition-all duration-300 shrink-0 mt-2 ${
                      activeIndex === index
                        ? "text-brand-green translate-x-0 translate-y-0 opacity-100"
                        : "text-foreground/40 -translate-x-1 translate-y-1 opacity-60"
                    }`}
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
