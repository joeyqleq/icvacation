"use client";

import { useState, useCallback } from "react";
import { Navigation } from "@/components/landing/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { MarqueeStrip } from "@/components/landing/marquee-strip";
import { FilmGrain } from "@/components/site/film-grain";
import { DeferredHomeSections } from "@/components/landing/deferred-home-sections";
import { SplashScreen } from "@/components/site/splash-screen";

function hasSeenSplash() {
  if (typeof window === "undefined") return false;
  return !!sessionStorage.getItem("ic-splash-shown");
}

export function HomeClient() {
  const [splashDone, setSplashDone] = useState(hasSeenSplash);
  const [showSplash, setShowSplash] = useState(() => !hasSeenSplash());

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
      <DeferredHomeSections />
    </main>
  );
}
