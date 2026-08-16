import Link from "next/link";

const services = [
  { n: "01", title: "Cruises", copy: "Ocean, river and expedition cruises matched to the way you actually like to travel — ship, cabin, itinerary and timing considered together.", href: "/cruises" },
  { n: "02", title: "Hotels & resorts", copy: "Properties chosen for fit, not star count alone: location, service style, room category, atmosphere and the details that change a stay.", href: "/hotels-resorts" },
  { n: "03", title: "Flights & complete trips", copy: "Routing, cabin strategy, transfers and the pieces around the flight — assembled into one coherent trip rather than a pile of reservations.", href: "/flights-packages" },
];

export function CoreServicesSection() {
  return (
    <section className="border-y border-white/[.07] bg-[#070707] px-6 py-20 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-10 grid gap-5 lg:grid-cols-[1fr_1.1fr] lg:items-end">
          <div>
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[.24em] text-[#26FC00]">What IC Vacation does</p>
            <h2 className="max-w-2xl text-4xl font-semibold tracking-[-.035em] text-white sm:text-5xl lg:text-6xl">One advisor. Three things done properly.</h2>
          </div>
          <p className="max-w-xl font-serif text-base leading-relaxed text-white/55 lg:justify-self-end lg:text-lg">There is no online checkout. Start with Liam when you want to explore, or call Isaac when you are ready to talk. IC Vacation handles the planning around you.</p>
        </div>
        <div className="grid border border-white/10 md:grid-cols-3">
          {services.map((s, i) => (
            <Link key={s.title} href={s.href} className={`group p-7 transition-colors hover:bg-white/[.035] lg:p-9 ${i < 2 ? "border-b border-white/10 md:border-b-0 md:border-r" : ""}`}>
              <div className="mb-12 flex items-center justify-between font-mono text-[10px] uppercase tracking-[.18em] text-white/35"><span>{s.n}</span><span className="text-[#FFE500] transition-transform group-hover:translate-x-1">→</span></div>
              <h3 className="mb-3 text-2xl font-semibold text-white">{s.title}</h3>
              <p className="text-sm leading-relaxed text-white/52">{s.copy}</p>
            </Link>
          ))}
        </div>
        <div className="mt-7 flex flex-wrap gap-3">
          <span className="rounded-full border border-[#FFE500]/30 bg-[#FFE500]/[.06] px-5 py-2.5 font-mono text-[10px] uppercase tracking-[.16em] text-[#FFE500]">Ask Liam · bottom right</span>
          <a href="tel:+14078101670" className="rounded-full border border-white/15 px-5 py-2.5 font-mono text-[10px] uppercase tracking-[.16em] text-white/70 transition-colors hover:border-[#26FC00]/40 hover:text-[#26FC00]">Call Isaac · (407) 810-1670</a>
        </div>
      </div>
    </section>
  );
}
