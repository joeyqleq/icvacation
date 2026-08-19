import { NextResponse } from "next/server";
import { Resend } from "resend";

let resend: Resend | null = null;
function getResend() { if (!resend) resend = new Resend(process.env.RESEND_API_KEY); return resend; }

const FROM_EMAIL = process.env.LIAM_FROM_EMAIL ?? "Liam AI <liamai@icvacation.com>";
const ADVISOR_EMAIL = process.env.LIAM_ADVISOR_EMAIL ?? "info@icvacation.com";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(s: string) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

function formatContent(content: string) {
  return content.split("\n").map((line) => {
    const e = escapeHtml(line);
    if (/^#{1,3}\s/.test(e)) return `<h3 style="color:#FFE500;margin:18px 0 7px;font-size:15px">${e.replace(/^#{1,3}\s*/, "")}</h3>`;
    if (/^[-•]\s/.test(e)) return `<p style="color:#e8e8e5;margin:3px 0;padding-left:12px">• ${e.replace(/^[-•]\s*/, "")}</p>`;
    if (!e.trim()) return `<div style="height:8px"></div>`;
    return `<p style="color:#dededb;line-height:1.65;margin:0 0 7px">${e.replace(/\*\*(.+?)\*\*/g, "<strong style='color:#fff'>$1</strong>")}</p>`;
  }).join("");
}

function shell(title: string, body: string, footer: string) {
  return `<!doctype html><html><body style="margin:0;background:#050505;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"><div style="max-width:640px;margin:auto;padding:30px 18px"><div style="border-bottom:1px solid #242424;padding-bottom:20px;margin-bottom:22px"><div style="font-size:10px;letter-spacing:.28em;color:#26FC00;text-transform:uppercase">IC VACATION · LIAM</div><h1 style="color:white;font-size:24px;margin:7px 0 0">${escapeHtml(title)}</h1></div>${body}<div style="border-top:1px solid #242424;margin-top:28px;padding-top:18px;color:#777;font-size:12px;line-height:1.6">${footer}</div></div></body></html>`;
}

export async function POST(req: Request) {
  try {
    if (!process.env.RESEND_API_KEY) return NextResponse.json({ ok: false, error: "Email is not configured." }, { status: 503 });
    const body = await req.json();
    const name = String(body?.name ?? "Traveler").trim().slice(0, 120);
    const email = String(body?.email ?? "").trim().toLowerCase().slice(0, 254);
    const content = String(body?.content ?? "").trim().slice(0, 50000);
    const packageTitle = String(body?.packageTitle ?? "Your IC Vacation trip brief").trim().slice(0, 180);
    const advisorSummary = String(body?.advisorSummary ?? "").trim().slice(0, 20000);
    if (!EMAIL_RE.test(email)) return NextResponse.json({ ok: false, error: "A valid email is required." }, { status: 400 });
    if (!content) return NextResponse.json({ ok: false, error: "A completed trip brief is required." }, { status: 400 });

    const clientHtml = shell(packageTitle, `<p style="color:#aaa;line-height:1.6">Hello ${escapeHtml(name)},</p><p style="color:#aaa;line-height:1.6">Here is the trip brief Liam prepared for you. It is an orientation for your conversation with Isaac, not a booking confirmation or firm quote.</p><div style="background:#0d0d0d;border:1px solid #343434;border-radius:12px;padding:22px;margin-top:20px">${formatContent(content)}</div>`, `When you're ready to refine it, call Isaac at <strong style="color:#FFE500">(407) 810-1670</strong>. IC Vacation · icvacation.com`);

    const advisorHtml = shell(`New Liam brief · ${name}`, `<p style="color:#aaa;line-height:1.6"><strong style="color:#fff">Traveler:</strong> ${escapeHtml(name)}<br><strong style="color:#fff">Email:</strong> ${escapeHtml(email)}</p><div style="background:#0d0d0d;border:1px solid #26FC0044;border-radius:12px;padding:20px"><div style="color:#26FC00;font-size:10px;letter-spacing:.18em;text-transform:uppercase;margin-bottom:10px">Advisor summary</div>${formatContent(advisorSummary || "Liam completed a package brief. Review the recommendation below and follow up with the traveler.")}</div><div style="margin-top:18px;background:#0d0d0d;border:1px solid #343434;border-radius:12px;padding:20px"><div style="color:#FFE500;font-size:10px;letter-spacing:.18em;text-transform:uppercase;margin-bottom:10px">Package sent to traveler</div>${formatContent(content)}</div>`, `This is a concise advisor handoff generated from the travel consultation. Raw chat transcript is intentionally not emailed.`);

    const [clientResult, advisorResult] = await Promise.all([
      getResend().emails.send({ from: FROM_EMAIL, to: [email], subject: packageTitle, html: clientHtml }),
      getResend().emails.send({ from: FROM_EMAIL, to: [ADVISOR_EMAIL], replyTo: email, subject: `Liam handoff: ${name} · ${packageTitle}`, html: advisorHtml }),
    ]);
    if (clientResult.error || advisorResult.error) return NextResponse.json({ ok: false, error: clientResult.error?.message ?? advisorResult.error?.message ?? "Email delivery failed" }, { status: 502 });
    return NextResponse.json({ ok: true, clientSent: true, advisorSent: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: err instanceof Error ? err.message : "Unknown error" }, { status: 500 });
  }
}
