import type { LiamConsultation } from "@/lib/liam-consultation";

export type LiamToolContext = {
  context: string;
  status: Record<string, string>;
};

const SERPAPI_API_KEY = process.env.SERPAPI_API_KEY ?? process.env.NEXT_PUBLIC_SERPAPI_API_KEY;
const NUITEE_API_KEY = process.env.NUITEE_API_KEY ?? process.env.NUITEE_PUBLIC_API_KEY;
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY ?? process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const EXCHANGERATE_API_KEY = process.env.EXCHANGERATE_API_KEY ?? process.env.NEXT_PUBLIC_EXCHANGERATE_API_KEY;
const TAVILY_API_KEY = process.env.TAVILY_API_KEY;

function freshnessSensitive(text: string) {
  return /\b(today|tonight|tomorrow|current|currently|latest|now|weather|visa|entry|safety|advisory|strike|closure|closed|open|price|fare|flight|hotel|rate|availability|exchange|currency)\b/i.test(text);
}

function wantsFlights(text: string) {
  return /\b(flight|airfare|airline|fly|flying|business class|premium economy|first class)\b/i.test(text);
}

function wantsHotels(text: string) {
  return /\b(hotel|resort|room|stay|accommodation|villa|suite)\b/i.test(text);
}

function wantsWeather(text: string) {
  return /\b(weather|temperature|rain|snow|climate|hot|cold|humid)\b/i.test(text);
}

async function tavily(query: string) {
  if (!TAVILY_API_KEY) return { text: "", status: "not_configured" };
  try {
    const r = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ api_key: TAVILY_API_KEY, query: `travel ${query}`, search_depth: "basic", max_results: 4, include_answer: true }),
      signal: AbortSignal.timeout(5000),
    });
    if (!r.ok) return { text: "", status: `http_${r.status}` };
    const d = await r.json();
    const results = (d.results ?? []).slice(0, 4).map((x: any) => `- ${x.title}: ${String(x.content ?? "").slice(0, 500)} (${x.url})`).join("\n");
    return { text: results ? `### Fresh web research\n${results}` : "", status: results ? "live" : "empty" };
  } catch { return { text: "", status: "error" }; }
}

async function flights(c: LiamConsultation, query: string) {
  if (!SERPAPI_API_KEY) return { text: "", status: "not_configured" };
  if (!c.origin || !c.destinations[0]) return { text: "", status: "needs_route" };
  // SerpAPI Google Flights requires airport/location IDs. Do not fabricate IDs from free text.
  // This context tells Liam the live flight tool is available but that it must obtain/resolve route inputs first.
  const iata = query.match(/\b[A-Z]{3}\b/g) ?? [];
  if (iata.length < 2) return { text: "", status: "needs_iata" };
  const [from, to] = iata.slice(-2);
  const date = query.match(/\b20\d{2}-\d{2}-\d{2}\b/)?.[0];
  if (!date) return { text: "", status: "needs_date" };
  try {
    const p = new URLSearchParams({ engine: "google_flights", departure_id: from, arrival_id: to, outbound_date: date, currency: "USD", hl: "en", api_key: SERPAPI_API_KEY, type: "2" });
    const r = await fetch(`https://serpapi.com/search?${p}`, { signal: AbortSignal.timeout(8000) });
    if (!r.ok) return { text: "", status: `http_${r.status}` };
    const d = await r.json();
    const rows = [...(d.best_flights ?? []), ...(d.other_flights ?? [])].slice(0, 5).map((f: any) => {
      const first = f.flights?.[0] ?? {}; const last = f.flights?.at?.(-1) ?? {};
      return `- ${first.airline ?? "Airline"}: ${first.departure_airport?.id ?? from} ${first.departure_airport?.time ?? ""} → ${last.arrival_airport?.id ?? to} ${last.arrival_airport?.time ?? ""}; ${Math.max(0,(f.flights?.length ?? 1)-1)} stop(s); ${f.price ? `$${f.price}` : "price unavailable"}`;
    }).join("\n");
    return { text: rows ? `### Live flight snapshot (SerpAPI / Google Flights)\n${rows}\nTreat as a current snapshot, not bookable inventory.` : "", status: rows ? "live" : "empty" };
  } catch { return { text: "", status: "error" }; }
}

async function hotels(c: LiamConsultation) {
  if (!NUITEE_API_KEY) return { text: "", status: "not_configured" };
  const destination = c.destinations[0];
  if (!destination) return { text: "", status: "needs_destination" };
  try {
    const p = new URLSearchParams({ hotelName: destination, language: "en", limit: "8" });
    const r = await fetch(`https://api.liteapi.travel/v3.0/data/hotels?${p}`, { headers: { "X-API-Key": NUITEE_API_KEY }, signal: AbortSignal.timeout(7000) });
    if (!r.ok) return { text: "", status: `http_${r.status}` };
    const d = await r.json();
    const rows = (d.data ?? []).slice(0, 6).map((h: any) => `- ${h.name ?? "Hotel"}, ${[h.city,h.country].filter(Boolean).join(", ")}; ${h.starRating ?? "?"}-star; ${h.chain ?? h.category ?? "independent"}`).join("\n");
    return { text: rows ? `### Live hotel inventory metadata (LiteAPI/Nuitee)\n${rows}\nRates require exact dates/occupancy; do not invent rates.` : "", status: rows ? "live" : "empty" };
  } catch { return { text: "", status: "error" }; }
}

async function weather(c: LiamConsultation) {
  if (!OPENWEATHER_API_KEY) return { text: "", status: "not_configured" };
  const city = c.destinations[0];
  if (!city) return { text: "", status: "needs_destination" };
  try {
    const r = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${OPENWEATHER_API_KEY}&units=metric`, { signal: AbortSignal.timeout(5000) });
    if (!r.ok) return { text: "", status: `http_${r.status}` };
    const d = await r.json();
    return { text: `### Current weather snapshot\n${d.name ?? city}: ${Math.round(d.main?.temp ?? 0)}°C, ${d.weather?.[0]?.description ?? "conditions unavailable"}; humidity ${d.main?.humidity ?? "?"}%.`, status: "live" };
  } catch { return { text: "", status: "error" }; }
}

export async function buildLiveToolContext(query: string, c: LiamConsultation): Promise<LiamToolContext> {
  const tasks: Promise<[string, {text:string;status:string}]>[] = [];
  if (wantsFlights(query)) tasks.push(flights(c, query).then((v) => ["flights", v]));
  if (wantsHotels(query)) tasks.push(hotels(c).then((v) => ["hotels", v]));
  if (wantsWeather(query)) tasks.push(weather(c).then((v) => ["weather", v]));
  if (freshnessSensitive(query)) tasks.push(tavily(query).then((v) => ["web", v]));

  const resolved = await Promise.all(tasks);
  const status: Record<string,string> = { exchange: EXCHANGERATE_API_KEY ? "configured" : "not_configured" };
  const sections: string[] = [];
  for (const [name, result] of resolved) { status[name] = result.status; if (result.text) sections.push(result.text); }
  return {
    context: sections.length ? `## LIVE TRAVEL TOOL RESULTS\n${sections.join("\n\n")}\nLive tool results outrank model memory for time-sensitive facts. Never present demo/mock data as live.` : "",
    status,
  };
}
