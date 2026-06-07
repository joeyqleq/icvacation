import { ArrowUpRight } from "lucide-react";

export function FamilyLegacySection() {
  return (
    <section
      id="family-legacy"
      className="relative border-t border-foreground/10 bg-background py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_50%_at_10%_20%,rgba(253,249,114,0.08),transparent_70%)]" />
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-5">
            <span className="inline-flex items-center gap-3 label-ticker text-white/55 mb-6">
              <span className="w-10 h-px bg-brand-green/60" />
              [ 09 ] // Family continuity
            </span>
            <h2
              className="font-display-tight text-white leading-[0.92] tracking-[-0.035em] mb-6"
              style={{ fontSize: "clamp(2.2rem, 5.6vw, 5rem)", textWrap: "balance" }}
            >
              Built by Isaac.
              <br />
              <span className="font-serif italic text-brand-yellow">Carried forward with Annette.</span>
            </h2>
            <p className="font-editorial text-[18px] lg:text-[20px] leading-[1.58] text-white/75 max-w-xl">
              IC Vacation is intentionally personal. Annette appears quietly in
              the practice because the work is meant to become a family standard:
              careful listening, honest recommendations, and travel plans that
              still feel cared for after the ticket is issued.
            </p>
            <a
              href="/about-isaac"
              className="mt-8 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.22em] text-brand-green hover:text-brand-yellow transition-colors"
            >
              Read the practice story <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-px bg-white/10">
            {[
              {
                src: "/images/ai/isaac-office-advisor.png",
                alt: "Isaac at a travel advisor desk",
                label: "Isaac",
                copy: "The experienced advisor, still reading every serious brief personally.",
              },
              {
                src: "/images/ai/annette-car-specialist.png",
                alt: "Annette supporting an IC Vacation arrival experience",
                label: "Annette",
                copy: "The next generation of the practice, learning the work from the inside.",
              },
            ].map((item) => (
              <figure key={item.label} className="bg-[#0b0b0b]">
                <div className="aspect-[4/5] overflow-hidden">
                  <img src={item.src} alt={item.alt} className="h-full w-full object-cover" />
                </div>
                <figcaption className="p-5 sm:p-6">
                  <p className="font-display text-white text-2xl tracking-tight">{item.label}</p>
                  <p className="mt-2 font-editorial italic text-white/58 leading-snug">{item.copy}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
