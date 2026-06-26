"use client";

const variants = [
  { mascot: "/mascot-bird.svg", side: "right" },
  { mascot: "/mascot-owl.svg", side: "left" },
  { mascot: "/ic-penguin.svg", side: "right" },
];

export function SectionBreak({ variant = 0 }: { variant?: number }) {
  const v = variants[variant % variants.length];

  return (
    <div className="relative py-6 lg:py-10 overflow-hidden" aria-hidden="true">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col items-center gap-12">
        <div className="w-full flex items-center gap-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
          <div className={`relative ${v.side === "right" ? "order-last" : ""}`}>
            <img
              src={v.mascot}
              alt=""
              className="w-16 h-16 lg:w-24 lg:h-24 opacity-90 animate-drift-slow"
            />
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
        </div>
        {variant === 1 && (
          <img 
            src="/ic-wordmark-grey.svg" 
            alt="IC Vacation" 
            className="w-full max-w-[24rem] sm:max-w-[32rem] lg:max-w-[48rem] opacity-70"
          />
        )}
      </div>
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] opacity-[0.03]"
          style={{
            background: "radial-gradient(ellipse at center, rgba(38, 252, 0, 0.5), transparent 70%)",
          }}
        />
      </div>
    </div>
  );
}
