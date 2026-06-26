"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useCallback } from "react";

interface ShootingStar {
  id: number;
  x: number;
  y: number;
  angle: number;
  scale: number;
  speed: number;
  distance: number;
  maxDistance: number;
}

interface ShootingStarsProps {
  minSpeed?: number;
  maxSpeed?: number;
  minDelay?: number;
  maxDelay?: number;
  starColor?: string;
  trailColor?: string;
  starWidth?: number;
  starHeight?: number;
  maxStars?: number;
  className?: string;
}

const getRandomStartPoint = (width: number, height: number) => {
  // 70% chance from top edge, 30% from right edge — diagonal streaks
  const fromTop = Math.random() < 0.7;
  if (fromTop) {
    return {
      x: width * 0.2 + Math.random() * width * 0.8, // spread across top
      y: -10,
      angle: 110 + Math.random() * 40, // 110-150 degrees (down-left)
    };
  }
  return {
    x: width + 10,
    y: Math.random() * height * 0.5,
    angle: 190 + Math.random() * 30, // 190-220 degrees (down-left from right)
  };
};

export const ShootingStars: React.FC<ShootingStarsProps> = ({
  minSpeed = 12,
  maxSpeed = 28,
  minDelay = 600,
  maxDelay = 2200,
  starColor = "#ffffff",
  trailColor = "#9ca3cf",
  starWidth = 180,
  starHeight = 2,
  maxStars = 5,
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<ShootingStar[]>([]);
  const animationRef = useRef<number>(0);
  const lastSpawnRef = useRef<number>(0);
  const nextDelayRef = useRef<number>(0);

  const spawnStar = useCallback(
    (width: number, height: number) => {
      const { x, y, angle } = getRandomStartPoint(width, height);
      const speed = minSpeed + Math.random() * (maxSpeed - minSpeed);
      const scale = 0.6 + Math.random() * 0.8;
      const star: ShootingStar = {
        id: Date.now() + Math.random(),
        x,
        y,
        angle,
        scale,
        speed,
        distance: 0,
        maxDistance: 500 + Math.random() * 400, // vary trail life
      };
      starsRef.current.push(star);
      if (starsRef.current.length > maxStars) {
        starsRef.current.shift();
      }
    },
    [minSpeed, maxSpeed, maxStars]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    nextDelayRef.current = Math.random() * (maxDelay - minDelay) + minDelay;

    const animate = (timestamp: number) => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn
      if (timestamp - lastSpawnRef.current > nextDelayRef.current) {
        spawnStar(canvas.width, canvas.height);
        lastSpawnRef.current = timestamp;
        nextDelayRef.current = Math.random() * (maxDelay - minDelay) + minDelay;
      }

      // Draw and update
      starsRef.current = starsRef.current.filter((star) => {
        const rad = (star.angle * Math.PI) / 180;

        star.x += Math.cos(rad) * star.speed;
        star.y += Math.sin(rad) * star.speed;
        star.distance += star.speed;

        if (star.distance >= star.maxDistance) return false;
        if (
          star.x < -200 ||
          star.x > canvas.width + 200 ||
          star.y < -200 ||
          star.y > canvas.height + 200
        )
          return false;

        // Fade out toward end of life
        const lifeRatio = star.distance / star.maxDistance;
        const opacity = Math.pow(1 - lifeRatio, 0.8); // non-linear fade

        // Trail length scales with star scale
        const trailLength = starWidth * star.scale;
        const tailX = star.x - Math.cos(rad) * trailLength;
        const tailY = star.y - Math.sin(rad) * trailLength;

        // Long gradient trail
        const gradient = ctx.createLinearGradient(tailX, tailY, star.x, star.y);
        gradient.addColorStop(0, "rgba(0,0,0,0)");
        gradient.addColorStop(0.3, `rgba(${hexToRgb(trailColor)}, ${opacity * 0.3})`);
        gradient.addColorStop(0.7, `rgba(${hexToRgb(trailColor)}, ${opacity * 0.7})`);
        gradient.addColorStop(1, `rgba(${hexToRgb(starColor)}, ${opacity})`);

        ctx.save();
        ctx.translate(star.x, star.y);
        ctx.rotate(rad);

        // Main trail
        ctx.beginPath();
        ctx.moveTo(-trailLength, 0);
        ctx.lineTo(0, 0);
        ctx.lineWidth = starHeight * star.scale;
        ctx.strokeStyle = gradient;
        ctx.lineCap = "round";
        ctx.stroke();

        // Bright core line (inner glow)
        const coreLength = trailLength * 0.25;
        const coreGrad = ctx.createLinearGradient(-coreLength, 0, 0, 0);
        coreGrad.addColorStop(0, "rgba(0,0,0,0)");
        coreGrad.addColorStop(1, `rgba(255,255,255,${opacity * 0.9})`);
        ctx.beginPath();
        ctx.moveTo(-coreLength, 0);
        ctx.lineTo(0, 0);
        ctx.lineWidth = (starHeight * star.scale * 0.4);
        ctx.strokeStyle = coreGrad;
        ctx.stroke();

        // Head: bright point glow
        const glowRadius = (starHeight * star.scale * 3);
        const headGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, glowRadius);
        headGlow.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
        headGlow.addColorStop(0.4, `rgba(${hexToRgb(starColor)}, ${opacity * 0.6})`);
        headGlow.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(0, 0, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = headGlow;
        ctx.fill();

        ctx.restore();
        return true;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, [spawnStar, minDelay, maxDelay, starColor, trailColor, starWidth, starHeight]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 h-full w-full", className)}
    />
  );
};

// Helper: "#rrggbb" → "r, g, b"
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "255,255,255";
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
}
