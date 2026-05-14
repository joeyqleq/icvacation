"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import Link from "next/link";

/**
 * Pixel-cascade button — on hover, an 8x4 (default 16x4) tile grid
 * cascades over the surface in a choreographed sequence, transitioning
 * the visible color to the "end" color over ~1s.  On hover-off the
 * tiles cascade back in reverse.  Foreground text color cross-fades in
 * tandem so it always stays legible.
 *
 *   <PixelButton variant="yellow">Book a consultation</PixelButton>
 *   <PixelButton variant="grey">See where we send people</PixelButton>
 */
type Variant = "yellow" | "grey";

const COLS = 16;
const ROWS = 4;
const TOTAL = COLS * ROWS;
const STAGGER = 26; // ms between tile activations

function makeTiles() {
  // Choreograph: top-left → bottom-right diagonal cascade
  return Array.from({ length: TOTAL }).map((_, i) => {
    const r = Math.floor(i / COLS);
    const c = i % COLS;
    const inDelay  = (r * 0.5 + c) * STAGGER;
    // Reverse the cascade on hover-out
    const outDelay = ((ROWS - 1 - r) * 0.5 + (COLS - 1 - c)) * STAGGER;
    return { inDelay, outDelay };
  });
}

const TILES = makeTiles();

type CommonProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
};

type AsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type AsLink = CommonProps & {
  href: string;
  onClick?: () => void;
};

export const PixelButton = forwardRef<HTMLButtonElement, AsButton | AsLink>(
  function PixelButton(props, ref) {
    const { variant = "yellow", children, className = "", ...rest } = props as AsButton & {
      href?: string;
    };

    const tileEls = TILES.map(({ inDelay, outDelay }, i) => (
      <span
        key={i}
        style={
          {
            ["--pixel-in-delay" as string]: `${inDelay}ms`,
            ["--pixel-out-delay" as string]: `${outDelay}ms`,
          } as React.CSSProperties
        }
      />
    ));

    const grid = <span aria-hidden="true" className="pixel-grid">{tileEls}</span>;
    const classes = `pixel-btn pixel-btn-${variant} ${className}`;

    if ("href" in props && props.href) {
      const { href, onClick } = props as AsLink;
      // Use Next Link for internal routes, plain anchor for hashes / mailto
      const isInternal = href.startsWith("/") && !href.startsWith("//");
      if (isInternal) {
        return (
          <Link href={href} onClick={onClick} className={classes}>
            {grid}
            <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
          </Link>
        );
      }
      return (
        <a href={href} onClick={onClick} className={classes}>
          {grid}
          <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
        </a>
      );
    }

    return (
      <button ref={ref} className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
        {grid}
        <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      </button>
    );
  }
);
