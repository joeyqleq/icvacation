"use client";
import { useState } from "react";
import { Anchor } from "lucide-react";

const SHOWCASE_CRUISES = [
  { id: "c1", line: "Ponant", ship: "Le Commandant Charcot", region: "Arctic / Antarctic", duration: "14-21 days", price: "from $8,400/cabin", type: "Expedition", guests: 270 },
  { id: "c2", line: "Lindblad/Nat Geo", ship: "National Geographic Islander II", region: "Galápagos", duration: "7 days", price: "from $5,800/cabin", type: "Expedition", guests: 48 },
  { id: "c3", line: "Viking", ship: "Viking Freya", region: "Danube / Rhine", duration: "8-15 days", price: "from $2,400/cabin", type: "River", guests: 190 },
  { id: "c4", line: "Seabourn", ship: "Seabourn Venture", region: "Global Expedition", duration: "14-21 days", price: "from $9,200/cabin", type: "Luxury Expedition", guests: 264 },
  { id: "c5", line: "Regent Seven Seas", ship: "Seven Seas Grandeur", region: "Mediterranean", duration: "7-14 days", price: "from $4,900/cabin", type: "Ocean Luxury", guests: 746 },
  { id: "c6", line: "AmaWaterways", ship: "AmaMora", region: "Douro Valley, Portugal", duration: "7 days", price: "from $2,800/cabin", type: "River", guests: 158 },
];

const TYPES = ["All", "Expedition", "River", "Ocean Luxury", "Luxury Expedition"];

export function CruisesTab() {
  const [typeFilter, setTypeFilter] = useState("All");

  const filtered = typeFilter === "All"
    ? SHOWCASE_CRUISES
    : SHOWCASE_CRUISES.filter(c => c.type.includes(typeFilter));

  return (
    <div className="flex flex-col gap-3 h-full">
      <div className="flex gap-1 flex-wrap">
        {TYPES.map(t => (
          <button
            key={t}
            onClick={() => setTypeFilter(t)}
            className={`font-mono text-[9px] tracking-[0.15em] uppercase px-2.5 py-1 border transition-colors ${
              typeFilter === t
                ? "bg-[#26FC00] text-black border-[#26FC00]"
                : "border-white/20 text-white/50 hover:border-[#26FC00]/40"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto space-y-2">
        {filtered.map(c => (
          <div key={c.id} className="border border-white/10 p-3 hover:border-[#26FC00]/40 transition-colors">
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-[10px] tracking-[0.2em] text-[#26FC00] uppercase">{c.line}</span>
              <span className="font-mono text-[9px] text-white/30">{c.guests} guests max</span>
            </div>
            <p className="font-sans font-semibold text-white text-base">{c.ship}</p>
            <p className="font-serif italic text-sm text-white/50 mb-2">{c.region} · {c.duration}</p>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] tracking-[0.15em] text-[#FFE500]/70 border border-[#FFE500]/20 px-1.5 py-0.5">{c.type}</span>
              <span className="font-sans font-semibold text-[#FFE500] text-sm">{c.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
