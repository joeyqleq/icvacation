import type { Metadata } from "next";
import { PageShell } from "@/components/site/page-shell";
import { PageHero } from "@/components/site/page-hero";
import { PageCta } from "@/components/site/page-cta";

export const metadata: Metadata = {
  title: "About Isaac · IC Vacation",
  description:
    "Isaac is an independent travel advisor with two decades of close, quiet work. Read about the practice, the people, and the trust signals.",
};

const beats = [
  {
    year: "1999",
    title: "Started in the back room of a small agency",
    body: "Booking flights for a senior advisor, taking notes in red pen, learning the trade from someone who never raised her voice.",
  },
  {
    year: "2006",
    title: "Began travelling, properly",
    body: "First a year in East Africa, then six months drifting across Japan. The notebooks from that period are still on the desk.",
  },
  {
    year: "2012",
    title: "Quietly began taking clients",
    body: "Friends of friends. A short list. The work was always meant to stay small.",
  },
  {
    year: "2026",
    title: "IC Vacation, in its current form",
    body: "Same practice, same small list, with a quietly built AI consultant taking pre-briefs ahead of the conversation with Isaac.",
  },
];

const stats = [
  { value: "26", label: "Years in travel" },
  { value: "47", label: "Countries planned, walked" },
  { value: "1100+", label: "Trips quietly delivered" },
  { value: "24h", label: "Response window, always" },
];

const trust = [
  { name: "Virtuoso", note: "Member advisor · 2014–present" },
  { name: "ASTA",     note: "American Society of Travel Advisors" },
  { name: "IATAN",    note: "Accredited travel professional" },
  { name: "Signature", note: "Travel Network preferred partner" },
];

const principles = [
  "We do not take a brief we cannot personally see through.",
  "We do not promise what the airline, ship, or property has not promised us.",
  "We do not run a booking engine. Every trip is built by Isaac.",
  "We do not write copy we would not say in person.",
];

export default function AboutIsaacPage() {
  return (
    <PageShell>
      <PageHero
        index="[ 04 ]"
        kicker="// About Isaac"
        title={[
          { type: "plain", text: "Twenty-six years," },
          { type: "emph",  text: "quietly,", color: "yellow" },
          { type: "plain", text: "on the road." },
        ]}
        subtitle="Isaac is an independent travel advisor who works from a small desk, with a small list, and a fairly old notebook."
        image="/advisor-desk.jpg"
        imageAlt="Travel advisor's desk in soft afternoon light"
        primaryCta={{ label: "Plan a trip with Isaac", href: "/contact" }}
        secondaryCta={{ label: "Field notes", href: "/blog" }}
      />

      {/* INTRO ESSAY */}
      <section className="relative py-24 lg:py-32 bg-background overflow-hidden">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-12">
            <span className="inline-flex items-start gap-3 label-ticker text-white/55 lg:pt-2">
              <span className="w-10 h-px bg-brand-green/60 mt-2.5" />
              [ 05 ] // The practice
            </span>
            <div className="flex flex-col gap-8">
              <p
                className="font-editorial text-[22px] lg:text-[26px] text-white/85 leading-[1.5] drop-cap"
                style={{ textWrap: "pretty", fontVariationSettings: "'opsz' 26" }}
              >
                Most of what I do happens before anyone packs a bag. I sit with
                people, listen to how they speak about travel, and try to
                imagine the trip they would actually love — not the one the
                internet keeps suggesting to them.
              </p>
              <p
                className="font-editorial text-[18px] lg:text-[19px] text-white/75 leading-[1.6]"
                style={{ textWrap: "pretty" }}
              >
                The list stays deliberately small. I take a few clients each
                quarter, and I keep most of them for years. The practice is
                advisory: I do not sell, I do not push, and I do not work to a
                template. If a brief is not right for me, I will tell you, and
                usually I will recommend the person who is.
              </p>
              <p
                className="font-editorial italic text-[18px] lg:text-[20px] text-white/72 leading-[1.55]"
                style={{ textWrap: "pretty" }}
              >
                — Isaac
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="relative py-20 lg:py-24 bg-background border-t border-foreground/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="mb-14">
            <span className="inline-flex items-center gap-3 label-ticker text-white/55 mb-6">
              <span className="w-10 h-px bg-brand-green/60" />
              [ 06 ] // A quiet timeline
            </span>
            <h2
              className="font-display-tight text-white leading-[0.92] max-w-[760px] tracking-[-0.03em]"
              style={{ fontSize: "clamp(2rem, 5vw, 4.4rem)", textWrap: "balance" }}
            >
              Four moments,
              <br />
              <span className="font-serif italic text-brand-yellow">no résumé.</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-4 gap-px bg-foreground/10">
            {beats.map((b) => (
              <div key={b.year} className="bg-background p-8 lg:p-10 flex flex-col gap-4">
                <span className="font-mono text-brand-green text-sm tracking-[0.22em]">
                  {b.year}
                </span>
                <h3 className="font-display text-white text-xl lg:text-2xl leading-tight tracking-tight">
                  {b.title}
                </h3>
                <p className="font-editorial italic text-[15px] text-white/60 leading-snug">
                  {b.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative py-20 bg-background border-t border-foreground/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-foreground/10">
            {stats.map((s) => (
              <div key={s.label} className="bg-background p-8 lg:p-10 flex flex-col gap-3">
                <span
                  className="font-display-tight text-brand-yellow leading-none tracking-[-0.04em]"
                  style={{ fontSize: "clamp(2.6rem, 5vw, 4.4rem)" }}
                >
                  {s.value}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-white/55">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="relative py-20 bg-background border-t border-foreground/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <span className="inline-flex items-center gap-3 label-ticker text-white/55 mb-5">
                <span className="w-10 h-px bg-brand-green/60" />
                [ 07 ] // Quiet credentials
              </span>
              <h3
                className="font-display-tight text-white leading-[0.95]"
                style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.8rem)" }}
              >
                Memberships
                <br />
                <span className="font-serif italic text-brand-yellow">that matter.</span>
              </h3>
            </div>
            <div className="lg:col-span-8 grid sm:grid-cols-2 gap-px bg-foreground/10 self-start">
              {trust.map((t) => (
                <div key={t.name} className="bg-background p-6 flex flex-col gap-1.5">
                  <p className="font-display text-white text-lg tracking-tight">{t.name}</p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/45">
                    {t.note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="relative py-24 bg-background border-t border-foreground/10">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-12">
          <span className="inline-flex items-center gap-3 label-ticker text-white/55 mb-8">
            <span className="w-10 h-px bg-brand-green/60" />
            [ 08 ] // Four small principles
          </span>
          <ul className="flex flex-col gap-5">
            {principles.map((p, i) => (
              <li
                key={i}
                className="font-editorial italic text-[20px] lg:text-[26px] text-white/82 leading-[1.45] border-l-2 border-brand-green/50 pl-6"
                style={{ textWrap: "pretty" }}
              >
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <PageCta
        eyebrow="// Next step"
        title="Ready to put a brief"
        emphasis="on the desk?"
        subtitle="A short form, then a real conversation. We'll come back with one quietly considered plan."
      />
    </PageShell>
  );
}
