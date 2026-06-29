"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { Plane, ArrowRight, ArrowLeftRight, Loader2 } from "lucide-react";

interface FlightResult {
  id: string; airline: string; from: string; to: string;
  departTime: string; arriveTime: string; duration: string;
  stops: number; price: string; cabin: string;
}

interface AirportOption { code: string; label: string; city: string; country: string; }

const CABIN_OPTIONS = ["Economy", "Premium Economy", "Business", "First"];
const PAX_OPTIONS = ["1 passenger", "2 passengers", "3 passengers", "4 passengers", "5 passengers", "6 passengers"];

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="block font-mono text-[9px] tracking-[0.2em] uppercase text-white/40 mb-1">
      {children}
    </span>
  );
}

function SelectField({ label, value, onChange, options }: {
  label: string; value: string; onChange: (v: string) => void; options: string[];
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full bg-[#0a0a0a] border border-white/15 px-3 py-2 text-sm font-mono text-white/80 focus:outline-none focus:border-[#26FC00] appearance-none cursor-pointer"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%2326FC00' opacity='0.5'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center" }}
      >
        {options.map(o => <option key={o} value={o} className="bg-[#0a0a0a]">{o}</option>)}
      </select>
    </div>
  );
}

function AirportField({ label, value, onChange, placeholder }: {
  label: string; value: string; onChange: (code: string) => void; placeholder?: string;
}) {
  const [query, setQuery] = useState(value);
  const [suggestions, setSuggestions] = useState<AirportOption[]>([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setQuery(value); }, [value]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const fetch_ = useCallback((q: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      if (!q || q.length < 1) { setSuggestions([]); return; }
      try {
        const r = await fetch(`/api/liam-search/airports?q=${encodeURIComponent(q.toUpperCase())}`);
        const d = await r.json();
        setSuggestions(d.airports ?? []);
        setOpen((d.airports ?? []).length > 0);
      } catch { setSuggestions([]); }
    }, 150);
  }, []);

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value.toUpperCase().slice(0, 20);
    setQuery(v);
    setSelected(false);
    fetch_(v);
  }

  function pick(a: AirportOption) {
    setQuery(a.code);
    onChange(a.code);
    setSelected(true);
    setSuggestions([]);
    setOpen(false);
  }

  function handleBlur() {
    setTimeout(() => {
      setOpen(false);
      // If the typed value is exactly a 3-letter code, accept it
      if (query.length === 3 && !selected) onChange(query);
    }, 150);
  }

  return (
    <div ref={wrapRef} className="relative">
      <FieldLabel>{label}</FieldLabel>
      <input
        className="w-full bg-[#0a0a0a] border border-white/15 px-3 py-2 text-sm font-mono text-white/80 placeholder:text-white/25 focus:outline-none focus:border-[#26FC00] uppercase"
        placeholder={placeholder ?? "e.g. JFK or New York"}
        value={query}
        onChange={handleInput}
        onBlur={handleBlur}
        autoComplete="off"
      />
      {open && suggestions.length > 0 && (
        <div className="absolute z-50 left-0 right-0 top-full mt-0.5 bg-[#111] border border-white/15 shadow-xl max-h-44 overflow-y-auto">
          {suggestions.map(a => (
            <button
              key={a.code}
              type="button"
              onMouseDown={() => pick(a)}
              className="w-full text-left px-3 py-2 hover:bg-[#26FC00]/10 border-b border-white/5 last:border-0 flex items-center gap-2 group"
            >
              <span className="font-mono text-[11px] text-[#26FC00] font-semibold w-9 shrink-0">{a.code}</span>
              <span className="font-mono text-[10px] text-white/60 truncate">{a.city}</span>
              <span className="font-mono text-[9px] text-white/25 ml-auto shrink-0">{a.country}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function DateField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <input
        type="date"
        className="w-full bg-[#0a0a0a] border border-white/15 px-3 py-2 text-sm font-mono text-white/80 focus:outline-none focus:border-[#26FC00] [color-scheme:dark]"
        value={value}
        onChange={e => onChange(e.target.value)}
        min={new Date().toISOString().split("T")[0]}
      />
    </div>
  );
}

export function FlightsTab() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [cabin, setCabin] = useState("Economy");
  const [pax, setPax] = useState("1 passenger");
  const [results, setResults] = useState<FlightResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  function swap() {
    const tmp = from;
    setFrom(to);
    setTo(tmp);
  }

  async function search() {
    if (!from || !to) return;
    setLoading(true);
    setSearched(true);
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
      {/* Origin / Destination row */}
      <div className="flex gap-2 items-end">
        <div className="flex-1">
          <AirportField label="From" value={from} onChange={setFrom} placeholder="JFK or New York" />
        </div>
        <button
          onClick={swap}
          className="mb-0.5 p-2 border border-white/15 text-white/40 hover:border-[#26FC00]/50 hover:text-[#26FC00] transition-colors flex-shrink-0"
          title="Swap airports"
        >
          <ArrowLeftRight className="w-3.5 h-3.5" />
        </button>
        <div className="flex-1">
          <AirportField label="To" value={to} onChange={setTo} placeholder="CDG or Paris" />
        </div>
      </div>

      {/* Date */}
      <DateField label="Departure date" value={date} onChange={setDate} />

      {/* Cabin + Pax */}
      <div className="grid grid-cols-2 gap-2">
        <SelectField label="Cabin class" value={cabin} onChange={setCabin} options={CABIN_OPTIONS} />
        <SelectField label="Passengers" value={pax} onChange={setPax} options={PAX_OPTIONS} />
      </div>

      {/* Search button */}
      <button
        onClick={search}
        disabled={!from || !to || loading}
        className="w-full px-4 py-2.5 bg-[#26FC00] text-black font-mono text-xs tracking-[0.2em] uppercase hover:bg-[#FFE500] transition-colors flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plane className="w-3.5 h-3.5" />}
        Search flights
      </button>

      {/* Results */}
      <div className="flex-1 overflow-y-auto space-y-2">
        {results.map(f => (
          <div key={f.id} className="border border-white/10 p-3 flex flex-col gap-1.5 hover:border-[#26FC00]/40 transition-colors">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] tracking-[0.2em] text-[#26FC00] uppercase">{f.airline}</span>
              <span className="font-display text-[#FFE500] text-sm font-semibold">{f.price}</span>
            </div>
            <div className="flex items-center gap-2 text-white/80 font-mono text-xs">
              <span className="font-semibold">{f.from}</span>
              <span className="text-white/40">{f.departTime}</span>
              <ArrowRight className="w-3 h-3 text-white/25 flex-shrink-0" />
              <span className="font-semibold">{f.to}</span>
              <span className="text-white/40">{f.arriveTime}</span>
            </div>
            <div className="flex items-center gap-3 font-mono text-[9px] text-white/35">
              <span>{f.duration}</span>
              <span className="text-white/20">·</span>
              <span>{f.stops === 0 ? "Direct" : `${f.stops} stop${f.stops > 1 ? "s" : ""}`}</span>
              <span className="text-white/20">·</span>
              <span>{f.cabin}</span>
            </div>
          </div>
        ))}
        {searched && results.length === 0 && !loading && (
          <p className="font-serif italic text-sm text-white/35 text-center pt-8">No flights found. Try different airports or dates.</p>
        )}
        {!searched && (
          <p className="font-serif italic text-sm text-white/25 text-center pt-8">Type a city or airport code to search</p>
        )}
      </div>
    </div>
  );
}
