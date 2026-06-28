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
   Funnel steps — animated pipeline
───────────────────────────────────────────── */
const FUNNEL_STEPS = [
  {
    num: "01",
    label: "Visitor arrives",
    detail: "Someone finds IC Vacation — maybe at 2am, maybe from a Google search.",
    color: "#f7f7f5",
  },
  {
    num: "02",
    label: "Liam starts a conversation",
    detail: "Liam greets them, asks questions, and learns what kind of trip they dream of.",
    color: "#26FC00",
  },
  {
    num: "03",
    label: "A trip brief is built",
    detail: "Behind the scenes, Liam searches its knowledge library and writes a personalized brief.",
    color: "#FFE500",
  },
  {
    num: "04",
    label: "\"Ready? Call Isaac.\"",
    detail: "Liam wraps up with Isaac's number. The visitor is warm, informed, and ready to book.",
    color: "#26FC00",
  },
];

export function FunnelSteps() {
  return (
    <div className="relative">
      {/* vertical connector line */}
      <div className="absolute left-7 top-8 bottom-8 w-px bg-[#252426] hidden md:block" />
      <div className="space-y-0">
        {FUNNEL_STEPS.map((step, i) => (
          <div key={i} className="flex gap-6 items-start group">
            <div className="relative flex-shrink-0">
              <div
                className="w-14 h-14 rounded-none border flex items-center justify-center font-mono text-sm font-bold transition-all duration-300 group-hover:scale-105"
                style={{
                  borderColor: step.color + "40",
                  color: step.color,
                  backgroundColor: step.color + "08",
                }}
              >
                {step.num}
              </div>
              {i < FUNNEL_STEPS.length - 1 && (
                <div className="absolute left-1/2 -translate-x-1/2 top-14 h-8 w-px bg-[#252426] md:hidden" />
              )}
            </div>
            <div className="pb-8 pt-2">
              <div
                className="text-lg font-semibold mb-1 transition-colors duration-300"
                style={{ color: step.color }}
              >
                {step.label}
              </div>
              <div className="text-[#8a8a86] text-sm leading-relaxed max-w-md">
                {step.detail}
              </div>
            </div>
          </div>
        ))}
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
  { label: "Trained on AmaWaterways catalog", chatgpt: false, liam: true },
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
          "We want a romantic river cruise for our anniversary. Where should we go?"
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
              Liam's response:
            </p>
            <p className="text-[#f7f7f5]">
              For a romantic anniversary, the{" "}
              <span className="text-[#26FC00]">
                AmaWaterways AmaCello on the Danube
              </span>{" "}
              is a perfect match. Here's a concept for your trip:
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
                Cabin: AmaCello Suite with French balcony — double-wide river
                view, couples' amenity package included
              </p>
            </div>
            <p className="text-[#f7f7f5]">
              Isaac has personally curated this route and knows the crew aboard
              the AmaCello.{" "}
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
    body: "Liam looks through its knowledge base — 48 boutique travel guides and 342 AmaWaterways pages — to find the most relevant information for your question.",
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
