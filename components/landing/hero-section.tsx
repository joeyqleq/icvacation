"use client";

import { useEffect, useState } from "react";
import { DiaTextReveal } from "@/components/site/dia-text-reveal";
import { PixelButton } from "@/components/site/pixel-button";
import { useContact } from "@/components/site/contact-provider";
import { ArrowUpRight } from "lucide-react";

const cyclingWords = ["quietly", "thoughtfully", "personally", "beautifully"];

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const { openContact } = useContact();

  useEffect(() => { setIsVisible(true); }, []);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const imageTransform = `translate3d(0, ${scrollY * 0.22}px, 0) scale(1.05)`;

  return (
    <section
      className="relative w-full overflow-hidden bg-background flex flex-col"
      style={{ height: "100svh", minHeight: 640 }}
    >
      {/* === Cinematic landscape === */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 will-change-transform" style={{ transform: imageTransform }}>
          <img
            src="/hero-landscape.jpg"
            alt="A still alpine lake at dawn, mist rising over the water, surrounded by quiet mountains"
            className="w-full h-full object-cover animate-ken-burns"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/82 via-black/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-background" />
      </div>

      {/* Floating dandelion accent — top right */}
      <div
        className="absolute -top-8 right-[6%] z-[2] pointer-events-none hidden lg:block animate-drift-slow opacity-[0.12]"
        aria-hidden="true"
      >
        <img src="/dandelion-yellow.svg" alt="" className="w-[320px] h-[320px]" />
      </div>

      {/* Massive ghost word — editorial decoration */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-[2%] z-[1] pointer-events-none flex justify-end overflow-hidden"
      >
        <span
          className="font-serif italic text-white/[0.045] leading-none select-none whitespace-nowrap"
          style={{
            fontSize: "clamp(9rem, 22vw, 24rem)",
            transform: "translateX(6%)",
          }}
        >
          vacation
        </span>
      </div>

      {/* === HERO CONTENT — fills the viewport, content + stats use flex === */}
      <div className="relative z-10 flex-1 flex flex-col justify-center w-full max-w-[1440px] mx-auto px-6 lg:px-12 pt-24 sm:pt-28 pb-8">
        <div className="lg:max-w-[82%]">
          {/* Eyebrow ticker */}
          <div
            className={`mb-5 sm:mb-7 transition-all duration-700 ${
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

          {/* Headline */}
          <h1
            className={`text-left mb-5 sm:mb-7 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ textWrap: "balance" }}
          >
            <span
              className="block font-display-tight text-white leading-[0.86]"
              style={{ fontSize: "clamp(2.6rem, 7.6vw, 7.4rem)", letterSpacing: "-0.04em" }}
            >
              Vacations,
            </span>

            <span
              className="block font-serif italic text-brand-yellow leading-[0.95]"
              style={{
                fontSize: "clamp(2.2rem, 7vw, 6.8rem)",
                paddingLeft: "0.06em",
                letterSpacing: "-0.015em",
              }}
            >
              shaped&nbsp;<DiaTextReveal words={cyclingWords} />
            </span>

            <span
              className="block font-display-wide text-white leading-[0.92]"
              style={{ fontSize: "clamp(2.6rem, 7.6vw, 7.4rem)", letterSpacing: "-0.035em" }}
            >
              around&nbsp;
              <span className="font-serif italic text-white/85">you</span>
              <span className="text-brand-green">.</span>
            </span>
          </h1>

          {/* Subhead */}
          <p
            className={`max-w-[540px] font-editorial text-[16px] sm:text-[18px] lg:text-[19px] text-white/82 leading-[1.45] mb-6 sm:mb-8 transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ textWrap: "pretty", fontVariationSettings: "'opsz' 22" }}
          >
            A boutique travel practice led by{" "}
            <span className="font-serif italic text-white">Isaac Chowrimootoo</span>.
            Personal consultations, quietly curated itineraries, and the kind of
            trip you tell stories about for years.
          </p>

          {/* CTAs — pixel cascade buttons */}
          <div
            className={`flex flex-col sm:flex-row items-stretch sm:items-start gap-3 transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <PixelButton variant="yellow" onClick={openContact}>
              Book a consultation
              <ArrowUpRight className="w-4 h-4" />
            </PixelButton>
            <PixelButton variant="grey" href="/destinations">
              See where we send people
              <span className="font-mono opacity-70">&rarr;</span>
            </PixelButton>
          </div>
        </div>

        {/* Stats strip — three quiet measures (in-flow at bottom) */}
        <div
          className={`mt-auto pt-8 sm:pt-10 transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex flex-col sm:flex-row items-start gap-5 sm:gap-8 lg:gap-12">
            {[
              { idx: "01", value: "11 yrs", label: "shaping personal itineraries" },
              { idx: "02", value: "62",     label: "countries planned & visited" },
              { idx: "03", value: "1:1",    label: "advisor relationship, always" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex items-baseline gap-3 sm:gap-4 border-l border-brand-green/40 pl-4 sm:pl-5"
              >
                <span className="font-mono text-[10px] text-brand-green tracking-[0.32em]">
                  {stat.idx}
                </span>
                <div className="flex flex-col gap-0.5">
                  <span className="text-xl sm:text-2xl lg:text-[26px] font-display-wide text-white tracking-tight leading-none">
                    {stat.value}
                  </span>
                  <span className="label-ticker-sm text-white/55">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
