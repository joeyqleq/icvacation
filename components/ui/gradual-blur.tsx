"use client";

interface GradualBlurProps {
  direction?: "top" | "bottom" | "left" | "right";
  blurAmount?: number;
  className?: string;
  tint?: string;
}

export function GradualBlur({
  direction = "bottom",
  blurAmount = 16,
  className = "",
  tint = "transparent",
}: GradualBlurProps) {
  const gradientMap: Record<string, string> = {
    top: "to bottom",
    bottom: "to top",
    left: "to right",
    right: "to left",
  };

  const layers = 8;

  return (
    <div className={`absolute pointer-events-none ${className}`} aria-hidden="true">
      {Array.from({ length: layers }).map((_, i) => {
        const progress = i / (layers - 1);
        const blur = blurAmount * progress;
        const opacity = progress;

        const gradient =
          direction === "bottom"
            ? `linear-gradient(to top, rgba(5,5,5,${opacity * 0.85}), transparent)`
            : direction === "top"
            ? `linear-gradient(to bottom, rgba(5,5,5,${opacity * 0.85}), transparent)`
            : direction === "left"
            ? `linear-gradient(to right, rgba(5,5,5,${opacity * 0.85}), transparent)`
            : `linear-gradient(to left, rgba(5,5,5,${opacity * 0.85}), transparent)`;

        return (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              backdropFilter: `blur(${blur}px)`,
              WebkitBackdropFilter: `blur(${blur}px)`,
              maskImage: gradient,
              WebkitMaskImage: gradient,
            }}
          />
        );
      })}
    </div>
  );
}
