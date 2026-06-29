"use client";

import { useState, useEffect, useCallback } from "react";
import { Navigation } from "@/components/landing/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { MarqueeStrip } from "@/components/landing/marquee-strip";
import { FilmGrain } from "@/components/site/film-grain";
import { DeferredHomeSections } from "@/components/landing/deferred-home-sections";
import { CurvedLoop } from "@/components/ui/curved-loop";
import { SplashScreen } from "@/components/site/splash-screen";

export function HomeClient() {
  const [splashDone, setSplashDone] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("ic-splash-shown")) {
      setShowSplash(false);
      setSplashDone(true);
    }
  }, []);

  const handleSplashComplete = useCallback(() => {
    setSplashDone(true);
    sessionStorage.setItem("ic-splash-shown", "1");
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      {showSplash && !splashDone && (
        <SplashScreen onComplete={handleSplashComplete} />
      )}
      <FilmGrain />
      <Navigation splashDone={splashDone} />
      <HeroSection splashDone={splashDone} />
      <MarqueeStrip splashDone={splashDone} />
      {/* Wavy marquee band — decorative */}
      <div className="relative w-full overflow-hidden bg-background" style={{ height: 140 }}>
        <div className="opacity-50 pointer-events-none select-none" style={{ height: 140 }}>
          <CurvedLoop
            marqueeText="BOUTIQUE TRAVEL · SHAPED AROUND YOU · IC VACATION · PERSONALIZED ITINERARIES · LUXURY CRUISES · BESPOKE EXPERIENCES · "
            speed={3}
            className="fill-white/50 text-[22px] font-mono"
            curveAmount={300}
          />
        </div>
      </div>
      <DeferredHomeSections />
    </main>
  );
}
