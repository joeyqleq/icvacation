"use client";

/**
 * Mascot — reusable, animated SVG mascot renderer.
 *
 * The original SVGs (/public/ic-owl.svg etc.) are detailed line-art with
 * baked-in linear gradients.  This component wraps them with creative
 * animated treatments: subtle hover-float, color-shift via mix-blend,
 * tilt, drop-shadow halo, and stroke-glow.  Keeps the silhouettes intact
 * while making them feel alive and brand-aligned.
 */

type Creature = "owl" | "bird" | "penguin" | "dandelion";

const SRC: Record<Creature, string> = {
  owl: "/ic-owl.svg",
  bird: "/ic-bird.svg",
  penguin: "/ic-penguin.svg",
  dandelion: "/ic-dandelion.svg",
};

type Pose = "hover" | "bob" | "wiggle" | "still";
type Tint = "yellow" | "green" | "grey" | "white" | "ghost";

const TINT_FILTER: Record<Tint, string> = {
  // hue-rotate / saturate matrix to push baked gradients toward brand colors
  yellow: "saturate(1.15) hue-rotate(-8deg)",
  green:  "saturate(2) hue-rotate(38deg) brightness(0.95)",
  grey:   "saturate(0) brightness(0.85)",
  white:  "saturate(0) brightness(2.3) contrast(1.1)",
  ghost:  "saturate(0) brightness(1.4) contrast(0.85) opacity(0.42)",
};

export function Mascot({
  creature,
  size = 220,
  pose = "hover",
  tint,
  glow = false,
  className = "",
  alt = "",
}: {
  creature: Creature;
  size?: number;
  pose?: Pose;
  tint?: Tint;
  glow?: boolean;
  className?: string;
  alt?: string;
}) {
  const poseClass =
    pose === "hover" ? "mascot-hover" :
    pose === "bob"   ? "mascot-bob"   :
    pose === "wiggle"? "mascot-wiggle": "";

  const filter = tint ? TINT_FILTER[tint] : undefined;
  const glowStyle: React.CSSProperties = glow
    ? { filter: `${filter ?? ""} drop-shadow(0 18px 36px rgba(38,252,0,0.32)) drop-shadow(0 0 24px rgba(253,249,114,0.25))` }
    : filter
      ? { filter }
      : {};

  return (
    <div
      className={`relative inline-block ${poseClass} ${className}`}
      style={{ width: size, height: size }}
      aria-hidden={alt === ""}
    >
      <img
        src={SRC[creature]}
        alt={alt}
        width={size}
        height={size}
        className="w-full h-full object-contain select-none pointer-events-none"
        style={glowStyle}
        draggable={false}
      />
    </div>
  );
}
