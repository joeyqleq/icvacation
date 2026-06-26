import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const city = req.nextUrl.searchParams.get("city") ?? "London";
  const key = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

  if (!key || key === "demo") {
    return NextResponse.json({
      city,
      temp: 22,
      feelsLike: 20,
      description: "Partly cloudy",
      humidity: 65,
      wind: 12,
      icon: "02d",
      demo: true,
    });
  }

  const r = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${key}&units=metric`
  );
  const d = await r.json();
  return NextResponse.json({
    city: d.name,
    temp: Math.round(d.main?.temp ?? 0),
    feelsLike: Math.round(d.main?.feels_like ?? 0),
    description: d.weather?.[0]?.description ?? "",
    humidity: d.main?.humidity ?? 0,
    wind: Math.round(d.wind?.speed ?? 0),
    icon: d.weather?.[0]?.icon ?? "01d",
  });
}
