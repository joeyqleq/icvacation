"use client";
import { useState } from "react";
import { Star, Search, Loader2 } from "lucide-react";

interface HotelResult {
  id: string;
  name: string;
  location: string;
  stars: number;
  price: string;
  tags: string[];
}

const CURATED: HotelResult[] = [
  { id: "h1", name: "Amangiri", location: "Canyon Point, Utah", stars: 5, price: "from $3,200/night", tags: ["Desert", "Luxury", "Spa"] },
  { id: "h2", name: "Singita Grumeti", location: "Serengeti, Tanzania", stars: 5, price: "from $2,800/night", tags: ["Safari", "Wildlife", "Remote"] },
  { id: "h3", name: "Six Senses Zil Pasyon", location: "Félicité Island, Seychelles", stars: 5, price: "from $2,200/night", tags: ["Beach", "Eco", "Island"] },
  { id: "h4", name: "Capella Ubud", location: "Ubud, Bali", stars: 5, price: "from $950/night", tags: ["Jungle", "Romantic", "Spa"] },
  { id: "h5", name: "Rosewood Le Guanahani", location: "Saint Barthélemy", stars: 5, price: "from $1,400/night", tags: ["Caribbean", "Beach", "Private"] },
  { id: "h6", name: "Amanfayun", location: "Hangzhou, China", stars: 5, price: "from $1,100/night", tags: ["Culture", "Tea", "Serene"] },
];

const GUEST_OPTIONS = ["1 guest", "2 guests", "3 guests", "4 guests", "5 guests", "6 guests"];

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="block font-mono text-[9px] tracking-[0.2em] uppercase text-white/40 mb-1">
      {children}
    </span>
  );
}

export function HotelsTab() {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2 guests");
  const [results, setResults] = useState<HotelResult[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [isLive, setIsLive] = useState(false);

  async function search() {
    if (!destination) return;
    setLoading(true);
    try {
      const params = new URLSearchParams({ destination });
      if (checkIn) params.set("checkIn", checkIn);
      if (checkOut) params.set("checkOut", checkOut);
      const guestCount = guests.split(" ")[0];
      if (guestCount) params.set("guests", guestCount);
      const r = await fetch(`/api/liam-search/hotels?${params.toString()}`);
      const d = await r.json();
      setResults(d.hotels ?? CURATED);
      setIsLive(d.live ?? false);
    } finally {
      setLoading(false);
    }
  }

  const displayed = results ?? CURATED;
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="flex flex-col gap-3 h-full">
      {/* Destination */}
      <div>
        <FieldLabel>Destination or hotel name</FieldLabel>
        <input
          className="w-full bg-[#0a0a0a] border border-white/15 px-3 py-2 text-sm font-mono text-white/80 placeholder:text-white/25 focus:outline-none focus:border-[#26FC00]"
          placeholder="e.g. Bali, Paris, Maldives..."
          value={destination}
          onChange={e => setDestination(e.target.value)}
          onKeyDown={e => e.key === "Enter" && search()}
        />
      </div>

      {/* Check-in / Check-out */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <FieldLabel>Check-in</FieldLabel>
          <input
            type="date"
            className="w-full bg-[#0a0a0a] border border-white/15 px-3 py-2 text-xs font-mono text-white/80 focus:outline-none focus:border-[#26FC00] [color-scheme:dark]"
            value={checkIn}
            min={today}
            onChange={e => {
              setCheckIn(e.target.value);
              if (checkOut && e.target.value >= checkOut) setCheckOut("");
            }}
          />
        </div>
        <div>
          <FieldLabel>Check-out</FieldLabel>
          <input
            type="date"
            className="w-full bg-[#0a0a0a] border border-white/15 px-3 py-2 text-xs font-mono text-white/80 focus:outline-none focus:border-[#26FC00] [color-scheme:dark]"
            value={checkOut}
            min={checkIn || today}
            onChange={e => setCheckOut(e.target.value)}
          />
        </div>
      </div>

      {/* Guests + Search */}
      <div className="flex gap-2 items-end">
        <div className="flex-1">
          <FieldLabel>Guests</FieldLabel>
          <select
            value={guests}
            onChange={e => setGuests(e.target.value)}
            className="w-full bg-[#0a0a0a] border border-white/15 px-3 py-2 text-sm font-mono text-white/80 focus:outline-none focus:border-[#26FC00] appearance-none cursor-pointer"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%2326FC00' opacity='0.5'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center" }}
          >
            {GUEST_OPTIONS.map(o => <option key={o} value={o} className="bg-[#0a0a0a]">{o}</option>)}
          </select>
        </div>
        <button
          onClick={search}
          disabled={!destination || loading}
          className="px-4 py-2 bg-[#26FC00] text-black font-mono text-xs tracking-[0.2em] uppercase hover:bg-[#FFE500] transition-colors flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
        >
          {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
          Search
        </button>
      </div>

      {/* Status line */}
      <p className="font-mono text-[9px] text-white/30 uppercase tracking-[0.2em]">
        {results
          ? isLive
            ? `Live results · ${results.length} properties`
            : "IC Vacation curated selection"
          : "IC Vacation curated selection"}
      </p>

      {/* Results */}
      <div className="flex-1 overflow-y-auto space-y-2">
        {displayed.map(h => (
          <div key={h.id} className="border border-white/10 p-3 hover:border-[#26FC00]/40 transition-colors">
            <div className="flex items-start justify-between mb-1">
              <span className="font-sans font-semibold text-white text-[15px] leading-tight">{h.name}</span>
              <div className="flex gap-0.5 mt-0.5 flex-shrink-0 ml-2">
                {Array.from({ length: Math.min(h.stars, 5) }).map((_, i) => (
                  <Star key={i} className="w-2.5 h-2.5 fill-[#FFE500] text-[#FFE500]" />
                ))}
              </div>
            </div>
            <p className="font-mono text-[10px] text-white/40 mb-2">{h.location}</p>
            <div className="flex items-center justify-between">
              <div className="flex gap-1 flex-wrap">
                {h.tags.filter(Boolean).map(t => (
                  <span key={t} className="font-mono text-[9px] tracking-[0.12em] text-[#26FC00]/70 border border-[#26FC00]/20 px-1.5 py-0.5">
                    {t}
                  </span>
                ))}
              </div>
              <span className="font-mono text-[10px] text-[#FFE500] whitespace-nowrap ml-2">{h.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
