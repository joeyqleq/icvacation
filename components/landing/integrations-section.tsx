"use client";

import { useEffect, useState, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useContact } from "@/components/site/contact-provider";

const destinations = [
  {
    name: "The Dolomites",
    region: "Northern Italy",
    rhythm: "Slow alpine walks · long lunches",
    image: "/destination-alps.jpg",
    season: "May – Sept",
  },
  {
    name: "Kyoto, off-season",
    region: "Kansai, Japan",
    rhythm: "Ryokan stays · garden mornings",
    image: "/destination-japan.jpg",
    season: "Nov – Mar",
  },
  {
    name: "The Mara",
    region: "Kenya & Tanzania",
    rhythm: "Mobile camps · conservation-led",
    image: "/destination-safari.jpg",
    season: "Jun – Oct",
  },
  {
    name: "Amalfi & beyond",
    region: "Southern Italy",
    rhythm: "Quiet coves · clifftop villas",
    image: "/destination-coast.jpg",
    season: "Apr – Jun",
  },
];

const regionTags = [
  "Italy",
  "Japan",
  "East Africa",
  "Iceland",
  "Patagonia",
  "Morocco",
  "Greece",
  "Sri Lanka",
  "Portugal",
  "Faroe Islands",
];

export function DestinationsSection() {
  const { openContact } = useContact();
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
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
    <section
      id="destinations"
      ref={sectionRef}
      className="relative overflow-hidden py-32 lg:py-40"
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-20">
          <span
            className={`inline-flex items-center gap-4 text-xs font-mono uppercase tracking-[0.22em] text-muted-foreground mb-8 transition-all duration-700 justify-center ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="w-12 h-px bg-brand-green" />
            Where we send people
            <span className="w-12 h-px bg-brand-green" />
          </span>

          <h2
            className={`text-5xl md:text-6xl lg:text-[112px] font-display tracking-tight leading-[0.95] transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            A small list,
            <br />
            <span className="text-muted-foreground italic">deeply known.</span>
          </h2>

          <p
            className={`mt-8 text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto transition-all duration-1000 delay-100 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            We don't try to cover the planet. We work in places we know
            intimately — and quietly add new ones only after Isaac has spent
            real time there.
          </p>
        </div>

        {/* Featured destinations grid — sharper cards, Template B influence */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          {destinations.map((dest, index) => (
            <Link
              key={dest.name}
              href="/destinations"
              className={`group relative aspect-[4/3] overflow-hidden border transition-all duration-500 ${
                hoveredIndex === index
                  ? "border-brand-green/60"
                  : "border-foreground/10"
              } ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 80 + 200}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img
                src={dest.image}
                alt={dest.name}
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-[1.4s] ease-out group-hover:scale-105"
              />
              {/* Always-visible vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
              {/* Hover wash */}
              <div
                className={`absolute inset-0 bg-black/30 transition-opacity duration-500 ${
                  hoveredIndex === index ? "opacity-100" : "opacity-0"
                }`}
              />

              {/* Top-right meta */}
              <div className="absolute top-5 right-5 flex items-center gap-2 px-3 py-1.5 bg-black/40 backdrop-blur-sm border border-white/20">
                <span className="w-1.5 h-1.5 bg-brand-green" />
                <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/85">
                  {dest.season}
                </span>
              </div>

              {/* Bottom content */}
              <div className="absolute inset-x-0 bottom-0 p-8 lg:p-10 flex items-end justify-between gap-6">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/55 block mb-2">
                    {dest.region}
                  </span>
                  <h3 className="text-3xl lg:text-4xl font-display text-white leading-tight">
                    {dest.name}
                  </h3>
                  <p className="mt-2 text-sm text-white/65 italic">
                    {dest.rhythm}
                  </p>
                </div>
                <div
                  className={`shrink-0 w-12 h-12 flex items-center justify-center border transition-all duration-500 ${
                    hoveredIndex === index
                      ? "bg-brand-green border-brand-green text-black"
                      : "border-white/30 text-white"
                  }`}
                >
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quiet region tags */}
        <div
          className={`pt-12 border-t border-foreground/10 transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.22em] text-muted-foreground block mb-5">
                And quietly, also
              </span>
              <div className="flex flex-wrap gap-2">
                {regionTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 text-sm border border-foreground/15 text-foreground/70 hover:border-brand-green/50 hover:text-foreground transition-colors cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={openContact}
              type="button"
              className="group inline-flex items-center gap-2 text-sm font-mono uppercase tracking-[0.18em] text-foreground/70 hover:text-brand-green transition-colors"
            >
              Ask about somewhere else
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
