import { NextRequest, NextResponse } from "next/server";
import { getProfile, upsertProfile, extractSignals } from "@/lib/user-profile";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** GET /api/liam-profile?userId=xxx — load profile for system prompt injection */
export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  if (!userId) return NextResponse.json({ profile: null });
  const profile = await getProfile(userId);
  return NextResponse.json({ profile });
}

/** POST /api/liam-profile — save completed conversation signals */
export async function POST(req: NextRequest) {
  const { userId, userName, messages } = await req.json() as {
    userId: string;
    userName?: string | null;
    messages: { role: string; content: string }[];
  };

  if (!userId || !messages?.length) {
    return NextResponse.json({ ok: false, reason: "missing_fields" }, { status: 400 });
  }

  const signals = extractSignals(messages);
  if (userName) signals.name = userName;

  await upsertProfile(userId, signals);
  return NextResponse.json({ ok: true });
}
