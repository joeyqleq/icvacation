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
    detail: "Liam AI builds a trip concept",
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
              <div className="text-[#333537] text-lg leading-none py-0.5">&#9660;</div>
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
          Liam AI handles the first conversation — qualifying intent, building a trip concept, and
          ensuring Isaac&apos;s time is spent on clients who are genuinely ready to book.
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Comparison table — Liam AI vs ChatGPT
───────────────────────────────────────────── */
const COMPARISON_ROWS = [
  { label: "Generic responses", chatgpt: true, liam: false },
  { label: "Knows Isaac's philosophy", chatgpt: false, liam: true },
  { label: "Deep travel domain knowledge across 7 verticals", chatgpt: false, liam: true },
  { label: "Builds a personalized trip brief", chatgpt: false, liam: true },
  { label: "Funnels to a real consultation call", chatgpt: false, liam: true },
  { label: "Boutique travel knowledge base", chatgpt: false, liam: true },
  { label: "Sends you somewhere useful", chatgpt: false, liam: true },
];

export function ComparisonTable() {
  return (
    <div
      className="overflow-x-auto"
      style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.1) transparent" }}
    >
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
              Liam AI
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
                  <span className="text-[#444444] text-lg">&#10003;</span>
                ) : (
                  <span className="text-[#333537] text-lg">&#10007;</span>
                )}
              </td>
              <td className="py-3 px-4 text-center">
                {row.liam ? (
                  <span className="text-[#26FC00] text-lg">&#10003;</span>
                ) : (
                  <span className="text-[#333537] text-lg">&#10007;</span>
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
          Liam AI
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
              Liam AI&apos;s response:
            </p>
            <p className="text-[#f7f7f5]">
              For a romantic anniversary, the{" "}
              <span className="text-[#26FC00]">
                Danube corridor — Nuremberg to Budapest
              </span>{" "}
              is a perfect match. Here&apos;s a concept for your trip:
            </p>
            <div className="border border-[#26FC00]/20 bg-[#26FC00]/5 p-3 space-y-1.5">
              <p className="text-[#FFE500] font-semibold text-xs uppercase tracking-wider">
                Trip Brief — Danube Romance, 7 Nights
              </p>
              <p className="text-[#8a8a86]">
                Day 1&ndash;2: Embark Nuremberg, meander through medieval Regensburg
              </p>
              <p className="text-[#8a8a86]">
                Day 3&ndash;4: Vienna — private wine tasting, candlelit dinner on deck
              </p>
              <p className="text-[#8a8a86]">
                Day 5&ndash;6: Budapest — panoramic evening cruise, spa day aboard
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
              <span style={{ color, flexShrink: 0, marginTop: 2 }}>&#8250;</span>
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
   How Liam AI thinks — 3 step diagram
───────────────────────────────────────────── */
const THINK_STEPS = [
  {
    num: "1",
    title: "Reads your message",
    body: "Liam AI receives what you typed and understands the intent — are you planning a trip? Asking about a destination? Looking for a price range?",
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
    body: "Liam AI looks through thousands of scraped pages across visa intelligence, cruise lines, hotels, destinations, aviation, and dining — every vertical a professional consultant would know.",
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
    body: "Using what it found, Liam AI asks Microsoft Azure's AI cloud to write a helpful, specific response — like a very smart secretary who looks things up before answering.",
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
      <div className="w-8 h-8 border border-[#FFE500]/30 bg-[#FFE500]/5 flex items-center justify-center flex-shrink-0 font-mono text-xs text-[#FFE500]">
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

  const boxes: { id: string; label: string; sub: string; color: string; border: string; bg: string; highlight?: boolean }[] = [
    { id: "user", label: "You type a message", sub: "Any device, any time", color: "#f7f7f5", border: "#333537", bg: "#0e0e0e" },
    { id: "liam", label: "Liam AI", sub: "Brain — reads your question", color: "#26FC00", border: "#26FC0050", bg: "#071507", highlight: true },
    { id: "kb", label: "Knowledge Base", sub: "Searches 2,400+ scraped pages", color: "#FFE500", border: "#FFE50040", bg: "#0e0d04" },
    { id: "web", label: "Live Web Search", sub: "Checks real-time sources", color: "#8a8a86", border: "#333537", bg: "#0a0a0a" },
    { id: "azure", label: "Azure AI writes response", sub: "Microsoft cloud composes the answer", color: "#4fc3f7", border: "#4fc3f740", bg: "#040a10" },
    { id: "stream", label: "Response streams back", sub: "Appears word-by-word in the chat", color: "#c4f7b4", border: "#26FC0030", bg: "#060e06" },
    { id: "map", label: "Map updates", sub: "Destination shown on live map", color: "#26FC00", border: "#26FC0060", bg: "#041004" },
  ];

  type BoxId = (typeof boxes)[number]["id"];

  return (
    <div ref={ref} className="w-full">
      {/* You are here badge */}
      <div
        className="mb-6 inline-flex items-center gap-2 border border-[#26FC00]/40 px-4 py-2 transition-all duration-500"
        style={{ opacity: visible ? 1 : 0, backgroundColor: "rgba(38,252,0,0.08)" }}
      >
        <div className="w-2 h-2 rounded-full bg-[#26FC00] animate-pulse" />
        <span className="text-xs font-mono text-[#26FC00] uppercase tracking-wider">You are here — icvacation.com/liam</span>
      </div>

      {/* Flow boxes */}
      <div className="flex flex-col items-center gap-0 w-full">
        {boxes.map((box, i) => {
          const id = box.id as BoxId;
          return (
            <div key={id} className="w-full flex flex-col items-center">
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
                <div
                  className="w-10 h-10 border flex items-center justify-center flex-shrink-0"
                  style={{ borderColor: box.border, backgroundColor: box.color + "15" }}
                >
                  {id === "liam" && (
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke={box.color} strokeWidth="1.5">
                      <circle cx="9" cy="9" r="7" />
                      <path d="M6 9h6M9 6v6" />
                    </svg>
                  )}
                  {id === "kb" && (
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke={box.color} strokeWidth="1.5">
                      <rect x="2" y="3" width="14" height="4" />
                      <rect x="2" y="9" width="14" height="4" />
                    </svg>
                  )}
                  {id === "web" && (
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke={box.color} strokeWidth="1.5">
                      <circle cx="9" cy="9" r="7" />
                      <path d="M9 2a10 10 0 010 14M9 2a10 10 0 000 14" />
                      <line x1="2" y1="9" x2="16" y2="9" />
                    </svg>
                  )}
                  {id === "azure" && (
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke={box.color} strokeWidth="1.5">
                      <path d="M2 14l5-10 4 7-2 3H2z" />
                      <path d="M10 7l3-1 3 8h-5" />
                    </svg>
                  )}
                  {id === "stream" && (
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke={box.color} strokeWidth="1.5">
                      <path d="M2 5h14M2 9h10M2 13h12" />
                    </svg>
                  )}
                  {id === "map" && (
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke={box.color} strokeWidth="1.5">
                      <path d="M9 2C6.2 2 4 4.2 4 7c0 4 5 9 5 9s5-5 5-9c0-2.8-2.2-5-5-5z" />
                      <circle cx="9" cy="7" r="1.5" />
                    </svg>
                  )}
                  {id === "user" && (
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
                  <div className="w-px h-4 border-l-2 border-dashed border-[#26FC00]/30" />
                  <svg width="8" height="6" viewBox="0 0 8 6" fill="#26FC0040">
                    <path d="M4 6L0 0h8z" />
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Walt view: animated SVG multi-directional node diagram
function WaltView() {
  const [simulating, setSimulating] = useState(false);
  const [simStep, setSimStep] = useState(0);

  const runSimulation = () => {
    if (simulating) return;
    setSimulating(true);
    setSimStep(0);
    let step = 0;
    const totalSteps = 6;
    const interval = setInterval(() => {
      step++;
      setSimStep(step);
      if (step >= totalSteps) {
        clearInterval(interval);
        setTimeout(() => {
          setSimulating(false);
          setSimStep(0);
        }, 1500);
      }
    }, 600);
  };

  const catColor = {
    internal: "#26FC00",
    azure: "#4fc3f7",
    third: "#FFE500",
    redis: "#DC382D",
  } as const;

  type NodeCat = keyof typeof catColor;

  type NodeDef = {
    id: string;
    label: string;
    sub: string;
    cat: NodeCat;
    top: string;
    left: string;
  };

  const nodes: NodeDef[] = [
    { id: "user",    label: "User / Browser",        sub: "visitor input",                          cat: "internal", top: "2%",  left: "40%" },
    { id: "nextjs",  label: "Next.js SSR",            sub: "app layer",                              cat: "internal", top: "16%", left: "5%"  },
    { id: "brain",   label: "Liam AI Brain",          sub: "/api/liam-chat",                         cat: "internal", top: "38%", left: "36%" },
    { id: "azure-o", label: "Azure OpenAI",           sub: "gpt-5.4-mini (Azure OpenAI)",            cat: "azure",    top: "16%", left: "68%" },
    { id: "azure-s", label: "Azure AI Search",        sub: "RAG · vector · 2,400+ pages",            cat: "azure",    top: "30%", left: "74%" },
    { id: "redis-m", label: "Upstash Redis Memory",   sub: "per-device profiles · insights",         cat: "redis",    top: "55%", left: "68%" },
    { id: "redis-l", label: "Lead Storage (Redis)",   sub: "liam:leads:* · sorted set · 1yr TTL",    cat: "redis",    top: "72%", left: "50%" },
    { id: "resend",  label: "Resend Email",           sub: "transcripts · lead notifications",       cat: "third",    top: "72%", left: "28%" },
    { id: "nuites",  label: "Nuitée liteAPI",         sub: "hotel availability & pricing",           cat: "third",    top: "60%", left: "8%"  },
    { id: "serp",    label: "SerpAPI",                sub: "flights · hotels · live search",         cat: "third",    top: "45%", left: "2%"  },
    { id: "fx",      label: "Exchange Rate API",      sub: "live FX · 170 currencies",               cat: "third",    top: "30%", left: "8%"  },
    { id: "weather", label: "OpenWeatherMap",         sub: "live weather by destination",            cat: "third",    top: "20%", left: "22%" },
    { id: "geo",     label: "OpenCage Geocoder",      sub: "place name to coordinates",              cat: "third",    top: "36%", left: "16%" },
    { id: "tavily",  label: "Tavily",                 sub: "deep web context · REST API",            cat: "third",    top: "52%", left: "20%" },
  ];

  const simHighlight: Record<number, string[]> = {
    1: ["user"],
    2: ["brain"],
    3: ["azure-s", "tavily", "redis-m"],
    4: ["azure-o"],
    5: ["brain"],
    6: ["user"],
  };

  const isHighlighted = (id: string) =>
    simulating && simStep > 0 && (simHighlight[simStep] ?? []).includes(id);

  const isBrainActive = simulating && simStep > 0;

  type Edge = [string, string, string, boolean?];
  const edges: Edge[] = [
    ["user",    "brain",   "#26FC00"],
    ["brain",   "user",    "#26FC00"],
    ["nextjs",  "brain",   "#26FC00"],
    ["brain",   "azure-o", "#4fc3f7"],
    ["azure-o", "brain",   "#4fc3f7"],
    ["brain",   "azure-s", "#4fc3f7"],
    ["azure-s", "brain",   "#4fc3f7"],
    ["brain",   "redis-m", "#DC382D", true],
    ["redis-m", "brain",   "#DC382D", true],
    ["brain",   "redis-l", "#DC382D"],
    ["brain",   "resend",  "#FFE500"],
    ["brain",   "nuites",  "#FFE500"],
    ["brain",   "serp",    "#FFE500"],
    ["brain",   "fx",      "#FFE500"],
    ["brain",   "weather", "#FFE500"],
    ["brain",   "geo",     "#FFE500"],
    ["brain",   "tavily",  "#FFE500"],
  ];

  const nodeCenter = (n: NodeDef) => ({
    x: parseFloat(n.left) + 8,
    y: parseFloat(n.top) + 3,
  });

  const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <div className="w-full">
      <style>{`
        @keyframes dashFlowWalt {
          to { stroke-dashoffset: -20; }
        }
        @keyframes brainGlowWalt {
          0%, 100% { box-shadow: 0 0 16px 2px rgba(38,252,0,0.35); }
          50% { box-shadow: 0 0 32px 8px rgba(38,252,0,0.65); }
        }
        .brain-glow-walt { animation: brainGlowWalt 2s ease-in-out infinite; }
        .edge-dash-walt { animation: dashFlowWalt 1.2s linear infinite; }
      `}</style>

      {/* Legend + simulate button */}
      <div className="flex flex-wrap gap-4 mb-4 text-xs font-mono items-center">
        {([
          { color: catColor.internal, label: "Internal" },
          { color: catColor.azure,    label: "Azure (Microsoft)" },
          { color: catColor.redis,    label: "Redis" },
          { color: catColor.third,    label: "Third-party API" },
        ] as { color: string; label: string }[]).map((l) => (
          <div key={l.label} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: l.color }} />
            <span className="text-[#8a8a86]">{l.label}</span>
          </div>
        ))}
        <button
          onClick={runSimulation}
          disabled={simulating}
          className="ml-auto px-4 py-1.5 border text-xs font-mono uppercase tracking-wider transition-all duration-200 disabled:opacity-40"
          style={{
            borderColor: "#26FC0060",
            color: "#26FC00",
            backgroundColor: simulating ? "#26FC0010" : "transparent",
          }}
        >
          {simulating ? `Step ${simStep}/6 — simulating…` : "▶ Simulate Request"}
        </button>
      </div>

      {/* Diagram — horizontally scrollable on mobile */}
      <div
        className="overflow-x-auto"
        style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.1) transparent" }}
      >
        <div className="relative" style={{ minWidth: "700px", minHeight: "640px" }}>
          {/* SVG edges */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 0 }}
          >
            <defs>
              {(["green", "blue", "yellow", "red"] as const).map((name) => {
                const colors: Record<string, string> = {
                  green: "#26FC00", blue: "#4fc3f7", yellow: "#FFE500", red: "#DC382D",
                };
                return (
                  <marker
                    key={name}
                    id={`arrow-wv2-${name}`}
                    markerWidth="6"
                    markerHeight="6"
                    refX="5"
                    refY="3"
                    orient="auto"
                  >
                    <path d="M0,0 L0,6 L6,3 z" fill={colors[name]} opacity="0.7" />
                  </marker>
                );
              })}
            </defs>

            {edges.map(([fromId, toId, color, dashed], i) => {
              const from = nodeMap[fromId];
              const to = nodeMap[toId];
              if (!from || !to) return null;
              const fc = nodeCenter(from);
              const tc = nodeCenter(to);
              const arrowName =
                color === "#26FC00" ? "green" :
                color === "#4fc3f7" ? "blue" :
                color === "#FFE500" ? "yellow" : "red";
              const isActive =
                simulating &&
                simStep > 0 &&
                (simHighlight[simStep] ?? []).some((h) => h === fromId || h === toId);
              return (
                <line
                  key={i}
                  x1={`${fc.x}%`}
                  y1={`${fc.y}%`}
                  x2={`${tc.x}%`}
                  y2={`${tc.y}%`}
                  stroke={color}
                  strokeWidth={isActive ? "2" : "1"}
                  strokeOpacity={isActive ? "0.9" : "0.25"}
                  strokeDasharray={dashed ? "6 4" : undefined}
                  className={dashed ? "edge-dash-walt" : undefined}
                  markerEnd={`url(#arrow-wv2-${arrowName})`}
                />
              );
            })}
          </svg>

          {/* Nodes */}
          {nodes.map((node) => {
            const color = catColor[node.cat];
            const highlighted = isHighlighted(node.id);
            const isBrain = node.id === "brain";
            return (
              <div
                key={node.id}
                className={`absolute border px-3 py-2 transition-all duration-300 ${isBrain ? "brain-glow-walt" : ""}`}
                style={{
                  top: node.top,
                  left: node.left,
                  borderColor: highlighted ? color : color + "50",
                  backgroundColor: highlighted ? color + "18" : color + "08",
                  zIndex: 1,
                  minWidth: isBrain ? "160px" : "148px",
                  boxShadow: isBrain && isBrainActive ? `0 0 24px 6px ${color}50` : undefined,
                  transform: highlighted ? "scale(1.05)" : "scale(1)",
                }}
              >
                <div
                  className="font-semibold text-xs leading-tight"
                  style={{ color: highlighted ? color : color + "cc" }}
                >
                  {isBrain ? (
                    <span className="flex items-center gap-1.5">
                      <img src="/liam-ai_logo.png" alt="Liam AI" className="w-4 h-4 object-contain inline-block" />
                      {node.label}
                    </span>
                  ) : node.label}
                </div>
                <div className="text-[10px] text-[#555] font-mono mt-0.5 leading-tight">{node.sub}</div>
              </div>
            );
          })}

          {/* Memory loop label */}
          <div
            className="absolute text-[10px] font-mono italic pointer-events-none"
            style={{ top: "49%", left: "63%", zIndex: 2, color: "rgba(220,56,45,0.6)" }}
          >
            logs &amp; learns &#8635;
          </div>
        </div>
      </div>

      {/* Sim step indicator */}
      {simulating && (
        <div className="mt-4 border border-[#26FC00]/20 p-3" style={{ backgroundColor: "rgba(38,252,0,0.05)" }}>
          <div className="text-xs font-mono text-[#26FC00] mb-2 uppercase tracking-wider">Request pipeline — live</div>
          <div className="flex gap-2 flex-wrap">
            {[
              "User → Brain",
              "Brain activates",
              "RAG + Tavily + Profile",
              "Azure OpenAI streams",
              "Brain assembles",
              "Response → User",
            ].map((label, i) => (
              <div
                key={i}
                className="px-2 py-1 border text-xs font-mono transition-all duration-300"
                style={{
                  borderColor: simStep > i ? "#26FC00" : "#252426",
                  color: simStep > i ? "#26FC00" : "#444",
                  backgroundColor: simStep === i + 1 ? "rgba(38,252,0,0.08)" : "transparent",
                }}
              >
                {i + 1}. {label}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Request pipeline table */}
      <div className="mt-6 border border-[#1a1a1a] bg-[#0a0a0a] p-4">
        <div className="font-mono text-xs text-[#444444] uppercase tracking-wider mb-3">Request pipeline — every conversation</div>
        <div className="space-y-1.5">
          {[
            ["Step 1", "User types message",           "POST /api/liam-chat"],
            ["Step 2", "Parallel fetch",               "Azure AI Search (RAG, 6 docs) + Tavily + Redis profile"],
            ["Step 3", "System prompt assembled",      "base + RAG context + profile + aggregate insights"],
            ["Step 4", "Azure OpenAI gpt-5.4-mini",   "streams response (SSE)"],
            ["Step 5", "Frontend renders",             "stream token-by-token"],
            ["Step 6", "On conversation end",          "profile saved to Redis + aggregate insights updated"],
          ].map(([step, label, detail], i) => (
            <div key={i} className="flex items-start gap-3 text-xs">
              <span className="font-mono text-[#26FC00]/60 flex-shrink-0 w-14">{step}</span>
              <span className="text-[#8a8a86] flex-shrink-0 w-44">{label}</span>
              <span className="text-[#444]">{detail}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Memory loop explanation */}
      <div className="mt-4 border-l-2 border-[#DC382D]/40 pl-4 py-1">
        <p className="text-sm text-[#8a8a86] leading-relaxed">
          <span className="text-[#f7f7f5] font-semibold">Every conversation leaves a fingerprint.</span>{" "}
          User preferences (destinations, travel style, budget, group type) are extracted and stored in Upstash Redis against the device ID. These feed back into the system prompt on the next visit — Liam AI already knows who you are. Aggregate patterns across all visitors inform suggestions for new users. Over time, the system self-calibrates to the real audience IC Vacation attracts.
        </p>
      </div>
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

/* ─────────────────────────────────────────────
   Memory & Learning — Annette / Walt toggle
───────────────────────────────────────────── */

function LearningAnnetteView() {
  return (
    <div className="space-y-8">
      <p className="text-[#8a8a86] leading-relaxed max-w-2xl">
        Every conversation Liam AI has is a lesson. Not in the abstract — literally. After each chat, it stores what it learned about that visitor and uses it next time they come back.
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="border border-[#333537] bg-[#0a0a0a] p-5">
          <p className="font-mono text-xs text-[#444444] uppercase tracking-wider mb-4">First visit</p>
          <div className="space-y-3 text-sm">
            <div className="border-l-2 border-[#333537] pl-3 text-[#8a8a86] italic">
              &ldquo;Hi! What kind of travel are you dreaming about?&rdquo;
            </div>
            <div className="text-[#444] text-xs">Liam AI starts fresh &mdash; asks questions, learns preferences, builds a picture.</div>
            <div className="space-y-1.5 text-xs text-[#555]">
              <div>&mdash; Learns: solo or couple</div>
              <div>&mdash; Learns: cruise vs. land</div>
              <div>&mdash; Learns: budget tier</div>
              <div>&mdash; Learns: preferred destinations</div>
            </div>
            <div className="border border-[#26FC00]/20 px-3 py-2 text-xs text-[#9ef088]" style={{ backgroundColor: "rgba(38,252,0,0.05)" }}>
              Stored in Upstash Redis against device ID &mdash; expires after 6 months
            </div>
          </div>
        </div>

        <div className="border border-[#26FC00]/30 p-5" style={{ backgroundColor: "rgba(38,252,0,0.05)" }}>
          <p className="font-mono text-xs text-[#26FC00] uppercase tracking-wider mb-4">Return visit</p>
          <div className="space-y-3 text-sm">
            <div className="border-l-2 border-[#26FC00]/50 pl-3 text-[#c4f7b4] italic">
              &ldquo;Welcome back. Last time we talked about a Danube river cruise for your anniversary &mdash; shall we pick up where we left off?&rdquo;
            </div>
            <div className="text-[#8a8a86] text-xs">Liam AI already knows who you are. No re-introduction needed.</div>
            <div className="space-y-1.5 text-xs text-[#6de85a]">
              <div>&#10003; Knows: traveling as a couple</div>
              <div>&#10003; Knows: river cruise preference</div>
              <div>&#10003; Knows: luxury tier</div>
              <div>&#10003; Knows: anniversary trip</div>
            </div>
            <div className="border border-[#26FC00]/30 px-3 py-2 text-xs text-[#26FC00]" style={{ backgroundColor: "rgba(38,252,0,0.08)" }}>
              Profile injected into system prompt before every conversation
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 text-[#8a8a86] leading-relaxed">
        <p>
          Even brand-new visitors benefit from this system. Aggregate patterns across all conversations &mdash; destinations mentioned most often, budget tiers, travel styles &mdash; softly inform Liam AI&apos;s suggestions for first-timers. If 80% of IC Vacation visitors are interested in luxury river cruises, Liam AI&apos;s default suggestions reflect that.
        </p>
        <p>
          This is not just personalization &mdash; it&apos;s <span className="text-[#f7f7f5] font-semibold">progressive calibration</span>. The more people chat with Liam AI, the better it understands the IC Vacation audience. Over time, every conversation makes the next one slightly better.
        </p>
      </div>
    </div>
  );
}

function LearningWaltView() {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-3">
        {[
          {
            key: "liam:profile:{userId}",
            ttl: "6-month TTL",
            color: "#DC382D",
            contents: [
              'destinations: ["Danube", "Amalfi"]',
              'travelStyle: "luxury"',
              'groupType: "couple"',
              'budgetTier: "premium"',
              'interests: ["cruise", "food"]',
              'lastSeen: "2026-07-04"',
            ],
            why: "6-month TTL: stale preferences auto-expire. No frozen profiles.",
          },
          {
            key: "liam:aggregate:insights",
            ttl: "no expiry",
            color: "#FFE500",
            contents: [
              'topDestinations: ["Caribbean", "Danube"]',
              'topStyles: ["luxury", "boutique"]',
              'topGroups: ["couple", "family"]',
              'avgBudgetTier: "premium"',
              "totalConversations: 1247",
            ],
            why: "Cold-start optimization: new visitors get warm suggestions informed by real patterns.",
          },
          {
            key: "liam:leads:{timestamp}",
            ttl: "1-year TTL",
            color: "#f7a8a8",
            contents: [
              'name: "Sarah M."',
              'email: "sarah@.."',
              'type: "email_capture"',
              'packageTitle: "Danube Romance"',
              "timestamp: 1751622400",
            ],
            why: "Sorted set: liam:leads:index enables chronological retrieval. No SQL needed.",
          },
        ].map((block) => (
          <div key={block.key} className="border" style={{ borderColor: block.color + "30" }}>
            <div className="px-3 py-2 border-b" style={{ borderColor: block.color + "20", backgroundColor: block.color + "08" }}>
              <div className="font-mono text-xs font-semibold" style={{ color: block.color }}>{block.key}</div>
              <div className="text-[10px] text-[#555] mt-0.5">{block.ttl}</div>
            </div>
            <div className="p-3 space-y-1">
              {block.contents.map((line, i) => (
                <div key={i} className="font-mono text-[10px] text-[#8a8a86]">{line}</div>
              ))}
            </div>
            <div className="px-3 py-2 border-t text-[10px] text-[#555] italic" style={{ borderColor: block.color + "15" }}>
              {block.why}
            </div>
          </div>
        ))}
      </div>

      <div className="border border-[#252426] bg-[#0a0a0a] p-4">
        <div className="font-mono text-xs text-[#FFE500] uppercase tracking-wider mb-3">extractSignals() &mdash; how preferences are extracted</div>
        <p className="text-sm text-[#8a8a86] leading-relaxed mb-3">
          After each conversation, a lightweight signal-extraction pass runs over the user&apos;s messages using regex pattern matching to identify:
        </p>
        <div className="grid grid-cols-2 gap-2 text-xs font-mono">
          {[
            ["destinations", 'regex: country/city name patterns → "Danube", "Japan"'],
            ["travel style", "keywords: luxury, boutique, budget, backpacker"],
            ["budget tier", "ranges: $1k-$5k = mid, $5k+ = premium"],
            ["group type", "keywords: solo, couple, family, friends, honeymoon"],
            ["interests", "themes: cruise, food, wildlife, culture, wellness"],
          ].map(([signal, rule], i) => (
            <div key={i} className="border border-[#1a1a1a] px-2 py-1.5">
              <div className="text-[#4fc3f7]">{signal}</div>
              <div className="text-[#555] text-[10px] mt-0.5">{rule}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function LiamLearning() {
  const [view, setView] = useState<"annette" | "walt">("annette");

  return (
    <div className="w-full">
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
      <div className="mb-6">
        <p className="text-xs font-mono text-[#8a8a86] uppercase tracking-wider">
          {view === "annette" ? "Plain-English — memory, learning, personalization" : "Technical — Redis keys, TTLs, signal extraction"}
        </p>
      </div>
      {view === "annette" ? <LearningAnnetteView /> : <LearningWaltView />}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Email Capture & Leads — Annette / Walt toggle
───────────────────────────────────────────── */

function LeadsAnnetteView() {
  return (
    <div className="space-y-8">
      <p className="text-[#8a8a86] leading-relaxed max-w-2xl">
        Liam AI captures leads in three ways &mdash; all of them natural, none of them pushy. Every method ends the same way: Isaac gets an email and a lead record is saved.
      </p>

      <div className="grid md:grid-cols-3 gap-4">
        {[
          {
            num: "01",
            title: "Package button",
            color: "#26FC00",
            body: 'After Liam AI builds a trip brief, a button appears in the chat: "Email this to me". This opens a branded popup with name and email fields. The brief lands in the visitor\'s inbox — and a copy goes straight to Isaac.',
            tag: "Highest-intent lead",
          },
          {
            num: "02",
            title: "Chat footer",
            color: "#FFE500",
            body: 'At any point in the conversation, visitors can click "Email transcript" in the chat footer. They get everything discussed so far. Isaac gets notified immediately.',
            tag: "Mid-conversation lead",
          },
          {
            num: "03",
            title: "Natural language",
            color: "#4fc3f7",
            body: 'Visitors can say "email me this" in the chat. Or Liam AI proactively offers: "Would you like me to send this to your inbox?" — appearing naturally after a package is delivered.',
            tag: "Organic lead",
          },
        ].map((card) => (
          <div key={card.num} className="border p-5" style={{ borderColor: card.color + "30" }}>
            <div className="font-mono text-2xl font-bold mb-1" style={{ color: card.color + "40" }}>{card.num}</div>
            <div className="font-semibold text-[#f7f7f5] mb-2">{card.title}</div>
            <p className="text-sm text-[#8a8a86] leading-relaxed mb-3">{card.body}</p>
            <div className="inline-block border px-2 py-0.5 text-xs font-mono" style={{ borderColor: card.color + "40", color: card.color }}>
              {card.tag}
            </div>
          </div>
        ))}
      </div>

      <div className="border border-[#252426] bg-[#0a0a0a] p-5">
        <p className="font-mono text-xs text-[#444444] uppercase tracking-wider mb-3">What happens after a lead is captured</p>
        <div className="flex flex-col sm:flex-row gap-0 items-stretch">
          {[
            { label: "Email sent via Resend", sub: "FROM: liamai@icvacation.com\nCC: info@icvacation.com", color: "#26FC00" },
            { label: "Lead saved to Redis", sub: "liam:leads:{timestamp}\n1-year TTL + sorted set", color: "#DC382D" },
            { label: "Isaac is notified", sub: "Instantly — no delay,\nno dashboard to check", color: "#FFE500" },
          ].map((step, i) => (
            <div key={i} className="flex-1 flex items-center">
              <div className="flex-1 border px-4 py-3 text-center" style={{ borderColor: step.color + "30" }}>
                <div className="text-sm font-semibold" style={{ color: step.color }}>{step.label}</div>
                <div className="text-xs text-[#555] font-mono mt-1 whitespace-pre-line">{step.sub}</div>
              </div>
              {i < 2 && <div className="text-[#333537] px-1 text-lg flex-shrink-0">&rarr;</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LeadsWaltView() {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="border border-[#FFE500]/20 p-4" style={{ backgroundColor: "#0a0a03" }}>
          <div className="font-mono text-xs text-[#FFE500] uppercase tracking-wider mb-3">POST /api/liam-email</div>
          <div className="space-y-1.5 text-xs font-mono text-[#8a8a86]">
            <div>&rarr; Resend API (transactional email)</div>
            <div className="pl-3 text-[#555]">FROM: liamai@icvacation.com</div>
            <div className="pl-3 text-[#555]">TO: &#123;user_email&#125;</div>
            <div className="pl-3 text-[#555]">CC: info@icvacation.com</div>
            <div className="pl-3 text-[#555]">subject: &ldquo;Your Liam AI Trip Brief&rdquo;</div>
            <div className="pl-3 text-[#555]">html: branded IC Vacation template</div>
          </div>
        </div>
        <div className="border border-[#DC382D]/20 p-4" style={{ backgroundColor: "#0f0404" }}>
          <div className="font-mono text-xs text-[#DC382D] uppercase tracking-wider mb-3">POST /api/liam-leads</div>
          <div className="space-y-1.5 text-xs font-mono text-[#8a8a86]">
            <div>&rarr; Upstash Redis (serverless KV)</div>
            <div className="pl-3 text-[#555]">SET liam:leads:&#123;timestamp&#125;</div>
            <div className="pl-3 text-[#555]">ZADD liam:leads:index &#123;timestamp&#125; key</div>
            <div className="pl-3 text-[#555]">EXPIRE key 31536000 (1 year)</div>
          </div>
        </div>
      </div>

      <div className="border border-[#252426] bg-[#0a0a0a] p-4">
        <div className="font-mono text-xs text-[#4fc3f7] uppercase tracking-wider mb-3">Lead data model</div>
        <div className="font-mono text-xs text-[#8a8a86] space-y-0.5">
          <div><span className="text-[#26FC00]">&#123;</span></div>
          <div className="pl-4"><span className="text-[#FFE500]">name</span><span className="text-[#555]">: &ldquo;Sarah M.&rdquo;,</span></div>
          <div className="pl-4"><span className="text-[#FFE500]">email</span><span className="text-[#555]">: &ldquo;sarah@example.com&rdquo;,</span></div>
          <div className="pl-4"><span className="text-[#FFE500]">type</span><span className="text-[#555]">: &ldquo;email_capture&rdquo; | &ldquo;transcript&rdquo; | &ldquo;natural_language&rdquo;,</span></div>
          <div className="pl-4"><span className="text-[#FFE500]">content</span><span className="text-[#555]">: &ldquo;&lt;full trip brief or transcript&gt;&rdquo;,</span></div>
          <div className="pl-4"><span className="text-[#FFE500]">packageTitle</span><span className="text-[#555]">: &ldquo;Danube Romance, 7 Nights&rdquo;,</span></div>
          <div className="pl-4"><span className="text-[#FFE500]">timestamp</span><span className="text-[#555]">: 1751622400</span></div>
          <div><span className="text-[#26FC00]">&#125;</span></div>
        </div>
      </div>

      <div className="border-l-2 border-[#DC382D]/40 pl-4 py-1">
        <p className="text-sm text-[#8a8a86] leading-relaxed">
          <span className="text-[#f7f7f5] font-semibold">Why Redis sorted set?</span>{" "}
          Chronological retrieval without a database. <code className="text-xs" style={{ color: "rgba(220,56,45,0.8)" }}>ZRANGE liam:leads:index 0 -1 WITHSCORES</code> returns all leads ordered by timestamp. No SQL, no schema migrations, serverless-native. 1-year TTL auto-purges stale entries.
        </p>
      </div>
    </div>
  );
}

export function LiamLeads() {
  const [view, setView] = useState<"annette" | "walt">("annette");

  return (
    <div className="w-full">
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
      <div className="mb-6">
        <p className="text-xs font-mono text-[#8a8a86] uppercase tracking-wider">
          {view === "annette" ? "Plain-English — three capture paths, zero friction" : "Technical — API routes, Redis schema, data model"}
        </p>
      </div>
      {view === "annette" ? <LeadsAnnetteView /> : <LeadsWaltView />}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Guardrails — Annette / Walt toggle
───────────────────────────────────────────── */

function GuardrailsAnnetteView() {
  const cards = [
    {
      label: "Off-topic redirect",
      color: "#FFE500",
      quote: "That’s outside my lane — I’m purely a travel consultant. What I can do is help you plan something worth talking about. Are you thinking about a specific part of the world?",
      trigger: "If asked about anything unrelated to travel",
    },
    {
      label: "No booking",
      color: "#4fc3f7",
      quote: "Booking isn’t what I do — that’s Isaac’s world. What I do is make sure when you speak to him, you don’t waste a minute. Ready to call? (407) 810-1670.",
      trigger: "If someone asks to book directly",
    },
    {
      label: "Personality anchor",
      color: "#26FC00",
      quote: "I’m Liam AI — IC Vacation’s travel consultant. Let’s talk about where you want to go.",
      trigger: "If someone asks whether Liam AI is an AI",
    },
  ];

  return (
    <div className="space-y-8">
      <p className="text-[#8a8a86] leading-relaxed max-w-2xl">
        Liam AI has a defined personality and strict rules about what it will and won&apos;t do. These aren&apos;t restrictions bolted on after the fact &mdash; they&apos;re encoded directly into the system prompt that runs before every single conversation.
      </p>

      <div className="grid md:grid-cols-3 gap-4">
        {cards.map((card) => (
          <div key={card.label} className="border p-5 space-y-3" style={{ borderColor: card.color + "30" }}>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-[#555] mb-1">{card.trigger}</p>
              <p className="font-semibold text-sm" style={{ color: card.color }}>{card.label}</p>
            </div>
            <p className="text-sm text-[#8a8a86] italic leading-relaxed">&ldquo;{card.quote}&rdquo;</p>
          </div>
        ))}
      </div>

      <div className="space-y-4 text-[#8a8a86] leading-relaxed">
        <p>
          Liam AI will only discuss travel. Ask it to help you write an email, solve a coding problem, or discuss politics &mdash; and it redirects. Politely, but firmly. Every time.
        </p>
        <p>
          It never pretends to book anything. It never makes up prices (it gives rough ranges, defers specifics to Isaac). It never claims to be a human &mdash; but it also doesn&apos;t introduce itself as &ldquo;an AI.&rdquo; It says &ldquo;I&apos;m Liam AI.&rdquo;
        </p>
        <p>
          Its entire personality &mdash; the warmth, the curiosity, the restraint, the way it ends every package with Isaac&apos;s phone number &mdash; is defined in a system prompt that runs before every conversation.
        </p>
      </div>
    </div>
  );
}

function GuardrailsWaltView() {
  const sections = [
    { title: "WHO YOU REPRESENT", color: "#26FC00", desc: "Isaac’s philosophy, 14+ years, Signature Travel Network, boutique practice, personal handling" },
    { title: "YOUR PERSONALITY", color: "#FFE500", desc: "8 traits: warm, curious, polished, conversational, evocative, precise, opinionated, professional" },
    { title: "CONVERSATION METHODOLOGY", color: "#4fc3f7", desc: "Phase 1 Learn → Phase 2 Recommend → Phase 3 Brief. Max 2 questions per response." },
    { title: "TOPIC GUARDRAILS", color: "#f7a8a8", desc: "Allowed: travel, destinations, hotels, flights, cultural etiquette, visas, packing, itineraries. Not allowed: everything else." },
    { title: "EMAIL CAPTURE OPPORTUNITIES", color: "#FFE500", desc: "Natural offer post-package. Triggers EMAIL_CAPTURE_REQUESTED signal when user accepts." },
    { title: "DESTINATION DETECTION FOR MAP", color: "#26FC00", desc: "Appends destination JSON block to every message mentioning a place name." },
    { title: "RESPONSE RULES", color: "#8a8a86", desc: "Under 300 words (unless full package). No hollow affirmations. No booking platforms. No firm prices." },
  ];

  return (
    <div className="space-y-6">
      <div className="border border-[#252426] bg-[#0a0a0a] p-4">
        <div className="font-mono text-xs text-[#444444] uppercase tracking-wider mb-4">System prompt structure &mdash; injected before every conversation</div>
        <div className="space-y-2">
          {sections.map((s, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="font-mono text-[10px] text-[#333537] flex-shrink-0 mt-0.5 w-5">{String(i + 1).padStart(2, "0")}</div>
              <div className="flex-1 border-l pl-3 py-1" style={{ borderColor: s.color + "40" }}>
                <div className="font-mono text-xs font-semibold" style={{ color: s.color }}>{s.title}</div>
                <div className="text-xs text-[#555] mt-0.5">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-3 text-xs">
        <div className="border border-[#26FC00]/20 p-3 text-center" style={{ backgroundColor: "rgba(38,252,0,0.05)" }}>
          <div className="font-bold text-[#26FC00] text-lg font-mono">~200</div>
          <div className="text-[#8a8a86] mt-1">lines in base system prompt</div>
        </div>
        <div className="border border-[#4fc3f7]/20 p-3 text-center" style={{ backgroundColor: "rgba(79,195,247,0.05)" }}>
          <div className="font-bold text-[#4fc3f7] text-lg font-mono">6 docs</div>
          <div className="text-[#8a8a86] mt-1">RAG context injected per request</div>
        </div>
        <div className="border border-[#DC382D]/20 p-3 text-center" style={{ backgroundColor: "rgba(220,56,45,0.05)" }}>
          <div className="font-bold text-[#DC382D] text-lg font-mono">+profile</div>
          <div className="text-[#8a8a86] mt-1">Redis profile + aggregate insights</div>
        </div>
      </div>

      <div className="border-l-2 border-[#FFE500]/40 pl-4 py-1">
        <p className="text-sm text-[#8a8a86] leading-relaxed">
          Every message Liam AI receives is prefixed with ~200 lines of base system prompt + up to 6 RAG documents from Azure AI Search + the visitor&apos;s Redis profile + aggregate insights from all past conversations. The model sees all of this before it reads the user&apos;s actual message.
        </p>
      </div>
    </div>
  );
}

export function LiamGuardrails() {
  const [view, setView] = useState<"annette" | "walt">("annette");

  return (
    <div className="w-full">
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
      <div className="mb-6">
        <p className="text-xs font-mono text-[#8a8a86] uppercase tracking-wider">
          {view === "annette" ? "Plain-English — how Liam AI stays on task" : "Technical — system prompt structure and composition"}
        </p>
      </div>
      {view === "annette" ? <GuardrailsAnnetteView /> : <GuardrailsWaltView />}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Evaluation — Annette / Walt toggle
───────────────────────────────────────────── */

function EvaluationAnnetteView() {
  const dimensions = [
    { num: "01", title: "Package completeness", desc: "Does the generated package include all 6 required sections: destination overview, itinerary, accommodation, experiences, practical notes, and price range?", color: "#26FC00" },
    { num: "02", title: "Destination accuracy", desc: "Does Liam AI recommend destinations consistent with what the visitor asked for? No recommending ski resorts to someone who asked for tropical beaches.", color: "#FFE500" },
    { num: "03", title: "Personalization score", desc: "Does the response reference what the visitor actually said — their travel style, group type, budget tier? Or is it a generic response that ignores the conversation?", color: "#4fc3f7" },
    { num: "04", title: "Guardrail adherence", desc: "Does Liam AI stay on-topic? Does it avoid making up prices, claiming to book trips, or pretending to be human?", color: "#f7a8a8" },
    { num: "05", title: "CTA delivery", desc: "Does every package mention Isaac and his phone number (407) 810-1670? The whole point of Liam AI is to generate qualified calls.", color: "#26FC00" },
  ];

  return (
    <div className="space-y-8">
      <p className="text-[#8a8a86] leading-relaxed max-w-2xl">
        Adding more data to a RAG system doesn&apos;t automatically make it better. More content can even hurt &mdash; if it&apos;s noisy, contradictory, or off-topic. We need to measure whether Liam AI is actually improving.
      </p>

      <div className="space-y-3">
        {dimensions.map((d) => (
          <div key={d.num} className="flex items-start gap-4 border border-[#1a1a1a] p-4">
            <div className="font-mono text-lg font-bold flex-shrink-0" style={{ color: d.color + "40" }}>{d.num}</div>
            <div>
              <p className="font-semibold text-[#f7f7f5] mb-1">{d.title}</p>
              <p className="text-sm text-[#8a8a86] leading-relaxed">{d.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="border border-[#26FC00]/20 p-5" style={{ backgroundColor: "rgba(38,252,0,0.05)" }}>
        <p className="font-mono text-xs text-[#26FC00] uppercase tracking-wider mb-3">The north star metric</p>
        <p className="text-[#f7f7f5] font-semibold mb-2">
          &ldquo;Would a real boutique travel client feel this response was worth their time?&rdquo;
        </p>
        <p className="text-sm text-[#8a8a86] leading-relaxed">
          Binary yes/no. Evaluated by running the same response through an independent judge LLM &mdash; Azure OpenAI itself, asked to assess the response as a prospective IC Vacation client would. This removes subjectivity from the evaluation loop.
        </p>
      </div>
    </div>
  );
}

function EvaluationWaltView() {
  return (
    <div className="space-y-6">
      <div className="border border-[#252426] bg-[#0a0a0a] p-4">
        <div className="font-mono text-xs text-[#4fc3f7] uppercase tracking-wider mb-3">Evaluation framework &mdash; technical</div>
        <div className="space-y-3 text-sm text-[#8a8a86]">
          {[
            { step: "Golden test set", detail: "20 synthetic user conversations with known expected outputs. Covers diverse query types: romantic cruises, family trips, solo adventure, budget constraints, specific destinations." },
            { step: "Automated scoring", detail: "After each knowledge base update, re-run the test set. Score each response 0–1 on all 5 dimensions. Average = composite quality score. Track over time in Redis or a JSON file." },
            { step: "A/B testing", detail: "Split traffic between current KB and updated KB. Compare output quality using the composite score. Promote if score is higher than current by more than 5%." },
            { step: "Judge LLM", detail: "Use Azure OpenAI gpt-5.4-mini as evaluator. Prompt: “You are a boutique travel client. Rate this response on whether it would make you call Isaac. YES or NO. Explain in one sentence.”" },
            { step: "Regression detection", detail: "If composite score drops more than 10% after a KB update, auto-rollback to previous version. Flag for manual review." },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 border-b border-[#1a1a1a] pb-3 last:border-0 last:pb-0">
              <div className="font-mono text-xs flex-shrink-0 mt-0.5 w-5" style={{ color: "rgba(79,195,247,0.6)" }}>{String(i + 1).padStart(2, "0")}</div>
              <div>
                <div className="font-semibold text-[#f7f7f5] text-xs mb-0.5">{item.step}</div>
                <div className="text-xs text-[#555] leading-relaxed">{item.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-5 gap-2">
        {[
          { dim: "Completeness", score: "0.0–1.0", color: "#26FC00" },
          { dim: "Accuracy",     score: "0.0–1.0", color: "#FFE500" },
          { dim: "Personalization", score: "0.0–1.0", color: "#4fc3f7" },
          { dim: "Guardrails",   score: "0.0–1.0", color: "#f7a8a8" },
          { dim: "CTA delivery", score: "0.0–1.0", color: "#26FC00" },
        ].map((d) => (
          <div key={d.dim} className="border p-2 text-center" style={{ borderColor: d.color + "30" }}>
            <div className="text-[10px] font-semibold" style={{ color: d.color }}>{d.dim}</div>
            <div className="font-mono text-xs text-[#555] mt-1">{d.score}</div>
          </div>
        ))}
      </div>

      <div className="border-l-2 border-[#4fc3f7]/40 pl-4 py-1">
        <p className="text-sm text-[#8a8a86] leading-relaxed">
          <span className="text-[#f7f7f5] font-semibold">Composite score = mean of all 5 dimensions.</span>{" "}
          Target: 0.80 or above. Current baseline: measured on initial deployment. Reported after every knowledge base update.
        </p>
      </div>
    </div>
  );
}

export function LiamEvaluation() {
  const [view, setView] = useState<"annette" | "walt">("annette");

  return (
    <div className="w-full">
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
      <div className="mb-6">
        <p className="text-xs font-mono text-[#8a8a86] uppercase tracking-wider">
          {view === "annette" ? "Plain-English — measuring quality, not just quantity" : "Technical — scoring framework, test set, judge LLM"}
        </p>
      </div>
      {view === "annette" ? <EvaluationAnnetteView /> : <EvaluationWaltView />}
    </div>
  );
}
