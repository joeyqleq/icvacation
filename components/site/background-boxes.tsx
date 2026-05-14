"use client";

import { useMemo } from "react";

/**
 * BackgroundBoxes — a brand-aligned variant of Aceternity's background-boxes.
 *
 * Renders a skewed grid of cells that light up on hover with brand-yellow,
 * brand-green, or grey accents.  Use as an absolute/inset-0 background
 * inside any container that has empty space.
 *
 *   <div className="relative ...">
 *     <BackgroundBoxes variant="yellow" />
 *     ... your content ...
 *   </div>
 *
 * Variants:
 *   yellow → pale-yellow highlight (#FDF972) — default, dressy/warm
 *   green  → brand-green highlight (#26FC00) — energetic/CTA
 *   grey   → mid-grey highlight              — quiet/editorial
 *   mixed  → alternates yellow + green cells — denser, animated feel
 */
export function BackgroundBoxes({
  variant = "yellow",
  density = "default",
  className = "",
}: {
  variant?: "yellow" | "green" | "grey" | "mixed";
  density?: "default" | "dense";
  className?: string;
}) {
  const count = density === "dense" ? 28 * 22 : 28 * 16;
  const cells = useMemo(() => Array.from({ length: count }), [count]);

  return (
    <div className={`bg-boxes-wrap ${className}`}>
      <div className={`bg-boxes bg-boxes--${variant}`}>
        {cells.map((_, i) => (
          <span key={i} />
        ))}
      </div>
    </div>
  );
}
