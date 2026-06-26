"use client";

import { useEffect, useState } from "react";

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

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
      style={{
        opacity: phase === "exit" ? 0 : 1,
        transition: phase === "exit" ? "opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s" : "none",
      }}
    >
      <div
        className="relative"
        style={{
          animation: phase === "spin"
            ? "splash-spin 2.4s linear infinite"
            : "splash-exit 1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        }}
      >
        <img
          src="/dandelion-yellow.svg"
          alt=""
          aria-hidden="true"
          className="w-24 h-24 sm:w-32 sm:h-32 object-contain"
          style={{
            filter: "drop-shadow(0 0 24px rgba(255,229,0,0.6)) drop-shadow(0 0 48px rgba(255,229,0,0.3))",
          }}
          draggable={false}
        />
      </div>
    </div>
  );
}
