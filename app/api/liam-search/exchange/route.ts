import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const from = req.nextUrl.searchParams.get("from") ?? "USD";
  const to = req.nextUrl.searchParams.get("to") ?? "EUR";
  const key = process.env.NEXT_PUBLIC_EXCHANGERATE_API_KEY;

  if (!key || key === "demo") {
    const demoRates: Record<string, number> = {
      "USD-EUR": 0.92, "USD-GBP": 0.79, "USD-JPY": 155.2,
      "USD-AED": 3.67, "EUR-USD": 1.09, "GBP-USD": 1.27,
      "USD-CAD": 1.36, "USD-AUD": 1.54, "USD-CHF": 0.89,
    };
    const rate = demoRates[`${from}-${to}`] ?? 1.0;
    return NextResponse.json({ rate, from, to, updated: new Date().toISOString(), demo: true });
  }

  const r = await fetch(`https://v6.exchangerate-api.com/v6/${key}/pair/${from}/${to}`);
  const d = await r.json();
  return NextResponse.json({
    rate: d.conversion_rate,
    from,
    to,
    updated: d.time_last_update_utc,
  });
}
