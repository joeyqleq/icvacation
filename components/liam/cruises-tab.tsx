"use client";
import { useState } from "react";
import { Anchor, Users } from "lucide-react";

const SHOWCASE_CRUISES = [
  { id: "c1", line: "Ponant", ship: "Le Commandant Charcot", region: "Arctic / Antarctic", duration: "14-21 days", price: "from $8,400/cabin", type: "Expedition", guests: 270, months: "Nov–Mar" },
  { id: "c2", line: "Lindblad/Nat Geo", ship: "National Geographic Islander II", region: "Galápagos", duration: "7 days", price: "from $5,800/cabin", type: "Expedition", guests: 48, months: "Year-round" },
  { id: "c3", line: "Viking", ship: "Viking Freya", region: "Danube / Rhine", duration: "8-15 days", price: "from $2,400/cabin", type: "River", guests: 190, months: "Apr–Nov" },
  { id: "c4", line: "Seabourn", ship: "Seabourn Venture", region: "Global Expedition", duration: "14-21 days", price: "from $9,200/cabin", type: "Luxury Expedition", guests: 264, months: "Year-round" },
  { id: "c5", line: "Regent Seven Seas", ship: "Seven Seas Grandeur", region: "Mediterranean", duration: "7-14 days", price: "from $4,900/cabin", type: "Ocean Luxury", guests: 746, months: "Apr–Oct" },
  { id: "c6", line: "AmaWaterways", ship: "AmaMora", region: "Douro Valley, Portugal", duration: "7 days", price: "from $2,800/cabin", type: "River", guests: 158, months: "Mar–Nov" },
];

const TYPES = ["All", "Expedition", "River", "Ocean Luxury", "Luxury Expedition"];

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="block font-mono text-[9px] tracking-[0.2em] uppercase text-white/40 mb-1">
      {children}
    </span>
  );
}

export function CruisesTab() {
  const [typeFilter, setTypeFilter] = useState("All");

  const filtered = typeFilter === "All"
    ? SHOWCASE_CRUISES
    : SHOWCASE_CRUISES.filter(c => c.type.includes(typeFilter));

  return (
    <div className="flex flex-col gap-3 h-full">
      {/* Filter */}
      <div>
        <FieldLabel>Cruise type</FieldLabel>
        <select
          value={typeFilter}
          onChange={e => setTypeFilter(e.target.value)}
          className="w-full bg-[#0a0a0a] border border-white/15 px-3 py-2 text-sm font-mono text-white/80 focus:outline-none focus:border-[#26FC00] appearance-none cursor-pointer"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%2326FC00' opacity='0.5'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center" }}
        >
          {TYPES.map(t => <option key={t} value={t} className="bg-[#0a0a0a]">{t}</option>)}
        </select>
      </div>

      <p className="font-mono text-[9px] text-white/30 uppercase tracking-[0.2em]">
        {filtered.length} {filtered.length === 1 ? "cruise" : "cruises"} · IC Vacation selection
      </p>

      <div className="flex-1 overflow-y-auto space-y-2">
        {filtered.map(c => (
          <div key={c.id} className="border border-white/10 p-3 hover:border-[#26FC00]/40 transition-colors">
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-[10px] tracking-[0.2em] text-[#26FC00] uppercase">{c.line}</span>
              <span className="font-mono text-[9px] text-white/25 flex items-center gap-1">
                <Users className="w-2.5 h-2.5" />{c.guests} max
              </span>
            </div>
            <p className="font-sans font-semibold text-white text-[15px]">{c.ship}</p>
            <p className="font-serif italic text-sm text-white/50 mb-2">{c.region} · {c.duration}</p>
            <div className="flex items-center justify-between">
              <div className="flex gap-1.5 flex-wrap">
                <span className="font-mono text-[9px] tracking-[0.12em] text-[#FFE500]/70 border border-[#FFE500]/20 px-1.5 py-0.5">{c.type}</span>
                <span className="font-mono text-[9px] tracking-[0.12em] text-white/40 border border-white/10 px-1.5 py-0.5">{c.months}</span>
              </div>
              <span className="font-sans font-semibold text-[#FFE500] text-sm">{c.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
