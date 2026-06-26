"use client";

import React, { useEffect, useRef, useMemo, useCallback } from "react";

// --- Config ---
const DANDELION_COUNT = 13;
const MIN_SIZE = 42;
const MAX_SIZE = 82;
const PATH_DURATION = 32; // seconds for full traversal (slower = more majestic)

// Weighted color distribution: white ~30%, yellow ~30%, grey ~30%, orange ~10% (very rare)
const COLOR_POOL: string[] = [
  "/dandelion-white.svg",
  "/dandelion-white.svg",
  "/dandelion-white.svg",
  "/dandelion-yellow.svg",
  "/dandelion-yellow.svg",
  "/dandelion-yellow.svg",
  "/dandelion-grey.svg",
  "/dandelion-grey.svg",
  "/dandelion-grey.svg",
  "/dandelion-orange.svg",
];

interface DandelionData {
  id: number;
  src: string;
  size: number;
  rotationSpeed: number; // degrees per second, varies per dandelion
  pathOffset: number; // normalized [0,1] spacing along path
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function DandelionRiver() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const startTimeRef = useRef<number | null>(null);
  const imagesRef = useRef<Map<string, HTMLImageElement>>(new Map());
  const imagesLoadedRef = useRef(false);
  const loadedCountRef = useRef(0);

  // Stable dandelion data — generated once
  const dandelions = useMemo<DandelionData[]>(() => {
    const shuffledColors = shuffleArray(COLOR_POOL);
    return Array.from({ length: DANDELION_COUNT }, (_, i) => ({
      id: i,
      src: shuffledColors[i % shuffledColors.length],
      size: MIN_SIZE + Math.random() * (MAX_SIZE - MIN_SIZE),
      // Wide range of rotation speeds so they all spin differently
      rotationSpeed: 25 + Math.random() * 110,
      // Even spacing: each dandelion 1/N of the path apart
      pathOffset: i / DANDELION_COUNT,
    }));
  }, []);

  // Preload images
  useEffect(() => {
    const uniqueSrcs = [...new Set(dandelions.map((d) => d.src))];
    loadedCountRef.current = 0;

    uniqueSrcs.forEach((src) => {
      if (imagesRef.current.has(src)) {
        loadedCountRef.current++;
        if (loadedCountRef.current === uniqueSrcs.length) {
          imagesLoadedRef.current = true;
        }
        return;
      }
      const img = new Image();
      img.onload = () => {
        imagesRef.current.set(src, img);
        loadedCountRef.current++;
        if (loadedCountRef.current === uniqueSrcs.length) {
          imagesLoadedRef.current = true;
        }
      };
      img.onerror = () => {
        loadedCountRef.current++;
        if (loadedCountRef.current === uniqueSrcs.length) {
          imagesLoadedRef.current = true;
        }
      };
      img.src = src;
    });
  }, [dandelions]);

