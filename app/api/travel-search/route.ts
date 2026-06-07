import { NextResponse } from "next/server";

export interface TravelLocation {
  name: string;
  lat: number;
  lng: number;
  x: number; // SVG mapping coordinates (0-100%)
  y: number; // SVG mapping coordinates (0-100%)
}

export interface TravelRoute {
  id: string;
  type: "flight" | "cruise" | "hotel";
  title: string;
  from: TravelLocation;
  to: TravelLocation;
  path: string; // SVG path command for curve
  duration: string;
  priceEstimate: string;
  description: string;
  highlights: string[];
}

const locations: Record<string, TravelLocation> = {
  beirut: { name: "Beirut, Lebanon", lat: 33.8938, lng: 35.5018, x: 62.5, y: 44.5 },
  rome: { name: "Rome, Italy", lat: 41.9028, lng: 12.4964, x: 50.8, y: 39.5 },
  barcelona: { name: "Barcelona, Spain", lat: 41.3851, lng: 2.1734, x: 47.8, y: 39.7 },
  montreal: { name: "Montreal, Canada", lat: 45.5017, lng: -73.5673, x: 28.5, y: 36.5 },
  cancun: { name: "Cancun, Mexico", lat: 21.1619, lng: -86.8515, x: 24.5, y: 49.5 },
  newyork: { name: "New York, USA", lat: 40.7128, lng: -74.0060, x: 28.2, y: 40.2 },
  tokyo: { name: "Tokyo, Japan", lat: 35.6762, lng: 139.6503, x: 88.5, y: 43.5 },
  kyoto: { name: "Kyoto, Japan", lat: 35.0116, lng: 135.7681, x: 87.2, y: 43.8 },
};

const mockRoutes: TravelRoute[] = [
  {
    id: "flight-1",
    type: "flight",
    title: "Beirut to Rome Connective Flight",
    from: locations.beirut,
    to: locations.rome,
    path: "M 62.5,44.5 Q 56.6,39.5 50.8,39.5",
    duration: "3h 45m",
    priceEstimate: "$420",
    description: "Premium business class connectors via Rome with priority Virtuoso lounge access.",
    highlights: ["Priority check-in", "Lounge access", "Flatbed seats availability"],
  },
  {
    id: "flight-2",
    type: "flight",
    title: "Montreal to Cancun Direct Flight",
    from: locations.montreal,
    to: locations.cancun,
    path: "M 28.5,36.5 Q 26.5,43.0 24.5,49.5",
    duration: "4h 30m",
    priceEstimate: "$510",
    description: "Winter escape charter flight with luxury airport transfers directly to resort.",
    highlights: ["Direct routing", "Complimentary champagne", "Luxury transfers"],
  },
  {
    id: "flight-3",
    type: "flight",
    title: "New York to Tokyo Premium Route",
    from: locations.newyork,
    to: locations.tokyo,
    path: "M 28.2,40.2 Q 58.0,20.0 88.5,43.5",
    duration: "14h 15m",
    priceEstimate: "$1,850",
    description: "Elite first-class long-haul flight featuring double beds and Michelin-star meals.",
    highlights: ["First-class suites", "Michelin dining", "Luxury layover spas"],
  },
  {
    id: "cruise-1",
    type: "cruise",
    title: "Western Mediterranean Boutique Cruise",
    from: locations.rome,
    to: locations.barcelona,
    path: "M 50.8,39.5 C 49.8,40.5 48.8,40.5 47.8,39.7",
    duration: "7 days",
    priceEstimate: "$3,400 / cabin",
    description: "Intimate yacht-scale sailing with private shore excursions and wine pairings.",
    highlights: ["Private balcony cabin", "Max 120 guests", "Sommelier-led dinners"],
  },
  {
    id: "hotel-1",
    type: "hotel",
    title: "Kyoto Heritage Ryokan Sanctuary",
    from: locations.tokyo,
    to: locations.kyoto,
    path: "M 88.5,43.5 Q 87.8,43.6 87.2,43.8",
    duration: "4 nights",
    priceEstimate: "$850 / night",
    description: "Historic wood villa with private hot spring (onsen) gardens and kaiseki dining.",
    highlights: ["Private outdoor onsen", "Michelin star dining", "Historic district"],
  },
];

export async function GET() {
  return NextResponse.json({
    routes: mockRoutes,
    locations: Object.values(locations),
  });
}
