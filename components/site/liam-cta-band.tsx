"use client";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

interface LiamCtaBandProps {
  headline?: string;
  subline?: string;
  className?: string;
}

export function LiamCtaBand({
  headline = "Meet Liam AI — Your personal travel consultant.",
  subline = "Ask anything. Get a curated itinerary. Then call Isaac.",
  className = "",
}: LiamCtaBandProps) {
  return (
    <section className={`relative w-full border-t border-white/[0.06] bg-background py-14 lg:py-20 overflow-hidden ${className}`}>
      {/* Glow accent */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_50%_at_50%_80%,rgba(38,252,0,0.05),transparent_70%)]" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left */}
        <div className="flex items-start gap-5">
          <div className="mt-1 flex-shrink-0 w-10 h-10 border border-[#26FC00]/30 bg-[#26FC00]/5 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-[#26FC00]" />
          </div>
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#26FC00]/60 mb-2">Liam AI · IC Vacation</p>
            <h3
              className="font-display-tight text-white leading-tight mb-1"
              style={{ fontSize: "clamp(1.4rem, 3vw, 2.2rem)", letterSpacing: "-0.025em" }}
            >
              {headline}
            </h3>
            <p className="font-serif italic text-white/50 text-sm sm:text-base">{subline}</p>
          </div>
        </div>

        {/* Right CTA */}
        <Link
          href="/liam"
          className="flex-shrink-0 inline-flex items-center gap-3 px-7 py-3.5 bg-[#26FC00] text-black font-mono text-xs tracking-[0.2em] uppercase font-semibold hover:bg-[#FFE500] transition-colors"
        >
          Talk to Liam AI
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
