import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/site/page-shell";
import { PageCta } from "@/components/site/page-cta";
import { BackgroundBoxes } from "@/components/site/background-boxes";
import { posts } from "@/lib/blog-data";
import { ArrowUpRight } from "lucide-react";
import { LiamCtaBand } from "@/components/site/liam-cta-band";
import { ScrambledText } from "@/components/ui/scrambled-text";

export const metadata: Metadata = {
  title: "Field notes · IC Vacation",
  description:
    "An editorial roll from the advisor's desk. Short essays, destination dispatches, and quiet field notes from Isaac.",
};

const CATEGORY_COLORS: Record<string, string> = {
  "Field notes": "text-brand-green border-brand-green/30",
  "Destinations": "text-sky-400 border-sky-400/30",
  "Cruises": "text-blue-400 border-blue-400/30",
  "Safari": "text-amber-400 border-amber-400/30",
  "Romance": "text-rose-400 border-rose-400/30",
  "Hotels": "text-purple-400 border-purple-400/30",
  "Family": "text-orange-400 border-orange-400/30",
  "Flights": "text-cyan-400 border-cyan-400/30",
  "Essays": "text-brand-yellow border-brand-yellow/30",
};

function getCategoryColor(cat: string) {
  return CATEGORY_COLORS[cat] ?? "text-white/50 border-white/20";
}

