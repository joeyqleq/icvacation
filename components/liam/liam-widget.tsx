"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Send, X, Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";

type Msg = { role: "user" | "assistant"; content: string };
const USER_KEY = "liam_user_id";
const WIDGET_KEY = "liam_widget_messages";

function userId() {
  if (typeof window === "undefined") return "anon";
  let id = localStorage.getItem(USER_KEY);
  if (!id) { id = `u_${crypto.randomUUID()}`; localStorage.setItem(USER_KEY, id); }
  return id;
}

function validEmail(value: unknown): value is string {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function LiamWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([{ role: "assistant", content: "Good day — I’m Liam. Tell me what you want this trip to feel like, even if you have no idea where you want to go yet." }]);
  const bottom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(WIDGET_KEY);
      if (saved) setMessages(JSON.parse(saved));
    } catch {}
  }, []);
  useEffect(() => {
    try { sessionStorage.setItem(WIDGET_KEY, JSON.stringify(messages)); } catch {}
    bottom.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (pathname === "/liam" || pathname.startsWith("/deck")) return null;

  async function deliverPackage(email: string, current: Msg[]) {
    const packageMessage = [...current].reverse().find((m) => m.role === "assistant" && /trip brief|destination overview|suggested itinerary|estimated price/i.test(m.content));
    if (!packageMessage) return;
    const name = current.map((m) => m.content).join(" ").match(/\b(?:my name is|i'm|i am|call me)\s+([A-Z][a-z]{1,30})\b/i)?.[1] ?? "Traveler";
    const userFacts = current.filter((m) => m.role === "user").map((m) => m.content).join("\n• ");
    const title = packageMessage.content.split("\n").map((x) => x.replace(/[#*]/g, "").trim()).find((x) => x.length > 8 && x.length < 100) ?? "Your IC Vacation trip brief";
    await fetch("/api/liam-email", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, content: packageMessage.content, packageTitle: title, advisorSummary: `Traveler-provided consultation notes:\n• ${userFacts}` }),
    });
  }

  async function send(e?: FormEvent) {
    e?.preventDefault();
    const text = input.trim();
    if (!text || busy) return;
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next); setInput(""); setBusy(true);
    const assistant: Msg = { role: "assistant", content: "" };
    setMessages([...next, assistant]);
    try {
      const r = await fetch("/api/liam-chat", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, model: "primary", sessionContext: { userId: userId() } }),
      });
      const reader = r.body?.getReader();
      const decoder = new TextDecoder();
      let buffer = ""; let content = "";
      if (!reader) throw new Error("No response stream");
      while (true) {
        const { done, value } = await reader.read(); if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n"); buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const raw = line.slice(6).trim(); if (!raw || raw === "[DONE]") continue;
          try {
            const data = JSON.parse(raw);
            if (data.text) { content += data.text; setMessages([...next, { role: "assistant", content }]); }
            if (data.email_capture?.email && validEmail(data.email_capture.email)) {
              const withAnswer = [...next, { role: "assistant" as const, content }];
              await deliverPackage(data.email_capture.email, withAnswer);
            }
          } catch {}
        }
      }
    } catch {
      setMessages([...next, { role: "assistant", content: "I lost the connection for a moment. Please send that once more." }]);
    } finally { setBusy(false); }
  }

  return <>
    <button
      onClick={() => setOpen((v) => !v)} aria-label={open ? "Close Liam" : "Ask Liam"}
      className="fixed bottom-5 right-5 z-[90] grid h-[62px] w-[62px] place-items-center rounded-full border border-[#777]/70 bg-[#FFE500]/95 shadow-[0_0_0_1px_rgba(255,255,255,.08),0_0_18px_rgba(255,229,0,.28),0_0_42px_rgba(255,229,0,.12)] backdrop-blur-xl transition-all hover:scale-[1.04] hover:shadow-[0_0_0_1px_rgba(255,255,255,.12),0_0_26px_rgba(255,229,0,.42),0_0_58px_rgba(255,229,0,.16)]"
    >
      <span className="absolute inset-[5px] rounded-full border border-black/15 bg-gradient-to-br from-white/35 via-transparent to-black/10" />
      {open ? <X className="relative h-5 w-5 text-black"/> : <img src="/liam-ai_logo.png" alt="" className="relative h-10 w-10 rounded-full object-cover"/>}
      {!open && <span className="absolute -inset-[5px] -z-10 rounded-full border border-[#FFE500]/20 animate-ping [animation-duration:3.8s]"/>}
    </button>

    {open && <section className="fixed bottom-[94px] right-4 z-[89] flex h-[min(610px,72vh)] w-[min(390px,calc(100vw-32px))] flex-col overflow-hidden rounded-[22px] border border-white/15 bg-[#080808]/92 shadow-[0_25px_90px_rgba(0,0,0,.65),0_0_38px_rgba(255,229,0,.08)] backdrop-blur-2xl">
      <header className="flex items-center gap-3 border-b border-white/10 px-4 py-3.5">
        <div className="h-9 w-9 overflow-hidden rounded-full border border-[#FFE500]/40 bg-[#FFE500]/10"><img src="/liam-ai_logo.png" alt="Liam" className="h-full w-full object-cover"/></div>
        <div><div className="text-sm font-semibold text-white">Liam</div><div className="font-mono text-[9px] uppercase tracking-[.18em] text-[#26FC00]">IC Vacation · Travel consultant</div></div>
        <span className="ml-auto h-2 w-2 rounded-full bg-[#26FC00] shadow-[0_0_10px_rgba(38,252,0,.7)]"/>
      </header>
      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.map((m, i) => <div key={i} className={m.role === "user" ? "ml-9 rounded-2xl rounded-br-sm border border-white/10 bg-white/[.07] px-3.5 py-2.5 text-[13px] leading-relaxed text-white/85" : "mr-5 rounded-2xl rounded-bl-sm border border-[#FFE500]/10 bg-[#FFE500]/[.035] px-3.5 py-2.5 font-serif text-[13.5px] leading-relaxed text-white/78 whitespace-pre-wrap"}>{m.content}</div>)}
        {busy && <div className="flex items-center gap-2 px-2 text-[11px] text-white/35"><Loader2 className="h-3 w-3 animate-spin"/> Liam is thinking</div>}
        <div ref={bottom}/>
      </div>
      <form onSubmit={send} className="border-t border-white/10 p-3">
        <div className="flex items-end gap-2 rounded-2xl border border-white/12 bg-black/40 p-1.5 focus-within:border-[#FFE500]/40">
          <textarea value={input} onChange={(e)=>setInput(e.target.value)} onKeyDown={(e)=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault(); void send();}}} rows={1} placeholder="Tell Liam what you have in mind…" className="max-h-24 min-h-[38px] flex-1 resize-none bg-transparent px-2 py-2 text-[13px] text-white outline-none placeholder:text-white/25"/>
          <button disabled={!input.trim()||busy} className="grid h-9 w-9 place-items-center rounded-xl bg-[#FFE500] text-black disabled:opacity-30"><Send className="h-4 w-4"/></button>
        </div>
        <p className="mt-2 text-center font-mono text-[8px] tracking-[.11em] text-white/25">PLANS, NOT BOOKINGS · ISAAC FINALIZES EVERY TRIP</p>
      </form>
    </section>}
  </>;
}
