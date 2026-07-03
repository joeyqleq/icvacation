import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export interface UserProfile {
  userId: string;
  name: string | null;
  /** e.g. "luxury", "adventure", "family", "budget", "romance" */
  travelStyle: string[];
  /** destination names mentioned */
  destinations: string[];
  /** inferred budget bracket */
  budget: "budget" | "mid" | "luxury" | "ultra" | null;
  /** travel companions */
  groupType: "solo" | "couple" | "family" | "group" | null;
  /** notable interests e.g. "diving", "wine", "architecture" */
  interests: string[];
  /** ISO date of last conversation */
  lastSeen: string;
  /** total conversations stored */
  conversationCount: number;
}

const TTL_SECONDS = 60 * 60 * 24 * 180; // 6 months
const key = (userId: string) => `liam:profile:${userId}`;

export async function getProfile(userId: string): Promise<UserProfile | null> {
  try {
    const raw = await redis.get<UserProfile>(key(userId));
    return raw ?? null;
  } catch {
    return null;
  }
}

export async function upsertProfile(
  userId: string,
  updates: Partial<Omit<UserProfile, "userId">>
): Promise<void> {
  try {
    const existing = (await redis.get<UserProfile>(key(userId))) ?? defaultProfile(userId);
    const merged: UserProfile = {
      ...existing,
      ...updates,
      userId,
      travelStyle: dedupe([...existing.travelStyle, ...(updates.travelStyle ?? [])]).slice(0, 8),
      destinations: dedupe([...existing.destinations, ...(updates.destinations ?? [])]).slice(0, 12),
      interests: dedupe([...existing.interests, ...(updates.interests ?? [])]).slice(0, 10),
      lastSeen: new Date().toISOString().split("T")[0],
      conversationCount: existing.conversationCount + (updates.conversationCount ?? 0),
    };
    await redis.set(key(userId), merged, { ex: TTL_SECONDS });
  } catch {
    // Non-fatal — profile is enhancement only
  }
}

export function buildProfileBlock(profile: UserProfile): string {
  const lines: string[] = [];
  if (profile.name) lines.push(`Name: ${profile.name}`);
  if (profile.travelStyle.length) lines.push(`Travel style: ${profile.travelStyle.join(", ")}`);
  if (profile.destinations.length)
    lines.push(`Previously mentioned destinations: ${profile.destinations.join(", ")}`);
  if (profile.budget) lines.push(`Budget range: ${profile.budget}`);
  if (profile.groupType) lines.push(`Travels as: ${profile.groupType}`);
  if (profile.interests.length) lines.push(`Interests: ${profile.interests.join(", ")}`);
  if (profile.conversationCount > 1)
    lines.push(`Returning client (${profile.conversationCount} conversations)`);
  if (!lines.length) return "";
  return `## RETURNING CLIENT PROFILE\n${lines.join("\n")}\nUse this context to personalise the conversation naturally. Don't recite the profile back to them — just let it inform your tone and suggestions.`;
}

/** Extract profile signals from a completed conversation */
export function extractSignals(
  messages: { role: string; content: string }[]
): Partial<Omit<UserProfile, "userId">> {
  const text = messages
    .filter((m) => m.role === "user")
    .map((m) => m.content)
    .join(" ")
    .toLowerCase();

  const travelStyle: string[] = [];
  if (/\b(luxury|five.star|5.star|high.end|premium|exclusive)\b/.test(text)) travelStyle.push("luxury");
  if (/\b(adventure|hiking|trek|safari|diving|surf|kayak|ski)\b/.test(text)) travelStyle.push("adventure");
  if (/\b(family|kids|children|child|toddler|teen)\b/.test(text)) travelStyle.push("family");
  if (/\b(romantic|honeymoon|anniversary|couple|partner|spouse|wife|husband)\b/.test(text)) travelStyle.push("romance");
  if (/\b(cruise|ship|sailing|yacht)\b/.test(text)) travelStyle.push("cruise");
  if (/\b(culture|museum|history|architecture|art|food|wine|gastronomy)\b/.test(text)) travelStyle.push("cultural");
  if (/\b(beach|island|tropical|resort|pool|sun)\b/.test(text)) travelStyle.push("beach");
  if (/\b(budget|cheap|affordable|backpack)\b/.test(text)) travelStyle.push("budget");

  const budget: UserProfile["budget"] =
    /\b(ultra.luxury|private.jet|villa|overwater.bungalow)\b/.test(text)
      ? "ultra"
      : /\b(luxury|five.star|5.star)\b/.test(text)
      ? "luxury"
      : /\b(mid.range|moderate|comfortable)\b/.test(text)
      ? "mid"
      : /\b(budget|cheap|affordable)\b/.test(text)
      ? "budget"
      : null;

  const groupType: UserProfile["groupType"] =
    /\b(solo|alone|myself|by myself)\b/.test(text)
      ? "solo"
      : /\b(honeymoon|anniversary|just (the )?two|couple|partner|spouse|wife|husband|boyfriend|girlfriend)\b/.test(text)
      ? "couple"
      : /\b(kids|children|family|toddler|teen)\b/.test(text)
      ? "family"
      : /\b(group|friends|colleagues|team)\b/.test(text)
      ? "group"
      : null;

  const INTEREST_KEYWORDS: Record<string, RegExp> = {
    diving: /\b(diving|scuba|snorkel)\b/,
    wine: /\b(wine|vineyard|winery|sommelier)\b/,
    food: /\b(food|cuisine|gastronomy|restaurant|chef|culinary)\b/,
    architecture: /\b(architecture|cathedral|temple|mosque)\b/,
    wildlife: /\b(wildlife|safari|animals|birding|whale)\b/,
    golf: /\bgolf\b/,
    spa: /\b(spa|wellness|yoga|meditation|retreat)\b/,
    photography: /\b(photo|photography|landscape|shoot)\b/,
  };
  const interests = Object.entries(INTEREST_KEYWORDS)
    .filter(([, re]) => re.test(text))
    .map(([k]) => k);

  // Simple destination extraction — capitalised place names after travel verbs
  const destMatches = text.match(/\b(maldives|bali|paris|tokyo|rome|greece|tuscany|santorini|dubai|new york|london|safari|thailand|vietnam|costa rica|peru|patagonia|iceland|norway|seychelles|caribbean|amalfi|barcelona|portugal|morocco|kenya|tanzania|egypt|india|japan|australia|new zealand|fiji|hawaii|mexico|colombia|belize|cuba|croatia|turkey|jordan)\b/g) ?? [];
  const destinations = [...new Set(destMatches.map((d) => d.charAt(0).toUpperCase() + d.slice(1)))];

  return { travelStyle, budget: budget ?? undefined, groupType: groupType ?? undefined, interests, destinations, conversationCount: 1 };
}

function defaultProfile(userId: string): UserProfile {
  return {
    userId,
    name: null,
    travelStyle: [],
    destinations: [],
    budget: null,
    groupType: null,
    interests: [],
    lastSeen: new Date().toISOString().split("T")[0],
    conversationCount: 0,
  };
}

function dedupe<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}
