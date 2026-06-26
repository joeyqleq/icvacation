"use client";
import { useEffect, useRef } from "react";

interface SideRaysProps {
  rayColor1?: string;
  rayColor2?: string;
  rayCount?: number;
  className?: string;
  origin?: "left" | "right" | "both";
}

export function SideRays({
  rayColor1 = "#26FC00",
  rayColor2 = "#FFE500",
  rayCount = 5,
  className = "",
  origin = "both",
}: SideRaysProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const rays = Array.from({ length: rayCount * (origin === "both" ? 2 : 1) }, (_, i) => ({
      angle: (Math.PI * 2 * i) / (rayCount * (origin === "both" ? 2 : 1)) + Math.random() * 0.3,
      width: 0.04 + Math.random() * 0.06,
      opacity: 0.03 + Math.random() * 0.08,
      speed: 0.0002 + Math.random() * 0.0003,
      phase: Math.random() * Math.PI * 2,
      color: i % 2 === 0 ? rayColor1 : rayColor2,
      side: origin === "both" ? (i < rayCount ? "left" : "right") : origin,
    }));

    let t = 0;
    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      rays.forEach((ray) => {
        const angle = ray.angle + Math.sin(t * ray.speed + ray.phase) * 0.15;
        const ox = ray.side === "left" ? 0 : w;
        const oy = h * 0.5;

        const length = Math.max(w, h) * 1.8;
        const dx = Math.cos(angle) * length;
        const dy = Math.sin(angle) * length;

        const halfWidth = length * Math.tan(ray.width * Math.PI);

        const grd = ctx.createLinearGradient(ox, oy, ox + dx, oy + dy);
        grd.addColorStop(0, `${ray.color}${Math.round(ray.opacity * 255).toString(16).padStart(2, "0")}`);
        grd.addColorStop(0.4, `${ray.color}${Math.round(ray.opacity * 0.3 * 255).toString(16).padStart(2, "0")}`);
        grd.addColorStop(1, `${ray.color}00`);

        ctx.beginPath();
        ctx.moveTo(ox, oy);
        ctx.lineTo(
          ox + dx + (dy / length) * halfWidth,
          oy + dy - (dx / length) * halfWidth
        );
        ctx.lineTo(
          ox + dx - (dy / length) * halfWidth,
          oy + dy + (dx / length) * halfWidth
        );
        ctx.closePath();
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
  }, [rayColor1, rayColor2, rayCount, origin]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      aria-hidden="true"
    />
  );
}
