"use client";

import { useEffect, useState, useRef } from "react";
import { Mascot } from "@/components/site/mascot";

export function ParallaxMascot({
  type,
  size = "md",
  variant = "neon",
  className = "",
}: {
  type: "owl" | "bird" | "penguin" | "dandelion";
  size?: "sm" | "md" | "lg" | "xl" | number;
  variant?: "default" | "neon" | "glow" | "ghost" | "outline";
  className?: string;
}) {
  const [offsetY, setOffsetY] = useState(0);
  const [opacity, setOpacity] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return;
      const rect = elementRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const elementTop = rect.top + window.scrollY;
      const scrollPosition = window.scrollY;
      
      const startTrigger = elementTop - windowHeight;
      if (scrollPosition > startTrigger) {
        const progress = (scrollPosition - startTrigger) / windowHeight;
        setOffsetY(-Math.min(progress * 130, 160));
        setOpacity(Math.min(progress * 1.6, 0.92));
      } else {
        setOffsetY(0);
        setOpacity(0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={elementRef}
      className={`pointer-events-none transition-opacity duration-300 ease-out ${className}`}
      style={{
        transform: `translate3d(0, ${offsetY}px, 0) rotate(${offsetY * 0.05}deg)`,
        opacity: opacity,
      }}
    >
      <Mascot type={type} size={size} variant={variant} pose="bob" />
    </div>
  );
}
