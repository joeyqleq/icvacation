"use client";

import { useEffect, useState } from "react";

const SPINNING_TEXT = "IC VACATION  ✦  LUXURY CRUISES  ✦  DREAM GETAWAYS  ✦  ";
const RADIUS = 148; // px — radius of the spinning text circle
const FONT_SIZE = 13.5;

function SpinningTextCircle({ phase }: { phase: "spin" | "exit" }) {
  const chars = SPINNING_TEXT.split("");
  const total = chars.length;
  const angleStep = 360 / total;

  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        animation:
          phase === "spin"
            ? "spinning-text-rotate 8s linear infinite"
            : "splash-exit 1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      }}
    >
      <div
        style={{
          position: "relative",
          width: RADIUS * 2 + 24,
          height: RADIUS * 2 + 24,
        }}
      >
        {chars.map((char, i) => {
          const angle = i * angleStep - 90; // start from top
          const rad = (angle * Math.PI) / 180;
          const x = RADIUS * Math.cos(rad) + RADIUS + 12;
          const y = RADIUS * Math.sin(rad) + RADIUS + 12;
          return (
            <span
              key={i}
              style={{
                position: "absolute",
                left: x,
                top: y,
                fontSize: FONT_SIZE,
                fontFamily: "var(--font-space-mono, monospace)",
                letterSpacing: "0.18em",
                color: "#FFE500",
                opacity: 0.85,
                transformOrigin: "0 0",
                transform: `rotate(${angle + 90}deg)`,
                userSelect: "none",
              }}
            >
              {char}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"spin" | "exit" | "done">("spin");

  useEffect(() => {
    const spinTimer = setTimeout(() => setPhase("exit"), 3000);
    return () => clearTimeout(spinTimer);
  }, []);

  useEffect(() => {
    if (phase === "exit") {
      const exitTimer = setTimeout(() => {
        setPhase("done");
        onComplete();
      }, 1000);
      return () => clearTimeout(exitTimer);
    }
  }, [phase, onComplete]);

  if (phase === "done") return null;

  const containerAnim =
    phase === "exit"
      ? { opacity: 0, transition: "opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s" }
      : { opacity: 1 };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
      style={containerAnim}
    >
      <div className="relative flex items-center justify-center" style={{ width: 380, height: 380 }}>
        {/* Spinning text ring */}
        <SpinningTextCircle phase={phase === "exit" ? "exit" : "spin"} />

        {/* Dandelion center */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            animation:
              phase === "spin"
                ? "splash-spin 2.4s linear infinite"
                : "splash-exit 1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          }}
        >
          <img
            src="/dandelion-yellow.svg"
            alt=""
            aria-hidden="true"
            className="w-36 h-36 sm:w-44 sm:h-44 object-contain"
            style={{
              filter:
                "drop-shadow(0 0 24px rgba(255,229,0,0.6)) drop-shadow(0 0 48px rgba(255,229,0,0.3))",
            }}
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}