export default function BlogIndexPage() {
  const feature = posts.find((p) => p.feature) ?? posts[0];
  const secondaryFeatures = posts.filter((p) => p.slug !== feature.slug).slice(0, 2);
  const rest = posts.filter(
    (p) => p.slug !== feature.slug && !secondaryFeatures.find((s) => s.slug === p.slug)
  );

  // Group remaining posts by category for the editorial roll
  const categories = [...new Set(rest.map((p) => p.category))];

  return (
    <PageShell>
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img
          src="/images/ai/isaac_journal.png"
          alt=""
          className="w-full h-full object-cover opacity-40 grayscale-[60%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/75 to-background" />
      </div>

      {/* HEADER */}
      <section className="relative pt-36 lg:pt-44 pb-12 lg:pb-16 bg-transparent overflow-hidden">
        <img
          src="/dandelion-yellow.svg"
          alt=""
          aria-hidden="true"
          className="absolute -top-8 -right-20 w-[28rem] h-[28rem] opacity-[0.05] animate-drift-slow pointer-events-none"
        />
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-[auto_1fr] gap-10 items-end">
            <div>
              <span className="inline-flex items-center gap-3 label-ticker text-white/55 mb-5">
                <span className="w-10 h-px bg-brand-green/60" />
                [ 06 ] // Field notes
              </span>
              <h1
                className="font-display-tight text-white leading-[0.88] tracking-[-0.035em] max-w-[800px]"
                style={{ fontSize: "clamp(2.6rem, 7vw, 7.4rem)", textWrap: "balance" }}
              >
                Short <ScrambledText scrambleChars="ABCDEFGHIJKLMNOPQRSTUVWXYZ" speed={0.3}>essays</ScrambledText>,
                <br />
                <span className="font-serif italic text-brand-yellow">slow dispatches.</span>
              </h1>
            </div>
            <div className="hidden lg:block self-end pb-2">
              <div className="flex items-center gap-6 justify-end">
                <div className="text-right">
                  <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/30 mb-1">
                    Total entries
                  </p>
                  <p className="font-display-tight text-brand-yellow text-4xl leading-none">
                    {posts.length.toString().padStart(2, "0")}
                  </p>
                </div>
                <div className="w-px h-16 bg-white/10" />
                <p
                  className="font-editorial italic text-[17px] text-white/55 leading-[1.55] max-w-[340px]"
                  style={{ textWrap: "pretty" }}
                >
                  An occasional log from the advisor's desk. Field notes, destination dispatches,
                  and the small essays Isaac writes between trips.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TOP EDITORIAL TRIO: 1 large + 2 vertical */}
      <section className="relative pb-0 bg-transparent z-10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-[1.55fr_1fr] gap-px bg-foreground/10 border-y border-foreground/10">
            {/* Hero feature — large left */}
            <Link href={`/blog/${feature.slug}`} className="group block relative overflow-hidden bg-background">
              <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full min-h-[360px] lg:min-h-[520px]">
                <img
                  src={feature.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-transparent" />
                <div className="absolute inset-0 p-7 lg:p-10 flex flex-col justify-end gap-4">
                  <div className="flex items-center gap-2.5">
                    <span className={`font-mono text-[10px] uppercase tracking-[0.28em] border px-2 py-0.5 ${getCategoryColor(feature.category)}`}>
                      {feature.category}
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.2em] text-brand-green/70 uppercase">
                      — Featured
                    </span>
                  </div>
                  <h2
                    className="font-display-tight text-white leading-[0.93] tracking-[-0.025em] max-w-[700px]"
                    style={{ fontSize: "clamp(1.7rem, 3.5vw, 3.2rem)", textWrap: "balance" }}
                  >
                    {feature.title}
                  </h2>
                  <p className="font-editorial italic text-[16px] lg:text-[18px] text-white/65 leading-snug max-w-[580px]">
                    {feature.dek}
                  </p>
                  <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
                    <span>{feature.date}</span>
                    <span className="w-1 h-1 rounded-full bg-white/25" />
                    <span>{feature.read}</span>
                    <span className="ml-auto inline-flex items-center gap-1 text-brand-green group-hover:translate-x-0.5 transition-transform">
                      Read <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Two secondary features stacked */}
            <div className="flex flex-col gap-px bg-foreground/10">
              {secondaryFeatures.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group flex-1 relative overflow-hidden bg-background flex flex-col"
                >
                  <div className="relative aspect-[16/9] overflow-hidden flex-shrink-0">
                    <img
                      src={p.image}
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05] grayscale-[15%] group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                    <span className={`absolute top-4 left-4 font-mono text-[10px] uppercase tracking-[0.28em] border px-2 py-0.5 bg-background/60 backdrop-blur ${getCategoryColor(p.category)}`}>
                      {p.category}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col gap-2.5 flex-1">
                    <h3
                      className="font-display text-white text-xl lg:text-2xl leading-[1.08] tracking-tight group-hover:text-brand-yellow transition-colors"
                      style={{ textWrap: "balance" }}
                    >
                      {p.title}
                    </h3>
                    <p className="font-editorial italic text-[14px] text-white/55 leading-snug line-clamp-2">
                      {p.dek}
                    </p>
                    <div className="mt-auto pt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
                      <span>{p.date}</span>
                      <span className="inline-flex items-center gap-1 text-brand-green/70 group-hover:text-brand-green group-hover:translate-x-0.5 transition-all">
                        Read <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EDITORIAL ROLL — category-filtered bento grid */}
      <section className="relative py-20 bg-transparent z-10">
        <BackgroundBoxes variant="grey" className="opacity-10" />
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex items-baseline justify-between mb-10">
            <span className="inline-flex items-center gap-3 label-ticker text-white/55">
              <span className="w-10 h-px bg-brand-green/60" />
              [ 07 ] // The full roll
            </span>
            <span className="font-mono text-[11px] tracking-[0.28em] text-white/40">
              {rest.length.toString().padStart(2, "0")} entries
            </span>
          </div>

          {/* Horizontal category filter hint */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <span
                key={cat}
                className={`font-mono text-[10px] uppercase tracking-[0.2em] border px-2.5 py-1 opacity-70 ${getCategoryColor(cat)}`}
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Masonry-style grid — alternates between sizes */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground/10">
            {rest.map((p, i) => {
              const isWide = i % 7 === 0 && i > 0;
              return (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className={`group bg-background flex flex-col ${isWide ? "sm:col-span-2 lg:col-span-2" : ""}`}
                >
                  <div className={`relative overflow-hidden ${isWide ? "aspect-[21/9]" : "aspect-[16/10]"}`}>
                    <img
                      src={p.image}
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04] grayscale-[20%] group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent" />
                    <span className={`absolute top-3.5 left-4 font-mono text-[10px] uppercase tracking-[0.24em] border px-2 py-0.5 bg-background/65 backdrop-blur ${getCategoryColor(p.category)}`}>
                      {p.category}
                    </span>
                    {/* Read time badge */}
                    <span className="absolute top-3.5 right-4 font-mono text-[9px] uppercase tracking-[0.18em] text-white/40 bg-background/60 backdrop-blur px-2 py-0.5">
                      {p.read}
                    </span>
                  </div>
                  <div className="p-5 lg:p-6 flex flex-col gap-2.5 flex-1">
                    <h3
                      className="font-display text-white text-lg lg:text-xl leading-[1.1] tracking-tight group-hover:text-brand-yellow transition-colors"
                      style={{ textWrap: "balance" }}
                    >
                      {p.title}
                    </h3>
                    <p className="font-editorial italic text-[14px] text-white/55 leading-snug line-clamp-2">
                      {p.dek}
                    </p>
                    <div className="mt-auto pt-3 border-t border-white/[0.06] flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
                      <span>{p.date}</span>
                      <span className="inline-flex items-center gap-1 text-brand-green/60 group-hover:text-brand-green group-hover:translate-x-0.5 transition-all">
                        Read <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <LiamCtaBand
        headline="An article sparked something? Let Liam AI take it further."
        subline="Turn inspiration into an itinerary. Liam asks the right questions first."
      />

      <PageCta
        eyebrow="// Next step"
        title="Ready to put a brief"
        emphasis="on the desk?"
        subtitle="A short form, then a real conversation. We'll come back with one quietly considered plan."
        primary={{ label: "Plan a trip with Isaac", href: "/contact" }}
        secondary={{ label: "About Isaac", href: "/about-isaac" }}
      />
    </PageShell>
  );
}
