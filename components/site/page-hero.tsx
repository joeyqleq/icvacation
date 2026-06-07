"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { PixelButton } from "@/components/site/pixel-button";
import { useContact } from "@/components/site/contact-provider";

interface PageHeroProps {
  index: string;
  kicker: string;
  title: ReactRichTitle;
  subtitle: string;
  image: string;
  imageAlt: string;
  primaryCta?: { label: string; href?: string; openModal?: boolean };
  secondaryCta?: { label: string; href: string };
}

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
  const { openContact } = useContact();

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      className="relative flex items-end overflow-hidden bg-background pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-28"
      style={{ minHeight: "78svh" }}
    >
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 will-change-transform"
          style={{ transform: `translate3d(0, ${scrollY * 0.2}px, 0) scale(1.05)` }}
        >
          <img src={image} alt={imageAlt} className="w-full h-full object-cover animate-ken-burns" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-background" />
      </div>

      <div
        className="absolute -top-8 right-[5%] z-[2] pointer-events-none hidden lg:block animate-drift-slow opacity-[0.10]"
        aria-hidden="true"
      >
        <img src="/dandelion-yellow.svg" alt="" className="w-[360px] h-[360px]" />
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-[2%] z-[1] pointer-events-none flex justify-end overflow-hidden"
      >
        <span
          className="font-serif italic text-white/[0.04] leading-none select-none whitespace-nowrap"
          style={{ fontSize: "clamp(8rem, 20vw, 22rem)", transform: "translateX(8%)" }}
        >
          {kicker.replace(/^\/\/\s*/, "").toLowerCase()}
        </span>
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="lg:max-w-[80%]">
          <div className="mb-7 sm:mb-9">
            <span className="inline-flex items-center gap-3 label-ticker text-white/70">
              <span className="w-2 h-2 rounded-full pulse-green" />
              <span className="font-mono">{index}</span>
              <span className="w-8 h-px bg-brand-green/60" />
              {kicker}
            </span>
          </div>

          <h1 className="text-left mb-7 sm:mb-9" style={{ textWrap: "balance" }}>
            {title.map((t, i) => {
              if (t.type === "plain") {
                return (
                  <span
                    key={i}
                    className="block font-display-tight text-white leading-[0.88]"
                    style={{ fontSize: "clamp(2.2rem, 7.2vw, 6.8rem)", letterSpacing: "-0.035em" }}
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
                  className={`block font-serif italic ${color} leading-[0.95]`}
                  style={{
                    fontSize: "clamp(2rem, 6.8vw, 6.2rem)",
                    paddingLeft: "0.04em",
                    letterSpacing: "-0.015em",
                  }}
                >
                  {t.text}
                </span>
              );
            })}
          </h1>

          <p
            className="max-w-[600px] font-editorial text-[16px] sm:text-[18px] md:text-[20px] text-white/82 leading-[1.5] mb-8 sm:mb-10"
            style={{ textWrap: "pretty", fontVariationSettings: "'opsz' 22" }}
          >
            {subtitle}
          </p>

          {(primaryCta || secondaryCta) && (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-3">
              {primaryCta && (
                primaryCta.openModal || primaryCta.href === "/contact" ? (
                  <PixelButton variant="yellow" onClick={openContact}>
                    {primaryCta.label}
                    <ArrowUpRight className="w-4 h-4" />
                  </PixelButton>
                ) : (
                  <PixelButton variant="yellow" href={primaryCta.href || "#"}>
                    {primaryCta.label}
                    <ArrowUpRight className="w-4 h-4" />
                  </PixelButton>
                )
              )}
              {secondaryCta && (
                <PixelButton variant="grey" href={secondaryCta.href}>
                  {secondaryCta.label}
                  <span className="font-mono opacity-70">&rarr;</span>
                </PixelButton>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
