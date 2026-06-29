"use client";

import { useEffect, useState } from "react";
import { DiaTextReveal } from "@/components/site/dia-text-reveal";
import { PixelButton } from "@/components/site/pixel-button";
import { useContact } from "@/components/site/contact-provider";
import { ArrowUpRight } from "lucide-react";
import { GradualBlur } from "@/components/ui/gradual-blur";

const cyclingWords = ["quietly", "thoughtfully", "personally", "beautifully"];

export function HeroSection({ splashDone = true }: { splashDone?: boolean }) {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const { openContact } = useContact();

  useEffect(() => {
    if (splashDone) setIsVisible(true);
    const t = setTimeout(() => setVideoLoaded(true), 800);
    return () => clearTimeout(t);
  }, [splashDone]);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const clampedScroll = Math.min(scrollY, typeof window !== "undefined" ? window.innerHeight : 900);
  const mediaTransform = `translate3d(0, ${clampedScroll * 0.08}px, 0) scale(1.15)`;

  return (
    <section
      className="relative w-full bg-background flex flex-col overflow-hidden hero-viewport"
    >
      {/* === Cinematic beach video === */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-[-15%] will-change-transform video-breathe" style={{ transform: mediaTransform }}>
          <video
            className="h-full w-full object-cover object-[58%_center] hidden sm:block"
            poster="/video/hero-bg-poster.png"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label="A first-person beach view with gentle tide movement and a cruise ship offshore"
          >
            {videoLoaded && <source src="/video/hero-bg-desktop.mp4" type="video/mp4" />}
          </video>
          <video
            className="h-full w-full object-cover object-center sm:hidden"
            poster="/video/hero-bg-mobile-poster.png"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label="Beach scene background"
          >
            {videoLoaded && <source src="/video/hero-bg-mobile.mp4" type="video/mp4" />}
          </video>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/58 to-black/12" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-background" />
        <div className="absolute inset-x-0 bottom-0 h-[55%] pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent 0%, rgba(5,5,5,0.15) 20%, rgba(5,5,5,0.45) 40%, rgba(5,5,5,0.75) 60%, rgba(5,5,5,0.92) 80%, #050505 100%)" }} />
        {/* GradualBlur — layered blur at bottom edge transitioning to page */}
        <GradualBlur direction="bottom" blurAmount={8} className="inset-x-0 bottom-0 h-48 z-[5]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_68%_50%,transparent_0%,transparent_42%,rgba(0,0,0,0.42)_100%)]" />
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
      <div className="relative z-10 flex-1 flex flex-col justify-end sm:justify-center w-full max-w-[1440px] mx-auto px-6 lg:px-12 pt-16 sm:pt-20 pb-4 lg:pb-4">
        <div className="lg:max-w-[82%]">
          {/* Eyebrow ticker */}
          <div
            className={`mb-3 sm:mb-5 ${
              isVisible ? "whoosh-down" : "opacity-0"
            }`}
            style={{ animationDelay: isVisible ? "0.05s" : undefined }}
          >
            <span className="inline-flex items-center gap-3 label-ticker text-white/70">
              <span className="w-2 h-2 rounded-full pulse-green" />
              <span className="font-mono">[ 01 ]</span>
              <span className="w-8 h-px bg-brand-green/60" />
              Boutique travel planning · cruise, resort, flight
            </span>
          </div>

          {/* Headline with premium gradient and drop shadow glow effects */}
          <h1
            className={`text-left mb-3 sm:mb-5 ${
              isVisible ? "whoosh-left" : "opacity-0"
            }`}
            style={{ textWrap: "balance", animationDelay: isVisible ? "0.15s" : undefined }}
          >
            <span
              className="block font-display-tight bg-gradient-to-b from-white via-white to-white/75 bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(255,255,255,0.18)]"
              style={{ fontSize: "clamp(2.4rem, 7.2vw, 7rem)", letterSpacing: "-0.04em", lineHeight: "0.82" }}
            >
              Vacations,
            </span>

            <span
              className="block font-serif italic bg-gradient-to-r from-brand-yellow via-brand-yellow/90 to-brand-yellow bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(255,229,0,0.25)]"
              style={{
                fontSize: "clamp(2rem, 6.6vw, 6.4rem)",
                paddingLeft: "0.06em",
                letterSpacing: "-0.015em",
                lineHeight: "1.0",
                marginTop: "-0.02em",
              }}
            >
              shaped&nbsp;<DiaTextReveal words={cyclingWords} />
            </span>

            <span
              className="block font-display-wide bg-gradient-to-b from-white via-white/95 to-white/70 bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(255,255,255,0.18)]"
              style={{ fontSize: "clamp(2.4rem, 7.2vw, 7rem)", letterSpacing: "-0.035em", lineHeight: "0.85", marginTop: "-0.02em" }}
            >
              around&nbsp;
              <span className="font-serif italic bg-gradient-to-b from-white via-white/80 to-white/60 bg-clip-text text-transparent">you</span>
              <span className="text-brand-green drop-shadow-[0_0_24px_rgba(38,252,0,0.45)]">.</span>
            </span>
          </h1>

          {/* Subhead */}
          <p
            className={`max-w-[540px] font-editorial text-[15px] sm:text-[17px] lg:text-[19px] text-white/82 leading-[1.4] mb-3 sm:mb-5 ${
              isVisible ? "whoosh-right" : "opacity-0"
            }`}
            style={{ textWrap: "pretty", fontVariationSettings: "'opsz' 22", animationDelay: isVisible ? "0.3s" : undefined }}
          >
            A boutique travel consultancy led by{" "}
            <span className="font-serif italic text-white">Isaac Chowrimootoo</span>.
            Personal consultations, carefully paired cruises, resorts, flights,
            and packages — shaped around the way you actually want to feel.
          </p>

          {/* CTAs — pixel cascade buttons */}
          <div
            className={`flex flex-col sm:flex-row items-stretch sm:items-start gap-3 ${
              isVisible ? "whoosh-up" : "opacity-0"
            }`}
            style={{ animationDelay: isVisible ? "0.45s" : undefined }}
          >
            <PixelButton variant="yellow" onClick={openContact}>
              Plan my trip
              <ArrowUpRight className="w-4 h-4" />
            </PixelButton>
            <PixelButton variant="grey" href="/flights-packages#flight-search-preview">
              Try the flight mockup
              <span className="font-mono opacity-70">&rarr;</span>
            </PixelButton>
          </div>
        </div>

        {/* Stats strip — three quiet measures (in-flow at bottom) */}
        <div
          className={`mt-auto pt-2 sm:pt-4 ${
            isVisible ? "whoosh-left" : "opacity-0"
          }`}
          style={{ animationDelay: isVisible ? "0.55s" : undefined }}
        >
          <div className="flex flex-col sm:flex-row items-start gap-5 sm:gap-8 lg:gap-12">
            {[
              { idx: "01", value: "14 yrs", label: "independent advisory practice" },
              { idx: "02", value: "3",      label: "cruise · resort · flight lanes" },
              { idx: "03", value: "1:1",    label: "human advisor relationship" },
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
