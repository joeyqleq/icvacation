import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

let redis: Redis | null = null;

function getRedis() {
  if (!redis) {
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    });
  }
  return redis;
}

const LEAD_TTL = 60 * 60 * 24 * 365; // 1 year in seconds
const LEADS_INDEX_KEY = "liam:leads:index";

export interface LiamLead {
  name: string;
  email: string;
  type: "package" | "transcript";
  content: string;
  packageTitle?: string;
  createdAt: string;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name = "",
      email = "",
      type = "package",
      content = "",
      packageTitle,
    } = body ?? {};

    if (!name || !email) {
      return NextResponse.json(
        { ok: false, error: "Name and email are required." },
        { status: 400 }
      );
    }

    const timestamp = Date.now();
    const leadId = `liam:leads:${timestamp}`;
    const lead: LiamLead = {
      name,
      email,
      type,
      content,
      packageTitle: packageTitle ?? undefined,
      createdAt: new Date(timestamp).toISOString(),
    };

    const db = getRedis();

    // Store the lead record with 1-year TTL
    await db.set(leadId, lead, { ex: LEAD_TTL });

    // Add to sorted set index: score = timestamp (for chronological listing)
    await db.zadd(LEADS_INDEX_KEY, { score: timestamp, member: leadId });

    return NextResponse.json({ ok: true, leadId });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
