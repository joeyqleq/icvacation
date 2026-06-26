"use client";

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
      className={`relative w-full overflow-hidden bg-background border-y border-foreground/[0.06] py-4 sm:py-5 ${
        splashDone ? "whoosh-up" : "opacity-0"
      }`}
      style={{ animationDelay: splashDone ? "0.6s" : undefined }}
    >
      <div className="flex gap-6 marquee whitespace-nowrap">
        {row}
        {row}
      </div>
    </div>
  );
}
