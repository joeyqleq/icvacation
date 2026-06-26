"use client";

import { useState, useEffect, useCallback } from "react";
import { Navigation } from "@/components/landing/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { MarqueeStrip } from "@/components/landing/marquee-strip";
import { FilmGrain } from "@/components/site/film-grain";
import { DeferredHomeSections } from "@/components/landing/deferred-home-sections";
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
      <DeferredHomeSections />
    </main>
  );
}
