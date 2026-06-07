import type { Metadata } from "next";
import { PageShell } from "@/components/site/page-shell";
import { PageHero } from "@/components/site/page-hero";
import { PageCta } from "@/components/site/page-cta";
import { BackgroundBoxes } from "@/components/site/background-boxes";
import { Mascot } from "@/components/site/mascot";

export const metadata: Metadata = {
  title: "Hotels & Resorts · IC Vacation",
  description:
    "Hand-picked hotels and resorts. Mexico, romance, family, and quiet luxury — chosen to fit the mood of the trip, not a star rating.",
};

const moods = [
  {
    idx: "01",
    title: "Mexico, slowly",
    body: "Riviera Nayarit hideaways, Yucatán cenote houses, an adults-only stretch of the Pacific. We know which beaches lose the crowds by sunset.",
    image: "/destination-coast.jpg",
  },
  {
    idx: "02",
    title: "Romance",
    body: "Honeymoons that don't feel pre-packaged. Italian lake suites, Greek villas with their own cove, a Maldivian water villa with no neighbours in sight.",
    image: "/destination-alps.jpg",
  },
  {
    idx: "03",
    title: "Family, properly",
    body: "Resorts where kids are genuinely cared for and parents can actually read a book. Connecting suites, quiet pools, age-fit excursions.",
    image: "/destination-japan.jpg",
  },
  {
    idx: "04",
    title: "Quiet luxury",
    body: "Aman, Six Senses, the smaller Cap Juluca-style holdouts. Service that disappears, design that doesn't shout.",
    image: "/destination-safari.jpg",
  },
];

const moodFit = [
  { tag: "Adults only",      note: "Resort policy & adult-only floors" },
  { tag: "Connecting rooms", note: "Family suite configurations" },
  { tag: "Private pool",     note: "Pool villa availability + size" },
  { tag: "All-inclusive",    note: "Genuine inclusivity, not upselling" },
  { tag: "Beachfront",       note: "True beach access, not lawn-fronted" },
  { tag: "Spa-led",          note: "Programmes & therapists we know" },
];

const properties = [
  "Las Ventanas al Paraíso, Los Cabos",
  "Hôtel du Cap-Eden-Roc, Antibes",
  "Aman Venice",
  "Soneva Fushi, Maldives",
  "Belmond Hotel Caruso, Ravello",
  "The Brando, French Polynesia",
  "Singita Sasakwa, Serengeti",
  "Castiglion del Bosco, Tuscany",
];

export default function HotelsResortsPage() {
  return (
    <PageShell>
      <PageHero
        index="[ 02 ]"
        kicker="// Hotels & Resorts"
        title={[
          { type: "plain", text: "Stays chosen" },
          { type: "emph",  text: "for the mood,", color: "yellow" },
          { type: "plain", text: "not the star rating." },
        ]}
        subtitle="A small, deliberately edited list of hotels and resorts we genuinely know — and the rooms inside them worth asking for."
        image="/images/ai/isaac-hotel-bellboy.png"
        imageAlt="Isaac in a hotel hospitality setting, representing resort planning"
        primaryCta={{ label: "Plan my trip", href: "/contact" }}
        secondaryCta={{ label: "See destinations", href: "/destinations" }}
      />

      {/* MOODS — 4 editorial cards */}
      <section className="relative py-24 lg:py-32 bg-background overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-10 items-end mb-16">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-3 label-ticker text-white/55 mb-6">
                <span className="w-10 h-px bg-brand-green/60" />
                [ 03 ] // How we sort stays
              </span>
              <h2
                className="font-display-tight text-white leading-[0.92] tracking-[-0.035em]"
                style={{ fontSize: "clamp(2.4rem, 6.4vw, 5.4rem)", textWrap: "balance" }}
              >
                Not categories.
                <br />
                <span className="font-serif italic text-brand-yellow">Moods.</span>
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pb-4">
              <p
                className="font-editorial text-[18px] lg:text-[19px] text-white/72 leading-[1.55]"
                style={{ textWrap: "pretty" }}
              >
                We pick the property for how the trip should feel, then choose
                the suite, the floor, the table, and the timing.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-px bg-foreground/10">
            {moods.map((mood) => (
              <div key={mood.idx} className="relative bg-background overflow-hidden group">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={mood.image}
                    alt=""
                    aria-hidden="true"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale-[20%]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                  <span className="absolute top-5 left-5 font-mono text-[11px] text-brand-green tracking-[0.32em]">
                    {mood.idx}
                  </span>
                </div>
                <div className="p-7 lg:p-9 flex flex-col gap-4">
                  <h3
                    className="font-display text-white text-2xl lg:text-3xl leading-tight tracking-tight"
                  >
                    {mood.title}
                  </h3>
                  <p className="font-editorial text-[15px] text-white/65 leading-[1.55]">
                    {mood.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MOOD-FIT FACETS */}
      <section className="relative py-20 bg-background border-t border-foreground/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <span className="inline-flex items-center gap-3 label-ticker text-white/55 mb-5">
                <span className="w-10 h-px bg-brand-green/60" />
                [ 04 ] // Mood-fit details
              </span>
              <h3
                className="font-display-tight text-white leading-[0.95]"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
              >
                The small things,
                <br />
                <span className="font-serif italic text-brand-yellow">on record.</span>
              </h3>
            </div>
            <div className="lg:col-span-8 grid sm:grid-cols-2 gap-px bg-foreground/10 self-start">
              {moodFit.map((f) => (
                <div key={f.tag} className="bg-background p-5 flex flex-col gap-1">
                  <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-brand-green">
                    {f.tag}
                  </span>
                  <span className="font-editorial italic text-[14px] text-white/65">
                    {f.note}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROPERTIES — quiet name list */}
      <section className="relative py-24 bg-background border-t border-foreground/10">
        <BackgroundBoxes variant="yellow" className="opacity-25" />
        <Mascot type="owl" variant="glow" size="md" className="absolute left-8 top-20 opacity-50 hidden lg:block" />
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
          <span className="inline-flex items-center gap-3 label-ticker text-white/55 mb-8">
            <span className="w-10 h-px bg-brand-green/60" />
            [ 05 ] // Properties Isaac knows by name
          </span>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-y-4 gap-x-10">
            {properties.map((p) => (
              <p
                key={p}
                className="font-editorial italic text-[17px] text-white/82 border-l border-brand-green/40 pl-4 leading-snug"
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      <PageCta
        eyebrow="// Next step"
        title="Tell us how this trip"
        emphasis="should feel."
        subtitle="We'll come back with a tight shortlist of properties — the right room, the right floor, and what we'd genuinely book ourselves."
      />
    </PageShell>
  );
}
