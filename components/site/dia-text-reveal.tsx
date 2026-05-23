"use client";

import { useEffect, useState } from "react";

/**
 * DiaTextReveal — a customised port of MagicUI's "dia-text-reveal".
 *
 * Each character animates in with a translateY + blur + brightness burst,
 * letter-spacing eases in from wide to tight.  Used for cycling words in
 * the hero (replaces the previous generic char-fade reveal).
 *
 * It is intentionally *typography-respectful* — it does not change the
 * font, weight, color, size or line-height of the host element.  It only
 * animates the per-character transform/filter on key change.
 */
export function DiaTextReveal({
  words,
  intervalMs = 2800,
  className = "",
}: {
  words: string[];
  intervalMs?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (words.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [words.length, intervalMs]);

  const word = words[index] ?? "";

  return (
    <span
      key={index}
      aria-live="polite"
      className={`relative inline-block align-baseline ${className}`}
      style={{ minWidth: `${Math.max(...words.map((w) => w.length))}ch` }}
    >
      {word.split("").map((ch, i) => (
        <span
          key={`${index}-${i}`}
          className="dia-char"
          style={{
            animationDelay: `${i * 45}ms`,
          }}
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
}
