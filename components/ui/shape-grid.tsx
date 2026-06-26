"use client";
import { useEffect, useRef } from "react";

interface ShapeGridProps {
  hoverColor?: string;
  shape?: "hexagon" | "square" | "circle";
  className?: string;
  size?: number;
  gap?: number;
}

export function ShapeGrid({
  hoverColor = "#26FC00",
  shape = "hexagon",
  className = "",
  size = 32,
  gap = 4,
}: ShapeGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
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

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    canvas.addEventListener("mousemove", onMouseMove);

    function drawHex(x: number, y: number, r: number) {
      ctx!.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const px = x + r * Math.cos(angle);
        const py = y + r * Math.sin(angle);
        i === 0 ? ctx!.moveTo(px, py) : ctx!.lineTo(px, py);
      }
      ctx!.closePath();
    }

    function drawShape(x: number, y: number, r: number) {
      if (shape === "hexagon") {
        drawHex(x, y, r);
      } else if (shape === "square") {
        ctx!.beginPath();
        ctx!.rect(x - r, y - r, r * 2, r * 2);
      } else {
        ctx!.beginPath();
        ctx!.arc(x, y, r, 0, Math.PI * 2);
      }
    }

    const step = size + gap;
    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const cols = Math.ceil(w / step) + 1;
      const rows = Math.ceil(h / (step * 0.866)) + 1;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const offset = row % 2 === 0 ? 0 : step * 0.5;
          const x = col * step + offset;
          const y = row * step * 0.866;
          const dist = Math.hypot(x - mouseRef.current.x, y - mouseRef.current.y);
          const proximity = Math.max(0, 1 - dist / (size * 8));

          const baseOpacity = 0.06;
          const hoverOpacity = proximity * 0.4;

          // Parse hover color
          const hr = parseInt(hoverColor.slice(1, 3), 16);
          const hg = parseInt(hoverColor.slice(3, 5), 16);
          const hb = parseInt(hoverColor.slice(5, 7), 16);

          const alpha = baseOpacity + hoverOpacity;
          ctx.fillStyle = `rgba(${hr},${hg},${hb},${alpha})`;
          ctx.strokeStyle = `rgba(${hr},${hg},${hb},${baseOpacity + proximity * 0.5})`;
          ctx.lineWidth = 0.5;

          drawShape(x, y, size * 0.45);
          ctx.fill();
          ctx.stroke();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [hoverColor, shape, size, gap]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      aria-hidden="true"
    />
  );
}
