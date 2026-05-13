import type { Metadata } from "next";
import { PageShell } from "@/components/site/page-shell";
import { PageHero } from "@/components/site/page-hero";
import { PageCta } from "@/components/site/page-cta";

export const metadata: Metadata = {
  title: "Destinations · IC Vacation",
  description:
    "A small, deliberately edited atlas. Mountains, coast, cities, safari, cruise, cultural — chosen for how a trip should feel.",
};

const styles = [
  { idx: "01", title: "Mountains",    note: "Dolomites, Engadin, Patagonia, Hokkaido" },
  { idx: "02", title: "Coast",        note: "Amalfi, Cape Cod, Nayarit, Mauritius" },
  { idx: "03", title: "Cities",       note: "Tokyo, Marrakech, Mexico City, Lisbon" },
  { idx: "04", title: "Safari",       note: "Mara, Serengeti, Okavango, South Luangwa" },
  { idx: "05", title: "Cruise",       note: "Mediterranean, Norwegian fjords, Galápagos" },
  { idx: "06", title: "Cultural",     note: "Kyoto, Oaxaca, Sicily, Petra" },
];

const featured = [
  {
    name: "Northern Italy",
    image: "/destination-alps.jpg",
    note: "Lake suites, mountain dinners, slow drives.",
    season: "Late spring · early autumn",
  },
  {
    name: "Japan, end-to-end",
    image: "/destination-japan.jpg",
    note: "Tokyo · Kyoto · Naoshima · a ryokan or three.",
    season: "Cherry blossom · autumn colour",
  },
  {
    name: "East Africa",
    image: "/destination-safari.jpg",
    note: "Camps that move with the migration.",
    season: "Migration · green season",
  },
  {
    name: "Mexico, properly",
    image: "/destination-coast.jpg",
    note: "Nayarit, Yucatán, CDMX. Not the chain resort.",
    season: "Dry season · shoulder weeks",
  },
];

const editorialNote = `We don't try to be a database. There are sites that do that. What we keep is a quietly edited shortlist — places we've been ourselves, properties we'd put a friend in, and weeks of the year we'd actually book.`;

export default function DestinationsPage() {
  return (
    <PageShell>
      <PageHero
        index="[ 02 ]"
        kicker="// Destinations"
        title={[
          { type: "plain", text: "A small atlas," },
          { type: "emph",  text: "personally walked.", color: "yellow" },
        ]}
        subtitle="Not the everywhere-list. The edited one — places we know intimately, and the weeks of the year worth flying for."
        image="/destination-japan.jpg"
        imageAlt="A misty forest with stone steps leading up into the hills"
        primaryCta={{ label: "Plan my trip", href: "/contact" }}
        secondaryCta={{ label: "About Isaac", href: "/about-isaac" }}
      />

      {/* STYLES */}
      <section className="relative py-24 lg:py-32 bg-background overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-10 items-end mb-16">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-3 label-ticker text-white/55 mb-6">
                <span className="w-10 h-px bg-brand-green/60" />
                [ 03 ] // Travel styles
              </span>
              <h2
                className="font-display-tight text-white leading-[0.92] tracking-[-0.035em]"
                style={{ fontSize: "clamp(2.4rem, 6.4vw, 5.4rem)", textWrap: "balance" }}
              >
                Six ways to
                <br />
                <span className="font-serif italic text-brand-yellow">leave the house.</span>
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pb-4">
              <p
                className="font-editorial text-[18px] lg:text-[19px] text-white/72 leading-[1.55]"
                style={{ textWrap: "pretty" }}
              >
                Most trips are a blend. We start by asking which one is the main
                thread, and which two we want to weave in.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground/10">
            {styles.map((s) => (
              <div key={s.idx} className="bg-background p-8 flex flex-col gap-4 hover-lift">
                <span className="font-mono text-[11px] text-brand-green tracking-[0.32em]">
                  {s.idx}
                </span>
                <h3 className="font-display text-white text-2xl lg:text-3xl leading-tight tracking-tight">
                  {s.title}
                </h3>
                <p className="font-editorial italic text-[15px] text-white/60 leading-snug">
                  {s.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED DESTINATIONS */}
      <section className="relative py-24 bg-background border-t border-foreground/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="mb-14">
            <span className="inline-flex items-center gap-3 label-ticker text-white/55 mb-6">
              <span className="w-10 h-px bg-brand-green/60" />
              [ 04 ] // Featured
            </span>
            <h2
              className="font-display-tight text-white leading-[0.92] max-w-[800px]"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)", textWrap: "balance" }}
            >
              Four destinations we send
              <br />
              <span className="font-serif italic text-brand-yellow">people back to.</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-px bg-foreground/10">
            {featured.map((d) => (
              <article key={d.name} className="bg-background overflow-hidden group">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={d.image}
                    alt=""
                    aria-hidden="true"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                </div>
                <div className="p-7 lg:p-9 flex flex-col gap-3">
                  <span className="label-ticker-sm text-brand-green">
                    {d.season}
                  </span>
                  <h3
                    className="font-display text-white text-3xl lg:text-4xl leading-tight tracking-tight"
                  >
                    {d.name}
                  </h3>
                  <p className="font-editorial italic text-[16px] text-white/65 leading-snug">
                    {d.note}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE CHOOSE — editorial note */}
      <section className="relative py-24 bg-background border-t border-foreground/10">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-12">
          <span className="inline-flex items-center gap-3 label-ticker text-white/55 mb-8">
            <span className="w-10 h-px bg-brand-green/60" />
            [ 05 ] // How we choose
          </span>
          <p
            className="font-editorial text-[22px] lg:text-[28px] text-white/82 leading-[1.5] drop-cap"
            style={{ textWrap: "pretty", fontVariationSettings: "'opsz' 28" }}
          >
            {editorialNote}
          </p>
        </div>
      </section>

      <PageCta
        eyebrow="// Next step"
        title="Tell us where you want"
        emphasis="to wake up."
        subtitle="We'll come back with one or two destinations we'd genuinely recommend — and the weeks of the year worth booking."
      />
    </PageShell>
  );
}
