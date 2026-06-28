import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface HotelResult {
  id: string;
  name: string;
  location: string;
  stars: number;
  price: string;
  tags: string[];
  checkIn?: string;
  checkOut?: string;
}

const MOCK_HOTELS: HotelResult[] = [
  { id: "h1", name: "Amangiri", location: "Canyon Point, Utah", stars: 5, price: "from $3,200/night", tags: ["Desert", "Luxury", "Spa"] },
  { id: "h2", name: "Singita Grumeti", location: "Serengeti, Tanzania", stars: 5, price: "from $2,800/night", tags: ["Safari", "Wildlife", "Remote"] },
  { id: "h3", name: "Six Senses Zil Pasyon", location: "Félicité Island, Seychelles", stars: 5, price: "from $2,200/night", tags: ["Beach", "Eco", "Island"] },
  { id: "h4", name: "Capella Ubud", location: "Ubud, Bali", stars: 5, price: "from $950/night", tags: ["Jungle", "Romantic", "Spa"] },
  { id: "h5", name: "Rosewood Le Guanahani", location: "Saint Barthélemy", stars: 5, price: "from $1,400/night", tags: ["Caribbean", "Beach", "Private"] },
  { id: "h6", name: "Amanfayun", location: "Hangzhou, China", stars: 5, price: "from $1,100/night", tags: ["Culture", "Tea", "Serene"] },
];

export async function GET(req: NextRequest) {
  const destination = req.nextUrl.searchParams.get("destination") ?? "";
  const checkIn = req.nextUrl.searchParams.get("checkIn") ?? "";
  const checkOut = req.nextUrl.searchParams.get("checkOut") ?? "";
  const guests = req.nextUrl.searchParams.get("guests") ?? "2";
  const nuiteeKey = process.env.NUITEE_PUBLIC_API_KEY;

  if (nuiteeKey && destination) {
    try {
      // Step 1: Geocode the destination via Nuitee hotel list
      const searchParams = new URLSearchParams({
        hotelName: destination,
        language: "en",
        limit: "10",
      });

      const searchRes = await fetch(
        `https://api.liteapi.travel/v3.0/data/hotels?${searchParams.toString()}`,
        {
          headers: {
            "X-API-Key": nuiteeKey,
            "Content-Type": "application/json",
          },
          signal: AbortSignal.timeout(6000),
        }
      );

      if (searchRes.ok) {
        const searchData = await searchRes.json();
        const hotels: any[] = searchData.data ?? [];

        if (hotels.length > 0) {
          // If we have check-in/out dates, fetch rates for first hotel batch
          if (checkIn && checkOut && hotels.length > 0) {
            const hotelIds = hotels.slice(0, 6).map((h: any) => h.id);
            const ratesBody = {
              hotelIds,
              checkin: checkIn,
              checkout: checkOut,
              occupancies: [{ adults: parseInt(guests, 10) || 2 }],
              currency: "USD",
              guestNationality: "US",
            };

            try {
              const ratesRes = await fetch("https://api.liteapi.travel/v3.0/hotels/rates", {
                method: "POST",
                headers: {
                  "X-API-Key": nuiteeKey,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(ratesBody),
                signal: AbortSignal.timeout(8000),
              });

              if (ratesRes.ok) {
                const ratesData = await ratesRes.json();
                const ratedHotels: HotelResult[] = (ratesData.data ?? [])
                  .filter((r: any) => r.roomTypes?.length > 0)
                  .slice(0, 8)
                  .map((r: any, i: number) => {
                    const hotelMeta = hotels.find((h: any) => h.id === r.hotelId) ?? {};
                    const cheapestRoom = r.roomTypes?.[0];
                    const price = cheapestRoom?.rates?.[0]?.retailRate?.total?.[0];
                    return {
                      id: r.hotelId ?? `n${i}`,
                      name: hotelMeta.name ?? r.hotelId,
                      location: [hotelMeta.city, hotelMeta.country].filter(Boolean).join(", ") || destination,
                      stars: hotelMeta.starRating ?? 4,
                      price: price ? `from $${Math.round(price.amount).toLocaleString()}/stay` : "Rates available",
                      tags: [hotelMeta.category, hotelMeta.chain].filter(Boolean).slice(0, 3),
                      checkIn,
                      checkOut,
                    };
                  });

                if (ratedHotels.length > 0) {
                  return NextResponse.json({ hotels: ratedHotels, live: true, source: "nuitee_rates" });
                }
              }
            } catch {}
          }

          // Fallback: return hotel list without rates
          const results: HotelResult[] = hotels.slice(0, 8).map((h: any, i: number) => ({
            id: h.id ?? `n${i}`,
            name: h.name ?? "Unknown Hotel",
            location: [h.city, h.country].filter(Boolean).join(", ") || destination,
            stars: h.starRating ?? 4,
            price: "Rates on request",
            tags: [h.category, h.chain].filter(Boolean).slice(0, 3),
          }));

          return NextResponse.json({ hotels: results, live: true, source: "nuitee_list" });
        }
      }
    } catch {}
  }

  return NextResponse.json({ hotels: MOCK_HOTELS, demo: true });
}
