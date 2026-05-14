import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Dev-phase recipient — change to a CRM/inbox later
const TO_EMAIL = "eojiraam@gmail.com";
const FROM_EMAIL = "IC Vacation Inquiry <contact-form@icvacation.com>";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name = "",
      email = "",
      phone = "",
      departureCity = "",
      destination = "",
      travelDates = "",
      travelers = "",
      tripStyle = "",
      budget = "",
      occasion = "",
      message = "",
    } = body ?? {};

    if (!name || !email) {
      return NextResponse.json(
        { ok: false, error: "Name and email are required." },
        { status: 400 }
      );
    }

    const html = `
      <div style="font-family: -apple-system, system-ui, sans-serif; background:#0a0a0a; color:#f7f7f5; padding:32px;">
        <div style="max-width:560px;margin:0 auto;background:#111;border:1px solid #222;border-radius:14px;overflow:hidden;">
          <div style="padding:24px 28px;border-bottom:1px solid #222;">
            <p style="margin:0;font-size:11px;letter-spacing:0.24em;color:#26FC00;text-transform:uppercase;">New consultation inquiry</p>
            <h1 style="margin:6px 0 0;font-size:22px;color:#FDF972;letter-spacing:-0.01em;">${escapeHtml(name)}</h1>
          </div>
          <div style="padding:24px 28px;">
            ${row("Email", email)}
            ${row("Phone", phone)}
            ${row("Departure city", departureCity)}
            ${row("Destination of interest", destination)}
            ${row("Travel dates", travelDates)}
            ${row("Travelers", travelers)}
            ${row("Trip style", tripStyle)}
            ${row("Budget tier", budget)}
            ${row("Occasion", occasion)}
            ${
              message
                ? `<div style="margin-top:18px;padding-top:18px;border-top:1px solid #222;">
                     <p style="font-size:11px;letter-spacing:0.24em;color:#697174;text-transform:uppercase;margin:0 0 8px;">Message</p>
                     <p style="margin:0;color:#f7f7f5;line-height:1.55;">${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
                   </div>`
                : ""
            }
          </div>
          <div style="padding:14px 28px;background:#0a0a0a;border-top:1px solid #222;">
            <p style="margin:0;font-size:10px;letter-spacing:0.24em;color:#697174;text-transform:uppercase;">icvacation.com · contact form</p>
          </div>
        </div>
      </div>
    `;

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      replyTo: email,
      subject: `New inquiry — ${name}${destination ? ` · ${destination}` : ""}`,
      html,
    });

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}

function row(label: string, value: string) {
  if (!value) return "";
  return `
    <div style="margin-bottom:12px;">
      <p style="margin:0;font-size:10px;letter-spacing:0.24em;color:#697174;text-transform:uppercase;">${label}</p>
      <p style="margin:2px 0 0;color:#f7f7f5;font-size:14px;">${escapeHtml(value)}</p>
    </div>
  `;
}

function escapeHtml(s: string) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
