import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface FlightResult {
  id: string;
  airline: string;
  from: string;
  to: string;
  departTime: string;
  arriveTime: string;
  duration: string;
  stops: number;
  price: string;
  cabin: string;
}

const MOCK_FLIGHTS: FlightResult[] = [
  { id: "f1", airline: "Emirates", from: "DXB", to: "JFK", departTime: "08:30", arriveTime: "16:45", duration: "14h 15m", stops: 0, price: "from $1,240", cabin: "Economy" },
  { id: "f2", airline: "Qatar Airways", from: "DOH", to: "CDG", departTime: "23:15", arriveTime: "06:30", duration: "7h 15m", stops: 0, price: "from $890", cabin: "Business" },
  { id: "f3", airline: "Singapore Airlines", from: "SIN", to: "LHR", departTime: "10:45", arriveTime: "16:20", duration: "13h 35m", stops: 0, price: "from $1,580", cabin: "Premium Economy" },
  { id: "f4", airline: "SWISS", from: "ZRH", to: "JFK", departTime: "11:30", arriveTime: "14:15", duration: "9h 45m", stops: 0, price: "from $2,100", cabin: "Business" },
  { id: "f5", airline: "Air France", from: "CDG", to: "NRT", departTime: "13:00", arriveTime: "08:40+1", duration: "13h 40m", stops: 0, price: "from $1,890", cabin: "Economy" },
  { id: "f6", airline: "JAL", from: "NRT", to: "LAX", departTime: "16:30", arriveTime: "10:05", duration: "10h 35m", stops: 0, price: "from $1,340", cabin: "Economy" },
];

function parseDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
}

function formatTime(isoString: string): string {
  if (!isoString) return "";
  try {
    return isoString.slice(11, 16);
  } catch {
    return isoString;
  }
}

export async function GET(req: NextRequest) {
  const from = req.nextUrl.searchParams.get("from")?.toUpperCase() ?? "";
  const to = req.nextUrl.searchParams.get("to")?.toUpperCase() ?? "";
  const date = req.nextUrl.searchParams.get("date") ?? new Date().toISOString().slice(0, 10);
  const serpApiKey = process.env.NEXT_PUBLIC_SERPAPI_API_KEY;

  if (serpApiKey && from && to) {
    try {
      const params = new URLSearchParams({
        engine: "google_flights",
        departure_id: from,
        arrival_id: to,
        outbound_date: date,
        currency: "USD",
        hl: "en",
        api_key: serpApiKey,
        type: "2", // one-way
      });

      const res = await fetch(`https://serpapi.com/search?${params.toString()}`, {
        signal: AbortSignal.timeout(8000),
      });

      if (res.ok) {
        const data = await res.json();
        const rawFlights = [
          ...(data.best_flights ?? []),
          ...(data.other_flights ?? []),
        ].slice(0, 8);

        if (rawFlights.length > 0) {
          const flights: FlightResult[] = rawFlights.map((f: any, i: number) => {
            const firstSeg = f.flights?.[0] ?? {};
            const lastSeg = f.flights?.at(-1) ?? {};
            const airline = firstSeg.airline ?? "Various";
            const stops = Math.max(0, (f.flights?.length ?? 1) - 1);
            const durationMin = f.total_duration ?? 0;
            const price = f.price ? `from $${f.price.toLocaleString()}` : "Price TBD";
            const cabin = firstSeg.travel_class ?? "Economy";

            return {
              id: `s${i}`,
              airline,
              from: firstSeg.departure_airport?.id ?? from,
              to: lastSeg.arrival_airport?.id ?? to,
              departTime: formatTime(firstSeg.departure_airport?.time ?? ""),
              arriveTime: formatTime(lastSeg.arrival_airport?.time ?? ""),
              duration: durationMin ? parseDuration(durationMin) : "",
              stops,
              price,
              cabin,
            };
          });
          return NextResponse.json({ flights, live: true, source: "serpapi" });
        }
      }
    } catch {}
  }

  return NextResponse.json({ flights: MOCK_FLIGHTS, demo: true });
}
