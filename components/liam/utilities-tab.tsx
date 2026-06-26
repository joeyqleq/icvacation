"use client";
import { useState, useEffect } from "react";
import { CloudSun, RefreshCw, DollarSign } from "lucide-react";

export function UtilitiesTab() {
  const [city, setCity] = useState("Paris");
  const [weather, setWeather] = useState<any>(null);
  const [fromCur, setFromCur] = useState("USD");
  const [toCur, setToCur] = useState("EUR");
  const [amount, setAmount] = useState("100");
  const [rate, setRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  async function fetchWeather() {
    setLoading(true);
    try {
      const r = await fetch(`/api/liam-search/weather?city=${encodeURIComponent(city)}`);
      setWeather(await r.json());
    } finally {
      setLoading(false);
    }
  }

  async function fetchRate() {
    const r = await fetch(`/api/liam-search/exchange?from=${fromCur}&to=${toCur}`);
    const d = await r.json();
    setRate(d.rate);
  }

  useEffect(() => { fetchRate(); }, [fromCur, toCur]);

  return (
    <div className="flex flex-col gap-5 h-full overflow-y-auto">
      <div className="border border-white/10 p-4">
        <div className="flex items-center gap-2 mb-3">
          <CloudSun className="w-4 h-4 text-[#FFE500]" />
          <span className="font-mono text-[11px] tracking-[0.2em] text-white/60 uppercase">Weather</span>
        </div>
        <div className="flex gap-2">
          <input
            className="flex-1 bg-[#050505] border border-white/15 px-3 py-1.5 text-sm font-mono text-white/80 placeholder:text-white/30 focus:outline-none focus:border-[#26FC00]"
            value={city}
            onChange={e => setCity(e.target.value)}
            placeholder="City name"
            onKeyDown={e => e.key === "Enter" && fetchWeather()}
          />
          <button
            onClick={fetchWeather}
            className="px-3 py-1.5 bg-[#26FC00]/10 border border-[#26FC00]/30 text-[#26FC00] hover:bg-[#26FC00]/20 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
        {weather && (
          <div className="mt-3 flex items-center justify-between">
            <div>
              <p className="font-sans font-bold text-3xl text-white">{weather.temp}°C</p>
              <p className="font-mono text-[10px] text-white/50 capitalize">{weather.description}</p>
              {weather.demo && <p className="font-mono text-[9px] text-[#FFE500]/60">demo mode</p>}
            </div>
            <div className="text-right font-mono text-[10px] text-white/40">
              <p>Feels {weather.feelsLike}°C</p>
              <p>Humidity {weather.humidity}%</p>
              <p>Wind {weather.wind} km/h</p>
            </div>
          </div>
        )}
      </div>

      <div className="border border-white/10 p-4">
        <div className="flex items-center gap-2 mb-3">
          <DollarSign className="w-4 h-4 text-[#26FC00]" />
          <span className="font-mono text-[11px] tracking-[0.2em] text-white/60 uppercase">Currency Exchange</span>
        </div>
        <div className="grid grid-cols-3 gap-2 items-end">
          <div>
            <label className="font-mono text-[9px] text-white/40 uppercase tracking-[0.15em] block mb-1">From</label>
            <input className="w-full bg-[#050505] border border-white/15 px-2 py-1.5 text-sm font-mono text-white/80 focus:outline-none focus:border-[#26FC00]" value={fromCur} onChange={e => setFromCur(e.target.value.toUpperCase())} maxLength={3} />
          </div>
          <div>
            <label className="font-mono text-[9px] text-white/40 uppercase tracking-[0.15em] block mb-1">To</label>
            <input className="w-full bg-[#050505] border border-white/15 px-2 py-1.5 text-sm font-mono text-white/80 focus:outline-none focus:border-[#26FC00]" value={toCur} onChange={e => setToCur(e.target.value.toUpperCase())} maxLength={3} />
          </div>
          <div>
            <label className="font-mono text-[9px] text-white/40 uppercase tracking-[0.15em] block mb-1">Amount</label>
            <input className="w-full bg-[#050505] border border-white/15 px-2 py-1.5 text-sm font-mono text-white/80 focus:outline-none focus:border-[#26FC00]" value={amount} onChange={e => setAmount(e.target.value)} type="number" />
          </div>
        </div>
        {rate !== null && (
          <div className="mt-3 text-center">
            <p className="font-sans font-bold text-2xl text-[#FFE500]">{(parseFloat(amount || "1") * rate).toFixed(2)} {toCur}</p>
            <p className="font-mono text-[10px] text-white/40">1 {fromCur} = {rate.toFixed(4)} {toCur}</p>
          </div>
        )}
      </div>
    </div>
  );
}
