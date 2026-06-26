"use client";
import { useRef, useEffect } from "react";

interface ScrambledTextProps {
  children: string;
  className?: string;
  style?: React.CSSProperties;
  radius?: number;
  duration?: number;
  speed?: number;
  scrambleChars?: string;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$%&";

export function ScrambledText({
  children,
  className = "",
  style,
  radius = 120,
  duration = 1.2,
  speed = 0.5,
  scrambleChars = CHARS,
}: ScrambledTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const stateRef = useRef<
    Array<{ char: string; scrambling: boolean; startTime: number | null; resolved: boolean }>
  >([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);

  const original = children;

  useEffect(() => {
    stateRef.current = original.split("").map((char) => ({
      char,
      scrambling: false,
      startTime: null,
      resolved: true,
    }));

    const container = containerRef.current;
    if (!container) return;

    const spans: HTMLSpanElement[] = original.split("").map((char, i) => {
      const s = document.createElement("span");
      s.textContent = char === " " ? " " : char;
      s.style.display = "inline-block";
      container.appendChild(s);
      return s;
    });

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouseMove);

    const loop = (time: number) => {
      spans.forEach((span, i) => {
        const rect = span.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dist = Math.hypot(cx - mouseRef.current.x, cy - mouseRef.current.y);
        const state = stateRef.current[i];

        if (dist < radius && state.resolved) {
          state.scrambling = true;
          state.resolved = false;
          state.startTime = time;
        }

        if (state.scrambling && state.startTime !== null) {
          const elapsed = (time - state.startTime) / 1000;
          if (elapsed < duration) {
            if (Math.random() < speed) {
              span.textContent =
                original[i] === " "
                  ? " "
                  : scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
            }
          } else {
            span.textContent = original[i] === " " ? " " : original[i];
            state.scrambling = false;
            state.resolved = true;
          }
        }
      });

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafRef.current);
      while (container.firstChild) container.removeChild(container.firstChild);
    };
  }, [original, radius, duration, speed, scrambleChars]);

  return <span ref={containerRef} className={className} style={style} />;
}
