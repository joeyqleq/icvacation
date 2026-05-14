import type { Metadata } from "next";
import { PageShell } from "@/components/site/page-shell";
import { PageHero } from "@/components/site/page-hero";
import { PageCta } from "@/components/site/page-cta";
import { BackgroundBoxes } from "@/components/site/background-boxes";
import { Mascot } from "@/components/site/mascot";

export const metadata: Metadata = {
  title: "Flights & Packages · IC Vacation",
  description:
    "Inquiry-first flight and package planning. No live booking engine — every trip is shaped personally by Isaac.",
};

const steps = [
  {
    idx: "01",
    title: "You tell us the shape of the trip",
    body: "Where, when, with whom, how you like to fly. A short form, then a real conversation.",
  },
  {
    idx: "02",
    title: "We come back with a built itinerary",
    body: "Flights, transfers, hotels, ground time. One quietly considered plan, sometimes a second to compare.",
  },
  {
    idx: "03",
    title: "You confirm. We hold it together.",
    body: "We hold seats, watch fares, handle changes. You travel without juggling tabs.",
  },
];

const packages = [
  { title: "Flight + Hotel", body: "Two-piece itinerary, one bill, one point of contact." },
  { title: "Flight + Cruise", body: "Pre-cruise hotel night, transfers, and the cabin-aware flight you actually want." },
  { title: "Multi-city + Lodge", body: "Long-form itineraries — Tanzania → Kenya → Mauritius is a typical request." },
  { title: "Group & milestone trips", body: "Anniversaries, reunions, family-of-twelve. Quietly choreographed." },
];

const honesty = [
  "We are not a booking engine.",
  "We do not promise the cheapest fare on the open web.",
  "We do promise the right flight for the trip — class, timing, layover, and seat.",
  "Every quote is built by Isaac, then reviewed with you.",
];

export default function FlightsPackagesPage() {
  return (
    <PageShell>
      <PageHero
        index="[ 02 ]"
        kicker="// Flights & Packages"
        title={[
          { type: "plain", text: "Inquiry-first," },
          { type: "emph",  text: "advisor-built,", color: "yellow" },
          { type: "plain", text: "no algorithm." },
        ]}
        subtitle="A quieter way to put a trip together. You tell us the shape of the journey — we come back with the flights, the stays, and the rhythm in one considered plan."
        image="/footer-horizon.jpg"
        imageAlt="Looking out over a clouded horizon from an aircraft cabin window"
        primaryCta={{ label: "Start an inquiry", href: "/contact" }}
        secondaryCta={{ label: "About Isaac", href: "/about-isaac" }}
      />

      {/* STEPS */}
      <section className="relative py-24 lg:py-32 bg-background overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="mb-16">
            <span className="inline-flex items-center gap-3 label-ticker text-white/55 mb-6">
              <span className="w-10 h-px bg-brand-green/60" />
              [ 03 ] // How it works
            </span>
            <h2
              className="font-display-tight text-white leading-[0.92] tracking-[-0.035em] max-w-[820px]"
              style={{ fontSize: "clamp(2.4rem, 6.4vw, 5.4rem)", textWrap: "balance" }}
            >
              Three steps,
              <br />
              <span className="font-serif italic text-brand-yellow">no booking funnel.</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-px bg-foreground/10">
            {steps.map((s) => (
              <div key={s.idx} className="bg-background p-8 lg:p-10 flex flex-col gap-5">
                <span className="font-mono text-[11px] text-brand-green tracking-[0.32em]">
                  {s.idx}
                </span>
                <h3 className="font-display text-white text-2xl lg:text-3xl leading-tight tracking-tight">
                  {s.title}
                </h3>
                <p className="font-editorial text-[15px] text-white/65 leading-[1.55]">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGE TYPES */}
      <section className="relative py-20 lg:py-24 bg-background border-t border-foreground/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-10 mb-14">
            <div className="lg:col-span-5">
              <span className="inline-flex items-center gap-3 label-ticker text-white/55 mb-6">
                <span className="w-10 h-px bg-brand-green/60" />
                [ 04 ] // Packages, simplified
              </span>
              <h2
                className="font-display-tight text-white leading-[0.95]"
                style={{ fontSize: "clamp(2rem, 4.4vw, 3.6rem)" }}
              >
                Four common
                <br />
                <span className="font-serif italic text-brand-yellow">shapes.</span>
              </h2>
            </div>
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-px bg-foreground/10 self-end">
              {packages.map((p) => (
                <div key={p.title} className="bg-background p-6 lg:p-7 flex flex-col gap-2.5">
                  <p className="font-display text-white text-xl tracking-tight">{p.title}</p>
                  <p className="font-editorial italic text-[14px] text-white/60 leading-snug">
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HONESTY */}
      <section className="relative py-20 bg-background border-t border-foreground/10">
        <BackgroundBoxes variant="grey" className="opacity-20" />
        <Mascot type="bird" variant="neon" size="lg" className="absolute right-4 -top-8 opacity-55 rotate-[-15deg] hidden lg:block" />
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-10 relative z-10">
          <div className="lg:col-span-4">
            <span className="inline-flex items-center gap-3 label-ticker text-white/55 mb-5">
              <span className="w-10 h-px bg-brand-green/60" />
              [ 05 ] // A small honesty
            </span>
            <h3
              className="font-display-tight text-white leading-[0.95]"
              style={{ fontSize: "clamp(1.8rem, 3.4vw, 2.6rem)" }}
            >
              What we
              <br />
              <span className="font-serif italic text-brand-yellow">do and don't do.</span>
            </h3>
          </div>
          <ul className="lg:col-span-8 flex flex-col gap-5">
            {honesty.map((line, i) => (
              <li
                key={i}
                className="font-editorial italic text-[18px] lg:text-[20px] text-white/82 leading-[1.5] border-l-2 border-brand-green/50 pl-5"
              >
                {line}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <PageCta
        eyebrow="// Next step"
        title="Send the shape of"
        emphasis="your next trip."
        subtitle="A short form, then a real conversation. We'll come back with one quietly built plan."
      />
    </PageShell>
  );
}
