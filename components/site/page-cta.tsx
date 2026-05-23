"use client";

import { ArrowUpRight } from "lucide-react";
import { PixelButton } from "@/components/site/pixel-button";
import { BackgroundBoxes } from "@/components/site/background-boxes";
import { Mascot } from "@/components/site/mascot";
import { useContact } from "@/components/site/contact-provider";

interface PageCtaProps {
  eyebrow?: string;
  title: string;
  emphasis?: string;
  subtitle?: string;
  primary?: { label: string; href?: string };
  secondary?: { label: string; href: string };
  mascot?: "bird" | "owl" | "penguin" | "dandelion";
}

export function PageCta({
  eyebrow = "// Next step",
  title,
  emphasis,
  subtitle,
  primary,
  secondary,
  mascot = "bird",
}: PageCtaProps) {
  const { openContact } = useContact();

  return (
    <section className="relative py-20 lg:py-32 bg-background overflow-hidden">
      <BackgroundBoxes variant="green" />

      {/* Inline ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(38,252,0,0.06), transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8">
            <span className="inline-flex items-center gap-3 label-ticker text-white/55 mb-6">
              <span className="w-10 h-px bg-brand-green/60" />
              {eyebrow}
            </span>
            <h2
              className="font-display-tight text-white leading-[0.92] tracking-[-0.035em] mb-6"
              style={{ fontSize: "clamp(2.2rem, 6.4vw, 5.8rem)", textWrap: "balance" }}
            >
              {title}
              {emphasis && (
                <>
                  {" "}
                  <span className="font-serif italic text-brand-yellow">{emphasis}</span>
                </>
              )}
            </h2>
            {subtitle && (
              <p
                className="max-w-[560px] font-editorial text-[17px] md:text-[19px] text-white/75 leading-[1.5] mb-8 lg:mb-10"
                style={{ textWrap: "pretty" }}
              >
                {subtitle}
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              {primary?.href ? (
                <PixelButton variant="yellow" href={primary.href}>
                  {primary.label}
                  <ArrowUpRight className="w-4 h-4" />
                </PixelButton>
              ) : (
                <PixelButton variant="yellow" onClick={openContact}>
                  {primary?.label ?? "Plan my trip"}
                  <ArrowUpRight className="w-4 h-4" />
                </PixelButton>
              )}
              {secondary && (
                <PixelButton variant="grey" href={secondary.href}>
                  {secondary.label}
                  <span className="font-mono opacity-70">&rarr;</span>
                </PixelButton>
              )}
            </div>
          </div>

          {/* Mascot — large, expressive, glowing */}
          <div className="hidden lg:flex lg:col-span-4 justify-end relative">
            <div className="relative">
              <Mascot
                creature={mascot}
                size={280}
                pose="hover"
                tint="yellow"
                glow
                className="drop-shadow-[0_24px_60px_rgba(38,252,0,0.18)]"
              />
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-44 h-1 bg-gradient-to-r from-transparent via-brand-green/60 to-transparent blur-sm" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
