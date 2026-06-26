"use client";

import { CurvedLoop } from "@/components/ui/curved-loop";

const items = [
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
  "Dolomites",
  "Amalfi",
  "Kyoto",
  "The Mara",
];

export function MarqueeStrip({ splashDone = true }: { splashDone?: boolean }) {
  const row = items.map((item, i) => (
    <span key={i} className="flex items-center gap-6 shrink-0">
      <span className="text-[13px] sm:text-[15px] font-mono uppercase tracking-[0.22em] text-white/60">
        {item}
      </span>
      <span className="w-1.5 h-1.5 rounded-full bg-brand-green/70" />
    </span>
  ));

  return (
    <div
      className={`relative w-full overflow-hidden bg-background border-y border-foreground/[0.06] ${
        splashDone ? "whoosh-up" : "opacity-0"
      }`}
      style={{ animationDelay: splashDone ? "0.6s" : undefined }}
    >
      {/* Original marquee row */}
      <div className="flex gap-6 marquee whitespace-nowrap py-4 sm:py-5">
        {row}
        {row}
      </div>
      {/* CurvedLoop decorative wave below */}
      <div className="opacity-30 pointer-events-none select-none" style={{ height: 60, marginTop: -8 }}>
        <CurvedLoop
          marqueeText="BOUTIQUE TRAVEL · SHAPED AROUND YOU · IC VACATION · PERSONALIZED ITINERARIES · LUXURY CRUISES · BESPOKE EXPERIENCES · "
          speed={2.5}
          className="fill-white/40 text-[11px] font-mono"
          curveAmount={200}
        />
      </div>
    </div>
  );
}
