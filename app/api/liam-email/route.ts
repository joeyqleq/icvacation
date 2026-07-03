import { NextResponse } from "next/server";
import { Resend } from "resend";

let resend: Resend | null = null;

function getResend() {
  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

const FROM_EMAIL = "Liam AI <liamai@icvacation.com>";
const CC_EMAIL = "info@icvacation.com";

function escapeHtml(s: string) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatContent(content: string): string {
  // Convert markdown-ish content to HTML for the email body
  return content
    .split("\n")
    .map((line) => {
      const escaped = escapeHtml(line);
      if (escaped.startsWith("**") && escaped.endsWith("**")) {
        return `<p style="margin:0 0 6px;font-weight:bold;color:#FFE500;">${escaped.slice(2, -2)}</p>`;
      }
      if (escaped.startsWith("## ")) {
        return `<p style="margin:14px 0 6px;font-size:13px;letter-spacing:0.18em;color:#26FC00;text-transform:uppercase;font-family:monospace;">${escaped.slice(3)}</p>`;
      }
      if (escaped.startsWith("# ")) {
        return `<p style="margin:14px 0 8px;font-size:17px;font-weight:bold;color:#FFE500;">${escaped.slice(2)}</p>`;
      }
      if (escaped.startsWith("- ") || escaped.startsWith("• ")) {
        return `<p style="margin:0 0 4px;padding-left:14px;color:#f7f7f5;">· ${escaped.slice(2)}</p>`;
      }
      if (escaped.trim() === "") {
        return `<div style="height:8px;"></div>`;
      }
      // Bold inline **text**
      const inlineBold = escaped.replace(/\*\*(.+?)\*\*/g, '<strong style="color:#FFE500;">$1</strong>');
      return `<p style="margin:0 0 6px;color:#e0e0e0;line-height:1.65;">${inlineBold}</p>`;
    })
    .join("");
}

function buildPackageHtml(name: string, content: string, packageTitle: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#050505;font-family:-apple-system,system-ui,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:24px 16px;">

    <!-- Header -->
    <div style="text-align:center;padding:32px 0 24px;border-bottom:1px solid #1a1a1a;">
      <p style="margin:0 0 6px;font-size:10px;letter-spacing:0.32em;color:#26FC00;text-transform:uppercase;font-family:monospace;">IC VACATION</p>
      <p style="margin:0;font-size:22px;font-weight:700;color:#ffffff;letter-spacing:-0.02em;">Liam <span style="color:#26FC00;">AI</span></p>
      <p style="margin:8px 0 0;font-size:12px;color:#555;letter-spacing:0.12em;font-family:monospace;">YOUR PERSONAL TRAVEL CONSULTANT</p>
    </div>

    <!-- Greeting -->
    <div style="padding:28px 0 18px;">
      <p style="margin:0 0 6px;font-size:10px;letter-spacing:0.24em;color:#26FC00;text-transform:uppercase;font-family:monospace;">Hello, ${escapeHtml(name)}</p>
      <p style="margin:0;font-size:15px;color:#c0c0c0;line-height:1.6;">Here is the vacation package recommendation Liam curated for you.</p>
    </div>

    <!-- Package Card -->
    <div style="background:#0d0d0d;border:1px solid #26FC00;border-radius:4px;overflow:hidden;margin-bottom:28px;">
      <div style="padding:18px 22px 14px;border-bottom:1px solid #1a1a1a;">
        <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.28em;color:#26FC00;text-transform:uppercase;font-family:monospace;">Trip Brief</p>
        <p style="margin:0;font-size:18px;font-weight:600;color:#FFE500;">${escapeHtml(packageTitle)}</p>
      </div>
      <div style="padding:20px 22px;">
        ${formatContent(content)}
      </div>
    </div>

    <!-- CTA -->
    <div style="background:#0d0d0d;border:1px solid #FFE500;padding:22px;text-align:center;margin-bottom:28px;">
      <p style="margin:0 0 6px;font-size:11px;letter-spacing:0.22em;color:#FFE500;text-transform:uppercase;font-family:monospace;">Ready to book?</p>
      <p style="margin:0 0 16px;font-size:14px;color:#c0c0c0;">Isaac personally reviews every brief and will craft your perfect itinerary.</p>
      <a href="tel:+14078101670" style="display:inline-block;background:#FFE500;color:#050505;font-family:monospace;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;padding:12px 28px;text-decoration:none;font-weight:700;">(407) 810-1670</a>
    </div>

    <!-- Footer -->
    <div style="text-align:center;padding-top:20px;border-top:1px solid #111;">
      <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.22em;color:#333;text-transform:uppercase;font-family:monospace;">IC Vacation · Luxury Travel Specialists</p>
      <p style="margin:0;font-size:10px;color:#333;">icvacation.com · info@icvacation.com</p>
    </div>

  </div>
</body>
</html>
  `.trim();
}

function buildTranscriptHtml(name: string, content: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#050505;font-family:-apple-system,system-ui,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:24px 16px;">

    <!-- Header -->
    <div style="text-align:center;padding:32px 0 24px;border-bottom:1px solid #1a1a1a;">
      <p style="margin:0 0 6px;font-size:10px;letter-spacing:0.32em;color:#26FC00;text-transform:uppercase;font-family:monospace;">IC VACATION</p>
      <p style="margin:0;font-size:22px;font-weight:700;color:#ffffff;letter-spacing:-0.02em;">Liam <span style="color:#26FC00;">AI</span></p>
      <p style="margin:8px 0 0;font-size:12px;color:#555;letter-spacing:0.12em;font-family:monospace;">YOUR PERSONAL TRAVEL CONSULTANT</p>
    </div>

    <!-- Greeting -->
    <div style="padding:28px 0 18px;">
      <p style="margin:0 0 6px;font-size:10px;letter-spacing:0.24em;color:#26FC00;text-transform:uppercase;font-family:monospace;">Hello, ${escapeHtml(name)}</p>
      <p style="margin:0;font-size:15px;color:#c0c0c0;line-height:1.6;">Here is a copy of your conversation with Liam AI. We hope it inspires your next adventure.</p>
    </div>

    <!-- Transcript -->
    <div style="background:#0d0d0d;border:1px solid #222;border-radius:4px;overflow:hidden;margin-bottom:28px;">
      <div style="padding:14px 22px;border-bottom:1px solid #1a1a1a;">
        <p style="margin:0;font-size:10px;letter-spacing:0.28em;color:#26FC00;text-transform:uppercase;font-family:monospace;">Conversation Transcript</p>
      </div>
      <div style="padding:20px 22px;">
        ${content
          .split("\n")
          .map((line) => {
            const escaped = escapeHtml(line);
            if (escaped.startsWith("You: ")) {
              return `<div style="margin-bottom:14px;"><p style="margin:0 0 3px;font-size:9px;letter-spacing:0.2em;color:#888;text-transform:uppercase;font-family:monospace;">You</p><p style="margin:0;color:#c0e0c0;font-size:13px;line-height:1.6;background:#0a1a0a;padding:10px 14px;border-left:2px solid #26FC00;">${escaped.slice(5)}</p></div>`;
            }
            if (escaped.startsWith("Liam: ")) {
              return `<div style="margin-bottom:14px;"><p style="margin:0 0 3px;font-size:9px;letter-spacing:0.2em;color:#888;text-transform:uppercase;font-family:monospace;">Liam AI</p><p style="margin:0;color:#e0e0e0;font-size:13px;line-height:1.6;padding:10px 14px;border-left:2px solid #444;">${escaped.slice(6)}</p></div>`;
            }
            if (escaped.trim() === "") return `<div style="height:6px;"></div>`;
            return `<p style="margin:0 0 6px;color:#888;font-size:12px;">${escaped}</p>`;
          })
          .join("")}
      </div>
    </div>

    <!-- CTA -->
    <div style="background:#0d0d0d;border:1px solid #FFE500;padding:22px;text-align:center;margin-bottom:28px;">
      <p style="margin:0 0 6px;font-size:11px;letter-spacing:0.22em;color:#FFE500;text-transform:uppercase;font-family:monospace;">Take the next step</p>
      <p style="margin:0 0 16px;font-size:14px;color:#c0c0c0;">Isaac personally reviews every brief and is ready to craft your perfect itinerary.</p>
      <a href="tel:+14078101670" style="display:inline-block;background:#FFE500;color:#050505;font-family:monospace;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;padding:12px 28px;text-decoration:none;font-weight:700;">(407) 810-1670</a>
    </div>

    <!-- Footer -->
    <div style="text-align:center;padding-top:20px;border-top:1px solid #111;">
      <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.22em;color:#333;text-transform:uppercase;font-family:monospace;">IC Vacation · Luxury Travel Specialists</p>
      <p style="margin:0;font-size:10px;color:#333;">icvacation.com · info@icvacation.com</p>
    </div>

  </div>
</body>
</html>
  `.trim();
}

export async function POST(req: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { ok: false, error: "Email is not configured." },
        { status: 503 }
      );
    }

    const body = await req.json();
    const {
      name = "",
      email = "",
      content = "",
      type = "package",
      packageTitle = "Your Recommended Itinerary",
    } = body ?? {};

    if (!name || !email) {
      return NextResponse.json(
        { ok: false, error: "Name and email are required." },
        { status: 400 }
      );
    }

    if (!content) {
      return NextResponse.json(
        { ok: false, error: "Content is required." },
        { status: 400 }
      );
    }

    const isTranscript = type === "transcript";
    const subject = isTranscript
      ? "Your Liam AI conversation transcript"
      : "Your IC Vacation recommendation";

    const html = isTranscript
      ? buildTranscriptHtml(name, content)
      : buildPackageHtml(name, content, packageTitle);

    const { error } = await getResend().emails.send({
      from: FROM_EMAIL,
      to: [email],
      cc: [CC_EMAIL],
      subject,
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
