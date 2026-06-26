"use client";
import { useState } from "react";
import { Star } from "lucide-react";

const SHOWCASE_HOTELS = [
  { id: "h1", name: "Amangiri", location: "Canyon Point, Utah", stars: 5, nights: "from $3,200/night", tags: ["Desert", "Luxury", "Spa"] },
  { id: "h2", name: "Singita Grumeti", location: "Serengeti, Tanzania", stars: 5, nights: "from $2,800/night", tags: ["Safari", "Wildlife", "Remote"] },
  { id: "h3", name: "Six Senses Zil Pasyon", location: "Félicité Island, Seychelles", stars: 5, nights: "from $2,200/night", tags: ["Beach", "Eco", "Island"] },
  { id: "h4", name: "Capella Ubud", location: "Ubud, Bali", stars: 5, nights: "from $950/night", tags: ["Jungle", "Romantic", "Spa"] },
  { id: "h5", name: "Rosewood Le Guanahani", location: "Saint Barthélemy", stars: 5, nights: "from $1,400/night", tags: ["Caribbean", "Beach", "Private"] },
  { id: "h6", name: "Amanfayun", location: "Hangzhou, China", stars: 5, nights: "from $1,100/night", tags: ["Culture", "Tea", "Serene"] },
];

export function HotelsTab() {
  const [filter, setFilter] = useState("");

  const filtered = SHOWCASE_HOTELS.filter(h =>
    h.name.toLowerCase().includes(filter.toLowerCase()) ||
    h.location.toLowerCase().includes(filter.toLowerCase()) ||
    h.tags.some(t => t.toLowerCase().includes(filter.toLowerCase()))
  );

  return (
    <div className="flex flex-col gap-3 h-full">
      <input
        className="bg-[#050505] border border-white/15 px-3 py-2 text-sm font-mono text-white/80 placeholder:text-white/30 focus:outline-none focus:border-[#26FC00]"
        placeholder="Filter by name, location, or style..."
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />
      <p className="font-mono text-[9px] text-white/30 uppercase tracking-[0.2em]">IC Vacation Curated Properties</p>
      <div className="flex-1 overflow-y-auto space-y-2">
        {filtered.map(h => (
          <div key={h.id} className="border border-white/10 p-3 hover:border-[#26FC00]/40 transition-colors">
            <div className="flex items-start justify-between mb-1">
              <span className="font-sans font-semibold text-white text-base leading-tight">{h.name}</span>
              <div className="flex gap-0.5 mt-0.5">
                {Array.from({ length: h.stars }).map((_, i) => (
                  <Star key={i} className="w-2.5 h-2.5 fill-[#FFE500] text-[#FFE500]" />
                ))}
              </div>
            </div>
            <p className="font-mono text-[10px] text-white/40 mb-2">{h.location}</p>
            <div className="flex items-center justify-between">
              <div className="flex gap-1 flex-wrap">
                {h.tags.map(t => (
                  <span key={t} className="font-mono text-[9px] tracking-[0.15em] text-[#26FC00]/70 border border-[#26FC00]/20 px-1.5 py-0.5">{t}</span>
                ))}
              </div>
              <span className="font-mono text-[10px] text-[#FFE500] whitespace-nowrap ml-2">{h.nights}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
