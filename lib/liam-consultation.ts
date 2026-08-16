export type LiamConsultation = {
  travelerName?: string;
  email?: string;
  origin?: string;
  nationality?: string;
  partyType?: "solo" | "couple" | "family" | "friends" | "group";
  partySize?: number;
  occasion?: string;
  destinations: string[];
  rejectedDestinations: string[];
  interests: string[];
  dislikes: string[];
  mustHaves: string[];
  dateWindow?: string;
  durationDays?: number;
  flexibility?: "fixed" | "some" | "flexible";
  budgetTotalUsd?: number;
  budgetPerPersonUsd?: number;
  hotelTier?: "value" | "comfort" | "upscale" | "luxury" | "ultra";
  cabin?: "economy" | "premium_economy" | "business" | "first";
  pace?: "slow" | "balanced" | "active";
  structure?: "structured" | "balanced" | "spontaneous";
  dreamMoment?: string;
  accessibilityNotes?: string;
  dietaryNotes?: string;
  confidence: number;
};

export type PackageEstimate = {
  lowUsd: number;
  highUsd: number;
  perPersonLowUsd: number;
  perPersonHighUsd: number;
  assumptions: string[];
  confidence: "low" | "medium" | "high";
};

const DESTINATIONS = [
  "maldives", "bali", "paris", "tokyo", "rome", "greece", "tuscany", "santorini",
  "dubai", "new york", "london", "thailand", "vietnam", "costa rica", "peru", "patagonia",
  "iceland", "norway", "seychelles", "caribbean", "amalfi", "barcelona", "portugal", "morocco",
  "kenya", "tanzania", "egypt", "india", "japan", "australia", "new zealand", "fiji", "hawaii",
  "mexico", "colombia", "belize", "croatia", "turkey", "jordan", "italy", "spain", "france",
  "south africa", "botswana", "namibia", "galapagos", "antarctica", "alaska", "switzerland",
];

const INTERESTS: Record<string, RegExp> = {
  food: /\b(food|cuisine|culinary|restaurant|chef|gastronomy)\b/i,
  wine: /\b(wine|vineyard|winery|sommelier)\b/i,
  wildlife: /\b(wildlife|safari|whale|birding|animals)\b/i,
  beach: /\b(beach|island|snorkel|tropical|ocean)\b/i,
  diving: /\b(diving|scuba|snorkel)\b/i,
  culture: /\b(culture|museum|history|heritage|architecture|art)\b/i,
  wellness: /\b(spa|wellness|yoga|meditation|retreat)\b/i,
  adventure: /\b(hike|hiking|trek|adventure|kayak|ski|climb)\b/i,
  cruise: /\b(cruise|river cruise|expedition ship|yacht|sailing)\b/i,
  nightlife: /\b(nightlife|clubs?|bars?|party)\b/i,
  photography: /\b(photo|photography|landscape|camera)\b/i,
};

function uniq(values: string[], max = 16) {
  return [...new Set(values.map((v) => v.trim()).filter(Boolean))].slice(0, max);
}

function money(value: string): number | undefined {
  const cleaned = value.replace(/[$,\s]/g, "").toLowerCase();
  const m = cleaned.match(/([0-9]+(?:\.[0-9]+)?)(k)?/);
  if (!m) return undefined;
  const amount = Number(m[1]) * (m[2] ? 1000 : 1);
  return Number.isFinite(amount) && amount > 0 ? Math.round(amount) : undefined;
}

