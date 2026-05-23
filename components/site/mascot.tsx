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

type Variant = "default" | "neon" | "glow" | "ghost" | "outline";
type Size = "sm" | "md" | "lg" | "xl" | number;

const SIZE_MAP: Record<string, number> = {
  sm: 80,
  md: 140,
  lg: 220,
  xl: 320,
};

const VARIANT_STYLE: Record<Variant, React.CSSProperties> = {
  default: {},
  neon: {
    filter: "saturate(1.3) brightness(1.1) drop-shadow(0 0 24px rgba(38,252,0,0.55)) drop-shadow(0 0 48px rgba(253,249,114,0.3))",
  },
  glow: {
    filter: "drop-shadow(0 18px 36px rgba(38,252,0,0.32)) drop-shadow(0 0 24px rgba(253,249,114,0.25))",
  },
  ghost: {
    filter: "saturate(0) brightness(1.4) contrast(0.85)",
    opacity: 0.35,
  },
  outline: {
    filter: "saturate(0) brightness(2.2) contrast(1.5)",
    opacity: 0.6,
  },
};

export function Mascot({
  type,
  creature,
  size = "md",
  variant = "default",
  pose,
  tint,
  glow = false,
  className = "",
  alt = "",
}: {
  type?: Creature;
  creature?: Creature;
  size?: Size;
  variant?: Variant;
  pose?: "hover" | "bob" | "wiggle" | "still";
  tint?: "yellow" | "green" | "grey" | "white" | "ghost";
  glow?: boolean;
  className?: string;
  alt?: string;
}) {
  // Support both `type` and legacy `creature` props
  const mascotType = type ?? creature ?? "dandelion";
  const resolvedSize = typeof size === "number" ? size : (SIZE_MAP[size] ?? 140);

  const poseClass =
    pose === "hover" ? "mascot-hover" :
    pose === "bob"   ? "mascot-bob"   :
    pose === "wiggle"? "mascot-wiggle": "mascot-hover";

  // Build combined style from variant + legacy tint + glow
  let style: React.CSSProperties = { ...VARIANT_STYLE[variant] };
  
  // Legacy tint support
  if (tint) {
    const TINT_FILTER: Record<string, string> = {
      yellow: "saturate(1.15) hue-rotate(-8deg)",
      green:  "saturate(2) hue-rotate(38deg) brightness(0.95)",
      grey:   "saturate(0) brightness(0.85)",
      white:  "saturate(0) brightness(2.3) contrast(1.1)",
      ghost:  "saturate(0) brightness(1.4) contrast(0.85) opacity(0.42)",
    };
    style.filter = (style.filter ? style.filter + " " : "") + TINT_FILTER[tint];
  }

  // Legacy glow prop
  if (glow && variant === "default") {
    style = { ...VARIANT_STYLE.glow, ...style };
  }

  return (
    <div
      className={`relative inline-block ${poseClass} ${className}`}
      style={{ width: resolvedSize, height: resolvedSize }}
      aria-hidden={alt === ""}
    >
      <img
        src={SRC[mascotType]}
        alt={alt}
        width={resolvedSize}
        height={resolvedSize}
        className="w-full h-full object-contain select-none pointer-events-none"
        style={style}
        draggable={false}
      />
    </div>
  );
}
