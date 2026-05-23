import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/site/page-shell";
import { PageCta } from "@/components/site/page-cta";
import { BackgroundBoxes } from "@/components/site/background-boxes";
import { posts } from "@/lib/blog-data";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Field notes · IC Vacation",
  description:
    "An editorial roll from the advisor's desk. Short essays, destination dispatches, and quiet field notes from Isaac.",
};

export default function BlogIndexPage() {
  const feature = posts.find((p) => p.feature) ?? posts[0];
  const rest = posts.filter((p) => p.slug !== feature.slug);

  return (
    <PageShell>
      {/* HEADER */}
      <section className="relative pt-40 lg:pt-48 pb-16 lg:pb-20 bg-background overflow-hidden">
        <img
          src="/dandelion-yellow.svg"
          alt=""
          aria-hidden="true"
          className="absolute -top-12 -right-24 w-[34rem] h-[34rem] opacity-[0.06] animate-drift-slow pointer-events-none"
        />
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
          <span className="inline-flex items-center gap-3 label-ticker text-white/55 mb-6">
            <span className="w-10 h-px bg-brand-green/60" />
            [ 06 ] // Field notes
          </span>
          <h1
            className="font-display-tight text-white leading-[0.9] tracking-[-0.035em] max-w-[1000px]"
            style={{ fontSize: "clamp(2.8rem, 8vw, 8rem)", textWrap: "balance" }}
          >
            Short essays,
            <br />
            <span className="font-serif italic text-brand-yellow">slow dispatches.</span>
          </h1>
          <p
            className="mt-8 max-w-[620px] font-editorial text-[18px] lg:text-[20px] text-white/72 leading-[1.55]"
            style={{ textWrap: "pretty" }}
          >
            An occasional log from the advisor's desk. Field notes, destination
            dispatches, and the small, opinionated essays Isaac writes between
            trips.
          </p>
        </div>
      </section>

      {/* FEATURE POST */}
      <section className="relative pb-24 bg-background">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <Link
            href={`/blog/${feature.slug}`}
            className="group block border-y border-foreground/10"
          >
            <div className="grid lg:grid-cols-[1.1fr_1fr]">
              <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[480px] overflow-hidden">
                <img
                  src={feature.image}
                  alt=""
                  aria-hidden="true"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-transparent" />
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center gap-6 bg-background border-l-0 lg:border-l border-foreground/10">
                <div className="flex items-center gap-3 label-ticker text-brand-green">
                  Featured · {feature.category}
                </div>
                <h2
                  className="font-display-tight text-white leading-[0.95] tracking-[-0.025em]"
                  style={{ fontSize: "clamp(1.8rem, 4vw, 3.4rem)", textWrap: "balance" }}
                >
                  {feature.title}
                </h2>
                <p className="font-editorial italic text-[17px] lg:text-[19px] text-white/75 leading-snug max-w-[560px]">
                  {feature.dek}
                </p>
                <div className="flex items-center gap-4 mt-2 font-mono text-[11px] uppercase tracking-[0.22em] text-white/45">
                  <span>{feature.date}</span>
                  <span className="w-1 h-1 rounded-full bg-white/30" />
                  <span>{feature.read}</span>
                  <span className="ml-auto inline-flex items-center gap-1 text-brand-green group-hover:translate-x-0.5 transition-transform">
                    Read <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ARTICLE GRID */}
      <section className="relative pb-24 bg-background">
        <BackgroundBoxes variant="grey" className="opacity-15" />
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex items-baseline justify-between mb-10">
            <span className="inline-flex items-center gap-3 label-ticker text-white/55">
              <span className="w-10 h-px bg-brand-green/60" />
              [ 07 ] // The roll
            </span>
            <span className="font-mono text-[11px] tracking-[0.28em] text-white/45">
              {rest.length.toString().padStart(2, "0")} entries
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground/10">
            {rest.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group bg-background flex flex-col"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={p.image}
                    alt=""
                    aria-hidden="true"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04] grayscale-[20%] group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-[0.28em] text-brand-green bg-background/70 backdrop-blur px-2 py-1">
                    {p.category}
                  </span>
                </div>
                <div className="p-6 lg:p-7 flex flex-col gap-3 flex-1">
                  <h3
                    className="font-display text-white text-xl lg:text-2xl leading-[1.1] tracking-tight group-hover:text-brand-yellow transition-colors"
                    style={{ textWrap: "balance" }}
                  >
                    {p.title}
                  </h3>
                  <p className="font-editorial italic text-[15px] text-white/60 leading-snug line-clamp-2">
                    {p.dek}
                  </p>
                  <div className="mt-auto pt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
                    <span>{p.date}</span>
                    <span>{p.read}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <PageCta
        eyebrow="// Subscribe"
        title="Field notes by"
        emphasis="email, occasionally."
        subtitle="A short, considered note when something is worth saying. No newsletter cadence, no offers."
        primary={{ label: "Plan a trip with Isaac", href: "/contact" }}
        secondary={{ label: "About Isaac", href: "/about-isaac" }}
      />
    </PageShell>
  );
}
