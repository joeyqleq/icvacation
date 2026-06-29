"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { Send, Phone, Loader2 } from "lucide-react";
import { useDestination } from "./destination-context";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const SESSION_KEY = "liam_session";

interface LiamSession {
  userName: string | null;
  messages: { role: "user" | "assistant"; content: string }[];
}

function loadSession(): LiamSession {
  if (typeof window === "undefined") return { userName: null, messages: [] };
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (raw) return JSON.parse(raw) as LiamSession;
  } catch {}
  return { userName: null, messages: [] };
}

function saveSession(session: LiamSession) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch {}
}

function extractName(text: string): string | null {
  const patterns = [
    /(?:my name is|i'm|i am|call me)\s+([A-Z][a-z]+)/i,
    /^([A-Z][a-z]+)(?:\s*[,!.]|\s+here)/,
    /(?:it's|its)\s+([A-Z][a-z]+)/i,
  ];
  for (const re of patterns) {
    const m = text.match(re);
    if (m?.[1] && m[1].length > 1) return m[1];
  }
  return null;
}

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "Good day — I'm Liam, your personal travel consultant here at IC Vacation.\n\nI'm here to help you discover a trip that's genuinely shaped around you — not a template, not a package tour.\n\nTell me: what's been on your mind lately when you think about your next journey?",
  timestamp: new Date(),
};

export function ChatPanel() {
  const savedSession = loadSession();

  const [userName, setUserName] = useState<string | null>(savedSession.userName);
  const [messages, setMessages] = useState<Message[]>(() => {
    if (savedSession.messages.length > 0) {
      return savedSession.messages.map((m, i) => ({
        id: String(i),
        role: m.role,
        content: m.content,
        timestamp: new Date(),
      }));
    }
    return [WELCOME_MESSAGE];
  });
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [showCta, setShowCta] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { setDestination } = useDestination();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const assistantMessages = messages.filter((m) => m.role === "assistant").length;
    if (assistantMessages >= 3) setShowCta(true);
  }, [messages]);

  // Persist session to sessionStorage whenever messages or userName change
  useEffect(() => {
    saveSession({
      userName,
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    });
  }, [messages, userName]);

  const sendMessage = useCallback(async () => {
    if (!input.trim() || isStreaming) return;

    const trimmed = input.trim();

    // Try to extract name from user message if we don't have one yet
    if (!userName) {
      const detected = extractName(trimmed);
      if (detected) setUserName(detected);
    }

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: trimmed,
      timestamp: new Date(),
    };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsStreaming(true);

    const assistantMsgId = (Date.now() + 1).toString();
    setMessages((prev) => [
      ...prev,
      { id: assistantMsgId, role: "assistant", content: "", timestamp: new Date() },
    ]);

    try {
      const res = await fetch("/api/liam-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
          sessionContext: { userName: userName ?? extractName(trimmed) },
        }),
      });

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let fullContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6).trim();
          if (data === "[DONE]") continue;
          try {
            const parsed = JSON.parse(data);
            if (parsed.text) {
              fullContent += parsed.text;
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantMsgId ? { ...m, content: fullContent } : m
                )
              );
            }
            if (parsed.destination) {
              setDestination(parsed.destination);
            }
            if (parsed.debug) {
              console.log("[Liam Brain]", parsed.debug);
            }
          } catch {}
        }
      }
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMsgId
            ? {
                ...m,
                content:
                  "I apologize — there was a brief connection issue. Please send your message again.",
              }
            : m
        )
      );
    } finally {
      setIsStreaming(false);
    }
  }, [input, isStreaming, messages, userName, setDestination]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  const greeting = userName ? `${userName}'s session` : "IC Vacation Consultant";

  return (
    <div className="flex flex-col h-full bg-[#050505] w-full">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-black/30 flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-[#26FC00]/10 border border-[#26FC00]/30 flex items-center justify-center flex-shrink-0">
          <img
            src="/ic-bird.svg"
            alt="Liam"
            className="w-6 h-6"
            style={{
              filter:
                "invert(68%) sepia(98%) saturate(426%) hue-rotate(56deg) brightness(103%) contrast(101%)",
            }}
          />
        </div>
        <div className="min-w-0">
          <p className="font-sans font-semibold text-white text-base tracking-tight">Liam AI</p>
          <p className="font-mono text-[9px] tracking-[0.2em] text-[#26FC00] uppercase truncate">
            ● Online · {greeting}
          </p>
        </div>
        <div className="ml-auto flex-shrink-0">
          <a
            href="tel:+14078101670"
            className="flex items-center gap-2 font-mono text-[10px] tracking-[0.15em] uppercase text-white/60 border border-white/15 px-3 py-1.5 hover:border-[#26FC00] hover:text-[#26FC00] transition-colors"
          >
            <Phone className="w-3.5 h-3.5" /> Call Isaac
          </a>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
            {msg.role === "assistant" && (
              <div className="w-7 h-7 flex-shrink-0 rounded-full bg-[#26FC00]/10 border border-[#26FC00]/30 flex items-center justify-center mt-0.5">
                <img
                  src="/ic-bird.svg"
                  alt=""
                  className="w-4 h-4"
                  style={{
                    filter:
                      "invert(68%) sepia(98%) saturate(426%) hue-rotate(56deg) brightness(103%) contrast(101%)",
                  }}
                />
              </div>
            )}
            <div
              className={`max-w-[85%] md:max-w-[82%] ${
                msg.role === "user"
                  ? "bg-[#26FC00]/10 border border-[#26FC00]/20 px-3 py-2.5 md:px-4 md:py-3"
                  : "bg-black/40 border border-white/10 px-3 py-2.5 md:px-4 md:py-3"
              }`}
            >
              <p className="font-serif text-[14px] md:text-[15px] text-white/85 leading-[1.65] whitespace-pre-wrap">
                {msg.content}
                {msg.role === "assistant" && msg.content === "" && isStreaming && (
                  <span className="inline-block w-2 h-4 bg-[#26FC00] animate-pulse ml-0.5 align-middle" />
                )}
              </p>
              <p className="font-mono text-[9px] text-white/25 mt-2">
                {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* CTA banner */}
      {showCta && (
        <div className="mx-3 md:mx-4 mb-2 md:mb-3 p-2.5 md:p-3 border border-[#FFE500]/20 bg-[#FFE500]/5 flex items-center justify-between gap-2 flex-shrink-0">
          <div className="min-w-0">
            <p className="font-mono text-[10px] tracking-[0.15em] text-[#FFE500] uppercase">
              Ready to go deeper?
            </p>
            <p className="font-serif italic text-sm text-white/60 mt-0.5">
              Isaac personally reviews every brief.
            </p>
          </div>
          <a
            href="tel:+14078101670"
            className="flex-shrink-0 flex items-center gap-2 bg-[#FFE500] text-black font-mono text-[10px] tracking-[0.15em] uppercase px-3 py-2 hover:bg-white transition-colors"
          >
            <Phone className="w-3 h-3" /> (407) 810-1670
          </a>
        </div>
      )}

      {/* Input area */}
      <div className="px-3 py-3 md:px-4 md:py-4 border-t border-white/10 bg-black/30 flex-shrink-0">
        <div className="flex gap-2 items-end">
          <textarea
            className="flex-1 bg-[#050505] border border-white/15 px-3 py-2 md:py-2.5 text-[14px] font-serif text-white/80 placeholder:text-white/25 focus:outline-none focus:border-[#26FC00] resize-none leading-relaxed"
            placeholder="Tell Liam about your dream trip..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={2}
            disabled={isStreaming}
          />
          <button
            onClick={sendMessage}
            disabled={isStreaming || !input.trim()}
            className="p-2.5 bg-[#26FC00] text-black hover:bg-[#FFE500] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
          >
            {isStreaming ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </div>
        <p className="font-mono text-[9px] text-white/25 mt-1.5">Enter to send · Shift+Enter for new line</p>
      </div>
    </div>
  );
}
