"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

interface PageHeroProps {
  index: string;             // "[ 02 ]"
  kicker: string;            // "// Cruises"
  title: ReactRichTitle;     // see below
  subtitle: string;
  image: string;
  imageAlt: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

/** Allows a multi-line title with one or two italic-emphasis tokens. */
export type ReactRichTitle = Array<
  | { type: "plain"; text: string }
  | { type: "emph"; text: string; color?: "yellow" | "green" | "white" }
>;

export function PageHero({
  index,
  kicker,
  title,
  subtitle,
  image,
  imageAlt,
  primaryCta,
  secondaryCta,
}: PageHeroProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative min-h-[88vh] flex items-end overflow-hidden bg-background pt-32 pb-24 lg:pt-40 lg:pb-32">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 will-change-transform"
          style={{ transform: `translate3d(0, ${scrollY * 0.2}px, 0) scale(1.05)` }}
        >
          <img
            src={image}
            alt={imageAlt}
            className="w-full h-full object-cover animate-ken-burns"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-background" />
      </div>

      {/* Dandelion accent */}
      <div
        className="absolute -top-12 -right-24 z-[2] pointer-events-none hidden lg:block animate-drift-slow opacity-[0.10]"
        aria-hidden="true"
      >
        <img src="/dandelion-yellow.svg" alt="" className="w-[420px] h-[420px]" />
      </div>

      {/* Ghost word */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-[5%] z-[1] pointer-events-none flex justify-end overflow-hidden"
      >
        <span
          className="font-serif italic text-white/[0.035] leading-none select-none whitespace-nowrap"
          style={{
            fontSize: "clamp(10rem, 22vw, 26rem)",
            transform: "translateX(8%)",
          }}
        >
          {kicker.replace(/^\/\/\s*/, "").toLowerCase()}
        </span>
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="lg:max-w-[80%]">
          {/* Index ticker */}
          <div className="mb-10">
            <span className="inline-flex items-center gap-3 label-ticker text-white/70">
              <span className="w-2 h-2 rounded-full pulse-green" />
              <span className="font-mono">{index}</span>
              <span className="w-8 h-px bg-brand-green/60" />
              {kicker}
            </span>
          </div>

          {/* Rich title */}
          <h1
            className="text-left mb-10"
            style={{ textWrap: "balance" }}
          >
            {title.map((t, i) => {
              if (t.type === "plain") {
                return (
                  <span
                    key={i}
                    className="block font-display-tight text-white leading-[0.88]"
                    style={{
                      fontSize: "clamp(2.4rem, 7.6vw, 7.4rem)",
                      letterSpacing: "-0.035em",
                    }}
                  >
                    {t.text}
                  </span>
                );
              }
              const color =
                t.color === "green"
                  ? "text-brand-green"
                  : t.color === "white"
                  ? "text-white/90"
                  : "text-brand-yellow";
              return (
                <span
                  key={i}
                  className={`block font-serif italic ${color} leading-[0.95] -mt-1`}
                  style={{
                    fontSize: "clamp(2.2rem, 7.2vw, 6.8rem)",
                    paddingLeft: "0.04em",
                    letterSpacing: "-0.015em",
                  }}
                >
                  {t.text}
                </span>
              );
            })}
          </h1>

          {/* Subtitle — editorial */}
          <p
            className="max-w-[600px] font-editorial text-[18px] md:text-[20px] text-white/82 leading-[1.5] mb-10"
            style={{ textWrap: "pretty", fontVariationSettings: "'opsz' 22" }}
          >
            {subtitle}
          </p>

          {/* CTAs */}
          {(primaryCta || secondaryCta) && (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-3 sm:gap-4">
              {primaryCta && (
                <a
                  href={primaryCta.href}
                  className="btn-primary group h-14 px-7 text-base justify-center sm:justify-start"
                >
                  {primaryCta.label}
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              )}
              {secondaryCta && (
                <a
                  href={secondaryCta.href}
                  className="btn-glass group inline-flex items-center justify-center sm:justify-start gap-3 text-white h-14 px-7 text-base"
                >
                  {secondaryCta.label}
                  <span className="font-mono text-white/60 group-hover:translate-x-0.5 transition-transform">
                    &rarr;
                  </span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
