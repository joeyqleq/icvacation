import type { Metadata } from "next";
import { PageShell } from "@/components/site/page-shell";
import { PageHero } from "@/components/site/page-hero";
import { PageCta } from "@/components/site/page-cta";
import { BackgroundBoxes } from "@/components/site/background-boxes";
import { Mascot } from "@/components/site/mascot";
import { Ship, Anchor, Compass, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Cruises · IC Vacation",
  description:
    "Advisor-led cruise planning. The right ship, the right cabin, the right itinerary — shaped around how you actually like to travel.",
};

const process = [
  {
    idx: "01",
    title: "Listen",
    body: "We start with a conversation, not a brochure. Pace, company, what you avoid, what you remember from past trips.",
  },
  {
    idx: "02",
    title: "Match",
    body: "Then a small shortlist of ships and itineraries that genuinely fit. We tell you why each one, and what each is not.",
  },
  {
    idx: "03",
    title: "Curate",
    body: "Cabin location, table seating, shore picks, transfers, hotel nights either side. The full arc, not just the booking.",
  },
  {
    idx: "04",
    title: "Onboard",
    body: "Isaac stays reachable while you sail. Reroutes, upgrades, last-minute extras — quietly handled.",
  },
];

const lines = [
  { name: "Silversea",       note: "Quiet, all-inclusive, smaller suites." },
  { name: "Viking Ocean",    note: "Adults only. Long port days." },
  { name: "Explora Journeys", note: "Newer fleet, slow-pace itineraries." },
  { name: "Seabourn",         note: "Intimate, expedition-capable." },
  { name: "Regent Seven Seas", note: "All-inclusive luxury, larger suites." },
  { name: "Ponant",            note: "French elegance, expedition vessels." },
];

const styles = [
  { icon: Ship,     label: "Ocean cruising"      },
  { icon: Anchor,   label: "River journeys"      },
  { icon: Compass,  label: "Expedition voyages"  },
  { icon: Sparkles, label: "Luxury & residency"  },
];

export default function CruisesPage() {
  return (
    <PageShell>
      <PageHero
        index="[ 02 ]"
        kicker="// Cruises"
        title={[
          { type: "plain", text: "The right ship," },
          { type: "emph",  text: "for the right people.", color: "yellow" },
        ]}
        subtitle="Cruising is the most over-sold and over-generalised category in travel. We start somewhere quieter — with who you are, how you move, and what you want to feel when the ship leaves port."
        image="/images/ai/isaac-cruise-helm.png"
        imageAlt="Isaac at the helm of a ship, representing cruise planning"
        primaryCta={{ label: "Plan my trip", href: "/contact" }}
        secondaryCta={{ label: "Talk to Isaac", href: "/about-isaac" }}
      />

      {/* PROCESS — 4-step advisor flow */}
      <section className="relative py-24 lg:py-32 bg-background overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-10 items-end mb-16 lg:mb-20">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-3 label-ticker text-white/55 mb-6">
                <span className="w-10 h-px bg-brand-green/60" />
                [ 03 ] // How we shape a cruise
              </span>
              <h2
                className="font-display-tight text-white leading-[0.92] tracking-[-0.035em]"
                style={{ fontSize: "clamp(2.4rem, 6.4vw, 5.4rem)", textWrap: "balance" }}
              >
                Four conversations,
                <br />
                <span className="font-serif italic text-brand-yellow">one trip.</span>
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pb-4">
              <p
                className="font-editorial text-[18px] lg:text-[19px] text-white/72 leading-[1.55]"
                style={{ textWrap: "pretty" }}
              >
                We do not sell cabins. We shape a trip with you over a few
                considered conversations, and only then do we recommend a sailing.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-foreground/10">
            {process.map((step) => (
              <div
                key={step.idx}
                className="bg-background p-8 lg:p-10 flex flex-col gap-6 hover-lift"
              >
                <span className="font-mono text-[11px] text-brand-green tracking-[0.32em]">
                  {step.idx}
                </span>
                <h3
                  className="font-display text-white text-2xl lg:text-3xl leading-[1.05] tracking-tight"
                >
                  {step.title}
                </h3>
                <p className="font-editorial text-[15px] text-white/65 leading-[1.55]">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CRUISE LINES */}
      <section className="relative py-24 lg:py-32 bg-background overflow-hidden border-t border-foreground/10">
        <BackgroundBoxes variant="green" className="opacity-30" />
        <Mascot type="penguin" variant="neon" size="lg" className="absolute -right-6 bottom-12 opacity-60 hidden lg:block" />
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 mb-14">
            <div className="lg:col-span-5">
              <span className="inline-flex items-center gap-3 label-ticker text-white/55 mb-6">
                <span className="w-10 h-px bg-brand-green/60" />
                [ 04 ] // Lines we know intimately
              </span>
              <h2
                className="font-display-tight text-white leading-[0.92] tracking-[-0.035em]"
                style={{ fontSize: "clamp(2.2rem, 5.6vw, 4.6rem)", textWrap: "balance" }}
              >
                We have sailed
                <br />
                <span className="font-serif italic text-brand-yellow">each of these,</span>
                <br />
                ourselves.
              </h2>
            </div>
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-px bg-foreground/10 self-end">
              {lines.map((line) => (
                <div key={line.name} className="bg-background p-6 lg:p-7 flex flex-col gap-2">
                  <p className="font-display text-white text-xl tracking-tight">{line.name}</p>
                  <p className="font-editorial italic text-[14px] text-white/55 leading-snug">
                    {line.note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STYLES STRIP */}
      <section className="relative py-20 bg-background border-t border-foreground/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <span className="label-ticker text-white/55">
              <span className="w-10 h-px bg-brand-green/60 inline-block align-middle mr-3" />
              [ 05 ] // Styles we plan
            </span>
            <div className="flex flex-wrap gap-3">
              {styles.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2.5 px-4 py-2.5 border border-foreground/15 text-sm text-white/85 hover:border-brand-green hover:text-brand-green transition-colors"
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PageCta
        eyebrow="// Next step"
        title="Let's shape your"
        emphasis="next sailing."
        subtitle="Tell us how this trip should feel. We'll come back with a short, considered shortlist — never a brochure."
      />
    </PageShell>
  );
}
