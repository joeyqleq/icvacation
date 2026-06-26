"use client";
import { useRef, useEffect, useCallback } from "react";
import { useScroll, useVelocity, useTransform, useMotionValue, animate } from "motion/react";

interface ScrollVelocityProps {
  texts: string[];
  velocity?: number;
  className?: string;
  separator?: string;
}

function VelocityRow({
  text,
  baseVelocity,
  direction,
  className,
}: {
  text: string;
  baseVelocity: number;
  direction: 1 | -1;
  className?: string;
}) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  const x = useTransform(baseX, (v) => `${v % 100}%`);

  useEffect(() => {
    let prevTime: number;
    let rafId: number;

    const loop = (time: number) => {
      if (prevTime !== undefined) {
        const delta = time - prevTime;
        const vel = scrollVelocity.get();
        const speed = baseVelocity + Math.abs(vel) * 0.004;
        baseX.set(baseX.get() + direction * speed * (delta / 16));
      }
      prevTime = time;
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [baseVelocity, direction, scrollVelocity, baseX]);

  const repeated = `${text}   ${text}   ${text}   ${text}   `;

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <span className={`inline-block ${className}`}>{repeated}</span>
    </div>
  );
}

export function ScrollVelocity({
  texts,
  velocity = 4,
  className = "",
  separator = "·",
}: ScrollVelocityProps) {
  return (
    <div className="flex flex-col gap-2 select-none pointer-events-none overflow-hidden">
      {texts.map((text, i) => (
        <VelocityRow
          key={i}
          text={text}
          baseVelocity={velocity}
          direction={i % 2 === 0 ? 1 : -1}
          className={className}
        />
      ))}
    </div>
  );
}
