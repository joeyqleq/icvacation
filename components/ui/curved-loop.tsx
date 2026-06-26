"use client";
import { useRef, useEffect, useState } from "react";

interface CurvedLoopProps {
  marqueeText: string;
  speed?: number;
  className?: string;
  curveAmount?: number;
}

export function CurvedLoop({
  marqueeText,
  speed = 4,
  className = "",
  curveAmount = 400,
}: CurvedLoopProps) {
  const [offset, setOffset] = useState(0);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(1000);

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

  useEffect(() => {
    const animate = (time: number) => {
      if (lastTimeRef.current) {
        const delta = time - lastTimeRef.current;
        setOffset(prev => (prev + (speed * delta) / 16) % pathLength);
      }
      lastTimeRef.current = time;
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [speed, pathLength]);

  const width = 1400;
  const height = 120;
  const mid = height / 2;
  const d = `M 0,${mid} C ${width * 0.25},${mid - curveAmount * 0.15} ${width * 0.75},${mid + curveAmount * 0.15} ${width},${mid}`;

  // Repeat text enough to fill the path
  const repeated = Array.from({ length: 8 }, () => marqueeText).join(" · ");

  return (
    <div className="overflow-hidden w-full" style={{ height }}>
      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
        <defs>
          <path id="curved-loop-path" ref={pathRef} d={d} />
        </defs>
        <text className={className} dy="0">
          <textPath href="#curved-loop-path" startOffset={-offset}>
            {repeated}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
