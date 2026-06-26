"use client";
import { useEffect, useRef } from "react";

interface GlobeProps {
  className?: string;
  dotColor?: string;
  glowColor?: string;
  speed?: number;
}

export function Globe({
  className = "",
  dotColor = "#26FC00",
  glowColor = "#26FC00",
  speed = 0.003,
}: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const size = Math.min(canvas.offsetWidth, canvas.offsetHeight);
      canvas.width = size;
      canvas.height = size;
    };
    resize();
    window.addEventListener("resize", resize);

    // Generate dot coordinates (lat/lng grid + some random)
    const dots: { lat: number; lng: number }[] = [];
    for (let lat = -80; lat <= 80; lat += 10) {
      const numLng = Math.round(Math.cos((lat * Math.PI) / 180) * 36);
      for (let i = 0; i < numLng; i++) {
        dots.push({ lat, lng: (360 / numLng) * i - 180 });
      }
    }
    // Add some major city dots
    const cities = [
      { lat: 51.5, lng: 0 }, { lat: 40.7, lng: -74 }, { lat: 35.7, lng: 139.7 },
      { lat: -33.9, lng: 151.2 }, { lat: 48.9, lng: 2.3 }, { lat: 55.8, lng: 37.6 },
      { lat: 19.4, lng: -99.1 }, { lat: -23.5, lng: -46.6 }, { lat: 1.3, lng: 103.8 },
      { lat: 25.2, lng: 55.3 }, { lat: 37.6, lng: -122.4 }, { lat: 41.9, lng: 12.5 },
    ];
    cities.forEach(c => dots.push(c));

    let rotation = 0;
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let currentRotX = 0;

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 0.5;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 0.5;
      targetRotX = mouseY * 0.8;
    };
    canvas.addEventListener("mousemove", onMove);

    const draw = () => {
      const size = canvas.width;
      const cx = size / 2;
      const cy = size / 2;
      const r = size * 0.42;

      ctx.clearRect(0, 0, size, size);

      // Glow effect
      const grd = ctx.createRadialGradient(cx, cy, r * 0.7, cx, cy, r * 1.2);
      const hex = glowColor;
      const gr = parseInt(hex.slice(1, 3), 16);
      const gg = parseInt(hex.slice(3, 5), 16);
      const gb = parseInt(hex.slice(5, 7), 16);
      grd.addColorStop(0, `rgba(${gr},${gg},${gb},0.06)`);
      grd.addColorStop(1, `rgba(${gr},${gg},${gb},0)`);
      ctx.beginPath();
      ctx.arc(cx, cy, r * 1.2, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      // Globe base
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(5,5,5,0.6)";
      ctx.fill();
      ctx.strokeStyle = `rgba(${gr},${gg},${gb},0.15)`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Smooth rotation lerp
      currentRotX += (targetRotX - currentRotX) * 0.05;
      rotation += speed;

      // Parse dot color
      const dr = parseInt(dotColor.slice(1, 3), 16);
      const dg = parseInt(dotColor.slice(3, 5), 16);
      const db = parseInt(dotColor.slice(5, 7), 16);

      dots.forEach(({ lat, lng }) => {
        const phi = ((90 - lat) * Math.PI) / 180;
        const theta = ((lng + rotation * (180 / Math.PI)) * Math.PI) / 180;

        // Apply tilt based on mouse
        const sinPhi = Math.sin(phi);
        const x0 = sinPhi * Math.sin(theta);
        const y0 = Math.cos(phi);
        const z0 = sinPhi * Math.cos(theta);

        // Tilt rotation around X axis
        const cosT = Math.cos(currentRotX);
        const sinT = Math.sin(currentRotX);
        const y1 = y0 * cosT - z0 * sinT;
        const z1 = y0 * sinT + z0 * cosT;

        if (z1 < 0) return; // back-face culling

        const px = cx + x0 * r;
        const py = cy - y1 * r;
        const brightness = 0.3 + z1 * 0.7;
        const dotSize = 1.5 + z1 * 1.5;

        ctx.beginPath();
        ctx.arc(px, py, dotSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${dr},${dg},${db},${brightness * 0.8})`;
        ctx.fill();
      });

      // Grid lines (lat/lng circles)
      ctx.globalAlpha = 0.06;
      ctx.strokeStyle = `rgb(${gr},${gg},${gb})`;
      ctx.lineWidth = 0.5;

      // Equator and tropics
      [-30, 0, 30].forEach(lat => {
        const phi = ((90 - lat) * Math.PI) / 180;
        const rLat = Math.sin(phi) * r;
        const yLat = cy + Math.cos(phi) * r * Math.sin(currentRotX) * -1;
        if (rLat > 0) {
          ctx.beginPath();
          ctx.ellipse(cx, yLat, rLat, rLat * Math.abs(Math.cos(currentRotX)), 0, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      ctx.globalAlpha = 1;

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [dotColor, glowColor, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      aria-label="Interactive 3D globe"
      role="img"
    />
  );
}
