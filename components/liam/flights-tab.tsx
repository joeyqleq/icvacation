"use client";
import { useState } from "react";
import { Plane, ArrowRight, Loader2 } from "lucide-react";

interface FlightResult {
  id: string; airline: string; from: string; to: string;
  departTime: string; arriveTime: string; duration: string;
  stops: number; price: string; cabin: string;
}

export function FlightsTab() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [results, setResults] = useState<FlightResult[]>([]);
  const [loading, setLoading] = useState(false);

  async function search() {
    if (!from || !to) return;
    setLoading(true);
    try {
      const r = await fetch(`/api/liam-search/flights?from=${from}&to=${to}&date=${date}`);
      const d = await r.json();
      setResults(d.flights ?? []);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="grid grid-cols-2 gap-2">
        <input
          className="bg-[#050505] border border-white/15 px-3 py-2 text-sm font-mono text-white/80 placeholder:text-white/30 focus:outline-none focus:border-[#26FC00]"
          placeholder="From (e.g. NYC)"
          value={from}
          onChange={e => setFrom(e.target.value.toUpperCase())}
          maxLength={3}
        />
        <input
          className="bg-[#050505] border border-white/15 px-3 py-2 text-sm font-mono text-white/80 placeholder:text-white/30 focus:outline-none focus:border-[#26FC00]"
          placeholder="To (e.g. CDG)"
          value={to}
          onChange={e => setTo(e.target.value.toUpperCase())}
          maxLength={3}
        />
      </div>
      <div className="flex gap-2">
        <input
          type="date"
          className="flex-1 bg-[#050505] border border-white/15 px-3 py-2 text-sm font-mono text-white/80 focus:outline-none focus:border-[#26FC00]"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        <button
          onClick={search}
          className="px-4 py-2 bg-[#26FC00] text-black font-mono text-xs tracking-[0.2em] uppercase hover:bg-[#FFE500] transition-colors flex items-center gap-2"
        >
          {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plane className="w-3.5 h-3.5" />}
          Search
        </button>
      </div>
      <div className="flex-1 overflow-y-auto space-y-2">
        {results.map(f => (
          <div key={f.id} className="border border-white/10 p-3 flex flex-col gap-1 hover:border-[#26FC00]/40 transition-colors">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] tracking-[0.2em] text-[#26FC00] uppercase">{f.airline}</span>
              <span className="font-display text-[#FFE500] text-sm">{f.price}</span>
            </div>
            <div className="flex items-center gap-2 text-white/80 font-mono text-xs">
              <span>{f.from} {f.departTime}</span>
              <ArrowRight className="w-3 h-3 text-white/30" />
              <span>{f.to} {f.arriveTime}</span>
            </div>
            <div className="flex items-center justify-between font-mono text-[10px] text-white/40">
              <span>{f.duration}</span>
              <span>{f.stops === 0 ? "Direct" : `${f.stops} stop${f.stops > 1 ? "s" : ""}`}</span>
              <span>{f.cabin}</span>
            </div>
          </div>
        ))}
        {results.length === 0 && !loading && (
          <p className="font-serif italic text-sm text-white/35 text-center pt-8">Enter origin, destination, and date to search flights</p>
        )}
      </div>
    </div>
  );
}
