"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { Send, Phone, Loader2, Mail, X } from "lucide-react";
import { useDestination } from "./destination-context";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const SESSION_KEY = "liam_session";
const USER_ID_KEY = "liam_user_id";

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

/** Stable anonymous user ID persisted in localStorage across sessions */
function getUserId(): string {
  if (typeof window === "undefined") return "anon";
  try {
    const existing = localStorage.getItem(USER_ID_KEY);
    if (existing) return existing;
    const id = `u_${Math.random().toString(36).slice(2, 10)}_${Date.now().toString(36)}`;
    localStorage.setItem(USER_ID_KEY, id);
    return id;
  } catch {
    return "anon";
  }
}

async function saveProfileAsync(
  userId: string,
  userName: string | null,
  messages: { role: string; content: string }[]
) {
  try {
    await fetch("/api/liam-profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, userName, messages, updateAggregate: true }),
    });
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

/** Detect if a message contains a vacation package / trip brief */
function isPackageMessage(content: string): boolean {
  return (
    /Trip Brief/i.test(content) ||
    /DESTINATION OVERVIEW/i.test(content) ||
    /SUGGESTED ITINERARY/i.test(content) ||
    /Estimated Price/i.test(content) ||
    /ACCOMMODATION/i.test(content)
  );
}

/** Extract package title from first meaningful line */
function extractPackageTitle(content: string): string {
  const lines = content.split("\n").map((l) => l.trim()).filter(Boolean);
  for (const line of lines) {
    // Skip short labels / headers
    const clean = line.replace(/^#+\s*/, "").replace(/\*\*/g, "").trim();
    if (clean.length > 6 && clean.length < 80 && !/^(trip brief|destination overview|liam)/i.test(clean)) {
      return clean;
    }
  }
  return "Your Recommended Itinerary";
}

/** Format all messages as a plain-text transcript */
function buildTranscriptContent(messages: Message[]): string {
  return messages
    .filter((m) => m.content.trim())
    .map((m) => {
      const label = m.role === "user" ? "You" : "Liam AI";
      return `${label}: ${m.content}`;
    })
    .join("\n\n");
}

/** Detect if user is requesting an email */
function userWantsEmail(text: string): boolean {
  return /\b(send me|email me|send (this|it) to (my email|me)|email this|mail (this|me))\b/i.test(text);
}

/** Detect if Liam's response is offering to email */
function liamOffersEmail(text: string): boolean {
  return /(would you like me to send|shall i email|want me to send (this|it) to your email|i can send (this|that) to your (email|inbox))/i.test(text);
}

// ─── EmailModal ────────────────────────────────────────────────────────────────

interface EmailModalProps {
  type: "package" | "transcript";
  content: string;
  packageTitle?: string;
  prefillName?: string;
  onClose: () => void;
}

function EmailModal({ type, content, packageTitle, prefillName, onClose }: EmailModalProps) {
  const [name, setName] = useState(prefillName ?? "");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setStatus("loading");
    setErrorMsg("");

    try {
      const [emailRes, leadRes] = await Promise.all([
        fetch("/api/liam-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, content, type, packageTitle }),
        }),
        fetch("/api/liam-leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, content, type, packageTitle }),
        }),
      ]);

      const emailData = await emailRes.json();
      if (!emailData.ok) throw new Error(emailData.error ?? "Failed to send email");
      // Lead save is best-effort — don't fail the UX on it
      if (!leadRes.ok) console.warn("[liam-leads] non-200 response");

      setStatus("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.85)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative w-full max-w-sm bg-[#0d0d0d] border border-white/15 shadow-2xl">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white/40 hover:text-white/80 transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-4 h-4 rounded-full bg-black border border-[#26FC00]/30 overflow-hidden flex-shrink-0">
              <img src="/liam-ai_logo.png" alt="" className="w-full h-full object-cover" />
            </div>
            <span className="font-mono text-[9px] tracking-[0.25em] text-[#26FC00] uppercase">
              Liam AI · IC Vacation
            </span>
          </div>
          <p className="font-sans font-semibold text-white text-[15px] leading-snug">
            {type === "transcript" ? "Send transcript to your inbox" : "Send this to your inbox"}
          </p>
          <p className="font-serif italic text-white/45 text-[12px] mt-1">
            {type === "transcript"
              ? "We'll email you a copy of this conversation."
              : "We'll email you this recommendation + Isaac's contact."}
          </p>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          {status === "success" ? (
            <div className="text-center py-4">
              <div className="w-10 h-10 rounded-full bg-[#26FC00]/10 border border-[#26FC00]/30 flex items-center justify-center mx-auto mb-3">
                <Mail className="w-5 h-5 text-[#26FC00]" />
              </div>
              <p className="font-mono text-[10px] tracking-[0.2em] text-[#26FC00] uppercase mb-1">Sent!</p>
              <p className="font-serif text-white/60 text-[13px]">Check your inbox — it may take a minute.</p>
              <button
                onClick={onClose}
                className="mt-5 font-mono text-[10px] tracking-[0.15em] uppercase text-white/40 hover:text-white/70 transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block font-mono text-[9px] tracking-[0.2em] text-white/40 uppercase mb-1.5">
                  Your name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="First name"
                  required
                  className="w-full bg-[#050505] border border-white/15 px-3 py-2 font-serif text-[13px] text-white/80 placeholder:text-white/25 focus:outline-none focus:border-[#26FC00] transition-colors"
                />
              </div>
              <div>
                <label className="block font-mono text-[9px] tracking-[0.2em] text-white/40 uppercase mb-1.5">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full bg-[#050505] border border-white/15 px-3 py-2 font-serif text-[13px] text-white/80 placeholder:text-white/25 focus:outline-none focus:border-[#26FC00] transition-colors"
                />
              </div>

              {status === "error" && errorMsg && (
                <p className="font-mono text-[9px] tracking-[0.1em] text-red-400">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === "loading" || !name.trim() || !email.trim()}
                className="w-full bg-[#26FC00] text-black font-mono text-[10px] tracking-[0.2em] uppercase px-4 py-2.5 hover:bg-[#FFE500] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Mail className="w-3.5 h-3.5" />
                    Send
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Welcome Message ───────────────────────────────────────────────────────────

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "Good day — I'm Liam, your personal travel consultant here at IC Vacation.\n\nI'm here to help you discover a trip that's genuinely shaped around you — not a template, not a package tour.\n\nTell me: what's been on your mind lately when you think about your next journey?",
  timestamp: new Date(),
};

// ─── ChatPanel ─────────────────────────────────────────────────────────────────

export function ChatPanel() {
  const savedSession = loadSession();

  const [userId] = useState<string>(() => getUserId());
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
  const [showEmailPrompt, setShowEmailPrompt] = useState(false);

  // EmailModal state
  const [emailModal, setEmailModal] = useState<{
    open: boolean;
    type: "package" | "transcript";
    content: string;
    packageTitle?: string;
  } | null>(null);

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

  // Save profile signals to Upstash when user leaves (if there are user messages)
  useEffect(() => {
    const hasUserMessages = messages.some((m) => m.role === "user");
    if (!hasUserMessages) return;

    const handleUnload = () => {
      const payload = messages.map((m) => ({ role: m.role, content: m.content }));
      const blob = new Blob(
        [JSON.stringify({ userId, userName, messages: payload })],
        { type: "application/json" }
      );
      navigator.sendBeacon("/api/liam-profile", blob);
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, [messages, userId, userName]);

  const openPackageModal = useCallback((content: string) => {
    setEmailModal({
      open: true,
      type: "package",
      content,
      packageTitle: extractPackageTitle(content),
    });
  }, []);

  const openTranscriptModal = useCallback(() => {
    setEmailModal({
      open: true,
      type: "transcript",
      content: buildTranscriptContent(messages),
    });
  }, [messages]);

  const sendMessage = useCallback(async () => {
    if (!input.trim() || isStreaming) return;

    const trimmed = input.trim();

    // Try to extract name from user message if we don't have one yet
    if (!userName) {
      const detected = extractName(trimmed);
      if (detected) setUserName(detected);
    }

    // Detect if user is requesting an email before clearing input
    if (userWantsEmail(trimmed)) {
      // Open transcript modal automatically (most generic interpretation)
      setEmailModal({
        open: true,
        type: "transcript",
        content: buildTranscriptContent(messages),
      });
      setInput("");
      return;
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
    setShowEmailPrompt(false);

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
          sessionContext: { userName: userName ?? extractName(trimmed), userId },
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
            if (parsed.email_capture) {
              // Backend detected email_capture block — open email modal automatically
              setEmailModal({
                open: true,
                type: "package",
                content: buildTranscriptContent([...messages, { id: assistantMsgId, role: "assistant", content: fullContent, timestamp: new Date() }]),
                packageTitle: extractPackageTitle(fullContent),
              });
            }
            if (parsed.debug) {
              console.log("[Liam Brain]", parsed.debug);
            }
          } catch {}
        }
      }

      // Strip EMAIL_CAPTURE_REQUESTED token from visible content and trigger modal
      if (fullContent.includes("EMAIL_CAPTURE_REQUESTED")) {
        const cleaned = fullContent.replace(/EMAIL_CAPTURE_REQUESTED\s*/g, "").trim();
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsgId ? { ...m, content: cleaned } : m
          )
        );
        setEmailModal({
          open: true,
          type: "package",
          content: cleaned,
          packageTitle: extractPackageTitle(cleaned),
        });
      }

      // After streaming finishes, check if Liam offered to email
      if (liamOffersEmail(fullContent)) {
        setShowEmailPrompt(true);
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
      // Fire-and-forget profile save after each completed assistant turn
      setMessages((current) => {
        saveProfileAsync(userId, userName, current.map((m) => ({ role: m.role, content: m.content })));
        return current;
      });
    }
  }, [input, isStreaming, messages, userName, userId, setDestination]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  const greeting = userName ? `${userName}'s session` : "IC Vacation Consultant";

  return (
    <>
      {/* Email Modal */}
      {emailModal?.open && (
        <EmailModal
          type={emailModal.type}
          content={emailModal.content}
          packageTitle={emailModal.packageTitle}
          prefillName={userName ?? undefined}
          onClose={() => setEmailModal(null)}
        />
      )}

      <div className="flex flex-col h-full bg-[#050505] w-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-black/30 flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-black border border-[#26FC00]/30 flex items-center justify-center flex-shrink-0 overflow-hidden">
            <img src="/liam-ai_logo.png" alt="Liam AI" className="w-9 h-9 object-cover" />
          </div>
          <div className="min-w-0">
            <p className="font-sans font-bold text-base tracking-tight leading-none">
              <span className="text-white">Liam </span><span className="text-[#26FC00]">AI</span>
            </p>
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
        <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.1) transparent' }}>
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
              {msg.role === "assistant" && (
                <div className="w-7 h-7 flex-shrink-0 rounded-full bg-black border border-[#26FC00]/30 flex items-center justify-center mt-0.5 overflow-hidden">
                  <img src="/liam-ai_logo.png" alt="" className="w-7 h-7 object-cover" />
                </div>
              )}
              <div className="flex flex-col max-w-[85%] md:max-w-[82%]">
                <div
                  className={`${
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

                {/* Package email button — shown below assistant package messages */}
                {msg.role === "assistant" && msg.content && isPackageMessage(msg.content) && (
                  <div className="flex justify-end mt-1.5">
                    <button
                      onClick={() => openPackageModal(msg.content)}
                      className="flex items-center gap-1 bg-[#26FC00]/10 border border-[#26FC00]/25 px-2 py-1 hover:bg-[#26FC00]/20 hover:border-[#26FC00]/50 transition-colors"
                      title="Email this recommendation to yourself"
                    >
                      <Mail className="w-3 h-3 text-[#26FC00]" />
                      <span className="font-mono text-[9px] tracking-[0.15em] text-[#26FC00] uppercase">
                        Email this
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Inline email prompt when Liam offers to email */}
          {showEmailPrompt && !isStreaming && (
            <div className="flex gap-3">
              <div className="w-7 h-7 flex-shrink-0" />
              <div className="bg-[#26FC00]/5 border border-[#26FC00]/20 px-3 py-2.5 md:px-4 md:py-3 flex items-center justify-between gap-3 flex-wrap">
                <p className="font-serif italic text-[13px] text-white/60">
                  Send this to your email?
                </p>
                <button
                  onClick={openTranscriptModal}
                  className="flex items-center gap-1.5 bg-[#26FC00]/10 border border-[#26FC00]/30 px-3 py-1.5 hover:bg-[#26FC00]/20 transition-colors flex-shrink-0"
                >
                  <Mail className="w-3 h-3 text-[#26FC00]" />
                  <span className="font-mono text-[9px] tracking-[0.15em] text-[#26FC00] uppercase">
                    Yes — enter email
                  </span>
                </button>
              </div>
            </div>
          )}

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
          <div className="flex items-center justify-between mt-1.5">
            <p className="font-mono text-[9px] text-white/25">Enter to send · Shift+Enter for new line</p>
            <button
              onClick={openTranscriptModal}
              className="flex items-center gap-1 font-mono text-[9px] tracking-[0.12em] text-white/25 hover:text-[#26FC00] transition-colors uppercase"
            >
              <Mail className="w-2.5 h-2.5" />
              Email transcript
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
