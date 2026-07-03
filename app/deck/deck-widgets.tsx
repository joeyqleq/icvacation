"use client";

import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────
   Animated counter — counts up when scrolled into view
───────────────────────────────────────────── */
export function AnimatedCounter({
  target,
  suffix = "",
  duration = 1800,
  className = "",
}: {
  target: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const [count, setCount] = useState(0);
  const [triggered, setTriggered] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          setTriggered(true);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [triggered]);

  useEffect(() => {
    if (!triggered) return;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [triggered, target, duration]);

  return (
    <span ref={ref} className={className}>
      {count}
      {suffix}
    </span>
  );
}

/* ─────────────────────────────────────────────
   Animated Funnel — visual funnel shape with conversion %
───────────────────────────────────────────── */
const FUNNEL_STAGES = [
  {
    label: "Website Visitors",
    detail: "Organic search, referrals, social media",
    pct: "100%",
    widthClass: "w-full",
    bgColor: "#1e1e1e",
    borderColor: "#333537",
    labelColor: "#f7f7f5",
    pctColor: "#8a8a86",
  },
  {
    label: "Engages with Liam AI",
    detail: "Asks a travel question",
    pct: "40%",
    widthClass: "w-[82%]",
    bgColor: "#0f1f0f",
    borderColor: "#26FC0030",
    labelColor: "#c4f7b4",
    pctColor: "#26FC0080",
  },
  {
    label: "Receives Personalized Brief",
    detail: "Liam builds a trip concept",
    pct: "20%",
    widthClass: "w-[64%]",
    bgColor: "#0a1a0a",
    borderColor: "#26FC0050",
    labelColor: "#9ef088",
    pctColor: "#26FC00aa",
  },
  {
    label: "Prompted to Call Isaac",
    detail: "Warm, qualified lead",
    pct: "8%",
    widthClass: "w-[46%]",
    bgColor: "#071507",
    borderColor: "#26FC0070",
    labelColor: "#6de85a",
    pctColor: "#26FC00cc",
  },
  {
    label: "Books with IC Vacation",
    detail: "Converted client",
    pct: "3%",
    widthClass: "w-[28%]",
    bgColor: "#041004",
    borderColor: "#26FC00",
    labelColor: "#26FC00",
    pctColor: "#26FC00",
  },
];

export function AnimatedFunnel() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="w-full">
      {/* Mobile: full-width stacked list with arrows */}
      <div className="flex flex-col items-center gap-0 md:hidden w-full">
        {FUNNEL_STAGES.map((stage, i) => (
          <div key={i} className="w-full flex flex-col items-center">
            <div
              className="w-full border px-4 py-4 flex items-center justify-between transition-all duration-700"
              style={{
                backgroundColor: stage.bgColor,
                borderColor: stage.borderColor,
                opacity: visible ? 1 : 0,
                transitionDelay: `${i * 120}ms`,
                transform: visible ? "translateY(0)" : "translateY(16px)",
              }}
            >
              <div>
                <div className="font-semibold text-sm" style={{ color: stage.labelColor }}>
                  {stage.label}
                </div>
                <div className="text-xs text-[#8a8a86] mt-0.5">{stage.detail}</div>
              </div>
              <div
                className="text-2xl font-bold font-mono ml-4 flex-shrink-0"
                style={{ color: stage.pctColor }}
              >
                {stage.pct}
              </div>
            </div>
            {i < FUNNEL_STAGES.length - 1 && (
              <div className="text-[#333537] text-lg leading-none py-0.5">▼</div>
            )}
          </div>
        ))}
      </div>

      {/* Desktop: visual funnel with trapezoid shapes */}
      <div className="hidden md:flex flex-col items-center gap-0 w-full">
        {FUNNEL_STAGES.map((stage, i) => (
          <div key={i} className="w-full flex flex-col items-center">
            <div
              className="flex items-center justify-between px-6 py-4 border transition-all duration-700"
              style={{
                width: stage.widthClass === "w-full" ? "100%" :
                  stage.widthClass === "w-[82%]" ? "82%" :
                  stage.widthClass === "w-[64%]" ? "64%" :
                  stage.widthClass === "w-[46%]" ? "46%" : "28%",
                backgroundColor: stage.bgColor,
                borderColor: stage.borderColor,
                opacity: visible ? 1 : 0,
                transitionDelay: `${i * 140}ms`,
                transform: visible ? "scaleX(1)" : "scaleX(0.85)",
                transformOrigin: "center",
              }}
            >
              <div className="flex items-center gap-4 min-w-0">
                <div
                  className="text-2xl font-bold font-mono flex-shrink-0"
                  style={{ color: stage.pctColor }}
                >
                  {stage.pct}
                </div>
                <div className="min-w-0">
                  <div
                    className="font-semibold text-sm truncate"
                    style={{ color: stage.labelColor }}
                  >
                    {stage.label}
                  </div>
                  <div className="text-xs text-[#8a8a86] truncate">{stage.detail}</div>
                </div>
              </div>
              {/* Step number */}
              <div
                className="text-xs font-mono text-[#333537] flex-shrink-0 ml-2"
              >
                {String(i + 1).padStart(2, "0")}
              </div>
            </div>
            {i < FUNNEL_STAGES.length - 1 && (
              <div
                className="transition-all duration-500"
                style={{
                  opacity: visible ? 1 : 0,
                  transitionDelay: `${i * 140 + 100}ms`,
                }}
              >
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                  <path d="M8 12L0 0h16L8 12z" fill="#26FC0030" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* bottom note */}
      <div
        className="mt-8 flex items-start gap-3 border border-[#252426] bg-[#0a0a0a] p-4 transition-all duration-700"
        style={{ opacity: visible ? 1 : 0, transitionDelay: "700ms" }}
      >
        <div className="w-1 h-full min-h-[2rem] bg-[#26FC00]/40 flex-shrink-0 self-stretch" />
        <p className="text-sm text-[#8a8a86] leading-relaxed">
          <span className="text-[#f7f7f5] font-semibold">Every lead that calls Isaac is already warm.</span>{" "}
          Liam handles the first conversation — qualifying intent, building a trip concept, and
          ensuring Isaac's time is spent on clients who are genuinely ready to book.
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Comparison table — Liam vs ChatGPT
───────────────────────────────────────────── */
const COMPARISON_ROWS = [
  { label: "Generic responses", chatgpt: true, liam: false },
  { label: "Knows Isaac's philosophy", chatgpt: false, liam: true },
  { label: "Deep travel domain knowledge across 6 verticals", chatgpt: false, liam: true },
  { label: "Builds a personalized trip brief", chatgpt: false, liam: true },
  { label: "Funnels to a real consultation call", chatgpt: false, liam: true },
  { label: "Boutique travel knowledge base", chatgpt: false, liam: true },
  { label: "Sends you somewhere useful", chatgpt: false, liam: true },
];

export function ComparisonTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="text-left py-3 px-4 text-[#8a8a86] text-sm font-mono uppercase tracking-wider border-b border-[#252426] w-1/2">
              Feature
            </th>
            <th className="py-3 px-4 text-center text-sm font-mono uppercase tracking-wider border-b border-[#252426] text-[#8a8a86]">
              ChatGPT
            </th>
            <th className="py-3 px-4 text-center text-sm font-mono uppercase tracking-wider border-b border-[#26FC00]/40 text-[#26FC00]">
              Liam
            </th>
          </tr>
        </thead>
        <tbody>
          {COMPARISON_ROWS.map((row, i) => (
            <tr
              key={i}
              className="border-b border-[#1a1a1a] hover:bg-[#0e0e0e] transition-colors duration-150"
            >
              <td className="py-3 px-4 text-sm text-[#f7f7f5]">{row.label}</td>
              <td className="py-3 px-4 text-center">
                {row.chatgpt ? (
                  <span className="text-[#444444] text-lg">✓</span>
                ) : (
                  <span className="text-[#333537] text-lg">✗</span>
                )}
              </td>
              <td className="py-3 px-4 text-center">
                {row.liam ? (
                  <span className="text-[#26FC00] text-lg">✓</span>
                ) : (
                  <span className="text-[#333537] text-lg">✗</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Response comparison — example prompt
───────────────────────────────────────────── */
export function ResponseComparison() {
  const [active, setActive] = useState<"generic" | "liam">("generic");

  return (
    <div className="space-y-4">
      {/* prompt */}
      <div className="border border-[#252426] bg-[#0e0e0e] p-4">
        <p className="text-xs font-mono text-[#8a8a86] uppercase tracking-wider mb-2">
          User asks:
        </p>
        <p className="text-[#FFE500] font-serif italic text-lg">
          &ldquo;We want a romantic river cruise for our anniversary. Where should we go?&rdquo;
        </p>
      </div>

      {/* tabs */}
      <div className="flex gap-0 border-b border-[#252426]">
        <button
          onClick={() => setActive("generic")}
          className={`px-5 py-2 text-sm font-mono uppercase tracking-wider transition-colors ${
            active === "generic"
              ? "text-[#f7f7f5] border-b-2 border-[#444444]"
              : "text-[#444444] hover:text-[#8a8a86]"
          }`}
        >
          Generic AI
        </button>
        <button
          onClick={() => setActive("liam")}
          className={`px-5 py-2 text-sm font-mono uppercase tracking-wider transition-colors ${
            active === "liam"
              ? "text-[#26FC00] border-b-2 border-[#26FC00]"
              : "text-[#444444] hover:text-[#8a8a86]"
          }`}
        >
          Liam
        </button>
      </div>

      {/* response */}
      <div className="border border-[#252426] bg-[#0a0a0a] p-5 min-h-[220px] transition-all duration-300">
        {active === "generic" ? (
          <div className="space-y-3 text-sm text-[#8a8a86] leading-relaxed">
            <p className="text-[#444444] font-mono text-xs uppercase tracking-wider mb-3">
              Generic AI response:
            </p>
            <p>
              Here are some popular romantic river cruise destinations for your
              anniversary:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>The Rhine River, through Germany and France</li>
              <li>The Danube River, visiting Vienna and Budapest</li>
              <li>The Seine River in France</li>
              <li>The Douro Valley in Portugal</li>
            </ul>
            <p>
              You can book through several major cruise lines. Prices vary by
              cabin type and season. Check their websites for availability.
            </p>
            <p className="text-[#333537] italic">
              [No further guidance. No follow-up. No contact.]
            </p>
          </div>
        ) : (
          <div className="space-y-3 text-sm leading-relaxed">
            <p className="text-[#26FC00] font-mono text-xs uppercase tracking-wider mb-3">
              Liam&apos;s response:
            </p>
            <p className="text-[#f7f7f5]">
              For a romantic anniversary, the{" "}
              <span className="text-[#26FC00]">
                Danube corridor — Nuremberg to Budapest
              </span>{" "}
              is a perfect match. Here&apos;s a concept for your trip:
            </p>
            <div className="border border-[#26FC00]/20 bg-[#26FC00]/05 p-3 space-y-1.5">
              <p className="text-[#FFE500] font-semibold text-xs uppercase tracking-wider">
                Trip Brief — Danube Romance, 7 Nights
              </p>
              <p className="text-[#8a8a86]">
                Day 1–2: Embark Nuremberg, meander through medieval Regensburg
              </p>
              <p className="text-[#8a8a86]">
                Day 3–4: Vienna — private wine tasting, candlelit dinner on deck
              </p>
              <p className="text-[#8a8a86]">
                Day 5–6: Budapest — panoramic evening cruise, spa day aboard
              </p>
              <p className="text-[#8a8a86]">
                Cabin: Suite with French balcony — double-wide river view,
                couples&apos; amenity package included
              </p>
            </div>
            <p className="text-[#f7f7f5]">
              Isaac has personally curated this route and knows the crew on
              several river vessels that run it.{" "}
              <span className="text-[#26FC00] font-semibold">
                Call him to finalize your dates — (407) 810-1670
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Filing cabinet component
───────────────────────────────────────────── */
export function FilingCabinet({
  count,
  label,
  description,
  color,
  items,
}: {
  count: number;
  label: string;
  description: string;
  color: string;
  items: string[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="border transition-all duration-300 cursor-pointer hover:border-opacity-60"
      style={{ borderColor: color + "30" }}
      onClick={() => setOpen(!open)}
    >
      {/* drawer header */}
      <div
        className="p-5 flex items-center justify-between"
        style={{ borderBottom: open ? `1px solid ${color}20` : "none" }}
      >
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 border flex items-center justify-center flex-shrink-0"
            style={{ borderColor: color + "40", backgroundColor: color + "08" }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke={color}
              strokeWidth="1.5"
            >
              <rect x="2" y="4" width="16" height="5" rx="0" />
              <rect x="2" y="11" width="16" height="5" rx="0" />
              <line x1="7" y1="6.5" x2="9" y2="6.5" strokeWidth="2" />
              <line x1="7" y1="13.5" x2="9" y2="13.5" strokeWidth="2" />
            </svg>
          </div>
          <div>
            <div
              className="text-3xl font-bold font-mono leading-none mb-0.5"
              style={{ color }}
            >
              <AnimatedCounter target={count} />
            </div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#8a8a86]">
              {label}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <p className="text-[#8a8a86] text-sm max-w-xs hidden sm:block">
            {description}
          </p>
          <div
            className="w-6 h-6 flex items-center justify-center transition-transform duration-300"
            style={{ color, transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 4l4 4 4-4" />
            </svg>
          </div>
        </div>
      </div>

      {/* drawer contents */}
      {open && (
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {items.map((item, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-[#8a8a86]">
              <span style={{ color, flexShrink: 0, marginTop: 2 }}>›</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   SEO checklist item
───────────────────────────────────────────── */
export function ChecklistItem({
  children,
  done = true,
}: {
  children: React.ReactNode;
  done?: boolean;
}) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-[#1a1a1a] last:border-0">
      <div
        className={`w-5 h-5 flex-shrink-0 flex items-center justify-center border mt-0.5 ${
          done
            ? "border-[#26FC00]/60 bg-[#26FC00]/10"
            : "border-[#333537] bg-transparent"
        }`}
      >
        {done ? (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none" stroke="#26FC00" strokeWidth="2">
            <path d="M1 4l3 3 5-6" />
          </svg>
        ) : (
          <div className="w-1.5 h-1.5 bg-[#333537] rounded-full" />
        )}
      </div>
      <div className="text-sm text-[#f7f7f5] leading-relaxed">{children}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   How Liam thinks — 3 step diagram
───────────────────────────────────────────── */
const THINK_STEPS = [
  {
    num: "1",
    title: "Reads your message",
    body: "Liam receives what you typed and understands the intent — are you planning a trip? Asking about a destination? Looking for a price range?",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#26FC00" strokeWidth="1.5">
        <rect x="3" y="5" width="22" height="18" rx="0" />
        <line x1="8" y1="11" x2="20" y2="11" />
        <line x1="8" y1="15" x2="16" y2="15" />
      </svg>
    ),
  },
  {
    num: "2",
    title: "Searches the library",
    body: "Liam looks through thousands of scraped pages across visa intelligence, cruise lines, hotels, destinations, aviation, and dining — every vertical a professional consultant would know.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#FFE500" strokeWidth="1.5">
        <circle cx="12" cy="12" r="8" />
        <line x1="18" y1="18" x2="24" y2="24" strokeWidth="2" />
      </svg>
    ),
  },
  {
    num: "3",
    title: "Writes a real answer",
    body: "Using what it found, Liam asks Microsoft Azure's AI cloud to write a helpful, specific response — like a very smart secretary who looks things up before answering.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#26FC00" strokeWidth="1.5">
        <path d="M5 22l4-2 12-12-2-2L7 20l-2 2z" />
        <path d="M19 6l3 3" />
      </svg>
    ),
  },
];

export function HowLiamThinks() {
  return (
    <div className="grid md:grid-cols-3 gap-0">
      {THINK_STEPS.map((step, i) => (
        <div
          key={i}
          className={`p-6 border-[#252426] ${
            i < 2
              ? "border-b md:border-b-0 md:border-r"
              : "border-b md:border-b-0"
          } border relative group hover:bg-[#0a0a0a] transition-colors duration-200`}
          style={{ borderColor: "#252426" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 border border-[#252426] flex items-center justify-center font-mono text-sm text-[#444444]">
              {step.num}
            </div>
            <div>{step.icon}</div>
          </div>
          <h4 className="font-semibold text-[#f7f7f5] mb-2">{step.title}</h4>
          <p className="text-sm text-[#8a8a86] leading-relaxed">{step.body}</p>
          {i < 2 && (
            <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 bg-[#050505] border border-[#252426] z-10 rotate-45" />
          )}
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   SEO Roadmap item
───────────────────────────────────────────── */
export function RoadmapItem({
  title,
  body,
  index,
}: {
  title: string;
  body: string;
  index: number;
}) {
  return (
    <div className="flex gap-4 items-start py-4 border-b border-[#1a1a1a] last:border-0 group">
      <div className="w-8 h-8 border border-[#FFE500]/30 bg-[#FFE500]/05 flex items-center justify-center flex-shrink-0 font-mono text-xs text-[#FFE500]">
        {String(index + 1).padStart(2, "0")}
      </div>
      <div>
        <div className="font-semibold text-[#f7f7f5] mb-1 group-hover:text-[#FFE500] transition-colors duration-200">
          {title}
        </div>
        <div className="text-sm text-[#8a8a86] leading-relaxed">{body}</div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Liam Architecture — Annette / Walt toggle views
───────────────────────────────────────────── */

// Annette view: plain-English animated flowchart
function AnnetteView() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const boxes = [
    { id: "user", label: "You type a message", sub: "Any device, any time", color: "#f7f7f5", border: "#333537", bg: "#0e0e0e" },
    { id: "liam", label: "Liam AI", sub: "Brain icon — reads your question", color: "#26FC00", border: "#26FC0050", bg: "#071507", highlight: true },
    { id: "kb", label: "Knowledge Base", sub: "Searches 2,400+ scraped pages", color: "#FFE500", border: "#FFE50040", bg: "#0e0d04" },
    { id: "web", label: "Live Web Search", sub: "Checks real-time sources", color: "#8a8a86", border: "#333537", bg: "#0a0a0a" },
    { id: "azure", label: "Azure AI writes response", sub: "Microsoft cloud composes the answer", color: "#4fc3f7", border: "#4fc3f740", bg: "#040a10" },
    { id: "stream", label: "Response streams back", sub: "Appears word-by-word in the chat", color: "#c4f7b4", border: "#26FC0030", bg: "#060e06" },
    { id: "map", label: "Map updates", sub: "Destination shown on live map", color: "#26FC00", border: "#26FC0060", bg: "#041004" },
  ];

  return (
    <div ref={ref} className="w-full">
      {/* You are here badge */}
      <div
        className="mb-6 inline-flex items-center gap-2 border border-[#26FC00]/40 bg-[#26FC00]/08 px-4 py-2 transition-all duration-500"
        style={{ opacity: visible ? 1 : 0 }}
      >
        <div className="w-2 h-2 rounded-full bg-[#26FC00] animate-pulse" />
        <span className="text-xs font-mono text-[#26FC00] uppercase tracking-wider">You are here — icvacation.com/liam</span>
      </div>

      {/* Flow boxes — single column on mobile, 2-col grid on md+ */}
      <div className="flex flex-col items-center gap-0 w-full">
        {boxes.map((box, i) => (
          <div key={box.id} className="w-full flex flex-col items-center">
            <div
              className={`w-full md:w-3/4 border px-5 py-4 flex items-center gap-4 transition-all duration-700 ${box.highlight ? "shadow-[0_0_20px_rgba(38,252,0,0.15)]" : ""}`}
              style={{
                backgroundColor: box.bg,
                borderColor: box.border,
                opacity: visible ? 1 : 0,
                transitionDelay: `${i * 100}ms`,
                transform: visible ? "translateX(0)" : i % 2 === 0 ? "translateX(-20px)" : "translateX(20px)",
              }}
            >
              {/* icon placeholder */}
              <div
                className="w-10 h-10 border flex items-center justify-center flex-shrink-0"
                style={{ borderColor: box.border, backgroundColor: box.color + "15" }}
              >
                {box.id === "liam" && (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke={box.color} strokeWidth="1.5">
                    <circle cx="9" cy="9" r="7" />
                    <path d="M6 9h6M9 6v6" />
                  </svg>
                )}
                {box.id === "kb" && (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke={box.color} strokeWidth="1.5">
                    <rect x="2" y="3" width="14" height="4" />
                    <rect x="2" y="9" width="14" height="4" />
                  </svg>
                )}
                {box.id === "web" && (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke={box.color} strokeWidth="1.5">
                    <circle cx="9" cy="9" r="7" />
                    <path d="M9 2a10 10 0 010 14M9 2a10 10 0 000 14" />
                    <line x1="2" y1="9" x2="16" y2="9" />
                  </svg>
                )}
                {box.id === "azure" && (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke={box.color} strokeWidth="1.5">
                    <path d="M2 14l5-10 4 7-2 3H2z" />
                    <path d="M10 7l3-1 3 8h-5" />
                  </svg>
                )}
                {box.id === "stream" && (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke={box.color} strokeWidth="1.5">
                    <path d="M2 5h14M2 9h10M2 13h12" />
                  </svg>
                )}
                {box.id === "map" && (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke={box.color} strokeWidth="1.5">
                    <path d="M9 2C6.2 2 4 4.2 4 7c0 4 5 9 5 9s5-5 5-9c0-2.8-2.2-5-5-5z" />
                    <circle cx="9" cy="7" r="1.5" />
                  </svg>
                )}
                {box.id === "user" && (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke={box.color} strokeWidth="1.5">
                    <rect x="2" y="12" width="14" height="4" rx="1" />
                    <path d="M6 12v-2a3 3 0 016 0v2" />
                    <circle cx="9" cy="6" r="3" />
                  </svg>
                )}
              </div>
              <div>
                <div className="font-semibold text-sm" style={{ color: box.color }}>{box.label}</div>
                <div className="text-xs text-[#8a8a86] mt-0.5">{box.sub}</div>
              </div>
            </div>
            {i < boxes.length - 1 && (
              <div
                className="flex flex-col items-center gap-0.5 py-1 transition-all duration-500"
                style={{ opacity: visible ? 1 : 0, transitionDelay: `${i * 100 + 80}ms` }}
              >
                {/* animated dashed connector */}
                <div className="w-px h-4 border-l-2 border-dashed border-[#26FC00]/30" />
                <svg width="8" height="6" viewBox="0 0 8 6" fill="#26FC0040">
                  <path d="M4 6L0 0h8z" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Walt view: enterprise technical architecture SVG diagram
function WaltView() {
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);

  const cols = [
    {
      title: "Client Layer",
      color: "#26FC00",
      items: [
        { name: "Browser (Next.js SSR)", sub: "React 18 · App Router", color: "#26FC00", bg: "#071507", desc: "Server-side rendered Next.js app. Hydrates to React on the client." },
        { name: "Mobile Viewport", sub: "Responsive Tailwind CSS", color: "#26FC00", bg: "#071507", desc: "Fully responsive layout. Touch-optimized chat interface." },
        { name: "SessionStorage", sub: "Conversation state", color: "#9ef088", bg: "#050e05", desc: "Stores the active Liam chat session in the browser." },
        { name: "localStorage (userId)", sub: "Persistent profile key", color: "#9ef088", bg: "#050e05", desc: "Stores an anonymous userId to persist the visitor's Liam profile across visits." },
      ],
    },
    {
      title: "API Layer",
      color: "#FFE500",
      items: [
        { name: "/api/liam-chat", sub: "SSE stream · POST", color: "#FFE500", bg: "#0e0d04", desc: "Server-Sent Events endpoint. Streams Liam's response token-by-token to the browser." },
        { name: "/api/liam-profile", sub: "GET · POST", color: "#FFE500", bg: "#0e0d04", desc: "Reads and writes the visitor's trip preferences to Upstash Redis." },
        { name: "/api/liam-email", sub: "POST · Resend", color: "#FFE500", bg: "#0e0d04", desc: "Sends Liam's trip brief to Isaac via Resend transactional email." },
        { name: "/api/liam-search/*", sub: "flights · hotels · airports · fx", color: "#d4b800", bg: "#0a0a03", desc: "Proxy endpoints for Nuitee liteAPI (hotels), SerpAPI (flights), exchange rates, and airport lookups." },
      ],
    },
    {
      title: "External Services",
      color: "#4fc3f7",
      items: [
        { name: "Azure OpenAI", sub: "GPT-4o · Node.js runtime", color: "#4fc3f7", bg: "#04080f", desc: "Anthropic-class LLM via Microsoft Azure. Generates Liam's natural language responses." },
        { name: "Azure AI Search", sub: "RAG · Vector index", color: "#4fc3f7", bg: "#04080f", desc: "Retrieval-Augmented Generation. Searches 2,400+ knowledge base documents by semantic similarity." },
        { name: "Upstash Redis", sub: "REST API · Edge-compatible", color: "#DC382D", bg: "#0f0404", desc: "Stores visitor profiles and rate-limiting state. Edge-compatible serverless Redis." },
        { name: "Resend Email", sub: "Transactional · REST API", color: "#f7a8a8", bg: "#0f0606", desc: "Sends trip briefs and lead notifications to Isaac's inbox." },
        { name: "SerpAPI / Tavily", sub: "Web search · REST", color: "#d4b800", bg: "#0a0a03", desc: "Real-time web search so Liam can answer time-sensitive questions about flights and destinations." },
        { name: "Nuitee liteAPI", sub: "Hotel search · REST", color: "#d4b800", bg: "#0a0a03", desc: "Live hotel availability and pricing data from the liteAPI hotel distribution platform." },
      ],
    },
  ];

  return (
    <div className="w-full">
      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-6 text-xs font-mono">
        {[
          { color: "#26FC00", label: "Internal / Client" },
          { color: "#FFE500", label: "Internal / API" },
          { color: "#4fc3f7", label: "Azure (Microsoft)" },
          { color: "#DC382D", label: "Redis" },
          { color: "#d4b800", label: "Third-party" },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: l.color }} />
            <span className="text-[#8a8a86]">{l.label}</span>
          </div>
        ))}
      </div>

      {/* Architecture grid — horizontal scroll on mobile */}
      <div className="overflow-x-auto">
        <div className="min-w-[640px] grid grid-cols-3 gap-4">
          {cols.map((col) => (
            <div key={col.title}>
              <div
                className="font-mono text-xs uppercase tracking-wider mb-3 pb-2 border-b"
                style={{ color: col.color, borderColor: col.color + "30" }}
              >
                {col.title}
              </div>
              <div className="flex flex-col gap-2">
                {col.items.map((item) => (
                  <div
                    key={item.name}
                    className="border px-3 py-3 cursor-default transition-all duration-200 hover:scale-[1.02] relative"
                    style={{ backgroundColor: item.bg, borderColor: item.color + "50" }}
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setTooltip({ text: item.desc, x: rect.left, y: rect.bottom + 4 });
                    }}
                    onMouseLeave={() => setTooltip(null)}
                  >
                    <div className="font-semibold text-xs mb-0.5" style={{ color: item.color }}>
                      {item.name}
                    </div>
                    <div className="text-xs text-[#555555] font-mono">{item.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Data flow footer */}
      <div className="mt-6 border border-[#1a1a1a] bg-[#0a0a0a] p-4">
        <div className="font-mono text-xs text-[#444444] uppercase tracking-wider mb-3">Data flow</div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs">
          {[
            { from: "Browser", arrow: "POST →", to: "/api/liam-chat", method: "JSON body" },
            { from: "/api/liam-chat", arrow: "SSE ←", to: "Browser", method: "token stream" },
            { from: "/api/liam-chat", arrow: "REST →", to: "Azure OpenAI", method: "chat/completions" },
            { from: "/api/liam-chat", arrow: "REST →", to: "Azure AI Search", method: "vector search" },
            { from: "/api/liam-profile", arrow: "REST →", to: "Upstash Redis", method: "GET/SET" },
          ].map((row, i) => (
            <div key={i} className="flex items-center gap-1 text-[#8a8a86]">
              <span className="text-[#444444]">{row.from}</span>
              <span className="text-[#26FC00]/60">{row.arrow}</span>
              <span className="text-[#444444]">{row.to}</span>
              <span className="text-[#333537]">({row.method})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tooltip rendered as fixed overlay */}
      {tooltip && (
        <div
          className="fixed z-50 max-w-xs border border-[#333537] bg-[#0e0e0e] px-3 py-2 text-xs text-[#c4c4c0] shadow-xl pointer-events-none"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  );
}

export function LiamArchitecture() {
  const [view, setView] = useState<"annette" | "walt">("annette");

  return (
    <div className="w-full">
      {/* View toggle */}
      <div className="flex gap-0 mb-8 border border-[#252426] w-fit">
        <button
          onClick={() => setView("annette")}
          className={`px-6 py-3 text-sm font-mono uppercase tracking-wider transition-all duration-200 ${
            view === "annette"
              ? "bg-[#26FC00]/10 text-[#26FC00] border-r border-[#26FC00]/30"
              : "text-[#444444] hover:text-[#8a8a86] border-r border-[#252426]"
          }`}
        >
          Annette View
        </button>
        <button
          onClick={() => setView("walt")}
          className={`px-6 py-3 text-sm font-mono uppercase tracking-wider transition-all duration-200 ${
            view === "walt"
              ? "bg-[#4fc3f7]/10 text-[#4fc3f7]"
              : "text-[#444444] hover:text-[#8a8a86]"
          }`}
        >
          Walt View
        </button>
      </div>

      {/* View label */}
      <div className="mb-6">
        {view === "annette" ? (
          <p className="text-xs font-mono text-[#8a8a86] uppercase tracking-wider">
            Plain-English — how it works, step by step
          </p>
        ) : (
          <p className="text-xs font-mono text-[#8a8a86] uppercase tracking-wider">
            Technical architecture — services, APIs, and data flow
          </p>
        )}
      </div>

      {view === "annette" ? <AnnetteView /> : <WaltView />}
    </div>
  );
}
