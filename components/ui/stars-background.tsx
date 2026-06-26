"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";

interface StarsBackgroundProps {
  starDensity?: number;
  allStarsTwinkle?: boolean;
  twinkleProbability?: number;
  minTwinkleSpeed?: number;
  maxTwinkleSpeed?: number;
  starColor?: string;
  maxStarSize?: number;
  className?: string;
}

interface Star {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  twinkleSpeed: number | null;
  twinklePhase: number;
}

export const StarsBackground: React.FC<StarsBackgroundProps> = ({
  starDensity = 0.00015,
  allStarsTwinkle = true,
  twinkleProbability = 0.7,
  minTwinkleSpeed = 0.3,
  maxTwinkleSpeed = 1.2,
  starColor = "#ffffff",
  maxStarSize = 1.6,
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const starsRef = useRef<Star[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const generateStars = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;

      const area = canvas.width * canvas.height;
      const numStars = Math.floor(area * starDensity);

      starsRef.current = Array.from({ length: numStars }, () => {
        const shouldTwinkle = allStarsTwinkle || Math.random() < twinkleProbability;
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * maxStarSize + 0.3,
          opacity: 0.2 + Math.random() * 0.6,
          twinkleSpeed: shouldTwinkle
            ? minTwinkleSpeed + Math.random() * (maxTwinkleSpeed - minTwinkleSpeed)
            : null,
          twinklePhase: Math.random() * Math.PI * 2,
        };
      });
    };

    generateStars();

    const handleResize = () => {
      generateStars();
    };
    window.addEventListener("resize", handleResize);

    const animate = (timestamp: number) => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      starsRef.current.forEach((star) => {
        let currentOpacity = star.opacity;

        if (star.twinkleSpeed !== null) {
          const twinkle = Math.sin(
            (timestamp / 1000) * star.twinkleSpeed + star.twinklePhase
          );
          currentOpacity = star.opacity * (0.5 + 0.5 * twinkle);
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${starColor}${Math.floor(currentOpacity * 255)
          .toString(16)
          .padStart(2, "0")}`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [starDensity, allStarsTwinkle, twinkleProbability, minTwinkleSpeed, maxTwinkleSpeed, starColor, maxStarSize]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 h-full w-full", className)}
    />
  );
};
