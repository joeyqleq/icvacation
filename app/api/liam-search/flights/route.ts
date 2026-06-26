import { NextRequest, NextResponse } from "next/server";

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

export async function GET(req: NextRequest) {
  const from = req.nextUrl.searchParams.get("from") ?? "";
  const to = req.nextUrl.searchParams.get("to") ?? "";
  const amadeusId = process.env.AMADEUS_CLIENT_ID;
  const amadeusSecret = process.env.AMADEUS_CLIENT_SECRET;

  if (amadeusId && amadeusSecret) {
    try {
      const tokenRes = await fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "client_credentials",
          client_id: amadeusId,
          client_secret: amadeusSecret,
        }),
      });
      const { access_token } = await tokenRes.json();
      const date = req.nextUrl.searchParams.get("date") ?? new Date().toISOString().slice(0, 10);
      const searchRes = await fetch(
        `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${from}&destinationLocationCode=${to}&departureDate=${date}&adults=1&max=5`,
        { headers: { Authorization: `Bearer ${access_token}` } }
      );
      const data = await searchRes.json();
      const flights: FlightResult[] = (data.data ?? []).map((o: any, i: number) => ({
        id: o.id ?? `f${i}`,
        airline: o.validatingAirlineCodes?.[0] ?? "Various",
        from: o.itineraries?.[0]?.segments?.[0]?.departure?.iataCode ?? from,
        to: o.itineraries?.[0]?.segments?.at(-1)?.arrival?.iataCode ?? to,
        departTime: o.itineraries?.[0]?.segments?.[0]?.departure?.at?.slice(11, 16) ?? "",
        arriveTime: o.itineraries?.[0]?.segments?.at(-1)?.arrival?.at?.slice(11, 16) ?? "",
        duration: o.itineraries?.[0]?.duration?.replace("PT", "").replace("H", "h ").replace("M", "m") ?? "",
        stops: (o.itineraries?.[0]?.segments?.length ?? 1) - 1,
        price: `from $${Math.round(parseFloat(o.price?.total ?? "999"))}`,
        cabin: o.travelerPricings?.[0]?.fareDetailsBySegment?.[0]?.cabin ?? "Economy",
      }));
      return NextResponse.json({ flights, live: true });
    } catch {}
  }

  return NextResponse.json({ flights: MOCK_FLIGHTS, demo: true });
}