export function extractConsultation(messages: { role: string; content: string }[]): LiamConsultation {
  const userText = messages.filter((m) => m.role === "user").map((m) => m.content).join("\n");
  const lower = userText.toLowerCase();
  const destinations = DESTINATIONS.filter((d) => lower.includes(d)).map((d) => d.replace(/\b\w/g, (c) => c.toUpperCase()));
  const interests = Object.entries(INTERESTS).filter(([, re]) => re.test(userText)).map(([name]) => name);

  const email = userText.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0];
  const name = userText.match(/\b(?:my name is|i'm|i am|call me)\s+([A-Z][a-z]{1,30})\b/i)?.[1];
  const size = userText.match(/\b(?:party of|there (?:are|will be)|we(?:'re| are))\s+(\d{1,2})\b/i)?.[1];
  const days = userText.match(/\b(\d{1,2})\s*(?:days?|nights?)\b/i)?.[1];

  const totalBudget = userText.match(/(?:total budget|budget(?: is| of)?|spend(?:ing)?(?: up to)?)\s*(?:around|about|roughly|of|is|:)?\s*(\$?[\d,.]+\s*k?)/i)?.[1];
  const ppBudget = userText.match(/(?:per person|each)\s*(?:budget|around|about|up to|of|is|:)?\s*(\$?[\d,.]+\s*k?)/i)?.[1];

  const partyType: LiamConsultation["partyType"] = /\b(honeymoon|anniversary|wife|husband|partner|couple|two of us)\b/i.test(userText)
    ? "couple"
    : /\b(kids?|children|family|toddler|teen)\b/i.test(userText)
    ? "family"
    : /\b(friends?)\b/i.test(userText)
    ? "friends"
    : /\b(group|colleagues|team)\b/i.test(userText)
    ? "group"
    : /\b(solo|alone|myself)\b/i.test(userText)
    ? "solo"
    : undefined;

  const hotelTier: LiamConsultation["hotelTier"] = /\b(aman|six senses|rosewood|belmond|ultra.?lux|private villa)\b/i.test(userText)
    ? "ultra"
    : /\b(5.?star|five.?star|luxury|high.?end)\b/i.test(userText)
    ? "luxury"
    : /\b(4.?star|upscale|boutique)\b/i.test(userText)
    ? "upscale"
    : /\b(comfortable|mid.?range|3.?star)\b/i.test(userText)
    ? "comfort"
    : /\b(value|budget|affordable)\b/i.test(userText)
    ? "value"
    : undefined;

  const cabin: LiamConsultation["cabin"] = /\bfirst class\b/i.test(userText)
    ? "first"
    : /\bbusiness(?: class)?\b/i.test(userText)
    ? "business"
    : /\bpremium economy\b/i.test(userText)
    ? "premium_economy"
    : /\beconomy\b/i.test(userText)
    ? "economy"
    : undefined;

  const pace: LiamConsultation["pace"] = /\b(relax|slow|unhurried|downtime|rest)\b/i.test(userText)
    ? "slow"
    : /\b(active|packed|see everything|busy itinerary)\b/i.test(userText)
    ? "active"
    : undefined;

  const flexibility: LiamConsultation["flexibility"] = /\b(anytime|very flexible|open dates|flexible)\b/i.test(userText)
    ? "flexible"
    : /\b(exact dates|fixed dates|cannot change|can't change)\b/i.test(userText)
    ? "fixed"
    : undefined;

  const occasion = userText.match(/\b(honeymoon|anniversary|birthday|graduation|retirement|proposal|family reunion)\b/i)?.[1];
  const origin = userText.match(/\b(?:flying|departing|leaving|traveling|travelling) from\s+([A-Z][A-Za-z .'-]{2,40})/i)?.[1]?.trim();
  const nationality = userText.match(/\b(?:i am|i'm|passport is|passport:?)\s+(American|Canadian|British|Lebanese|Australian|French|German|Italian|Indian|Japanese|Brazilian|Mexican)\b/i)?.[1];

  const scoreFields = [destinations.length > 0, partyType, days, totalBudget || ppBudget, hotelTier, cabin, interests.length > 0, origin, flexibility];
  const confidence = Math.round((scoreFields.filter(Boolean).length / scoreFields.length) * 100) / 100;

  return {
    travelerName: name,
    email,
    origin,
    nationality,
    partyType,
    partySize: size ? Number(size) : partyType === "solo" ? 1 : undefined,
    occasion,
    destinations: uniq(destinations),
    rejectedDestinations: [],
    interests: uniq(interests),
    dislikes: [],
    mustHaves: [],
    durationDays: days ? Number(days) : undefined,
    flexibility,
    budgetTotalUsd: totalBudget ? money(totalBudget) : undefined,
    budgetPerPersonUsd: ppBudget ? money(ppBudget) : undefined,
    hotelTier,
    cabin,
    pace,
    confidence,
  };
}

export function consultationGaps(c: LiamConsultation): string[] {
  const gaps: string[] = [];
  if (!c.partyType && !c.partySize) gaps.push("who is traveling");
  if (!c.destinations.length && !c.dreamMoment) gaps.push("what kind of experience or destination feels compelling");
  if (!c.durationDays) gaps.push("rough trip length");
  if (!c.dateWindow && !c.flexibility) gaps.push("timing and date flexibility");
  if (!c.budgetTotalUsd && !c.budgetPerPersonUsd && !c.hotelTier) gaps.push("comfort level or budget orientation");
  if (!c.origin) gaps.push("departure city/airport when flight pricing matters");
  return gaps;
}

export function estimatePackage(c: LiamConsultation): PackageEstimate | null {
  const party = Math.max(1, c.partySize ?? (c.partyType === "couple" ? 2 : c.partyType === "family" ? 4 : 2));
  const days = c.durationDays ?? 7;
  if (c.budgetTotalUsd) {
    return {
      lowUsd: Math.round(c.budgetTotalUsd * 0.9),
      highUsd: Math.round(c.budgetTotalUsd * 1.1),
      perPersonLowUsd: Math.round((c.budgetTotalUsd * 0.9) / party),
      perPersonHighUsd: Math.round((c.budgetTotalUsd * 1.1) / party),
      assumptions: ["Centered on the budget the traveler stated", `${party} traveler(s)`, `${days}-day working duration`],
      confidence: c.durationDays ? "high" : "medium",
    };
  }

  const nightly: Record<NonNullable<LiamConsultation["hotelTier"]>, [number, number]> = {
    value: [140, 250], comfort: [220, 400], upscale: [350, 650], luxury: [650, 1300], ultra: [1200, 3000],
  };
  const flight: Record<NonNullable<LiamConsultation["cabin"]>, [number, number]> = {
    economy: [500, 1500], premium_economy: [900, 2400], business: [2500, 6500], first: [5000, 12000],
  };
  const [nightLow, nightHigh] = nightly[c.hotelTier ?? "upscale"];
  const [airLow, airHigh] = flight[c.cabin ?? "economy"];
  const nights = Math.max(2, days - 1);
  const roomCount = Math.max(1, Math.ceil(party / 2));
  const experiencesLow = 120 * days * party;
  const experiencesHigh = 350 * days * party;
  const low = airLow * party + nightly[c.hotelTier ?? "upscale"][0] * nights * roomCount + experiencesLow;
  const high = airHigh * party + nightHigh * nights * roomCount + experiencesHigh;
  return {
    lowUsd: Math.round(low), highUsd: Math.round(high), perPersonLowUsd: Math.round(low / party), perPersonHighUsd: Math.round(high / party),
    assumptions: [`${party} traveler(s)`, `${days} days / ${nights} nights`, `${c.hotelTier ?? "upscale"} accommodation working tier`, `${(c.cabin ?? "economy").replace("_", " ")} airfare working tier`, "Core transfers and curated experiences included; not a live quote"],
    confidence: c.durationDays && c.hotelTier && c.cabin ? "medium" : "low",
  };
}

export function consultationContext(c: LiamConsultation): string {
  const gaps = consultationGaps(c);
  const estimate = estimatePackage(c);
  return `## STRUCTURED CONSULTATION STATE\n${JSON.stringify({ ...c, gaps, estimate }, null, 2)}\nUse this state as a working brief. Never ask for information already known. Ask the single highest-value missing question, or at most two tightly related questions. Treat estimates as orientation only and explain their assumptions.`;
}
