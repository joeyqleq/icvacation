"use client";

const svgs = ["/icvacation_sunflower.svg", "/icvacation_tree.svg", "/icavacation_seal.svg"];

export function SectionBreak({ variant = 0 }: { variant?: number }) {
  const svg = svgs[variant % svgs.length];
  return (
    <div className="relative py-4 overflow-hidden" aria-hidden="true">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex items-center gap-6">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
        <img src={svg} alt="" className="w-12 h-12 opacity-40 animate-drift-slow" />
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
      </div>
    </div>
  );
}
