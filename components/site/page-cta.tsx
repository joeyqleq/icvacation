import { ArrowUpRight } from "lucide-react";

interface PageCtaProps {
  eyebrow?: string;
  title: string;
  emphasis?: string; // shown as italic serif accent inline
  subtitle?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}

export function PageCta({
  eyebrow = "// Next step",
  title,
  emphasis,
  subtitle,
  primary = { label: "Plan my trip", href: "/contact" },
  secondary = { label: "Contact Isaac", href: "/contact" },
}: PageCtaProps) {
  return (
    <section className="relative py-24 lg:py-32 bg-background overflow-hidden">
      {/* Quiet dandelion + grey backdrop */}
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(38,252,0,0.05), transparent 70%)",
          }}
        />
      </div>
      <img
        src="/dandelion-grey.svg"
        alt=""
        aria-hidden="true"
        className="absolute -top-24 -left-24 w-[28rem] h-[28rem] opacity-[0.05] animate-drift-slow"
      />
      <img
        src="/dandelion-yellow.svg"
        alt=""
        aria-hidden="true"
        className="absolute -bottom-32 -right-24 w-[26rem] h-[26rem] opacity-[0.06] animate-drift"
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="max-w-[860px]">
          <span className="inline-flex items-center gap-3 label-ticker text-white/55 mb-6">
            <span className="w-10 h-px bg-brand-green/60" />
            {eyebrow}
          </span>
          <h2
            className="font-display-tight text-white leading-[0.92] tracking-[-0.035em] mb-6"
            style={{ fontSize: "clamp(2.4rem, 6.4vw, 5.8rem)", textWrap: "balance" }}
          >
            {title}
            {emphasis && (
              <>
                {" "}
                <span className="font-serif italic text-brand-yellow">
                  {emphasis}
                </span>
              </>
            )}
          </h2>
          {subtitle && (
            <p
              className="max-w-[560px] font-editorial text-[18px] md:text-[20px] text-white/75 leading-[1.5] mb-10"
              style={{ textWrap: "pretty" }}
            >
              {subtitle}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a
              href={primary.href}
              className="btn-primary group h-14 px-7 text-base justify-center sm:justify-start"
            >
              {primary.label}
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href={secondary.href}
              className="btn-secondary group inline-flex items-center justify-center sm:justify-start gap-3 h-14 px-7 text-base"
            >
              {secondary.label}
              <span className="font-mono text-white/60 group-hover:translate-x-0.5 transition-transform">
                &rarr;
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
