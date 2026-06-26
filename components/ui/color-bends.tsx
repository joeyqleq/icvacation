"use client";
import { useEffect, useRef } from "react";

interface ColorBendsProps {
  color?: string;
  className?: string;
  intensity?: number;
}

export function ColorBends({
  color = "#26FC00",
  className = "",
  intensity = 1,
}: ColorBendsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  // Parse hex color to RGB
  function hexToRgb(hex: string) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rgb = hexToRgb(color);

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const orbs = Array.from({ length: 4 }, (_, i) => ({
      x: 0.2 + Math.random() * 0.6,
      y: 0.2 + Math.random() * 0.6,
      r: 0.3 + Math.random() * 0.3,
      speedX: (Math.random() - 0.5) * 0.0008,
      speedY: (Math.random() - 0.5) * 0.0008,
      phase: (i / 4) * Math.PI * 2,
    }));

    let t = 0;
    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      orbs.forEach((orb, i) => {
        const x = (orb.x + Math.sin(t * 0.001 + orb.phase) * 0.2) * w;
        const y = (orb.y + Math.cos(t * 0.0013 + orb.phase) * 0.2) * h;
        const r = orb.r * Math.min(w, h);

        const grd = ctx.createRadialGradient(x, y, 0, x, y, r);
        const alpha = 0.12 * intensity;
        grd.addColorStop(0, `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`);
        grd.addColorStop(0.5, `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha * 0.4})`);
        grd.addColorStop(1, `rgba(${rgb.r},${rgb.g},${rgb.b},0)`);

        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      });

      t++;
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [color, intensity]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      aria-hidden="true"
    />
  );
}
