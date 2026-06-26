"use client";

import { useState, type FormEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ArrowUpRight, Check, Loader2 } from "lucide-react";
import { Mascot } from "@/components/site/mascot";

/**
 * ContactModal — big, glass-neumorphism modal with neon-green hover glow.
 * Captures rich client info so Isaac can review the prospect at a glance:
 * name, email, phone, departure city, destination(s), travel dates,
 * travelers, trip style, budget, occasion, message.
 *
 * POSTs to /api/contact, which uses Resend and environment-configured inboxes.
 */

const TRIP_STYLES = [
  "Quiet luxury",
  "Family + multi-gen",
  "Honeymoon / romance",
  "Adventure / active",
  "Cultural deep-dive",
  "Beach + relaxation",
  "Cruise",
  "Safari / wildlife",
];

const BUDGETS = [
  "Under £5k per person",
  "£5–10k per person",
  "£10–20k per person",
  "£20k+ per person",
  "Open / let's discuss",
];

export function ContactModal({
  open,
  onOpenChange,
  prefill = {},
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prefill?: Partial<FormState>;
}) {
  const [state, setState] = useState<FormState>({ ...EMPTY, ...prefill });
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState<string>("");

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setState((s) => ({ ...s, [key]: value }));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(state),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setStatus("error");
        setErrorMsg(json.error || "Something went wrong. Please try again.");
        return;
      }
      setStatus("ok");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Network error");
    }
  }

  function reset() {
    setState(EMPTY);
    setStatus("idle");
    setErrorMsg("");
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!o) {
          // Reset on close after a beat
          setTimeout(reset, 250);
        }
        onOpenChange(o);
      }}
    >
      <DialogContent
        className="modal-glass max-w-7xl w-[95vw] p-0 rounded-2xl border-0 overflow-hidden"
        showCloseButton
      >
        {/* Decorative dandelion top-right */}
        <div className="pointer-events-none absolute -top-8 -right-10 opacity-15 hidden sm:block">
          <Mascot creature="dandelion" size={220} pose="wiggle" tint="yellow" />
        </div>

        <DialogHeader className="p-5 sm:p-6 pb-2 relative z-10 text-left">
          <p className="label-ticker text-brand-green mb-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full pulse-green inline-block" />
            Personal consultation
          </p>
          <DialogTitle
            className="font-display-tight text-white text-3xl sm:text-4xl md:text-5xl leading-[0.95]"
            style={{ fontVariationSettings: "'wdth' 80, 'opsz' 144", letterSpacing: "-0.035em" }}
          >
            Tell us about the trip
            <br />
            <span className="font-serif italic text-brand-yellow">on your mind.</span>
          </DialogTitle>
          <DialogDescription className="font-editorial text-white/70 text-[15px] sm:text-base mt-3 leading-relaxed max-w-xl">
            The more we know now, the more personal the first call will feel.
            Isaac reads every inquiry — replies arrive within one working day.
          </DialogDescription>
        </DialogHeader>

        {status === "ok" ? (
          <div className="p-8 sm:p-10 relative z-10">
            <div className="flex items-center gap-3 text-brand-green mb-4">
              <span className="w-9 h-9 rounded-full bg-brand-green/15 flex items-center justify-center">
                <Check className="w-5 h-5" />
              </span>
              <span className="font-mono uppercase text-xs tracking-[0.28em]">
                Inquiry received
              </span>
            </div>
            <h3
              className="font-display-tight text-white text-2xl sm:text-3xl leading-tight"
              style={{ fontVariationSettings: "'wdth' 85, 'opsz' 144" }}
            >
              Thank you — we&apos;ll be in touch soon.
            </h3>
            <p className="font-editorial text-white/65 mt-3 leading-relaxed">
              You&apos;ll get a quiet, considered reply from Isaac. In the meantime,
              feel free to wander the journal or our recent destinations.
            </p>
            <div className="mt-6 flex gap-3 flex-wrap">
              <button
                className="btn-glass h-11 px-5 text-sm rounded-full"
                onClick={() => onOpenChange(false)}
              >
                Close
              </button>
              <button
                className="btn-primary h-11 px-5 text-sm rounded-full"
                onClick={reset}
              >
                Send another
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="p-5 sm:p-6 pt-0 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1px_1fr_1px_1fr] gap-x-0 gap-y-3 md:gap-y-0">
              {/* Column 1 — About You */}
              <div className="flex flex-col gap-3 md:pr-5">
                <span className="label-ticker-sm text-brand-green/70 mb-1">About you</span>
                <Field label="Your name" required>
                  <input
                    required
                    className="modal-field"
                    value={state.name}
                    onChange={(e) => set("name", e.target.value)}
                    placeholder="Jane Doe"
                    autoComplete="name"
                  />
                </Field>
                <Field label="Email" required>
                  <input
                    required
                    type="email"
                    className="modal-field"
                    value={state.email}
                    onChange={(e) => set("email", e.target.value)}
                    placeholder="jane@example.com"
                    autoComplete="email"
                  />
                </Field>
                <Field label="Phone (optional)">
                  <input
                    type="tel"
                    className="modal-field"
                    value={state.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    placeholder="+44 …"
                    autoComplete="tel"
                  />
                </Field>
                <Field label="Departure city">
                  <input
                    className="modal-field"
                    value={state.departureCity}
                    onChange={(e) => set("departureCity", e.target.value)}
                    placeholder="London"
                  />
                </Field>
              </div>

              {/* Divider 1 */}
              <div className="hidden md:block bg-gradient-to-b from-transparent via-white/10 to-transparent" />

              {/* Column 2 — Trip Details */}
              <div className="flex flex-col gap-3 md:px-5">
                <span className="label-ticker-sm text-brand-green/70 mb-1">Trip details</span>
                <Field label="Destination(s) of interest">
                  <input
                    className="modal-field"
                    value={state.destination}
                    onChange={(e) => set("destination", e.target.value)}
                    placeholder="Japan, Tuscany, Patagonia…"
                  />
                </Field>
                <Field label="Travel dates">
                  <input
                    className="modal-field"
                    value={state.travelDates}
                    onChange={(e) => set("travelDates", e.target.value)}
                    placeholder="e.g. 12 – 26 June 2026"
                  />
                </Field>
                <Field label="Travelers">
                  <input
                    className="modal-field"
                    value={state.travelers}
                    onChange={(e) => set("travelers", e.target.value)}
                    placeholder="2 adults, 1 child"
                  />
                </Field>
                <Field label="Occasion (optional)">
                  <input
                    className="modal-field"
                    value={state.occasion}
                    onChange={(e) => set("occasion", e.target.value)}
                    placeholder="Anniversary, sabbatical…"
                  />
                </Field>
              </div>

              {/* Divider 2 */}
              <div className="hidden md:block bg-gradient-to-b from-transparent via-white/10 to-transparent" />

              {/* Column 3 — Preferences */}
              <div className="flex flex-col gap-3 md:pl-5">
                <span className="label-ticker-sm text-brand-green/70 mb-1">Preferences</span>
                <Field label="Trip style">
                  <select
                    className="modal-field"
                    value={state.tripStyle}
                    onChange={(e) => set("tripStyle", e.target.value)}
                  >
                    <option value="">Select a style…</option>
                    {TRIP_STYLES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Budget tier">
                  <select
                    className="modal-field"
                    value={state.budget}
                    onChange={(e) => set("budget", e.target.value)}
                  >
                    <option value="">Select a tier…</option>
                    {BUDGETS.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Anything else?">
                  <textarea
                    rows={2}
                    className="modal-field resize-none overflow-hidden"
                    value={state.message}
                    onChange={(e) => set("message", e.target.value)}
                    placeholder="Non-negotiables, the ‘absolutely nots’, dreams…"
                  />
                </Field>
              </div>
            </div>

            {status === "error" && (
              <p className="mt-4 text-sm text-red-300 font-mono">
                {errorMsg || "Could not send. Please try again."}
              </p>
            )}

            <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <p className="text-xs font-mono uppercase tracking-[0.22em] text-white/35">
                We reply to every inquiry within one working day.
              </p>
              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-primary group h-12 px-6 text-sm rounded-full justify-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    Send to Isaac
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Field({
  label,
  children,
  required,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="block label-ticker-sm text-white/55 mb-1.5">
        {label}
        {required && <span className="text-brand-green ml-1">*</span>}
      </span>
      {children}
    </label>
  );
}

type FormState = {
  name: string;
  email: string;
  phone: string;
  departureCity: string;
  destination: string;
  travelDates: string;
  travelers: string;
  tripStyle: string;
  budget: string;
  occasion: string;
  message: string;
};

const EMPTY: FormState = {
  name: "",
  email: "",
  phone: "",
  departureCity: "",
  destination: "",
  travelDates: "",
  travelers: "",
  tripStyle: "",
  budget: "",
  occasion: "",
  message: "",
};
