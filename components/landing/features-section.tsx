"use client";

import { useEffect, useRef, useState } from "react";
import { Sparkles, MessageSquare } from "lucide-react";

/**
 * AI Travel Consultant preview.
 * A quiet, advisor-feeling chat surface — the AI gathers context first,
 * then hands the trip to Isaac. This section makes that handoff visible.
 */

const conversation = [
  {
    from: "ai",
    text: "Hello. Before Isaac shapes a trip for you, let's talk about how you like to travel.",
  },
  {
    from: "you",
    text: "Two of us. We want quiet, slow, and far from crowds. Late spring.",
  },
  {
    from: "ai",
    text: "Beautiful. Mountains, sea, or somewhere in between?",
  },
  {
    from: "you",
    text: "Mountains. Walks in the morning, long dinners, no rush.",
  },
  {
    from: "ai",
    text: "Then I'm thinking the Dolomites, a quiet stretch of the Engadin, or perhaps a private chalet in the Karwendel.",
  },
  {
    from: "handoff",
    text: "Brief saved. Isaac will review and reach out personally within 24 hours.",
  },
];

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const COUNT = 55;
    const particles = Array.from({ length: COUNT }, (_, i) => {
      const seed = i * 1.618;
      return {
        bx: (seed * 127.1) % 1,
        by: (seed * 311.7) % 1,
        phase: seed * Math.PI * 2,
        speed: 0.3 + (seed % 0.3),
        radius: 0.9 + (seed % 1.6),
      };
    });

    let time = 0;
    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      particles.forEach((p) => {
        const flowX = Math.sin(time * p.speed * 0.4 + p.phase) * 30;
        const flowY = Math.cos(time * p.speed * 0.3 + p.phase * 0.7) * 18;
        const x = p.bx * w + flowX;
        const y = p.by * h + flowY;
        const pulse = Math.sin(time * p.speed + p.phase) * 0.5 + 0.5;
        const alpha = 0.04 + pulse * 0.12;

        ctx.beginPath();
        ctx.arc(x, y, p.radius + pulse * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(38, 252, 0, ${alpha})`;
        ctx.fill();
      });

      time += 0.014;
      frameRef.current = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ width: "100%", height: "100%" }}
    />
  );
}

export function ConsultantSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [revealed, setRevealed] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    if (revealed >= conversation.length) return;
    const t = setTimeout(() => setRevealed((r) => r + 1), revealed === 0 ? 400 : 1100);
    return () => clearTimeout(t);
  }, [isVisible, revealed]);

  return (
    <section
      id="approach"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Owl mascot — noir advisor energy, sparingly */}
        <img
          src="/mascot-owl.svg"
          alt=""
          aria-hidden="true"
          className="hidden lg:block absolute top-12 right-12 w-28 xl:w-36 h-auto opacity-90 z-[2] animate-drift-slow pointer-events-none"
        />

        {/* Header */}
        <div className="relative mb-20 lg:mb-28">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="inline-flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.22em] text-muted-foreground">
                  <span className="w-12 h-px bg-brand-yellow" />
                  [ 02 ] // AI Travel Consultant
                </span>
                {/* Clear preview / coming soon label */}
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-brand-yellow border border-brand-yellow/50 bg-brand-yellow/[0.06] backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow animate-pulse" />
                  Preview · arriving 2026
                </span>
              </div>
              <h2
                className={`text-5xl md:text-6xl lg:text-[112px] font-display tracking-[-0.025em] leading-[0.92] transition-all duration-1000 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ fontVariationSettings: "'SOFT' 100, 'WONK' 1, 'opsz' 144", textWrap: "balance" }}
              >
                Begin with{" "}
                <span className="font-serif italic text-brand-yellow">conversation</span>,
                <br />
                <span className="text-muted-foreground">not a search bar.</span>
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pb-4">
              <p
                className={`text-base lg:text-lg text-muted-foreground leading-[1.6] transition-all duration-1000 delay-200 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{ textWrap: "pretty" }}
              >
                A quiet listening tool, currently in private preview. It learns
                who you travel with, how you like to move, and what you want to
                feel — then hands the brief to Isaac, who shapes the trip
                personally. Until launch, every brief is read by Isaac directly.
              </p>
            </div>
          </div>
        </div>

        {/* Conversation surface */}
        <div
          className={`relative border border-foreground/10 bg-[#0d0d0d] overflow-hidden transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <ParticleField />

          <div className="relative z-10 grid lg:grid-cols-[1.3fr_1fr]">
            {/* Conversation column */}
            <div className="p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-foreground/10">
              {/* Surface header */}
              <div className="flex items-center justify-between mb-10 pb-6 border-b border-foreground/10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-brand-green/15 border border-brand-green/40 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-brand-green" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground">IC Vacation Consultant</p>
                    <p className="text-xs font-mono text-muted-foreground">
                      Pre-consultation brief · v2.4
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-brand-yellow">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow animate-pulse" />
                  Preview
                </span>
              </div>

              {/* Messages */}
              <div className="flex flex-col gap-5 min-h-[320px]">
                {conversation.slice(0, revealed).map((msg, i) => {
                  if (msg.from === "handoff") {
                    return (
                      <div
                        key={i}
                        className="self-stretch mt-4 border border-brand-green/40 bg-brand-green/[0.06] px-5 py-4 flex items-center gap-3 animate-[char-in_0.5s_ease_forwards]"
                      >
                        <MessageSquare className="w-4 h-4 text-brand-green shrink-0" />
                        <p className="text-sm text-foreground/90">{msg.text}</p>
                      </div>
                    );
                  }
                  const isAi = msg.from === "ai";
                  return (
                    <div
                      key={i}
                      className={`flex ${isAi ? "justify-start" : "justify-end"}`}
                    >
                      <div
                        className={`max-w-[80%] px-4 py-3 text-sm leading-relaxed animate-[char-in_0.5s_ease_forwards] ${
                          isAi
                            ? "bg-foreground/[0.04] border border-foreground/10 text-foreground"
                            : "bg-foreground text-background"
                        }`}
                      >
                        <span
                          className={`block text-[10px] font-mono uppercase tracking-[0.18em] mb-1 ${
                            isAi ? "text-muted-foreground" : "text-background/60"
                          }`}
                        >
                          {isAi ? "consultant" : "you"}
                        </span>
                        {msg.text}
                      </div>
                    </div>
                  );
                })}

                {revealed < conversation.length && (
                  <div className="flex gap-1.5 items-center pl-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-green/70 animate-pulse" />
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-brand-green/70 animate-pulse"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-brand-green/70 animate-pulse"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Brief column — quietly summarises the conversation */}
            <div className="p-8 lg:p-12 bg-[#0a0a0a]">
              <span className="text-xs font-mono uppercase tracking-[0.22em] text-muted-foreground">
                Brief · auto-captured
              </span>

              <ul className="mt-8 flex flex-col gap-6 text-sm">
                {[
                  { k: "Travellers", v: "Two adults" },
                  { k: "Season", v: "Late spring" },
                  { k: "Pace", v: "Slow, quiet, far from crowds" },
                  { k: "Terrain", v: "Mountains" },
                  { k: "Rhythm", v: "Walks at dawn, long dinners" },
                  {
                    k: "Suggested",
                    v: "Dolomites · Engadin · Karwendel",
                    accent: true,
                  },
                ].map((row) => (
                  <li
                    key={row.k}
                    className="flex items-start justify-between gap-6 pb-4 border-b border-foreground/[0.06]"
                  >
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground pt-0.5">
                      {row.k}
                    </span>
                    <span
                      className={`text-right max-w-[60%] ${
                        row.accent ? "text-brand-green" : "text-foreground"
                      }`}
                    >
                      {row.v}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex items-center gap-3 text-xs font-mono text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                Brief forwarded to Isaac
              </div>
            </div>
          </div>

          {/* Bottom prompt bar */}
          <div className="relative z-10 border-t border-foreground/10 px-6 lg:px-10 py-5 flex items-center justify-between gap-4 bg-[#080808]">
            <span className="text-xs font-mono text-muted-foreground">
              <span className="text-brand-green">›</span> Tell us how you want
              this trip to feel
            </span>
            <a
              href="#contact"
              className="text-xs font-mono uppercase tracking-[0.18em] text-brand-green hover:text-brand-green/80 transition-colors"
            >
              Start your brief →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
