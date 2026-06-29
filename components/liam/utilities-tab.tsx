"use client";
import { useState, useEffect } from "react";
import { CloudSun, RefreshCw, ArrowLeftRight } from "lucide-react";

const CURRENCIES = ["USD", "EUR", "GBP", "JPY", "AED", "CHF", "CAD", "AUD", "SGD", "THB", "BRL", "ZAR", "MXN", "INR", "HKD"];

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="block font-mono text-[9px] tracking-[0.2em] uppercase text-white/40 mb-1">
      {children}
    </span>
  );
}

function CurrencySelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full bg-[#0a0a0a] border border-white/15 px-3 py-2 text-sm font-mono text-white/80 focus:outline-none focus:border-[#26FC00] appearance-none cursor-pointer"
      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%2326FC00' opacity='0.5'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center" }}
    >
      {CURRENCIES.map(c => <option key={c} value={c} className="bg-[#0a0a0a]">{c}</option>)}
    </select>
  );
}

export function UtilitiesTab() {
  const [city, setCity] = useState("Paris");
  const [weather, setWeather] = useState<{ temp: number; description: string; feelsLike: number; humidity: number; wind: number; demo?: boolean } | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [fromCur, setFromCur] = useState("USD");
  const [toCur, setToCur] = useState("EUR");
  const [amount, setAmount] = useState("1000");
  const [rate, setRate] = useState<number | null>(null);

  async function fetchWeather() {
    if (!city.trim()) return;
    setWeatherLoading(true);
    try {
      const r = await fetch(`/api/liam-search/weather?city=${encodeURIComponent(city)}`);
      setWeather(await r.json());
    } finally {
      setWeatherLoading(false);
    }
  }

  async function fetchRate() {
    const r = await fetch(`/api/liam-search/exchange?from=${fromCur}&to=${toCur}`);
    const d = await r.json();
    setRate(d.rate ?? null);
  }

  function swapCurrencies() {
    const tmp = fromCur;
    setFromCur(toCur);
    setToCur(tmp);
  }

  useEffect(() => { fetchRate(); }, [fromCur, toCur]);

  const converted = rate !== null ? (parseFloat(amount || "0") * rate).toFixed(2) : null;

  return (
    <div className="flex flex-col gap-4 h-full overflow-y-auto">
      {/* Weather */}
      <div className="border border-white/10 p-4">
        <div className="flex items-center gap-2 mb-3">
          <CloudSun className="w-4 h-4 text-[#FFE500]" />
          <span className="font-mono text-[11px] tracking-[0.2em] text-white/60 uppercase">Weather check</span>
        </div>
        <div>
          <FieldLabel>City or destination</FieldLabel>
          <div className="flex gap-2">
            <input
              className="flex-1 bg-[#0a0a0a] border border-white/15 px-3 py-2 text-sm font-mono text-white/80 placeholder:text-white/25 focus:outline-none focus:border-[#26FC00]"
              value={city}
              onChange={e => setCity(e.target.value)}
              placeholder="e.g. Tokyo, Bali..."
              onKeyDown={e => e.key === "Enter" && fetchWeather()}
            />
            <button
              onClick={fetchWeather}
              disabled={weatherLoading}
              className="px-3 py-2 bg-[#26FC00]/10 border border-[#26FC00]/30 text-[#26FC00] hover:bg-[#26FC00]/20 transition-colors disabled:opacity-40"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${weatherLoading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>

        {weather && (
          <div className="mt-4 flex items-start justify-between">
            <div>
              <p className="font-sans font-bold text-4xl text-white leading-none">{weather.temp}°C</p>
              <p className="font-mono text-[10px] text-white/50 capitalize mt-1">{weather.description}</p>
              {weather.demo && <p className="font-mono text-[9px] text-[#FFE500]/50 mt-0.5">demo data</p>}
            </div>
            <div className="text-right font-mono text-[10px] text-white/35 space-y-0.5">
              <p>Feels like {weather.feelsLike}°C</p>
              <p>Humidity {weather.humidity}%</p>
              <p>Wind {weather.wind} km/h</p>
            </div>
          </div>
        )}

        {!weather && (
          <p className="font-serif italic text-sm text-white/25 mt-3">Enter a city and press check</p>
        )}
      </div>

      {/* Currency */}
      <div className="border border-white/10 p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-[11px] tracking-[0.2em] text-white/60 uppercase">Currency converter</span>
        </div>

        <div>
          <FieldLabel>Amount</FieldLabel>
          <input
            type="number"
            min={0}
            className="w-full bg-[#0a0a0a] border border-white/15 px-3 py-2 text-sm font-mono text-white/80 focus:outline-none focus:border-[#26FC00] mb-3"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
        </div>

        <div className="flex gap-2 items-end">
          <div className="flex-1">
            <FieldLabel>From</FieldLabel>
            <CurrencySelect value={fromCur} onChange={setFromCur} />
          </div>
          <button
            onClick={swapCurrencies}
            className="mb-0.5 p-2 border border-white/15 text-white/40 hover:border-[#26FC00]/50 hover:text-[#26FC00] transition-colors flex-shrink-0"
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
          </button>
          <div className="flex-1">
            <FieldLabel>To</FieldLabel>
            <CurrencySelect value={toCur} onChange={setToCur} />
          </div>
        </div>

        {converted !== null && (
          <div className="mt-4 text-center border border-white/8 bg-[#0a0a0a] py-3 px-4">
            <p className="font-sans font-bold text-2xl text-[#FFE500]">{converted} <span className="text-lg">{toCur}</span></p>
            <p className="font-mono text-[10px] text-white/35 mt-1">1 {fromCur} = {rate?.toFixed(4)} {toCur}</p>
          </div>
        )}
      </div>
    </div>
  );
}
