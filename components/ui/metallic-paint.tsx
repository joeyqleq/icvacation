"use client";
import { useEffect, useRef } from "react";

interface MetallicPaintProps {
  imageUrl: string;
  color?: string;
  metalIntensity?: number;
  className?: string;
  alt?: string;
}

export function MetallicPaint({
  imageUrl,
  color = "#FFE500",
  metalIntensity = 0.8,
  className = "",
  alt = "",
}: MetallicPaintProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageUrl;
    imgRef.current = img;

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };
    window.addEventListener("mousemove", onMove);

    const rgb = {
      r: parseInt(color.slice(1, 3), 16),
      g: parseInt(color.slice(3, 5), 16),
      b: parseInt(color.slice(5, 7), 16),
    };

    let t = 0;
    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;

      if (imgRef.current?.complete && imgRef.current.naturalWidth) {
        ctx.clearRect(0, 0, w, h);

        // Draw the SVG image
        ctx.drawImage(imgRef.current, 0, 0, w, h);

        // Metallic shimmer overlay
        ctx.globalCompositeOperation = "source-atop";

        const shimmerX = (mouseRef.current.x + Math.sin(t * 0.02) * 0.3) * w;
        const shimmerY = mouseRef.current.y * h;

        const grd = ctx.createRadialGradient(shimmerX, shimmerY, 0, shimmerX, shimmerY, w * 0.8);
        const a = metalIntensity * 0.7;
        grd.addColorStop(0, `rgba(255,255,255,${a * 0.9})`);
        grd.addColorStop(0.2, `rgba(${rgb.r},${rgb.g},${rgb.b},${a * 0.7})`);
        grd.addColorStop(0.5, `rgba(${rgb.r},${rgb.g},${rgb.b},${a * 0.3})`);
        grd.addColorStop(1, `rgba(0,0,0,${a * 0.4})`);

        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, w, h);

        ctx.globalCompositeOperation = "source-over";
      }

      t++;
      rafRef.current = requestAnimationFrame(draw);
    };

    img.onload = () => {
      canvas.width = img.naturalWidth || 128;
      canvas.height = img.naturalHeight || 128;
      rafRef.current = requestAnimationFrame(draw);
    };

    if (img.complete) {
      canvas.width = img.naturalWidth || 128;
      canvas.height = img.naturalHeight || 128;
      rafRef.current = requestAnimationFrame(draw);
    }

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [imageUrl, color, metalIntensity]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-label={alt}
      role={alt ? "img" : undefined}
    />
  );
}
