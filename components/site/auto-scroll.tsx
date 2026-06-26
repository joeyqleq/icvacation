"use client";

import { useRef, useEffect, useState } from "react";

interface AutoScrollProps {
  children: React.ReactNode;
  speed?: number;
  pauseOnHover?: boolean;
  className?: string;
}

export function AutoScroll({
  children,
  speed = 0.5,
  pauseOnHover = true,
  className = "",
}: AutoScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animId: number;
    let position = 0;

    const step = () => {
      if (!isPaused) {
        position += speed;
        const halfWidth = el.scrollWidth / 2;
        if (position >= halfWidth) position = 0;
        el.style.transform = `translate3d(-${position}px, 0, 0)`;
      }
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isPaused, speed]);

  return (
    <div
      className={`overflow-hidden ${className}`}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <div ref={scrollRef} className="flex will-change-transform">
        {children}
        {children}
      </div>
    </div>
  );
}
