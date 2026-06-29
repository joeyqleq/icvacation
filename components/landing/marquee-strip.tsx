"use client";

import { useState, useRef, useCallback } from "react";

interface Destination {
  name: string;
  flag: string; // emoji flag
}

const items: Destination[] = [
  { name: "Italy",        flag: "🇮🇹" },
  { name: "Japan",        flag: "🇯🇵" },
  { name: "East Africa",  flag: "🇰🇪" },
  { name: "Iceland",      flag: "🇮🇸" },
  { name: "Patagonia",    flag: "🇦🇷" },
  { name: "Morocco",      flag: "🇲🇦" },
  { name: "Greece",       flag: "🇬🇷" },
  { name: "Sri Lanka",    flag: "🇱🇰" },
  { name: "Portugal",     flag: "🇵🇹" },
  { name: "Faroe Islands",flag: "🇫🇴" },
  { name: "Dolomites",    flag: "🇮🇹" },
  { name: "Amalfi",       flag: "🇮🇹" },
  { name: "Kyoto",        flag: "🇯🇵" },
  { name: "The Mara",     flag: "🇰🇪" },
];

function DestinationPill({ name, flag, index }: { name: string; flag: string; index: number }) {
  const [revealed, setRevealed] = useState(false);
  const [pixelating, setPixelating] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setPixelating(true);
    timeoutRef.current = setTimeout(() => {
      setRevealed(true);
      setPixelating(false);
    }, 120);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setPixelating(true);
    timeoutRef.current = setTimeout(() => {
      setRevealed(false);
      setPixelating(false);
    }, 100);
  }, []);

  return (
    <span
      className="relative flex items-center gap-5 shrink-0 group cursor-default"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Flag reveal layer */}
      <span
        className="absolute inset-[-6px] flex items-center justify-center overflow-hidden pointer-events-none"
        aria-hidden="true"
        style={{
          clipPath: revealed
            ? "inset(0% 0% 0% 0%)"
            : pixelating
            ? "inset(0% 50% 0% 50%)"
            : "inset(0% 100% 0% 100%)",
          transition: pixelating
            ? "clip-path 80ms steps(4, end)"
            : revealed
            ? "clip-path 120ms steps(6, end)"
            : "clip-path 100ms steps(4, end)",
          background: "#050505",
          borderLeft: "1px solid #26FC0030",
          borderRight: "1px solid #26FC0030",
        }}
      >
        <span
          style={{
            fontSize: "clamp(1.4rem, 3vw, 2.2rem)",
            imageRendering: "pixelated",
            filter: pixelating ? "blur(1px) contrast(2)" : "none",
            transition: "filter 80ms",
          }}
        >
          {flag}
        </span>
      </span>

      {/* Destination name */}
      <span
        className="text-[13px] sm:text-[15px] font-mono uppercase tracking-[0.22em] transition-colors duration-150"
        style={{ color: revealed ? "#26FC00" : "rgba(255,255,255,0.6)" }}
      >
        {name}
      </span>
      <span
        className="w-1.5 h-1.5 rounded-full transition-colors duration-150"
        style={{ background: revealed ? "#26FC00" : "rgba(76,252,0,0.5)" }}
      />
    </span>
  );
}

export function MarqueeStrip({ splashDone = true }: { splashDone?: boolean }) {
  const row = items.map((item, i) => (
    <DestinationPill key={i} name={item.name} flag={item.flag} index={i} />
  ));

  return (
    <div
      className={`relative w-full overflow-hidden bg-background border-y border-foreground/[0.06] ${
        splashDone ? "whoosh-up" : "opacity-0"
      }`}
      style={{ animationDelay: splashDone ? "0.6s" : undefined }}
    >
      {/* Marquee row */}
      <div className="flex gap-6 marquee whitespace-nowrap py-4 sm:py-5">
        {row}
        {row}
      </div>

    </div>
  );
}