  // Build the S-curve SVG path to precisely match the mockup.
  //
  // CRITICAL: The section is ~1320px tall but the viewport is ~656px.
  // The mockup shows only the top 50% of the section.
  // Therefore ALL dandelion action must happen in the top 50% of h (y <= 0.5*h).
  //
  // Mockup dandelion positions (as % of viewport = % of section top half):
  //   Top-right cluster: ~84%x, 14%y  →  in section coords: 84%w, 7%h
  //   Upper-mid right:   ~69%x, 20%y  →  69%w, 10%h
  //   Center-right:      ~49%x, 37%y  →  49%w, 18%h  (orange)
  //   Center:            ~44%x, 45%y  →  44%w, 22%h  (grey)
  //   Center-left:       ~43%x, 55%y  →  43%w, 27%h  (grey smaller)
  //   Left-center:       ~30%x, 65%y  →  30%w, 32%h  (yellow)
  //   Bottom-left exit:  ~20%x, 75%y  →  20%w, 37%h  (white, partial)
  //   Off-screen exit:   bottom-left
  const updatePath = useCallback(() => {
    const container = containerRef.current;
    const pathEl = pathRef.current;
    const svgEl = svgRef.current;
    if (!container || !pathEl || !svgEl) return;

    const w = container.offsetWidth;
    const h = container.offsetHeight;

    svgEl.setAttribute("width", String(w));
    svgEl.setAttribute("height", String(h));
    svgEl.setAttribute("viewBox", `0 0 ${w} ${h}`);

    const overshoot = 300;
    // Fine-tuned path to match mockup precisely:
    // Mockup has dandelions in the center-right zone, flowing diagonally top-right→bottom-left
    const d = [
      `M ${w + overshoot} ${h * -0.04}`,        // Start: far off-screen top-right
      `C ${w * 0.96} ${h * 0.00},`,              // CP1: enters top-right corner area
      `  ${w * 0.90} ${h * 0.04},`,              // CP2: top-right cluster zone (partially off-screen)
      `  ${w * 0.80} ${h * 0.08}`,               // Anchor 1: ~80%x, first visible dandelion
      `C ${w * 0.70} ${h * 0.13},`,              // CP3: sweeping down-left
      `  ${w * 0.64} ${h * 0.17},`,              // CP4: white dandelion zone
      `  ${w * 0.58} ${h * 0.21}`,               // Anchor 2: ~58%x, 21% section — center-right
      `C ${w * 0.52} ${h * 0.25},`,              // CP5: S-curve inflection (orange zone)
      `  ${w * 0.46} ${h * 0.29},`,              // CP6: orange → grey zone
      `  ${w * 0.40} ${h * 0.33}`,               // Anchor 3: ~40%x, grey dandelion
      `C ${w * 0.32} ${h * 0.37},`,              // CP7: heading bottom-left (yellow zone)
      `  ${w * 0.18} ${h * 0.42},`,              // CP8: approaching exit
      `  ${-overshoot} ${h * 0.47}`,             // End: off-screen left (still in viewport)
    ].join(" ");

    pathEl.setAttribute("d", d);
  }, []);


  // Canvas animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      updatePath();
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const animate = (timestamp: number) => {
      if (!ctx || !canvas) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      // Wait for images and path to be ready
      if (!imagesLoadedRef.current || !pathRef.current) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = (timestamp - startTimeRef.current) / 1000; // seconds
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const pathEl = pathRef.current;
      const totalLength = pathEl.getTotalLength();

      // globalProgress: 0→1 over PATH_DURATION, then loops
      const globalProgress = (elapsed / PATH_DURATION) % 1;

      dandelions.forEach((d) => {
        // Each dandelion is offset by its pathOffset
        // Combined normalized position along path
        let t = (globalProgress + d.pathOffset) % 1;

        // Map t to path length
        const point = pathEl.getPointAtLength(t * totalLength);

        const img = imagesRef.current.get(d.src);
        if (!img) return;

        // Self-rotation: each spins at its own speed
        const rotation = ((elapsed * d.rotationSpeed) % 360) * (Math.PI / 180);

        // Subtle breathing scale
        const breathe = 1 + Math.sin(elapsed * 0.7 + d.id * 1.7) * 0.035;
        const size = d.size * breathe;
        const half = size / 2;

        ctx.save();
        ctx.translate(point.x, point.y);
        ctx.rotate(rotation);

        // Color-specific glow
        if (d.src.includes("orange")) {
          ctx.shadowColor = "rgba(255, 140, 0, 0.45)";
          ctx.shadowBlur = 18;
        } else if (d.src.includes("yellow")) {
          ctx.shadowColor = "rgba(255, 229, 0, 0.30)";
          ctx.shadowBlur = 14;
        } else if (d.src.includes("white")) {
          ctx.shadowColor = "rgba(255, 255, 255, 0.25)";
          ctx.shadowBlur = 12;
        } else {
          ctx.shadowColor = "rgba(180, 180, 180, 0.20)";
          ctx.shadowBlur = 10;
        }

        ctx.drawImage(img, -half, -half, size, size);
        ctx.restore();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, [dandelions, updatePath]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 3 }}
    >
      {/* Hidden SVG — only used for getPointAtLength path math */}
      <svg
        ref={svgRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          visibility: "hidden",
          overflow: "visible",
          pointerEvents: "none",
        }}
      >
        <path ref={pathRef} fill="none" stroke="none" />
      </svg>

      {/* Canvas — visible dandelion rendering */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}
