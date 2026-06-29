"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { AnimatedMascotBird } from "@/components/site/animated-mascot-bird";
import { BackgroundBoxes } from "@/components/site/background-boxes";
import { PixelButton } from "@/components/site/pixel-button";

export function BirdAnimationStage() {
  const [run, setRun] = useState(0);
  const [showBird, setShowBird] = useState(true);

  const replay = () => {
    setShowBird(false);
    requestAnimationFrame(() => {
      setRun((value) => value + 1);
      requestAnimationFrame(() => setShowBird(true));
    });
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-background pt-24 pb-8 sm:pt-28 lg:pt-32">
      <BackgroundBoxes variant="green" className="opacity-20" />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_70%_24%,rgba(255,229,0,0.12),transparent_62%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/10 to-background" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-8rem)] max-w-[1440px] flex-col px-6 lg:px-12">
        <div className="max-w-2xl">
          <span className="mb-5 inline-flex items-center gap-3 label-ticker text-white/70">
            <span className="w-2 h-2 rounded-full pulse-green" />
            <span className="font-mono">[ bird ]</span>
            <span className="w-8 h-px bg-brand-green/60" />
            Mascot takeoff
          </span>

          <h1
            className="font-display-tight text-white leading-[0.9] tracking-[-0.035em]"
            style={{ fontSize: "clamp(3rem, 8vw, 7.4rem)", textWrap: "balance" }}
          >
            Bird animation
            <span className="block font-serif italic text-brand-yellow">render.</span>
          </h1>
        </div>

        <div className="relative mt-4 min-h-[310px] flex-1 overflow-visible sm:mt-6 lg:mt-2">
          <div className="absolute inset-x-0 top-0 h-[430px]">
            {showBird && (
              <AnimatedMascotBird
                key={run}
                playOnView={false}
                className="absolute left-0 top-8 w-40 sm:w-52 md:w-60 lg:w-72"
              />
            )}
          </div>
        </div>

        <div className="relative z-20 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <PixelButton variant="yellow" onClick={replay}>
            Replay
            <RotateCcw className="w-4 h-4" />
          </PixelButton>

          <span className="label-ticker-sm text-white/45">
            public/mascot-bird.svg
          </span>
        </div>
      </div>
    </section>
  );
}
